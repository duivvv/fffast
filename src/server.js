var args = process.argv;

var remote_folder = args[args.length-1];
var path = require('path');

var express = require('express');
var app = express();
var compression = require('compression');

require('dotenv').load({
  path: path.join(__dirname, '.env')
});

app.use(express.static(remote_folder));
app.use(compression())

var server = app.listen(process.env.PORT, function(){
  console.log('server running at http://localhost:%s', process.env.PORT);
});
