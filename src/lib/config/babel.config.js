import path from 'path';

const base = path.resolve(__dirname, `../../..`, `node_modules`);

export default {
  presets: [
    [`${base}/babel-preset-es2015`, {modules: false, loose: true}],
    `${base}/babel-preset-stage-0`,
    `${base}/babel-preset-react`,
  ],
  plugins: [
    `${base}/babel-plugin-lodash`,
    `${base}/babel-plugin-transform-regenerator`
  ]
};
