var fs = require('fs'),
    path = require('path'),
    helpers = require('yeoman-generator').test,
    assert = require('yeoman-generator').assert,
    _ = require('lodash');

var tempDir = path.join(__dirname, 'temp');

module.exports = function () {
  this.When(/^the generator is run$/, function (callback) {
    helpers.run(path.join( __dirname, '../../../../app'))
      .inDir(tempDir)
      .withPrompts({'someOption': true})
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

      callback();
  });

  this.Then(/^the core dependencies will be installed$/, function (callback) {
    fs.readFile(path.join(tempDir, 'package.json'), 'utf8', function (err, content) {
      var devDeps = JSON.parse(content).devDependencies;

      console.log(content);
      console.log(devDeps);

      assert(_.has(devDeps, 'load-grunt-config'));

      callback();
    });
  });
};
