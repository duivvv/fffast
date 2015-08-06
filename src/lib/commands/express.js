var spawn = require('child_process').spawn;
var path = require('path');

function run(settings, program){

  var args = [];

  var server_js = path.join(settings.module_folder, 'src/lib/server.js');
  args.push(server_js);

  //ARGS

  args.push('--static');
  args.push(settings.remote_folder);

  args.push('--port');
  args.push(parseInt(program.port) || 3000);


  return spawn('node', args, { stdio: 'inherit' });

}

module.exports = run;
