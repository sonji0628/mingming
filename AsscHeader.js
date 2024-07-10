let headerTag = '';
headerTag = `
<div id="header" class="header">
    <div class="quick_menu_group">
        <div class="area">
            <div>
                <span><a href="#" onclick="AppDownloadPopup();" title="바로가기">앱다운로드</a></span>
                <span><a href="#" title="AK몰 - 백화점을 클릭하다" onclick="addFavorite('https://www.akmall.com/akevent/common/event_favorite.jsp');" rel="sidebar">즐겨찾기</a></span>
            </div>
            <div class="inr">
                <span><a href="#" onclick="loginPop('https://www.akmall.com/mypage/OrderDeliInquiry.do','HD_03_01@0');  return false;" title="바로가기">주문배송조회</a></span>
                <span><a href="https://www.akmall.com/bestseller/FrequentlyOrder.do" onclick="goUrlPath(this.href, '', 'HD_03_05', '0'); return false;" title="바로가기">자주구매</a></span>
                <span><a href="https://www.akmall.com/event/MemberGradeBnftInfoNew.do" onclick="goUrlPath(this.href, '', 'HD_03_02', '0'); return false;" title="바로가기">회원혜택</a></span>
                <span><a href="#" onclick="loginPop('https://www.akmall.com/mypage/CounselContent.do', 'HD_03_03@0'); return false;" title="바로가기">1:1문의</a></span>
                <span><a href="https://www.akmall.com/customer/CustCenterMain.do" onclick="goUrlPath(this.href, '', 'HD_03_04', '0'); return false;" title="바로가기">고객센터</a></span>
            </div>
        </div>
    </div>
    <div class="area">
        <div class="logo">
            <h1>
                <a href="https://www.akmall.com/main/Main.do" onclick="goUrlPath(this.href, '', 'A_00_00', '0'); return false;">
                    <i class="ico ico_logo"><em>AK MALL 백화점을 클릭하다</em></i>
                </a>
            </h1>
        </div>
        <!-- search -->
        <div class="search">
            <div class="area">
                <form id="searchMainForm" name="searchMainForm" method="get" action="https://www.akmall.com/search/Search.do?urlpath=A2_01@0">
                    <input type="hidden" name="startCount" value="0">
                    <input type="hidden" name="sort" value="RECOM_CNT/DESC">
                    <input type="hidden" name="collection" value="goods_ak">
                    <input type="hidden" name="range" value="A">
                    <input type="hidden" name="startDate" value="1970.01.01">
                    <input type="hidden" name="endDate" value="2024.07.10">
                    <input type="hidden" name="searchField" value="ALL">
                    <input type="hidden" name="reQuery">
                    <input type="hidden" name="realQuery" value="">
                    <input type="hidden" name="brand" value="">
                    <input type="hidden" name="benefit" value="">
                    <input type="hidden" name="color" value="">
                    <input type="hidden" name="viewType" value="img_type">
                    <input type="hidden" name="minPrice" value="-1">
                    <input type="hidden" name="maxPrice" value="-1">
                    <input type="hidden" name="minRangePrice" value="-1">
                    <input type="hidden" name="maxRangePrice" value="-1">
                    <input type="hidden" name="categoryDepth" value="1">
                    <input type="hidden" name="categoryId" value="">
                    <input type="hidden" name="viewCount" value="60">
                    <input type="hidden" name="showQuery" value="">
                    <input type="hidden" name="urlpath" value="A_02_00@0">
                    <input type="hidden" id="arkTarget" name="arkTarget" value="common">
                    <input type="hidden" id="searchArk" name="searchArk">
                    <input type="hidden" id="brandName" name="brandName" value="">
                    <input type="hidden" id="attoption" name="attoption" value="">
                    <input type="hidden" id="plaza" name="plaza" value="">
                    <input type="hidden" id="smartpick" name="smartpick" value="">		
                    <input type="hidden" id="priceCheck" name="priceCheck" value="N">		
                    <input type="hidden" id="selectQuery" name="selectQuery" value="">
                    <input type="hidden" id="suggestFlag" name="suggestFlag" value="N">
                    <input type="hidden" id="suggestTempQuery" name="suggestTempQuery" value="">
                    <fieldset>  
                        <legend>통합검색</legend>
                        <input type="text" id="search" name="search" class="search_input" title="검색어 입력" maxlength="100" style="ime-mode:active;" autocomplete="off">								
                        <div class="search_group" id="ark"><div id="ark_down" style="position: absolute; display: block; cursor: pointer; top: 3px; left: 336px;"></div>
                        <div id="ark_up" style="position: absolute; display: none; cursor: pointer; top: 3px; left: 336px;"></div>
                        <button type="button" class="sch_btn" onclick="goSearch();"><i class="ico ico_search"><em>검색</em></i></button>
                    </fieldset>
                </form>
            </div>
        </div>
        <!-- //search -->
        <div class="util_group">
            <!-- 로그인 -->
            <span>
                <a href="#" target="_blank" onclick="loginPop(this.href, '', 'HD_01_01', '0');return false;" title="바로가기">로그인</a>
            </span>
            <!-- 회원가입 -->
            <span>
                <a href="https://www.akmall.com/login/JoinGate.do" onclick="goUrlPath(this.href, '', 'HD_01_03', '0'); return false;" title="바로가기">회원가입</a>
            </span>
            <span>
                <a href="https://www.akmall.com/mypage/MyPlaceMain.do" onclick="loginPop('this.href','', 'HD_01_04', '0'); return false;" title="바로가기">나만의 공간</a>
            </span>				
            <!-- [D] 장바구니 빨간색 타입 red 클래스 추가해주세요 -->
            <span>
                <a href="https://www.akmall.com/order/ShoppingCart.do" onclick="goUrlPath(this.href, '', 'HD_01_05', '0'); return false;" title="바로가기">장바구니<em class="circle_count">0</em></a>
            </span>
        </div>
    </div>
</div>`
document.write(headerTag);