<%@page contentType="text/html; charset=utf-8" language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"  %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.util.*, java.text.*"  %>
<%
   String domain = request.getServerName();
   String uk = request.getParameter("uk");
   if(domain.indexOf("stg.tmap.co.kr") > -1){
   	//response.sendRedirect("https://www.tmap.co.kr/app/fuel/benefit_card_list.do?uk="+uk);
   }

   %>
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<script src="/share/js/jquery-1.11.1.min.js"></script>
<script src="/share/js/swiper.min.4.1.0.js"></script>
<script src="/tmap2/m/share/js/TmapApp.js?v=20190222_1"></script>
<link rel="stylesheet" type="text/css" href='/share/css/card.css?v=20190402_1'>
<link rel="stylesheet" type="text/css" href='/share/css/swiper.min.css'>

<c:set var="env"><spring:eval expression="@system['server.env']"/></c:set>
<script type="text/javascript">
   var uagent = navigator.userAgent.toLowerCase(); //유저에이전트 문자열을 얻어 소문자로 변환
   $(document).ready(function(){
   	$("#btnNearBy").click(function(){
   		<c:choose>
   			<c:when test="${env eq 'dev' or env eq 'local'}">
   				window.TmapApp.openBrowser(encodeURIComponent('https://admin-stg.joou.co.kr/tmap/oilList'));
   			</c:when>
   			<c:otherwise>
   				window.TmapApp.openBrowser(encodeURIComponent('https://admin.joou.co.kr/tmap/oilList'));
   			</c:otherwise>
   		</c:choose>
   		/* if(uagent.search("android") > -1){
   			window.TmapApp.openNearBy();
   		}
   		if(uagent.search("iphone") > -1 || uagent.search("ipad") > -1){
   			window.location="tmap://nearby?category=1";
   		} */
   	});
   });

