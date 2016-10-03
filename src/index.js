#!/usr/bin/env node

import program from 'commander';
import pkg from '../package';

import {
  build, run,
  setup, serve
} from './lib/commands/';

program
  .version(pkg.version)
  .usage(`/ create and watch a webtech experimentation folder \n\n  $ fffast {command}`);

program
  .command(`init`)
  .alias(`i`)
  .description(`copy basic structure into current folder and start fffast`)
  .action(setup);

program
  .command(`run`)
  .alias(`r`)
  .description(`run fffast in development mode, same as 'fffast'`)
  .action(run);

program
  .command(`build`)
  .alias(`b`)
  .description(`create optimized production (./dist) folder`)
  .action(build);

program
  .command(`serve`)
  .alias(`s`)
  .description(`serve the ./dist folder`)
  .action(serve);

program.parse(process.argv);

if (program.args.length < 1 ) {
  run();
}
