<!-- 템플릿 타입 : 쿠폰다운로드 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../inc/Directives.jsp"%>
<%@include file="../../inc/PvParam_planshop.jsp"%>
<c:set var="now" value="<%=new java.util.Date()%>" />
<fmt:formatDate pattern="yyyyMMddHHmmss" value="${now}" var="nowDate"/>   

<c:set var="coupon_cnt" value="0" />
<c:set var="coupon_color" value="" />
<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
<c:choose>
<c:when test="${(rtnShopTemplateList.coupon_type_code eq '10') or (rtnShopTemplateList.coupon_kind_code eq '50')}"><c:set var="coupon_color" value="pink" /></c:when>
<c:when test="${(rtnShopTemplateList.coupon_type_code eq '20') or (rtnShopTemplateList.coupon_kind_code eq '60')}"><c:set var="coupon_color" value="black" /></c:when>
</c:choose>
<c:set var="coupon_cnt" value="${coupon_cnt + 1}" />
<c:if test="${coupon_cnt == 1}">
<div class="coupon_benefit_area planshop_temp_area">
    <div class="couponTemplate_area">
        <div class="coupon_view planshop_content_box">
            <ul class="coupon_contents">
</c:if>
            <%-- data-coupon-type="pink" : 1차쿠폰, 무료배송 쿠폰 --%>
            <%-- data-coupon-type="black" : 2차쿠폰, 장바구니 쿠폰 --%>
	            <li class="coupon_content_box" data-coupon-type="${coupon_color}">
	            	<div class="couponText">
	            	    <div class="coupon_benefit">
                        <c:choose>
                        <c:when test="${rtnShopTemplateList.rate_amt_yn eq 'Y'}"><span>${rtnShopTemplateList.rate_amt_value}%</span> </c:when>
                        <c:when test="${rtnShopTemplateList.rate_amt_yn eq 'N'}"><span><fmt:formatNumber value="${rtnShopTemplateList.rate_amt_value}" pattern="#,###"/></span> </c:when>
                        <c:otherwise></c:otherwise>
                        </c:choose>
                        <c:choose>
                        <c:when test="${rtnShopTemplateList.coupon_type_code eq '10'}">할인쿠폰</c:when>
                        <c:when test="${rtnShopTemplateList.coupon_type_code eq '20'}">중복쿠폰</c:when>
                        <c:when test="${rtnShopTemplateList.coupon_kind_code eq '50'}"><span>무료배송</span></c:when>
                        <c:when test="${rtnShopTemplateList.coupon_kind_code eq '60'}">장바구니</c:when>
                        <c:otherwise></c:otherwise>
                        </c:choose>
                        </div>
                        <div class="coupon_name">${rtnShopTemplateList.cust_coupon_name}</div>
                        <div class="subText">
                        <c:choose>
                        <c:when test="${rtnShopTemplateList.coupon_kind_code eq '50'}">
                        <c:if test="${ not empty rtnShopTemplateList.min_buy_amt}">${akm:toMoneyUnitRecursion(rtnShopTemplateList.min_buy_amt,"")}원 이상 구매 시 사용가능</c:if>
                        </c:when>
                        <c:otherwise>
                        <c:if test="${ not empty rtnShopTemplateList.min_buy_amt}">${akm:toMoneyUnitRecursion(rtnShopTemplateList.min_buy_amt,"")}원 이상 구매 시</c:if>
                        <c:if test="${ not empty rtnShopTemplateList.max_dc_amt}"> 최대 ${akm:toMoneyUnitRecursion(rtnShopTemplateList.max_dc_amt,"")}원</c:if>
                        </c:otherwise>
                        </c:choose>
                        </div>
                        <div class="event_date">
                        <c:choose>
                        <c:when test="${rtnShopTemplateList.dup_prms_yn eq 'Y'}">1일 ${rtnShopTemplateList.day_entry_count}회 다운로드 가능</c:when>
                        <c:when test="${rtnShopTemplateList.dup_prms_yn eq 'N'}">1인 1회 다운로드 가능</c:when>
                        </c:choose>
                        </div>
	            	</div>
	            </li>
            
<c:if test="${rtnShopTemplateList.coupon_num == coupon_cnt}">
			</ul>
            <button type="button" class="coupon_down_btn planshop_area_btn down_icon" onclick="${rtnShopTemplateList.js_function_name}();">
            <p>
            <c:choose>
            <c:when test="${rtnShopTemplateList.coupon_num == 1}"></c:when>
            <c:otherwise>전체</c:otherwise>
            </c:choose>
			쿠폰 다운받기
            </p>
            </button>
            <div class="notice_area">
                <div class="notice_btn" onclick="popOpen(this);">꼭 확인해주세요!</div>
                <div class="layer_pop_notice" style="display:none;">
                    <div class="pop_close_btn" onclick="popClose(this);"><img src="https://www.akmall.com/resource/templates/event/00/event_cl.gif"></div>
                    <ul><%-- 유의사항 영역 --%>
                        <%pageContext.setAttribute("LF", "\n"); %>
                        <c:set var="coupon_cautions" value="${fn:split(rtnShopTemplateList.caution, LF)}"/>
                        <c:forEach var="coupon_caution" items="${coupon_cautions}">
                        	<li>${coupon_caution}</li>
                        </c:forEach>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</c:if>
</c:if>
</c:forEach>