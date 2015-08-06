#! /usr/bin/env node

var fs = require('fs-extra')
var path = require('path');

var program = require("commander");
var mkdirp = require('mkdirp');

var Checker = require('./lib/utils/Checker');
var Logger = require('./lib/utils/Logger');

var version = require('../package').version;

var node, webpack;

var paths = require('./lib/config/paths')();

program
  .version(version)
  .option("-p, --port <port>", "server port")
  .option("--css <postcss, scss, sass, less>", "css style, default is 'postcss'")
  .option("-m, --min", "minify output, cfr. webpack -p -d --watch")
  .usage('/ create a quick css/js experimentation folder \n\n  $ fffast {command}');

program
  .command('init')
  .alias('i')
  .description('copy basic structure into current folder and start fffast')
  .action(function(){

    Logger.title(version);

    Checker.check(true, function(loader){

      if(loader){

        paths = require('./lib/config/paths')(loader);
        Logger.message("structure exists \n");
        _run();

      }else{
        _init();
      }

    });

  });

program.parse(process.argv);

if (program.args.length < 1 ) {

  Logger.title(version);

  Checker.check(false, function(loader){

    if(loader){
      paths = require('./lib/config/paths')(loader);
      _run();
    }

  });

}


//fffast i // fffast init
function _init(){

  var loaders = require('./lib/config/settings').loaders;

  var css = program.css || loaders[0].name;
  var loader = {};

  var found = false;

  for(var i = 0;i < loaders.length;i++){
    if(loaders[i].name.toLowerCase() === css.toLowerCase()){
      loader = loaders[i];
      found = true;
    }
  }

  if(!found){
    Logger.default(css.toLowerCase());
    loader = loaders[0];
  }

  paths = require('./lib/config/paths')(loader);

  fs.copy(paths.template.base, paths.remote_folder, function(err){

    if (err) return Logger.error('error while creating structure');

    fs.copy(paths.template.css, paths.css.remote_folder, function(err){

        if (err) return Logger.error('error while creating structure');
        else _run();

    });

  });

}

//fffast
function _run(){

  Logger.running(paths.css.loader);

  node = require('./lib/commands/express')(paths, program);
  node.on('exit', function(){
    webpack.kill();
    node.kill();
  });

  webpack = require('./lib/commands/webpack')(paths, program);
  webpack.on('exit', function(){
    node.kill();
  });

}
