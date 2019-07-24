var express = require('express');
var app = express();
var router = express.Router();
app.use('/', router);

var port = process.env.PORT || 2350;

const log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

app.listen(port);
logger.info('Magic happens on port ' + port + ' - ' + new Date());
logger.error('Error log started');
const textService = require('./textService.js')(logger);

require('./cronService.js')(textService);
