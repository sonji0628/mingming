<%--
	시스템 : AK MALL
	메  뉴 : 제휴사용 헤더
	화  면 : 제휴사용 헤더 Sample

	수정이력 :
	1. 이학민    2014.03.03    최초작성
	2. 김정기    2014.05.16    디자인 수정
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="akm" uri="/WEB-INF/tld/akm.tld"%>
<%@ include file="/WEB-INF/front/search/common2/api/WNSearch.jsp"%>

<link rel="stylesheet" type="text/css" href="//www.akmall.com/resource/front/css/common.css" />

<%-- mall host 지정 --%>
<c:set var="mallHost" value="www.akmall.com" />
<c:if test="${siteCode eq 'FDS'}">
	<c:set var="mallHost" value="akfamily.com" />
</c:if>

<%
	int GOODSVIEWCOUNT = 60; //상품 출력건수
	int EVENTBANNERVIEWCOUNT = 4; //관련기획전 출력건수

	String START_DATE = "1970.01.01"; // 기본 시작일

	// 결과 시작 넘버
	int startCount = parseInt(getCheckReqXSS(request, "startCount", "0"), 0); //시작 번호
	String query = getCheckReqXSS(request, "query", ""); //검색어
	String collection = getCheckReqXSS(request, "collection", "goods_ak"); //컬렉션이름
	String rt = getCheckReqXSS(request, "rt", ""); //결과내 재검색 체크필드
	String rt2 = getCheckReqXSS(request, "rt2", ""); //결과내 재검색 체크필드
	String reQuery = getCheckReqXSS(request, "reQuery", ""); //결과내 재검색 체크필드
	String realQuery = getCheckReqXSS(request, "realQuery", ""); //결과내 검색어
	String sort = getCheckReqXSS(request, "sort", "RECOM_CNT/DESC"); //정렬필드
	String range = getCheckReqXSS(request, "range", "A"); //기간관련필드
	String startDate = getCheckReqXSS(request, "startDate", START_DATE); //시작날짜
	String endDate = getCheckReqXSS(request, "endDate", getCurrentDate()); //끝날짜
	String searchField = getCheckReqXSS(request, "searchField", "ALL"); //검색필드
	String brand = getCheckReqXSS(request, "brand", ""); //브랜드
	String benefit = getCheckReqXSS(request, "benefit", ""); //혜택
	String color = getCheckReqXSS(request, "color", ""); //색상
	String viewType = getCheckReqXSS(request, "viewType", "img_type"); //이미지 보기 or 리스트 보기
	int minPrice = parseInt(getCheckReqXSS(request, "minPrice", "-1"), -1); //최소 선택가격
	int maxPrice = parseInt(getCheckReqXSS(request, "maxPrice", "-1"), -1); //최대 선택가격
	int minRangePrice = parseInt(getCheckReqXSS(request, "minRangePrice", "-1"), -1); //최소 검색가격
	int maxRangePrice = parseInt(getCheckReqXSS(request, "maxRangePrice", "-1"), -1); //최대 검색가격
	int categoryDepth = parseInt(getCheckReqXSS(request, "categoryDepth", "1"), 1); //카테고리 현재 depth
	String categoryId = getCheckReqXSS(request, "categoryId", ""); //카테고리 id (1depth id;2depth id; 3depth id)
	int viewCount = parseInt(getCheckReqXSS(request, "viewCount", "60"), GOODSVIEWCOUNT); //출력건수
	String showQuery = getCheckReqXSS(request, "showQuery", ""); //화면에 보여질 최종검색어
	Long siteId = (Long) pageContext.findAttribute("siteId");
	String arkTarget = "common";
	String brandName = getCheckReqXSS(request, "brandName", "");				//브랜드명
	String selectQuery = getCheckReqXSS(request,"selectQuery","");				//검색어select_fillter노출용
	String attoption = getCheckReqXSS(request,"attoption","");				//가변속성값
	String plaza = getCheckReqXSS(request,"plaza","");						//매장
	String smartpick = getCheckReqXSS(request,"smartpick","");				//앤픽
	String priceCheck = getCheckReqXSS(request,"priceCheck","N");				//가격체크유무

	if (siteId == 2) {
		arkTarget = "fds";
	}
%>
<link rel="shortcut icon" type="image/x-icon" href="/resource/front/image/akfavicon2.ico"/>

<!-- google analytics -->
<script>
	<!--
	<c:if test="${Config.SERVER_GUBUN eq 'OPER'}">
	var gaUAkey = "<c:if test="${siteCode eq 'AKM'}">UA-68448330-2</c:if><c:if test="${siteCode eq 'FDS'}">UA-68448330-3</c:if>";
	var gaUAkeyAll = "<c:if test="${siteCode eq 'AKM'}">UA-68448330-4</c:if>";
	</c:if>
	<c:if test="${Config.SERVER_GUBUN ne 'OPER'}">
	var gaUAkey = "<c:if test="${siteCode eq 'AKM'}">UA-68448330-5</c:if><c:if test="${siteCode eq 'FDS'}">UA-68448330-8</c:if>";
	var gaUAkeyAll = "<c:if test="${siteCode eq 'AKM'}">UA-68448330-7</c:if>";
	</c:if>
	
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	if(typeof(ga) != 'undefined') {
	<c:if test="${not akm:hasLogin(pageContext)}">
		ga('create', gaUAkey, 'auto');
		if(gaUAkeyAll != '') ga('create', gaUAkeyAll, 'auto', 'akAll');
	</c:if>
	<c:if test="${akm:hasLogin(pageContext)}">
	    ga('create', gaUAkey, 'auto', {
			userId : '${akm:CryptEnc(userInfo.custNo)}'
		});
	    
	    if(gaUAkeyAll != '') {
	    	ga('create', gaUAkeyAll, 'auto', 'akAll', {
				userId : '${akm:CryptEnc(userInfo.custNo)}'
			});
	    }
	</c:if>
		ga('send', 'pageview');
		ga(function() {
			if(typeof(ga.getByName('akAll')) != 'undefined') ga('akAll.send', 'pageview'); 
		});
	}
	//-->
