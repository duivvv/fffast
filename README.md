# FFFAST

> quick local jsbin alike experimentation folder for CSS and JS (ES6-react-etc)

## Install

With [npm](http://npmjs.org) do:

    npm install -g fffast

## Usage

`fffast -i <foldername>` 

creates a folder with following structure:

```
/_js
  app.js
  
/_css
  reset.css
  mixins.css
  screen.css

/js 
/css

index.html
```

or create the same structure 

only 

- **_js/app.js**
- **_css/screen.css**
- **index.html**

are required, the rest is optional

navigate into the folder and use 

`ffast` 

to make **the magic** happen



## The Magic?

1. **fffast** serves this folder as a **static directory** on [http://localhost:3000](http://localhost:3000) using [Express](https://github.com/strongloop/express)
2. watches for changes in **app.js** and **screen.css** using [Webpack](https://github.com/webpack/webpack)
3. **builds** the **JavaScript** with [Babel](https://github.com/babel/babel) and **lints** the files with [ESLint](https://github.com/eslint/eslint) (see below)
4. **builds** the **CSS** with [PostCSS](https://github.com/postcss/postcss) (see below)



You can also use it for [React](https://github.com/facebook/react) experiments (use [cdnjs](https://cdnjs.com/libraries/react/))
(added [React](https://github.com/facebook/react) to [externals](http://webpack.github.io/docs/library-and-externals.html) in [webpack](https://github.com/webpack/webpack))

### JS

[ES6](http://exploringjs.com/) and beyond with [Babel](https://github.com/babel/babel) + [ESLint](https://github.com/eslint/eslint)

(stage 0 is enabled)

### CSS 

[PostCSS](https://github.com/postcss/postcss) transforms with following plugins

- [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties)
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-mixins](https://github.com/postcss/postcss-mixins)
- [postcss-nested](https://github.com/postcss/postcss-nested)
- [autoprefixer](https://github.com/postcss/autoprefixer-core) (last 2 versions / IE 9 >)

## TODO

- override files (own .eslintrc for example)
- turn off linting
- extra node_modules installation (add folder to modules in webpack.config)
