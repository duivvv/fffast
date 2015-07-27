var ArgumentsParser = {

  init: function(args){
    this.args = args.slice(2);
  },

  getByKey: function(key){
    return this.args[this.args.indexOf(key) + 1];
  },

  getById: function(index){
    return this.args[index];
  }

}

module.exports = ArgumentsParser;
