
'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    /**
     * PATHS
     */ 
    loc: {
        app: 'app',
        dist: 'dist'
    },
    /**
     * LIVERELOAD
     *
     * Run predefined tasks whenever watched file patterns
     * are added, changed or deleted.
     * https://github.com/gruntjs/grunt-contrib-livereload
     */
    watch: {
      jade: {
        files: ['<%= loc.app %>/{,*/}*.jade'],
        tasks: ['jade', 'preprocess:dev']
      },
      compass: {
        files: ['<%= loc.app %>/assets/css/{,**/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.tmp/*.html',
          '.tmp/assets/css/{,*/}*.css',
          '{.tmp,<%= loc.app %>}/assets/js/{,**/}*.js',
          '<%= loc.app %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
        livereload: 35729, /* Keep it custom! */
        /* change this to '0.0.0.0' to access the server from outside */
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= loc.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= loc.dist %>'
        }
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
            '<%= loc.dist %>/*',
            '!<%= loc.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      dev: {
        files: [{
          src: [
            '<%= loc.app %>/assets/js/vendor/modernizr-custom.js'
          ]
        }]
      }
    },
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
            debug: true
            //timestamp: "<%= new Date().getTime() %>"
          }
        },
        files: [{
          expand: true,
          cwd: '<%= loc.app %>',
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
     *
     * For relative images:
     * httpImagesPath: '../images',
     * httpGeneratedImagesPath: '../images'
     */
    compass: {
      options: {
        require: ['sass-globbing'],

        sassDir: '<%= loc.app %>/assets/css',
        cssDir: '.tmp/assets/css',

        imagesDir: '<%= loc.app %>/assets/images',
        generatedImagesDir: '<%= loc.app %>/assets/images',
        httpImagesPath: '/assets/images',
        httpGeneratedImagesPath: '/assets/images',

        fontsDir: '<%= loc.app %>/assets/fonts',
        httpFontsPath: '../fonts',
        javascriptsDir: '<%= loc.app %>/assets/js',
        importPath: '<%= loc.app %>/assets/vendor',
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: false
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
            '<%= loc.dist %>/assets/js/{,*/}*.js',
            '!<%= loc.dist %>/assets/js/vendor/jquery.min.js',
            '!<%= loc.dist %>/assets/js/vendor/modernizr-custom.js',
            '<%= loc.dist %>/assets/css/{,*/}*.css',
            '<%= loc.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= loc.dist %>/assets/fonts/*'
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
      dev: {
        src: '.tmp/{,*/}*.html',
        options: {
          inline: true,
          context: {
            development: true,
            production: false
          }
        }
      },
      dist: {
        src: '<%= loc.dist %>/{,*/}*.html',
        options: {
          inline: true,
          context: {
            development: false,
            production: true
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
        dest: '<%= loc.dist %>'
      },
      //html: '<%= loc.app %>/index.html'
      html: '.tmp/{,**/}*.html'
    },
    usemin: {
      options: {
        dirs: ['<%= loc.dist %>']
      },
      html: ['<%= loc.dist %>/{,**/}*.html'],
      css: ['<%= loc.dist %>/assets/css/{,**/}*.css']
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
          cwd: '<%= loc.app %>/assets/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= loc.dist %>/assets/img'
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
          cwd: '<%= loc.app %>/assets/img',
          src: '{,*/}*.svg',
          dest: '<%= loc.dist %>/assets/img'
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
          // https://github.com/loc/grunt-usemin/issues/44
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
          //cwd: '<%= loc.app %>',
          cwd: '.tmp',
          src: '{,*/}*.html',
          dest: '<%= loc.dist %>'
        }]
      }
    },
    /**
     * MODERNIZR
     * 
     * Sifts through your project files, gathers up your references 
     * to Modernizr tests and outputs a lean, mean Modernizr machine.
     * https://github.com/Modernizr/grunt-modernizr
     *
     * Do the checks and create the temporary modernizr-custom.js 
     * before configuring the asset block in the useminPrepare task. This way
     * the custom modernizr concat/uglify with the other .js files. The temp
     * file isn't included in development process thanks to preprocess:dev 
     * (@if production) block.
     */ 
    modernizr: {
      devFile: '<%= loc.app %>/assets/vendor/modernizr/modernizr.js',
      outputFile: '<%= loc.app %>/assets/js/vendor/modernizr-custom.js',
      parseFiles: true,
      files: [
          '<%= loc.app %>/assets/js/{,*/}*.js',
          '<%= loc.app %>/assets/css/{,*/}*.css',
          '!<%= loc.app %>/assets/js/vendor/modernizr-custom.js'
      ],
      'extra': {
          'shiv': true,
          'printshiv': false,
          'load': false,
          'mq': false,
          'cssclasses': true
      },
      'extensibility': {
          'addtest': false,
          'prefixed': false,
          'teststyles': false,
          'testprops': false,
          'testallprops': false,
          'hasevents': false,
          'prefixes': false,
          'domprefixes': false
      },
      /* No need for the uglify as it is handled in the useminPrepare */
      uglify: false
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
          cwd: '<%= loc.app %>',
          dest: '<%= loc.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'sftp-config.json',
            'assets/img/{,*/}*.{webp,gif}',
            'assets/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '<%= loc.app %>',
          dest: '<%= loc.dist %>',
          src: [
            'assets/js/vendor/jquery.min.js'
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
          return grunt.task.run(['build', 'connect:dist:keepalive']);
      }
      /**
       * Register, run and load external tasks.
       * https://github.com/gruntjs/grunt/wiki/grunt.task
       */
      grunt.task.run([
        'clean:server',
        'concurrent:server',
        'preprocess:dev',
        'connect:livereload',
        'watch'
      ]);
  });

  grunt.registerTask('build', [
    'clean:dist',         /* Cleans the destination folder */
    'jade',               /* Processes Jade */
    'modernizr',          /* Process the modernizr-custom.js before combining asset blocks */
    'useminPrepare',      /* Finds the asset blocks in html */
    'concurrent:dist',    /* Compass, Imagemin, Svgmin, Htmlmin */
    'preprocess:dist',    /* Finds the NODE_ENV (@if etc.) blocks in html */
    'autoprefixer',       /* Autoprefixes compiled css */
    'concat',             /* Concatenates files */
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin',             /* Replaces the asset blocks and their reference to a single file */
    'preprocess:dist',    /* Finds the NODE_ENV (@if etc.) blocks in html */
    'clean:dev'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
