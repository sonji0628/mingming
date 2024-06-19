<!-- 템플릿 타입 : 네비게이션 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/site/event/templates/EventTemplates.jsp"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Arrays" %>
<%@page import="java.util.List" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="navi_cnt" value="0" />
<div class="navi_area planshop_temp_area">
	<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
		<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
			<c:set var="navi_cnt" value="${navi_cnt + 1}" />
			<c:if test="${navi_cnt == 1}">
	    		<div class="naviTemplate_area" data-itemtype="normal" style="background: ${rtnShopTemplateList.background_color};">
	    	</c:if>
    	</c:if>
	</c:forEach>
        <div class="navi_wrap">
            <div class="swiper-container">
                <ul class="swiper-wrapper">
					<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
						<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
								 <li class="swiper-slide">
                        			<a style="color: ${rtnShopTemplateList.font_color};" href="#navi_id${rtnShopTemplateList.disp_order}" data-target>
                        				${rtnShopTemplateList.shop_template_name}
                        			</a>
                    			</li>
						</c:if>
					</c:forEach>
				</ul>
            </div>
        </div>
    </div>
</div>