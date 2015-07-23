var path = require('path');

var express = require('express');
var app = express();
var compression = require('compression');

var args = process.argv.slice(2);

var static = args[0];
var port = args[1];

var spawn = require('child_process').spawn;
var Logger = require('./lib/Logger');

app.use(express.static(static));
app.use(compression())

process.on('uncaughtException', function(err){
  if(err) _close();
})

function _close(){
  var close = spawn('pkill', ['node'], {stdio: 'ignore'});
  close.on('close', function(){
    _init();
  });
}

function _init(){
  app.listen(port, function(err){
    console.log('\r');
    Logger.message('server running at http://localhost:' + port);
    console.log('\r');
  });
}

_init()
