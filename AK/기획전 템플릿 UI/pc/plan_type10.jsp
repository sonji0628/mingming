<!-- 템플릿 타입 : 구매후사은 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../inc/Directives.jsp"%>
<%@include file="../../inc/PvParam_planshop.jsp"%>
<c:set var="now" value="<%=new java.util.Date()%>" />
<fmt:formatDate pattern="yyyyMMddHH" value="${now}" var="today"/>

<c:set var="eventCheck" value="false" />
<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
	<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
		<c:choose>
			<c:when test="${rtnShopTemplateList.design_type eq 'A'}">
				<c:set var="design_type" value="" />
			</c:when>
			<c:when test="${rtnShopTemplateList.design_type eq 'B'}">
				<c:set var="design_type" value="dark" />
			</c:when>
			<c:when test="${rtnShopTemplateList.design_type eq 'C'}">
				<c:set var="design_type" value="other" />
				<c:set var="box_color" value="${rtnShopTemplateList.box_color}" />
				<c:set var="box_font" value="${rtnShopTemplateList.box_font}" />
				<c:set var="button_color" value="${rtnShopTemplateList.button_color}" />
				<c:set var="button_font" value="${rtnShopTemplateList.button_font}" />
			</c:when>
		</c:choose>
		
		<c:set var="use_yn" value="${rtnShopTemplateList.use_yn}" />
		<c:set var="event_start_dt" value="${rtnShopTemplateList.event_start_dt}" />
		<c:set var="event_end_dt" value="${rtnShopTemplateList.event_end_dt}" />
		<c:set var="shop_event_id" value="${rtnShopTemplateList.shop_event_id}" />
		<c:set var="caution" value="${rtnShopTemplateList.caution}" />
		<c:set var="eventCheck" value="true" />
	</c:if>
</c:forEach>

<c:if test="${eventCheck}">
	<div class="payback_area planshop_temp_area">
		<div class="paybackTemplate_area">
			<div class="payback_table ${design_type}">
				<div class="table_title payback_table_grid">
					<div class="item" <c:if test="${design_type eq 'other'}">style="background: ${box_color}; color: ${box_font};"</c:if> >대상금액</div>
					<div class="item" <c:if test="${design_type eq 'other'}">style="background: ${box_color}; color: ${box_font};"</c:if> >혜택</div>
				</div>
				<div class="table_text payback_table_grid">
				<c:set var="qty_sum" value="0" />
				<c:set var="cnt_sum" value="0" />
				<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
					<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
						<c:set var="qty_sum" value="${qty_sum + rtnShopTemplateList.qty}" />
						<c:set var="cnt_sum" value="${cnt_sum + rtnShopTemplateList.cnt}" />
						<div class="item">${akm:toNumFormat(rtnShopTemplateList.limit_amt)}원 이상</div>
						<div class="item payback">${rtnShopTemplateList.ranking_remark}</div>
					</c:if>
				</c:forEach>
				</div>
			</div>
			<c:choose>
				<c:when test="${use_yn eq 'N'}">
					<c:set var="button_name" value="전시여부를 확인해주세요." />
				</c:when>
				<c:when test="${event_start_dt > today}">
					<c:set var="button_name" value="사은행사 준비중 입니다." />
				</c:when>
				<c:when test="${(qty_sum eq cnt_sum) && cnt_sum > 0 && (event_end_dt > today)}">
					<c:set var="button_name" value="선착순 마감 되었습니다." />
				</c:when>
				<c:when test="${event_end_dt < today}">
					<c:set var="button_name" value="종료된 사은행사 입니다." />
				</c:when>
				<c:otherwise>
					<c:set var="button_name" value="신청하러 가기" />
					<c:set var="endEventYn" value="N" />
				</c:otherwise>
			</c:choose>
			<button type="button" class="payback_btn planshop_area_btn go_arrow_icon <c:if test="${endEventYn ne 'N'}"> endevent</c:if>" onclick="location.href='/event/BuyAfterBnftDetail.do?no=${shop_event_id}'"
			<c:if test="${design_type eq 'other'}"> style="background: ${button_color}; color: ${button_font};"</c:if>>
				<p>${button_name}</p>
			</button>
			<div class="notice_area">
				<div class="notice_btn" onclick="popOpen(this);">꼭 확인해주세요!</div>
				<div class="layer_pop_notice" style="display:none;">
					<div class="pop_close_btn" onclick="popClose(this);"><img src="https://www.akmall.com/resource/templates/event/00/event_cl.gif"></div>
					<div class="notice_text">${akm:toHtml(caution)}</div>
				</div>
			</div>
		</div>
	</div>
</c:if>