
/*************************************************************************************
    FileName			:	SMC_calendar.js
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
	if(cmArr[i].class == "calendar") { //요기 바꿔주고
		cmArr[i].jsObj = new SMC_calendar(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function SMC_calendar(ind) {
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
        let inputType = 0;

        let setReturn = "";

        //dateSetting();

        let printMonth = month + 1;
        if(printMonth < 10) {
            printMonth = "0" + printMonth;
        }

        $("#cm"+ind).css({
            "display":"flex","width":this.width + "px","justify-content":"space-between","align-items":"center"
        })

        $("#cm"+ind).append('<div class="calendar_input_box">'
                            +'  <div class="wrap">'
                            +'      <div class="calendar_input_title">검색 시작일</div>'
                            +'      <div class="calendar_input_start">'+year+'-'+printMonth+'-'+day+'</div>'
                            +'  </div>'
                            +'  <div class="wrap">'
                            +'      <div class="calendar_input_title">검색 종료일</div>'
                            +'      <div class="calendar_input_end">'+year+'-'+printMonth+'-'+day+'</div>'
                            +'  </div>'
                            +'  <div class="calendar_input_alert">검색 시작일과 종료일을 다시 확인하여 주십시오</div>'
                            +'</div>');


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

        setReturn = year + "" + printMonth + "" + day + "|" + year + "" + printMonth + "" + day;
        drawCalendar();
        dateSetting();

        UTIL.setReturnBtn("=[" + setReturn + "]", "confirm");

        for(let i = 0 ; i < 42 ; i++) {
            if($(".calendar_date:eq("+i+")").text() == date.getDate()) {
                $(".calendar_date:eq("+i+")").css({"background-color" : "#ffcc00"});
            }
        }

        $(".calendar_input_start").bind("click", function() {
            $(this).addClass("calendar_input_select");
            $(".calendar_input_end").removeClass("calendar_input_select");
            selectDate = $(this);
            inputType = 0;
        })

        $(".calendar_input_end").bind("click", function() {
            $(this).addClass("calendar_input_select");
            $(".calendar_input_start").removeClass("calendar_input_select");
            selectDate = $(this);
            inputType = 1;
        })

        $('.calendar_left_arrow').bind("click", function() {
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

        function drawCalendar() {
            $(".calendar_list").empty();
            for(let i = 0 ; i < 42 ; i++) {
                if(i >= startDate.getDay() && count <= endDate.getDate()) {
                    if(i % 7 == 0) $(".calendar_list").append('<div class="calendar_date date_sun">'+count+'</div>');
                    else if(i % 7 == 6) $(".calendar_list").append('<div class="calendar_date date_sat">'+count+'</div>');
                    else $(".calendar_list").append('<div class="calendar_date">'+count+'</div>');
                    count++;
                }else if(count <= endDate.getDate()) $(".calendar_list").append('<div class="calendar_date"></div>');

                let checkDate = new Date();
                if(checkDate.getFullYear() == year && checkDate.getMonth() == month) {
                    if((count-1) > day) {
                        $(".calendar_date:eq("+i+")").css({ "opacity" : "0.2"});
                    }
                } else if(checkDate.getFullYear() <= year && checkDate.getMonth() < month) {
                        $(".calendar_date:eq("+i+")").css({ "opacity" : "0.2"});
                } else if(checkDate.getFullYear() < year) {
                        $(".calendar_date:eq("+i+")").css({ "opacity" : "0.2"});
                }
            }

            $('.calendar_year > span').text(year);
            $('.calendar_year > label').text(month + 1);

            count = 1;

            $(".calendar_date").bind("click", function() {
                let checkDate = new Date();
                if($(this).text() == "") {
//                    UTIL.btnDimd("1", "confirm");
                } else if(parseInt($(this).text()) > checkDate.getDate() && parseInt($(".calendar_year > span").text()) >= checkDate.getFullYear() && parseInt($(".calendar_year > label").text()) >= (checkDate.getMonth() + 1)) {
//                    UTIL.btnDimd("1", "confirm");
                } else {
                    $(".calendar_date").css({"background-color" : "#ffffff"});
                    $(this).css({"background-color" : "#ffcc00"});
                    day = parseInt($(this).text());
                    
                    dateSetting();
                    UTIL.setReturnBtn("=[" + setReturn + "]", "confirm");
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
                }
            })
        }

        function dateSetting() {

            let makeReturn = year.toString() + (month + 1).toString().padStart(2,"0") + day.toString().padStart(2,"0");

            if(inputType == 0) {
                setReturn = setReturn.substring(9, 17);
                setReturn = makeReturn + "|" + setReturn;
            } else {
                setReturn = setReturn.substring(0, 8);
                setReturn = setReturn + "|" + makeReturn;
            }

            if(Number(setReturn.substring(0, 8)) <= Number(setReturn.substring(9, 17))) {
                UTIL.btnDimd("", "confirm");
                $(".calendar_input_alert").css('visibility','hidden');
            }else{
                UTIL.btnDimd("1", "confirm");
                $(".calendar_input_alert").css('visibility','visible');
            }
        }

	}

	this.callF = function (gab) {

        
	}


}
