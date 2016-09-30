# FFFAST

[![npm version](https://badge.fury.io/js/fffast.svg)](https://badge.fury.io/js/fffast)
[![dependencies Status](https://david-dm.org/duivvv/fffast/status.svg)](https://david-dm.org/duivvv/fffast)

> create and watch a webtech experimentation folder

## Install

```
npm install fffast -g
```

## Commands

```bash

Usage: fffast / create and watch a webtech experimentation folder

$ fffast {command}


Commands:

  init|i    copy basic structure into current folder and start fffast
  run|r     run fffast in development mode, same as 'fffast'
  build|b   create optimized production (./dist) folder
  serve|s   serve the ./dist folder

Options:

  -h, --help     output usage information
  -V, --version  output the version number

```

### Usage

#### Starting with an empty folder

`fffast init` creates a ./src folder

based on the [template](/template) folder

```
/js
  script.js

/css
  reset.css
  normalize.css
  style.css

index.html

.editorconfig
.eslintrc

```

#### Creating your own ./src folder


- js/script.js
- css/style.css
- index.html

are required, the rest is optional

run the `fffast` command in the root folder

## Running fffast

`fffast / fffast r / fffast run`

to serve and watch the **./src** folder with [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

## Building a ./dist folder

`fffast b / fffast build`

 creates an optimized **./dist** folder and runs it with [lite-server](https://github.com/johnpapa/lite-server)

 (you can use `fffast s` / `fffast serve` to serve the **./dist** folder)

### JavaScript

#### Babel

[ES6](http://exploringjs.com/) and beyond with [Babel](https://github.com/babel/babel)

- [stage 0](http://babeljs.io/docs/plugins/preset-stage-0/) features are enabled
- [react](http://babeljs.io/docs/plugins/preset-react/)
- [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash)

#### Linting

if there is a [.eslintrc](http://eslint.org/docs/user-guide/configuring.html) file present, the files are linted using [ESLint](https://github.com/eslint/eslint)

You can use the [.eslintrc](template/.eslintrc) file in the [template](/template) folder

- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) linting rules are available

### CSS / PostCSS

Using [postcss-loader](https://github.com/postcss/postcss-loader)

Following postcss plugin is used:

- [postcss-cssnext](https://github.com/MoOx/postcss-cssnext) enables new CSS features


### Extra

#### node modules

You can install node modules and import them in your JavaScript files.
fffast also looks in the local /node_module folder when you import.

(React, React-DOM, React-Router (v4) and Lodash are preinstalled)
