
/* Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %> */
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};



module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /* configurable paths */
  var yeomanConfig = {
      app: 'app',
      dist: 'build'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    /**
     * LIVERELOAD
     *
     * Run predefined tasks whenever watched file patterns
     * are added, changed or deleted.
     * https://github.com/gruntjs/grunt-contrib-livereload
     */
    watch: {
      jade: {
        files: ['<%= yeoman.app %>/{,*/}*.jade'],
        tasks: ['jade', 'preprocess:dev']
      },
      compass: {
        files: ['<%%= yeoman.app %>/assets/css/{,**/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%%= yeoman.app %>/assets/css/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '.tmp/*.html',
          '.tmp/assets/css/{,*/}*.css',
          '{.tmp,<%%= yeoman.app %>}/assets/js/{,**/}*.js',
          '<%%= yeoman.app %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    /**
     * CONNECT
     *
     * Start a connect web server.
     * https://github.com/gruntjs/grunt-contrib-connect
     */
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },
    /**
     * CLEAN
     *
     * Clean files and folders.
     * https://github.com/gruntjs/grunt-contrib-clean
     */
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    /**
     * JSHINT
     *
     * https://github.com/gruntjs/grunt-contrib-jshint
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/assets/js/{,*/}*.js',
        '!<%%= yeoman.app %>/assets/js/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },<% if (testFramework === 'mocha') { %>
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%%= connect.options.port %>/index.html']
        }
      }
    },<% } else if (testFramework === 'jasmine') { %>
    jasmine: {
      all: {
        options: {
          specs: 'test/spec/{,*/}*.js'
        }
      }
    },<% } %>
    /**
     * JADE
     *
     * https://gist.github.com/kevva/5201657
     * https://github.com/gruntjs/grunt-contrib-jade
     */
    jade: {
      dist: {
        options: {
          pretty: true,
          data: {
            debug: true,
            timestamp: "<%= new Date().getTime() %>"
          }
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp',
          src: '*.jade',
          ext: '.html'
        }]
      }
    },
    /**
     * COMPASS
     *
     * https://github.com/gruntjs/grunt-contrib-compass
     */
    compass: {
      options: {
        sassDir: '<%%= yeoman.app %>/assets/css',
        cssDir: '.tmp/assets/css',
        generatedImagesDir: '.tmp/assets/img/generated',
        imagesDir: '<%%= yeoman.app %>/assets/img',
        javascriptsDir: '<%%= yeoman.app %>/assets/js',
        fontsDir: '<%%= yeoman.app %>/assets/fonts',
        importPath: '<%%= yeoman.app %>/assets/vendor',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/assets/fonts',
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    /**
     * AUTOPREFIXER
     *
     * Parse CSS and add vendor prefixes to rules using values from the
     * Can I Use website. Based on Autoprefixer.
     * https://github.com/nDmitry/grunt-autoprefixer
     */
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/assets/css/',
          src: '{,*/}*.css',
          dest: '.tmp/assets/css/'
        }]
      }
    },
    /**
     * REV
     *
     * Static file asset revisioning through content hashing
     * https://github.com/cbas/grunt-rev
     */
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/assets/js/{,*/}*.js',
            '<%%= yeoman.dist %>/assets/css/{,*/}*.css',
            '<%%= yeoman.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%%= yeoman.dist %>/assets/fonts/*'
          ]
        }
      }
    },
    /**
     * PREPROCESS
     *
     * https://github.com/jsoverson/grunt-preprocess
     */
    preprocess: {
      options: {
        context: {}
      },
      dev: {
        src: ['.tmp/{,*/}*.html'],
        options: {
          inline: true,
          context: {
            development: true
          }
        }
      },
      dist: {
        src: ['<%= yeoman.dist %>/{,*/}*.html'],
        options: {
          inline: true,
          context: {
            development: false
          }
        }
      }
    },
    /**
     * USEMIN
     *
     * Replaces references to non-optimized scripts or stylesheets into a
     * set of HTML files (or any templates/views)
     * https://github.com/yeoman/grunt-usemin
     */
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      //html: '<%%= yeoman.app %>/index.html'
      html: '.tmp/{,**/}*.html'
    },
    usemin: {
      options: {
        dirs: ['<%%= yeoman.dist %>']
      },
      html: ['<%%= yeoman.dist %>/{,**/}*.html'],
      css: ['<%%= yeoman.dist %>/assets/css/{,**/}*.css']
    },
    /**
     * IMAGEMIN
     *
     * Minify PNG and JPEG images
     * https://github.com/gruntjs/grunt-contrib-imagemin
     */
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/assets/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist %>/assets/img'
        }]
      }
    },
    /**
     * SVGMIN
     *
     * Minify SVG
     * https://github.com/sindresorhus/grunt-svgmin
     */
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/assets/img',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/assets/img'
        }]
      }
    },
    /**
     * HTMLMIN
     *
     * Minifies HTML using html-minifier and copies the .html files
     * https://github.com/gruntjs/grunt-contrib-htmlmin
     */
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          //cwd: '<%= yeoman.app %>',
          cwd: '.tmp',
          src: '{,*/}*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    /**
     * COPY
     *
     * Copy files and folders.
     * Put files not handled in other tasks here
     * https://github.com/gruntjs/grunt-contrib-copy
     */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'assets/img/{,*/}*.{webp,gif}',
            'assets/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/assets/img',
          dest: '<%= yeoman.dist %>/assets/img',
          src: [
            'generated/*'
          ]
        }]
      }
    },
    /**
     * CONCURRENT
     *
     * Run grunt tasks concurrently
     * https://github.com/sindresorhus/grunt-concurrent
     */
    concurrent: {
      server: [
        'compass',
        'jade'
      ],
      dist: [
        'compass',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    }
  });

  grunt.registerTask('server', function (target) {
      if (target === 'dist') {
          return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
      }
      /**
       * Register, run and load external tasks.
       * https://github.com/gruntjs/grunt/wiki/grunt.task
       */
      grunt.task.run([
        'clean:server',
        'concurrent:server',
        'preprocess:dev',
        //'autoprefixer',
        'connect:livereload',
        'open',
        'watch'
      ]);
  });

  grunt.registerTask('test', [
      'clean:server',
      'concurrent:test',
      'autoprefixer',
      'connect:test',<% if (testFramework === 'mocha') { %>
      'mocha'<% } else if (testFramework === 'jasmine') { %>
      'jasmine'<% } %>
  ]);

  grunt.registerTask('build', [
    'clean:dist',         /* Cleans the destination folder */
    'jade',               /* Processes Jade */
    'useminPrepare',      /* Finds the asset blocks in html */
    'concurrent:dist',    /* Compass, Imagemin, Svgmin, Htmlmin */
    'preprocess:dist',    /* Finds the NODE_ENV (@if etc.) blocks in html */
    'autoprefixer',       /* Autoprefixes compiled css */
    'concat',             /* Concatenates files */
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin' /* Replaces the asset blocks and their reference to a single file */
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
