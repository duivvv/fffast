var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var paths = require('./paths')();

var ArgumentsParser = require('../utils/ArgumentsParser');
ArgumentsParser.init(process.argv);

function _isMin(){
  return ArgumentsParser.exists('p') && ArgumentsParser.exists('d');
}

var plugins = [

  new ExtractTextPlugin(
    path.relative(
      path.join(paths.js.dest, '..'),
      paths.css.dest
    )
  ),

  new webpack.DefinePlugin({
    'process.env': {NODE_ENV: "'development'"}
  }),

  //new webpack.HotModuleReplacementPlugin(),
  //new webpack.NoErrorsPlugin()

];

module.exports = function(){

  if(_isMin()){
    plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]);
  }

  return plugins;

};
