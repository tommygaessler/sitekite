$(document).ready(function () {
  $('.navbar-toggle').on('click', function () {
    $(this).toggleClass('active');
  });
  $('.dropdown-toggle').on('click', function () {
    $(this).toggleClass('active');
  });
  $('.github-signin').on('click', function () {
    $(this).animate({
      width: '72.1406px'
    });
    $(this).html('<i class="fa fa-github fa-spin fa-fw"></i>');
  });
  $('.top-right-login').on('click', function () {
    $('.top-right-login-icon').addClass('fa-spin fa-fw');
    $('.top-right-login-icon').css({padding: 'none', margin: 'none' })
  });
  // twitter styles
  if ($('#twitter').val()) {
    $('.fa-twitter-square').css('color', '#3cf');
  }
  $('#twitter').on('input', function() {
    if ($('#twitter').val()) {
      $('.fa-twitter-square').css('color', '#1DA1F2');
    }
    $('#twitter').on('input', function() {
      if ($('#twitter').val()) {
        $('.fa-twitter-square').css('color', '#1DA1F2');
      } else {
        $('.fa-twitter-square').css('color', '#6f6f6f');
      }
    });
  });
  // linkedin styles
  if ($('#linkedin').val()) {
    $('.fa-linkedin-square').css('color', '#0077b5');
  }
  $('#linkedin').on('input', function() {
    if ($('#linkedin').val()) {
      $('.fa-linkedin-square').css('color', '#0077b5');
    } else {
      $('.fa-linkedin-square').css('color', '#6f6f6f');
    }
    $('#linkedin').on('input', function() {
      if ($('#linkedin').val()) {
        $('.fa-linkedin-square').css('color', '#0077b5');
      } else {
        $('.fa-linkedin-square').css('color', '#6f6f6f');
      }
    });
  });

  $('#profile_pic_url').on('input', function() {
    var url = $(this).val();
    $('#preview-image').attr('src', url);
    $('#profile_pic').attr('src', url);
  });

  $('#sendgrid').on('submit', function(event) {
    event.preventDefault();

    document.getElementById('email_submit').innerHTML = '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>';
    $('#email_submit').addClass('disabled');

    const username = $(this).data('id')

    const data = {
      username: username,
      name: $('#name').val(),
      to_email: $('#to_email').val(),
      from_email: $('#from_email').val(),
      message: $('#to_email').val()
    }

    $.ajax({
      method: 'POST',
      url: `/${username}/contact/send`,
      data: data
    }).done((data) => {
      $('#contact_desc').css('display', 'none');
      $('#sendgrid').css('display', 'none');
      $('#success-message').css('display', 'block');g
      $('#success-message').text(data.message);
    }).fail((error) => {
      $('#fail-message').css('display', 'block');
      $('#fail-message').text('Message was not sent, please try again');
      document.getElementById('email_submit').innerHTML = 'Submit';
      $('#email_submit').removeClass('disabled');
    });
  });

});
