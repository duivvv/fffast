var path = require('path');
var fs = require('fs');

var identifiers = require('./identifiers');

module.exports = function(loader){

  var module_folder = path.join(__dirname, '../../..');
  var remote_folder = fs.realpathSync('./');

  return {

    remote_folder: remote_folder,
    module_folder: module_folder,

    template_folder: path.join(module_folder, '/template'),

    css: {
      src: path.join(remote_folder, '/_css/' + identifiers.css + '.' + loader),
      dest: path.join(remote_folder, '/css/' + identifiers.css + '.css'),
      loader: loader
    },

    js: {
      src: path.join(remote_folder, '/_js/' + identifiers.js + '.js'),
      dest: path.join(remote_folder, '/js/' + identifiers.js + '.js'),
    },

    eslintrc: path.join(remote_folder, '/.eslintrc'),

    html: path.join(remote_folder, '/index.html')

  }

};
