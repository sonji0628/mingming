/*****************************************************************************

국민은행 시재관리기 셀프키오스크
- 달력 포함된 조회 필터

***********************************************************************************/
"use strict";
for (var i = 0; i < cmArr.length; i++) {
  if (cmArr[i].class == "filterCalendar") { //요기 바꿔주고
    cmArr[i].jsObj = new filterCalendar(Number(cmArr[i].index)); //요기 바꿔주고
    cmArr[i].jsObj.evt();
    //LG_CNS.log("SMC_header클래스 추가"); //요기 바꿔주고
  }
}


function filterCalendar(ind) { //해당 콘트롤러의 인덱스값을 받아옴.
  this.iname = $(cmArr[ind].xmlObj).attr("iname");
  this.evt = function () {
    let filterCalendarHtml =  '<div class="date_filter_box">'
                              +'  <div class="tab">'
                              +'    <button type="button" data-period="1">1개월</button>'
                              +'    <button type="button" data-period="3">3개월</button>'
                              +'    <button type="button" data-period="6">6개월</button>'
                              +'    <button type="button" data-period="12">12개월</button>'
                              +'  </div>'
                              +'  <div class="input_box">'
                              +'    <input type="text" id="fromDate" readonly>'
                              +'    <span class="bar"></span>'
                              +'    <input type="text" id="toDate" readonly>'
                              +'    <button id="filterSchBtn" type="button">조 회</button>'
                              +'  </div>'
                              +'</div>'
                              +'<div class="hd_calendar_dim">'
                              +'  <div class="hd_calendar">'
                              +'    <div class="hd_cal_nav">'
                              +'      <span class="txt">2021.07</span>'
                              +'      <button type="button" class="arr prev">이전 월</button>'
                              +'      <button type="button" class="arr next">다음 월</button>'
                              +'    </div>'
                              +'    <button type="button" class="today_btn">TODAY</button>'
                              +'    <div class="hd_cal_main">'
                              +'      <div class="head">'
                              +'        <div class="cell">일</div>'
                              +'        <div class="cell">월</div>'
                              +'        <div class="cell">화</div>'
                              +'        <div class="cell">수</div>'
                              +'        <div class="cell">목</div>'
                              +'        <div class="cell">금</div>'
                              +'        <div class="cell">토</div>'
                              +'      </div>'
                              +'      <div class="body">'
                              +'      </div>'
                              +'    </div>'
                              +'    <button type="button" class="close">달력 닫기</button>'
                              +'  </div>'
                              +'</div>';

    $("#filterCalendarBox").append(filterCalendarHtml);

    // 날짜 관련
    let today = new Date();
    let calDay = new Date(), // 달력 월을 제어하는 메인 날짜 저장 객체
        filterFromDay = new Date(), // 조회기간 시작 날짜 저장 객체
        filtertoDay = new Date(); // 조회기간 종료 날짜 저장 객체

    let filterSchReturn = {
      "SELINFO":[
        {"SEQ":"","START":"","END":""}
      ]
    }

    // 조회기간 선택 필터
    let filterPeriod;
    $(".date_filter_box .tab button").on("touchstart mousedown", function(e){
      if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
      if(e.type=="mousedown" && mFlag)return true;

      filterPeriod = $(this).attr("data-period")*1;
      sltDateFilter(filterPeriod);
      ws_send("k[10]");
    });

    $("#filterSchBtn").on("touchstart mousedown", function(e){
      if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
      if(e.type=="mousedown" && mFlag)return true;
      
      filterSchReturn.SELINFO[0].SEQ = "1";
      filterSchReturn.SELINFO[0].START = dateObjFixer(filterFromDay, "");
      filterSchReturn.SELINFO[0].END = dateObjFixer(filtertoDay, "");
      bleep.pause();
      bleep.currentTime = 0;
      bleep.play();
      ws_send('=[' + JSON.stringify(filterSchReturn) + ']');
    });

    let fadeSpeed = 150,
        isFromTo;
    $(".date_filter_box .input_box input").on("touchstart mousedown", function(e){
      if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
      if(e.type=="mousedown" && mFlag)return true;

      isFromTo = $(this).attr("id");
      if(isFromTo == "fromDate")
        calDay = filterFromDay;
      else
        calDay = filtertoDay;

      buildCalendar(calDay);
      $(".hd_calendar_dim").fadeIn(fadeSpeed);
    });
    $(".hd_calendar .close").on("touchstart mousedown", function(e){
      if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
      if(e.type=="mousedown" && mFlag)return true;

      $(".hd_calendar_dim").fadeOut(fadeSpeed);
    });

    // 달력 월 이동
    $(document).off("touchstart mousedown", ".hd_cal_nav .arr.active"); // 이벤트 중복 제거 (AP 구동방식 특성..)
    $(document).on("touchstart mousedown", ".hd_cal_nav .arr.active", function(e){
      if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
      if(e.type=="mousedown" && mFlag)return true;

      if($(this).hasClass("prev"))
        calDay = new Date(calDay.getFullYear(), calDay.getMonth() - 1, 1);
      else
        calDay = new Date(calDay.getFullYear(), calDay.getMonth() + 1, 1);

      buildCalendar(calDay);
    });

    $(document).off("touchstart mousedown", ".hd_calendar .cell:not('.dim') button.day"); // 이벤트 중복 제거 (AP 구동방식 특성..)
    $(document).on("touchstart mousedown", ".hd_calendar .cell:not('.dim') button.day", function(e){
      if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
      if(e.type=="mousedown" && mFlag)return true;

      if(isFromTo == "fromDate"){ // 시작날짜 선택 상태
        filterFromDay = new Date(calDay.getFullYear(), calDay.getMonth(), $(this).text());

        if( filterFromDay.getTime()>filtertoDay.getTime() ){ // 선택한 날짜가 종료날짜를 넘어갈 시
          filtertoDay = filterFromDay;
          $("#toDate").val(dateObjFixer(filtertoDay, "."));
        }

        $("#fromDate").val(dateObjFixer(filterFromDay, "."));
      }
      else{ // 종료날짜 선택 상태
        filtertoDay = new Date(calDay.getFullYear(), calDay.getMonth(), $(this).text());

        if( (filterFromDay.getTime()>filtertoDay.getTime()) ){ // 선택한 날짜가 시작날짜를 앞서갈 시
          filterFromDay = filtertoDay;
          $("#fromDate").val(dateObjFixer(filterFromDay, "."));
        }

        $("#toDate").val(dateObjFixer(filtertoDay, "."));
      }
      $(".date_filter_box .tab button").removeClass("active")
      $(".hd_calendar_dim").fadeOut(fadeSpeed);
    });

    $(".hd_calendar .today_btn").on("touchstart mousedown", function(e){
      if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
      if(e.type=="mousedown" && mFlag)return true;
      calDay = new Date(today.getFullYear(), today.getMonth(), 1);
      buildCalendar(calDay);
    });

    function calNavSet(date){
      $(".hd_cal_nav .txt").text(dateObjFixer(date,".").slice(0,7));
      $(".hd_cal_nav .arr").addClass("active");
      
      if((date.getFullYear()==today.getFullYear()-2) && (date.getMonth()==today.getMonth())) // 2년 전까지만 달력 출력
        $(".hd_cal_nav .arr.prev").removeClass("active");
      else if((date.getFullYear()==today.getFullYear()) && (date.getMonth()==today.getMonth())) // 이번 달 까지만 달력 출력
        $(".hd_cal_nav .arr.next").removeClass("active");
    }

    let calItem = "", dayCnt = 0, isToday, isDim,
        calMonthFirstDate, // 해당 월의 마지막 날짜 저장
        calMonthlastDate, // 해당 월의 마지막 날짜 저장
        calMonthFirstDay, // 해당 월의 첫번째 날짜 요일 저장
        calMonthDayFlag;

    // 달력 생성 함수
    function buildCalendar(date){
      calMonthFirstDate = new Date(date.getFullYear(), date.getMonth(), 1);
      calMonthlastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      calMonthlastDate = calMonthlastDate.getDate();
      calMonthFirstDay = calMonthFirstDate.getDay();
      
      calNavSet(date);

      // 달력 관련 초기화
      $(".hd_cal_main .body").empty();
      calItem = "",
      dayCnt = 1,
      isToday = "",
      isDim = "",
      calMonthDayFlag = false;

      // 달력 날짜 그리기
      for(var i=0; i<42; i++){
        if(i%7==0)
          calItem += '<div class="week">';

        // console.log("dayCnt = " + dayCnt + ", calMonthlastDate = " + calMonthlastDate);
        if(i==calMonthFirstDay) // 월의 첫째날 시작 선언
          calMonthDayFlag = true;
        else if(dayCnt>calMonthlastDate) // 월의 마지막날 선언
          calMonthDayFlag = false;

        // 위 조건문 플래그 선언에 따른 날짜 삽입
        if(calMonthDayFlag){
          // 오늘 날짜 확인
          isToday = (date.getFullYear()==today.getFullYear()) && (date.getMonth()==today.getMonth()) && (dayCnt==today.getDate())?" today":"";

          // 2년전 ~ 오늘 이 외 날짜 딤처리
          if(
            ( (date.getFullYear()>=today.getFullYear()) && (date.getMonth()>=today.getMonth()) && (dayCnt>today.getDate()) ) 
            || 
            ( (date.getFullYear()<=today.getFullYear()-2) && (date.getMonth()<=today.getMonth()) && (dayCnt<today.getDate()) )
          )
            isDim = " dim";
          else
            isDim = "";

          calItem += '<div class="cell' + isToday + isDim + '"><button type="button" class="day">' + dayCnt + '</button></div>';
          dayCnt++;
        }
        else
          calItem += '<div class="cell"></div>';

        // div.week 태그 닫기
        if(i%7==6)
          calItem += '</div>';
      }
      $(".hd_cal_main .body").append(calItem);
    }

    sltDateFilter(1); // 1개월 기본 선택 상태

    function sltDateFilter(period){
      filterFromDay = lastDayMonthCalc(today, period);
      filtertoDay = today;
      $("#fromDate").val(dateObjFixer(filterFromDay, "."));
      $("#toDate").val(dateObjFixer(filtertoDay, "."));
      $(".date_filter_box .tab button[data-period='" + period + "']").addClass("active").siblings().removeClass("active");
    }

    // 말일 처리
    function lastDayMonthCalc(date, month) {
      // month달 전의 1일
      let addMonthFirstDate = new Date(
        date.getFullYear(),
        date.getMonth() - month,
        1
      );
      
      // month달 전의 말일
      let addMonthLastDate = new Date(
        addMonthFirstDate.getFullYear(),
        addMonthFirstDate.getMonth() + 1
        , 0
      );

      let result = addMonthFirstDate;
      if(date.getDate() > addMonthLastDate.getDate())
        result.setDate(addMonthLastDate.getDate());
      else
        result.setDate(date.getDate());
      
      return result;
    }

    function dateObjFixer(date, separator){
      return date.getFullYear() + separator + (date.getMonth()+1).toString(10).padStart(2,'0') + separator + date.getDate().toString(10).padStart(2,'0');
    }
  }

  this.callF = function (gab) {
    
  }
}
