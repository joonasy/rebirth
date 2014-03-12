module.exports = function (grunt) {
  grunt.initConfig({
    /**
     * Settings
     */
    pkg: grunt.file.readJSON('package.json'),
    path: {
      src: 'src',
      dist: 'dist',
      tmp: '.tmp'
    },
    meta: {
      banner:
        '/*!\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Available under the <%= pkg.licenses.type %> license\n' +
        ' */\n'
    },

    /**
     * Assemble
     */
    assemble: {
      options: {
        data: ['<%= path.src %>/data/*.{json,yml}'],
        flatten: true,
        helpers: '<%= path.src %>/templates/helpers/**/*.js',
        layout: 'layout.hbs',
        layoutdir: '<%= path.src %>/templates/layouts',
        partials: '<%= path.src %>/templates/includes/*.hbs',
        permalinks: {
          structure: ':slug/index.html'
        }
      },
      dev: {
        options: {
          assets: 'assets',
          dev: true,
          prod: false
        },
        files: [{
          expand: true,
          cwd: '<%= path.src %>/templates/pages',
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
        src: '<%= path.src %>/templates/pages/**/*.hbs',
        dest: '<%= path.dist %>'
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
        files: ['<%= path.src %>/assets/css/**/*.{scss,sass}'],
        tasks: ['compass:dev', 'autoprefixer']
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
        port: 9000,
        livereload: 1337,
        hostname: '0.0.0.0'
      },
      dev: {
        options: {
          base: [
            '<%= path.tmp %>',
            '<%= path.src %>'
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
            '<%= path.src %>/assets/js/vendor/modernizr-custom.js'
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
        sassDir: '<%= path.src %>/assets/css',
        cssDir: '<%= path.tmp %>/assets/css',

        imagesDir: '<%= path.src %>/assets/img',
        generatedImagesDir: '<%= path.src %>/assets/img',
        httpImagesPath: '/assets/img',
        httpGeneratedImagesPath: '/assets/img',

        fontsDir: '<%= path.src %>/assets/fonts',
        httpFontsPath: '../fonts',
        javascriptsDir: '<%= path.src %>/assets/js',
        importPath: '<%= path.src %>/assets/bower_components',
        relativeAssets: false,

        raw: '::Sass::Script::Number.precision = 10\n'

      },
      dist: {
        options: {
          environment: 'production'
        }
      },
      dev: {
        options: {
          environment: 'development',
          debugInfo: false
        }
      }
    },

    /**
     * Autoprefixer
     */
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.tmp %>/assets/css/',
          src: '*.css',
          dest: '<%= path.tmp %>/assets/css/'
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
      html: '<%= path.dist %>/**/*.html'
    },
    usemin: {
      options: {
        assetsDirs: ['<%= path.dist %>/**/**/']
      },
      html: ['<%= path.dist %>/{,**/}*.html'],
      css: ['<%= path.dist %>/assets/css/*.css']
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
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= path.dist %>/assets/img'
        }]
      }
    },

    /**
     * Svgmin
     */
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.src %>/assets/img',
          src: '{,*/}*.svg',
          dest: '<%= path.dist %>/assets/img'
        }]
      }
    },

    /**
     * Modernizr
     */
    modernizr: {
      dist: {
        devFile: '<%= path.src %>/assets/bower_components/modernizr/modernizr.js',
        outputFile: '<%= path.src %>/assets/js/vendor/modernizr-custom.js',
        parseFiles: true,
        files: {
          src: [
            '<%= path.src %>/assets/js/{,*/}*.js',
            '<%= path.dist %>/assets/css/{,*/}*.css'
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
            'assets/js/vendor/jquery.min.js'
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
            '<%= path.dist %>/assets/js/{,*/}*.js',
            '!<%= path.dist %>/assets/js/vendor/jquery.min.js',
            '!<%= path.dist %>/assets/js/vendor/modernizr-custom.js',
            '<%= path.dist %>/assets/css/{,*/}*.css',
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
  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:tmp',
      'assemble:dev',
      'compass:dev',
      'autoprefixer',
      'connect:dev',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'assemble:dist',
    'compass:dist',
    'imagemin:dist',
    'svgmin:dist',
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
