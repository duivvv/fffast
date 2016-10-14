import fs from 'fs-extra';
import path from 'path';

import run from './run';

export default () => {

  const modulePath = path.resolve(__dirname, `../../../`);

  fs.copySync(`${modulePath}/template/src`, `./src`);
  fs.copySync(`${modulePath}/template/config`, `./`);

  run();

};
