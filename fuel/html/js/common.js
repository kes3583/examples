$(document).ready(function() {
  const h1Pos = $('h1.t1').offset();
  $(window).scroll(function() {
    if ($(document).scrollTop() > h1Pos.top) {
      //console.log(h1Pos.top)
      //$("header > .txt").fadeToggle("fast");
      $("header > .txt").show();
      //$("header > .txt").animate({opacity: '1'},'fast');
    } else {
      $("header > .txt").hide();
      //$("header > .txt").animate({opacity: '0'});
    }
  });
});
