/* ========================================
 * Gulpfile for `<%= appNameHumanize %>`
 * ========================================
 *
 * @generated <%= (generatorDate) %> using `<%= pkg.name %> v<%= pkg.version %>`
 * @url <%= (generatorRepository) %>
 */

'use strict';

var fs = require('fs');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var merge = require('merge-stream');
var notifier = require('node-notifier');
var path = require('path');
var prettyHrtime = require('pretty-hrtime');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var through = require('through2');
var watchify = require('watchify');
var $ = require('gulp-load-plugins')();

var production = false;
var host = process.env.npm_config_host;
var open = process.env.npm_config_open;


/* ======
 * Config
 * ====== */

var config = {
  host: '<%= appNameDasherize %>.dev',
  src: '<%= appRoot %>/',
  dest: '<%= appRoot %>/dist/',
  stylesheets: {
    src: '<%= appRoot %>/assets/stylesheets/app.scss',
    dest: '<%= appRoot %>/dist/assets/stylesheets/',
    watch: '<%= appRoot %>/assets/stylesheets/**/*.scss'
  },
  javascripts: {
    src: '<%= appRoot %>/assets/javascripts/',
    dest: '<%= appRoot %>/dist/assets/javascripts/',
    bundle: [{
      src: '<%= appRoot %>/assets/javascripts/app.js',
      file_name: 'app.js'
    }, {
      src: '<%= appRoot %>/assets/javascripts/head.js',
      file_name: 'head.js'
    }]
  },
  images: {
    src: '<%= appRoot %>/assets/images/*.{jpg,jpeg,png,gif,webp,svg}',
    dest: '<%= appRoot %>/dist/assets/images/',
    watch: '<%= appRoot %>/assets/images/*.{jpg,jpeg,png,gif,webp,svg}'
  },
  fonts: {
    src: '<%= appRoot %>/assets/fonts/*.{eot,svg,ttf,woff}',
    dest: '<%= appRoot %>/dist/assets/fonts/',
    watch: '<%= appRoot %>/assets/fonts/*.{eot,svg,ttf,woff}'
  }
}


/* ======
 * Tasks
 * ====== */

/**
 * Stylesheets
 */
gulp.task('stylesheets', function() {
  var pipeline = gulp.src(config.stylesheets.src)
    .pipe($.sass({
      includePaths: ['node_modules', 'bower_components'],
      outputStyle: 'expanded'
    }))
    .on('error', handleError)
    .on('error', $.sass.logError)
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'IE 10']
    }));

  if (production) {
    pipeline = pipeline
      .pipe($.replace('../', '/wp-content/themes/' + config.dest + 'assets/'))
      .pipe($.combineMq({ beautify: false }))
      .pipe($.cssnano({ mergeRules: false }))
      .pipe(gulp.dest(config.stylesheets.dest));
  } else {
    return pipeline = pipeline
      .pipe(gulp.dest(config.stylesheets.dest))
      .pipe(browserSync.stream());
  }
});

/**
 * Javascripts
 */
gulp.task('javascripts', function(callback) {

  var bundleQueue = config.javascripts.bundle.length;

  var browserifyBundle = function(bundleConfig) {

    var pipeline = browserify({
      cache: {},
      packageCache: {},
      fullPaths: false,
      entries: bundleConfig.src,
      debug: !production
    });

    var bundle = function() {
      bundleLogger.start(bundleConfig.file_name);

      var collect = pipeline
        .bundle()
        .on('error', handleError)
        .pipe(source(bundleConfig.file_name));

      if (!production) {
        collect = collect.pipe(browserSync.stream())
      }

      return collect
        .pipe(gulp.dest(config.javascripts.dest))
        .on('end', reportFinished);
    };

    if (!production) {
      pipeline = watchify(pipeline).on('update', bundle);
    }

    var reportFinished = function() {
      bundleLogger.end(bundleConfig.file_name)

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          callback();
        }
      }
    };

    return bundle();
  };

  config.javascripts.bundle.forEach(browserifyBundle);
});

/**
 * Images
 */
gulp.task('images', function() {
  var pipeline = gulp.src(config.images.src)
    .pipe($.changed(config.images.dest))
    .pipe($.imagemin())
    .on('error', handleError)
    .pipe(gulp.dest(config.images.dest));

  if (production) {
    return pipeline;
  }

  return pipeline.pipe(browserSync.stream());
});

/**
 * Fonts
 */
gulp.task('fonts', function() {
  var pipeline = gulp.src(config.fonts.src)
    .pipe($.changed(config.fonts.dest))
    .on('error', handleError)
    .pipe(gulp.dest(config.fonts.dest));

  if (production) {
    return pipeline;
  }

  return pipeline.pipe(browserSync.stream());
});

/**
 * Server
 */
gulp.task('server', function() {
  browserSync.init({
    open: open === undefined ? 'external' : open,
    port: 9001,
    proxy: host ? host : config.host,
    notify: false,
    serveStatic: ['./']
  });
});

/**
 * Watch
 */
gulp.task('watch', function(callback) {
  gulp.watch(config.src + '**/*.php').on('change', browserSync.reload);
  gulp.watch(config.stylesheets.watch, ['stylesheets']);
  gulp.watch(config.fonts.watch, ['fonts']);
  gulp.watch(config.images.watch, ['images']);
  gulp.watch('gulpfile.js', ['default']);
});

/**
 * Copy necessary assets
 */
