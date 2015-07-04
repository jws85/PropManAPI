var restify = require('restify'),
    fs = require('fs'),
    conf = require('./config');

// require the individual controllers
var controllers = {},
    controllers_path = process.cwd() + '/controllers';
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.search(/.*\.js$/) != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
    }
});

var base = conf.basePath;
var server = restify.createServer();
server.get(base + '/rental', controllers.rentals.getRentals);
server.head(base + '/rental', controllers.rentals.getRentals);
server.get(base + '/rental/:id', controllers.rentals.getRental);
server.head(base + '/rental/:id', controllers.rentals.getRental);
server.del(base + '/rental/:id', controllers.rentals.deleteRental);

server.listen(conf.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});
