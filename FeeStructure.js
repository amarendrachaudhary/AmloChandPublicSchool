$(document).ready(function () {

  /* ── Fee data ────────────────────────────────────────────
     Columns: [Prospectus, Admission, Registration, Board&Misc,
               Annual, Activity(Qtr), Monthly, Lab,
               TotalApril, MonthlyActivity(11mo), TotalYearly]
  ─────────────────────────────────────────────────────── */
  var feeData = {
    'NC':      [500, 2000, 0,    0,    1500, 500, 1100, 0,    5600,  12100, 19200],
    'LKG':     [500, 2000, 0,    0,    1500, 500, 1200, 0,    5700,  13200, 20400],
    'UKG':     [500, 2000, 0,    0,    1500, 500, 1200, 0,    5700,  13200, 20400],
    '1':       [500, 2500, 0,    0,    1800, 500, 1350, 800,  7450,  14850, 23800],
    '2':       [500, 2500, 0,    0,    1800, 500, 1350, 800,  7450,  14850, 23800],
    '3':       [500, 2500, 0,    0,    1800, 500, 1400, 1000, 7700,  15400, 24600],
    '4':       [500, 2500, 0,    0,    1800, 500, 1400, 1000, 7700,  15400, 24600],
    '5':       [500, 2500, 0,    0,    1800, 500, 1450, 1000, 7750,  15950, 25200],
    '6':       [500, 3000, 0,    0,    2500, 600, 1500, 1100, 9200,  16500, 27500],
    '7':       [500, 3000, 0,    0,    2500, 600, 1500, 1100, 9200,  16500, 27500],
    '8':       [500, 3000, 0,    0,    2500, 600, 1550, 1200, 9350,  17050, 28200],
    '9':       [500, 4000, 2000, 2000, 3500, 600, 1950, 2000, 16550, 21450, 39800],
    '10':      [500, 4500, 3000, 0,    3500, 600, 1950, 2000, 16200, 23100, 41100],
    '11 Com':  [500, 6000, 4000, 0,    4000, 600, 2100, 2000, 20050, 26950, 48800],
    '11 Sci':  [500, 6500, 4000, 0,    4000, 600, 2450, 3000, 23650, 28050, 53500],
    '12 Com': [500, 6000, 0,    4000, 4000, 600, 2550, 0,    18650, 28050, 48500],
    '12 Sci': [500, 6500, 0,    5000, 4000, 600, 2650, 3000, 23250, 29150, 53200]
  };

  /* ── Class groups ───────────────────────────────────── */
  var groups = {
    nursery: ['NC', 'LKG', 'UKG'],
    primary:  ['1', '2', '3', '4', '5'],
    middle:   ['6', '7', '8'],
    high:     ['9', '10'],
    senior:   ['11 Com', '11 Sci', '12 Com', '12 Sci']
  };

  var currentClass = 'NC';

  /* ── Helper ─────────────────────────────────────────── */
  function fmt(n) {
    if (n === 0) return '—';
    return '₹' + n.toLocaleString('en-IN');
  }

  /* ── Render class tabs for a group ─────────────────── */
  function renderClassTabs(group) {
    var $tabs = $('#classTabs').empty();
    $.each(groups[group], function (i, cls) {
      var $btn = $('<button>')
        .addClass('btn btn-sm btn-outline-primary class-tab')
        .text(cls)
        .attr('data-class', cls);
      if (i === 0) $btn.addClass('active');
      $tabs.append($btn);
    });
    selectClass(groups[group][0]);
  }

  /* ── Populate table and summary cards ───────────────── */
  function selectClass(cls) {
    currentClass = cls;
    $('.class-tab').removeClass('active');
    $('.class-tab[data-class="' + cls + '"]').addClass('active');

    var d = feeData[cls];
    $('#r-pros').text(fmt(d[0]));
    $('#r-adm').text(fmt(d[1]));
    $('#r-reg').text(fmt(d[2]));
    $('#r-board').text(fmt(d[3]));
    $('#r-annual').text(fmt(d[4]));
    $('#r-activity').text(fmt(d[5]));
    $('#r-monthly').text(fmt(d[6]));
    $('#r-lab').text(fmt(d[7]));
    $('#r-april').text(fmt(d[8]));

    $('#sum-april').text(fmt(d[8]));
    $('#sum-monthly').text(fmt(d[6]));
    $('#sum-yearly').text(fmt(d[10]));
  }

  /* ── Group tab click ────────────────────────────────── */
  $(document).on('click', '.group-tab', function () {
    $('.group-tab').removeClass('active');
    $(this).addClass('active');
    renderClassTabs($(this).data('group'));
  });

  /* ── Class tab click ────────────────────────────────── */
  $(document).on('click', '.class-tab', function () {
    selectClass($(this).data('class'));
  });

  /* ── Init with first group ──────────────────────────── */
  renderClassTabs('nursery');

});
