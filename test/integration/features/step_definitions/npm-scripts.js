var helpers = require('yeoman-generator').test,
    assert = require('yeoman-generator').assert,
    shell = require('shelljs');

module.exports = function () {
    this.When(/^npm "([^"]*)" is run$/, function (script, callback) {
        shell.exec('npm ' + script, function (code) {
            assert.equal(0, code);
            callback();
        });
    });

    this.Then(/^the result is successful$/, function (callback) {
        callback();
    });
};
