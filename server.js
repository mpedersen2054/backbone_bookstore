// Module dependencies.
var application_root = __dirname;
var express          = require( 'express' );
var bodyParser       = require('body-parser');
var path             = require( 'path' );
var mongoose         = require( 'mongoose' );

// Database

mongoose.connect( 'mongodb://localhost/library_database' );
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongodb.')
});

var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date
});
var BookModel = mongoose.model( 'Book', Book );


// Config
var app = express();

app.configure( function() {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( application_root, 'site') ) );
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes

app.get('/api', function(req, res) {
  res.send('api is workin!')
});

app.get('/api/books', function(req, res) {
  return BookModel.find(function(err, books) {
    if(err) return console.log(err);
    return res.send(books);
  });
});

app.post('/api/books', function(req, res) {
  console.log(req.body)
  var book = new BookModel({
    title: req.body.title,
    author: req.body.author,
    releaseDate: req.body.releaseDate
  });

  return book.save(function(err) {
    if(err) console.log(err);
    return res.send(book);
  });
});

app.get('/api/books/:id', function(req, res) {
  return BookModel.findById(req.params.id, function(err, book) {
    if(err) console.log(err);
    return res.send(book);
  });
});

app.put('/api/books/:id', function(req, res) {
  console.log('updating book ' + req.body.title);
  return BookModel.findById(req.params.id, function(err, book) {
    book.title = req.body.title;
    book.author = req.body.author;
    book.releaseDate = req.body.releaseDate;

    return book.save(function(err) {
      if(err) console.log(err);
      return res.send(book);
    });
  });
});


var port = 3000;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});