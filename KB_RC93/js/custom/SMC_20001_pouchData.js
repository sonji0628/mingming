/*************************************************************************************
    FileName			:	ATEC_20001_pouchData.js
    Description			:	smc 봉투 입금 데이터
    Created Date		:	2021.10.28
    Created By			:	ATEC AP, (손지민)
    Revision History	:	
             ver 1.0.0.0 (2021.10.28) - 최초작성 
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (var i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "20001_pouchData") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_20001_pouchData(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_20001_pouchData(ind) {
	this.iname = $(cmArr[ind].xmlObj).attr("iname");

    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));


    //evtParam DATA: 봉투입금총금액; 권종1|최대1|잔량1;………권종8최대8|잔량8;
    //DATA : 99000000;50000|3800|1000;10000|3800|2000;5000|1500|300;1000|1500|200;500|1500|0;100|2500|200;50|3000|50;10|3500|100;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let arrList;                                       //파라미터값을 ';'구분자로 배열화시키는 변수

    let mySection; // 지폐/동전 출금부 영역
    let myData;   // 지폐/동전 출금부 차트

    let label = ['오만원','만원','오천원','천원','오백원','백원','오십원','십원'];//금액별 이름 배열
    let unitData;   //동전들 각 갯수 영역
    let totalData;  //봉투입금함 총금액 영역
    
 
    //전처리 함수
	this.evt = function() {
        //출금부 영역 html
        mySection = $(`<div id='pouchData' class='smc20001'>
                            <div class='myMoneyData'>
                                <div class='titleArea'>
                                    <div class='title'>봉투입금함</div>
                                    <div class='totalData'></div>
                                </div>
                                <ul class='cash'></ul>
                                <ul class='coin'></ul>
                            </div>
                        </div>`);
                        
        mySection.css({
            "top" : this.top + "px",
            "left" : this.left + "px",
            "width" : this.width + "px",
            "height" : this.height + "px",
        })
        $("#cm"+ind).append(mySection); 


        for(let i = 0; i < label.length; i++){
            create_data(i);
        }
        
        // 리스트바 div 설정
        function create_data(i){
            myData = $(`<li>
                            <p class='myName'>${label[i]}</p>
                            <p class='myData'> - </p>
                        </li>`);
            myData.attr({ 'id': 'myChart' + i, 'index':i});
            myData.css({                                                            
                'display' : 'flex',
                'justify-content' : 'space-between',
                'align-items' : 'center',
            });
            if(i < 4) $('.myMoneyData > .cash').append(myData);
            else      $('.myMoneyData > .coin').append(myData);   
            
        }

        unitData = document.querySelectorAll("#pouchData > .myMoneyData > ul > li > p.myData");//각 동전 갯수 영역
        totalData = document.querySelector("#pouchData > .myMoneyData > .titleArea > .totalData");

        this.callF(evtParam);
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);

        if("" == gab) return


        arrList = gab.split(";"); //gab을 ';'구분자로 배열화시키는 변수
        arrList = arrList.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
            return item !== '';
        })

        let myDataArr = arrList[1].split("|"); //금액 데이터만 담은 배열

        totalData.innerText = Number(arrList[0]).toLocaleString();       //봉투입금함 금액 데이터
        for(let i = 0; i < myDataArr.length; i++){
            unitData[i].innerText = myDataArr[i];
        }

    }
}