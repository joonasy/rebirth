/* =======================================
 * Assemble for `Rebirth`
 * ======================================= */

const assemble = require('assemble');
const app = assemble();
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const color = require('ansi-colors');
const cssnano = require('cssnano');
const fs = require('fs');
const ghpages = require('gh-pages');
const log = require('fancy-log');
const handlebarsHelpers = require('handlebars-helpers')();
const notifier = require('node-notifier');
const pkg = require('./package.json');
const prettyHrtime = require('pretty-hrtime');
const rimraf = require('rimraf');
const source = require('vinyl-source-stream');
const through = require('through2');
const uglify = require('gulp-uglify-es').default;
const yaml = require('js-yaml');
const watch = require('base-watch');
const watchify = require('watchify');
const $ = require('gulp-load-plugins')();

const PRODUCTION = process.env.NODE_ENV === 'production';
const DIST = process.env.DIST;


/* ======
 * Docs - Tasks
 * ====== */

/**
 * Config
 */
const config = {
  root: 'https://joonassandell.github.io/rebirth/',
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
  root: PRODUCTION && !DIST ? config.root : '/',
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
    .on('error', $.sass.logError)
    .pipe($.autoprefixer());

  if (PRODUCTION) {
    return pipeline
      .pipe($.replace('./', `${config.root}assets`))
      .pipe(
        $.postcss([
          cssnano({
            autoprefixer: false,
            mergeRules: false,
          }),
          require('postcss-discard-comments')({ removeAll: true }),
          require('postcss-sort-media-queries')(),
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

app.task('docs-images:svgSymbols', () => {
  return app
    .src('docs/assets/images/symbols/*.svg')
    .pipe(
      $.imagemin([
        $.imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(
      $.svgSymbols({
        id: 'Icon--%f',
        class: '.Icon--%f',
        title: `%f icon`,
        slug: (name) => name,
        templates: ['default-svg'],
      }),
    )
    .on('error', handleError)
    .pipe(app.dest('rebirth/assets/images/'));
});

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
    open: process.env.DISABLE_OPEN ? false : 'external',
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
app.task('docs-watch:files', () => {
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
  app.watch('docs/assets/images/symbols/*.svg', [
    'docs-images:svgSymbols',
  ]);
  app.watch('src/images/symbols/*.svg', [
    'images:svgSymbols',
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
    .pipe($.replace(findFile('docs.css'), () => inlineFile('docs.css')))
    .pipe($.replace(findFile('docs.head.js'), () => inlineFile('docs.head.js')))
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
      .pipe(
        $.postcss([
          cssnano({
            autoprefixer: false,
            mergeRules: false,
          }),
          require('postcss-discard-comments')({ removeAll: true }),
          require('postcss-sort-media-queries')(),
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

app.task('images:svgSymbols', () => {
  return app
    .src('src/images/symbols/*.svg')
    .pipe(
      $.imagemin([
        $.imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(
      $.svgSymbols({
        id: 'Icon--%f',
        class: '.Icon--%f',
        title: `%f icon`,
        slug: (name) => name,
        templates: ['default-svg'],
      }),
    )
    .on('error', handleError)
    .pipe(app.dest('dist/images/'));
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

const tasks = ['stylesheets', 'javascripts', 'images:svgSymbols'];

app.task('build', () => {
  rimraf.sync('dist');

  app.build(tasks, (err) => {
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
  'docs-images:svgSymbols',
  'docs-fonts',
  'docs-html',
]);

app.task('docs-build', () => {
  rimraf.sync('rebirth');

  app.build(
    docsTasks.concat([
      'docs-inline',
      'docs-rev',
      'docs-updateReferences',
    ]),
    (err) => {
      if (err) throw err;
    },
  );
});

app.task('docs-watch', () => {
  rimraf.sync('rebirth');
  rimraf.sync('dist');
  app.build(docsTasks, app.parallel(['docs-server', 'docs-watch:files']));
});

/* ======
 * Utilities
 * ====== */

function handleError(err) {
  log.error(err);
  notifier.notify({
    title: 'Compile Error',
    message: err.message,
  });
  return this.emit('end');
}

function inlineFile(file) {
  if (file.match(/.js/)) {
    const content = fs.readFileSync(`rebirth/assets/${file}`, 'utf8');
    return `<script>${content}</script>`;
  } else {
    const content = fs.readFileSync(`rebirth/assets/${file}`, 'utf8');
    return `<style>${content}</style>`;
  }
}

function findFile(file) {
  if (file.match(/.js/)) {
    return new RegExp(`<script(.*?)src="(.*?)${file}"(.*?)>(.*?)</script>`);
  }
  return new RegExp(`<link(.*?)href="(.*?)${file}"(.*?)>`);
}

let startTime;
const bundleLog = {
  start: (filepath) => {
    startTime = process.hrtime();
    log('Bundling', color.green(filepath));
  },
  end: (filepath) => {
    let taskTime = process.hrtime(startTime);
    let prettyTime = prettyHrtime(taskTime);
    log(`Bundled ${color.green(filepath)} after ${color.magenta(prettyTime)}`);
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

  const browserifyBundle = (entry) => {
    let pipeline = browserify({
      entries: `${src}${entry.fileName}`,
      debug: !PRODUCTION,
      paths: ['src', 'docs/assets'],
    });

    const bundle = () => {
      bundleLog.start(entry.fileName);

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

    const reportFinished = () => {
      bundleLog.end(entry.fileName);
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
