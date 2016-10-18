const path = require('path');
const fs = require('fs');

const viewsDir = 'src/templates/views/';
const dataDir = 'src/data/';

module.exports.getCurrentUrl = function  (req) {
  return req.protocol + '://' + req.get('host') + req.originalUrl;
}

module.exports.getCurrentHost = function (req) {
  return req.protocol + '://' + req.get('host');
}

module.exports.renderJade = function (name, req, res, next) {
    var jadeTemplate = path.resolve(path.join(path.join(__dirname, '../..'), viewsDir, name + '.jade'));
    try {
        fs.accessSync(jadeTemplate, fs.F_OK);
        var data = require(path.join(path.join(__dirname, '../..'), dataDir, name));
        data.fs = fs;
        res.render(jadeTemplate, data);
    } catch (e) {
        console.log(e);
        next();
    }
}

module.exports.getIp = function(req){
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}
