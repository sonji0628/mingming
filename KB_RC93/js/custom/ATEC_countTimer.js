/*************************************************************************************
    FileName			:	ATEC_countTimer.js
    Description			:	카운트 적용
	Created Date		:	2021-10-06, 손지민
	Created By			:	
    Revision History	:	
        ver 1.0.0.0 - 최초 작성
		ver 1.0.0.1 (2021.10.06) - 국민은행 시재관리기 버전으로 수정(손지민)
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (var i = 0; i < cmArr.length; i++) {
	if (cmArr[i].class == "countTimer") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_countTimer(Number(cmArr[i].index), cmArr[i].screenNumber); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_countTimer(ind,myPageNum) {
	this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
	this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
	this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
	this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));

	let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기

	let UTIL = new Util();
	let count = Number(evtParam); //최초 설정 시간(기본:초)
	$("#cm"+ind).append(`<div class="countAreaText">
							<span class="text"> 남은시간 : </span>
							<span class="counting">${count} 초</span>
							<div class="timeBtn">시간연장</button>
						 </div>`
						
	)
	$(".countAreaText").css({
		"width": this.width + "px",
		"top" : this.top + "px",
		"left" : this.left + "px",
		"height" : this.height + "px",
		"display": "flex",
		"flex-wrap": "wrap",
		"justify-content": "flex-start",
		"align-items" : "center",
		"font-size": "24px",
		"color": "#564f42",
		"z-index" : "9999"
	});
	$(".countAreaText > .counting").css({
		"width" : "100px",
		"font-weight":"bold",
		"color":"#564f42",
		"text-align" : "center"
	});
	$(".countAreaText > .timeBtn").css({
		"position":"absolute",
		"right":"0",
		"width" : "80px",
		"height" : "30px",
		"color":"#564f42",
		"border" : "1px solid #564f42",
		"text-align" : "center",
		"background" : "#fff",
		"font-size": "16px",
	});

	this.evt = function() {		
		// 코드통합 2021.01.22 (cyg) 
		if( $(".counting")[0] == undefined )
		{
			UTIL.stopTimer();
			return;
		}

		UTIL.stopTimer();//페이지 실행 시 초기화 ==> 진행중인 카운팅 종료
		UTIL.startTimer(timer);// 카운팅 시작

        function timer(){
			// 코드통합 2021.01.22 (cyg)
			if( $(".counting")[0] == undefined )
			{
				UTIL.stopTimer();
				return;
			}

			if(count !== 0) count--; // 1초씩 감소
			if(count <= 0){ 
				UTIL.stopTimer();//카운팅 종료
				eventFlag = true;
				if(myPageNum == "KR19057") ws_send("T[T]");
				else                       ws_send("~[~]");
			}
            $(".counting")[0].innerText = count + " 초";  // "counting" 클래스에 남은 시간 보여주기
        }  

		$(".countAreaText > .timeBtn").bind('touchstart mousedown',timeBtn);

		function timeBtn(){
			let myBtn = $(this);
			if(!eventFlag){
				btnAni(myBtn);

				// 재설정
				count = Number(evtParam);
				$(".counting")[0].innerText = count + " 초";
				UTIL.stopTimer();
				UTIL.startTimer(timer);
				//
				ws_send("k[10]");
			}
		}
		
	}

	this.callF = function (gab) {
        const jsonObj = JSON.parse(gab);
	}
}
