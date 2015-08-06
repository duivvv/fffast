var webpack = require('webpack');

var fs = require('fs');
var path = require('path');

var Logger = require('../utils/Logger');

var ArgumentsParser = require('../utils/ArgumentsParser');
ArgumentsParser.init(process.argv);

var paths = require('./paths')(
  ArgumentsParser.getByKey('loader')
);

var module_folders = [
  path.join(paths.module_folder, 'node_modules'),
  path.join(paths.remote_folder, 'node_modules')
];

try {
  fs.statSync(paths.eslintrc);
}
catch(err){
  Logger.message('no .eslintrc found, disabled linting\n');
  paths.eslintrc = false;
}

var config = {
  entry: [
    paths.js.src,
    paths.css.src
  ],
  output: {
    path: path.dirname(paths.js.dest),
    filename: path.basename(paths.js.dest)
  },
  devtool: 'eval',
  module: {
    loaders: []
  },
  plugins: require('./plugins/webpack')(),
  postcss: function(){
    return require('./plugins/postcss')(paths.css.loader);
  },
  eslint: {
    configFile: paths.eslintrc
  },
  resolveLoader: {
    root: module_folders
  },
  resolve: {
    modulesDirectories: module_folders,
    extensions: require('./extensions')
  }
};

config.module.loaders.push(
  require('../loaders/babel')
);

config.module.loaders.push(
  require('../loaders/' + paths.css.loader)
);

if(paths.eslintrc){

  config.module.loaders.push(
    require('../loaders/eslint')
  );

}

module.exports = config;
