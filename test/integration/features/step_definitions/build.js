var _ = require('lodash'),
    fs = require('fs'),
    yaml = require('js-yaml'),
    path = require('path'),
    async = require('async'),
    assert = require('yeoman-generator').assert,

    tempDir = path.join(__dirname, 'temp');

module.exports = function () {
    this.Then(/^the gates task is configured to lint$/, function (callback) {
        async.parallel(
            [
                function (done) {
                    fs.readFile(path.join(tempDir, 'grunt/aliases.yml'), 'utf8', function (err, content) {
                        var tasks = yaml.safeLoad(content);

                        assert(_.contains(tasks.gates, 'lint'));
                        assert(_.contains(tasks.lint, 'jscs'));

                        done();
                    });
                },
                function (done) {
                    fs.readFile(path.join(tempDir, 'grunt/jscs.yml'), 'utf8', function (err, content) {
                        var tasks = yaml.safeLoad(content);

                        assert(_.contains(tasks.all.src, "**/*.js"));
                        assert.equal(tasks.all.options.config, true);

                        done();
                    });
                }
            ],
            callback
        );
    });

    this.Then(/^the gates task is configured to be the default task$/, function (callback) {
        fs.readFile(path.join(tempDir, 'grunt/aliases.yml'), 'utf8', function (err, content) {
            var tasks = yaml.safeLoad(content);

            assert.equal(tasks.default, 'gates');

            callback();
        });
    });
};
