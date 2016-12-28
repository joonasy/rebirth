/* ========================================
 * Gulpfile for `Rebirth`
 * ========================================
 *
 * @generated 4.8.2015 using `generator-rebirth v0.2.0`
 * @url https://github.com/joonasy/generator-rebirth
 */

var assemble = require('assemble')
var app = assemble()
var fs = require('fs')
var browserify = require('browserify')
var browserSync = require('browser-sync').create()
var handlebarsHelpers = require('handlebars-helpers')()
var notifier = require('node-notifier')
var path = require('path')
var prettyHrtime = require('pretty-hrtime')
var rimraf = require('rimraf')
var source = require('vinyl-source-stream')
var through = require('through2')
var vfs = require('vinyl-fs')
var watch = require('base-watch')
var watchify = require('watchify')
var $ = require('gulp-load-plugins')()

var production = process.env.NODE_ENV === 'production'
var open = process.env.npm_config_open

/* ======
 * Config
 * ====== */

var config = {
  buildPath: '/',
  dest: 'dist/',
  docs: {
    data: 'docs/*.{json,yml}',
    dest: 'docs-dist/',
    fonts: {
      dest: 'docs-dist/assets/fonts/',
      src: 'docs/assets/fonts/*.{eot,svg,ttf,woff,woff2}',
      watch: 'docs/assets/fonts/*.{eot,svg,ttf,woff,woff2}'
    },
    helpers: 'docs/helpers/*.js',
    images: {
      dest: 'docs-dist/assets/images/',
      src: 'docs/assets/images/*.{jpg,jpeg,png,gif,webp,svg}',
      watch: 'docs/assets/images/*.{jpg,jpeg,png,gif,webp,svg}'
    },
    javascripts: {
     src: 'docs/assets/',
     dest: 'docs-dist/assets/',
     bundle: [{
        fileName: 'docs.js',
        src: 'docs/assets/docs.js'
      }, {
        fileName: 'docs.head.js',
        src: 'docs/assets/docs.head.js'
      }]
    },
    layouts: 'docs/layouts/*.hbs',
    partials: 'docs/partials/*.hbs',
    stylesheets: {
      src: 'docs/assets/docs.scss',
      dest: 'docs-dist/assets/',
      watch: 'docs/assets/**/**/*.scss'
    },
    templates: 'docs/templates/**/*.hbs',
    watch: ['docs/{layouts,templates,partials}/**/*.hbs', 'docs/*.{json,yml}']
  },
  javascripts: {
    src: 'src/',
    dest: 'dist/',
    bundle: [{
      fileName: 'app.js',
      rename: 'rebirth'
    }, {
      fileName: 'app.head.js',
      rename: 'rebirth.head'
    }]
  },
  src: 'src/',
  stylesheets: {
    dest: 'dist/',
    rename: 'rebirth',
    src: 'src/app.scss',
    watch: 'src/**/**/*.scss'
  }
}

/* ======
 * Docs - Tasks
 * ====== */

/**
 * Docs - Assemble
 */
app.data({ assets: 'assets' })
app.data(config.docs.data)
app.helpers(config.docs.helpers)
app.helpers(handlebarsHelpers)
app.use(watch())

app.preLayout(/\/docs\/templates\/.*\.hbs$/, function(view, next) {
  view.layout = 'default'
  next()
})

app.task('docs-html', function() {
  app.data({ dev: !production })
  app.layouts(config.docs.layouts)
  app.partials(config.docs.partials)

  return app.src(config.docs.templates)
    .pipe(app.renderFile())
    .on('error', handleError)
    .pipe($.rename({ extname: '.html' }))
    .pipe(app.dest(config.docs.dest))
})

/**
 * Docs - Stylesheets
 */
app.task('docs-stylesheets', function() {
  var pipeline = app.src(config.docs.stylesheets.src)
    .pipe($.sass({
      includePaths: ['node_modules', 'bower_components', 'src'],
      outputStyle: 'expanded'
    }))
    .on('error', handleError)
    .on('error', $.sass.logError)
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'IE 10', 'Safari >= 8']
    }))

  if (production) {
    return pipeline = pipeline
      .pipe($.replace('../', config.buildPath + 'assets/'))
      .pipe($.combineMq({ beautify: false }))
      .pipe($.cssnano({ mergeRules: false, zindex: false }))
      .pipe(app.dest(config.docs.stylesheets.dest))
  } else {
    return pipeline = pipeline
      .pipe(app.dest(config.docs.stylesheets.dest))
      .pipe(browserSync.stream())
  }
})

/**
 * Docs - JavaScripts
 */
