'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var TraviJsLibraryGenerator = yeoman.generators.Base.extend({
    nodeVersion: '5.0',

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

    initializing: function () {
        this.appname = this.appname.replace(/\s+/g, '-');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous TraviJsLibrary generator!'));

        var prompts = [{
            name: 'projectName',
            message: 'What is the name of this project?',
            default: this.appname
        }];

        this.prompt(prompts, function (props) {
            this.projectName = props.projectName;

            done();
        }.bind(this));
    },

    app: function () {
        this.template('_package.json', 'package.json');
        this.template('nvmrc', '.nvmrc');
        this._grunt();
    },

    configuring: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jscsrc', '.jscsrc');
        this._git();
    },

    install: function () {
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
                this.log(yosay('dependency installation complete'));
            }.bind(this)
        });
    }
});

module.exports = TraviJsLibraryGenerator;
