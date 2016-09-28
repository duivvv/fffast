import path from 'path';
import {serve, clean, spawnCMD} from './';

import {title, empty} from '../utils/logger';
import {version} from '../../../package';

export default () => {

  title(version);
  empty();

  clean();

  const modulePath = path.resolve(__dirname, `../../../`);
  const config = path.join(modulePath, `dist/lib/config/webpack.prod.config`);

  const webpack = spawnCMD(`webpack -p --config ${config}`);
  webpack.on(`exit`, serve);

};
