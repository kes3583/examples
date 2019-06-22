'use strict';

$(function() {
  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  if (iOS) {
    $("body").addClass("ios");
  }
  touchEvt($(".backBtn"), true);
  touchEvt($(".rightBtn"), true);


  function touchEvt(obj, delay, evtCancel) { // 터치이벤트
    obj.on("touchstart", function(event) {
      if (!evtCancel) {
        event.stopPropagation()
      }
      $(this).addClass("touch")
    });

    var touchEnd = function() {
      obj.removeClass("touch");
    }
    obj.on("touchend", function(event) {
      if (!evtCancel) {
        event.stopPropagation()
      }

      if (delay) {
        setTimeout(touchEnd, 150);
      } else {
        touchEnd();
      }
    });
  }

  // added by Eunsim Kang 14062019
  //nav title transition
  var h1Pos = $('h1.t1').offset();
  var nav = $("header > .txt");
  $(window).scroll(function() {
    if ($("h1").length) {
      if ($(document).scrollTop() > h1Pos.top) {
        nav.css({
          opacity: 1,
          WebkitTransition: 'opacity 0.3s ease-in-out',
          MozTransition: 'opacity 0.3s ease-in-out',
          MsTransition: 'opacity 0.3s ease-in-out',
          OTransition: 'opacity 0.3s ease-in-out',
          transition: 'opacity 0.3s ease-in-out'
        });
      } else {
        nav.css({
          opacity: 0,
          WebkitTransition: 'opacity 0.3s ease-in-out',
          MozTransition: 'opacity 0.3s ease-in-out',
          MsTransition: 'opacity 0.3s ease-in-out',
          OTransition: 'opacity 0.3s ease-in-out',
          transition: 'opacity 0.3s ease-in-out'
        });
      }
    }else{return;}
  });

  // 최근받은혜택 토글
  //$(".list-recent-benefit").hide();
  // $("#toggle").click(function() {
  //   let _this = $(this);
  //   //e.preventDefault();
  //   // _this.toggleClass("dropup").parent().next().slideToggle("fast");
  //   if(_this.hasClass("dropup")) {
  //        $("#numbers").animate({"height": "200px"}).removeClass("dropup");
  //     } else {
  //       $("#numbers").animate({"height": "100px"}).addClass("toggled");
  //     }
  // });

  //faq
  $('#accordion dt').click(function() {
    let _this = $(this);
    let a = _this.closest('dl');
    let b = $(a).hasClass('open');
    let c = $(a).closest('#accordion').find('.open');

    if (!b) {
      $(c).find('dd').slideUp(300);
      $(c).removeClass('open');
    }

    $(a).toggleClass('open');
    $(a).find('dd').slideToggle(300);
    //addHeight();
  });

  // 전 페이지로 가기
  $(".backBtn").click(function() {
    window.history.back();
  });

  //remove li tag 카드 버리기
  // $("button.btn-trash").click(function(){
  //   $(this).parent().parent().remove();
  // });

});

//api
function _debounce(func, wait, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

//myfunction
function addHeight() {
  const listFaq = $(".list-faq");
  if (listFaq.parent().outerHeight() > $(window).height()) {
    listFaq.addClass("pdb100")
  } else {
    listFaq.removeClass("pdb100")
  }
}

//modal popup
var modal = $(".modal");
var modalWrapper = $(".modal-wrapper");
var modalHeight = modalWrapper.height();
var modalToggle = $(".modal-toggle");

//countdown
function coundDown() {
  console.log('countdown');
  var countdownNumberEl = document.getElementById("countdown-number");
  var countdown = 5;
  countdownNumberEl.textContent = countdown;
  var downloadTimer = setInterval(function() {
    countdown--;// 5 to 0
    countdownNumberEl.textContent = countdown;
    if (countdown > 0) {
      modalToggle.unbind('click',showMConfirmModal)
    }else{
      modalToggle.bind('click',showMConfirmModal)
      clearInterval(downloadTimer);
      modal.removeClass("is-visible");
    }
  }, 1000);
}

//show confirm modal
var showMConfirmModal = function (e) {
  console.log('icon click');
  const modalPosY = $(document).outerHeight() / 2 - modalHeight/2;
  modalWrapper.css("margin-top", modalPosY)
  //fire countedown modal
  if ($("#count-loading").length) {
    e.preventDefault();
    modal.addClass('is-visible');
    coundDown();
  }else{
  //fire confirm modal
  e.preventDefault();
   modal.toggleClass('is-visible');
  }
}

//height100
const docHeight = $(window).outerHeight();
const listFilter = $( ".list-filter" );
var height100 = function (){
  $(".h100").css('height', docHeight);
}

//필터 영역 opacity 1
function detectScroll (){
  //console.log($(window).scrollTop())
  if ($(window).scrollTop() > (docHeight / 2) - 40) {
    listFilter.css('background-color','rgba(240, 240, 240, 1)');
  }else{
    listFilter.css('background-color','rgba(240, 240, 240, 0.8)');
  }
}
function mapView(){
  $(".scrollup").css('display', 'block'); // prevent a full box
  $(".box-scrollup").css('margin-top', docHeight / 2); // centering vertically
  height100() // map height 100%
  $(window).scroll(_debounce(detectScroll, 30));
}

function addClassSelected(event) {
  console.log('.' + event.data.name +' ' + event.data.tag)
  $('.' + event.data.name +' ' + event.data.tag).removeClass('selected');
  $(this).closest(event.data.tag).addClass('selected')
};
