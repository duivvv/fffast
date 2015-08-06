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
