var chalk = require('chalk');

var Logger = {

  error: function(msg){
    console.log(chalk.red(msg));
  },

  close: function(msg){
    console.log('\n' + chalk.white.bgRed.bold(' ' + msg + ' ') + '\n');
  },

  message: function(msg){
    console.log(chalk.yellow.bold(msg));
  },

  running: function(loader){
    console.log(
      chalk.yellow.bold('running fffast with'),
      chalk.bgWhite.black(' ' + loader + ' ')
    );
  },

  server: function(port){
    console.log(
      chalk.yellow.bold('~~ server running at'),
      chalk.bgWhite.black(' http://localhost:' + port + ' '),
      chalk.yellow.bold('~~')
    );
  },

  log: function(msg, label){
    if(label){
      console.log(label, chalk.bold(msg));
    }else{
      console.log(chalk.bold(msg));
    }
  },

  default: function(option){
    console.log(
      chalk.yellow.bold("'" + option + "' css option not available, using default \n")
    );
  },

  title: function(version){
    console.log('\r');
    console.log(chalk.white.bgRed.bold(' fffast /', version, ' '), ' \r');
  }

}

module.exports = Logger;
