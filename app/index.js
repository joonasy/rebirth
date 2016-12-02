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

    this.options.project = {
      value: this.options.project,
      cms: this.options.project === 'typo3' || this.options.project === 'wordpress',
      name: function() {
        if (this.value === 'typo3') {
          return 'Typo3'
        } else if (this.value === 'wordpress') {
          return 'WordPress'
        } else {
          return 'Html'
        }
      }
    }

    /**
     * Setup proper install directory
     */
    this.dir = this.dir.toLowerCase()
    this.destinationRoot(this.dir)

    if (this.options.project.value === 'typo3') {
      this.dir = this._.underscored(this.dir).replace(/_/g, '')
      this.destinationRoot(this.dir)
    }

    if (this.options.project.value === 'wordpress') {
      this.destinationRoot(this.dir)
    }
  },

  /**
   * Greet the user
   */
  greet: function() {
    this.log(yosay(
      'Hi! Welcome to ' + chalk.blue('My Web Starter Kit')+'. ' +
      'Let\'s create ' + chalk.green(this.options.project.name()) + ' project!'
    ))
  },

  /**
   * Prompts
   */
  askQuestions: function () {
    var done = this.async()
    var _this = this

    this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name:',
        default: path.basename(process.cwd())
      }, {
        type: 'confirm',
        name: 'docker',
        message: 'Create Docker development environment also?',
        default: true,
        when: function(props) {
          return _this.options.project.cms
        }
      }, {
        when: function (props) {
          var docker = props.docker;

          if (_this.options.project.cms) {
            var deeperDir = docker ? _this.dir + '/' : '';
          }

          if (_this.options.project.value === 'typo3') {
            var extension =  _this._.underscored(_this.dir).replace(/_/g, '')

            _this.log(
              chalk.green('❯'), 'Project install path:', chalk.cyan('./' + _this.dir), '\n' +
              chalk.green('❯'), 'Extension key:', chalk.cyan(extension), '\n' +

              chalk.green('❯'), 'Extension path:', chalk.cyan('./' + deeperDir + extension), '\n'  +
              chalk.green('❯'), 'Build path:', chalk.cyan('./' + deeperDir + extension + '/Resources/Public/')
            )
          } else if (_this.options.project.value === 'wordpress') {
            _this.log(
              chalk.green('❯'), 'Project install path:', chalk.cyan('./' + _this.dir), '\n' +

              chalk.green('❯'), 'Theme will be installed in:', chalk.cyan('./' + deeperDir + _this.dir), '\n' +
              chalk.green('❯'), 'Build path:', chalk.cyan('./' + deeperDir + _this.dir + '/dist/')
            )
          } else {
            _this.log(
              chalk.green('❯'), 'Project install path:', chalk.cyan('./' + _this.dir), '\n' +
              chalk.green('❯'), 'Development path:', chalk.cyan('./' + _this.dir + '/src/'), '\n' +
              chalk.green('❯'), 'Build path:', chalk.cyan('./' + _this.dir + '/dist/')
            )
          }
        }
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
            return _this.options.project.cms
          }
      }, {
        when: function (props) {
          if (_this.options.project.value === 'typo3') {
            _this.log(
              chalk.green('❯'), 'Flux extension key:',
                chalk.cyan(
                  _this._.capitalize(_this._.camelize(props.appNameSpace)) + '.' +
                  _this._.capitalize(_this._.underscored(_this.dir).replace(/_/g, ''))
                )
            )
          }
        }
      }, {
        type: 'input',
        name: 'url',
        message: 'Project URL (production):',
        default: function(props) {
          return 'http://' + _this._.dasherize(_this._.slugify(props.name)) + '.com'
        }
      }, {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: function(props) {
          return 'Website for '+ _this._.humanize(props.name)
        }
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
        type: 'confirm',
        name: 'git',
        message: 'Do you want to git init for the project?',
        default: true
      }, {
        type: 'confirm',
        name: 'composer',
        message: 'Do you want to install Composer dependencies?',
        default: true,
        when: function(props) {
          return _this.options.project.cms
        }
      }, {
        type: 'input',
        name: 'dbName',
        message: 'Database name:',
        default: function(props) {
          return _this._.underscored(_this._.dasherize(_this._.slugify(props.name)))
        },
        when: function(props) {
          return _this.options.project.value === 'wordpress'
        }
      }, {
        type: 'input',
        name: 'dbUser',
        message: 'Database user:',
        default: 'root',
        when: function(props) {
          return _this.options.project.value === 'wordpress'
        }
      }, {
        type: 'input',
        name: 'dbPassword',
        message: 'Database password:',
        default: 'password',
        when: function(props) {
          return _this.options.project.value === 'wordpress'
        }
      }, {
        type: 'input',
        name: 'dbHost',
        message: 'Database host (use ' + chalk.cyan('mysql') + ' for Docker):',
        default: 'mysql',
        when: function(props) {
          return _this.options.project.value === 'wordpress'
        }
      }, {
        when: function (props) {
          if (_this.options.project.value === 'wordpress') {
            _this.log(
              chalk.green('  !'), 'WPML user id and subscription key can be found from the download link in \n' +
              chalk.green('  !'), chalk.underline.yellow('https://wpml.org/account/downloads/'), '\n' +
              chalk.green('  !'), '?download=6088&user_id='+chalk.bold.yellow('YOUR_USER_ID')+'&subscription_key='+chalk.bold.yellow('YOUR_KEY')
            )
          }
        }
      }, {
        type: 'input',
        name: 'pluginWPMLuserID',
        message: 'WPML user ID (leave empty for not installing):',
        default: false,
        when: function(props) {
          return _this.options.project.value === 'wordpress'
        }
      }, {
        type: 'input',
        name: 'pluginWPMLkey',
        message: 'WPML subscription key:',
        default: false,
        when: function(props) {
          return props.pluginWPMLuserID
        }
      }, {
        when: function (props) {
          if (_this.options.project.value === 'wordpress') {
            _this.log(
              chalk.green('  !'), 'ACF subscription key can be found from ' +
              chalk.underline.yellow('http://www.advancedcustomfields.com/my-account/')
            )
          }
        }
      }, {
        type: 'input',
        name: 'pluginACFkey',
        message: 'ACF key (leave empty for not installing):',
        default: false,
        when: function(props) {
          return _this.options.project.value === 'wordpress'
        }
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
      this.composer = props.composer// && !_this.options['skip-install']
      this.defaultAssets = props.whatStarters.indexOf('defaultAssets') !== -1
      this.deployment = props.whatStarters.indexOf('deployment') !== -1
      this.dirCapitalize = this._.capitalize(this.dir)
      this.docker = props.docker
      this.dbName = props.dbName
      this.dbUser = props.dbUser
      this.dbPassword = props.dbPassword
      this.dbHost = props.dbHost
      this.git = props.git
      this.pluginWPMLuserID = props.pluginWPMLuserID
      this.pluginWPMLkey = props.pluginWPMLkey
      this.pluginACFkey = props.pluginACFkey

      this.projectType = _this.options.project.value
      this.typo3 = this.projectType === 'typo3'
      this.html = this.projectType === 'html'
      this.wp = this.projectType === 'wordpress'
      done()
    }.bind(this))
  },

  /**
   * Setup configs
   */
  config: function() {
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
        this.destinationPath('gulpfile.js'))
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
        this.destinationPath('/gulpfile.js')
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
      var _this = this
      _this.salt = ''

      this.mkdir('acf-json')

      if (_this.pluginWPMLuserID) {
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

      if (_this.pluginACFkey) {
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
        this.templatePath('wordpress/wp/_docker-compose.yml'),
        this.destinationPath('wp/docker-compose.yml')
      )

      this.template(
        this.templatePath('wordpress/wp/_docker-compose.yml'),
        this.destinationPath('../wp/docker-compose.yml')
      )

      this.template(
        this.templatePath('wordpress/wp/_composer.json'),
        this.destinationPath('wp/composer.json')
      )

      this.template(
        this.templatePath('wordpress/wp/_composer.json'),
        this.destinationPath('../wp/composer.json')
      )

      this.template(
        this.templatePath('wordpress/wp/_wp-config.dev.php'),
        this.destinationPath('wp/wp-config.dev.php')
      )

      this.template(
        this.templatePath('wordpress/wp/_wp-config.dev.php'),
        this.destinationPath('../wp/wp-config.dev.php')
      )

      this.fs.copy(
        this.templatePath('wordpress/wp/register-theme-directory.php'),
        this.destinationPath('wp/wp-content/mu-plugins/register-theme-directory.php')
      )

      this.fs.copy(
        this.templatePath('wordpress/wp/register-theme-directory.php'),
        this.destinationPath('../wp/wp-content/mu-plugins/register-theme-directory.php')
      )

      this.fs.copy(
        this.templatePath('wordpress/wp/index.php'),
        this.destinationPath('wp/index.php')
      )

      this.fs.copy(
        this.templatePath('wordpress/wp/index.php'),
        this.destinationPath('../wp/index.php')
      )

      request('https://api.wordpress.org/secret-key/1.1/salt', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          _this.salt = body

          _this.template(
            _this.templatePath('wordpress/wp/_wp-config.php'),
            _this.destinationPath('wp/wp-config.php')
          )

          _this.template(
            _this.templatePath('wordpress/wp/_wp-config.php'),
            _this.destinationPath('../wp/wp-config.php')
          )

          done()
        }
      })
    }
  },

  _installFinished: function() {
    var _this = this;
    var devEnvString = ''
    var wordPressInfo = ''
    var typo3Info = ''
    var projectType = _this.projectType === 'wordpress' ? 'WordPress' : _this._.humanize(_this.projectType)

    if (_this.cms) {
      devEnvString = ' development enviroment instructions,'
    }

    if (_this.typo3) {
      typo3Info = '\n' +
        chalk.green('❯ ') + 'Extension key: ' + chalk.cyan(_this.dir) + '\n' +
        chalk.green('❯ ') + 'Extension folder: ' + chalk.cyan('./' + _this.dir) + '\n' +
        chalk.green('❯ ') + 'Flux extension key: ' + chalk.cyan(_this.appNameSpace + '.' + _this.dirCapitalize) + '\n'
    }

    if (_this.wp) {
      wordPressInfo = '\n' +
        chalk.green('❯ ') + 'Database name: ' + chalk.cyan(_this.dbName) + '\n' +
        chalk.green('❯ ') + 'Database user: ' + chalk.cyan(_this.dbUser) + '\n' +
        chalk.green('❯ ') + 'Database password: ' + chalk.cyan(_this.dbPassword) + '\n' +
        chalk.green('❯ ') + 'Database host: ' + chalk.cyan(_this.dbHost) + '\n'
    }

    _this.log(
      '\n' +
      '  ========================================', '\n' +
      '\n' +
      chalk.green('!'),  chalk.bold('Project details'), '\n\n' +
      chalk.green('❯'), 'Name:', chalk.cyan(_this.appNameDasherize), '\n' +
      chalk.green('❯'), 'Description:', chalk.cyan(_this.appDescription), '\n' +
      chalk.green('❯'), 'Author:', chalk.cyan(_this.appAuthor), '\n' +
      chalk.green('❯'), 'Type:', chalk.cyan(projectType), '\n' +
      chalk.green('❯'), 'Project URL (production):', chalk.cyan(_this.appURL), '\n' +
      typo3Info,
      wordPressInfo,
      '\n' +
      chalk.green('❯'), 'Please read', chalk.cyan('README.md'), 'for' + devEnvString + ' available commands and other useful info.', '\n' +
      chalk.green('❯'), 'Then just run', chalk.yellow('npm run dev'), 'to kickstart your project.', '\n' +
      chalk.green('❯ Happy developing! :)'), '\n' +
      '\n' +
      '  ========================================' +
      '\n'
    )
  },

  _installTypo3Docker: function() {
    var _this = this;
    var cwd = '../' + _this.dir + '-docker/app/web/composer.json'

    _this.spawnCommand('git', ['clone', 'https://github.com/webdevops/TYPO3-docker-boilerplate.git', this.dir + '-docker'], {
      cwd: '../'
    }).on('exit', function() {
      _this.template(
        _this.templatePath('typo3/typo3/_composer.json'),
        _this.destinationPath(cwd)
      )

      if (_this.composer) {
        _this.spawnCommand('composer', ['install'], {
          cwd: cwd
        }).on('exit', function() {
          _this._installFinished()
        })
      } else {
        _this._installFinished()
      }
    })
  },

  _installWordPressDocker: function() {
    var _this = this;
  },

  install: function() {
    var _this = this

    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: function() {
        if (_this.git) {
          _this.spawnCommand('git', ['init'])
        }

        if (_this.typo3 && _this.docker) {
          _this._installTypo3Docker()
        } else if (_this.wordpress && _this.docker) {
          _this._installWordPressDocker()
        } else {
          _this._installFinished()
        }
      }.bind(this)
    })
  }
})

module.exports = MyGenerator
