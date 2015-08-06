var spawn = require('child_process').spawn;
var path = require('path');

function _args(settings){

  var args = [];

  args.push('--config');
  args.push(
    path.join(settings.module_folder, 'src/lib/config/webpack.config')
  );

  args.push('--loader');
  args.push(settings.css.loader);

  if(settings.program.min || false){
    args.push('-p');
    args.push('-d');
  }

  args.push('--progress');
  args.push('--watch');

  return args;

}

function run(settings){

  return spawn('webpack', _args(settings), { stdio: 'inherit' });

}



module.exports = run;
