import spawnCMD from './spawnCMD';

export default () => spawnCMD(`http-server ./dist -p 3000 -o`);