</script>
<body>
   <header>
      <a href="javascript:;" onclick="TmapWebView.closeWebView();" class="backBtn"></a>
      <a href="javascript:;" class="txt">T map 주유할인</a>
      <%-- 이용 안내 버튼 GA --%>
      <a href="#" class="btn_info" onclick="loggingAndRedirect('info', '/tmap2/m/app/fuel/fuel_info.jsp?uk=${param.uk}'); return false;"></a>
   </header>
   <div id="wrap">
      <div class="topPay">
         <div class="discount">
            할인 받은 총 금액
            <span class="date">
               <c:out value="${baseDate}"/>
            </span>
         </div>
         <div class="pay">
            <c:out value="${totalAmt}"/>
            <span class="unit">원</span>
         </div>
      </div>
      <!-- 인증 전 -->
      <c:if test="${flag eq 'S'}">
         <div class="swiperWrap before" data-extension="swiper">
            <div class="swiper-container">
               <div class="swiper-wrapper">
                  <!-- 카드리스트 -->
                  <div class="swiper-slide">
                     <div class="cardArea">
                        <div class="imgCard beforeImg" >
                           <h1><img src="/images/fuel/b_cardLogo.png"></h1>
                           <%-- 카드 등록하기 버튼(삼성) GA --%>
                           <div class="addArea click"  id="cardReg" onclick="loggingAndRedirect('samsungAdd', '');">
                              <span class="btn_add"></span><br>
                              <span class="titTxt">카드 등록하기</span>
                           </div>
                           <div class="refreshArea click">
                              <span class="ico_refresh"></span><br>
                              <span class="titTxt">새로 고침</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <!--// 카드리스트 -->
                  <!-- 카드리스트 -->
                  <div class="swiper-slide">
                     <div class="cardArea">
                        <div class="cardAdd" >
                           카드사 확대 예정
                        </div>
                     </div>
                  </div>
                  <!--// 카드리스트 -->
               </div>
            </div>
         </div>
      </c:if>
      <!--// 인증 전 -->
      <!-- 인증 후 -->
      <c:if test="${flag eq 'R'}">
         <div class="swiperWrap after" data-extension="swiper">
            <div class="swiper-container">
               <div class="swiper-wrapper">
                  <!-- 카드리스트 -->
                  <div class="swiper-slide">
                     <div class="cardArea" >
                        <div class="imgCard afterImg">
                        	<%-- 카드 삭제하기 버튼 GA --%>
                           <span class="btn_fail" onclick="loggingAndRedirect('cardCancel', '');"></span>
                           <h1><img src="/images/fuel/b_cardLogo.png"></h1>
                           <div class="pay">
                              <c:out value="${discountAmt}"/>
                              <span class="unit">원</span>
                              <span class="subTxt">삼성카드 할인 금액</span>
                           </div>
                           <%-- 주유할인내역 버튼 GA --%>
                           <a href="#" class="btnInfo click" onclick="loggingAndRedirect('benefitHistory', '<c:out value="${landingPage}"/>'); return false;">주유할인 내역</a>
                        </div>
                        <!-- 인증 후 새로고침 -->
                        <div class="imgCard beforeImg cert" >
                           <span class="btn_fail click"></span>
                           <h1><img src="/images/fuel/b_cardLogo.png"></h1>
                           <div class="refreshArea click">
                              <span class="ico_refresh"></span><br>
                              <span class="titTxt">새로 고침</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <!--// 카드리스트 -->
                  <!-- 카드리스트 -->
                  <div class="swiper-slide">
                     <div class="cardArea">
                        <div class="cardAdd" >
                                       카드사 확대 예정
                        </div>
                     </div>
                  </div>
                  <!--// 카드리스트 -->
               </div>
            </div>
         </div>
      </c:if>
      <!-- //인증 후 -->
      <p class="img_money"><img src="/images/fuel/img_money.gif"></p>
      <div class="newCard">
         <!-- <span class="bold">등록한 카드로 결제 시 기존 카드사 할인에</span> -->
         <span class="block">이미 주유할인 많이 받고 있어도!<br>T map 추가 할인까지 더 받아보세요.</span>
         <span class="blockL">이미 주유할인 많이 받고 있어도!<br>T map 추가 할인까지 더 받아보세요.</span>
         <div class="bannerB">
            <p class="subTxt">
				리터당 10원~70원 추가 청구 할인 혜택을 <br>제공해드려요.
            </p>
            <p class="subTxtL">
				리터당 10원~70원 추가 청구 할인 혜택을 제공해드려요.
            </p>
            <!-- 인증 전
            <c:if test="${flag eq 'S'}">
               <a href="javascript:void(0);" onclick="TmapApp.openBrowser(encodeURIComponent('https://www.samsungcard.com/personal/card/simple-apply/UHPPCA0224M0.jsp?alncmpC=QKTMAP&cmpid=QKTMAP'))" class="btnNewcard  before click ">삼성카드가 없으세요?</a>
            </c:if> -->
         </div>
         <!-- 인증 후
         <c:if test="${flag eq 'R'}">
            <div class="banner after">
               <a href="javascript:void(0);" id="btnNearBy" class="btnMap">내 주변에 있는<br>
               <span class="bBox bold">T맵 할인 </span>  <span class="blueArrow">주유소 찾아보기</span>
               </a>
            </div>
         </c:if> -->
      </div>
      <ul class="btnList fixed">
         <li class="click">
         	<%-- 제휴 주유소 안내 버튼 GA --%>
            <a href="javascript:void(0);" id="btnNearBy" class="first" onclick="loggingAndRedirect('gasStation', '');">제휴 주유소</a>
            <div class="tooltip"><span>제휴 문의는 여기로!</span></div>
         </li>
         <li class="click" >
         	<%-- 카드 발급 버튼 GA --%>
            <a href="javascript:void(0);" onclick="loggingAndRedirect('cardAdd', ''); TmapApp.openBrowser(encodeURIComponent('https://www.samsungcard.com/personal/card/simple-apply/UHPPCA0224M0.jsp?alncmpC=QKTMAP&cmpid=QKTMAP'))"  class="second">카드발급</a>
         </li>
      </ul>
   </div>
   <!-- 카드취소 팝업 -->
   <div class="dimed">
     <div class="message_pop">
       <h1>삼성카드 삭제</h1>
       <div class="pop_con">
	        카드를 삭제하면 더 이상 해당 카드로<br>
		 T map 주유 할인을 받을 수 없습니다.<br>
		 계속 진행하시겠습니까?
       </div>
       <ul class="btn_list">
        <li class="btn_cancel">취소</li>
        <li id="cardCancel" class="btn_confirm">확인</li>
       </ul>
     </div>
  </div>
  <!-- //카드취소 팝업 -->

   <script>
      $(document).ready(function() {

      	//swipe
      	var myPosition = new Swiper(".swiperWrap .swiper-container", {
      		slidesPerView : 'auto',
      		initialSlide : 0,
      		freeMode : true,
      		allowTouchMove : true,
      		on : {
      			init : function() {
      				$(".swiperWrap .left").hide();
      			}
      		}

      	});
      	//상단 스크롤
      	$(window).scroll(function() {
      		var now = $(window).scrollTop();
      		if (now > 0) {
      			$("header").addClass("hover")
      			$(".topHover").addClass("hover")

      		} else {
      			$("header").removeClass("hover")
      			$(".topHover").removeClass("hover")
      		}
      	});

      	$(".click").on("touchstart",function() {
      		$(".click").removeClass("on");
      		$(this).addClass("on");
      		});
      	$(".click").on("touchend",function() {
      		$(".click").removeClass("on");

      		});
         //새로고침
      	$(".refreshArea").click(function(){
      			location.reload();
      	})
      	$("#cardReg").click(function() {
      		try{
      			TmapApp.sendAdbrix("oil-discount-add-card", false);
      		}catch(e){

      		}
      		TmapApp.openBrowser(encodeURIComponent("<c:out value="${sscdJoinUrl}"/>"));
      		$(".addArea").hide();
      		$(".refreshArea").show()
      	});

         $(".btn_fail").click(function() {
      		$(".dimed").css("display","flex")
      	});
     	$(".btn_cancel").click(function() {
      		$(".dimed").css("display","none")
      	});

      	$(".cert").hide();

      	$("#cardCancel").click(function() {
      		TmapApp.openBrowser(encodeURIComponent("<c:out value="${sscdJoinUrl}"/>"));
      		$(".afterImg").hide();
      		$(".cert").show();
      		$(".refreshArea").show();
      		$(".dimed").hide();
      	});

      })

      if("<c:out value="${param.pageid}"/>" == "info"){
      	history.replaceState("", "", "/app/fuel/benefit_card_list.do?uk=${param.uk}");
      	setTimeout(function(){location.href="/tmap2/m/app/fuel/fuel_info.jsp"} , 2000);
      }

   </script>

   <!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-123520383-1"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'UA-123520383-1');
	</script>
	<script type="text/javascript">
		function loggingAndRedirect(btn_type, link){
			switch(btn_type){
				case "info":
					gtag('event','클릭',{'event_category':'주유할인 Main','event_label':'이용안내'});
					break;
				case "samsungAdd":
					gtag('event','클릭',{'event_category':'주유할인 Main','event_label':'카드등록하기_삼성'})
					break;
				case "cardCancel":
					gtag('event','클릭',{'event_category':'주유할인 Main','event_label':'카드삭제하기'})
					break;
				case "gasStation":
					gtag('event','클릭',{'event_category':'주유할인 Main','event_label':'제휴주유소'})
					break;
				case "cardAdd":
					gtag('event','클릭',{'event_category':'주유할인 Main','event_label':'카드발급'})
					break;
				case "benefitHistory":
					gtag('event','클릭',{'event_category':'주유할인 Main','event_label':'주유할인내역'})
					break;
			}
			if(link != ""){
				setTimeout(function(){
					location.href=link;
				}, 500);
			}
		}

	</script>

   <script>
  		window.onload = function (){
	  		window.onpageshow = function(event){
	  			if ( event.persisted || (window.performance && window.performance.navigation.type == 2)) {
	  			}else {
					var flag = "<c:out value="${flag}"/>"

				   	if (flag == "S"){//미등록
			  	   		setTimeout(function(){
			  	   			location.href="/tmap2/m/app/fuel/fuel_info.jsp?type=S";
			  			}, 500);
				  	}
	  			}
	  		}
  		}

   </script>
</body>
