var path = require('path');

var express = require('express');
var app = express();
var compression = require('compression');

var ArgumentsParser = require('../lib/utils/ArgumentsParser');
ArgumentsParser.init(process.argv);

var static = ArgumentsParser.getByKey('static');
var port = ArgumentsParser.getByKey('port');

var spawn = require('child_process').spawn;
var Logger = require('../lib/utils/Logger');

app.use(express.static(static));
app.use(compression())

process.on('uncaughtException', function(err){
  if(err.errno === 'EADDRINUSE'){
    Logger.close('server already running on http://localhost:' + port + ', exiting');
  }
});

function _init(){
  app.listen(port, function(err){
    console.log('\r');
    Logger.server(port);
    console.log('\r');
  });
}

_init()
