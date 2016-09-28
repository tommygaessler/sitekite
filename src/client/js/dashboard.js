$(document).ready(function() {
  $('.edit-project').on('click', function() {
    var thingname = $(this).attr('id');
    $('.pinned-project-info').css('display', 'none');
    $(`.pinned-project-info#${thingname}`).css('display', 'block');
  })

  $('.delete-project').click(function() {
    var projectName = $(this).attr('value')
    $.ajax({
      method: 'DELETE',
      url: `/project/${projectName}`
    })
    .done(function() {
      location.reload();
    })
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
