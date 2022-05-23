/*************************************************************************************
    FileName			:	ATEC_makeTable.js
    Description			:	테이블 생성
    Created Date		:	2021.10.19
    Created By			:	ATEC AP, (손지민)
    Revision History	:	
             ver 1.0.0.0 (2021.10.12) - 최초작성 
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (var i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "makeTable") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_makeTable(Number(cmArr[i].index), cmArr[i].screenNumber); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_makeTable(ind, myPageNum) {
    this.iname = $(cmArr[ind].xmlObj).attr("iname");
    
    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));

    //50000|2|100000;10000|2|100000;5000|5|25000;1000|10|10000;500|2|1000;100|0|0;50|0|0;10|0|0;
    //DATA : 권종1|매수1|금액1;권종2|매수2|금액2;…….권종8|매수8|금액8;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let cashUnits; //파라미터값을 ';'구분자로 배열화시키는 변수
    let cashUnitData = {};    //권종별 데이터만 담은 배열

    let mySection; //권종별 테이블 영역
    let myTable;   //권종별 테이블
    let label = ['오 만 원','만 원','오 천 원','천 원','오 백 원','백 원','오 십 원','십 원'];
    let myColor = ['#d8ae66','#d8ae66','#d8ae66','#d8ae66','#a7c3c4','#a7c3c4','#a7c3c4','#a7c3c4'];//권종별 그래프 색상
    

    
    //테이블 그려주기
    mySection = $(`<div id='tableSection'>
                        <div class='cashTable'>
                            <ul>
                            </ul>
                        </div>
                </div>`);
    mySection.find("div > ul").css({
        "width" : this.width + "px",
        "height" : this.height + "px",
    })
    $("#cm"+ind).append(mySection); 

    // 라벨 데이터 갯수만큼 돌려 테이블 생성하기
    for(let i = 0; i < label.length; i++){
        create_cashTable_table(i);//테이블 내 li 생성
    }
   
    //테이블 내 li 생성 함수
    function create_cashTable_table(i){
        //각 권종별 li html
        myTable = $(`<li class='cashUnit'>
                        <div class='title'>
                            <div class='background'>
                                <span class='bar' style='background:${myColor[i]}'></span>
                                <span class='bg' style='background:${myColor[i]}'></span>
                            </div>
                            <span>${label[i]}</span>
                        </div>
                        <div class='Paper'><span>0</span></div>
                        <div class='money'><span>0</span></div>
                    </li>`);
        myTable.attr({"index":i});
        $(".cashTable > ul").append(myTable);
    }
    //

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let cashUnit = document.querySelectorAll(".cashUnit");                                   //권종 li
    let paper = document.querySelectorAll(".Paper > span");          //해당 권종의 잔량 매수 div의 입력칸
    let money = document.querySelectorAll(".money > span");          //해당 권종의 보추 후 잔량 매수 div의 입력칸
    let moneyUnit;   // 지폐인지 동전인지

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	this.evt = function() {
        console.log("(전처리)evt 파라미터는 : ☞   " + evtParam + "   ☜ 잘넘어옴, iname" + this.iname);
        this.callF(evtParam);
        
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);      
        
        if("" != gab) {
            
            cashUnits = gab.split(";"); //gab을 ';'구분자로 배열화시키는 변수
            cashUnits = cashUnits.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
                return item !== '';
            })  
            // 데이터 셋팅
            for(let i = 0; i < cashUnits.length; i++){
                cashUnitData = cashUnits[i].split("|").map(Number);    //권종별 데이터를 '|' 구분자로 배열화
                moneyUnit = cashUnitData[0] >= 1000 ? cashUnit[i].classList.add("cash") : cashUnit[i].classList.add("coin");   // 지폐인지 동전인지
                paper[i].textContent = cashUnitData[1];     // 권종별 매수 셋팅
                money[i].innerText = cashUnitData[2].toLocaleString();     // 권종별 금액 셋팅
            }
        }
  
    }
}