'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

var TraviJsLibraryGenerator = yeoman.generators.Base.extend({
  _grunt: function () {
    this.copy('grunt/_Gruntfile.js', 'Gruntfile.js');
    this.copy('grunt/_aliases.yml', 'grunt/aliases.yml');
    this.copy('grunt/_jslint.yml', 'grunt/jslint.yml');
    this.copy('grunt/_jscs.yml', 'grunt/jscs.yml');
  },

  _git: function () {
    this.copy('git/gitattributes', '.gitattributes');
    this.copy('git/gitignore', '.gitignore');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous TraviJsLibrary generator!'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    mkdirp('app');
    mkdirp('app/templates');

    this.copy('_package.json', 'package.json');
    this._grunt();
  },

  configuring: function () {
    this.copy('editorconfig', '.editorconfig');
    this._git();
  },

  install: function () {
    var generator = this;

    this.npmInstall([
      'grunt',
      'load-grunt-config',
      'time-grunt'
    ], {'saveDev': true});

    this.installDependencies({
      npm: true,
      bower: false,
      skipInstall: false,
      skipMessage: false,
      callback: function () {
        generator.log(yosay('dependency installation complete'));
      }
    });
  }
});

module.exports = TraviJsLibraryGenerator;
