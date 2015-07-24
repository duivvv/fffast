#! /usr/bin/env node

var fs = require('fs-extra')
var path = require('path');

var program = require("commander");
var mkdirp = require('mkdirp');

var Logger = require('./Logger');

var version = require('../../package').version;

function _nodeArgs(module_folder){

  var args = [];

  var server_js = path.join(module_folder, 'server.js');
  args.push(server_js);

  //pass remote path as extra param
  args.push(process.cwd());

  var port = parseInt(program.port) || 3000;
  args.push(port);

  return args;

}

function _webpackArgs(module_folder){

  var args = [];

  //var src = path.join(process.cwd(), '_js', 'app.js');
  var src = path.join(module_folder, 'start.js');
  var dest = path.join(process.cwd(), 'js', 'app.js');

  args.push(src);
  args.push(dest);

  args.push('--config');
  args.push(path.join(module_folder, 'webpack.config.js'));

  args.push('--watch');

  args.push('--progress');

  return args;

}

//fffast i // fffast init
function _init(){

  var remote_folder = fs.realpathSync('./');
  var module_folder = path.join(__dirname, '/..');
  var template_folder = path.join(module_folder, '/../template');

  fs.copy(template_folder, remote_folder, function(err){

    process.chdir(remote_folder);
    if (err) return console.error(err)
    else _run();

  });

}

//fffast
function _run(){

  var module_folder = path.join(__dirname, '/..');

  Logger.title(version);

  var settings = { stdio: 'inherit' };

  var spawn = require('child_process').spawn;

  spawn('node', _nodeArgs(module_folder), settings);
  spawn('webpack', _webpackArgs(module_folder), settings);

}

program
  .version(version)
  .option("-p, --port <port>", "server port")
  .usage('/ create a quick css/js experimentation folder \n\n  $ fffast {command}');

program
  .command('init')
  .alias('i')
  .description('copy folders and files into current folder')
  .action(_init);

program.parse(process.argv);

if (program.args.length < 1 ) {
  _run();
}


