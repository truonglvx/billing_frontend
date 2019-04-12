/**
 * Created by mnace on 7/3/2017.
 */
var express = require('express');
var server = express();
console.log('Starting server: http://localhost:8000');
server.use('/', express.static(__dirname + '/'));
server.listen(8000);

