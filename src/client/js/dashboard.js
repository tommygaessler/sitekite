$(document).on('change', 'select', function() {
  var id = $('select').val();
  $('.pinned-project-info').hide();
  $(`div[id*='${id}']`).show();
});
