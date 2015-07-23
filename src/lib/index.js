#! /usr/bin/env node

var fs = require('fs-extra')
var path = require('path');
var program = require("commander");
var version = require('../../package').version;
var mkdirp = require('mkdirp');

var remote_folder = fs.realpathSync('./');
var module_folder = path.join(__dirname, '/..');

var babel_version = require('babel-core/package').version;
var eslint_version = require('eslint/package').version;

var Logger = require('./Logger');

var spawn = require('child_process').spawn;

var server_js = path.join(module_folder, 'server.js');

function _parse_options(program){
  var params = {}
  params.port = parseInt(program.port) || 3000;
  return params
}

program
  .version(version)
  .option("-p, --port <port>", "port to use on localhost")
  .usage('- fffast, quick css/js experimentation folder \n\n  $ fffast {command}');

program
  .command('init')
  .alias('i')
  .description('copy folders and files into current folder')
  .action(init);

program.parse(process.argv);

if (program.args.length < 1 ) {
  run();
}

function init(){
  var template_folder = path.join(module_folder, '/../template');
  fs.copy(template_folder, remote_folder, function(err){
    process.chdir(remote_folder);
    if (err) return console.error(err)
    else run();
  });
}

function run(){

  var params = _parse_options(program);

  Logger.title(version);

  var node_args = [];
  node_args.push(server_js);
  node_args.push(process.cwd());
  node_args.push(params.port);

  var webpack_args = [];
  webpack_args.push(path.join(process.cwd(),'_js','app.js'));
  webpack_args.push(path.join(process.cwd(),'js','app.js'));
  webpack_args.push('--config');
  webpack_args.push(path.join(module_folder, 'webpack.config.js'));
  webpack_args.push('--watch');
  webpack_args.push('--progress');

  var nodemon = spawn('node', node_args, { stdio: 'inherit' });
  /*
  Logger.log('Babel');
  Logger.log(babel_version, 'Version:');
  console.log('\r');
  Logger.log('ESLint');
  Logger.log(eslint_version, 'Version:');
  */
  var webpack = spawn('webpack', webpack_args, { stdio: 'inherit' });

}


