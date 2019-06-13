$(function() {
  //nav title transition
  const h1Pos = $('h1.t1').offset();
  const nav = $("header > .txt");
  $(window).scroll(function() {
    if ($(document).scrollTop() > h1Pos.top) {
      nav.css({
        opacity          : 1,
        WebkitTransition : 'opacity 0.3s ease-in-out',
        MozTransition    : 'opacity 0.3s ease-in-out',
        MsTransition     : 'opacity 0.3s ease-in-out',
        OTransition      : 'opacity 0.3s ease-in-out',
        transition       : 'opacity 0.3s ease-in-out'
      });
    } else {
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

  //resizable
  $( "#resizable-2" ).resizable({
               animate: true
            });
});
