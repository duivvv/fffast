var spawn = require('child_process').spawn;
var path = require('path');

function run(settings, program){

  var args = [];

  args.push('--config');
  args.push(
    path.join(settings.module_folder, 'src/lib/config/webpack.config')
  );

  args.push('--loader');
  args.push(settings.css.loader);

  if(program.min || false){
    args.push('-p');
    args.push('-d');
  }

  args.push('--progress');
  args.push('--watch');

  return spawn('webpack', args, { stdio: 'inherit' });

}



module.exports = run;
