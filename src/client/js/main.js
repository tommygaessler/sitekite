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
      $('.fa-twitter-square').css('color', '#1DA1F2');
    }
    $('#twitter').on('input', function() {
      if ($('#twitter').val()) {
        $('.fa-twitter-square').css('color', '#1DA1F2');
      } else {
        $('.fa-twitter-square').css('color', '#6f6f6f');
      }
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
    });

    $('#profile_pic_url').on('input', function() {
      var url = $(this).val();
      $('#preview-image').attr('src', url);
      $('#profile_pic').attr('src', url);
    });

  });

})();
