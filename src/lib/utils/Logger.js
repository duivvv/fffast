import chalk from 'chalk';

export const error = msg => {
  console.log(chalk.red(msg));
};

export const empty = () => {
  console.log(``);
};

export const title = version => {
  console.log(`\r`);
  console.log(chalk.white.bgRed.bold(` fffast ${version}`, ` `), ` \r`);
};
