var app = app || {};

app.Book = Backbone.Model.extend({
  idAttribute: '_id',
  
  defaults: {
    coverImage: 'img/placeholder.png',
    title: 'no title provided.',
    author: 'unknown',
    releaseDate: 'unknown',
    keywords: 'none'
  }
})