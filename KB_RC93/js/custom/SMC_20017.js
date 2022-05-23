/*************************************************************************************
    FileName			:	SMC_20014.js
    Description			:	smc 통신변수 화면(S20014,S20015화면 사용)
    Created Date		:	2019.01.30
    Created By			:	ATEC AP, (신성철)
    Revision History	:	
             ver 1.0.0.0 (2019.01.30) - 최초작성
                                        S7575
                                        날짜 및 시간변경 클래스
                                        리턴 =[yyyymmdd|hhmmss]  (신성철)
             ver 1.0.0.2 (2021.11.04) - 장보고 버전 -> 국민은행 시재관리기 버전으로 수정
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

"use strict";
for (var i = 0; i < cmArr.length; i++) {
	if (cmArr[i].class == "20017") { //요기 바꿔주고
		cmArr[i].jsObj = new SMC_20017(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}
function SMC_20017(ind) {

    this.iname = $(cmArr[ind]).attr("iname");
    let evtParam = $(cmArr[ind]).attr("param");


	this.evt = function () {
        let contentWrap = $('<div class="contentWrap"></div>');
        $("#cm" + ind).append(contentWrap)
        let date = new Date();
        let UTIL = new Util();

        let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        let count = 1;

        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let makeReturn; // 선택한 년월일


        var time = new Date();
		var ampm = ''; // 오전오후 저장변수
		var hh = time.getHours() // 시 저장변수
		var mm = time.getMinutes() // 분 저장변수
		var ss = time.getSeconds() // 초 저장변수

		if (hh >= 12) { // 현재시간이 12시 이후면 오후
			ampm = "오후";
		} else { // 12시 이전이면 오전
			ampm = "오전";
			if (hh == 0) {
				hh = 12;
			}
		}

        let setReturn = "";

        
		
        dateSetting();
        make_date_picker();
        make_time_picker(); // 시간선택
        setReturnValue();

        function setReturnValue() {
			var send_msg = '';
			var sendhh = hh;
			var sendmm = mm;
			var sendss = ss;
			if (ampm == '오전') {
				if (sendhh == 12) sendhh = 0
			} else {
				if (sendhh != 12) sendhh = sendhh + 12;
			}

			if (sendhh < 10)  sendhh = '0' + sendhh;
			if (sendmm < 10)  sendmm = '0' + sendmm;
			if (sendss < 10)  sendss = '0' + sendss;
			send_msg = makeReturn + '|' + sendhh + sendmm + sendss;
			//UTIL.setReturnBtn('=[' + send_msg + ']', 'ret')
			btnArr[1].breturn = '=[' + send_msg + ']';
		}


        
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
            bleepPlay();// 버튼 소리 함수
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
            bleepPlay();// 버튼 소리 함수
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
            }
            $('.calendar_year > span').text(year);
            $('.calendar_year > label').text(month + 1);

            count = 1;

            $(".calendar_date").bind("click", function() {
                let checkDate = new Date();
                if($(this).text() == "") {
//                    UTIL.btnDimd("1", "confirm");
                } else {
                    $(".calendar_date").css({"background-color" : "#ffffff"});
                    $(this).css({"background-color" : "#ffcc00"});
                    day = parseInt($(this).text());

                    dateSetting();
                    UTIL.setReturnBtn("=[" + setReturn + "]", "confirm");
                    ws_send("K[10]");
                    bleepPlay();// 버튼 소리 함수
                }
            });
        }

        function dateSetting() {

            makeReturn = year.toString();

            if(month + 1 < 10) makeReturn = makeReturn + "0" + (month + 1).toString();
            else               makeReturn = makeReturn + "" + (month + 1).toString();

            if(day < 10)       makeReturn = makeReturn + "0" + day.toString();
            else               makeReturn = makeReturn + "" + day.toString();
        }

        function make_date_picker() {
            ////////////////////////////////////////////////////////////////////////////////
            //                              달력만들기                                     //
            ////////////////////////////////////////////////////////////////////////////////
            contentWrap.append('<div class="calendar_wrap">'
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

            let printMonth = month + 1;
            if(printMonth < 10) {
                printMonth = "0" + printMonth;
            }


            setReturn = year + "" + printMonth + "" + day + "|" + year + "" + printMonth + "" + day;

            drawCalendar();

            UTIL.setReturnBtn("=[" + setReturn + "]", "confirm");

            for(let i = 0 ; i < 42 ; i++) {
                if($(".calendar_date:eq("+i+")").text() == date.getDate()) {
                    $(".calendar_date:eq("+i+")").css({"background-color" : "#ffcc00"});
                }
            }

        }

        ////////////////////////////////////////////////////////////////////////////////
        //                              시간선택만들기                                 //
        ////////////////////////////////////////////////////////////////////////////////


        function make_time_picker() { // 시간 선택 div 만들기

            contentWrap.append($('<div class="time_wrap"></div>'))
            $('.time_wrap').append($('<div id="SMC_20017_time_up_div" class="SMC SMC_20017_time_div"></div>'));

			$('#SMC_20017_time_up_div').append($('<div id="ampm_up" class="time_up"></div>'));
			$('#ampm_up').append($(`<img src="${btnDir}/btn_listPrev.png"/>`));


			$('#SMC_20017_time_up_div').append($('<div id="hh_up" class="time_up"></div>'));
			$('#hh_up').append($(`<img src="${btnDir}/btn_listPrev.png"/>`));


			$('#SMC_20017_time_up_div').append($('<div id="mm_up" class="time_up"></div>'));
			$('#mm_up').append($(`<img src="${btnDir}/btn_listPrev.png"/>`));

			$('#SMC_20017_time_up_div').append($('<div id="ss_up" class="time_up"></div>'));
			$('#ss_up').append($(`<img src="${btnDir}/btn_listPrev.png"/>`));



			$('.time_wrap').append($('<div id = "SMC_20017_time_div" class="SMC"></div>'));

			$('#SMC_20017_time_div').append($('<div id = "SMC_20017_time_picker0" class="time_picker" style="border-right:2px solid #d4d4d4;"></div>'));
			$('#SMC_20017_time_picker0').append($('<br/><span id="SMC_20017_time_text0" class="SMC_20017_time_text">' + ampm + '</span>'));

			$('#SMC_20017_time_div').append($('<div id ="SMC_20017_time_picker1" class="SMC_20017_time_picker"></div>'));

            if(hh > 12) hh = hh -12;

			$('#SMC_20017_time_picker1').append($('<br/><span id="SMC_20017_time_text1" class="SMC_20017_time_text">' + hh + '시</span>'));
			$('#SMC_20017_time_div').append($('<div id ="SMC_20017_time_picker2"  class="SMC_20017_time_picker"></div>'));

			$('#SMC_20017_time_picker2').append($('<br/><span id="SMC_20017_time_text2" class="SMC_20017_time_text">' + mm + '분</span>'));
			$('#SMC_20017_time_div').append($('<div id ="SMC_20017_time_picker3"  class="SMC_20017_time_picker"></div>'));

			$('#SMC_20017_time_picker3').append($('<br/><span id="SMC_20017_time_text3" class="SMC_20017_time_text">' + ss + '초</span>'));
			


			$('.time_wrap').append($('<div id="SMC_20017_time_down_div" class="SMC SMC_20017_time_div"></div>'));

			$('#SMC_20017_time_down_div').append($('<div id="ampm_down" class="time_down"></div>'));
			$('#ampm_down').append($(`<img src='${btnDir}/btn_listNext.png'></div>`));

			$('#SMC_20017_time_down_div').append($('<div id="hh_down" class="time_down"></div>'));
			$('#hh_down').append($(`<img src='${btnDir}/btn_listNext.png'></div>`));

			$('#SMC_20017_time_down_div').append($('<div id="mm_down" class="time_down"></div>'));
			$('#mm_down').append($(`<img src='${btnDir}/btn_listNext.png'></div>`));

			$('#SMC_20017_time_down_div').append($('<div id="ss_down" class="time_down"></div>'));
			$('#ss_down').append($(`<img src='${btnDir}/btn_listNext.png'></div>`));

			$('.time_up').on('click', upBtn);
			$('.time_down').on('click', downBtn);
		}


		function upBtn() {
			var up_id = $(this).attr('id').substring(0, 1);
			switch (up_id) {
				case 'a':
					if (ampm == '오전') ampm = '오후'
					else                ampm = '오전'
					$('#SMC_20017_time_text0').text(ampm);
					break;
				case 'h':
					if (hh == 12) hh = 1;
					else          hh++;
					$('#SMC_20017_time_text1').text(hh + '시');
					break;
				case 'm':
					if (mm == 59) mm = 0;
					else          mm++;
					$('#SMC_20017_time_text2').text(mm + '분');
					break;
				case 's':
					if (ss == 59) ss = 0;
					else          ss++;
					$('#SMC_20017_time_text3').text(ss + '초');
					break;
				default:
			}
			setReturnValue();

            let mymy = $(this);
            bleepPlay();
            mymy.animate({ 'marginTop': '+=5px'}, 100, reback);
            function reback() {
                mymy.animate({ 'marginTop': '-=5px'}, 100);
                mymy = null;
            } 
		}

		function downBtn() {
			var down_id = $(this).attr('id').substring(0, 1);
			switch (down_id) {
				case 'a':
					if (ampm == '오전') ampm = '오후'
					else                ampm = '오전'
					$('#SMC_20017_time_text0').text(ampm);
					break;
				case 'h':
					if (hh == 1) hh = 12;
					else hh--;
					$('#SMC_20017_time_text1').text(hh + '시');
					break;
				case 'm':
					if (mm == 0) mm = 59;
					else         mm--;
					$('#SMC_20017_time_text2').text(mm + '분');
					break;
				case 's':
					if (ss == 0) ss = 59;
					else         ss--;
					$('#SMC_20017_time_text3').text(ss + '초');
					break;
				default:

			}
			setReturnValue();
            let mymy = $(this);
            bleepPlay();
            mymy.animate({ 'marginTop': '+=5px'}, 100, reback);
            function reback() {
                mymy.animate({ 'marginTop': '-=5px'}, 100);
                mymy = null;
            } 
		}

	}

	this.callF = function (gab) {

        
	}

}
