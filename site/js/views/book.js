var app = app || {};

app.BookView = Backbone.View.extend({
  tagName: 'div',
  className: 'bookContainer',
  events: {
    'click .delete' : 'deleteBook'
  },

  deleteBook: function() {
    this.model.destroy();
    this.remove();
  },

  template: _.template( $('#bookTemplate').html() ),
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  }
})