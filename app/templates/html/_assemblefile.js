/* ========================================
 * Gulpfile for `<%= appNameHumanize %>`
 * ========================================
 *
 * @generated <%= (generatorDate) %> using `<%= pkg.name %> v<%= pkg.version %>`
 * @url <%= (generatorRepository) %>
 */

'use strict';

var assemble = require('assemble');
var fs = require('fs');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var notifier = require('node-notifier');
var path = require('path');
var prettyHrtime = require('pretty-hrtime');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var through = require('through2');
var watchify = require('watchify');
var $ = require('gulp-load-plugins')();

var production = process.env.NODE_ENV === 'production';

/**
 * Config
 */
var config = {
  dest: 'dist/',
  src: 'src/',
  tmp: 'dist/assets/.tmp/',
  fonts: {
    dest: 'dist/assets/fonts/',
    src: 'src/assets/fonts/*.{eot,svg,ttf,woff}',
    watch: 'src/assets/fonts/*.{eot,svg,ttf,woff}'
  },
  html: {
    data: 'src/*.{json,yml}',
    dest: 'dist/',
    helpers: 'src/helpers/*.js',
    layouts: 'src/layouts/*.hbs',
    partials: 'src/partials/*.hbs',
    templates: 'src/templates/**/*.hbs',
    watch: ['src/{layouts,templates,partials}/**/*.hbs', 'src/*.{json,yml}']
  },
  images: {
    dest: 'dist/assets/images/',
    src: 'src/assets/images/*.{jpg,jpeg,png,gif,webp,svg}',
    watch: 'src/assets/images/*.{jpg,jpeg,png,gif,webp,svg}'
  },
  javascripts: {
    bundle: [{
      fileName: 'app.js',
      src: 'src/assets/javascripts/app.js'
    }, {
      fileName: 'head.js',
      src: 'src/assets/javascripts/head.js'
    }],
    dest: 'dist/assets/javascripts/',
    src: 'src/assets/javascripts/'
  },
  stylesheets: {
    dest: 'dist/assets/stylesheets/',
    src: 'src/assets/stylesheets/app.scss',
    watch: 'src/assets/stylesheets/**/*.scss'
  }
}

/**
 * Helpers
 */
function handleError(err) {
  $.util.log(err);
  $.util.beep();
  notifier.notify({
    title: 'Compile Error',
    message: err.message
  });
  return this.emit('end');
}

/**
 * Assemble / Html
 */
assemble.data({ production: production });
assemble.option({
  assets: config.dest + 'assets',
  layout: 'layout'
});

assemble.task('html', function() {
  assemble.data(config.html.data);
  assemble.helpers(config.html.helpers);
  assemble.layouts(config.html.layouts);
  assemble.partials(config.html.partials);

  var pipeline = assemble.src(config.html.templates)
    .on('error', handleError)
    .pipe($.rename({extname: '.html'}))
    .pipe(assemble.dest(config.html.dest));

  if (!production) {
    return pipeline.pipe(browserSync.stream());
  }
});

/**
 * Stylesheets
 */
assemble.task('stylesheets', function() {
  var pipeline = gulp.src(config.stylesheets.src)
    .pipe($.sass({
      includePaths: ['node_modules', 'bower_components'],
      outputStyle: 'expanded'
    }))
    .on('error', handleError)
    .on('error', $.sass.logError)
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }));

  if (production) {
    pipeline = pipeline.pipe($.combineMq())
      .pipe($.minifyCss())
      .pipe($.rename({suffix: '.min'}));
  }

  pipeline.pipe(gulp.dest(config.stylesheets.dest));

  if (!production) {
    return pipeline.pipe(browserSync.stream());
  }
});

/**
 * Javascripts
 */
var startTime;
var bundleLogger = {
  start: function(filepath) {
    startTime = process.hrtime();
    $.util.log('Bundling', $.util.colors.green(filepath));
  },

  end: function(filepath) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    $.util.log('Bundled', $.util.colors.green(filepath), 'after', $.util.colors.magenta(prettyTime));
  }
};

