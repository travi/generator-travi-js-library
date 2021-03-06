/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('travi-js-library generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('travi-js-library:app', [
        '../../app'
      ]);

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFile([
        // add files you expect to exist here.
        '.jshintrc',
        '.editorconfig',
        'package.json',
        'bower.json',
        'Gruntfile.js'
      ]);

      done();
    });
  });
});
