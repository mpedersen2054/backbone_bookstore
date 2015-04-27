var app = app || {};

app.LibraryView = Backbone.View.extend({
  el: '#books',

  initialize: function( initialBooks ) {
    this.collection = new app.Library( initialBooks );
    this.listenTo( this.collection, 'add', this.renderBook );
    this.render();
  },

  events: {
    'click #add' : 'addBook'
  },

  addBook: function(e) {
    e.preventDefault();
    var $inputs = $('#addBook div').children('input');
    var formData = {};

    $inputs.each(function(i, el) {
      if ( $( el ).val() != '' ) {
        formData[el.id] = $( el ).val();
        $( el ).val(' ');
      }
    })

    $inputs[1].focus();
    this.collection.add( new app.Book(formData) );
  },

  render: function() {
    this.collection.each(function( item ) {
      this.renderBook( item )
    }, this)
  },

  renderBook: function( item ) {
    var bookView = new app.BookView({ model: item });
    this.$el.append( bookView.render().el );
  }
})