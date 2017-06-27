module.exports = function verifyFiles($_loader, $_options, $_themes) {
    var total  = $_options.modules.length * $_themes.length,
        tested = 0,
        result = '',
        base,
        path;

    $_options.modules.map(function ($_module) {
        $_themes.map(function ($_theme) {
            base = $_theme.substr(0,1) === '~' || $_theme.substr(0,1) === '/'
                ? './'
                : $_loader.context;
            path = $_theme.substr(0,1) === '~'
                ? $_theme.substr(1) + '/' + $_module + '/' + $_options.base + '.scss'
                : $_theme + '/' + $_module + '/' + $_options.base + '.scss';

            $_loader.resolve(base, path, function($_err) {
                tested++;

                if (!$_err) {
                    result += '@import \'' + $_theme + '/' + $_module + '/' + $_options.base + '\';';
                }

                if (total === tested) {
                    $_loader.callback(null, result);
                }
            });
        });
    });
};
