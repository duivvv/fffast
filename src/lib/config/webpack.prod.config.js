import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
const ExtractCSS = new ExtractTextPlugin(`css/style.css`);

import babelc from './babel.config';

let publicPath = `/`;

let config = {

  entry: [
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
    path: `./dist`,
    filename: `js/[name].[hash].js`,
    publicPath
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
        loader: ExtractCSS.extract([`css?minimize!postcss`])
      },
      {
        test: /\.html$/,
        //loader: ExtractHTML.extract([`html`])
        loaders: [
          `html`
        ]
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

    ExtractCSS,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: `'production'`}
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: false,
        minimize: true,
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

const {plugins} = require(`webpack-config-htmls`)({
  base: `./src`
});
config.plugins = [...config.plugins, ...plugins];

module.exports = config;
