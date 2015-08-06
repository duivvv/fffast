var webpack = require('webpack');

var fs = require('fs');
var path = require('path');

var Logger = require('../utils/Logger');

var ArgumentsParser = require('../utils/ArgumentsParser');
ArgumentsParser.init(process.argv);

var paths = require('./paths')(ArgumentsParser.getLoader());

var module_folders = [
  path.join(paths.module_folder, 'node_modules'),
  path.join(paths.remote_folder, 'node_modules')
];

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
  plugins: require('./webpack.plugins')(),
  postcss: function(){
    return require('./postcss.plugins').call(this);
  },
  eslint: {
    configFile: paths.eslintrc
  },
  resolveLoader: {
    root: module_folders
  },
  resolve: {
    modulesDirectories: module_folders,
    extensions: require('./settings').ext
  }
};

config.module.loaders.push(
  require('../loaders/babel')
);

config.module.loaders.push(
  require('../loaders/' + paths.css.loader)
);

try {
  fs.statSync(paths.eslintrc);
  config.module.loaders.push(
    require('../loaders/eslint')
  );
}
catch(err){
  Logger.message('no .eslintrc found, disabled linting\n');
  paths.eslintrc = false;
}

module.exports = config;
