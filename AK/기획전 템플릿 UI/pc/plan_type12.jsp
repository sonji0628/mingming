<!-- 템플릿 타입 : 상품(끌어오기) -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@include file="/WEB-INF/site/inc/Directives.jsp" %>
<c:set var="goods_cnt" value="0" />
<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
<c:set var="goods_cnt" value="${goods_cnt + 1}" />
<c:if test="${goods_cnt == 1}">
<c:choose>
<c:when test="${ rtnShopTemplateList.upload_div eq '10' }">
<div class="planshopGoodsDisplayTemplate_area" data-type="imgbanner">
</c:when>
<c:when test="${ rtnShopTemplateList.upload_div eq '20' }">
<div class="planshopGoodsDisplayTemplate_area" data-type="textbanner">
</c:when>
<c:otherwise>
<div class="planshopGoodsDisplayTemplate_area" data-type="noneType">
</c:otherwise>
</c:choose>
    <div class="planshop_content_box">
	    <c:choose>
	    <c:when test="${ rtnShopTemplateList.upload_div eq '10' }">
	    <div class="content_box_title_area">
            <div class="img_banner">
				<a href="/planshop/PlanShopView.do?shop_event_id=${ rtnShopTemplateList.content_value }">
                	<img src="${ rtnShopTemplateList.banner_img }" alt="${ rtnShopTemplateList.content_desc }">
                </a>
            </div>
        </div>
	    </c:when>
	    <c:when test="${ rtnShopTemplateList.upload_div eq '20' }">
	    <div class="content_box_title_area">
            <div class="text_banner">
                <h2>${ rtnShopTemplateList.banner_img }</h2>
                <p>${ rtnShopTemplateList.content_desc }</p>
            </div>
        </div>
	    </c:when>
	    <c:otherwise>
	    </c:otherwise>
	    </c:choose>
        <div class="area">
            <div class="slider">
</c:if>
			    <div class="item_card">
			        <a onclick="goUrlPath('/goods/GoodsDetail.do?goods_id=${rtnShopTemplateList.goods_id}', '', '${rtnShopTemplateList.goods_id}', '0');" title="바로가기" style="cursor:pointer">
			            <div class="img_box">
						<c:choose>
							<c:when test="${rtnShopTemplateList.goods_kind_code eq '017' or rtnShopTemplateList.goods_kind_code eq '020'}">
								<c:choose>
									<c:when test="${rtnShopTemplateList.extension eq null or rtnShopTemplateList.extension eq ''}">
										<img src="${akm:getImagePath(JspConst.IMGSIZE_400, rtnShopTemplateList.goods_id, '00')}" alt="${rtnShopTemplateList.goods_name}" onerror="noImage(this, '${JspConst.IMGSIZE_400}');" />
									</c:when>
									<c:otherwise>
										<img src="${akm:getImagePath2(JspConst.IMGSIZE_400, rtnShopTemplateList.goods_id, '00', rtnShopTemplateList.extension)}" alt="${rtnShopTemplateList.goods_name}" onerror="noImage(this, '${JspConst.IMGSIZE_400}');" />
									</c:otherwise>
								</c:choose>
							</c:when>
							<c:when test="${rtnShopTemplateList.buy_age_code eq '19'}">
								<img src="/resource/front/images/content/adult.png" alt="${rtnShopTemplateList.goods_name}" onerror="noImage(this, '${JspConst.IMGSIZE_400}');" />
							</c:when>
							<c:when test="${rtnShopTemplateList.extension eq null or rtnShopTemplateList.extension eq ''}">
								<img src="${akm:getImagePath(JspConst.IMGSIZE_400, rtnShopTemplateList.goods_id, rtnShopTemplateList.buy_age_code)}" alt="${rtnShopTemplateList.goods_name}" onerror="noImage(this, '${JspConst.IMGSIZE_400}');" />
							</c:when>
							<c:otherwise>
								<img src="${akm:getImagePath2(JspConst.IMGSIZE_400, rtnShopTemplateList.goods_id, rtnShopTemplateList.buy_age_code, rtnShopTemplateList.extension)}" alt="${rtnShopTemplateList.goods_name}" onerror="noImage(this, '${JspConst.IMGSIZE_400}');" />
							</c:otherwise>
						</c:choose>
			            </div>
			            <span class="title">${rtnShopTemplateList.goods_name}</span>
			            <span class="price">
			            	<c:choose>
			            	<c:when test="${rtnShopTemplateList.dc_rate eq '0' or rtnShopTemplateList.sale_price eq rtnShopTemplateList.final_price}">
			                <b>${rtnShopTemplateList.final_price}</b>원
			            	</c:when>
			            	<c:otherwise>
			                <em class="real_price through">${rtnShopTemplateList.sale_price}원</em>
			                <em class="discount">${rtnShopTemplateList.dc_rate}%</em>
			                <b>${rtnShopTemplateList.final_price}</b>원
			                </c:otherwise>
			                </c:choose>
			            </span>
			        </a>
			    </div>
<c:if test="${rtnShopTemplateList.goods_num == goods_cnt}">
            </div>
            <div class="bg_group">
                <span class="prev"></span>
                <span class="next"></span>
            </div>
        </div>
        <button type="button" class="more" onclick="location.href='/planshop/PlanShopView.do?shop_event_id=${ rtnShopTemplateList.content_value }'">더 많은 상품 보기</button>
    </div>
</div>
</c:if>
</c:if>
</c:forEach>