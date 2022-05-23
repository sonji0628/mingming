/*************************************************************************************
    FileName			:	ATEC_20001_depositData.js
    Description			:	smc 동전 입금부 데이터
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
	if(cmArr[i].class == "20001_depositChart") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_20001_depositChart(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_20001_depositChart(ind) {
	this.iname = $(cmArr[ind].xmlObj).attr("iname");

    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));


    //evtParam DATA: 권종1|최대1|잔량1;………권종4최대4|잔량4;
    //sendMsg`WithdInfo`500|1500|0;100|2500|200;50|3000|50;10|3500|100;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let arrList;                                       //파라미터값을 ';'구분자로 배열화시키는 변수

    let mySection; // 동전 입금부 영역
    let myData;   // 동전 입금부 차트

    let label = ['오백원','백원','오십원','십원'];//금액별 이름 배열

    let myChartArea;    //차트영역
    let myStateInfoArea;//금액 현황 영역
    let totalCoin;      //동전 총 갯수 영역
    let coinUnitData;   //동전들 각 갯수 영역
    
 
    //전처리 함수
	this.evt = function() {
        console.log("???")
        //출금부 영역 html
        mySection = $(`<div id='depositArea' class='smc20001'>
                            <div class='myChartArea'>
                                <div class='title'>동전입금부</div>
                                <div id="myChart0" class="graph horizontal" style="display:flex;justify-content:space-between;align-items:center">
                                    <p class='myName'>동전</p>
                                    <div class='myGraph'>
                                        <div class='myGraph_bar' style='background:#a7c3c4'></div>
                                    </div> 
                                    <p class='myData'> - </p>
                                </div>
                            </div>
                            <div class='myMoneyData'>
                            </div>
                        </div>`);
                        
        mySection.css({
            "top" : this.top + "px",
            "left" : this.left + "px",
            "width" : this.width + "px",
            "height" : this.height + "px",
        })
        $("#cm"+ind).append(mySection); 

        
        
        myChartArea =  document.querySelector("#depositArea > div.myChartArea");//차트영역
        myStateInfoArea =  document.querySelector("#depositArea > div.myMoneyData");//금액 현황 영역

        for(let i = 0; i < label.length; i++){
            create_data(i);
        }
        
        // 리스트바 div 설정
        function create_data(i){
            myData = $(`<div>
                            <span class='myName'>${label[i]}</span>
                            <span class='myData'> - </span>
                        </div>`);
            myData.attr('class','coinUnitData')
            $(myStateInfoArea).append(myData);            
        }
        totalCoin = myChartArea.querySelector(".graph > p.myData");//총 동전 갯수 영역
        coinUnitData = myStateInfoArea.querySelectorAll("div.coinUnitData > span.myData");//각 동전 갯수 영역
        this.callF(evtParam);
    };
    
    this.callF = function(gab) { //후처리 함수
        
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);
        arrList = gab.split(";"); //gab을 ';'구분자로 배열화시키는 변수
        arrList = arrList.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
            return item !== '';
        })

        let myChartData; //각 동전 데이터들
        let myGraphWidth;                                           //권종별 그래프 높이값
        let maxMoneySum = 0;
        let totalMoneySum = 0;


        if("" != gab) {
            for(let i = 0; i < arrList.length; i++){
                myChartData =  arrList[i].split("|").map(Number);          //총금액 뺀 나머지 금액 데이터들
                maxMoneySum += myChartData[1];
                totalMoneySum += myChartData[2];
                coinUnitData[i].innerText = myChartData[2];
            }

            //동전그래프
            totalCoin.innerText = totalMoneySum;
            myGraphWidth = Math.round(totalMoneySum / maxMoneySum * 100) * 2;//권종별 그래프 세로값 백분율 정수 계산
            myChartArea.querySelector("div#myChart0 > div.myGraph > div.myGraph_bar").animate([
                {'width':'10px'},
                {'width': myGraphWidth + 'px'}
            ],{
                duration: 1500,
                fill: "forwards"
            });//★ 동전 그래프 현황 셋팅

        }
    }
}