module.exports = function replaceMap($_string, $_map) {
    if (!$_map || !$_map.length) {
        return $_string;
    }

    Object.keys($_map).map(function($_target, $_index) {
        $_string = $_string.replace($_map[$_index], $_target);
    });

    return $_string;
};
