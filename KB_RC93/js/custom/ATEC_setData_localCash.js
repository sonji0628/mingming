/*************************************************************************************
	FileName			:	ATEC_setData_localCashSet.js
	Description			:	메인화면
                            기기시재 데이터 셋팅                           
	Created Date		:	2021.09.24
	Created By			:	ATEC AP, 손지민
	Revision History	:	
         ver 1.0.0.0 - 최초작성
         ver 1.0.0.0 - 데이터만 받고  make_moneyState에서 그려주는 걸로 수정(손지민)
                       -> 기존 소스는 딜레이 문제로  innerText를 찾지 못해 간헐적으로 에러 났음
                       -> 전처리로 데이터를 보내기 때문에 다른 js에서 그려 줄 수 있음
**************************************************************************************/


/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (var i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "setData_localCash") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_setData_localCash(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_setData_localCash(ind) {
    this.iname = $(cmArr[ind].xmlObj).attr("iname");

    //evtParam DATA: 총금액;회수함매수;권종1|금액1;권종2|금액2;……권종8|금액8;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    // let arrList;//파라미터값을 ';'구분자로 배열화시키는 변수
    
	this.evt = function() {
        //if (evtParam != "") this.callF(evtParam);
    }
    
    
	this.callF = function (gab) {
        //console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);
        // if (!gab) return;

        // let localTotalCash = document.querySelector('.totalCash > .localCash > span'); //총 금액
        // let recoveryShip = document.querySelector('.recoveryShip > .localCash > span');//회수함
        // let localCashs = document.querySelectorAll('.cashUnit > .localCash > span');   //권종별 금액
        // let totalCash;    //총 금액 데이터
        // let recoveryShipData;
        // let cashUnits;    //권종별 데이터만 담은 배열
        // let cashUnitData; //권종별 금액 데이터
         
        // arrList = gab.split(";"); //gab을 ';'구분자로 배열화시키는 변수
        // arrList = arrList.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
        //     return item !== '';
        // })

        // totalCash = Number(arrList[0]).toLocaleString();          //총금액 데이터
        // recoveryShipData = Number(arrList[1]).toLocaleString();   //회수함 데이터
        // cashUnits = arrList.slice(2,arrList.length);              //총금액을 뺀 나머지 금액 데이터 

        // localTotalCash.innerText = totalCash; //★ 총금액 시재 현황 입력
        // recoveryShip.innerText = recoveryShipData;//★ 회수함 시재 현황 입력
        // for(let i = 0; i < cashUnits.length; i++){
        //     cashUnitData = cashUnits[i].split("|");    //권종별 데이터를 '|' 구분자로 배열화
        //     localCashs[i].innerText = Number(cashUnitData[1]).toLocaleString(); //★ 권종별 시재 현황 입력
        // }
	}
}