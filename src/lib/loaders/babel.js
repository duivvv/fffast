var path = require('path');

module.exports = function(modulePath, remotePath){

  var arr = ['babel-preset-es2015', 'babel-preset-stage-0', 'babel-preset-react'];
  arr = arr.map(function(preset){
    return path.relative(remotePath, modulePath + '/' + preset);
  });

  return {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: arr
    }
  };

}


