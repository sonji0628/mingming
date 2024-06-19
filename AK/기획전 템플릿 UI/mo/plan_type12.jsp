<!-- 템플릿 타입 : 상품(끌어오기) -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/site/event/templates/EventTemplates.jsp"%>
<%@include file="../../inc/Directives.jsp"  %>
<c:set var="goods_cnt" value="0" />
<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
	<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
		<c:set var="goods_cnt" value="${goods_cnt + 1}" />
		<c:if test="${goods_cnt == 1}">
			<c:choose>
				<c:when test="${rtnShopTemplateList.upload_div eq '10'}">
					<div class="planshopGoodsDisplayTemplate_area" data-type="imgbanner">
				</c:when>
				<c:when test="${rtnShopTemplateList.upload_div eq '20'}">
					<div class="planshopGoodsDisplayTemplate_area" data-type="textbanner">
				</c:when>
				<c:otherwise>
					<div class="planshopGoodsDisplayTemplate_area" data-type="noneType">
				</c:otherwise>
			</c:choose>
			<div class="planshop_content_box">
					<c:choose>
						<c:when test="${rtnShopTemplateList.upload_div eq '10'}">
							<div class="content_box_title_area">
								<div class="img_banner">
									<a href="/planshop/PlanShopView.do?shop_event_id=${rtnShopTemplateList.content_value}">
										<img src="${rtnShopTemplateList.banner_img_mob}" alt="${rtnShopTemplateList.content_desc}">
									</a>
								</div>
							</div>
						</c:when>
						<c:when test="${rtnShopTemplateList.upload_div eq '20'}">
							<div class="content_box_title_area">
								<div class="text_banner">
									<h2>${rtnShopTemplateList.banner_img_mob}</h2>
									<p>${rtnShopTemplateList.content_desc}</p>
								</div>
							</div>
						</c:when>
						<c:otherwise>
						</c:otherwise>
					</c:choose>
			</c:if>
		</c:if>
	</c:forEach>
	<div class="goods_item_wrap" data-itemtype="swiper">
		<div class="swiper-container">
			<ul class="goods_item_lst swiper-wrapper">
			<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
				<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
					<li class="goods_item swiper-slide">
						<a href="/goods/GoodsDetail.do?goods_id=${rtnShopTemplateList.goods_id}" title="바로가기">
							<div class="img_box img_center">
								<c:choose>
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
							<div class="detail_box">
								<div class="item_title">${rtnShopTemplateList.goods_name}</div>
								<div class="price">
									<c:choose>
                            			<c:when test="${rtnShopTemplateList.dc_rate eq '0' or rtnShopTemplateList.sale_price eq rtnShopTemplateList.final_price}">
                            				<span class="final_price">
                            					<b>${rtnShopTemplateList.final_price}</b>원
                            				</span>
                            			</c:when>
                            			<c:otherwise>
											<span class="real_price through">${rtnShopTemplateList.sale_price}원</span>
											<span class="discount">${rtnShopTemplateList.dc_rate}%</span>
											<span class="final_price">
												<b>${rtnShopTemplateList.final_price}</b>원
											</span>
										</c:otherwise>
                            		</c:choose>
								</div>
							</div>
						</a>
					</li>
					</c:if>
				</c:forEach>
			</ul>
		</div>
	</div>
	<c:set var="planShopCnt" value="0" />
	<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
		<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
			<c:set var="planShopCnt" value="${planShopCnt + 1}" />
			<c:if test="${planShopCnt == 1}">
				<button type="button" class="more" onclick="location.href='/planshop/PlanShopView.do?shop_event_id=${rtnShopTemplateList.content_value}'">더 많은 상품 보기</button>
			</c:if>
		</c:if>
	</c:forEach>
	</div>
</div>