/* ========================================
 * Gruntfile
 * ======================================== */

module.exports = function (grunt) {
  grunt.initConfig({

    /**
     * Settings
     */
    pkg: grunt.file.readJSON('package.json'),

    path: {
      src: 'src',
      dist: 'examples',
      tmp: '.tmp'
    },

    meta: {
      banner:
        '/*!\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - Build at <%= grunt.template.today("dd.mm.yyyy HH:MM") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> - Site by Mediasignal\n' +
        ' */\n'
    },

    /**
     * Assemble
     */
    assemble: {
      options: {
        data: ['<%= path.src %>/*.{json,yml}'],
        flatten: true,
        helpers: '<%= path.src %>/helpers/**/*.js',
        layout: 'layout.hbs',
        layoutdir: '<%= path.src %>/layouts',
        partials: '<%= path.src %>/includes/*.hbs'
      },
      dev: {
        options: {
          assets: 'assets',
          dev: true,
          prod: false
        },
        files: [{
          expand: true,
          cwd: '<%= path.src %>/pages',
          src: '**/*.hbs',
          dest: '<%= path.tmp %>'
        }]
      },
      dist: {
        options: {
          assets: '<%= path.dist %>/assets',
          dev: false,
          prod: true
        },
        src: '<%= path.src %>/pages/**/*.hbs',
        dest: '<%= path.dist %>/'
      }
    },

    /**
     * Livereload
     */
    watch: {
      options: {
        livereload: '<%= connect.options.livereload %>'
      },
      assemble: {
        files: ['<%= path.src %>/**/*.{hbs,yml,json}'],
        tasks: ['assemble:dev']
      },
      compass: {
        files: [
          '<%= path.src %>/assets/stylesheets/**/*.{scss,sass}'
        ],
        tasks: ['compass', 'autoprefixer']
      },
      other: {
        files: [
          '<%= path.src %>/assets/{,**/}*.js',
          '<%= path.src %>/assets/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    /**
     * Connect server
     */
    connect: {
      options: {
        port: 9010,
        livereload: 2337,
        hostname: '0.0.0.0'
      },
      dev: {
        options: {
          base: [
            '<%= path.tmp %>',
            '<%= path.src %>',
            '../',
            './'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= path.dist %>'
        }
      }
    },

    /**
     * Clean
     */
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= path.dist %>/*'
          ]
        }]
      },
      tmp: '<%= path.tmp %>',
      dev: {
        files: [{
          src: [
            '<%= path.src %>/assets/javascripts/vendor/modernizr-custom.js'
          ]
        }]
      }
    },

    /**
     * Compass
     *
     * For relative images:
     * httpImagesPath: '../img',
     * httpGeneratedImagesPath: '../img'
     */
    compass: {
      options: {
        sassDir: '<%= path.src %>/assets/stylesheets/',
        cssDir: '<%= path.tmp %>/assets/stylesheets/',

        imagesDir: '<%= path.src %>/assets/img',
        generatedImagesDir: '<%= path.src %>/assets/img',
        httpImagesPath: '/assets/img',
        httpGeneratedImagesPath: '/assets/img',

        fontsDir: '<%= path.src %>/assets/fonts',
        httpFontsPath: '../fonts',
        javascriptsDir: '<%= path.src %>/assets/js',
        relativeAssets: false,

        importPath: [
          '../assets/stylesheets',
          '<%= path.src %>/assets/stylesheets/example',
          'bower_components/'
        ],

        raw: '::Sass::Script::Number.precision = 10\n'
      },
      dev: {}
    },

    /**
     * Autoprefixer
     */
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.tmp %>/assets/stylesheets/',
          src: '**/*.css',
          dest: '<%= path.tmp %>/assets/stylesheets/'
        }]
      }
    },

    /**
     * Usemin
     */
    useminPrepare: {
      options: {
        dest: '<%= path.dist %>'
      },
      html: '<%= path.dist %>/*.html'
    },
    usemin: {
      options: {
        assetsDirs: ['<%= path.dist %>/**/**/']
      },
      html: ['<%= path.dist %>/{,**/}*.html'],
      css: ['<%= path.dist %>/assets/stylesheets/*.css']
    },

    /**
     * Cssmin
     */
    cssmin: {
      options: {
        banner: '<%= meta.banner %>'
      }
    },

    /**
     * Uglify
     */
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      }
    },

    /**
     * Imagemin
     */
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.src %>/assets/img',
          src: '{,*/}*.{png,jpg,jpeg,svg}',
          dest: '<%= path.dist %>/assets/img'
        }]
      }
    },

    /**
     * Modernizr
     */
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%%= path.tmp %>/assets/javascripts/vendor/modernizr.build.js',
        parseFiles: true,
        files: {
          src: [
            '<%%= path.src %>/assets/javascripts/**/*.js',
            '!<%%= path.src %>/assets/javascripts/vendor/*.css',
            '<%%= path.tmp %>/assets/stylesheets/*.css'
          ]
        },
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
        uglify: false
      }
    },

    /**
     * Copy
     */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= path.src %>',
          dest: '<%= path.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'assets/img/{,*/}*.{webp,gif}',
            'assets/fonts/*',
            'assets/javascripts/vendor/jquery.min.js'
          ]
        }]
      }
    },

    /**
     * Rev
     */
    rev: {
      options: {
        length: 12
      },
      dist: {
        files: {
          src: [
            '<%= path.dist %>/assets/javascripts/{,*/}*.js',
            '!<%= path.dist %>/assets/javascripts/vendor/jquery.min.js',
            '!<%= path.dist %>/assets/javascripts/vendor/modernizr-custom.js',
            '<%= path.dist %>/assets/stylesheets/{,*/}*.css',
            '<%= path.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= path.dist %>/assets/fonts/*'
          ]
        }
      }
    }
  });

  /**
   * Load tasks
   */
  grunt.loadNpmTasks('assemble');
  require('load-grunt-tasks')(grunt);

  /**
   * Register tasks
   */
  grunt.registerTask('dev', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:tmp',
      'assemble:dev',
      'compass',
      'autoprefixer',
      'connect:dev',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'assemble:dist',
    'compass',
    'imagemin:dist',
    'copy:dist',
    'modernizr:dist',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'clean:dev'
  ]);
};
