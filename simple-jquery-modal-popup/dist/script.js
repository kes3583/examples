$(function() {
// Quick & dirty toggle to demonstrate modal toggle behavior
  $('.modal-toggle').on('click', function(e) {
     e.preventDefault();


    $('.modal').toggleClass('is-visible');
    $('body').toggleClass('modal-open');


    // if($(".modal-wrapper").outerHeight() > $(window).height()){
    //   $('body').removeClass('modal-open');
    // }else{
    //   $('body').addClass('modal-open');
    // }
    document.ontouchmove = function (e) {
      e.preventDefault();
    }
  });
  var $window = $(window),
    $body = $("body"),
    $modal = $(".modal"),
    scrollDistance = 0;

  $modal.on("show.bs.modal", function() {
    scrollDistance = $window.scrollTop();

    $body.css("top", scrollDistance * -1);
  });

  $modal.on("hidden.bs.modal", function() {
    $body.css("top", "");
    $window.scrollTop(scrollDistance);
  });

});