app.task('docs-javascripts', function(callback) {
  return bundleJavaScripts(
    config.docs.javascripts.src,
    config.docs.javascripts.dest,
    config.docs.javascripts.bundle,
    false,
    callback
  )
});

/**
 * Docs - Images
 */
app.task('docs-images', function() {
  return app.src(config.docs.images.src)
    .pipe($.changed(config.docs.images.dest))
    .pipe($.imagemin({
      svgoPlugins: [
        { cleanupIDs: false },
      ],
    }))
    .on('error', handleError)
    .pipe(app.dest(config.docs.images.dest))
})

/**
 * Docs - Fonts
 */
app.task('docs-fonts', function() {
  return app.src(config.docs.fonts.src)
    .pipe($.changed(config.docs.fonts.dest))
    .on('error', handleError)
    .pipe(app.dest(config.docs.fonts.dest))
})

/**
 * Docs - Server
 */
app.task('docs-server', function() {
  browserSync.init({
    open: open === undefined ? 'external' : open,
    port: 9001,
    notify: false,
    server: {
      baseDir: config.docs.dest,
      routes: {
        '/bower_components': 'bower_components',
        '/dist': 'dist',
        '/node_modules': 'node_modules'
      }
    }
  })
})

/**
 * Docs - Watch
 */
app.task('docs-watch', function() {
  app.watch(config.docs.watch, ['docs-html'], function(cb) {
    setTimeout(function() {
      browserSync.reload()
      cb()
    }, 150)
  })
  app.watch(config.docs.fonts.watch, ['docs-fonts'])
  app.watch(config.docs.images.watch, ['docs-images'])
  app.watch(config.docs.stylesheets.watch, ['docs-stylesheets'])
  app.watch(config.stylesheets.watch, ['stylesheets'])
})

/**
 * Docs - Inline <head> css/js
 */
app.task('docs-inline', function() {
  return app.src([
    config.docs.dest + '**/*.html'
  ], { base: config.docs.dest })
    .pipe($.replace(inline({ matchFile: 'docs.css' }), function() {
      return inline({ file: 'docs.css' })
    }))
    .pipe($.replace(inline({ matchFile: 'docs.head.js' }), function() {
      return inline({ file: 'docs.head.js' })
    }))
    .pipe(app.dest(config.docs.dest))
})

/**
 * Docs - Revision and remove unneeded files
 */
app.task('docs-rev', function() {
  rimraf.sync(config.docs.stylesheets.dest + '*.css')
  rimraf.sync(config.docs.javascripts.dest + 'docs.head.js')

  return app.src([
    config.docs.dest + 'assets/*.{js}',
    config.docs.dest + 'assets/{javascripts,images,fonts}/**'
  ])
    .pipe($.rev())
    .pipe(app.dest(config.docs.dest + 'assets/'))
    .pipe(rmOriginalFiles())
    .pipe($.rev.manifest())
    .pipe(app.dest('./'))
})

/**
 * Docs - Update references
 */
app.task('docs-updateReferences', function() {
  var manifest = app.src('./rev-manifest.json')

  return app.src([
    config.docs.dest + '**'
  ], { base: config.docs.dest })
    .pipe($.revReplace({
      manifest: manifest,
      replaceInExtensions: ['.js', '.css', '.html']
    }))
    .pipe(app.dest(config.docs.dest))
})

/**
 * Rebirth - Stylesheets
 */
app.task('stylesheets', function() {
  var pipeline = app.src(config.stylesheets.src)
    .pipe($.sass({
      includePaths: ['node_modules', 'bower_components'],
      outputStyle: 'expanded'
    }))
    .on('error', handleError)
    .on('error', $.sass.logError)
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'IE 10', 'Safari >= 8']
    }))
    .pipe($.rename({ basename: config.stylesheets.rename }))

  if (production) {
    return pipeline = pipeline
      .pipe($.cssnano({ core: false, mergeRules: false, zindex: false }))
      .pipe(app.dest(config.stylesheets.dest))
      .pipe($.rename({ suffix: '.min' }))
      .pipe($.combineMq({ beautify: false }))
      .pipe($.cssnano({ mergeRules: false, zindex: false }))
      .pipe(app.dest(config.stylesheets.dest))
  } else {
    return pipeline = pipeline
      .pipe(app.dest(config.stylesheets.dest))
      .pipe(browserSync.stream())
  }
})

/**
 * Rebirth - Javascripts
 */
app.task('javascripts', function(callback) {
  return bundleJavaScripts(
    config.javascripts.src,
    config.javascripts.dest,
    config.javascripts.bundle,
    true,
    callback
  )
})

/**
 * Rebirth - Modernizr
 */
