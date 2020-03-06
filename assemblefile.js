/* =======================================
 * Assemble for `Rebirth`
 * ======================================= */

const assemble = require('assemble');
const ghpages = require('gh-pages');
const fs = require('fs');
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const handlebarsHelpers = require('handlebars-helpers')();
const notifier = require('node-notifier');
const pkg = require('./package.json');
const prettyHrtime = require('pretty-hrtime');
const rimraf = require('rimraf');
const source = require('vinyl-source-stream');
const through = require('through2');
const watch = require('base-watch');
const watchify = require('watchify');
const $ = require('gulp-load-plugins')();
const yaml = require('js-yaml');
const uglify = require('gulp-uglify-es').default;
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

const PRODUCTION = process.env.NODE_ENV === 'production';
const open = process.env.npm_config_disable_open ? false : 'external';

const app = assemble();

/* ======
 * Docs - Tasks
 * ====== */

/**
 * Config
 */
const config = {
  root: 'https://joonasy.github.io/rebirth/',
  version: pkg.version,
};

/**
 * Docs - Assemble
 */
app.helpers('docs/helpers/*.js');
app.helpers(handlebarsHelpers);
app.helper('markdown', require('helper-markdown'));

app.data({
  dev: !PRODUCTION,
  root: PRODUCTION ? config.root : '/',
  version: config.version,
});

app.use(watch());

app.create('templates');
app.create('contents');

app.dataLoader('yml', (str, fp) => yaml.safeLoad(str));

app.preLayout(/\.md$/, (view, next) => {
  if (!view.layout) view.layout = 'docs';
  next();
});

app.task('docs-html', () => {
  app.data('docs/*.{json,yml}');
  app.layouts('docs/containers/*.hbs');
  app.partials('docs/partials/*.hbs');
  app.contents('docs/content/**/*.md');

  return app
    .src('docs/templates/**/*.hbs')
    .pipe(app.toStream('contents'))
    .pipe(app.renderFile())
    .on('error', handleError)
    .pipe(
      $.rename((path) => {
        if (path.basename !== 'index') {
          path.dirname = `${path.dirname}/${path.basename}`;
          path.basename = 'index';
        }

        path.extname = '.html';
      }),
    )
    .pipe(app.dest('rebirth'));
});

/**
 * Docs - Stylesheets
 */
app.task('docs-stylesheets', () => {
  const pipeline = app
    .src('docs/assets/docs.scss')
    .pipe(
      $.sass({
        includePaths: ['node_modules'],
        outputStyle: 'expanded',
      }),
    )
    .on('error', handleError)
    .on('error', $.sass.logError)
    .pipe($.autoprefixer());

  if (PRODUCTION) {
    return pipeline
      .pipe($.replace('./', `${config.root}assets`))
      .pipe($.combineMq({ beautify: false }))
      .pipe(
        postcss([
          cssnano({
            mergeRules: false,
            zindex: false,
            discardComments: { removeAll: true },
          }),
        ]),
      )
      .pipe(app.dest('rebirth/assets'));
  }
  return pipeline.pipe(app.dest('rebirth/assets')).pipe(browserSync.stream());
});

/**
 * Docs - JavaScripts
 */
app.task('docs-javascripts', (cb) => {
  const scripts = [{ fileName: 'docs.js' }, { fileName: 'docs.head.js' }];

  return bundleJavaScripts(
    'docs/assets/',
    'rebirth/assets/',
    scripts,
    false,
    cb,
  );
});

/**
 * Docs - Images
 */
app.task('docs-images', () =>
  app
    .src('docs/assets/images/*.{jpg,jpeg,png,gif,webp,svg}')
    .pipe($.changed('rebirth/assets/images/'))
    .pipe(
      $.imagemin({
        svgoPlugins: [{ cleanupIDs: false }],
      }),
    )
    .on('error', handleError)
    .pipe(app.dest('rebirth/assets/images/')),
);

/**
 * Docs - Fonts
 */
