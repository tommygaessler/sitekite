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
  });

})();
