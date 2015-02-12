/* ========================================
 * Mediasignal generator
 * ======================================== */

'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var moment = require('moment');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    /**
     * Application name, path etc.
     */
    this.pkg = require('../package.json');

    this.argument('appName', { type: String, required: true });

    this.appName = this._.dasherize(this.appName);
    this.appNameHumanized = this._.humanize(this.appName);

    this.appDir = '.';
    this.appRoot = path.basename(process.cwd());

    this.generatorDate = moment().format('DD.M.YYYY HH:MM');
    this.generatorAuthor = this.pkg.author.name;
    this.generatorRepository = this.pkg.repository;

    this.option('appDir', {
      desc: 'Choose in which directory to write the files'
    });

    if(this.options.appDir) {
      this.appDir = this.options.appDir;
      this.appRoot = path.basename(this.appDir);
    }

    //console.log(this.destinationPath());
    this.log('AppName: ', this.appName);
    console.log('appDir: ', this.appDir);
    console.log('appRoot: ', this.appRoot);
  },

  askFor: function () {
    var done = this.async();
    var appDirDefined = this.options.appDir;
    var appRoot = this.appRoot;
    var appDir = this.options.appDir ? this.options.appDir : appRoot;


    /**
     * Greet the user
     */
    this.log(yosay(
      'Moro! Welcome to the '
      + chalk.blue('Mediasignal')
      + ' generator!'
    ));

    /**
     * What kind of project we are building?
     */
    var prompts = [{
      type: 'list',
      name: 'projectType',
      message: 'What kind of project you are building?',
      choices: [{
        name: 'Typo3',
        value: 'typoProject',
        checked: true
      },{
        name: 'Html',
        value: 'htmlProject',
        checked: false
      }]
    },{
      when: function (answers) {
        if (!answers.projectType.indexOf('typoProject')) {
          console.log(
            chalk.green('  ❯'),
            'Your project will be installed in', chalk.cyan(appDir),
            appDirDefined ? '' : '(current directory)', '\n' +
            chalk.green('  ❯'),
            'Your Typo3 extension path is', chalk.cyan(appRoot)
          );
        } else if (!answers.projectType.indexOf('htmlProject')) {
          console.log(
            chalk.green('  ❯'),
            'Your project will be installed in', chalk.cyan(appDir),
            appDirDefined ? '' : '(current directory)'
          );

          return true;
        }
      },
      type: 'input',
      name: 'srcPath',
      message: 'Source path for your code (development):',
      default: 'src'
    },{
      type: 'input',
      name: 'appHomepage',
      message: 'Homepage (production):',
      default: this.appName + '.com'
    },{
      type: 'input',
      name: 'appDescription',
      message: 'Description:',
      default: 'Website for '+ this.appName + '.com'
    }];


    this.prompt(prompts, function (answers) {
      var projectType = answers.projectType;

      /**
       * Setup quick access to project type prompts
       */
      function hasFeature(project) {
        return projectType && projectType.indexOf(project) !== -1;
      }

      this.typoProject = hasFeature('typoProject');
      this.htmlProject = hasFeature('htmlProject');

      // console.log('ProjectType: ', projectType);
      // console.log('typoProject: ', this.typoProject);
      // console.log('htmlProject: ', this.htmlProject);
      // console.log(this.appDir);

      done();
    }.bind(this));
  },

  gruntfile: function() {
    if(this.typoProject) {
      this.template('typo3/_Gruntfile.js', this.appDir+'/Gruntfile.js');
      // this.fs.copyTpl(
      //   this.templatePath('typo3/_Gruntfile.js'),
      //   this.destinationPath(this.appDir+'/Gruntfile.js')
      // );
    }

    if(this.htmlProject) {
      this.template('html/_Gruntfile.js', this.appDir+'/Gruntfile.js');
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
