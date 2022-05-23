
/*************************************************************************************
    FileName			:	SMC_calendar_onedaySelect.js
    Description			:	smc 날짜 선택을 위한 달력(국민시재관리기에서 가져온 소스)
    Created Date		:	2021.11.01
    Created By			:	ATEC AP, (손지민)
    Revision History	:	
             ver 1.0.0.0 (2021.11.01) - 최초작성 
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (let i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "calendar_onedaySelect") { //요기 바꿔주고
		cmArr[i].jsObj = new SMC_calendar_onedaySelect(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function SMC_calendar_onedaySelect(ind) {
	this.iname = $(cmArr[ind]).attr("iname");
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    let evtParam = $(cmArr[ind]).attr("param");


	this.evt = function () {
        let date = new Date();
        let UTIL = new Util();

        let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        let count = 1;

        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate().toString().padStart(2,"0");

        let inputDate = [year, month+1, day];
        let selectDate = "";

        let setReturn = "";

        //dateSetting();

        let printMonth = month + 1;
        if(printMonth < 10) {
            printMonth = "0" + printMonth;
        }
        let printYear = year;
        let printDay = day;

        $("#cm"+ind).css({
            "display":"flex","width":this.width + "px","justify-content":"space-between","align-items":"center"
        })

        $("#cm" + ind).append('<div class="calendar_input_box">'
                            +'  <div class="wrap">'
                            +'      <div class="calendar_input_start">'+year+'-'+printMonth+'-'+day+'</div>'
                            +'  </div>'
                            +'</div>');

        $("#cm" + ind).append('<div class="todayBtn smcBrownBtn">Today</div>');
        $(".todayBtn").css({"width": "110px","height": "37px","color":"#fff","text-align": "center","line-height": "34px","font-size": "22px","font-family": "Noto Sans CJK KR Bold","position": "absolute","top": "-237px","right": "0"})
        $("#cm" + ind).append('<div class="calendar_wrap">'
                              +'    <div class="calendar_box">'
                              +'        <div class="calendar_header">'
                              +'            <div class="calendar_year_select">'
                              +'                <div class="calendar_left_arrow"><</div>'
                              +'                <div class="calendar_year"><span></span>년&nbsp;&nbsp;<label></label>월</div>'
                              +'                <div class="calendar_right_arrow">></div>'
                              +'            </div>'
                              +'            <div class="calendar_week_wrap">'
                              +'                <div class="calendar_week date_sun">일</div>'
                              +'                <div class="calendar_week">월</div>'
                              +'                <div class="calendar_week">화</div>'
                              +'                <div class="calendar_week">수</div>'
                              +'                <div class="calendar_week">목</div>'
                              +'                <div class="calendar_week">금</div>'
                              +'                <div class="calendar_week date_sat">토</div>'
                              +'            </div>'
                              +'        </div>'
                              +'        <div class="calendar_list">'
                              +'        </div>'
                              +'    </div>'
                              +'</div>');


        selectDate = $(".calendar_input_start");
        $(".calendar_input_start").addClass("calendar_input_select");

        setReturn = year + "" + printMonth + "" + day;
        drawCalendar();
        dateSetting();

        for(let i = 0 ; i < 42 ; i++) {
            if($(".calendar_date:eq("+i+")").text() == date.getDate()) {
                $(".calendar_date:eq("+i+")").css({"background-color" : "#ffcc00"});
            }
        }

        $(".calendar_input_start").bind("click", function() {
            if(eventFlag) return

            $(this).addClass("calendar_input_select");
            selectDate = $(this);
            inputType = 0;
        })

        $('.calendar_left_arrow').bind("click", function() {
            if(eventFlag) return

            if(month > 0) {
                month = month - 1;
            } else {
                year = year - 1;
                month = 11;
            }
            day = date.getDate();
            startDate = new Date(year, month, 1);
            endDate = new Date(year, month + 1, 0);
            drawCalendar();
            ws_send("K[10]");
            bleepPlay();
        })

        $('.calendar_right_arrow').bind("click", function() {
            if(eventFlag || (month + 1) >= printMonth) return

            if(month == 11) {
                month = 0;
                year = year + 1;
            } else {
                month = month + 1;
            }
            day = date.getDate();
            startDate = new Date(year, month, 1);
            endDate = new Date(year, month + 1, 0);
            drawCalendar();
            ws_send("K[10]");
            bleepPlay();
        })
        $('.todayBtn').bind("click", function() {
            if(eventFlag) return

            year = printYear;
            month = printMonth-1;
            day = printDay;
            startDate = new Date(year, month, 1);
            drawCalendar();
            let dataDiv = document.querySelectorAll(".calendar_date");
            dataDiv.forEach(element => element.style.background = element.innerText == date.getDate() ? "#ffcc00" : "#fff");
            selectDate.text(year + "-" + printMonth + "-" + day);
            dateSetting();
            ws_send("K[10]");
            bleepPlay();
        })
        


        function drawCalendar() {
            $(".calendar_list").empty();
            for(let i = 0 ; i < 42 ; i++) {
                if(i >= startDate.getDay() && count <= endDate.getDate()) {
                    if(i % 7 == 0) $(".calendar_list").append('<div class="calendar_date date_sun" dimd="0">'+count+'</div>');
                    else if(i % 7 == 6) $(".calendar_list").append('<div class="calendar_date date_sat" dimd="0">'+count+'</div>');
                    else $(".calendar_list").append('<div class="calendar_date" dimd="0">'+count+'</div>');
                    count++;
                }else if(count <= endDate.getDate()) $(".calendar_list").append('<div class="calendar_date" dimd="0"></div>');

                let checkDate = new Date();
                if(checkDate.getFullYear() == year && checkDate.getMonth() == month) {
                    if((count-1) > day) {
                        $(".calendar_date:eq("+i+")").attr("dimd","1").css({ "opacity" : "0.2"});
                    }
                } else if(checkDate.getFullYear() <= year && checkDate.getMonth() < month) {
                        $(".calendar_date:eq("+i+")").attr("dimd","1").css({ "opacity" : "0.2"});
                } else if(checkDate.getFullYear() < year) {
                        $(".calendar_date:eq("+i+")").attr("dimd","1").css({ "opacity" : "0.2"});
                }
            }

            $('.calendar_year > span').text(year);
            $('.calendar_year > label').text(month + 1);

            count = 1;

            $(".calendar_date").bind("click", function() {
                let clickDate = $(this);
                if(eventFlag || clickDate.attr("dimd") == 1) return
                
                $(".calendar_date").css({"background-color" : "#ffffff"});
                clickDate.css({"background-color" : "#ffcc00"});
                
                day = parseInt(clickDate.text());
                
                dateSetting();
                ws_send("K[10]");
                bleepPlay();
                inputDate = [year, month+1, day];
                if(inputDate[1] < 10) {
                    inputDate[1] = "0" + inputDate[1];
                }
                if(inputDate[2] < 10) {
                    inputDate[2] = "0" + inputDate[2];
                }
                selectDate.text(inputDate[0] + "-" + inputDate[1] + "-" + inputDate[2]);

                    
            })
        }

        function dateSetting() {
            let finalMonth = (month + 1).toString().length < 2 ? (month + 1).toString().padStart(2,"0") : (month + 1);
            let finalDay = day.toString().length < 2 ? day.toString().padStart(2,"0") : day;
            setReturn = year.toString() + finalMonth + finalDay;
            UTIL.setReturnBtn("=[" + setReturn + "]", "confirm");
        }

	}

	this.callF = function (gab) {

        
	}


}
