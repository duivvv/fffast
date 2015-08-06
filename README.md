
# FFFAST (1.3.1)

> quick local jsbin alike experimentation folder for CSS and JS (ES6-react-etc)

## Install

```
npm install fffast -g
```

## Commands


```bash

Usage: fffast / create a quick css/js experimentation folder

$ fffast {command}


Commands:

  init|i   copy basic structure into current folder and start fffast

Options:

  -h, --help                         output usage information
  -V, --version                      output the version number
  -p, --port <port>                  server port
  --css <postcss, scss, sass, less>  css style, default is 'postcss' (use on init)
  -m, --min                          minify output, cfr. webpack -p -d --watch

```

### Usage

#### Starting with an empty folder

`fffast init` creates following folders/files:

based on the [template](/template) folder

```
/_js
  script.js

/_css
  (_)reset.[css,scss,sass,less]
  (_)normalize.[css,scss,sass,less]
  (_)mixins.[css,scss,sass,less]
  style.[css,scss,sass,less]

index.html

.editorconfig
.eslintrc

```

You can choose your flavor of css by setting the --css flag to postcss, scss, sass or less


#### Creating your own folder


- **_js/script.js**
- **_css/style.[css,scss,sass,less]**
- **index.html**

are required, the rest is optional

run the `fffast` command in the folder

## Running fffast

1. **fffast** serves this folder (see [Server](#server))
2. Watches for changes in **script.js** and **screen.[css|scss|sass|less]** using [Webpack](https://github.com/webpack/webpack)
3. **Builds** the **JavaScript** (see [JavaScript](#javascript))
4. **Builds** the **CSS** (see [CSS](#css))

### Server

Express serves the folder as a **static directory** on [http://localhost:3000](http://localhost:3000) using [Express](https://github.com/strongloop/express)

You can pass a port via `-p <port>` or `--port <port>`

### JavaScript

#### Babel

[ES6](http://exploringjs.com/) and beyond with [Babel](https://github.com/babel/babel)

- [stage 0](https://babeljs.io/docs/usage/experimental/) features are enabled

#### Linting

if there is a [.eslintrc](http://eslint.org/docs/user-guide/configuring.html), the files are linted using [ESLint](https://github.com/eslint/eslint)

You can use the [.eslintrc](template/base/.eslintrc) file the `fffast init` command copies

- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) linting rules are available

### CSS

`fffast` looks for the following files in this order (and stops when found one)

1. _css/style.**css** (PostCSS)
2. _css/style.**scss** (Sass via .scss syntax)
3. _css/style.**sass** (Sass via .sass syntax)
4. _css/style.**less** (Less)


#### PostCSS

Using [postcss-loader](https://github.com/postcss/postcss-loader)

Following postcss plugins are used:

- [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties)
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-mixins](https://github.com/postcss/postcss-mixins)
- [postcss-nested](https://github.com/postcss/postcss-nested)
- [autoprefixer](https://github.com/postcss/autoprefixer-core) (last 2 versions / IE 9 >)

#### SASS / SCSS

Using [sass-loader](https://github.com/jtangelder/sass-loader)

prefixes added via [postcss-loader](https://github.com/postcss/postcss-loader) and  [autoprefixer](https://github.com/postcss/autoprefixer-core) (last 2 versions / IE 9 >)

#### LESS

Using [less-loader](https://github.com/webpack/less-loader)

prefixes added via [postcss-loader](https://github.com/postcss/postcss-loader) and  [autoprefixer](https://github.com/postcss/autoprefixer-core) (last 2 versions / IE 9 >)

### Extra

#### node_modules

You can install node modules and import them in your JavaScript files, Webpack looks in the local and fffast node_modules folder.
