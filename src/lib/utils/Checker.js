var Logger = require('./Logger');

var path = require('path');
var fs = require('fs');

var identifiers = require('../config/settings').identifiers;

var paths = require('../config/paths')();

var Checker = {

  _loaders: require('../config/settings').loaders,

  _handleCheck: function(done, total, error, cb){
    if(done === total){
      if(!error){
        cb(this.loader);
      }else{
        cb(false);
      }
    }
  },

  check: function(ignore, cb){

    var done = 0;
    var total = 3;

    var error = false;

    console.log('\r');

    this._checkCSS((function(loader){
      if(!loader){
        error = true;
        if(!ignore) Logger.error("no valid CSS entry point found, '_css/"
          + identifiers.css + "."
          + '[' + this._loaders.join(',') + ']');
      }else{
        this.loader = loader;
      }
      done ++;
      this._handleCheck.call(this, done, total, error, (function(paths){
        if(!paths){
          if(!ignore){
            this._close();
          }
        }
        return cb(paths);
      }).bind(this));
    }).bind(this));

    this._checkJS((function(found){
      if(!found){
        error = true;
        if(!ignore) Logger.error("no valid JavaScript entry point found,'_js/" + identifiers.js + ".js'");
      }
      done ++;
      this._handleCheck.call(this, done, total, error, (function(paths){
        if(!paths){
          if(!ignore){
            this._close();
          }
        }
        return cb(paths);
      }).bind(this));
    }).bind(this));

    this._checkHTML((function(found){
      if(!found){
        error = true;
        if(!ignore) Logger.error("index.html not found");
      }
      done ++;
      this._handleCheck.call(this, done, total, error, (function(paths){
        if(!paths){
          if(!ignore){
            this._close();
          }
        }
        return cb(paths);
      }).bind(this));
    }).bind(this));


  },

  _checkCSSInstance: function(loader, cb){

    var paths = require('../config/paths')(loader);

    fs.stat(paths.css.src, function(err, data){

      if(data){
        return cb(loader);
      }

      return cb(false);

    });

  },

  _checkCSS: function(cb){

    var checked = 0;
    var loader = '';

    for(var i = 0;i < this._loaders.length;i++){

      this._checkCSSInstance(this._loaders[i], (function(_loader){

        checked ++;

        if(_loader){
          loader = _loader;
        }

        if(checked === this._loaders.length){
          cb(loader);
        }

      }).bind(this));

    }

  },

  _checkJS: function(cb){

    fs.stat(paths.js.src, function(err, data){
      if(data) return cb(true);
      return cb(false);
    });

  },

  _checkHTML: function(cb){

    fs.stat(paths.html, function(err, data){
      if(data) return cb(true);
      return cb(false);
    });

  },

  _close: function(){
    Logger.close('exit fffast');
  }

}

module.exports = Checker;
