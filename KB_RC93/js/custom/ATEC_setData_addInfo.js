/*************************************************************************************
	FileName			:	ATEC_setData_addInfo.js
	Description			:	메인화면
                            자세히보기 팝업 데이터 셋팅                           
	Created Date		:	2021.11.01
	Created By			:	ATEC AP, 손지민
	Revision History	:	
         ver 1.0.0.0 - 최초작성
         ver 1.0.0.0 - 데이터만 받고  make_moneyState에서 그려줌
**************************************************************************************/


/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (var i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "setData_addInfo") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_setData_addInfo(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_setData_addInfo(ind) {
    this.iname = $(cmArr[ind].xmlObj).attr("iname");

    //evtParam DATA: 총금액;회수함매수;권종1|금액1;권종2|금액2;……권종8|금액8;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    // let arrList;//파라미터값을 ';'구분자로 배열화시키는 변수
    
	this.evt = function() {
        //if (evtParam != "") this.callF(evtParam);
    }
    
    
	this.callF = function (gab) {
	}
}