</script>

<c:if test="${siteCode eq 'AKM' and Config.SERVER_GUBUN eq 'OPER'}">
<!-- LiveLog TrankingCheck Script Start -->
<script>
/* var LLscriptPlugIn = new function () { this.load = function(eSRC,fnc) { var script = document.createElement('script'); script.type = 'text/javascript'; script.charset = 'utf-8'; script.onreadystatechange= function () { if((!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') && fnc!=undefined && fnc!='' ) { eval(fnc); }; }; script.onload = function() { if(fnc!=undefined && fnc!='') { eval(fnc); }; }; script.src= eSRC; document.getElementsByTagName('head')[0].appendChild(script); }; }; LoadURL = "MTgIMAgwCDE4CDcIMQg"; LLscriptPlugIn.load('//livelog.co.kr/js/plugShow.php?'+LoadURL, 'sg_check.playstart()'); */
</script>
<!-- LiveLog TrankingCheck Script End -->
</c:if>

<script type="text/javascript" src="//www.akmall.com/resource/common/js/jquery-migrate-1.1.0.js"></script>
<script type="text/javascript" src="//www.akmall.com/resource/front/js/beta.fix.js"></script>
<script type="text/javascript" src="//www.akmall.com/resource/front/js/ark3.2.js"></script>
<script type="text/javascript" src="//www.akmall.com/resource/front/js/search3.2.js"></script>
<script type="text/javascript" src="//www.akmall.com/resource/common/js/common.js"></script>


