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
    }
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

function addHeight() {
  if ($(".list-faq").parent().outerHeight() > $(window).height()) {
    $(".list-faq").addClass("pdb100")
  } else {
    $(".list-faq").removeClass("pdb100")
  }
}
