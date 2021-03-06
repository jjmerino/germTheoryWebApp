var express = require('express');
var db = require('./database/dbSchema.js');

var app = express();
require('./config/serverConfig.js')(app, express);

var port = process.env.PORT || 4568;
app.listen(port);
console.log('Server now listening on port ' + port);

module.exports = app; // export app for testing
