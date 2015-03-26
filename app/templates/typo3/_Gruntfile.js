/* ========================================
 * Gruntfile for `<%= appNameHumanize %>`
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
      tmp: '.tmp',
      private: 'Resources/Private',
      public: 'Resources/Public',
      extension: 'typo3conf/ext/<%= appRoot %>',
      http: '/'
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
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['Assets/stylesheets/**/*.{scss,sass}'],
        tasks: ['compass:dev', 'autoprefixer']
      },
      javascript: {
        files: ['Assets/javascripts/**/*.js']
      },
      other: {
        files: [
          '<%%= path.private %>/**/*.html',
          'Assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    /**
     * Compass
     */
    compass: {
      options: {
        sassDir: 'Assets/stylesheets',
        cssDir: '<%%= path.tmp %>/Assets/stylesheets',

        imagesDir: 'Assets/images',
        generatedImagesDir: '<%%= path.tmp %>/Assets/images',
        httpImagesPath: '/<%%= path.ext %>/Assets/images',
        httpGeneratedImagesPath: '/<%%= path.ext %>/<%%= path.tmp %>/Assets/images',

        fontsDir: 'Assets/fonts',
        httpFontsPath: '/<%%= path.ext %>/Assets/fonts',
        relativeAssets: false,

        raw: '::Sass::Script::Number.precision = 10\n',

        importPath: 'bower_components'
      },
      dev: {},
      dist: {
        options: {
          httpImagesPath: '<%%= path.http %><%%= path.ext %>/<%%= path.public %>/Assets/images',
          httpGeneratedImagesPath: '<%%= path.http %><%%= path.ext %>/<%%= path.public %>/Assets/images',
          httpFontsPath: '<%%= path.http %><%%= path.ext %>/<%%= path.public %>/Assets/fonts'
        }
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
          src: '*.css',
          dest: '<%%= path.tmp %>/Assets/stylesheets'
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
          flatten: true,
          cwd: './',
          src: [
            '<%%= path.tmp %>/Assets/images/**/*.{png,jpg,jpeg,svg}',
            'Assets/images/*.{png,jpg,jpeg,svg}'
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
        outputFile: '<%%= path.tmp %>/Assets/javascripts/vendor/modernizr.build.js',
        parseFiles: true,
        files: {
          src: [
            'Assets/javascripts/**/*.js',
            '!Assets/javascripts/vendor/*.js',
            '<%%= path.tmp %>/Assets/stylesheets/*.css'
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
        matchCommunityTests: true,
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
            '<%%= path.tmp %>/Assets/javascripts/vendor/modernizr.build.js',
            'Assets/javascripts/head.js'
          ],
          '<%%= path.tmp %>/Assets/javascripts/app.js': [
            'bower_components/fastclick/lib/fastclick.js',
            'Assets/javascripts/vendors/*.js',
            'Assets/javascripts/components/*.js',
            '!Assets/javascripts/components/Component.js',
            'Assets/javascripts/app.js'
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
      all: {
        files: [{
          src: [
            '<%%= path.public %>/Assets',
            '<%%= path.tmp %>'
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
          cwd: './',
          src: [
            'Assets/javascripts/vendor/jquery.min.js',
            'Assets/fonts/*.{eot,ttf,woff,svg}'
          ],
          dest: '<%%= path.public %>'
        }]
      }
    },

    /**
     * Wiredep
     */
    wiredep: {
      src: {
        src: [
          '<%%= path.private %>/Partials/Top.html',
          '<%%= path.private %>/Partials/Bottom.html'
        ],
        options: {
          ignorePath: /..\/..\/..\//,
          exclude: [
            'bower_components/modernizr/',
            'bower_components/jquery'
          ],
          fileTypes: {
            html: {
              replace: {
                js: '<v:asset.script path="EXT:<%= appRoot %>/{{filePath}}" rewrite="false" standalone="true"></v:asset.script>',
                css: '<v:asset.style path="EXT:<%= appRoot %>/{{filePath}}" rewrite="false" standalone="true"></v:asset.style>'
              }
            }
          }
        }
      }
    }
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
    'wiredep',
    'autoprefixer',
    'watch'
  ]);

  grunt.registerTask('default', [
    'clean',
    'wiredep',
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
