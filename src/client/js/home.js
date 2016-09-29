$(document).ready(function() {
  if (document.getElementById('bio_desc')) {
    document.getElementById('bio_desc').innerHTML = marked($('#bio_desc').text());
  }
});
