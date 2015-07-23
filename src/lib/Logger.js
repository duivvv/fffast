var chalk = require('chalk');

var Logger = {

  error: function(msg){
    console.log(chalk.red(msg));
  },

  message: function(msg){
    console.log(chalk.yellow.bold(msg));
  },

  log: function(msg, label){
    if(label){
      console.log(label, chalk.bold(msg));
    }else{
      console.log(chalk.bold(msg));
    }
  },

  title: function(version){
    console.log('\r');
    console.log(chalk.white.bgRed.bold(' fffast /', version, ' '), ' \r');
  }

}

module.exports = Logger;
