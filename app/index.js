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
    var log = this.log;

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
            log(
              chalk.green('  ❯'),
              'Your project will be installed in', chalk.cyan('./'+dir), '\n' +
              chalk.green('  ❯'),
              'Your Typo3 extension path is', chalk.cyan(appRoot)
            );
          } else if (answers.projectType === 'htmlProject') {
            return true;
          }
        },
        type: 'input',
        name: 'srcPath',
        message: 'Source path for your code (folder for development):',
        default: 'src'
      }, {
        when: function (answers) {
          if (answers.projectType === 'htmlProject') {
            log(
              chalk.green('  ❯'), 'Your project will be installed in',
              chalk.cyan('./'+dir), '\n' +
              chalk.green('  ❯'),
              'Your development path is', chalk.cyan(answers.srcPath)
            );
          }
        }
      }, {
        type: 'input',
        name: 'url',
        message: 'Project URL (production):',
        default: 'http://' + this.appName + '.com'
      }, {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: 'Website for '+ this.appNameHumanize
      }, {
        type: 'checkbox',
        name: 'assets',
        message: 'What assets do you need?',
        choices: [{
          name: 'Stylesheets and JavaScripts',
          value: 'cssJs',
          checked: true
        },{
          name: 'Design material (.psd)',
          value: 'design',
          checked: false
        }]
      }
    ], function(answers) {
      this.projectType = answers.projectType;
      this.typoProject = this.projectType === 'typoProject';
      this.htmlProject = this.projectType === 'htmlProject';

      this.appURL = answers.url;
      this.appDescription = answers.description;
      this.appSourcePath = answers.srcPath;

      this.cssAndJsAssets = answers.assets.indexOf('cssJs') !== -1;
      this.designAssets = answers.assets.indexOf('design') !== -1;

      done();
    }.bind(this));
  },

  /**
   * Setup configs
   */
  config: function() {
    if(this.typoProject) {
      this.config.set('assetsPath', 'Assets');
    }

    if(this.htmlProject) {
      this.config.set('sourcePath', this.appSourcePath);
      this.config.set('assetsPath', this.config.get('sourcePath')+'/assets');
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
   * Setup README.md
   */
  readme: function() {
    this.template('shared/_README.md', 'README.md');
  },

  /**
   * Setup package.json
   */
  packageJSON: function () {
    if(this.typoProject) {
      this.template(
        'typo3/_package.json',
        this.destinationPath('package.json')
      );
    }

    if(this.htmlProject) {
      this.template(
        'html/_package.json',
        this.destinationPath('package.json')
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

    if(this.cssAndJsAssets) {
      this.fs.copy(
        this.templatePath('assets'),
        this.config.get('assetsPath')
      )
      this.mkdir(this.config.get('assetsPath')+'/stylesheets/helpers');
      this.mkdir(this.config.get('assetsPath')+'/images')
      this.mkdir(this.config.get('assetsPath')+'/fonts')
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
        this.destinationPath(this.config.get('sourcePath')+'/app.json')
      );

      this.template(
        this.templatePath('html/src/pages/_index.hbs'),
        this.destinationPath(this.config.get('sourcePath')+'/pages/index.hbs')
      );

      this.fs.copy(
        this.templatePath('html/src/layouts/_layout.hbs'),
        this.destinationPath(this.config.get('sourcePath')+'/layouts/layout.hbs')
      );

      this.fs.copy(
        this.templatePath('html/src/includes/_top.hbs'),
        this.destinationPath(this.config.get('sourcePath')+'/includes/top.hbs')
      );

      this.template(
        this.templatePath('html/src/includes/_bottom.hbs'),
        this.destinationPath(this.config.get('sourcePath')+'/includes/bottom.hbs')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },

  log: function() {
    console.log(this.config.getAll());
  }
});

module.exports = MscGenerator;
