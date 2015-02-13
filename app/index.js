/* ========================================
 * Mediasignal generator
 * ======================================== */

'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var moment = require('moment');

var MscGenerator = yeoman.generators.Base.extend({

  /**
   * Init
   */
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.pkg = require('../package.json');
    this.appRoot = path.basename(process.cwd());
    this.generatorDate = moment().format('DD.M.YYYY HH:MM');
    this.generatorAuthor = this.pkg.author.name;
    this.generatorRepository = this.pkg.repository;

    this.argument('dir', {
      type: String,
      required: false
    });

    this.dir = this._.dasherize(this._.slugify(this.dir));

    if(this.dir) {
      this.destinationRoot(this.dir);
      this.appRoot = this.dir;
    }
  },

  /**
   * Greet the user
   */
  greet: function() {
    this.log(yosay(
      'Hi! Welcome to the ' + chalk.blue('Mediasignal') + ' generator. '
    ));
  },

  /**
   * Prompts
   */
  askName: function () {
    var done = this.async();

    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: path.basename(process.cwd())
    }, function(answers) {

      this.appName = this._.dasherize(this._.slugify(answers.name));
      this.appNameHumanize = this._.humanize(this.appName);

      done();
    }.bind(this));
  },

  askFor: function () {
    var done = this.async();
    var appRoot = this.appRoot;
    var dir = this.dir;

    this.prompt([{
      type: 'list',
      name: 'projectType',
      message: 'What kind of project this is?',
      choices: [{
          name: 'Typo3',
          value: 'typoProject',
          checked: true
        }, {
          name: 'Html',
          value: 'htmlProject',
          checked: false
        }]
      }, {
        when: function (answers) {
          if (answers.projectType === 'typoProject') {
            console.log(
              chalk.green('  ❯'),
              'Your project will be installed in', chalk.cyan('./'+dir), '\n' +
              chalk.green('  ❯'),
              'Your Typo3 extension path is', chalk.cyan(appRoot)
            );
          } else if (answers.projectType === 'htmlProject') {
            console.log(
              chalk.green('  ❯'), 'Your project will be installed in',
              chalk.cyan('./')
            );

            return true;
          }
        },
        type: 'input',
        name: 'sourcePath',
        message: 'Source path for your code (development):',
        default: 'src'
      }, {
        type: 'input',
        name: 'homepage',
        message: 'Project URL (production):',
        default: this.appName + '.com'
      }, {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: 'Website for '+ this.appNameHumanize
      }, {
        type: 'confirm',
        name: 'designAssets',
        message: 'Do you need design assets (psd etc.):',
        default: false
      }
    ], function(answers) {
      this.projectType = answers.projectType;
      this.typoProject = this.projectType === 'typoProject';
      this.htmlProject = this.projectType === 'htmlProject';
      this.designAssets = answers.designAssets;

      done();
    }.bind(this));
  },

  /**
   * Setup configs
   */
  config: function() {
    if(this.typoProject) {
      this.config.set('configurationPath', 'Configuration');
      this.config.set('assetsPath', 'Resources/Private/Assets');
    }

    if(this.htmlProject) {
      //this.config.set('assetsPath', 'Resources/Private/Assets');
    }
  },

  /**
   * Setup gruntfile
   */
  gruntfile: function() {
    if(this.typoProject) {
      this.template(
        'typo3/_Gruntfile.js',
        this.destinationPath('Gruntfile.js')
      );
    }

    if(this.htmlProject) {
      this.template(
        'html/_Gruntfile.js',
        this.destinationPath('Gruntfile.js')
      );
    }
  },

  /**
   * Setup assets
   */
  assets: function() {

    if (this.designAssets) {
      this.fs.copy(
        this.templatePath('shared/_design'),
        this.destinationPath('_design')
      )
      this.mkdir('_design/materials')
    }

    if(this.typoProject) {
      this.fs.copy(
        this.templatePath('assets'),
        this.config.get('assetsPath')
      )
    }
  },

  /**
   * Setup bower
   */
  bower: function() {
    this.template('shared/_bower.json', 'bower.json');
  },

  /**
   * Copy other files
   */
  other: function() {
    this.fs.copy(
      this.templatePath('shared/editorconfig'),
      this.destinationPath('.editorconfig')
    );

    if(this.typoProject) {
      this.template(
        this.templatePath('typo3/Configuration/TypoScript/_setup.txt'),
        this.config.get('configurationPath')+'/TypoScript/setup.txt'
      );

      this.template(
        this.templatePath('typo3/Configuration/TypoScript/_constants.txt'),
        this.config.get('configurationPath')+'/TypoScript/constants.txt'
      );

      this.fs.copy(
        this.templatePath('typo3/Resources/Private/Layouts/Page.html'),
        this.destinationPath('Resources/Private/Layouts/Page.html')
      );

      this.fs.copy(
        this.templatePath('typo3/Resources/Private/Layouts/Page.html'),
        this.destinationPath('Resources/Private/Layouts/Page.html')
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
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },

  log: function() {
    // this.log('AppName: ', this.appName);
    // console.log('appRoot: ', this.appRoot);
    // console.log('projectType: ', this.projectType);
    // console.log(this.appDir);
    console.log(this.config.getAll());
  }
});

module.exports = MscGenerator;
