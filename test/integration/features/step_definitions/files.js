var fs = require('fs'),
    path = require('path'),
    helpers = require('yeoman-generator').test,
    assert = require('yeoman-generator').assert,
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    _ = require('lodash'),

    timeGruntSpy = sinon.spy();

require('setup-referee-sinon/globals');

var tempDir = path.join(__dirname, 'temp');

module.exports = function () {
  this.When(/^the generator is run$/, function (callback) {
    helpers.run(path.join( __dirname, '../../../../app'))
      .inDir(tempDir)
      .withPrompts({'someOption': true})
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
          gruntSpy = sinon.spy();

      assert(_.has(devDeps, 'grunt'));
      assert(_.has(devDeps, 'load-grunt-config'));
      assert(_.has(devDeps, 'time-grunt'));

      proxyquire('./temp/Gruntfile.js', {'time-grunt': timeGruntSpy});
      require('./temp/Gruntfile.js')(gruntSpy);
      sinon.assert.calledWith(timeGruntSpy, gruntSpy);

      callback();
    });
  });
};
