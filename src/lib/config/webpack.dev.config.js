import webpack from 'webpack';

import babelc from './babel.config';
import path from 'path';

import fs from 'fs';

let port = 3000;

let publicPath = `/`;

let config = {

  entry: [
    require.resolve(`react-dev-utils/webpackHotDevClient`),
    `./src/js/script.js`,
    `./src/css/style.css`
  ],

  resolveLoader: {
    modules: [
      path.resolve(__dirname, `../../../node_modules`),
      `node_modules`
    ]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, `../../../node_modules`),
      `node_modules`
    ],
    extensions: [`.js`, `.jsx`, `.json`, `.html`, `.css`]
  },

  output: {
    filename: `js/[name].[hash].js`,
    publicPath
  },

  devServer: {
    contentBase: `./src`,
    historyApiFallback: true,
    hot: true,
    port
  },

  devtool: `sourcemap`,

  module: {

    //** LOADERS **//

    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        loaders: `babel`,
        query: babelc
      },
      {
        test: /\.css$/,
        loaders: [
          `style`,
          `css`,
          `postcss`
        ]
      },
      {
        test: /\.html$/,
        loader: `html`
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|mp3|mp4)$/i,
        loader: `url`,
        query: {
          limit: 1000,
          context: `./src`,
          name: `[path][name].[ext]`
        }
      }
    ]


  },

  //** PLUGINS **//

  plugins: [

    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: true,
        postcss: require(`postcss-cssnext`),
        eslint: {
          fix: true
        }
      }
    })

  ]

};

try {
  fs.statSync(`./src/.eslintrc`);
  config.module.rules.push({
    test: /\.(jsx?)$/,
    enforce: `pre`,
    exclude: /node_modules/,
    loaders: `eslint`,
  });
}catch(err) {
  console.log();
}

const {plugins, entry} = require(`webpack-config-htmls`)();
config.entry = [...config.entry, ...entry];
config.plugins = [...config.plugins, ...plugins];

module.exports = config;