<script type="text/javascript">
	<!--
	var loc = window.document.location.href;
	if(loc.indexOf("hanatour")>-1) {
		$('#header h1').css('padding', '0')
		$('#header').css({'width': '100%', 'margin':'0', 'text-align':'initial'});
		$('#header .all_menu').css({'width':'219px', 'display':'block', 'background':'none', 'border-bottom':'none'});
		$('#header .all_menu li, #header .all_menu li a').css({'height': 'auto'});
	}
	//-->
	
	var searchWord = "";
	function loginPop(goUrl,area_code){
		gaHandler(area_code);
		goUrl = goUrl+"?urlpath="+area_code;
		openWindowPopup('/login/pLogin.do?goUrl='+goUrl+'', 'loginPop', 442, 706, 'center');
		openWindowPopup.opener = self;

		return;
	}
	$(document).ready(function(){			
		$("#search").click(function(){
			if(searchWord=="") {
				searchWord = $("#search").val();
			}							
			
			if(searchWord == $("#search").val()) {
				$("#search").val("");
			}
							
		});	
		
		$("#search").blur(function(){
			if($("#search").val() == "" ){
				$("#search").val(searchWord);								
			}
			
		});
				 				
	});		
	
	function goSearch() {						
		var searchItemId = "${searchWordMap.item_id}";
		var searchItemTypeDiv = "${searchWordMap.item_type_div}";
		var searchWord = "${searchWordMap.search_word}";
		var contLocCode = "${searchWordMap.cont_loc_code}";
		
		if( (searchItemId != undefined || searchItemId != "") && document.searchMainForm.search.value == searchWord){	
			try{ document.searchMainForm.method = "POST"; }catch(e){}
			
			if( searchItemTypeDiv == "SHOP"){
				document.searchMainForm.action = "/planshop/PlanShopView.do?shop_event_id=" + searchItemId + "&urlPath="+contLocCode;
			}else if( searchItemTypeDiv == "EVENT"){
				document.searchMainForm.action = "/event/EventDetail.do?no=" + searchItemId + "&urlPath="+contLocCode;
			}else if( searchItemTypeDiv == "GOODS"){
				document.searchMainForm.action = "/goods/GoodsDetail.do?goods_id=" + searchItemId + "&urlPath="+contLocCode;
			}else if( searchItemTypeDiv == "LINK"){
				document.searchMainForm.action = searchItemId + "&urlPath="+contLocCode;
			}
		}
		document.searchMainForm.onsubmit();
	}
	
	// 샵프론트로 이동
	function goShopFrontHeader(ctg, dispDivCode, areaCode) {				
		var action = "";
		if( dispDivCode == "10" || dispDivCode == "20"){
			action = "${akm:makeFullUrl('http://${mallHost}/display/ShopFront.do')}?ctgId=" + ctg;
		}else{
			action = "${akm:makeFullUrl('https://${mallHost}/main/Main.do')}";
		}
		
		action = addUrlPath(action, '', areaCode, ctg);
		
		document.frmHeader.action = action;
		document.frmHeader.ctgId.value = ctg;		
		document.frmHeader.submit();
	}

	// 이벤트 상세
	function goEventView(no) {
		document.frmHeader.no.value = no;
		document.frmHeader.action = "https://${mallHost}/event/EventDetail.do?no=" + no;
		document.frmHeader.submit();
	}

	// 기획전 상세
	function goShopView(shop_event_id) {
		document.frmHeader.shop_event_id.value = shop_event_id;
		document.frmHeader.action = "https://${mallHost}/planshop/PlanShopView.do?shop_event_id=" + shop_event_id;
		document.frmHeader.submit();
	}
	
	// [공통] 카테고리 이동 (args[0]:ctgId, args[1]:areaCode)
	function goCtg() {

		var ctgId = arguments[0].trim();
		if (arguments.length < 1 || ctgId == 0 || ctgId == "")
			return false;
		
		location.href = "https://${mallHost}/display/ShopFront.do?ctgId="+ctgId;
	}
	
	$(function() {		
		// 중복 검색 방지 플래그
		var searchBtnClickFlag = false;
		
		// 검색창의 검색버튼 클릭 시 적용
		$(".sch_btn").click(function(){			
			if($("#search").val() == "") {
				alert("검색어를 입력해 주시기 바랍니다.");
				return;
			} else {
				if (searchBtnClickFlag) {
					return;
				}
				searchBtnClickFlag = true;
				
				if(typeof(ga) != 'undefined') {
					ga('send', 'event', '/A_/', 'A_02_00', '/A_02_00/');
					ga('send', 'event', '/Search/', 'search', '검색_'+$("#search").val());
				}
				
				doSearchMain();
			}
		});
		
		// 검색창에서 엔터 입력시 적용
		$("#search").keypress(function(){
			if(pressCheckMain(event)) {
				$("#searchMainForm").attr("onsubmit","return false;");
				
				if($("#search").val() == "") {
					if($("#searchArk").val() == "") {
						alert("검색어를 입력해 주시기 바랍니다.");
						return false;
					} else {
						if($("#searchArk").val().indexOf("arkEvent") != -1) {
							goShopEvent($("#searchArk").val().replace("arkEvent",""));
						} else {
							$(location).attr("href",$("#searchArk").val());
						}
						return false;
					}
				}
				
				if (searchBtnClickFlag) {
					return;
				}
				searchBtnClickFlag = true;
				
				if(typeof(ga) != 'undefined') {
					ga('send', 'event', '/A_/', 'A_02_00', '/A_02_00/');
					ga('send', 'event', '/Search/', 'search', '검색_'+$("#search").val());
				}
				
				doSearchMain();
			}
		});
		
		// 인기검색어
		//getPopKeyword();
		// 내가 찾은 검색어 보기
		//showKeyword('${siteId}');
		
	});
	
	// 앱다운로드
	function AppDownloadPopup() {
		openWindowPopup('${SERVER_SSL}/event/openPopupJsp.do?returnUrl=/popup/pAppDownload&urlpath=A_03_03', 'AppDownload_Popup', '550', '350', 'center');	
	}
	
	// 로그인 팝업
	function openLoginPopup(url) {
		var curUrl = (location.href).replace(/&/gi, "^");
		var loginUrl = url + "?goUrl=" + curUrl;
		openWindowPopup(loginUrl, 'loginPop', 442, 706, 'center');
	}
	
	// // 전체 카테고리
	// $(".all_menu > a").on('click',function() {
	// 	$(this).parent().toggleClass("on");
	// });

	// //전체 카테고리 메뉴
	// $(".all_menu > .area > ul > li").on('mouseenter keyup',function() {
	// 	$(this).siblings().removeClass("on");
	// 	$(this).addClass("on");
	// });

	// // 전체메뉴 카테고리
	// $(".all_menu").on('mouseleave',function() {
	// 	$(".all_menu").removeClass("on");
	// });

	// // 상단 메뉴 더보기
	// $(".gnb > .area li.more button").on('click',function() {
	// 	$(this).parent().toggleClass("on");
	// });
	
	// if($('.wrap .gnb .menu_tab').size() > 7 ) {
	// 	var moreMenu = $('.wrap .gnb .menu_tab:gt(6)')
	// 	$('#menu_tab_more_ul').append(moreMenu);
	// }
	// $('#menu_tab_more').css('display', $('#menu_tab_more_ul').children('.menu_tab').size()>0 ? 'block' : 'none');
	
	
</script>

<script type="text/javascript">
	// FDS 로고 위치 설정
	function fdsLogo(obj) {
		var mgt = $('img.fds_logo').height() / 2;
		$('img.fds_logo').css('margin-top', -(mgt));
	}
</script>
<!-- Parameter 전송용 Form -->
<form id="frmHeader" name="frmHeader" method="post">
	<input type="hidden" name="ctgId" id="ctgId" value="" />
	<input type="hidden" name="no" id="no" value="" />
	<input type="hidden" name="shop_event_id" id="shop_event_id" value="" />
</form>
	
	
	
	
	
	
	
	
	
