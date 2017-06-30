const assembleImport  = require('./assembleImport');

module.exports = function verifyFiles($_loader, $_options, $_output) {
    var total  = $_output.length,
        tested = 0,
        base,
        path;

    $_output.map(function ($_path) {
        base = $_path.substr(0,1) === '~' || $_path.substr(0,1) === '/'
            ? './'
            : $_loader.context;
        path = $_path.substr(0,1) === '~'
            ? $_path.substr(1) + '/' + $_options.base + '.scss'
            : $_path + '/' + $_options.base + '.scss';

        $_loader.resolve(base, path, function($_err) {
            tested++;

            if ($_err) {
                $_output.splice($_output.indexOf($_path), 1);
            }

            if (total === tested) {
                assembleImport($_loader, $_options, $_output);
            }
        });
    });
};
