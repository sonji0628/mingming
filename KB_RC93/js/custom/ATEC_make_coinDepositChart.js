/*************************************************************************************
	FileName			:	ATEC_make_coinDepositChart.js
	Description			:	메인화면
                            출금부 정보                           
	Created Date		:	2021.09.30
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
	if (cmArr[i].class == "make_coinDepositChart") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_make_coinDepositChart( Number(cmArr[i].index) ); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}


function ATEC_make_coinDepositChart(ind) {
    this.iname = $(cmArr[ind].xmlObj).attr("iname");

    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));


    //evtParam DATA: 동전입금액;권종1|최대1|잔량1;………권종8최대8|잔량8;
    //sendMsg`CoinDepInfo`2000000;500|1500|0;100|2500|200;50|3000|50;10|3500|100;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let arrList;                                       //파라미터값을 ';'구분자로 배열화시키는 변수

    let mySection; // 동전 입금부 영역
    let myChart;   // 동전 입금부 차트

    let label = ['오백원','백원','오십원','십원'];//금액별 이름 배열
    let myGraphColor = ['#a7c3c4','#a7c3c4','#a7c3c4','#a7c3c4'];//권종별 그래프 색상

    let myStateInfoArea;//금액 현황 영역
    let myChartArea;    //차트영역

 
    //전처리 함수
	this.evt = function() {
        //출금부 영역 html
        mySection = $(`<div id='depositArea'>
                            <div class='info'>
                                <div class='sectionTitle'>
                                    <p>동전 입금부 현황</p>
                                </div>
                                <div class='myMoneyState'>
                                    <ul>
                                        <li class='myMoneyState_option'>
                                            <span class='title'>동전 입금액</span>
                                            <span class='money'></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class='myChart'>
                                <ul></ul>
                            </div>
                        </div>`);
        
        mySection.css({
            "top" : this.top + "px",
            "left" : this.left + "px",
            "width" : this.width + "px",
            "height" : this.height + "px",
        })
        $("#cm"+ind).append(mySection); 

        myStateInfoArea =  document.querySelector("#depositArea > div.info > div.myMoneyState > ul");//금액 현황 영역
        myChartArea =  document.querySelector("#depositArea > div.myChart > ul");//차트영역

        for(let i = 0; i < label.length; i++){
            create_chart(i);
        }

        // 리스트바 div 설정
        function create_chart(i){
            myChart = $(`<li>
                            <div class='myGraph'>
                                <div class='myGraph_bar' style='background:${myGraphColor[i]};'></div>
                            </div> 
                            <div class='myStateText'>
                                    <p class='myName' style='color:${myGraphColor[i]};'>${label[i]}</p>
                                    <p class='myData'> - </p>
                            </div>
                        </li>`);
            myChart.attr({ 'id': 'myChart' + i, 'class': 'graph', 'index':i});
            myChart.css({                                                            
                'display' : 'flex',
                'flex-direction' : 'column',
                'justify-content' : 'space-between',
                'align-items' : 'center',
                'width' : 100 / label.length + '%'
            });
            
            $(myChartArea).append(myChart);
            
        }
        this.callF(evtParam);
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);
        arrList = gab.split(";"); //gab을 ';'구분자로 배열화시키는 변수
        arrList = arrList.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
            return item !== '';
        })
        
        let depositCashArea = myStateInfoArea.querySelectorAll(".myMoneyState_option > .money"); //입금가능 금액 현황 입력할 영역
        let myRemain = myChartArea.querySelectorAll("li > div.myStateText > p.myData");         //잔량 영역
        let depositCash = Number(arrList[0]).toLocaleString();       //동전입금액 데이터
        let myChartData =  arrList.slice(1,arrList.length);          //입금액을 뺀 나머지 금액 데이터들
        let myMoneyDataArr;                                          //권종별 데이터만 담은 배열
        let myMoney;                                                 //권종별 금액 데이터
        let myGraphheight;                                           //권종별 그래프 높이값

        if("" != gab) {
            depositCashArea[0].innerText = depositCash;       //★ 동전입금액 현황 입력
            for(let i = 0; i < myChartData.length; i++){
                dataSet(i)
            }
            
            function dataSet(i){
                myMoneyDataArr = myChartData[i].split("|");
                myRemain[i].innerText = myMoneyDataArr[2];          //★ 권종별 잔량 현황 입력
                myMoney = (myMoneyDataArr[0] * myMoneyDataArr[2])/10000;
                myGraphheight = Math.round(myMoneyDataArr[2] / myMoneyDataArr[1] * 100);//권종별 그래프 세로값 백분율 정수 계산
                myChartArea.querySelector("li#myChart" + i + " > div.myGraph > div.myGraph_bar").animate([
                    {'transform':'translateY(70px) scaleY(1)'},
                    {'transform':'translateY(70px) scaleY(' + (myGraphheight/10) + ')'}
                ],{
                    duration: 1500,
                    fill: "forwards"
                });//★ 권종별 그래프 현황 셋팅
            }
        }
    }         
}