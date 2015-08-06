var CSSLoaders = require('../config/settings').loaders;

var ArgumentsParser = {

  init: function(args){
    this.args = args.slice(2);
  },

  _parseKey: function(key){

    if(key.length > 1){
      key = '--' + key;
    }else{
      key = '-' + key;
    }

    return key;

  },

  getLoader: function(){
    if(!this.exists('loader')){
      return CSSLoaders[0];
    }
    for(var i = 0;i < CSSLoaders.length;i++){
      if(CSSLoaders[i].name === this.getByKey('loader')){
        return CSSLoaders[i];
      }
    }
    return CSSLoaders[0]
  },

  getByKey: function(key){
    key = this._parseKey(key);
    return this.args[this.args.indexOf(key) + 1];
  },

  arguments: function(){
    return this.args;
  },

  exists: function(key){
    key = this._parseKey(key);
    return this.args.indexOf(key) > -1;
  }

}

module.exports = ArgumentsParser;
