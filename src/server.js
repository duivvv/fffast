var args = process.argv.slice(2);

var remote_folder = args[0];
var port = args[1];

var path = require('path');

var spawn = require('child_process').spawn;

var Logger = require('./lib/Logger');

var express = require('express');
var app = express();
var compression = require('compression');

app.use(express.static(remote_folder));
app.use(compression())

process.on('uncaughtException', function(err){
  if(err) close();
})

function close(){
  var close = spawn('pkill', ['node'], {stdio: 'ignore'});
  close.on('close', function(){
    init();
  });
}

function init(){
  app.listen(port, function(err){
    console.log('\r');
    Logger.message('server running at http://localhost:' + port);
    console.log('\r');
  });
}

init()
