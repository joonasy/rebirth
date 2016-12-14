/* ========================================
 * My Web Starter Kit generator
 * ======================================== */

'use strict'

var chalk = require('chalk')
var moment = require('moment')
var path = require('path')
var request = require('request')
var yeoman = require('yeoman-generator')
var yosay = require('yosay')

var MyGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)
    this.pkg = require('../package.json')
    this.generatorDate = moment().format('D.M.YYYY')
    this.generatorRepository = this.pkg.repository

    this.argument('dir', {
      desc: 'Your project folder',
      required: true,
      type: String
    })

    this.option('project', {
      alias: 'p',
      defaults: 'typo3',
      type: String
    })

    this.option('docker', {
      alias: 'd',
      defaults: true,
      type: Boolean
    })

    this.docker = this.options.docker === true || this.options.docker === 'true' // (ノಠ益ಠ)ノ彡┻━┻
    this.typo3 = this.options.project === 'typo3'
    this.wp = this.options.project === 'wordpress'
    this.html = this.options.project === 'html'
    this.cms = this.typo3 || this.wp

    this.name = function() {
      if (this.typo3) {
        return 'Typo3'
      } else if (this.wp) {
        return 'WordPress'
      } else {
        return 'Html'
      }
    }

    /**
     * Setup proper install directory
     */
    this.dir = this.dir.toLowerCase()

    if (this.typo3) {
      var installFolder = this._.underscored(this.dir).replace(/_/g, '')

      if (this.docker) {
        this.mkdir(this.dir)
        this.destinationRoot(this.dir + '/' + installFolder)
      } else {
        this.destinationRoot(installFolder)
      }

      this.dir = installFolder
    }

    if (this.wp) {
      this.destinationRoot(this.dir)
    }

    if (this.html) {
      this.destinationRoot(this.dir)
    }
  },

  /**
   * Greet the user
   */
  greet: function() {
    this.log(yosay(
      'Hi! Welcome to ' + chalk.blue('My Web Starter Kit')+'. ' +
      'Let\'s create ' + chalk.green(this.name()) + ' project!'
    ))
  },

  /**
   * Prompts
   */
  prompts: function () {
    var done = this.async()

    this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name:',
        default: path.basename(process.cwd())
      }, {
        when: function (props) {
          var deeperDir = ''
          var dockerPath = ''

          if (this.docker) {
            deeperDir = this.docker ? this.dir + '/' : ''
            dockerPath = '\n' + chalk.green('  ❯ ') + 'Docker path:' + chalk.cyan('./' +
              deeperDir + this.dir + '-docker')
          }

          if (this.typo3) {
            var extension =  this._.underscored(this.dir).replace(/_/g, '')

            this.log(
              chalk.green('  ❯'), 'Install path:', chalk.cyan('./' + this.dir), '\n' +
              chalk.green('  ❯'), 'Extension key:', chalk.cyan(extension), '\n' +
              chalk.green('  ❯'), 'Extension path:', chalk.cyan('./' + deeperDir + extension),
              dockerPath
            )
          } else if (this.wp) {
            this.log(
              chalk.green('  ❯'), 'Install path:', chalk.cyan('./' + this.dir), '\n' +
              chalk.green('  ❯'), 'Theme path:', chalk.cyan('./' + deeperDir + this.dir),
              dockerPath
            )
          } else {
            this.log(
              chalk.green('  ❯'), 'Install path:', chalk.cyan('./' + this.dir), '\n' +
              chalk.green('  ❯'), 'Source path:', chalk.cyan('./' + this.dir + '/src/'), '\n' +
              chalk.green('  ❯'), 'Build path:', chalk.cyan('./' + this.dir + '/dist/')
            )
          }
        }.bind(this)
      }, {
        type: 'input',
        name: 'author',
        message: 'Author name:',
        default: 'Author'
      }, {
          type: 'input',
          name: 'appNameSpace',
          message: 'Project namespace:',
          default: 'App',
          when: function(props) {
            return this.cms
          }.bind(this)
      }, {
        when: function (props) {
          if (this.typo3) {
            this.log(
              chalk.green('  ❯'), 'Flux extension key:',
                chalk.cyan(
                  this._.capitalize(this._.camelize(props.appNameSpace)) + '.' +
                  this._.capitalize(this._.underscored(this.dir).replace(/_/g, ''))
                )
            )
          }
        }.bind(this)
      }, {
        type: 'input',
        name: 'url',
        message: 'Project URL (production):',
        default: function(props) {
          return 'http://' + this._.dasherize(this._.slugify(props.name)) + '.com'
        }.bind(this)
      }, {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: function(props) {
          return 'Website for '+ this._.humanize(props.name)
        }.bind(this)
      }, {
        type: 'checkbox',
        name: 'whatStarters',
        message: 'What starters do you want?',
        choices: [
          {
            name: 'Default stylesheets and JavaScripts',
            value: 'defaultAssets',
            checked: true
          }, {
            name: 'Deployment configuration',
            value: 'deployment',
            checked: true
          }
        ]
      }, {
        when: function (props) {
          if (this.wp) {
            this.log(
              chalk.green('  !'), 'WPML user id and subscription key can be found from the download link in \n' +
              chalk.green('  !'), chalk.underline.yellow('https://wpml.org/account/downloads/'), '\n' +
              chalk.green('  !'), '?download=6088&user_id='+chalk.bold.yellow('YOUR_USER_ID')+'&subscription_key='+chalk.bold.yellow('YOUR_KEY')
            )
          }
        }.bind(this)
      }, {
        type: 'input',
        name: 'pluginWPMLuserID',
        message: 'WPML user ID (leave empty for not installing):',
        default: false,
        when: function() {
          return this.wp
        }.bind(this)
      }, {
        type: 'input',
        name: 'pluginWPMLkey',
        message: 'WPML subscription key:',
        default: false,
        when: function(props) {
          return props.pluginWPMLuserID
        }.bind(this)
      }, {
        when: function (props) {
          if (this.wp) {
            this.log(
              chalk.green('  !'), 'ACF subscription key can be found from ' +
              chalk.underline.yellow('http://www.advancedcustomfields.com/my-account/')
            )
          }
        }.bind(this)
      }, {
        type: 'input',
        name: 'pluginACFkey',
        message: 'ACF key (leave empty for not installing):',
        default: false,
        when: function(props) {
          return this.wp
        }.bind(this)
      }, {
        type: 'confirm',
        name: 'composer',
        message: 'Do you want to install Composer dependencies?',
        default: true,
        when: function(props) {
          return this.docker
        }.bind(this)
      }
    ], function(props) {
      this.appNameDasherize = this._.dasherize(this._.slugify(props.name))
      this.appNameHumanize = this._.humanize(this.appNameDasherize)
      this.appNameUnderscored = this._.underscored(this.appNameDasherize)
      this.appNamePascalize = this._.capitalize(this._.camelize(this.appNameDasherize))
      this.appAuthor = props.author
      this.appNameSpace = this._.capitalize(this._.camelize(props.appNameSpace))
      this.appURL = props.url
      this.appDescription = props.description
      this.composer = props.composer// && !this.options['skip-install']
      this.defaultAssets = props.whatStarters.indexOf('defaultAssets') !== -1
      this.deployment = props.whatStarters.indexOf('deployment') !== -1
      this.dirCapitalize = this._.capitalize(this.dir)
      this.git = props.git
      this.pluginWPMLuserID = props.pluginWPMLuserID
      this.pluginWPMLkey = props.pluginWPMLkey
      this.pluginACFkey = props.pluginACFkey
      done()
    }.bind(this))
  },

  /**
   * Setup configs
   */
  configuring: function() {
    if (this.typo3) {
      this.config.set('assetsPath', 'Assets/')
    }

    if (this.html) {
      this.config.set('assetsPath', 'src/assets/')
    }

    if (this.wp) {
      this.config.set('assetsPath', 'assets/')
    }
  },

  /**
   * Setup gulpfile or assemblefile
   */
  gulpfile: function() {
    if (this.typo3) {
      this.template(
        this.templatePath('typo3/_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      )
    }

    if (this.html) {
      this.template(
        this.templatePath('html/_assemblefile.js'),
        this.destinationPath('assemblefile.js')
      )
    }

    if (this.wp) {
      this.template(
        this.templatePath('wordpress/_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      )
    }
  },

  /**
   * Setup README.md
   */
  readme: function() {
    this.template('shared/_README.md', 'README.md')
  },

  /**
   * Setup package.json
   */
  packageJSON: function () {
    if (this.typo3) {
      this.template('typo3/_package.json', this.destinationPath('package.json'))
    }

    if (this.html) {
      this.template('html/_package.json', this.destinationPath('package.json'))
    }

    if (this.wp) {
      this.template('wordpress/_package.json', this.destinationPath('package.json'))
    }
  },

  /**
   * Setup default assets
   */
  defaultAssets: function() {
    if (this.defaultAssets) {

      var _this = this
      var startersDir = this.templatePath('starters/src/assets/')

      var cssAssets = [
        'components/Component/',
        'components/Container/',
        'components/Grid/_Grid.config.scss',
        'components/Grid/_Grid.scss',
        'components/Grid/_index.scss',
        'components/Heading/',
        'components/Icon/',
        'components/IeFrame/',
        'components/Text/',
        'components/Width/',
        'components/Wrap/',
        'generic/',
        'helpers/_helper.scss',
        'layout/Footer/',
        'layout/Header/',
        'layout/Page/',
        'mixins/',
        'vendors/_normalize.scss',
        '_config.scss',
        'app.scss'
      ].forEach(function(file) {
        _this.fs.copy(
          startersDir + 'stylesheets/' + file,
          _this.destinationPath(_this.config.get('assetsPath') + 'stylesheets/' + file)
        )
      })

      var jsAssets = [
        'app.js',
        'config.js',
        'lib/fixes.js',
        'components/Component.js'
      ].forEach(function(file) {
        _this.fs.copy(
          startersDir + 'javascripts/' + file,
          _this.destinationPath(_this.config.get('assetsPath') + 'javascripts/' + file)
        )
      })

      this.template(
        startersDir + 'javascripts/_head.js',
        _this.config.get('assetsPath') + 'javascripts/head.js'
      )

      this.mkdir(this.config.get('assetsPath')+'images')
      this.mkdir(this.config.get('assetsPath')+'fonts')
    }
  },

  /**
   * Setup bower
   */
  bower: function() {
    this.template('shared/_bower.json', 'bower.json')
  },

  /**
   * Setup deployment
   */
  deployment: function() {
    if (this.deployment) {
      this.template('shared/_dploy.example.yaml', 'dploy.example.yaml')
      this.template('shared/_dploy.example.yaml', 'dploy.yaml')
    }
  },

  /**
   * Copy other templates
   */
  other: function() {
    this.fs.copy(
      this.templatePath('shared/editorconfig'),
      this.destinationPath('.editorconfig')
    )

    this.fs.copy(
      this.templatePath('shared/eslintrc'),
      this.destinationPath('.eslintrc')
    )

    this.template(
      this.templatePath('shared/_gitignore'),
      this.destinationPath('.gitignore')
    )
  },

  /**
   * Typo3
   */
  typo3: function() {
    if (this.typo3) {
      this.template(
        this.templatePath('typo3/Configuration/TypoScript/_setup.txt'),
        this.destinationPath('Configuration/TypoScript/setup.txt')
      )

      this.template(
        this.templatePath('typo3/Resources/Private/Templates/Page/_HomePage.html'),
        this.destinationPath('Resources/Private/Templates/Page/HomePage.html')
      )

      this.fs.copy(
        this.templatePath('typo3/Resources/Private/Layouts/App.html'),
        this.destinationPath('Resources/Private/Layouts/App.html')
      )

      this.template(
        this.templatePath('typo3/Resources/Private/Partials/_Top.html'),
        this.destinationPath('Resources/Private/Partials/Top.html')
      )

      this.template(
        this.templatePath('typo3/Resources/Private/Partials/_Bottom.html'),
        this.destinationPath('Resources/Private/Partials/Bottom.html')
      )

      this.template(
        this.templatePath('typo3/_ext_emconf.php'),
        this.destinationPath('ext_emconf.php')
      )

      this.template(
        this.templatePath('typo3/_ext_tables.php'),
        this.destinationPath('ext_tables.php')
      )

      this.template(
        this.templatePath('typo3/typo3/_composer.json'),
        this.destinationPath('typo3/composer.json')
      )
    }
  },

  /**
   * Html
   */
  html: function () {
    if (this.html) {
      this.fs.copy(
        this.templatePath('html/src/helpers/assets.js'),
        this.destinationPath('src/helpers/assets.js')
      )

      this.template(
        this.templatePath('html/src/_app.json'),
        this.destinationPath('src/app.json')
      )

      this.template(
        this.templatePath('html/src/templates/_index.hbs'),
        this.destinationPath('src/templates/index.hbs')
      )

      this.fs.copy(
        this.templatePath('html/src/layouts/default.hbs'),
        this.destinationPath('src/layouts/default.hbs')
      )

      this.fs.copy(
        this.templatePath('html/src/partials/top.hbs'),
        this.destinationPath('src/partials/top.hbs')
      )

      this.template(
        this.templatePath('html/src/partials/bottom.hbs'),
        this.destinationPath('src/partials/bottom.hbs')
      )
    }
  },

  /**
   * WordPress
   */
  wp: function() {
    if (this.wp) {
      var done = this.async()

      if (this.pluginACFkey) {
        this.mkdir('acf-json')
      }

      if (this.pluginWPMLuserID) {
        this.mkdir('languages')
      }

      this.fs.copy(
        this.templatePath('wordpress/header.php'),
        this.destinationPath('header.php')
      )

      this.fs.copy(
        this.templatePath('wordpress/footer.php'),
        this.destinationPath('footer.php')
      )

      this.directory(
        this.templatePath('wordpress/partials'),
        this.destinationPath('partials/')
      )

      this.template(
        this.templatePath('wordpress/_functions.php'),
        this.destinationPath('functions.php')
      )

      this.template(
        this.templatePath('wordpress/lib/_clean-up.php'),
        this.destinationPath('lib/clean-up.php')
      )

      this.template(
        this.templatePath('wordpress/lib/_cpt-name.php'),
        this.destinationPath('lib/cpt-name.php')
      )

      this.template(
        this.templatePath('wordpress/lib/_NavWalker.php'),
        this.destinationPath('lib/NavWalker.php')
      )

      this.template(
        this.templatePath('wordpress/lib/_sc-name.php'),
        this.destinationPath('lib/sc-name.php')
      )

      this.template(
        this.templatePath('wordpress/lib/_setup.php'),
        this.destinationPath('lib/setup.php')
      )

      if (this.pluginACFkey) {
        this.template(
          this.templatePath('wordpress/lib/_utils-acf.php'),
          this.destinationPath('lib/utils-acf.php')
        )
      }

      this.template(
        this.templatePath('wordpress/lib/_utils.php'),
        this.destinationPath('lib/utils.php')
      )

      this.template(
        this.templatePath('wordpress/_index.php'),
        this.destinationPath('index.php')
      )

      this.template(
        this.templatePath('wordpress/_style.css'),
        this.destinationPath('style.css')
      )

      this.template(
        this.templatePath('wordpress/wp/_composer.json'),
        this.destinationPath('wp/composer.json')
      )

      if (this.wp && this.docker) {
        var cwd = '../' + this.dir + '-docker/'
        this.salt = ''

        request('https://api.wordpress.org/secret-key/1.1/salt', function(error, response, body) {
          if (!error && response.statusCode == 200) {
            this.salt = body

            this.template(
              this.templatePath('wordpress/wp/_wp-config.php'),
              this.destinationPath(cwd + 'wp-config.php')
            )

            this.template(
              this.templatePath('wordpress/wp/_docker-compose.yml'),
              this.destinationPath(cwd + 'docker-compose.yml')
            )

            this.template(
              this.templatePath('wordpress/wp/_wp-config.dev.php'),
              this.destinationPath(cwd + 'wp-config.dev.php')
            )

            this.fs.copy(
              this.templatePath('wordpress/wp/register-theme-directory.php'),
              this.destinationPath(cwd + 'wp-content/mu-plugins/register-theme-directory.php')
            )

            this.fs.copy(
              this.templatePath('wordpress/wp/index.php'),
              this.destinationPath(cwd + 'index.php')
            )

            done()
          }
        }.bind(this))
      }

    }
  },

  git: function() {
    this.spawnCommand('git', ['init'])

    if (this.docker) {
      this.spawnCommand('git', ['init'], {
        cwd: '../'
      })
    }
  },

  _installTypo3Docker: function() {
    if (this.typo3 && this.docker) {
      var done = this.async()
      var _this = this
      var docker = '../' + this.dir + '-docker'
      var web = docker + '/app/web/'

      /**
       * Welcome to temporary callback hell.
       */
      this.spawnCommand('git', ['clone', 'https://github.com/webdevops/TYPO3-docker-boilerplate.git', this.dir + '-docker'], {
        cwd: '../'
      }).on('exit', function() {
        if (_this.composer) {
          _this.spawnCommand('git', ['checkout', '4d394a7'], { cwd: docker })
          _this.spawnCommand('touch', ['FIRST_INSTALL'], { cwd: web })

          _this.template(
            _this.templatePath('typo3/docker/docker-compose.development.yaml'),
            _this.destinationPath(docker + '/docker-compose.yaml')
          )

          _this.spawnCommand('ln', ['-s', '../../../' + _this.dir + '/typo3/composer.json'], {
            cwd: web
          }).on('exit', function() {
            _this.spawnCommand('composer', ['install'], {
              cwd: web
            }).on('exit', function() {
              _this.spawnCommand('rm', ['-rf', '.git'], { cwd: docker })
              _this.spawnCommand('rm', ['.gitignore'], { cwd: docker })

              done()
              _this._end()
            })
          })
        } else {
          done()
          _this._end()
        }
      })
    }
  },

  _installWordPressDocker: function() {
    if (this.wp && this.docker) {
      var done = this.async()
      var _this = this
      var cwd = '../' + this.dir + '-docker/'

      /**
       * Welcome to temporary callback hell.
       */
      if (this.composer) {
        this.spawnCommand('ln', ['-s', '../' + this.dir + '/wp/composer.json'], {
          cwd: cwd
        }).on('exit', function() {
          _this.spawnCommand('composer', ['install'], {
            cwd: cwd
          }).on('exit', function() {
            done()
            _this._end()
          })
        })
      } else {
        done()
        _this._end()
      }
    }
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: function() {
        this._installTypo3Docker()
        this._installWordPressDocker()
      }.bind(this)
    })
  },

  _end: function() {
    this.log(
      '\n' +
      '  ========================================', '\n' +
      '\n' +
      chalk.green('!'),  chalk.bold('Project details'), '\n\n' +
      chalk.green('❯'), 'Name:', chalk.cyan(this.appNameDasherize), '\n' +
      chalk.green('❯'), 'Description:', chalk.cyan(this.appDescription), '\n' +
      chalk.green('❯'), 'Author:', chalk.cyan(this.appAuthor), '\n' +
      chalk.green('❯'), 'Type:', chalk.cyan(this.name()), '\n' +
      chalk.green('❯'), 'Project URL (production):', chalk.cyan(this.appURL), '\n' +
      '\n' +
      chalk.green('❯'), 'Please read', chalk.cyan('README.md'), 'for available commands and other useful info.', '\n' +
      chalk.green('❯ Happy developing!'), '\n' +
      '\n' +
      '  ========================================' +
      '\n'
    )
  }
})

module.exports = MyGenerator
