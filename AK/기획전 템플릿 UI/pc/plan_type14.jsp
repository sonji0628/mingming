<!-- 템플릿 타입 : 네비게이션 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/site/inc/Directives.jsp" %>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Arrays" %>
<%@page import="java.util.List" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="navi_cnt" value="0" />
<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
<c:set var="navi_cnt" value="${navi_cnt + 1}" />
<c:if test="${navi_cnt == 1}">
<div class="navi_area planshop_temp_area">
    <div class="naviTemplate_area" data-itemtype="normal" style="background: ${rtnShopTemplateList.background_color};">
        <div class="navi_wrap">
                <ul class="slider">	
</c:if>
                    <li>
                        <a style="color: ${rtnShopTemplateList.font_color};" href="#navi_id${ rtnShopTemplateList.disp_order }" data-target>
                        ${ rtnShopTemplateList.shop_template_name }
						</a>
                    </li>
<c:if test="${rtnShopTemplateList.navi_num == navi_cnt}">
                </ul>
        </div>
    </div>
</div>
</c:if>
</c:if>
</c:forEach>