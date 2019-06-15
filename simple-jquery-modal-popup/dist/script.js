$(function() {
// Quick & dirty toggle to demonstrate modal toggle behavior
  $('.modal-toggle').on('click', function(e) {
    e.preventDefault();
    $('.modal').toggleClass('is-visible');
  	$('body').toggleClass('modal-open');
  });
});
