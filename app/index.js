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
        return 'TYPO3'
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
    this.dirOrig = this.dir

    if (this.typo3) {
      var extension = this._.underscored(this.dir).replace(/_/g, '')

      if (this.docker) {
        this.mkdir(this.dir)
        this.destinationRoot(this.dir + '/' + extension)
      } else {
        this.destinationRoot(extension)
      }

      this.dir = extension
    }

    if (this.wp) {
      if (this.docker) {
        this.destinationRoot(this.dir + '/' + this.dir)
      } else {
        this.destinationRoot(this.dir)
      }
    }

    if (this.html) {
      this.destinationRoot(this.dir)
    }

    console.log(this.destinationRoot());
  },

  /**
   * Prompts
   */
  prompts: function () {
    var done = this.async()

    this.log(yosay(
      'Hi! Welcome to ' + chalk.blue('My Web Starter Kit')+'. ' +
      'Let\'s create a ' + chalk.green(this.name()) + ' project!'
    ))

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
            deeperDir = this.docker ? this.dirOrig + '/' : ''
            dockerPath = '\n' + chalk.green('  ❯ ') + 'Docker path:' + chalk.cyan('./' +
              deeperDir + this.dir + '-docker')
          }

          if (this.typo3) {
            var extension =  this._.underscored(this.dir).replace(/_/g, '')

            this.log(
              chalk.green('  ❯'), 'Install path:', chalk.cyan('./' + deeperDir + extension), '\n' +
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
            value: 'assets',
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
      this.assets = props.whatStarters.indexOf('assets') !== -1
      this.appNameDasherize = this._.dasherize(this._.slugify(props.name))
      this.appNameHumanize = this._.humanize(this.appNameDasherize)
      this.appNameUnderscored = this._.underscored(this.appNameDasherize)
      this.appNamePascalize = this._.capitalize(this._.camelize(this.appNameDasherize))
      this.appAuthor = props.author
      this.appAuthorDasherize = this._.dasherize(this._.slugify(this.appAuthor))
      this.appNameSpace = this._.capitalize(this._.camelize(props.appNameSpace))
      this.appURL = props.url
      this.appDescription = props.description
      this.composer = props.composer && !this.options['skip-install']
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
   * Copy various templates
   */
  copy: function() {
    this.fs.copyTpl(this.templatePath('shared/_README.md'),
      this.destinationPath('README.md'), this)
    this.fs.copyTpl(this.templatePath('shared/_bower.json'),
      this.destinationPath('bower.json'), this)
    this.fs.copyTpl(this.templatePath('shared/_gitignore'),
      this.destinationPath('.gitignore'), this)
    this.fs.copy(this.templatePath('shared/editorconfig'), this.destinationPath('.editorconfig'))
    this.fs.copy(this.templatePath('shared/eslintrc'), this.destinationPath('.eslintrc'))
    this.fs.copyTpl(this.templatePath('shared/_dploy.example.yaml'),
      this.destinationPath('dploy.example.yaml'), this)
    this.fs.copyTpl(this.templatePath('shared/_dploy.example.yaml'),
      this.destinationPath('dploy.yaml'), this)
  },

  git: function() {
    this.spawnCommand('git', ['init'])

    if (this.docker) {
      this.spawnCommand('git', ['init'], { cwd: '../' })
    }
  },

  /**
   * Setup default assets
   */
  assets: function() {
    if (this.assets) {
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

      this.fs.copyTpl(startersDir + 'javascripts/_head.js',
        _this.config.get('assetsPath') + 'javascripts/head.js', this)

      this.mkdir(this.config.get('assetsPath')+'images')
      this.mkdir(this.config.get('assetsPath')+'fonts')
    }
  },

  /**
   * Typo3
   */
  typo3: function() {
    if (this.typo3) {
      this.fs.copyTpl(this.templatePath('typo3/_package.json'), this.destinationPath('package.json'), this)
      this.fs.copyTpl(this.templatePath('typo3/_gulpfile.js'),
        this.destinationPath('gulpfile.js'), this)
      this.fs.copyTpl(this.templatePath('typo3/Configuration/TypoScript/_setup.txt'),
        this.destinationPath('Configuration/TypoScript/setup.txt'), this)
      this.fs.copyTpl(this.templatePath('typo3/Resources/Private/Templates/Page/_HomePage.html'),
        this.destinationPath('Resources/Private/Templates/Page/HomePage.html'), this)
      this.fs.copyTpl(this.templatePath('typo3/Resources/Private/Partials/_Top.html'),
        this.destinationPath('Resources/Private/Partials/Top.html'), this)
      this.fs.copyTpl(this.templatePath('typo3/Resources/Private/Partials/_Bottom.html'),
        this.destinationPath('Resources/Private/Partials/Bottom.html'), this)
      this.fs.copyTpl(this.templatePath('typo3/_ext_emconf.php'),
        this.destinationPath('ext_emconf.php'), this)
      this.fs.copyTpl(this.templatePath('typo3/_ext_tables.php'),
        this.destinationPath('ext_tables.php'), this)
      this.fs.copyTpl(this.templatePath('typo3/typo3/_composer.json'),
        this.destinationPath('typo3/composer.json'), this)
      this.fs.copy(this.templatePath('typo3/Resources/Private/Layouts/App.html'),
        this.destinationPath('Resources/Private/Layouts/App.html'))
    }
  },

  /**
   * Html
   */
  html: function () {
    if (this.html) {
      this.fs.copyTpl(this.templatePath('html/_package.json'),
        this.destinationPath('package.json'), this)
      this.fs.copyTpl(this.templatePath('html/_assemblefile.js'),
        this.destinationPath('assemblefile.js'), this)
      this.fs.copyTpl(this.templatePath('html/src/_app.json'),
        this.destinationPath('src/app.json'), this)
      this.fs.copyTpl(this.templatePath('html/src/templates/_index.hbs'),
        this.destinationPath('src/templates/index.hbs'), this)
      this.fs.copyTpl(this.templatePath('html/src/partials/bottom.hbs'),
        this.destinationPath('src/partials/bottom.hbs'), this)
      this.fs.copy(this.templatePath('html/src/helpers/assets.js'),
        this.destinationPath('src/helpers/assets.js'))
      this.fs.copy(this.templatePath('html/src/layouts/default.hbs'),
        this.destinationPath('src/layouts/default.hbs'))
      this.fs.copy(this.templatePath('html/src/partials/top.hbs'),
        this.destinationPath('src/partials/top.hbs'))
    }
  },

  /**
   * WordPress
   */
  wp: function() {
    if (this.wp) {
      this.fs.copyTpl(this.templatePath('wordpress/_package.json'),
        this.destinationPath('package.json'), this)
      this.fs.copyTpl(this.templatePath('wordpress/_gulpfile.js'),
        this.destinationPath('gulpfile.js'), this)
      this.fs.copyTpl(this.templatePath('wordpress/_functions.php'),
        this.destinationPath('functions.php'), this)
      this.fs.copyTpl(this.templatePath('wordpress/lib/_clean-up.php'),
        this.destinationPath('lib/clean-up.php'), this)
      this.fs.copyTpl(this.templatePath('wordpress/lib/_cpt-name.php'),
        this.destinationPath('lib/cpt-name.php'), this)
      this.fs.copyTpl(this.templatePath('wordpress/lib/_NavWalker.php'),
        this.destinationPath('lib/NavWalker.php'), this)
      this.fs.copyTpl(this.templatePath('wordpress/lib/_sc-name.php'),
        this.destinationPath('lib/sc-name.php'), this)
      this.fs.copyTpl(this.templatePath('wordpress/lib/_setup.php'),
        this.destinationPath('lib/setup.php'), this)
      this.fs.copyTpl(this.templatePath('wordpress/lib/_utils.php'),
        this.destinationPath('lib/utils.php'), this)
      this.fs.copyTpl(this.templatePath('wordpress/_index.php'),
        this.destinationPath('index.php'), this)
      this.fs.copyTpl(this.templatePath('wordpress/_style.css'),
        this.destinationPath('style.css'), this)
      this.fs.copyTpl(this.templatePath('wordpress/wp/_composer.json'),
        this.destinationPath('wp/composer.json'), this)
      this.fs.copy(this.templatePath('wordpress/header.php'), this.destinationPath('header.php'))
      this.fs.copy(this.templatePath('wordpress/footer.php'), this.destinationPath('footer.php'))
      this.fs.copy(this.templatePath('wordpress/partials'), this.destinationPath('partials'))

      if (this.pluginACFkey) {
        this.mkdir('acf-json')
        this.fs.copyTpl(this.templatePath('wordpress/lib/_utils-acf.php'),
          this.destinationPath('lib/utils-acf.php'), this)
      }

      if (this.pluginWPMLuserID) {
        this.mkdir('languages')
      }

      if (this.docker) {
        var done = this.async()
        var url = 'https://api.wordpress.org/secret-key/1.1/salt'
        var cwd = '../' + this.dir + '-docker/'
        this.salt = ''

        this.fs.copyTpl(this.templatePath('wordpress/docker/_README.md'),
          this.destinationPath('../README.md'), this)
        this.fs.copyTpl(this.templatePath('wordpress/docker/_gitignore'),
          this.destinationPath('../.gitignore'), this)
        this.fs.copyTpl(this.templatePath('wordpress/docker/_gitmodules'),
          this.destinationPath('../.gitmodules'), this)
        this.fs.copyTpl(this.templatePath('wordpress/docker/_docker-compose.yaml'),
          this.destinationPath(cwd + 'docker-compose.development.yaml'), this)
        this.fs.copyTpl(this.templatePath('wordpress/docker/_docker-compose.yaml'),
          this.destinationPath(cwd + 'docker-compose.yaml'), this)
        this.fs.copyTpl(this.templatePath('wordpress/docker/_wp-config.development.php'),
          this.destinationPath(cwd + 'wp-config.development.example.php'), this)
        this.fs.copyTpl(this.templatePath('wordpress/docker/_wp-config.development.php'),
          this.destinationPath(cwd + 'wp-config.development.php'), this)
        this.fs.copy(this.templatePath('wordpress/docker/register-theme-directory.php'),
          this.destinationPath(cwd + 'wp-content/mu-plugins/register-theme-directory.php'))
        this.fs.copy(this.templatePath('wordpress/docker/index.php'),
          this.destinationPath(cwd + 'index.php'))

        request(url, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            this.salt = body
            this.fs.copyTpl(this.templatePath('wordpress/docker/_wp-config.php'),
              this.destinationPath(cwd + 'wp-config.example.php'), this)
            this.fs.copyTpl(this.templatePath('wordpress/docker/_wp-config.php'),
              this.destinationPath(cwd + 'wp-config.php'), this)
            done()
          }
        }.bind(this))
      }

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

          _this.fs.copyTpl(_this.templatePath('typo3/docker/_docker-compose.development.yaml'),
            _this.destinationPath(docker + '/docker-compose.development.yaml'), _this)
          _this.fs.copyTpl(_this.templatePath('typo3/docker/_docker-compose.development.yaml'),
            _this.destinationPath(docker + '/docker-compose.yaml'), _this)
          _this.fs.copyTpl(_this.templatePath('typo3/docker/_gitignore'),
            _this.destinationPath('../.gitignore'), _this)
          _this.fs.copyTpl(_this.templatePath('typo3/docker/_gitmodules'),
            _this.destinationPath('../.gitmodules'), _this)
          _this.fs.copyTpl(_this.templatePath('typo3/docker/_README.md'),
            _this.destinationPath('../README.md'), _this)

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
      var docker = '../' + this.dir + '-docker/'

      /**
       * Welcome to temporary callback hell.
       */
      if (this.composer) {
        this.spawnCommand('ln', ['-s', '../' + this.dir + '/wp/composer.json'], {
          cwd: docker
        }).on('exit', function() {
          _this.spawnCommand('composer', ['install'], {
            cwd: docker
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

        if (this.html) {
          this._end()
        }
      }.bind(this)
    })
  },

  _end: function() {
    this.log(
      '\n' +
      '  ======================================================================', '\n' +
      '\n' +
      chalk.green('  !'),  chalk.bold('Project details'), '\n\n' +
      chalk.green('  ❯'), 'Name:', chalk.cyan(this.appNameDasherize), '\n' +
      chalk.green('  ❯'), 'Description:', chalk.cyan(this.appDescription), '\n' +
      chalk.green('  ❯'), 'Author:', chalk.cyan(this.appAuthor), '\n' +
      chalk.green('  ❯'), 'Type:', chalk.cyan(this.name()), '\n' +
      chalk.green('  ❯'), 'Project URL (production):', chalk.cyan(this.appURL), '\n' +
      '\n' +
      chalk.green('  ❯'), 'Please read', chalk.cyan('README.md'), 'for instructions and available commands.', '\n' +
      chalk.green('  ❯'), chalk.bold('Make sure all the settings such as git urls are correctly generated.'), '\n' +
      chalk.green('  ❯ Happy developing! :)'), '\n' +
      '\n' +
      '  ======================================================================' +
      '\n'
    )
  }
})

module.exports = MyGenerator
