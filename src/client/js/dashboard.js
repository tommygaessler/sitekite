$(document).ready(function() {
  $('select').change(function() {
    var thingname = $(this).val();
    $('.pinned-project-info').fadeOut(1);
    setTimeout(function() {
      $(`#${thingname}`).fadeIn(1)
    }, 1)
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