gulp.task('copyAssets', function() {
  return gulp.src('node_modules/jquery/dist/jquery.js')
    .pipe(gulp.dest(config.javascripts.dest + 'vendors/'))
});

/**
 * JavasScript Coding style
 */
gulp.task('jscs', function() {
  return gulp.src(config.javascripts.src + '**/*.js')
    .pipe($.jscs());
});

/**
 * Modernizr
 */
gulp.task('modernizr', ['stylesheets'], function() {
  return gulp.src([
    config.javascripts.src + '**/*.js',
    config.stylesheets.dest + 'app.css'
  ])
    .pipe($.modernizr({
      excludeTests: ['hidden'],
      tests: [''],
      options: [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind',
        'prefixed'
      ]
    }))
    .on('error', handleError)
    .pipe(gulp.dest(config.javascripts.dest));
});

/**
 * Concat and minify JavaScripts
 */
gulp.task('minifyScripts', ['modernizr', 'javascripts'], function() {
  var headScripts = gulp.src([
    config.javascripts.dest + 'modernizr.js',
    config.javascripts.dest + 'head.js'
  ])
    .pipe($.concat('head.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(config.javascripts.dest));

  var bottomScripts = gulp.src([
    // 'bower_components/add/your/script/if/needed',
    config.javascripts.dest + 'app.js'
  ])
    .pipe($.concat('app.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(config.javascripts.dest));

  return merge(headScripts, bottomScripts);
});

/**
 * Combined tasks
 */
var tasks = ['stylesheets', 'javascripts', 'images', 'fonts'];

/**
 * Create dist files and inline <head> css/js
 */
gulp.task('createDistPartials', tasks.concat(['minifyScripts']), function() {
  return gulp.src([
    config.src + 'partials/top.php',
    config.src + 'partials/bottom.php',
  ], { base: config.src })
    .pipe($.replace(inline({ matchFile: 'app.css' }), function() {
      return inline({ file: 'app.css' });
    }))
    .pipe($.replace(inline({ matchFile: 'head.js' }), function() {
      return inline({ file: 'head.js' });
    }))
    .pipe($.rename({ suffix: '.dist' }))
    .pipe(gulp.dest(config.dest));
});

/**
 * Revision and remove unneeded files
 */
gulp.task('rev', tasks.concat(['createDistPartials']), function() {
  rimraf.sync(config.stylesheets.dest);
  rimraf.sync(config.javascripts.dest + 'head.js');
  rimraf.sync(config.javascripts.dest + 'modernizr.js');

  return gulp.src([
    config.dest + 'assets/{images,fonts,javascripts}/**'
  ])
    .pipe($.rev())
    .pipe(gulp.dest(config.dest + 'assets'))
    .pipe(rmOriginalFiles())
    .pipe($.rev.manifest())
    .pipe(gulp.dest('./'));
});

/**
 * Update references
 */
gulp.task('updateReferences', tasks.concat(['rev']), function() {
  var manifest = gulp.src('./rev-manifest.json');

  return gulp.src([
    config.dest + 'assets/**',
    config.dest + 'partials/top.dist.php',
    config.dest + 'partials/bottom.dist.php'
  ], { base: config.dest })
    .pipe($.revReplace({
      manifest: manifest,
      replaceInExtensions: ['.js', '.css', '.php']
    }))
    .pipe(gulp.dest(config.dest));
});


/* ======
 * Main collected tasks
 * ====== */

gulp.task('build', ['jscs'], function() {
  rimraf.sync(config.dest);
  production = true;
  gulp.start(tasks.concat([
    'modernizr',
    'minifyScripts',
    'createDistPartials',
    'rev',
    'updateReferences'
  ]));
});

gulp.task('default', ['build']);

gulp.task('dev', tasks.concat([
  'copyAssets',
  'modernizr',
  'watch',
  'server'
]));


/* ======
 * Utilities
 * ====== */

function handleError(err) {
  $.util.log(err);
  $.util.beep();
  notifier.notify({
    title: 'Compile Error',
    message: err.message
  });
  return this.emit('end');
}

function inline(opts) {
  opts = opts || {};

  if (opts.matchFile) {
    if (opts.matchFile.match(/.js/)) {
      return new RegExp('<script(.*?)src="(.*?)'+opts.matchFile+'"(.*?)>(.*?)<\/script>');
    }
    return new RegExp('<link(.*?)href="(.*?)'+opts.matchFile+'"(.*?)>');
  }

  if (opts.file) {
    var content;
    var tagBegin = '<script>';
    var tagEnd = '</script>';

    if (opts.file.match(/.js/)) {
      content = fs.readFileSync(config.javascripts.dest + opts.file, 'utf8');
    } else {
      tagBegin = '<style>';
      tagEnd = '</style>';
      content = fs.readFileSync(config.stylesheets.dest + opts.file, 'utf8');
    }

    return tagBegin + content + tagEnd;
  }
}

var startTime, bundleLogger = {
  start: function(filepath) {
    startTime = process.hrtime();
    $.util.log('Bundling', $.util.colors.green(filepath));
  },
  end: function(filepath) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    $.util.log('Bundled', $.util.colors.green(filepath), 'after', $.util.colors.magenta(prettyTime));
  }
}

function rmOriginalFiles() {
  return through.obj(function(file, enc, cb) {

    if (file.revOrigPath) {
      fs.unlink(file.revOrigPath);
    }

    this.push(file);
    return cb();
  });
}
