var Logger = require('./Logger');

var path = require('path');
var fs = require('fs');

var identifiers = require('../config/identifiers');

var Checker = {

  _loaders: ['css', 'scss', 'sass', 'less'],

  _handleCheck: function(done, total, error, cb){
    if(done === total){
      if(!error){
        cb(this.loader);
      }else{
        cb(false);
      }
    }
  },

  check: function(remote_folder, ignore, cb){

    this._remote_folder = remote_folder;

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

    var style_path = '/_css/' + identifiers.css + '.' + loader;
    var full_path = path.join(this._remote_folder, style_path);

    fs.stat(full_path, function(err, data){

      if(data){
        return cb(loader);
      }

      return cb(false);

    });

  },

  _checkCSS: function(cb){

    var checked = 0;
    var loader = '';
    var file_obj = false;

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

    var script_path = '/_js/' + identifiers.js + '.js';
    var full_path = path.join(this._remote_folder, script_path);

    fs.stat(full_path, function(err, data){
      if(data) return cb(true);
      return cb(false);
    });

  },

  _checkHTML: function(cb){

    var index_path = '/index.html';
    var full_path = path.join(this._remote_folder, index_path);

    fs.stat(full_path, function(err, data){
      if(data) return cb(true);
      return cb(false);
    });

  },

  _close: function(){
    Logger.close('exit fffast');
  }

}

module.exports = Checker;
