/*************************************************************************************
    FileName			:	SMC_20001_withdrawChart.js
    Description			:	smc 현금,동전 출금부 데이터
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
	if(cmArr[i].class == "20001_withdrawChart") { //요기 바꿔주고
		cmArr[i].jsObj = new SMC_20001_withdrawChart(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function SMC_20001_withdrawChart(ind) {
	this.iname = $(cmArr[ind].xmlObj).attr("iname");

    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));


    //evtParam DATA: 현금출금가능금액;동전출금가능금액;리젝함건수;권종1|최대1|잔량1;………권종8최대8|잔량8;
    //sendMsg`WithdInfo`99000000;2000000;100;50000|3800|1000;10000|3800|2000;5000|1500|300;1000|1500|200;500|1500|0;100|2500|200;50|3000|50;10|3500|100;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let arrList;                                       //파라미터값을 ';'구분자로 배열화시키는 변수

    let mySection; // 지폐/동전 출금부 영역
    let myChart;   // 지폐/동전 출금부 차트

    let label = ['오만원','만원','오천원','천원','오백원','백원','오십원','십원'];//금액별 이름 배열
    let myGraphColor = ['#d8ae66','#d8ae66','#d8ae66','#d8ae66','#a7c3c4','#a7c3c4','#a7c3c4','#a7c3c4'];//권종별 그래프 색상

    let myChartArea;    //차트영역
    let rejectArea;     //리젝 영역
    let myStateInfoArea;//금액 현황 영역
    
 
    //전처리 함수
	this.evt = function() {
        //출금부 영역 html
        mySection = $(`<div id='withdrawArea' class='smc20001'>
                            <div class='myChartArea'>
                                <ul class='cash'>
                                    <div class='title'>현금부</div>
                                </ul>
                                <ul class='coin'>
                                    <div class='title'>동전출금부</div>
                                </ul>
                            </div>
                            <div class='myMoneyData'>
                                <div class='totalCash'>현금 입출금부 : <span></span> 원</div>
                                <div class='totalCoin'>동전 출금부 : <span></span> 원</div>
                                <div class='totalMoney'>출금 가능 합계 : <span></span> 원</div>
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
            create_chart(i);
        }

        $('#withdrawArea > div.myChartArea > .cash').append(`<div class='reject'>리젝함 <span></span></div>`);   

        // 리스트바 div 설정
        function create_chart(i){
            myChart = $(`<li>
                            <p class='myName'>${label[i]}</p>
                            <div class='myGraph'>
                                <div class='myGraph_bar' style='background:${myGraphColor[i]};'></div>
                            </div> 
                            <p class='myData'> - </p>
                        </li>`);
            myChart.attr({ 'id': 'myChart' + i, 'class': 'graph horizontal', 'index':i});
            myChart.css({                                                            
                'display' : 'flex',
                'justify-content' : 'space-between',
                'align-items' : 'center',
            });
            if(i < 4) $('#withdrawArea > div.myChartArea > .cash').append(myChart);
            else      $('#withdrawArea > div.myChartArea > .coin').append(myChart);      
        }



        myChartArea =  document.querySelector("#withdrawArea > div.myChartArea");//차트영역
        myStateInfoArea =  document.querySelector("#withdrawArea > div.myMoneyData");//금액 현황 영역
        rejectArea = myChartArea.querySelector(".cash > div.reject");//리젝함 영역



        this.callF(evtParam);
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);
        arrList = gab.split(";"); //gab을 ';'구분자로 배열화시키는 변수
        arrList = arrList.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
            return item !== '';
        })
        
        let totalMoney = Number(arrList[0]) + Number(arrList[1])
        let withdrawTotalCashArea = myStateInfoArea.querySelectorAll("div > span"); //출금가능 금액 현황 입력할 영역
        let myRemain = myChartArea.querySelectorAll("li > p.myData");         //잔량 영역
        let withdrawTotalCash = totalMoney.toLocaleString(); //총 출금 가능 금액 데이터
        let cashTotal = Number(arrList[0]).toLocaleString();         //현금 출금 가능 금액 데이터
        let coinTotal = Number(arrList[1]).toLocaleString();         //동전 출금 가능 금액 데이터
        let myChartData =  arrList.slice(3,arrList.length);          //총금액 뺀 나머지 금액 데이터들
        let myMoneyDataArr;                                          //권종별 데이터만 담은 배열
        let myMoney;                                                 //권종별 금액 데이터
        let myGraphWidth;                                           //권종별 그래프 높이값
        

        if("" != gab) {
            
            withdrawTotalCashArea[0].innerText = cashTotal;         //★ 현금부 입출금가능금액 현황 입력
            withdrawTotalCashArea[1].innerText = coinTotal;         //★ 동전부 출금가능금액 현황 입력
            withdrawTotalCashArea[2].innerText = withdrawTotalCash; //★ 총 출금가능금액 현황 입력
            rejectArea.children[0].innerText = arrList[2];          //★ 리젝함 건수 입력

            for(let i = 0; i < myChartData.length; i++){
                dataSet(i)
            }
            
            function dataSet(i){
                myMoneyDataArr = myChartData[i].split("|");
                myRemain[i].innerText = myMoneyDataArr[2];          //★ 권종별 잔량 현황 입력
                myMoney = (myMoneyDataArr[0] * myMoneyDataArr[2])/10000;
                myGraphWidth = Math.round(myMoneyDataArr[2] / myMoneyDataArr[1] * 100) * 2;//권종별 그래프 세로값 백분율 정수 계산
                myChartArea.querySelector("li#myChart" + i + " > div.myGraph > div.myGraph_bar").animate([
                    {'width':'10px'},
                    {'width': myGraphWidth + 'px'}
                ],{
                    duration: 1500,
                    fill: "forwards"
                });//★ 권종별 그래프 현황 셋팅
            }
        }
    }
}