$(document).ready(function() {
  const h1Pos = $('.title > h1').offset();

  $(window).scroll(function() {
    if ($(document).scrollTop() > 87) {
      //console.log(h1Pos.top)
      $("header > .txt").animate({
        opacity: '1'
      });
    }
  });
});
