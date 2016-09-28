$(document).ready(function() {
  document.getElementById('bio_desc').innerHTML = marked($('#bio_desc').text());
});
