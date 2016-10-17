import path from 'path';
import {spawn} from 'child_process';

export default cmds => {

  const modulePath = path.resolve(__dirname, `../../../`);

  cmds = cmds.split(` `);
  const command = cmds.slice(0, 1);
  const cmd = `${modulePath}/node_modules/.bin/${command}`;

  cmds.shift();
  const args = cmds;

  return spawn(cmd, args, {stdio: `inherit`});

};
