var fs = require('fs'),
    path = require('path'),
    helpers = require('yeoman-generator').test,
    assert = require('yeoman-generator').assert,
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    _ = require('lodash');

require('setup-referee-sinon/globals');

var tempDir = path.join(__dirname, 'temp');

module.exports = function () {
  var answers = {};

  this.After(function (callback) {
    answers = {};

    callback();
  });

  this.Given(/^the project\-name prompt is populated with "([^"]*)"$/, function (projectName, callback) {
    answers.projectName = projectName;

    callback();
  });

  this.When(/^the generator is run$/, function (callback) {
    helpers.run(path.join( __dirname, '../../../../app'))
      .inDir(tempDir)
      .withPrompts(answers)
      .withOptions({skipInstall: false})
      .on('end', callback);
  });

  this.Then(/^the core files should be present$/, function (callback) {
      assert.file([
        '.gitattributes',
        '.gitignore',
        '.editorconfig',
        'package.json',
        'Gruntfile.js',
        'grunt/aliases.yml',
        'grunt/jslint.yml',
        'grunt/jscs.yml'
      ]);

      assert.fileContent('.gitattributes', /^\* text=auto\n$/);

      callback();
  });

  this.Then(/^the core dependencies will be installed$/, function (callback) {
    fs.readFile(path.join(tempDir, 'package.json'), 'utf8', function (err, content) {
      var devDeps = JSON.parse(content).devDependencies,
          gruntSpy = sinon.spy(),
          timeGruntSpy = sinon.spy(),
          loadGruntConfigSpy = sinon.spy();

      assert(_.has(devDeps, 'grunt'));
      assert(_.has(devDeps, 'load-grunt-config'));
      assert(_.has(devDeps, 'time-grunt'));

      proxyquire('./temp/Gruntfile.js', {
        'time-grunt': timeGruntSpy,
        'load-grunt-config': loadGruntConfigSpy
      });

      require('./temp/Gruntfile.js')(gruntSpy);

      sinon.assert.calledWith(timeGruntSpy, gruntSpy);
      sinon.assert.calledWith(loadGruntConfigSpy, gruntSpy);

      callback();
    });
  });


  this.Then(/^the project\-name of "([^"]*)" is defined in the generated files$/, function (projectName, callback) {
    fs.readFile(path.join(tempDir, 'package.json'), 'utf8', function (err, content) {
      assert.equal(projectName, JSON.parse(content).name);

      callback();
    });
  });
};
