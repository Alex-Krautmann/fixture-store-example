/**
 * Express static HTTP server for development.
 *
 * @author Alex Krautmann
 */

var express = require('express');
var server = express();

server.use('/', express.static(__dirname + '/'));

server.use(function(err, req, res, next) {
	console.error(err.stack);
	res.send(500, 'Something broke!');
});

var port = process.env.PORT || 3000;
server.listen(port);

console.log('Listening on port' + port);