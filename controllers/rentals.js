var conf = require('../config'),
    sql = require('sqlite3'),
    db = new sql.Database(conf.db);

exports.getRental = function(req, res, next) {
    var stmt = db.prepare("SELECT * FROM tblGeneral WHERE PropID = ?");
    stmt.get(req.params.id, function (err, row) {
        res.send(row);
    });
    stmt.finalize();
}

exports.getRentals = function(req, res, next) {
    var all = [];
    db.each("SELECT * FROM tblGeneral", function (err, row) {
        all.push(row);
    }, function (err, count) {
        res.send(all);
    });
}
