module.exports = function(){

  var plugins = [
    require('autoprefixer-core')({
      browsers: ['IE >= 9', 'last 2 version'],
      cascade: false
    })
  ];

  //all plugins, see loaders/postcss.js, extra query on end of loader
  if(this.query.indexOf('?full') === 0){

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
