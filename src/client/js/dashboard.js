$(document).on('change', 'select', function() {
  var id = $('select').val();
  $('.pinned-project-info').hide();
  $(`div[id*='${id}']`).show();
});

$('.delete_account').click(function () {
    var thespantag = $('.delete_account span')
    console.log(thespantag);
  // $.ajax({
  //   method: DELETE,
  //   url: '/'
  // })
})
