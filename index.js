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
                replace: null
            },
            loaderUtils.getOptions
                ? loaderUtils.getOptions(this)
                : loaderUtils.parseQuery(this.resourceQuery)
        ),
        themes = JSON.parse(source) || null,
        contextCallback = options.verify ? this.async() : null;

    var total = 0,
        tested = 0,
        result = '';

    if (!themes) {
        this.emitWarning(this.resource + ' does not contain valid json.');
        return source;
    }

    if (!options.verify) {
        return options.modules.map(function ($_module) {
            return themes.map(function ($_theme) {
                return replaceMap(
                    '@import \'' + $_theme + '/' + $_module + '/' + options.base + '\'',
                    options.replace
                );
            }).join(';');
        }).join(';') + ';';
    }

    verifyFiles(this, options, themes);
}
