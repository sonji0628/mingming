/*
	특수화면 (custom script) 작성을 위한 template 입니다.
	아래의 예시를 참고로 cumstom script 를 작성하세요
*/


/*************************************************************************************
    FileName			:	ATEC_test.js
    Description			:	함수 기능 설명
    Created Date		:	2021.xx.xx
    Created By			:	ATEC AP, (zzz)
    Revision History	:	
             ver 1.0.0.0 (2021.xx.xx) - 최초작성 
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

/////////////////////////////////////////////////////////////////////////////
// CASE 1 - 화면번호가 필요없는 경우 (일반적인 경우)
/////////////////////////////////////////////////////////////////////////////
for (var i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "test") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_test(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_test(ind) {
	this.evt = function() {

		//this.callF(evtParam);
    }

	this.callF = function (gab) {
        const jsonObj = JSON.parse(gab);
	}
}


/////////////////////////////////////////////////////////////////////////////
// CASE - 2 화면번호가 필요한 경우
/////////////////////////////////////////////////////////////////////////////
for (var i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "test") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_2057( Number(cmArr[i].index), cmArr[i].screenNumber ); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_test(ind, screenNumber) {
	this.evt = function() {

		//this.callF(evtParam);
    }

	this.callF = function (gab) {
        const jsonObj = JSON.parse(gab);
	}
}
