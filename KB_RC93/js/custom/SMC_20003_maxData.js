/*************************************************************************************
    FileName			:	ATEC_20003_maxData.js
    Description			:	smc 동전 방출 최대값 데이터
    Created Date		:	2021.11.03
    Created By			:	ATEC AP, (손지민)
    Revision History	:	
             ver 1.0.0.0 (2021.11.03) - 최초작성 
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (var i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "20003_maxData") { //요기 바꿔주고
		cmArr[i].jsObj = new SMC_20003_maxData(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function SMC_20003_maxData(ind) {
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
 
    //전처리 함수
	this.evt = function() {
        console.log("★(전처리)callF 파라미터는 : ☞   " + evtParam + "   ☜ 잘넘어옴, iname" + this.iname);
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);
    }

}