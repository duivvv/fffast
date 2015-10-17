module.exports = function(){

  var plugins = [];

  //all plugins, see loaders/postcss.js, extra query on end of loader
  if(this.query.indexOf('?full') === 0){

    plugins = [
      require('postcss-import')({
        onImport: function(files){
          files.forEach(this.addDependency);
        }.bind(this)
      }),
      require('postcss-mixins'),
      require('postcss-nested'),
      require('postcss-will-change'),
      require('postcss-cssnext')({
        browsers: ['IE >= 10', 'last 2 version'],
        features: {
          autoprefixer: {
            cascase: false
          }
        }
      })
    ];

  }else{

    plugins = [
      require('postcss-will-change'),
      require('postcss-cssnext')({
        browsers: ['IE >= 10', 'last 2 version'],
        features: {
          autoprefixer: {
            cascase: false
          }
        }
      })
    ];

  }

  return plugins;

};
