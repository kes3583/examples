$(document).ready(function() {
  const h1Pos = $('h1.t1').offset();
  const nav = $("header > .txt");
  $(window).scroll(function() {
    if ($(document).scrollTop() > h1Pos.top) {
      //console.log(h1Pos.top)
      //$("header > .txt").fadeToggle("fast");
      //$("header > a.txt").show();
      nav.css({
        opacity          : 1,
        WebkitTransition : 'opacity 0.3s ease-in-out',
        MozTransition    : 'opacity 0.3s ease-in-out',
        MsTransition     : 'opacity 0.3s ease-in-out',
        OTransition      : 'opacity 0.3s ease-in-out',
        transition       : 'opacity 0.3s ease-in-out'
    });
      //$("header > .txt").animate({opacity: '1'},'fast');
    } else {
      //$("header > a.txt").hide();
      //$("header > .txt").animate({opacity: '0'});
      nav.css({
        opacity          : 0,
        WebkitTransition : 'opacity 0.3s ease-in-out',
        MozTransition    : 'opacity 0.3s ease-in-out',
        MsTransition     : 'opacity 0.3s ease-in-out',
        OTransition      : 'opacity 0.3s ease-in-out',
        transition       : 'opacity 0.3s ease-in-out'
    });
    }
  });
});
