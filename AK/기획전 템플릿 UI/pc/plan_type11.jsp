<!-- 템플릿 타입 : 카운트다운타이머 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../inc/Directives.jsp"%>
<%@include file="../../inc/PvParam_planshop.jsp"%>
<c:set var="now" value="<%=new java.util.Date()%>" />
<fmt:formatDate pattern="yyyyMMddHH" value="${now}" var="today"/>
 <!-- 디데이 수기 -->
<link rel="stylesheet" type="text/css" href="/resource/front/css/dDayTemplate.css" />

<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
	<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
	
	<script type="text/javascript">
		document.addEventListener("DOMContentLoaded", function(){
			let nowDate = new Date();
			// 이벤트 기간
			let startDate = new Date("${rtnShopTemplateList.start_date}");
			let endDate = new Date("${rtnShopTemplateList.end_date}");
			
			if(nowDate <= startDate){
				dDayTimer(startDate, endDate, startDate, '행사 시작까지 남은 시간');
				document.querySelector("#dDay_countDown .dDayTT").style.display = "block";
			}else if(nowDate >= startDate && nowDate <= endDate && nowDate.getTime() >= '1000') {
				dDayTimer(startDate, endDate, endDate, 'COUNT DOWN');
			}else if(nowDate >= endDate){
				dDayTimer(startDate, endDate, endDate, 'COUNT DOWN');
			}
		})
	</script>
		<div id="dDay_countDown">
			<div class="textArea"></div>
			<div class="timer">
				<div class="dDayTT timewrap" style="display:none">
					<div class="timetext">D- </div>
					<div class="timetitle"></div>
				</div>
				<div id="dayArea" class="timewrap">
					<div class="timetext"></div>
					<div class="timetitle">DAYS</div>
				</div>
				<div class="colon">:</div>
				<div id="hourArea" class="timewrap">
					<ul class="timetext">
						<li></li>
						<li></li>
					</ul>
					<div class="timetitle">HRS</div>
				</div> 
				<div class="colon">:</div>
				<div id="minArea" class="timewrap">
					<ul class="timetext">
						<li></li>
						<li></li>
					</ul>
					<div class="timetitle">MIN</div>
				</div> 
				<div class="colon">:</div>
				<div id="secArea" class="timewrap">
					<ul class="timetext">
						<li></li>
						<li></li>
					</ul>
						<div class="timetitle">SEC</div>
				</div> 
			</div>
		</div>
	</c:if>
</c:forEach>

<script type="text/javascript" charset="utf-8" src="/resource/front/js/dDayTemplate.js"></script>
<!-- 디데이 영역 끝 -->