assemble.task('javascripts', function(callback) {
  browserSync.notify('Compiling JavaScripts');

  var bundleQueue = config.javascripts.bundle.length;

  var browserifyBundle = function(bundleConfig) {

    var pipeline = browserify({
      cache: {},
      packageCache: {},
      fullPaths: false,
      entries: bundleConfig.src,
      debug: !production
    });

    if (production) {
      pipeline.external(bundleConfig.external);
    }

    var bundle = function() {
      bundleLogger.start(bundleConfig.fileName);

      var collect = pipeline
        .bundle()
        .on('error', handleError)
        .pipe(source(bundleConfig.fileName));

      if (production) {
        collect = collect
          .pipe($.streamify($.uglify()))
          .pipe($.rename({suffix: '.min'}))
      } else {
        collect = collect.pipe(browserSync.stream())
      }

      return collect
        .pipe(gulp.dest(config.javascripts.dest))
        .on('end', reportFinished);
    };

    if (!production) {
      pipeline = watchify(pipeline);
      pipeline.on('update', bundle);
    }

    var reportFinished = function() {
      bundleLogger.end(bundleConfig.fileName)

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
assemble.task('images', function() {
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
assemble.task('fonts', function() {
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
assemble.task('server', function() {
  return browserSync.init({
    open: false,
    port: 9001,
    server: {
      baseDir: config.dest,
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    notify: false
  });
});

/**
 * Watch
 */
assemble.task('watch', function() {
  assemble.watch(config.html.watch, ['html']);
  assemble.watch(config.stylesheets.watch, ['stylesheets']);
  assemble.watch(config.fonts.watch, ['fonts']);
  assemble.watch(config.images.watch, ['images']);
});

/**
 * Tasks shortcut
 */
var tasks = ['stylesheets', 'javascripts', 'images', 'fonts'];

/**
 * Coding style
 */
assemble.task('jscs', function() {
  return gulp.src(config.javascripts.src + '**/*.js')
    .pipe($.jscs());
});

/**
 * Modernizr
 */
assemble.task('modernizr', ['stylesheets'], function() {
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
    .pipe(gulp.dest(config.tmp));
});

/**
 * Concat and minify <head> JavaScripts
 */
assemble.task('headScripts', ['modernizr', 'javascripts'], function() {
  return gulp.src([
    config.tmp + 'modernizr.js',
    config.javascripts.dest + 'head.min.js'
  ])
    .pipe($.uglify())
    .pipe($.concat('head.min.js'))
    .pipe(gulp.dest(config.javascripts.dest));
});

/**
 * Copy necessary assets
 */
assemble.task('copyAssets', function() {
  return gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(config.javascripts.dest + 'vendors/'))
});

/**
 * Revision
 */
var rmOriginalFiles = function() {
  return through.obj(function(file, enc, cb) {

    if (file.revOrigPath) {
      fs.unlink(file.revOrigPath);
    }

    this.push(file);
    return cb();
  });
};

assemble.task('rev', tasks.concat(['html']), function() {
  return gulp.src([
    config.dest + 'assets/{stylesheets,javascripts,images,fonts}/**'
  ])
    .pipe($.rev())
    .pipe(gulp.dest(config.dest + 'assets/'))
    .pipe(rmOriginalFiles())
    .pipe($.rev.manifest())
    .pipe(gulp.dest('./'));
});

/**
 * Update references
 */
assemble.task('updateReferences', tasks.concat(['rev']), function() {
  var manifest = gulp.src('./rev-manifest.json');

  return gulp.src([
    config.dest + '**'
  ], { base: config.dest })
    .pipe($.revReplace({
      manifest: manifest,
      replaceInExtensions: ['.js', '.css', '.html']
    }))
    .pipe(gulp.dest(config.dest));
});

/**
 * Combined tasks
 */
assemble.task('build', ['jscs'], function() {
  rimraf.sync(config.dest);
  assemble.start(tasks.concat([
    'html',
    'modernizr',
    'headScripts',
    'rev',
    'updateReferences',
    'copyAssets'
  ]));
});

assemble.task('default', function() {
  assemble.start('build');
});

assemble.task('dev', function() {
  rimraf.sync(config.dest);
  assemble.start(tasks.concat([
    'html',
    'modernizr',
    'watch',
    'server'
  ]));
});
