var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');

var postcss_plugins = [
  require('autoprefixer-core')({
    browsers: ['IE >= 9', 'last 2 version'],
    cascade: false
  }),
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-custom-properties'),
  require('postcss-nested')
];

var settings = {
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          stage: 0
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css!postcss')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/screen.css'),
  ],
  postcss: function(){
    return postcss_plugins;
  },
  externals: {
    'react': 'React'
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc')
  },
  resolveLoader: {
    modulesDirectories: [path.join(__dirname, '../node_modules/')],
  },
  resolve: {
    alias: {
      'babel-core': path.join(__dirname, '../node_modules/babel-core/')
    },
    extensions: ['', '.json', '.js', '.css']
  }
};


module.exports = settings;
