$(document).ready(function() {
  $('.edit-project').on('click', function() {
    var thingname = $(this).attr('id');
    console.log(thingname);
    // $('.pinned-project-info').fadeOut(1);
    // setTimeout(function() {
    //   $(`#${thingname}`).fadeIn(1)
    // }, 1)
    $('.pinned-project-info').css('display', 'none');
    $(`.pinned-project-info#${thingname}`).css('display', 'block');
  })

  $('.delete_account').click(function () {
    const username = $('.delete_account span')[0].textContent
    $.ajax({
      method: 'DELETE',
      url: `/${username}`
    })
    .done(() => {
      location.href = '/';
    });
  });
});
