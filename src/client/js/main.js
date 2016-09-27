(function () {

  $(document).ready(function () {
    $('.navbar-toggle').on('click', function () {
      $(this).toggleClass('active');
    });
    $('.dropdown-toggle').on('click', function () {
      $(this).toggleClass('active');
    });
  });

})();
