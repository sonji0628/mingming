<!-- 템플릿 타입 : 카운트다운타이머 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../inc/Directives.jsp"%>
<c:set var="now" value="<%=new java.util.Date()%>" />
<fmt:formatDate pattern="yyyyMMddHH" value="${now}" var="today"/>

<!-- 디데이 수기 -->
<link rel="stylesheet"  type="text/css" href="../resources/css/dDayTemplate.css" />

<c:forEach items="${rtnShopTemplateList}" var="rtnShopTemplateList" varStatus="status">
	<c:if test="${shop_template_id eq rtnShopTemplateList.shop_template_id}">
		<c:if test="${mainYn eq 'Y'}">
			<script type="text/javascript">
				var nowDate = new Date();
				// 이벤트 기간
				var startDt 	= "${start_date}";
				var endDt		= "${end_date}";
				
				startDate = new Date(startDt);
				endDate = new Date(endDt);
				
				if(nowDate <= startDate){
					dDayTimer(startDate, endDate, startDate, '행사 시작까지 남은 시간');
					document.querySelector("#dDay_countDown .dDayTT").style.display = "block";
				}else if(nowDate >= startDate && nowDate <= endDate && nowDate.getTime() >= '1000') {
					dDayTimer(startDate, endDate, endDate, 'COUNT DOWN');
				}else if(nowDate >= endDate){
					dDayTimer(startDate, endDate, endDate, 'COUNT DOWN');
				}
				Date.prototype.getInterval = function (otherDate) {
				    let interval;
				    let ss = 1000;
				    let mm = ss * 60;
				    let hh = mm * 60;
				    let dd = hh * 24;
	
				    if(this > otherDate)  interval = this.getTime() - otherDate.getTime();
				    else interval = 00000000;
	
				    let s = Math.floor((interval % mm)/ss).toString().padStart(2,"0");
				    let m = Math.floor((interval % hh)/mm).toString().padStart(2,"0");
				    let h = Math.floor((interval % dd)/hh).toString().padStart(2,"0");
				    let d = Math.floor(interval / dd).toString();
	
				    return [d, h, m, s];
				}
	
				function dDayTimer(start, end, day, text){
				    let dayArea = document.querySelector("#dDay_countDown #dayArea > .timetext");
				    let hourArea = document.querySelectorAll("#dDay_countDown #hourArea > .timetext > li");
				    let minArea = document.querySelectorAll("#dDay_countDown #minArea > .timetext > li");
				    let secArea = document.querySelectorAll("#dDay_countDown #secArea > .timetext > li");
				    let textArea = document.querySelector("#dDay_countDown .textArea");
	
				    let now = new Date();
				    let timer;
	
				    function remainingShow(day) {
				        let now = new Date();
				        let remainingDate = day.getInterval(now);
	
				        if (remainingDate == '0,00,00,00') {
				            clearInterval(timer);
				            if(day == start) {
				                dDayTimer(start, end, end, 'COUNT DOWN');
				                document.querySelector("#dDay_countDown .dDayTT").style.display = "none";
				            }
				        }
	
				        dayArea.textContent = remainingDate[0];
	
				        hourArea[0].textContent = remainingDate[1].charAt(0);
				        hourArea[1].textContent = remainingDate[1].charAt(1);
	
				        minArea[0].textContent = remainingDate[2].charAt(0);
				        minArea[1].textContent = remainingDate[2].charAt(1);
	
				        secArea[0].textContent = remainingDate[3].charAt(0);
				        secArea[1].textContent = remainingDate[3].charAt(1);
	
				    }
	
				    timer = setInterval(remainingShow, 1000, day);
				    textArea.textContent = text;
				}
			</script>
		</c:if>
		<c:if test="${empty mainYn}">
			<script type="text/javascript">
				document.addEventListener("DOMContentLoaded", function(){
					var nowDate = new Date();
					// 이벤트 기간
					var startDt 	= "${start_date}";
					var endDt		= "${end_date}";
					
					startDate = new Date(startDt);
					endDate = new Date(endDt);
					
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
		</c:if>
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

<script type="text/javascript" charset="utf-8" src="../resources/js/app/dDayTemplate.js"></script>
<!-- 디데이 영역 끝 -->