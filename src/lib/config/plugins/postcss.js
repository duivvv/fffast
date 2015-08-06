module.exports = function(loader){

  var plugins = [
    require('autoprefixer-core')({
      browsers: ['IE >= 9', 'last 2 version'],
      cascade: false
    })
  ];

  if(loader === 'css'){

    plugins = plugins.concat([
      require('postcss-import')({
        onImport: function(files){
          files.forEach(this.addDependency);
        }.bind(this)
      }),
      require('postcss-mixins'),
      require('postcss-simple-vars'),
      require('postcss-custom-properties'),
      require('postcss-nested')
    ]);

  }

  return plugins;

};
