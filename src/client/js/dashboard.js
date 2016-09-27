
$(document).ready(function() {
  $('select').change(function() {
    var thingname = $(this).val();
    console.log(thingname);
    $('.pinned-project-info').fadeOut(100);
    setTimeout(function() {
      $(`#${thingname}`).fadeIn(100)
    }, 100)
  })

  $('.delete_account').click(function () {
  const username = $('.delete_account span')[0].textContent
    $.ajax({
      method: 'DELETE',
      url: `/${username}`
    })
    .done(() => {
      location.href = '/';
    })
  })
})
