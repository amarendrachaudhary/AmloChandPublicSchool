
$(document).ready(function () {
  $('#admissionBtn').click(function (e) {
    e.preventDefault();
    $('#admissionSection').load('forms/Admission.html', function () {
      $('html, body').animate({
        scrollTop: $('#admissionSection').offset().top
      }, 800);
    });
  });

  // Handle form submission using event delegation
  $(document).on('submit', '#admissionForm', function (e) {
    e.preventDefault();
    $('#formMessage').fadeIn();
    setTimeout(function () {
      $('#formMessage').fadeOut();
      $('#admissionForm')[0].reset();
    }, 3000);
  });
});
