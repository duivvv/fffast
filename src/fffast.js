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

function _buildTemplateCSSPath(){
  return path.join(
    paths.template_folder, '/css/', '_' + paths.css.loader
  );
}

//fffast i // fffast init
function _init(){

  var options = ['postcss', 'scss', 'sass', 'less'];

  var css = program.css || 'postcss';

  if(options.indexOf(css.toLowerCase()) === -1){
    Logger.default(css.toLowerCase());
    css = 'postcss'
  }

  paths.css.loader = css === 'postcss' ? 'css' : css

  console.log(paths.template_folder, paths.remote_folder);

  fs.copy(path.join(paths.template_folder, '/base'),
            paths.remote_folder, function(err){

    process.chdir(paths.remote_folder);

    if (err) return Logger.error('error while creating structure');

    var remote_css_path = path.join(paths.remote_folder, '/_css');

    fs.copy(_buildTemplateCSSPath(), remote_css_path, function(err){

        if (err) return Logger.error('error while creating structure');
        else _run();

    });

  });

}

//fffast
function _run(){

  paths.program = program;

  var processor = paths.css.loader === 'css' ? 'postcss' : paths.css.loader;
  Logger.running(processor);

  _spawnNode();
  _spawnWebpack();

}

function _spawnWebpack(){

  webpack = require('./lib/commands/webpack')(paths);
  webpack.on('exit', function(){
    node.kill();
  });

}

function _spawnNode(){

  node = require('./lib/commands/express')(paths);
  node.on('exit', function(){
    webpack.kill();
    node.kill();
  });

}

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

    Checker.check(paths.remote_folder, true, function(loader){
      if(loader){
        paths.css.loader = loader;
        var processor = paths.css.loader === 'css' ? 'postcss' : paths.css.loader;
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

  Checker.check(paths.remote_folder, false, function(loader){
    if(loader){
      paths.css.loader = loader;
      _run();
    }
  });

}


