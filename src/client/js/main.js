(function () {

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
      $('.fa-twitter-square').css('color', '#3cf', 'important');
    }
    $('#twitter').on('input', function() {
      if ($('#twitter').val()) {
        $('.fa-twitter-square').css('color', '#3cf', 'important');
      } else {
        $('.fa-twitter-square').css('color', '#6f6f6f', 'important');
      }
    });
    // linkedin styles
    if ($('#linkedin').val()) {
      $('.fa-linkedin-square').css('color', '#0077b5', 'important');
    }
    $('#linkedin').on('input', function() {
      if ($('#linkedin').val()) {
        $('.fa-linkedin-square').css('color', '#0077b5', 'important');
      } else {
        $('.fa-twitter-square').css('color', '#6f6f6f', 'important');
      }
    });
  });

})();
