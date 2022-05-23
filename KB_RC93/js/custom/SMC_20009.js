/*************************************************************************************
    FileName			:	SMC_20009.js
    Description			:	smc 장애내역 조회 화면
    Created Date		:	2019.01.29
    Created By			:	ATEC AP, (신성철)
    Revision History	:	
             ver 1.0.0.0 (2019.01.29) - 최초작성
                                        S20009
                                        장애내역 조회 화면
                                        신성철
                                        선택된 날짜를 받아와
                                        이전날짜와 다음날짜를 구하여 리턴 (신성철)
             ver 1.0.0.2 (2019.01.29) - JSON 변환 css 분리 완료 (신성철)
             ver 1.0.0.3 (2021.11.11) - 장보고 버전 -> 국민은행 시재관리기 버전으로 수정 (손지민)
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

"use strict";
for (let i = 0; i < cmArr.length; i++) {
    if (cmArr[i].class == "20009") { //요기 바꿔주고
        cmArr[i].jsObj = new SMC_20009(Number(cmArr[i].index)); //요기 바꿔주고
        cmArr[i].jsObj.evt();
    }
}

function SMC_20009(ind) {
    $(document).on("contextmenu dragstart selectstart", function (e) {
        return false; //드래그, 우클릭, 선택, 키보드 막기
    });

    this.iname = $(cmArr[ind].xmlObj).attr("iname");
    
    let errorDate = dxtArr[0].attr('bText'); // 조회한 장애내역의 날짜
    let errorMsgArea = dxtArr[1];
    let errorMsg = dxtArr[1].attr('bText');  // 조회한 장애내역 메세지
    let setDateArea = $(".searchDate");
    let evtParam = errorDate;
    this.evt = function () {
        this.callF(evtParam);
    }

    this.callF = function (gab) {
        if(gab == '') return

        let UTIL = new Util();
        let startX, startY;
        //const jsonObj = JSON.parse(gab)
        //let error_date =  jsonObj['CALL_VALUE']// 조회한 장애내역의 날짜
        //let error_msg = dxtArr[1].attr('bText'); // 조회한 장애내역 메세지
        
        let downFlag = false; //마우스가 다운중인지 여부. down이며 true,down은 false
    
        let e_yyyy = errorDate.substring(0, 4); // 장애 내역의 년도
        let e_mm = parseInt(errorDate.substring(4, 6)) - 1; // 장애 내역의 월
        let e_dd = errorDate.substring(6, 8); // 장애 내역의 일
        let e_date = new Date(e_yyyy, e_mm, 0)
        let last_date = e_date.getDate();

        console.log(errorDate)
        console.log(errorMsg)
        console.log(setDateArea)

        //------------이전 날짜를 구함---------------
        let e_prev_date;
        if (e_mm == 0 && e_dd == 1)          e_prev_date = new Date(e_yyyy - 1, 12, 0); // 1월 1일일 경우 12월 31일
        else if (e_dd == 1)                  e_prev_date = new Date(e_yyyy, e_mm, 0);// 이전달의 마지막 날을 구함
        else                                 e_prev_date = new Date(e_yyyy, e_mm, e_dd - 1);

        //------------이후 날짜를 구함---------------
        let e_next_date;
        if (e_dd == last_date && e_mm == 12) e_next_date = new Date(parseInt(e_yyyy) + 1, 1, 1); // 12월 31일일 경우 1월 1일
        else if (e_dd == last_date)          e_next_date = new Date(e_yyyy, parseInt(e_mm) + 1, 1); // 다음달 1일
        else                                 e_next_date = new Date(e_yyyy, e_mm, parseInt(e_dd) + 1); // 이번달, 오늘 날짜 +1

        // 이전 년월일 이후 년월일 구함
        let prevYY = e_prev_date.getFullYear();
        let prevMM = parseInt(e_prev_date.getMonth() + 1);
        let prevDD = e_prev_date.getDate();


        let nextYY = e_next_date.getFullYear();
        let nextMM = parseInt(e_next_date.getMonth() + 1);
        let nextDD = e_next_date.getDate();

        //-------------두자리 수로 변환------------
        prevMM = prevMM.toString().length < 2 ? prevMM.toString().padStart(2,"0") : prevMM;
        nextMM = nextMM.toString().length < 2 ? nextMM.toString().padStart(2,"0") : nextMM;
        prevDD = prevDD.toString().length < 2 ? prevDD.toString().padStart(2,"0") : prevDD;
        nextDD = nextDD.toString().length < 2 ? nextDD.toString().padStart(2,"0") : nextDD;

        // 1 - 이전        2- 다음
        // const prevData = {
        // 	"RETURN_VALUE" : ''+prevYY + prevMM + prevDD
        // }
        // const nextData = {
        // 	"RETURN_VALUE" : ''+nextYY + nextMM + nextDD
        // }
        UTIL.setReturnBtn('=['+prevYY + prevMM + prevDD+']','retPrev')
        UTIL.setReturnBtn('=['+nextYY + nextMM + nextDD+']','retNext')

        setDateArea.innerText = "검색일 : " + (parseInt(e_mm) + 1) + "월  " +  parseInt(e_dd) + "일";
        setDateArea.text("검색일 : " + (parseInt(e_mm) + 1) + "월  " +  parseInt(e_dd) + "일");
        // $('#cm' + ind).append($('<span id="SMC_20009_mm_text" class="SMC SMC_20009_date">' + (parseInt(e_mm) + 1) + '</span>'));
        // $('#cm' + ind).append($('<span id="SMC_20009_dd_text" class="SMC SMC_20009_date">' + parseInt(e_dd) + '</span>'));

        $('#dxt1').css({'overflow-y': 'scroll'});

        // 스크롤 마지막부터 시작
        $('#dxt1').scrollTop($("#dxt1")[0].scrollHeight);

        $('#dxt1').bind("mousedown mouseleave mouseup mousemove", scroll_f);

        function scroll_f(e) {
            switch (e.type) {
                case "mousedown":
                    downFlag = true;
                    startX = e.pageX;
                    startY = e.pageY;
                    break;
                case "mouseup":
                    downFlag = false;
                    break;
                case "mousemove":
                    if (downFlag && 1920 > e.pageY && 0 < e.pageY) {
                        let nowSc = document.getElementById('dxt1').scrollTop;
                        let moveSc = (startY - e.pageY) / 20; //움직인값
                        $('#dxt1').scrollTop(nowSc + moveSc);
                    }
                    break;
                case "mouseleave":
                    downFlag = false;
                    break;
                default:
                    break;
            }
        }

    }


}
