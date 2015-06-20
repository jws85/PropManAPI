var conf = require('../config'),
    sql = require('sqlite3'),
    db = new sql.Database(conf.db);

exports.getRental = function (req, res, next) {
    var stmt = db.prepare("SELECT * FROM tblGeneral WHERE PropID = ?");
    stmt.get(req.params.id, function (err, row) {
        res.send(row);
    });
    stmt.finalize();
    return next();
}

exports.getRentals = function (req, res, next) {
    var all = [];
    db.each("SELECT * FROM tblGeneral", function (err, row) {
        all.push(row);
    }, function (err, count) {
        res.send(all);
    });
    return next();
}

exports.deleteRental = function (req, res, next) {
    var stmt = db.prepare("DELETE FROM tblGeneral WHERE PropID = ?");
    stmt.run(req.params.id, function (err, row) {
        var ret = { error: false };
        if (err) {
            ret.error = true;
            ret.errMsg = err;
        } else {
            ret.changes = this.changes;
        }
        res.send(ret);
    });
    return next();
}
