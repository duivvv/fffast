#! /usr/bin/env node

var fs = require('fs');
var path = require('path');

var remote_folder = fs.realpathSync('./');
var module_folder = __dirname;

var spawn = require('child_process').spawn;

var server_js = path.join(module_folder, 'server.js');

var node_args = [];
node_args.push(server_js);
node_args.push(remote_folder);

var webpack_args = [];
webpack_args.push(path.join(remote_folder,'_js','app.js'));
webpack_args.push(path.join(remote_folder,'js','app.js'));
webpack_args.push('--config');
webpack_args.push(path.join(module_folder, 'webpack.config.js'));
webpack_args.push('--watch');

var nodemon = spawn('node', node_args, { stdio: 'inherit' });
var webpack = spawn('webpack', webpack_args, { stdio: 'inherit' });
