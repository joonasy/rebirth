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

    /**
     * Application path etc.
     */
    this.pkg = require('../package.json');

    this.appDir = './'; // Install dir
    this.appRoot = path.basename(process.cwd(this.appDir));

    this.generatorDate = moment().format('DD.M.YYYY HH:MM');
    this.generatorAuthor = this.pkg.author.name;
    this.generatorRepository = this.pkg.repository;

    this.option('dir', {
      desc: 'Choose in which directory to write the files',
      type: String,
      required: false
    });

    if(this.options.dir) {
      this.appDir = './'+this.options.dir;
      this.appRoot = path.basename(this.appDir);
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
      default: path.basename(process.cwd(this.appDir))
    }, function(answers) {

      this.appName = this._.dasherize(this._.slugify(answers.name));
      this.appNameHumanize = this._.humanize(this.appName);

      done();
    }.bind(this));
  },

  askFor: function () {
    var done = this.async();
    var appRoot = this.appRoot;
    var appDir = this.options.dir ? './'+this.options.dir : this.appDir;

    /**
     * What kind of project we are building?
     */
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
              'Your project will be installed in', chalk.cyan(appDir), '\n' +
              chalk.green('  ❯'),
              'Your Typo3 extension path is', chalk.cyan(appRoot)
            );
          } else if (answers.projectType === 'htmlProject') {
            console.log(
              chalk.green('  ❯'), 'Your project will be installed in',
              chalk.cyan(appDir)
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
      //console.log(answers);
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
      this.config.set('assetsPath', this.appDir+'Resources/Private/Assets');
    }
  },

  /**
   * Setup gruntfile
   */
  gruntfile: function() {
    if(this.typoProject) {
      this.template('typo3/_Gruntfile.js', this.appDir+'Gruntfile.js');
    }

    if(this.htmlProject) {
      this.template('html/_Gruntfile.js', this.appDir+'Gruntfile.js');
    }
  },

  /**
   * Setup assets
   */
  assets: function() {

    if (this.designAssets) {
      this.fs.copy(
        this.templatePath('shared/_design'),
        this.destinationPath(this.appDir+'_design')
      )
      this.mkdir('_design/materials')
    }

    if(this.typoProject) {
      //this.template('typo3/_Gruntfile.js', this.appDir+'Gruntfile.js');
      this.fs.copy(
        this.templatePath('assets'),
        this.config.get('assetsPath')
      )
    }

    // if(this.htmlProject) {
    // }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },

  log: function() {
    // this.log('AppName: ', this.appName);
    // console.log('appDir: ', this.appDir);
    // console.log('appRoot: ', this.appRoot);
    // console.log('projectType: ', this.projectType);
    // console.log(this.appDir);
    console.log(this.config.getAll());
  }
});

module.exports = MscGenerator;
