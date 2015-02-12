/* ========================================
 * Gruntfile for <%= appNameHumanized %> <%= appDir %>
 * ========================================
 *
 * @generated <%= (generatorDate) %> using `<%= pkg.name %> v<%= pkg.version %>`
 * @url <%= (generatorRepository) %>
 */

module.exports = function (grunt) {
  grunt.initConfig({

    /**
     * Settings
     */
    pkg: grunt.file.readJSON('package.json'),
    path: {
      private: 'Resources/Private',
      public: 'Resources/Public',
      tmp: '.tmp',
      template: '/typo3conf/ext/<%= appRoot %>'
    },
    meta: {
      banner:
        '/*!\n' +
        ' * <%%= pkg.name %> - v<%%= pkg.version %> - Build on <%%= grunt.template.today("dd.mm.yyyy HH:MM") %>\n' +
        ' * <%%= pkg.homepage %>\n' +
        ' * Copyright (c) <%%= grunt.template.today("yyyy") %> <%%= pkg.name %> | Site by <%= generatorAuthor %>\n' +
        ' */\n'
    },

    /**
     * Livereload
     */
    watch: {
      options: {
        livereload: 35729
      },
      compass: {
        files: ['<%%= path.private %>/Assets/stylesheets/**/*.{scss,sass}'],
        tasks: ['compass:dev', 'autoprefixer']
      },
      other: {
        files: [
          '<%%= path.private %>/**/*.html',
          '<%%= path.private %>/Assets/{,**/}*.js',
          '<%%= path.private %>/Assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    /**
     * Compass
     */
    compass: {
      options: {
        sassDir: '<%%= path.private %>/Assets/stylesheets/',
        cssDir: '<%%= path.tmp %>/Assets/stylesheets/',

        imagesDir: '<%%= path.private %>/Assets/images/',
        generatedImagesDir: '<%%= path.private %>/Assets/images/',
        httpImagesPath: '<%%= path.template %>/<%%= path.private %>/Assets/images/',
        httpGeneratedImagesPath: '<%%= path.template %>/<%%= path.tmp %>/Assets/images/',

        fontsDir: '<%%= path.private %>/Assets/fonts/',
        httpFontsPath: '<%%= path.template %>/<%%= path.private %>/Assets/fonts/',
        relativeAssets: false,

        raw: '::Sass::Script::Number.precision = 10\n',

        importPath: 'bower_components/'
      },
      dev: {},
      dist: {
        options: {
          httpImagesPath: '<%%= path.template %>/<%%= path.public %>/Assets/images/',
          httpGeneratedImagesPath: '<%%= path.template %>/<%%= path.public %>/Assets/images/',
          httpFontsPath: '<%%= path.template %>/<%%= path.public %>/Assets/fonts/'
        },
      }
    },

    /**
     * Autoprefixer
     */
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      dev: {
        files: [{
          expand: true,
          cwd: '<%%= path.tmp %>/Assets/stylesheets',
          src: '/*.css',
          dest: '<%%= path.tmp %>/Assets/stylesheets/'
        }]
      }
    },

    /**
     * Imagemin
     */
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: './',
          src: [
            '<%%= path.tmp %>/Assets/images/**/*.{png,jpg,jpeg,svg}',
            '<%%= path.private %>/Assets/images/*.{png,jpg,jpeg,svg}'
          ],
          dest: '<%%= path.public %>/Assets/images'
        }]
      }
    },

    /**
     * Modernizr
     */
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%%= path.tmp %>/Assets/vendor/modernizr-build.js',
        parseFiles: true,
        files: {
          src: [
            '<%%= path.private %>/Assets/javascripts/{,*/}*.js',
            '<%%= path.tmp %>/Assets/stylesheets/{,*/}*.css',
            '!<%%= path.tmp %>/Assets/javascripts/vendor/*.js'
          ]
        },
        extra: {
          shiv: true,
          printshiv: false,
          load: false,
          mq: false,
          cssclasses: true
        },
        extensibility: {
          addtest: false,
          prefixed: true,
          teststyles: false,
          testprops: false,
          testallprops: false,
          hasevents: false,
          prefixes: false,
          domprefixes: false
        },
        uglify: false
      }
    },

    /**
     * Concat
     */
    concat: {
      dist: {
        files: {
          '<%%= path.tmp %>/Assets/javascripts/head.js': [
            '<%%= path.tmp %>/Assets/javascripts/vendor/modernizr-build.js',
            '<%%= path.private %>/Assets/javascripts/head.js'
          ],
          '<%%= path.tmp %>/Assets/javascripts/app.js': [
            'bower_components/fastclick/lib/fastclick.js',
            '<%%= path.private %>/Assets/javascripts/vendors/*.js',
            '<%%= path.private %>/Assets/javascripts/components/*.js',
            '!<%%= path.private %>/Assets/javascripts/components/Component.js',
            '<%%= path.private %>/Assets/javascripts/app.js'
          ]
        }
      }
    },

    /**
     * Cssmin
     */
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= path.tmp %>/Assets/stylesheets/',
          src: ['*.css'],
          dest: '<%%= path.public %>/Assets/stylesheets/',
          ext: '.min.css'
        }]
      }
    },

    /**
     * Combine media queries
     */
    cmq: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= path.tmp %>/Assets/stylesheets/',
          src: ['*.css'],
          dest: '<%%= path.tmp %>/Assets/stylesheets/'
        }],
        options: {
          log: true
        }
      }
    },

    /**
     * Uglify
     */
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= path.tmp %>/Assets/javascripts/',
          src: ['*.js'],
          dest: '<%%= path.public %>/Assets/javascripts/',
          ext: '.min.js'
        }],
        options: {
          banner: '<%%= meta.banner %>',
          compress: {
            drop_console: true
          }
        }
      }
    },

    /**
     * Clean
     */
    clean: {
      dist: {
        files: [{
          src: [
            '<%%= path.public %>/Assets/*'
          ]
        }]
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
          cwd: '<%%= path.private %>/',
          dest: '<%%= path.public %>/',
          src: [
            'Assets/javascripts/vendor/jquery.min.js',
            'Assets/fonts/*.{eot,ttf,woff,svg}'
          ]
        }]
      }
    },
  });

  /**
   * Load tasks
   */
  require('load-grunt-tasks')(grunt);

  /**
   * Register tasks
   */
  grunt.registerTask('dev', [
    'compass:dev',
    'autoprefixer',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'imagemin:dist',
    'compass:dist',
    'modernizr:dist',
    'autoprefixer',
    'cmq:dist',
    'concat:dist',
    'cssmin:dist',
    'uglify:dist',
    'copy:dist'
  ]);
};
