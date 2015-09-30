var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  test: /\.sass$/,
  loader: ExtractTextPlugin.extract('css!postcss!sass?indentedSyntax&outputStyle=expanded')
};
