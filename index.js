const loaderUtils = require('loader-utils');
const verifyFiles = require('./verifyFiles');

module.exports = function (source) {
    const options = Object.assign(
            {},
            {
                modules: [
                    'typeography',
                    'variable',
                    'mixin',
                    'keyframe',
                    'type',
                    'site'
                ],
                verify: true,
                base: 'index'
            },
            loaderUtils.getOptions(this) || {}
        ),
        themes = JSON.parse(source) || null,
        contextResolve = this.resolve,
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
                return '@import \'' + $_theme + '/' + $_module + '/' + options.base + '\'';
            }).join(';');
        }).join(';') + ';';
    }

    verifyFiles(this, options, themes);
}
