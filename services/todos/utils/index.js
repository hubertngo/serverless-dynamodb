module.exports.randomString = function (size, set) {
    var text = "";
    if (!size) return text;
    var set = set || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < size; i++) text += set.charAt(Math.floor(Math.random() * set.length));
    return text;
}

module.exports.safeParseJSON = function (txt) {
    try {
        console.log('json', txt.toString());
        var json = JSON.parse(txt.toString());
        return json;
    }
    catch (e) {
        console.log('e', e);
        return null
    }
}

module.exports.zeroPadding = function (num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

module.exports.cloneJSON = function (input) {
    return JSON.parse(JSON.stringify(input));
}

// module.exports.textCompile = require('sprintf');
