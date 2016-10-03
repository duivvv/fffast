import spawnCMD from './spawnCMD';
import path from 'path';

export default () => {

  const modulePath = path.resolve(__dirname, `../../../`);
  const config = path.join(modulePath, `dist/lib/config/bs-config.js`);

  spawnCMD(`lite-server -c ${config}`);

};
