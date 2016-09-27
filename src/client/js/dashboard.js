
$(document).ready(function() {
  $('select').change(function() {
    var thingname = $(this).val().split('/')[1];
    console.log(thingname);
    $('.pinned-project-info').fadeOut(100);
    setTimeout(function() {
      $(`#${thingname}`).fadeIn(100)
    }, 100)
  })

  $('.delete_account').click(function () {
      var thespantag = $('.delete_account span')
      console.log(thespantag);
    // $.ajax({
    //   method: DELETE,
    //   url: '/'
    // })
  })
})
