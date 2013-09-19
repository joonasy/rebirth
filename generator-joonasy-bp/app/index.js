
'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';

  // for hooks to resolve on mocha by default
  if (!options['test-framework']) {
    options['test-framework'] = 'mocha';
  }

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', { as: 'app' });

  /* Importing file-content as a string */
  //this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    /* You can trigger the installation of Bower dependencies using: */
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // Welcome message
  console.log(this.yeoman);
  console.log('Out of the box I include Joonasy Boilerplate, jQuery and Modernizr.');

  var prompts = [{
    type: 'confirm',
    name: 'autoprefixer',
    message: 'Would you like to use autoprefixer for your CSS?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    //this.autoprefixer = props.autoprefixer;
    cb();
  }.bind(this));

};

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

AppGenerator.prototype.h5bp = function h5bp() {
  this.copy('htaccess', 'app/.htaccess');
};

AppGenerator.prototype.app = function app() {
  this.directory('assets/', 'app/assets/');
  this.copy('index.jade', 'app/index.jade');
};
