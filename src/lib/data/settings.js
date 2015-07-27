var path = require('path');
var identifiers = require('./identifiers');

module.exports = function(remote_folder, loader){

  return {
    remote_folder: remote_folder,
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
