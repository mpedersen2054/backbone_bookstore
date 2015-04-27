
var effects = effects || {};

effects.init = function() {
  var $addBookBtn = $('#addBookBtn'),
      $addBookForm = $('#addBook')

  var toggleAddBook = function() {
    $addBookBtn.on('click', function(e) {
      e.preventDefault();
      $addBookForm.slideToggle();
    })
  };

  toggleAddBook();
};