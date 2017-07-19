const replaceMap  = require('./replaceMap');

module.exports = function ($_loader, $_options, $_output) {
    let source = $_output.map(function ($_path) {
        return replaceMap(
            '@import \'' + $_path + ($_options.base ? '/' + $_options.base : '') + '\'',
            $_options.replace
        );
    }).join(';') + ';';

    if ($_options.test) {
        console.log("\nTEST\n", source, "\n");
    }

    $_loader.callback(null, source);

}
