import path from 'path';
import spawnCMD from './spawnCMD';
import checkFile from '../utils/checkFile';
import {title, empty, error} from '../utils/Logger';

import {version} from '../../../package';

const run = () => {

  const modulePath = path.resolve(__dirname, `../../../`);
  const config = path.join(modulePath, `dist/lib/config/webpack.dev.config`);

  const command = `webpack-dev-server --config ${config} --open`;
  spawnCMD(command);

};

export default () => {

  title(version);

  let toCheck = [`index.html`, `css/style.css`, `js/script.js`];
  toCheck = toCheck.map(checkFile);

  Promise.all(toCheck)
    .then(res => res.filter(res => res.found === false))
    .then(res => {
      if(res.length === 0) run();
      else {
        empty();
        res.forEach(({file}) => {
          error(`./src/${file} not found`);
        });
      }
      empty();
    });


};
