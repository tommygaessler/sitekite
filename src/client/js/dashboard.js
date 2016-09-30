$(document).ready(function() {

  $('.edit-project').on('click', function() {
    var project = $(this).attr('id');
    $('.project-text').html(`Edit Project`);
    $('.project-button').html('Save Changes');

    $('.new-project').css('display', 'block');

    $('.pinned-project-info').css('display', 'none');

    $(`.pinned-project-info#${project}`).css('display', 'block');

    $('.edit-project-name').focus();
  });

  $('.new-project').on('click', function() {
    $('.project-text').html('Add Project');

    $('.pinned-project-info').css('display', 'none');

    $('.pinned-project-info#manual').css('display', 'block');

    $('#new-project-name').focus();
  });

  $('#info-form').on('submit', function(e) {
    if ($('#bio_desc').val() === undefined) {
      e.preventDefault();
      $('#bio_desc').css({'border-color': 'red', 'box-shadow': '0 0 10px red'});
    }
  });

  $('#bio_desc').on('input', function() {
    $(this).css({'border-color': '#428bca', 'box-shadow': '0 0 10px #428bca'});
  })

  $('.delete-project').click(function() {
    var username = $(this).attr('data-username');
    var projectName = $(this).attr('data-value');
    $.ajax({
      method: 'DELETE',
      url: `/project/${projectName}`
    })
    .done(function() {
      if (location.hash === '#projects-tab') {
        location.reload();
      } else {
        location.href = `/${username}/dashboard/#projects-tab`;
      }
    });
  });

  $('.delete_account').click(function () {
    const username = $('.delete_account').attr('data-name');
    $(this).attr('disabled', 'disabled');
    $(this).html('<i class="fa fa-spinner fa-spin fa-fw" aria-hidden="true"></i>');
    $.ajax({
      method: 'DELETE',
      url: `/${username}`
    })
    .done(() => {
      location.href = '/';
    });
  });

  $('.import-repos').on('click', function() {
    $('i.fa-cloud-download').addClass('fa-spin fa-fw');
    $('#gh-import').attr('disabled', 'disabled');
    var username = $(this).attr('data-user-name');
    $.ajax({
      method: 'POST',
      url: '/importing',
      data: {
        username
      }
    })
    .done(() => {
      if (location.hash === '#projects-tab') {
        location.reload();
      } else {
        location.href = `/${username}/dashboard/#projects-tab`;
      }
    });
  });

  if (location.hash === '#projects-tab') {
    $('#portfolio-tab-li').toggleClass('active');
    $('#projects-tab-li').toggleClass('active');
    $('#portfolio-tab').toggleClass('active');
    $('#projects-tab').toggleClass('active');
  }

});
