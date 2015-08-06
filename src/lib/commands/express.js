var spawn = require('child_process').spawn;
var path = require('path');

var settings;

function _args(settings){

  var args = [];

  var server_js = path.join(settings.module_folder, 'src/lib/server.js');
  args.push(server_js);

  //ARGS

  args.push('--static');
  args.push(settings.remote_folder);

  args.push('--port');
  args.push(parseInt(settings.program.port) || 3000);

  return args;

}

function run(settings){

  return spawn('node', _args(settings), { stdio: 'inherit' });

}

module.exports = run;
