const loaderUtils = require('loader-utils');
const verifyFiles = require('./verifyFiles');
const assembleImport  = require('./assembleImport');

module.exports = function (source) {
    const options = Object.assign(
            {},
            {
                modules: [
                    'variables',
                    'mixins',
                    'keyframe',
                    'typeography',
                    'tags',
                    'site'
                ],
                verify: false,
                base: 'index',
                replace: null,
                test: false,
                modular: true
            },
            loaderUtils.getOptions
                ? loaderUtils.getOptions(this)
                : loaderUtils.parseQuery(this.resourceQuery)
        ),
        themes = JSON.parse(source) || null,
        output = [];

    if (!themes) {
        this.emitWarning(this.resource + ' does not contain valid json.');
        return source;
    }

    this.async();

    //Order
    if (options.modular) {
        options.modules.map(function ($_module) {
            themes.map(function ($_theme) {
                output.push($_theme + '/' + $_module);
            });
        });
    }
    else {
        themes.map(function ($_theme) {
            output.push($_theme);
        });
    }

    if (!options.verify) {
        assembleImport(this, options, output);
        return;
    }

    verifyFiles(this, options, output);
}
