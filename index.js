const loaderUtils = require('loader-utils');
const verifyFiles = require('./verifyFiles');
const replaceMap  = require('./replaceMap');

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
                test: false
            },
            loaderUtils.getOptions
                ? loaderUtils.getOptions(this)
                : loaderUtils.parseQuery(this.resourceQuery)
        ),
        themes = JSON.parse(source) || null,
        contextCallback = options.verify ? this.async() : null;

    if (!themes) {
        this.emitWarning(this.resource + ' does not contain valid json.');
        return source;
    }

    if (!options.verify) {
        source = options.modules.map(function ($_module) {
            return themes.map(function ($_theme) {
                return replaceMap(
                    '@import \'' + $_theme + '/' + $_module + '/' + options.base + '\'',
                    options.replace
                );
            }).join(';');
        }).join(';') + ';';

        if (options.test) {
            console.log("\nsass-themer-loader test\n", source, "\n");
        }

        return source;
    }

    verifyFiles(this, options, themes);
}