app.task('modernizr', function() {
  return app.src([
    config.javascripts.src + '**/*.js',
    config.stylesheets.dest + 'docs.css'
  ])
    .pipe($.modernizr({
      excludeTests: ['hidden'],
      tests: ['objectfit'],
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
    .pipe(app.dest(config.javascripts.dest + 'vendors'))
})

/**
 * Rebirth - Clean up build
 */
app.task('cleanUp', function(cb) {
  rimraf.sync(config.javascripts.dest + 'vendors')
  cb()
})

/**
 * Docs & Rebirth - JavasScript coding style
 */
app.task('eslint', function () {
  return app.src(config.javascripts.src + '**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
})


/* ======
 * Rebirth - Collected tasks
 * ====== */

var tasks = ['stylesheets', 'modernizr', 'javascripts', 'cleanUp']

app.task('build', ['eslint'], function() {
  rimraf.sync(config.dest)
  app.build(tasks, function(err) {
    if (err) throw err
  })
})


/* ======
 * Docs - Collected tasks
 * ====== */

var docsTasks = tasks.concat(['docs-javascripts', 'docs-stylesheets', 'docs-images', 'docs-fonts', 'docs-html'])

app.task('docs-build', ['eslint'], function() {
  rimraf.sync(config.docs.dest)

  app.build(docsTasks.concat([
    'docs-inline',
    'docs-rev',
    'docs-updateReferences'
  ]), function(err) {
    if (err) throw err
  })
})

app.task('docs-dev', function() {
  rimraf.sync(config.docs.dest)
  rimraf.sync(config.dest)
  app.build(docsTasks, app.parallel(['docs-server', 'docs-watch']))
})


/* ======
 * Utilities
 * ====== */

function handleError(err) {
  $.util.log(err)
  $.util.beep()
  notifier.notify({
    title: 'Compile Error',
    message: err.message
  })
  return this.emit('end')
}

function inline(opts) {
  opts = opts || {}

  if (opts.matchFile) {
    if (opts.matchFile.match(/.js/)) {
      return new RegExp('<script(.*?)src="(.*?)' + opts.matchFile + '"(.*?)>(.*?)<\/script>')
    }

    return new RegExp('<link(.*?)href="(.*?)' + opts.matchFile + '"(.*?)>')
  }

  if (opts.file) {
    var content
    var tagBegin = '<script>'
    var tagEnd = '</script>'

    if (opts.file.match(/.js/)) {
      content = fs.readFileSync(config.docs.javascripts.dest + opts.file, 'utf8')
    } else {
      tagBegin = '<style>'
      tagEnd = '</style>'
      content = fs.readFileSync(config.docs.stylesheets.dest + opts.file, 'utf8')
    }

    return tagBegin + content + tagEnd
  }
}

var startTime, bundleLogger = {
  start: function(filepath) {
    startTime = process.hrtime()
    $.util.log('Bundling', $.util.colors.green(filepath))
  },
  end: function(filepath) {
    var taskTime = process.hrtime(startTime)
    var prettyTime = prettyHrtime(taskTime)
    $.util.log('Bundled', $.util.colors.green(filepath), 'after', $.util.colors.magenta(prettyTime))
  }
}

function rmOriginalFiles() {
  return through.obj(function(file, enc, cb) {

    if (file.revOrigPath) {
      fs.unlinkSync(file.revOrigPath)
    }

    this.push(file)
    return cb()
  })
}

function bundleJavaScripts(src, dest, bundleSource, rename, cb) {
  var bundleQueue = bundleSource.length

  var browserifyBundle = function(bundleConfig) {
    var pipeline = browserify({
      cache: {},
      packageCache: {},
      fullPaths: false,
      entries: src + bundleConfig.fileName,
      debug: !production
    })

    var bundle = function() {
      bundleLogger.start(bundleConfig.fileName)

      var collect = pipeline
        .bundle()
        .on('error', handleError)
        .pipe(source(bundleConfig.fileName))

      if (rename) {
        collect = collect.pipe($.rename({ basename: bundleConfig.rename }))
      }

      if (production) {
        if (rename) {
          collect = collect
            .pipe(app.dest(dest))
            .pipe($.rename({ suffix: '.min'}))
        }

        collect = collect.pipe($.streamify($.uglify()))
      } else {
        collect = collect.pipe(browserSync.stream())
      }

      return collect
        .pipe(app.dest(dest))
        .on('end', reportFinished)
    }

    if (!production) {
      pipeline = watchify(pipeline).on('update', bundle)
    }

    var reportFinished = function() {
      bundleLogger.end(bundleConfig.fileName)
      if (bundleQueue) {
        bundleQueue--
        if (bundleQueue === 0) {
          cb()
        }
      }
    }

    return bundle()
  }

  bundleSource.forEach(browserifyBundle)
}

module.exports = app
