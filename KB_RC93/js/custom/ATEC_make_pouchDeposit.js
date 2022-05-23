/*************************************************************************************
	FileName			:	ATEC_make_pouchDeposit.js
	Description			:	메인화면
                            봉투입금액 정보                           
	Created Date		:	2021.11.01
	Created By			:	ATEC AP, 손지민
	Revision History	:	
         ver 1.0.0.0 - 최초작성
**************************************************************************************/


/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";
for (var i = 0; i < cmArr.length; i++) {
	if (cmArr[i].class == "make_pouchDeposit") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_make_pouchDeposit( Number(cmArr[i].index) ); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}


function ATEC_make_pouchDeposit(ind) {
    this.iname = $(cmArr[ind].xmlObj).attr("iname");

    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));


    //evtParam DATA: 봉투입금금액
    //Data = 2000000
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let arrList;  
    let mySection; // 지폐/동전 출금부 영역
    let myMoneyArea;//금액입력영역

    //전처리 함수
	this.evt = function() {
        //출금부 영역 html
        mySection = $(`<div id='pouchArea'>
                            <div class='sectionTitle'>
                                <p >봉투입금금액</p>
                            </div>
                            <div class='myMoneyState_option'>
                                <span class='money'></span>
                            </div>
                        </div>`);
        
        mySection.css({
            "top" : this.top + "px",
            "left" : this.left + "px",
            "width" : this.width + "px",
            "height" : this.height + "px",
            "display":"flex",
            "justify-content":"space-between"
        })
        $("#cm"+ind).append(mySection); 

        myMoneyArea = document.querySelector('#pouchArea > .myMoneyState_option > span.money');
        this.callF(evtParam);
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);

        if(gab.indexOf(";") !== -1) gab = gab.replace(/\;/g,'');
        if("" !== gab) myMoneyArea.innerText = Number(gab).toLocaleString();
    }         
}