app.task('docs-fonts', () =>
  app
    .src('docs/assets/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe($.changed('rebirth/assets/fonts'))
    .on('error', handleError)
    .pipe(app.dest('rebirth/assets/fonts')),
);

/**
 * Docs - Server
 */
app.task('docs-server', () => {
  browserSync.init({
    open,
    port: 9001,
    notify: false,
    server: {
      baseDir: './rebirth',
      routes: {
        '/dist': 'dist',
      },
    },
  });
});

/**
 * Docs - Watch
 */
app.task('docs-watch-files', () => {
  app.watch(
    [
      'docs/{layouts,templates,partials}/**/*.hbs',
      'docs/*.{json,yml}',
      'docs/content/**/*.md',
    ],
    ['docs-html'],
    (cb) => {
      setTimeout(() => {
        browserSync.reload();
        cb();
      }, 150);
    },
  );
  app.watch('docs/assets/fonts/*.{eot,svg,ttf,woff,woff2}', ['docs-fonts']);
  app.watch('docs/assets/images/*.{jpg,jpeg,png,gif,webp,svg}', [
    'docs-images',
  ]);
  app.watch('docs/assets/**/**/*.scss', ['docs-stylesheets']);
  app.watch('src/**/**/*.scss', ['docs-stylesheets', 'stylesheets']);
});

/**
 * Docs - Inline <head> css/js
 */
app.task('docs-inline', () =>
  app
    .src(['rebirth/**/*.html'], { base: 'rebirth' })
    .pipe(
      $.replace(inline({ matchFile: 'docs.css' }), () =>
        inline({ file: 'docs.css' }),
      ),
    )
    .pipe(
      $.replace(inline({ matchFile: 'docs.head.js' }), () =>
        inline({ file: 'docs.head.js' }),
      ),
    )
    .pipe(app.dest('rebirth')),
);

/**
 * Docs - Revision, copy and remove unneeded files
 */
app.task('docs-rev', () => {
  rimraf.sync('rebirth/assets/*.css');
  rimraf.sync('rebirth/assets/head.js');

  return app
    .src([
      'rebirth/assets/*.js',
      'rebirth/assets/{images,fonts}/**',
      'dist/rebirth.head.min.js',
      'dist/rebirth.all.min.js',
      'dist/rebirth.all.min.css',
    ])
    .pipe($.rev())
    .pipe(app.dest('rebirth/assets'))
    .pipe(rmOriginalFiles())
    .pipe($.rev.manifest())
    .pipe(app.dest('./'));
});

/**
 * Docs - Update references
 */
app.task('docs-updateReferences', () => {
  const manifest = app.src('./rev-manifest.json');

  return app
    .src(['rebirth/**'], { base: 'rebirth' })
    .pipe(
      $.revReplace({
        manifest,
        replaceInExtensions: ['.js', '.css', '.html'],
      }),
    )
    .pipe(app.dest('rebirth'));
});

/**
 * Docs - Deploy to GH pages
 */
app.task('docs-deploy', () => {
  ghpages.publish('rebirth', (err) => {
    console.log(err);
  });
});

/* ======
 * Rebirth - Tasks
 * ====== */

/**
 * Rebirth - Stylesheets
 */
app.task('stylesheets', () => {
  const pipeline = app
    .src(['src/index.scss', 'src/index.all.scss'])
    .pipe(
      $.sass({
        includePaths: ['node_modules', 'bower_components'],
        outputStyle: 'expanded',
      }),
    )
    .on('error', handleError)
    .on('error', $.sass.logError)
    .pipe($.autoprefixer())
    .pipe(
      $.rename((path) => {
        const first = path.basename.split('.')[0];
        path.basename = path.basename.replace(first, 'rebirth');
      }),
    );

  if (PRODUCTION) {
    return pipeline
      .pipe(app.dest('dist/'))
      .pipe($.rename({ suffix: '.min' }))
      .pipe($.combineMq({ beautify: false }))
      .pipe(
        postcss([
          cssnano({
            mergeRules: false,
            zindex: false,
            discardComments: { removeAll: true },
          }),
        ]),
      )
      .pipe(app.dest('dist/'));
  }
  return pipeline.pipe(app.dest('dist/')).pipe(browserSync.stream());
});

/**
 * Rebirth - Javascripts
 */
app.task('javascripts', (callback) => {
  const scripts = [
    {
      fileName: 'index.js',
      rename: 'rebirth',
    },
    {
      fileName: 'index.all.js',
      rename: 'rebirth.all',
    },
    {
      fileName: 'head.js',
      rename: 'rebirth.head',
    },
  ];

  return bundleJavaScripts('src/', 'dist/', scripts, true, callback);
});

/**
 * Rebirth - Clean up build
 */
app.task('cleanUp', (cb) => {
  rimraf.sync('dist/assets');
  cb();
});

/**
 * App & Rebirth - JavasScript coding style
 */
app.task('eslint', () =>
  app
    .src('src/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError()),
);

/* ======
 * Rebirth - Collected tasks
 * ====== */

const tasks = ['stylesheets', 'javascripts'];

app.task('build', () => {
  rimraf.sync('dist');

  app.build(tasks.concat(['cleanUp']), (err) => {
    if (err) throw err;
  });
});

/* ======
 * Docs - Collected tasks
 * ====== */

const docsTasks = tasks.concat([
  'docs-javascripts',
  'docs-stylesheets',
  'docs-images',
  'docs-fonts',
  'docs-html',
]);

app.task('docs-build', () => {
  rimraf.sync('rebirth');

  app.build(
    docsTasks.concat(['docs-inline', 'docs-rev', 'docs-updateReferences']),
    (err) => {
      if (err) throw err;
    },
  );
});

app.task('docs-watch', () => {
  rimraf.sync('rebirth');
  rimraf.sync('dist');
  app.build(docsTasks, app.parallel(['docs-server', 'docs-watch-files']));
});

/* ======
 * Utilities
 * ====== */

function handleError(err) {
  $.util.log(err);
  $.util.beep();
  notifier.notify({
    title: 'Compile Error',
    message: err.message,
  });
  return this.emit('end');
}

function inline(opts) {
  opts = opts || {};

  if (opts.matchFile) {
    if (opts.matchFile.match(/.js/)) {
      return new RegExp(
        `<script(.*?)src="(.*?)${opts.matchFile}"(.*?)>(.*?)<\/script>`,
      );
    }

    return new RegExp(`<link(.*?)href="(.*?)${opts.matchFile}"(.*?)>`);
  }

  if (opts.file) {
    let content;
    let tagBegin = '<script>';
    let tagEnd = '</script>';

    if (opts.file.match(/.js/)) {
      content = fs.readFileSync(`rebirth/assets/${opts.file}`, 'utf8');
    } else {
      tagBegin = '<style>';
      tagEnd = '</style>';
      content = fs.readFileSync(`rebirth/assets/${opts.file}`, 'utf8');
    }

    return tagBegin + content + tagEnd;
  }
}

let startTime,
  bundleLogger = {
    start(filepath) {
      startTime = process.hrtime();
      $.util.log('Bundling', $.util.colors.green(filepath));
    },
    end(filepath) {
      const taskTime = process.hrtime(startTime);
      const prettyTime = prettyHrtime(taskTime);
      $.util.log(
        'Bundled',
        $.util.colors.green(filepath),
        'after',
        $.util.colors.magenta(prettyTime),
      );
    },
  };

function rmOriginalFiles() {
  return through.obj(function(file, enc, cb) {
    if (file.revOrigPath) {
      fs.unlinkSync(file.revOrigPath);
    }

    this.push(file);
    return cb();
  });
}

function bundleJavaScripts(src, dest, scripts, rename, cb) {
  let bundleQueue = scripts.length;

  const browserifyBundle = function(entry) {
    let pipeline = browserify({
      entries: src + entry.fileName,
      debug: !PRODUCTION,
      paths: ['src', 'docs/assets'],
    });

    const bundle = function() {
      bundleLogger.start(entry.fileName);

      let collect = pipeline
        .bundle()
        .on('error', handleError)
        .pipe(source(entry.fileName));

      if (rename) {
        collect = collect.pipe($.rename({ basename: entry.rename }));
      }

      if (PRODUCTION) {
        if (rename) {
          collect = collect
            .pipe(app.dest(dest))
            .pipe($.rename({ suffix: '.min' }));
        }

        collect = collect.pipe($.streamify(uglify));
      } else {
        collect = collect.pipe(browserSync.stream());
      }

      return collect.pipe(app.dest(dest)).on('end', reportFinished);
    };

    if (!PRODUCTION) {
      pipeline = watchify(pipeline).on('update', bundle);
    }

    let reportFinished = function() {
      bundleLogger.end(entry.fileName);
      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          cb();
        }
      }
    };

    return bundle();
  };

  scripts.forEach(browserifyBundle);
}

module.exports = app;
