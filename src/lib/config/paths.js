var path = require('path');
var fs = require('fs');

var identifiers = require('./settings').identifiers;
var CSSLoaders = require('./settings').loaders;

module.exports = function(loader){

  var loader = loader || CSSLoaders[0];

  var module_folder = path.join(__dirname, '../../..');
  var remote_folder = fs.realpathSync('./');
  var template_folder = path.join(module_folder, '/template');

  return {

    remote_folder: remote_folder,
    module_folder: module_folder,
    template_folder: template_folder,

    template : {
      css: path.join(template_folder, '/css/', '_' + loader.name),
      base : path.join(template_folder, '/base/')
    },

    css: {
      remote_folder: path.join(remote_folder, '/_css/'),
      src: path.join(remote_folder, '/_css/' + identifiers.css + '.' + loader.ext),
      dest: path.join(remote_folder, '/css/' + identifiers.css + '.css'),
      loader: loader.name
    },

    js: {
      src: path.join(remote_folder, '/_js/' + identifiers.js + '.js'),
      dest: path.join(remote_folder, '/js/' + identifiers.js + '.js'),
    },

    eslintrc: path.join(remote_folder, '/.eslintrc'),

    html: path.join(remote_folder, '/index.html')

  }

};