<div id="header" class="header" style="margin-bottom:30px;">

	<div class="quick_menu_group">
		<div class="area">
			<div>
				<c:if test="${siteCode eq 'AKM' || (siteCode eq 'FDS' && mobile_comp_yn eq 'Y')}">
				<span><a href="#" onclick="AppDownloadPopup();" title="바로가기">앱다운로드</a></span>
				</c:if>
				<c:if test="${siteCode eq 'AKM'}">
				<span><a href="#" title="AK몰 - 백화점을 클릭하다" onclick="addFavorite('${JspConst.FAVORITE_URL}');" rel="sidebar">즐겨찾기</a></span>
				</c:if>
			</div>
			<div class="inr">
		<c:choose>
			<c:when test="${akm:hasLogin(pageContext)}">
				<span><a href="https://${mallHost}/login/pLogin.do?goUrl=http://${mallHost}/mypage/OrderDeliInquiry.do" target="_blank" onclick="openWindowPopup(this.href, 'loginPop', 442, 706, 'center');return false;">주문배송조회</a></span>
				<span><a href="https://${mallHost}/event/MemberGradeBnftInfoNew.do" onclick="goUrlPath(this.href, '', 'HD_03_02', '0'); return false;" title="바로가기">회원혜택</a></span>
				<span><a href="https://${mallHost}/mypage/CounselContent.do" onclick="goUrlPath(this.href, '', 'HD_03_03', '0'); return false;" title="바로가기">1:1문의</a></span>
				<span><a href="https://${mallHost}/customer/CustCenterMain.do" onclick="goUrlPath(this.href, '', 'HD_03_04', '0'); return false;" title="바로가기">고객센터</a></span>
			</c:when>
			<c:otherwise>
				<span><a href="https://${mallHost}/mypage/OrderDeliInquiry.do" onclick="goUrlPath(this.href, '', 'HD_03_01@', '0'); return false;" title="바로가기">주문배송조회</a></span>
				<c:if test="${siteCode eq 'AKM' or ( siteCode eq 'FDS' and userInfo.custCompGroupCode ne '4')}">
				<span><a href="https://${mallHost}/event/MemberGradeBnftInfoNew.do" onclick="goUrlPath(this.href, '', 'HD_03_02', '0'); return false;" title="바로가기">회원혜택</a></span>
				</c:if>
				<span><a href="https://${mallHost}/mypage/CounselContent.do" onclick="goUrlPath(this.href, '', 'HD_03_03', '0'); return false;" title="바로가기">1:1문의</a></span>
				<span><a href="https://${mallHost}/customer/CustCenterMain.do" onclick="goUrlPath(this.href, '', 'HD_03_04', '0'); return false;" title="바로가기">고객센터</a></span>
			</c:otherwise>
		</c:choose>
			</div>
		</div>
	</div>
	<div class="area">
		<div class="logo">
			<h1>
				<a href="https://${mallHost}/main/Main.do" onclick="goUrlPath(this.href, '', 'A_00_00', '0'); return false;">
					<i class="ico ico_logo"><em>AK MALL 백화점을 클릭하다</em></i>
				</a>
			</h1>
		</div>
		<!-- search -->
		<div class="search">
			<div class="area">
				<form id="searchMainForm" name="searchMainForm" method="get" action="http://${mallHost}/search/Search.do?urlpath=A2_01@0" accept-charset="UTF-8">
					<input type="hidden" name="startCount" value="0" />
					<input type="hidden" name="sort" value="<%=sort%>" />
					<input type="hidden" name="collection" value="<%=collection%>" />
					<input type="hidden" name="range" value="<%=range%>" />
					<input type="hidden" name="startDate" value="<%=startDate%>" />
					<input type="hidden" name="endDate" value="<%=endDate%>" />
					<input type="hidden" name="searchField" value="<%=searchField%>" />
					<input type="hidden" name="reQuery" />
					<input type="hidden" name="realQuery" value="<%=realQuery%>" />
					<input type="hidden" name="brand" value="<%=brand%>" />
					<input type="hidden" name="benefit" value="<%=benefit%>" />
					<input type="hidden" name="color" value="<%=color%>" />
					<input type="hidden" name="viewType" value="<%=viewType%>" />
					<input type="hidden" name="minPrice" value="<%=minPrice%>" />
					<input type="hidden" name="maxPrice" value="<%=maxPrice%>" />
					<input type="hidden" name="minRangePrice" value="<%=minRangePrice%>" />
					<input type="hidden" name="maxRangePrice" value="<%=maxRangePrice%>" />
					<input type="hidden" name="categoryDepth" value="<%=categoryDepth%>" />
					<input type="hidden" name="categoryId" value="<%=categoryId%>" />
					<input type="hidden" name="viewCount" value="<%=viewCount%>" />
					<input type="hidden" name="showQuery" value="<%=showQuery%>" />
					<input type="hidden" name="urlpath" value="A_02_00@0" />
					<input type="hidden" id="arkTarget" name="arkTarget" value="<%=arkTarget%>" />
					<input type="hidden" id="searchArk" name="searchArk" />
					<input type="hidden" id="brandName" name="brandName" value="<%=brandName%>" />
					<input type="hidden" id="attoption" name="attoption" value="<%=attoption%>" />
					<input type="hidden" id="plaza" name="plaza" value="<%=plaza%>" />
					<input type="hidden" id="smartpick" name="smartpick" value="<%=smartpick%>" />		
					<input type="hidden" id="priceCheck" name="priceCheck" value="<%=priceCheck%>" />		
					<input type="hidden" id="selectQuery" name="selectQuery" value="<%=selectQuery%>" />
					
					<fieldset>  
						<legend>통합검색</legend>
							
						<input type="text" id="search" name="search" value="${searchTextWrap.event_name_1}" 
							class="search_input" title="검색어 입력" 
							maxlength="100" style="ime-mode:active;" />								
						<div class="search_group" id="ark">
						</div>

						
						<!-- 검색어 입력전 -->
						<div id="mykeyword" class="my_search_group sch_auto">
							<p class="blind">인기 검색어 &amp; 최근 검색어</p>
							<div class="area">
								<div class="hot_search_list" id="popkeyword">
								</div>
								<div class="my_search_list" id="searchkeyword">
								</div>
							</div>
							<div class="close">
								<a href="#" class="search_close">닫기<i class="ico ico_search_close_gray"><em>닫기</em></i></a>
							</div>
						</div>
						<button type="button" class="close"><i class="ico ico_search_close"><em>닫기</em></i></button>
						<button type="button" class="sch_btn" onclick="goSearch();"><i class="ico ico_search"><em>검색</em></i></button>
					</fieldset>
				</form>
			</div>
		</div>
		<!-- //search -->
		<div class="util_group">
		<c:choose>
			<c:when test="${akm:hasLogin(pageContext)}">
				<!-- 로그아웃  -->
				<c:if test="${custCompId ne JspConst.COMP_FDS_LGCNS and custCompId ne JspConst.COMP_FDS_EXANADU and custCompId ne JspConst.COMP_FDS_DREAM_MOBILE and custCompId ne JspConst.COMP_FDS_THEK}">
					<span><a href="http://${mallHost}/login/Logout.do" onclick="goUrlPath(this.href, '', 'HD_01_02', '0'); return false;" title="바로가기">로그아웃</a></span>
				</c:if>
				<span><a href="http://${mallHost}/mypage/MyPlaceMain.do" onclick="goUrlPath(this.href, '', 'HD_01_04', '0'); return false;" title="바로가기">나만의 공간</a></span>
			</c:when>
			<c:otherwise>
				<!-- 로그인 -->
				<c:if test="${custCompId ne JspConst.COMP_FDS_EXANADU and custCompId ne JspConst.COMP_FDS_SKPLANET}">
					<span><a href="http://${mallHost}/login/pLogin.do" target="_blank" onclick="openLoginPopup(this.href); return false;">로그인</a></span>
				</c:if>
				<!-- 회원가입 -->
				<c:choose>
					<c:when test="${siteCode eq 'FDS'}">
						<%-- 이제너두, SKMNC(베네피아) 회원가입 비노출 , 알리안츠 비노출 박밀이주임 요청--%>
						<c:if test="${custCompId ne JspConst.COMP_FDS_EXANADU and custCompId ne JspConst.COMP_FDS_SKPLANET and custCompId ne JspConst.COMP_FDS_ALLIANZ}">
							<span><a href="http://${mallHost}/login/LoginFDS.do" onclick="goUrlPath(this.href, '', 'HD_01_03', '0'); return false;" title="바로가기">회원가입</a></span>
						</c:if>
					</c:when>
					<c:otherwise>
						<span><a href="http://www.akmembers.com/home/member/joinform.jsp?assc_comp_id=${userInfo.channelId}" target="_blank">회원가입</a></span>
					</c:otherwise>
				</c:choose>
				<span><a href="http://${mallHost}/mypage/MyPlaceMain.do" onclick="goUrlPath(this.href, '', 'HD_01_04', '0'); return false;" title="바로가기">나만의 공간</a></span>				
			</c:otherwise>
		</c:choose>
		
		<c:if test="${akm:hasLogin(pageContext)}">
			<span><a href="http://${mallHost}/mypage/MyBelongingGoods.do" onclick="goUrlPath(this.href, '', 'HD_01_06', '0'); return false;" title="바로가기">라이크잇</a></span>
		</c:if>
		<!-- [D] 장바구니 빨간색 타입 red 클래스 추가해주세요 -->
		<span>
			<a href="http://${mallHost}/order/ShoppingCart.do" onclick="goUrlPath(this.href, '', 'HD_01_05', '0'); return false;" title="바로가기">장바구니<em class="${myCount.cart_cnt > 0 ? 'circle_count red' : 'circle_count'}">${myCount.cart_cnt}</em></a>
		</span>
		</div>
	</div>
	
	<div class="gnb">
		<div class="area">
			<ul>
				<!-- [D] 전체메뉴 열림 닫힘 구분 클래스 on -->
				<li id="menu_tab_all" class="all_menu">
					<a href="#" title="바로가기">전체 카테고리<i class="ico ico_menu"><em>열기</em></i></a>
					<div class="area">
						<ul>    
							<li>
								<a href="#">화장품</a>
								<!-- [D] depth_menu 타입별 정리
									advertisement : 광고
									size_mideum : 여행/문구/취미 메뉴처럼 기본보다 좀더 큰 사이즈
									thumbnail_box : 스페셜샵 이미지형
								 -->
								<div class="depth_menu">
									<div>
										<p>화장품</p>
										<ul>
											<li><a href="#" onclick="goCtg('55', 'HD_06_01'); return false;" title="바로가기">화장품/향수</a></li>
											<li><a href="#" onclick="goCtg('258614', 'HD_06_01'); return false;" title="바로가기">헤어바디/미용기기</a></li>
										</ul>
										<ul>    
											<li><a href="#" onclick="goCtg('10', 'HD_06_01'); return false;" title="바로가기">백화점 명품화장품</a></li>
										</ul>
										<ul>    
											<li><a href="http://${mallHost}/special/ChanelMain.do" title="바로가기">샤넬</a></li>
											<li><a href="http://${mallHost}/special/MacMain.do" title="바로가기">MAC</a></li>
										</ul>
									</div>
								</div>
							</li>
							<li>
								<a href="#">패션의류</a>
								<div class="depth_menu">    
									<p>패션의류</p>
									<ul>
										<li><a href="#" onclick="goCtg('42', 'HD_06_02'); return false;" title="바로가기">여성의류</a></li>
										<li><a href="#" onclick="goCtg('53', 'HD_06_02'); return false;" title="바로가기">트랜드패션</a></li>
										<li><a href="#" onclick="goCtg('41', 'HD_06_02'); return false;" title="바로가기">언더웨어</a></li>
										<li><a href="#" onclick="goCtg('29', 'HD_06_02'); return false;" title="바로가기">남성의류</a></li>
										<li><a href="#" onclick="goCtg('45', 'HD_06_02'); return false;" title="바로가기">유니섹스 캐주얼</a></li>
									</ul>
									<ul>    
										<li><a href="#" onclick="goCtg('19', 'HD_06_02'); return false;" title="바로가기">백화점 여성의류</a></li>
										<li><a href="#" onclick="goCtg('13', 'HD_06_02'); return false;" title="바로가기">백화점 언더웨어</a></li>
										<li><a href="#" onclick="goCtg('9', 'HD_06_02'); return false;" title="바로가기">백화점 남성의류</a></li>
										<li><a href="#" onclick="goCtg('16', 'HD_06_02'); return false;" title="바로가기">백화점 진유니섹스</a></li>
									</ul>
									<ul>    
										<li><a href="http://${mallHost}/special/RalphlaurenMain.do" title="바로가기">폴로랄프로렌</a></li>
										<li><a href="#" onclick="goCtg('261029', 'HD_06_02'); return false;" title="바로가기">DKNY</a></li>
										<li><a href="#" onclick="goCtg('261051', 'HD_06_02'); return false;" title="바로가기">캘빈클라인</a></li>
									</ul>
								</div>
							</li>
							<li>
								<a href="#">잡화/슈즈/명품</a>
								<div class="depth_menu">    
									<p>잡화/슈즈/명품</p>
									<ul>
										<li><a href="#" onclick="goCtg('54', 'HD_06_03'); return false;" title="바로가기">패션잡화</a></li>
										<li><a href="#" onclick="goCtg('36', 'HD_06_03'); return false;" title="바로가기">슈즈/스니커즈</a></li>
										<li><a href="#" onclick="goCtg('201400', 'HD_06_03'); return false;" title="바로가기">해외명품</a></li>
										<li><a href="#" onclick="goCtg('38', 'HD_06_03'); return false;" title="바로가기">시계/주얼리</a></li>
									</ul>
									<ul>
										<li><a href="#" onclick="goCtg('17', 'HD_06_03'); return false;" title="바로가기">백화점 패션잡화</a></li>
										<li><a href="#" onclick="goCtg('8', 'HD_06_03'); return false;" title="바로가기">백화점 슈즈</a></li>
									</ul>
								</div>
							</li>
							<li>
								<a href="#">유아동</a>
								<div class="depth_menu">    
									<p>유아동</p>
									<ul>
										<li><a href="#" onclick="goCtg('47', 'HD_06_04'); return false;" title="바로가기">유아동 용품</a></li>
										<li><a href="#" onclick="goCtg('46', 'HD_06_04'); return false;" title="바로가기">유아동 완구/도서</a></li>
										<li><a href="#" onclick="goCtg('48', 'HD_06_04'); return false;" title="바로가기">유아동 의류/잡화</a></li>
									</ul>
									<ul>    
										<li><a href="#" onclick="goCtg('15', 'HD_06_04'); return false;" title="바로가기">백화점 아동/유아</a></li>
									</ul>
									
								</div>
							</li>
							<li>
								<a href="#">스포츠/레져</a>
								<div class="depth_menu">    
									<p>스포츠/레져</p>
									<ul>
										<li><a href="#" onclick="goCtg('37', 'HD_06_05'); return false;" title="바로가기">스포츠패션/수영/스키</a></li>
										<li><a href="#" onclick="goCtg('30', 'HD_06_05'); return false;" title="바로가기">등산/자전거/골프/헬스</a></li>
									</ul>
									<ul>    
										<li><a href="#" onclick="goCtg('11', 'HD_06_05'); return false;" title="바로가기">백화점 스포츠/레져</a></li>
									</ul>
								</div>
							</li>
							<li>
								<a href="#">식품/주방</a>
								<div class="depth_menu">    
									<p>식품/주방</p>
									<ul>
										<li><a href="#" onclick="goCtg('39', 'HD_06_06'); return false;" title="바로가기">신선/가공식품</a></li>
										<li><a href="#" onclick="goCtg('27', 'HD_06_06'); return false;" title="바로가기">건강/다이어트식품</a></li>
										<li><a href="#" onclick="goCtg('33', 'HD_06_06'); return false;" title="바로가기">분류/기져귀/물티슈</a></li>
										<li><a href="#" onclick="goCtg('49', 'HD_06_06'); return false;" title="바로가기">주방/식기</a></li>
									</ul>
									<ul>    
										<li><a href="#" onclick="goCtg('12', 'HD_06_06'); return false;" title="바로가기">백화점 식품관</a></li>
										<li><a href="#" onclick="goCtg('18', 'HD_06_06'); return false;" title="바로가기">백화점 홈/리빙</a></li>
									</ul>
								</div>
							</li>
							<li>
								<a href="#">가구/생활</a>
								<div class="depth_menu">    
									<p>가구/생활</p>
									<ul>
										<li><a href="#" onclick="goCtg('51', 'HD_06_07'); return false;" title="바로가기">거실/침실/주방가구</a></li>
										<li><a href="#" onclick="goCtg('40', 'HD_06_07'); return false;" title="바로가기">아동/학생/서재가구</a></li>
										<li><a href="#" onclick="goCtg('50', 'HD_06_07'); return false;" title="바로가기">침구/인테리어</a></li>
										<li><a href="#" onclick="goCtg('35', 'HD_06_07'); return false;" title="바로가기">생활/수납/욕실/세제</a></li>
										<li><a href="#" onclick="goCtg('242383', 'HD_06_07'); return false;" title="바로가기">건강/실버/렌탈</a></li>
									</ul>
									<ul>    
										<li><a href="#" onclick="goCtg('18', 'HD_06_07'); return false;" title="바로가기">백화점 홈/리빙</a></li>
									</ul>
								</div>
							</li>
							<li>
								<a href="#">가전/디지털/키덜트</a>
								<div class="depth_menu">    
									<p>가전/디지털/키덜트</p>
									<ul>
										<li><a href="#" onclick="goCtg('44', 'HD_06_08'); return false;" title="바로가기">대형/계절가전</a></li>
										<li><a href="#" onclick="goCtg('28', 'HD_06_08'); return false;" title="바로가기">생활/주방/이미용가전</a></li>
										<li><a href="#" onclick="goCtg('31', 'HD_06_08'); return false;" title="바로가기">디카/키덜트/자동차</a></li>
										<li><a href="#" onclick="goCtg('56', 'HD_06_08'); return false;" title="바로가기">디지털/음향/휴대폰</a></li>
										<li><a href="#" onclick="goCtg('52', 'HD_06_08'); return false;" title="바로가기">PC/저장장치/OA기기</a></li>
									</ul>
									<ul>    
										<li><a href="#" onclick="goCtg('18', 'HD_06_08'); return false;" title="바로가기">백화점 홈/리빙</a></li>
									</ul>
								</div>
							</li>
							<li>
								<a href="#">여행/취미/문구/서비스</a>
								<div class="depth_menu size_mideum">
								<p>여행/취미/문구/서비스</p>
									<ul>
									<c:if test="${custCompId != 25415}">
										<li><a href="#" onclick="goCtg('34', 'HD_06_09'); return false;" title="바로가기">상품권/E쿠폰/서비스</a></li>
									</c:if>
										<li><a href="#" onclick="goCtg('43', 'HD_06_09'); return false;" title="바로가기">꽃/이벤트/악기/문구</a></li>
										<li><a href="#" onclick="goCtg('255301', 'HD_06_09'); return false;" title="바로가기">반려/애완용품</a></li>
									<c:if test="${custCompId != 25415}">
										<li><a href="#" onclick="goCtg('203097', 'HD_06_09'); return false;" title="바로가기">여행/허니문/숙박</a></li>
									</c:if>
									</ul>
									<ul>    
						        		<c:choose>
							                <c:when test="${siteCode eq 'AKM'}">
												<li><a href="http://hanatour.akmall.com" onclick="goUrlPath(this.href, '', 'HD_06_09', '0'); return false;">하나투어</a></li>
							                </c:when>
							                <c:otherwise>
												<li><a href="http://hanatour.akfamily.com" onclick="goUrlPath(this.href, '', 'HD_06_09', '0'); return false;">하나투어</a></li>
							                </c:otherwise>
						                </c:choose>
									</ul>
								</div>
							</li>
							<li>
								<a onclick="goCtg('267552', 'HD_06_10'); return false;">해외직구</a>
							</li>
							<li class="link">
								<a href="#" class="color-blue">AK플라자 백화점</a>
								<div class="depth_menu">
									<p>AK플라자 <a href="http://${mallHost}/akplaza/AKPlazaMain.do" onclick="goUrlPath(this.href, '', 'HD_06_11', '1'); return false;">바로가기 ><i class="ico ico_arr_rgt"></i></a></p>
									<ul>
										<li><a href="#" onclick="goCtg('10', 'HD_06_11'); return false;" title="바로가기">명품화장품</a></li>
										<li><a href="#" onclick="goCtg('19', 'HD_06_11'); return false;" title="바로가기">백화점 여성의류</a></li>
										<li><a href="#" onclick="goCtg('13', 'HD_06_11'); return false;" title="바로가기">백화점 언더웨어</a></li>
										<li><a href="#" onclick="goCtg('16', 'HD_06_11'); return false;" title="바로가기">백화점 진/유니섹스</a></li>
										<li><a href="#" onclick="goCtg('9', 'HD_06_11'); return false;" title="바로가기">백화점 남성의류</a></li>
										<li><a href="#" onclick="goCtg('17', 'HD_06_11'); return false;" title="바로가기">백화점 패션잡화</a></li>
										<li><a href="#" onclick="goCtg('8', 'HD_06_11'); return false;" title="바로가기">백화점 슈즈</a></li>
										<li><a href="#" onclick="goCtg('11', 'HD_06_11'); return false;" title="바로가기">백화점 스포츠/레져</a></li>
										<li><a href="#" onclick="goCtg('15', 'HD_06_11'); return false;" title="바로가기">백화점 아동/유아</a></li>
										<li><a href="#" onclick="goCtg('18', 'HD_06_11'); return false;" title="바로가기">백화점 홈/리빙/가전</a></li>
										<li><a href="#" onclick="goCtg('12', 'HD_06_11'); return false;" title="바로가기">백화점 식품관</a></li>
									</ul>
								</div>
							</li>
							<li class="link">
								<a href="#" class="color-blue">스페셜샵</a>
								<div class="depth_menu thumbnail_box">
									<p>스페셜샵</p>
									<ul>
										<li>
											<a href="http://${mallHost}special/BeautyMain.do" onclick="goUrlPath(this.href, '', 'lnbsp_01', ''); return false;" class="lnb_sp">
												<img alt="" src="http://m.akmall.com/resource/templates/ui/m_special_ppeum.jpg">
												<span>쁨(뷰티전문관)</span>
											</a>
										</li>
										<li>
											<a href="#" onclick="goCtg('267552', 'lnbsp_01'); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_261597.jpg" alt="">
												<span>해외직구</span>
											</a>
										</li>
										<li>
											<a href="#" onclick="goCtg('255301', 'lnbsp_01'); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_pet.jpg" alt="">
												<span>펫샵</span>
											</a>
										</li>
										<li>
											<a href="#" onclick="goCtg('243865', 'lnbsp_01'); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_243865.jpg" alt="">
												<span>애경</span>
											</a>
										</li>
										<li>
											<a href="#" onclick="goCtg('200202', 'lnbsp_01'); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_200202.jpg" alt="">
												<span>샤넬</span>
											</a>
										</li>
										<li>
											<a href="#" onclick="goCtg('252124', 'lnbsp_01'); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_252124.jpg" alt="">
												<span>MAC</span>
											</a>
										</li>
										<li>
											<a href="/special/TagOnBeautyMain.do" onclick="goUrlPath(this.href, '', 'lnbsp_01', ''); return false;" class="lnb_sp">
												<img alt="" src="http://m.akmall.com/resource/templates/ui/m_special_tob.jpg">
												<span>SNS핫뷰티</span>
											</a>
										</li>
										<li>
											<a href="#" onclick="goCtg('258121', 'lnbsp_01'); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_258121.jpg" alt="">
												<span>랄프로렌</span>
											</a>
										</li>
										
								<c:choose>
									<c:when test="${siteCode eq 'AKM'}">
										<li>
											<a href="http://nike.akmall.com" onclick="goUrlPath(this.href, '', 'lnbsp_01', ''); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_261650.jpg" alt="">
												<span>나이키</span>
											</a>
										</li>
											<li>
											<a href="http://www.akmall.com/adidas" onclick="goUrlPath(this.href, '', 'lnbsp_01', ''); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_adi.jpg" alt="">
												<span>아디다스</span>
											</a>
										</li>									
										<li>
											<a href="http://coach.akmall.com/main" onclick="goUrlPath(this.href, '', 'lnbsp_01', ''); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_coach.jpg" alt="">
												<span>코치</span>
											</a>
										</li>
										<li>
											<a href="http://${mallHost}/special/longchamp.do" onclick="goUrlPath(this.href, '', 'lnbsp_01', ''); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_longchamp.jpg" alt="">
												<span>롱샴</span>
											</a>
										</li>
									</c:when>
									<c:otherwise>	
										<li>
											<a href="#" onclick="goCtg('230805'); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_coach.jpg" alt="">
												<span>코치</span>
											</a>
										</li>
									</c:otherwise>
								</c:choose>										
	
										<li>
											<a href="#" onclick="goCtg('268278', 'lnbsp_01'); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_mk.jpg" alt="">
												<span>마이클코어스</span>
											</a>
										</li>
											<li>
											<a href="#" onclick="goCtg('269177', 'lnbsp_01'); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_269177.jpg" alt="">
												<span>브룩브라더스</span>
											</a>
										</li>
										<li>
											<a href="#" onclick="goCtg('265826', 'lnbsp_01'); return false;" class="lnb_sp">
												<img src="http://m.akmall.com/resource/templates/ui/m_special_265826.jpg" alt="">
												<span>애플</span>
											</a>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</li>
				<%@include file="../templates/include/header_tab_menu.jsp"%>
			</ul>
		</div>
	</div>
</div>