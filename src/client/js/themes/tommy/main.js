$(document).ready(function() {

  $('.navbar-toggle').on('click', function () {
    $(this).toggleClass('active');
  });

  $('#sendgrid').on('submit', function(event) {
    event.preventDefault();

    const username = $(this).data('id')

    const data = {
      username: username,
      name: $('#name').val(),
      to_email: $('#to_email').val(),
      from_email: $('#from_email').val(),
      message: $('#message').val()
    }

    $.ajax({
      method: 'POST',
      url: `/${username}/contact/send`,
      data: data
    }).done((data) => {
      console.log(data);
      $('#contact_desc').css('display', 'none');
      $('#sendgrid').css('display', 'none');
      $('#success-message').css('display', 'block');
      $('#success-message').text(data.message);
    }).fail((error) => {
      $('#fail-message').css('display', 'block');
      $('#fail-message').text('Message was not sent, please try again');
    })
  });
});
