/* ========================================
 * My Web Starter Kit generator
 * ======================================== */

'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var moment = require('moment');

var MyGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.pkg = require('../package.json');
    this.appRoot = path.basename(process.cwd());
    this.generatorDate = moment().format('DD.M.YYYY HH:MM');
    this.generatorRepository = this.pkg.repository;

    this.argument('dir', {
      type: String,
      required: false
    });

    if(this.dir) {
      var dir = this.dir.toLowerCase();
      this.destinationRoot(dir);
      this.appRoot = dir;
    }

    this.slashIfDir = (dir ? dir + '/' : '');

    /**
     * Copy only the design assets
     */
    this.option('design', {
      alias: 'd',
      desc: 'Copy only the design assets',
      type: String,
      required: false,
      defaults: null
    });
  },

  /**
   * Greet the user
   */
  greet: function() {
    this.log(yosay(
      'Hi! Welcome to ' + chalk.blue('My Web Starter Kit')+'.'
    ));
  },

  /**
   * Copy only the design assets
   */
  designAssets: function() {
    if (this.options.design) {
      this.fs.copy(
        this.templatePath('shared/design/app-layout.psd'),
        this.destinationPath(this.options.design + '-layout.psd')
      );
      this.log(
        chalk.green('  ❯'), 'Only the design assets copied to', chalk.cyan('./' + this.slashIfDir)
      );
    }
  },

  /**
   * Prompts
   */
  askName: function () {
    if (!this.options.design) {
      var done = this.async();

      this.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Project name:',
          default: path.basename(process.cwd())
        }, {
          type: 'input',
          name: 'author',
          message: 'Author name:',
          default: this.pkg.author.name
        }
      ], function(answers) {
        this.appNameDasherize = this._.dasherize(this._.slugify(answers.name));
        this.appNameHumanize = this._.humanize(this.appNameDasherize);
        this.generatorAuthor = answers.author;
        done();
      }.bind(this));
    }
  },

  askFor: function () {
    if (!this.options.design) {
      var done = this.async();
      var appRoot = this.appRoot;
      var dir = this.dir;
      var log = this.log;
      var slashIfDir = this.slashIfDir;

      this.prompt([
        {
          type: 'list',
          name: 'projectType',
          message: 'What kind of project this is?',
          choices: [
            {
              name: 'Typo3',
              value: 'typoProject',
              checked: true
            }, {
              name: 'Html',
              value: 'htmlProject',
              checked: false
            }
          ]
        }, {
          when: function (answers) {
            if (answers.projectType === 'typoProject') {
              log(
                chalk.green('  ❯'), 'Your project will be installed in', chalk.cyan('./' + slashIfDir), '\n' +
                chalk.green('  ❯'), 'Your Typo3 extension is', chalk.cyan(appRoot), '\n' +
                chalk.green('  ❯'), 'Your build path is', chalk.cyan('./' + slashIfDir + 'Resources/Public/')
              );
            } else if (answers.projectType === 'htmlProject') {
              log(
                chalk.green('  ❯'), 'Your project will be installed in', chalk.cyan('./' + slashIfDir), '\n' +
                chalk.green('  ❯'), 'Your development path is', chalk.cyan('./' + slashIfDir + 'src/'),  '\n' +
                chalk.green('  ❯'), 'Your build path is', chalk.cyan('./' + slashIfDir + 'dist/')
              );
            }
          }
        }, {
          type: 'input',
          name: 'url',
          message: 'Project URL (production):',
          default: 'http://' + this.appNameDasherize + '.com'
        }, {
          type: 'input',
          name: 'description',
          message: 'Project description:',
          default: 'Website for '+ this.appNameHumanize
        }, {
          type: 'checkbox',
          name: 'whatStarters',
          message: 'What starters do you need?',
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
        }
      ], function(answers) {
        this.projectType = answers.projectType;
        this.typoProject = this.projectType === 'typoProject';
        this.htmlProject = this.projectType === 'htmlProject';

        this.appURL = answers.url;
        this.appDescription = answers.description;

        this.defaultAssets = answers.whatStarters.indexOf('defaultAssets') !== -1;
        this.deployment = answers.whatStarters.indexOf('deployment') !== -1;

        done();
      }.bind(this));
    }
  },

  /**
   * Setup configs
   */
  config: function() {
    if (!this.options.design) {
      if(this.typoProject) {
        this.config.set('assetsPath', 'Assets/');
      }

      if(this.htmlProject) {
        this.config.set('assetsPath', 'src/assets/');
      }
    }
  },

  /**
   * Setup gulpfile / assemblefile
   */
  gulpfile: function() {
    if (!this.options.design) {
      if(this.typoProject) {
        this.template(
          this.templatePath('typo3/_gulpfile.js'),
          this.destinationPath('gulpfile.js'));
      }

      if(this.htmlProject) {
        this.template(
          this.templatePath('html/_assemblefile.js'),
          this.destinationPath('assemblefile.js')
        );
      }
    }
  },

  /**
   * Setup README.md
   */
  readme: function() {
    if (!this.options.design) {
      this.template('shared/_README.md', 'README.md');
    }
  },

  /**
   * Setup package.json
   */
  packageJSON: function () {
    if (!this.options.design) {
      if(this.typoProject) {
        this.template('typo3/_package.json', this.destinationPath('package.json'));
      }

      if(this.htmlProject) {
        this.template('html/_package.json', this.destinationPath('package.json'));
      }
    }
  },

  /**
   * Setup default assets
   */
  defaultAssets: function() {
    if (!this.options.design) {
      if(this.defaultAssets) {
        var _this = this;
        var startersDir = this.templatePath('starters/src/assets/');

        var cssAssets = [
          'components/_Heading.scss',
          'components/_Icon.scss',
          'components/_Ieframe.scss',
          'components/_Text.scss',
          'generic/',
          'helpers/_helper.scss',
          'layout/_Container.scss',
          'layout/_Footer.scss',
          'layout/_Grid.scss',
          'layout/_Header.scss',
          'layout/_Width.scss',
          'layout/_Wrap.scss',
          'mixins/',
          'vendors/_normalize.scss',
          '_config.scss',
          'app.scss'
        ].forEach(function(starter) {
          _this.fs.copy(
            startersDir + 'stylesheets/' + starter,
            _this.destinationPath(_this.config.get('assetsPath') + 'stylesheets/' + starter)
          );
        });

        var jsAssets = [
          'app.js',
          'head.js',
          'components/component.js'
        ].forEach(function(starter) {
          _this.fs.copy(
            startersDir + 'javascripts/' + starter,
            _this.destinationPath(_this.config.get('assetsPath') + 'javascripts/' + starter)
          );
        });

        this.mkdir(this.config.get('assetsPath')+'images');
        this.mkdir(this.config.get('assetsPath')+'fonts');
      }
    }
  },

  /**
   * Setup bower
   */
  bower: function() {
    if (!this.options.design) {
      this.template('shared/_bower.json', 'bower.json');
    }
  },

  /**
   * Setup deployment
   */
  deployment: function() {
    if (!this.options.design) {
      if(this.deployment) {
        this.template('shared/_dploy.example.yaml', 'dploy.example.yaml');
        this.template('shared/_dploy.example.yaml', 'dploy.yaml');
      }
    }
  },

  /**
   * Copy other files
   */
  other: function() {
    if (!this.options.design) {
      this.fs.copy(
        this.templatePath('shared/editorconfig'),
        this.destinationPath('.editorconfig')
      );

      this.fs.copy(
        this.templatePath('shared/jscsrc'),
        this.destinationPath('.jscsrc')
      );

      this.template(
        this.templatePath('shared/_gitignore'),
        this.destinationPath('.gitignore')
      );

      if(this.typoProject) {
        this.template(
          this.templatePath('typo3/Configuration/TypoScript/_setup.txt'),
          this.destinationPath('Configuration/TypoScript/setup.txt')
        );

        this.template(
          this.templatePath('typo3/Configuration/TypoScript/_constants.txt'),
          this.destinationPath('Configuration/TypoScript/constants.txt')
        );

        this.template(
          this.templatePath('typo3/Resources/Private/Templates/Page/_HomePage.html'),
          this.destinationPath('Resources/Private/Templates/Page/HomePage.html')
        );

        this.fs.copy(
          this.templatePath('typo3/Resources/Private/Layouts/_App.html'),
          this.destinationPath('Resources/Private/Layouts/App.html')
        );

        this.template(
          this.templatePath('typo3/Resources/Private/Partials/_Top.html'),
          this.destinationPath('Resources/Private/Partials/Top.html')
        );

        this.template(
          this.templatePath('typo3/Resources/Private/Partials/_Bottom.html'),
          this.destinationPath('Resources/Private/Partials/Bottom.html')
        );
      }

      if(this.htmlProject) {
        this.template(
          this.templatePath('html/src/_app.json'),
          this.destinationPath('src/app.json')
        );

        this.template(
          this.templatePath('html/src/templates/_index.hbs'),
          this.destinationPath('src/templates/index.hbs')
        );

        this.fs.copy(
          this.templatePath('html/src/layouts/_layout.hbs'),
          this.destinationPath('src/layouts/layout.hbs')
        );

        this.fs.copy(
          this.templatePath('html/src/partials/_top.hbs'),
          this.destinationPath('src/partials/top.hbs')
        );

        this.template(
          this.templatePath('html/src/partials/_bottom.hbs'),
          this.destinationPath('src/partials/bottom.hbs')
        );
      }
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: !this.options.design && this.options['skip-install'] || this.options.design
    });
  }
});

module.exports = MyGenerator;
