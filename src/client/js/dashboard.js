// $(document).on('change', 'select', function() {
//   var id = $('select').val();
//   $('.pinned-project-info').hide();
//   $(`div[id*='${id}']`).show();
// });

$(document).ready(function() {
  $('select').change(function() {
    var thingname = $(this).val().split('/')[1];
    console.log(thingname);
    $('.pinned-project-info').fadeOut(100);
    setTimeout(function() {
      $(`#${thingname}`).fadeIn(100)
    }, 100)
  })
})
