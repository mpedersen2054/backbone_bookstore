// Module dependencies.
 
var express    = require( 'express' );
var bodyParser = require('body-parser');
var path       = require( 'path' );
var logger     = require('morgan');
var mongoose   = require( 'mongoose' );

var root = __dirname;

//Create server
var app = express();

//Where to serve static content
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, 'site')));

//Start server
var port = process.env.PORT || 3000;

app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});