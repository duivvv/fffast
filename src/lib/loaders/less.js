var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('css!postcss!less')
};
