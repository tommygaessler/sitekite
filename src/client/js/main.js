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

  });

})();
