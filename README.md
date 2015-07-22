# FFFAST

> quick local jsbin alike experimentation folder for CSS and JS (ES6-react-etc)

## Install

With [npm](http://npmjs.org) do:

    npm install -g fffast

## Usage

`fffast -f <foldername>` 

- creates a folder with following structure

    /_js
      app.js
      
    /_css
      reset.css
      mixins.css
      screen.css

    /js
    /css

    index.html

- serves this folder as static assets (using express on http://localhost:3000)
- watches for changes in _js/app.js and _css/screen.css with [webpack](https://github.com/webpack/webpack)
- builds the javascript with babel and lints the files with eslint (see below)
- builds the css with postcss (see below)


use `ffast` in a folder with the same structure to serve it 
(only **app.js** and **screen.css** are needed, rest of the files are optional)

You can also use it for React experiments (use CDN)
(added React to externals in webpack)

### JS

[ES6](http://exploringjs.com/) with [Babel](https://github.com/babel/babel) + [eslint](https://github.com/eslint/eslint)

### CSS 

[postcss](https://github.com/postcss/postcss) transforms with following plugins

- [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties)
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-mixins](https://github.com/postcss/postcss-mixins)
- [postcss-nested](https://github.com/postcss/postcss-nested)
- [autoprefixer](https://github.com/postcss/autoprefixer-core) (last 2 versions / IE 9 >)

## TODO

- override files (own .eslintrc for example)
- turn off linting
- extra node_modules installation (add folder to modules in webpack.config)
