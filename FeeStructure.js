$(document).ready(function () {
      $('#showFeeBtn').click(function () {
        $('#feeSection').slideDown('slow');
      });
      $('#closeFeeBtn').click(function () {
        $('#feeSection').slideUp('slow');
      });
    });