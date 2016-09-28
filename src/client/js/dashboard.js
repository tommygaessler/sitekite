$(document).ready(function() {
  $('.edit-project').on('click', function() {
    $('.project-text').html('Edit Project');
    var thingname = $(this).attr('id');
    console.log('test');
    $('.new-project').css('display', 'block');
    $('.pinned-project-info').css('display', 'none');
    $(`.pinned-project-info#${thingname}`).css('display', 'block');
  })


  $('.new-project').on('click', function() {
    $('.project-text').html('Add Project');
    $('.pinned-project-info').css('display', 'none');
    $(`.pinned-project-info#manual`).css('display', 'block');
    $(this).css('display', 'none');
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
