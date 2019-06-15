$(function() {
// Quick & dirty toggle to demonstrate modal toggle behavior
  $('.modal-toggle').on('click', function(e) {
    // e.preventDefault();
    //$(window).scroll(function() { return false; });

    $('.modal').toggleClass('is-visible');
    $('body').toggleClass('modal-open');

    // if($(".modal-wrapper").outerHeight() > $(window).height()){
    //   $('body').removeClass('modal-open');
    // }else{
    //   $('body').addClass('modal-open');
    // }
    // document.ontouchmove = function (e) {
    //   e.preventDefault();
    // }
  });
});
