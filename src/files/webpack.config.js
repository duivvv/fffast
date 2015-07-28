var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var spawn = require('child_process').spawn;

var fs = require('fs');
var path = require('path');


var Logger = require('../lib/utils/Logger');

var ArgumentsParser = require('../lib/utils/ArgumentsParser');
ArgumentsParser.init(process.argv);

var remote_folder = path.join(ArgumentsParser.getById(1), '/../..');
var module_folder = path.join(__dirname, '/../..');

console.log(path.join(module_folder, '/node_modules/'));

var settings = require('../lib/data/settings')(
  remote_folder,
  ArgumentsParser.getByKey('--loader')
);

try {
  fs.statSync(settings.eslintrc);
}
catch(err){
  Logger.message('no .eslintrc found, disabled linting\n');
  settings.eslintrc = false;
}


var webpack_settings = {
  devtool: 'eval',
  module: {
    loaders: []
  },
  plugins: [
    new ExtractTextPlugin(
      path.relative(
        path.join(settings.js.dest, '..'),
        settings.css.dest
      )
    ),
  ],
  postcss: function(){

    var postcss_plugins = [
      require('autoprefixer-core')({
        browsers: ['IE >= 9', 'last 2 version'],
        cascade: false
      })
    ];

    if(settings.css.loader === 'css'){

      postcss_plugins = postcss_plugins.concat([
        require('postcss-import'),
        require('postcss-mixins'),
        require('postcss-simple-vars'),
        require('postcss-custom-properties'),
        require('postcss-nested')
      ]);

    }

    return postcss_plugins;

  },
  eslint: {
    configFile: settings.eslintrc
  },
  resolveLoader: {
    modulesDirectories: [
      path.relative(
        path.join(settings.js.dest, '..'),
        __dirname, path.join(module_folder, '/node_modules/')
      ),
      path.relative(
        path.join(settings.js.dest, '..'),
        path.join(remote_folder, '/node_modules/')
      )
    ],
  },
  resolve: {
    alias: {
      'js': settings.js.src,
      'css': settings.css.src
    },
    extensions: [
      '',
      '.json',
      '.js',
      '.css',
      '.jsx',
      '.scss',
      '.sass',
      '.less'
    ]
  }
};

webpack_settings.module.loaders.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    stage: 0
  }
});

var cssLoaders = {

  css: {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('css!postcss')
  },

  scss: {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css!postcss!sass')
  },

  sass: {
    test: /\.sass$/,
    loader: ExtractTextPlugin.extract('css!postcss!sass?indentedSyntax')
  },

  less: {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('css!postcss!less')
  }

};

webpack_settings.module.loaders.push(cssLoaders[settings.css.loader]);

if(settings.eslintrc){
  webpack_settings.module.loaders.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'eslint'
  });
}

console.log(webpack_settings.resolveLoader);

module.exports = webpack_settings;
