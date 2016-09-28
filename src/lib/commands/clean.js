import {sync as rimraf} from 'rimraf';

export default () => rimraf(`./dist`);
