$(document).ready(function() {
  const h1Pos = $('.title > h1').offset();
  $(window).scroll(function() {
    if ($(document).scrollTop() > h1Pos.top) {
      //console.log(h1Pos.top)
      $("header > .txt").animate({
        opacity: '1'
      });
    } else {
      $("header > .txt").animate({
        opacity: '0'
      });
    }
  });
});
