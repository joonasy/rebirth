/* ========================================
 * Gruntfile for `<%= appNameHumanize %>`
 * ========================================
 *
 * @generated <%= (generatorDate) %> using `<%= pkg.name %> v<%= pkg.version %>`
 * @url <%= (generatorRepository) %>
 */

'use strict';

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
  ext: '/typo3conf/ext/<%= appRoot %>/',
  src: 'Resources/Private/',
  dest: 'Resources/Public/',
  stylesheets: {
    src: 'Assets/stylesheets/app.scss',
    dest: 'Resources/Public/Assets/stylesheets/',
    watch: 'Assets/stylesheets/**/*.scss'
  },
  javascripts: {
    src: 'Assets/javascripts/',
    dest: 'Resources/Public/Assets/javascripts/',
    bundle: [{
      src: 'Assets/javascripts/app.js',
      fileName: 'app.js',
      external: ['jquery']
    }, {
      src: 'Assets/javascripts/head.js',
      fileName: 'head.js',
      external: []
    }]
  },
  images: {
    src: 'Assets/images/*.{jpg,jpeg,png,gif,webp}',
    dest: 'Resources/Public/Assets/images/',
    watch: 'Assets/images/*.{jpg,jpeg,png,gif,webp}'
  },
  fonts: {
    src: 'Assets/fonts/*.{eot,svg,ttf,woff}',
    dest: 'Resources/Public/Assets/fonts/',
    watch: 'Assets/fonts/*.{eot,svg,ttf,woff}'
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
 * Stylesheets
 */
gulp.task('stylesheets', function() {
  var pipeline = gulp.src(config.stylesheets.src)
    .pipe($.sass({
      includePaths: ['node_modules', 'bower_components'],
      outputStyle: production ? 'compressed' : 'expanded'
    }))
    .on('error', handleError)
    .on('error', $.sass.logError)
    .pipe($.autoprefixer('last 2 versions', 'IE 9'));

  if (production) {
    pipeline = pipeline.pipe($.replace('../Assets/', config.ext + config.dest))
      .pipe($.combineMediaQueries({log: true}))
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

gulp.task('javascripts', function(callback) {

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
gulp.task('images', function() {
  var pipeline = gulp.src(config.images.src)
    .pipe($.changed(config.images.dest))
    .pipe($.imagemin())
    .on('error', handleError)
    .pipe(gulp.dest(config.images.dest));

  if (production) {
    return pipeline;
  }

  return pipeline.pipe(browserSync.reload({stream: true}));
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

  return pipeline.pipe(browserSync.reload({stream: true}));
});

/**
 * Server
 */
gulp.task('server', function() {
  return browserSync({
    open: false,
    port: 9001,
    proxy: '<%= appRoot %>.dev'
  });
});

/**
 * Watch
 */
gulp.task('watch', function(callback) {
  gulp.watch(config.src + '**/*.html').on('change', browserSync.reload);
  gulp.watch(config.stylesheets.watch, ['stylesheets']);
  gulp.watch(config.fonts.watch, ['fonts']);
  gulp.watch(config.images.watch, ['images']);
});

/**
 * Tasks
 */
var tasks = ['stylesheets', 'javascripts','images', 'fonts'];

/**
 * Coding style
 */
gulp.task('jscs', function() {
  return gulp.src(config.javascripts.src + '**/*.js')
    .pipe($.jscs());
});

/**
 * Modernizr
 */
gulp.task('modernizr', ['stylesheets', 'javascripts'], function() {
  return gulp.src([
    config.javascripts.dest + '*.js',
    config.stylesheets.dest + '*.css'
  ])
    .pipe($.modernizr({
      excludeTests: ['hidden']
    }))
    .on('error', handleError)
    .pipe($.uglify())
    .pipe(gulp.dest(config.javascripts.dest));
});

/**
 * Concat
 */
gulp.task('concatModernizr', ['modernizr'], function() {
  return gulp.src([
    config.javascripts.dest + 'modernizr.js',
    config.javascripts.dest + 'head.min.js'
  ])
    .pipe($.concat('head.min.js'))
    .pipe(gulp.dest(config.javascripts.dest))
});

/**
 * Create dist files
 */
gulp.task('createDistPartials', tasks, function() {
  return gulp.src([
    config.src + 'Partials/Top.html',
    config.src + 'Partials/Bottom.html'
  ], {base: config.src})
    .pipe($.rename({suffix: '.dist'}))
    .pipe(gulp.dest(config.src));
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

gulp.task('rev', tasks.concat(['createDistPartials']), function() {
  return gulp.src([
    config.dest + 'Assets/{stylesheets,javascripts,images,fonts}/**'
  ])
    .pipe($.rev())
    .pipe(gulp.dest(config.dest + 'Assets/'))
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
    config.dest + 'Assets/**',
    config.src + 'Partials/Top.dist.html',
    config.src + 'Partials/Bottom.dist.html'
  ], {base: config.dest})
    .pipe($.revReplace({
      manifest: manifest,
      replaceInExtensions: ['.js', '.css', '.html']
    }))
    .pipe(gulp.dest(config.dest));
});

/**
 * Combined tasks
 */
gulp.task('build', ['jscs'], function() {
  rimraf.sync(config.dest);
  gulp.start(tasks.concat(['modernizr', 'concatModernizr', 'createDistPartials', 'rev', 'updateReferences']));
});

gulp.task('default', function() {
  gulp.start('build');
});

gulp.task('dev', tasks.concat(['watch', 'server']));
