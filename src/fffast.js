#! /usr/bin/env node

var fs = require('fs-extra')
var path = require('path');
var spawn = require('child_process').spawn;

var program = require("commander");
var mkdirp = require('mkdirp');

var Checker = require('./lib/utils/Checker');
var Logger = require('./lib/utils/Logger');

var version = require('../package').version;

var remote_folder = fs.realpathSync('./');
var template_folder = path.join(__dirname, '/../template');
var module_folder = path.join(__dirname, '/..');

var node, webpack;

var settings = {};

function _nodeArgs(){

  var args = [];

  var server_js = path.join(module_folder, 'src/files/server.js');
  args.push(server_js);

  //pass remote path as extra param
  args.push(process.cwd());

  var port = parseInt(program.port) || 3000;
  args.push(port);

  return args;

}

function _webpackArgs(){

  var args = [];

  var src = path.join(module_folder, 'src/files/entry.js');
  var dest = path.join(settings.js.dest);

  args.push(src);
  args.push(dest);

  args.push('--config');
  args.push(path.join(module_folder, 'src/files/webpack.config.js'));

  args.push('--loader');
  args.push(settings.css.loader);

  args.push('--watch');

  args.push('--progress');

  return args;

}

//fffast i // fffast init
function _init(){

  var options = ['postcss', 'scss', 'sass', 'less'];

  var css = program.css || 'postcss';

  if(options.indexOf(css.toLowerCase()) === -1){
    Logger.default(css.toLowerCase());
    css = 'postcss'
  }

  settings = require('./lib/data/settings')(remote_folder, css === 'postcss' ? 'css' : css);

  var css_template_folder = path.join(template_folder, '_' + settings.css.loader);

  fs.copy(path.join(template_folder, '/base'), remote_folder, function(err){

    process.chdir(remote_folder);

    if (err) return Logger.error('error while creating structure');

    var css_path = path.join(template_folder, '/css/', '_' + settings.css.loader);
    var remote_css_path = path.join(remote_folder, '/_css');

    fs.copy(css_path, remote_css_path, function(err){

        if (err) return Logger.error('error while creating structure');
        else _run();

    });

  });

}

//fffast
function _run(){

  var processor = settings.css.loader === 'css' ? 'postcss' : settings.css.loader;
  Logger.running(processor);

  _spawnNode();
  _spawnWebpack();

}

function _spawnWebpack(){
  webpack = spawn('webpack', _webpackArgs(), { stdio: 'inherit' });
  webpack.on('exit', function(){
    node.kill();
  });
}

function _spawnNode(){
  node = spawn('node', _nodeArgs(), { stdio: 'inherit' });
  node.on('exit', function(){
    webpack.kill();
    node.kill();
  });
}

program
  .version(version)
  .option("-p, --port <port>", "server port")
  .option("--css <postcss, scss, sass, less>", "css style, default is 'postcss'")
  .usage('/ create a quick css/js experimentation folder \n\n  $ fffast {command}');

program
  .command('init')
  .alias('i')
  .description('copy basic structure into current folder and start fffast')
  .action(function(){

    Logger.title(version);

    Checker.check(remote_folder, true, function(_settings){
      settings = _settings;
      if(settings){
        var processor = settings.css.loader === 'css' ? 'postcss' : settings.css.loader;
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

  Checker.check(remote_folder, false, function(_settings){
    settings = _settings;
    if(_settings){
      _run();
    }
  });

}


