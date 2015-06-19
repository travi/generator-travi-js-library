var path = require('path'),
    helpers = require('yeoman-generator').test,
    assert = require('yeoman-generator').assert;

module.exports = function () {
  this.When(/^the generator is run$/, function (callback) {
    helpers.run(path.join( __dirname, '../../../../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withPrompts({'someOption': true})
      .withOptions({'skip-install': true})
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
};
