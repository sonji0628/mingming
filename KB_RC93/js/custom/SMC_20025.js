/*************************************************************************************
    FileName			:	ATEC_20025.js
    Description			:	smc 카세트 COUNTER SET 데이터
    Created Date		:	2021.10.28
    Created By			:	ATEC AP, (손지민)
    Revision History	:	
             ver 1.0.0.0 (2021.10.28) - 최초작성 
             ver 1.0.0.1 (2021.11.05) - 전처리만 가능. 후처리로하면  coinMaxData 값을 못가져옴
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (var i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "20025") { //요기 바꿔주고
		cmArr[i].jsObj = new SMC_20025(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function SMC_20025(ind) {
	this.iname = $(cmArr[ind].xmlObj).attr("iname");

    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));

    let allCoinBtn = document.querySelector("#btn1");                  // 전체 방출 버튼
    let tenInput = document.querySelector(".ten_input");               // 텐키 인풋 박스
    let coinMaxData = Number($(cmArr[0].xmlObj).attr("param"));        // 동전 방출 최대값 가져오기

    //evtParam DATA: 권종1|잔량1;………권종8잔량8;
    //sendMsg`WithdInfo`50000|20;10000|14;5000|0;1000|20;500|0;100|0;50|10;10|0;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let arrList;                                       //파라미터값을 ';'구분자로 배열화시키는 변수
    let cashUnitData;                                  //arrList를 '|'구분자로 배열화 시키는 변수

    let mySection; //권종별 테이블 영역
    let myTable;   //권종별 테이블

    let label = ['오만원','만원','오천원','천원','오백원','백원','오십원','십원'];//금액별 이름 배열
    let myMoneyData;    //현재금액 데이터

    //테이블 그려주기
    mySection = $(`<div id='mySection' class='smc20025'>
                    <div class='cashTable'>
                        <ul>
                            <li class='table_title'>
                                <div class='title'></div>
                                <div class='nowAmount'>기존수량</div>
                                <div class='newAmount'>변경수량</div>
                            </li>
                            <div class='cashWrap'></div>
                            <div class='coinWrap'></div>
                        </ul>
                    </div>
                </div>`);
    $(mySection).find(".cashTable > ul").css({
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
        myTable = $(`<li class='cashUnit' dimd='0'>
                    <div class='title'><span>${label[i]}</span></div>
                    <div class='nowAmount'><span> </span></div>
                    <div class='newAmount'><span> </span></div>
                </li>`);
        myTable.attr({"index":i});
        $(".cashTable > ul").append(myTable);
    }
    //


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let cashUnit = document.querySelectorAll(".cashUnit");               //권종 li
    let nowAmount = document.querySelectorAll(".nowAmount > span");      //해당 권종의 현재 매수 div의 입력칸
    let newAmount = document.querySelectorAll(".newAmount > span");      //해당 권종의 입력 매수 div의 입력칸
    let cashWrap = document.querySelector(".cashWrap");
    let coinWrap = document.querySelector(".coinWrap");
    let moneyUnit;   // 지폐인지 동전인지
    
    //선택 된 권종 데이터 저장 변수
    let selectAmount;    // 현재 매수 저장
    let selectMoney;     // 이름 저장
    let selectIndexNum;  // 인덱스 번호 저장
    let selectFlag = false; // 리스트 선택 플래그

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
    //전처리 함수
	this.evt = function() {
        this.callF(evtParam);
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);
        if("" != gab) {
            arrList = gab.split(";"); //gab을 ';'구분자로 배열화시키는 변수
            arrList = arrList.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
                return item !== '';
            })  

            // 데이터 셋팅
            for(let i = 0; i < arrList.length; i++){
                cashUnitData = arrList[i].split("|").map(Number);    //권종별 데이터를 '|' 구분자로 배열화
                myMoneyData = cashUnitData[0] * cashUnitData[1]
                dataSet(i);
                cashUnit[i].addEventListener("click",selectListClick);
            }

            //캐쉬, 코인 구분하여 div 이동
            let cashEle = document.querySelectorAll('.cash');
            let coinEle = document.querySelectorAll('.coin');
            cashEle.forEach(element => cashWrap.appendChild(element));
            coinEle.forEach(element => coinWrap.appendChild(element));
            //
        }
    }

    //데이터 셋팅 함수
    function dataSet(i){
        nowAmount[i].innerText = cashUnitData[1];              // 권종별 매수 현황 입력
        newAmount[i].innerText = cashUnitData[1];  // 권종별 금액 현황 입력

        cashUnit[i].setAttribute("myAmount",cashUnitData[1]);      //권종 별 현재 매수 속성 추가
        cashUnit[i].setAttribute("myMoney",cashUnitData[0]);       //권종 별 권종 금액 속성 추가
        moneyUnit = cashUnitData[0] >= 1000 ? cashUnit[i].setAttribute("myMoneyUnit","cash") : cashUnit[i].setAttribute("myMoneyUnit","coin");   // 지폐인지 동전인지
        moneyUnit = cashUnitData[0] >= 1000 ? cashUnit[i].classList.add("cash") : cashUnit[i].classList.add("coin");   // 지폐인지 동전인지
    }

    // 권종별 리스트 선택 이벤트
    function selectListClick(){
        let mybtn = this;

        //리스트 전체 스타일 초기화
        cashUnit.forEach(element => element.style.background = "#fff");
        cashUnit.forEach(element => element.style.color = "#545045");

        if (!eventFlag && $(mybtn).attr('dimd') != '1'){ //다른게 눌리지 않아야지 됨, 딤드된 버튼은 눌리지 않아야지 됨            
            selectFlag = true;
            btnAni(mybtn);// 버튼 소리 함수
            ws_send("K[10]");

            mybtn.style.background = "#ffcc00";              //선택된 리스트 스타일추가
            mybtn.style.color = "#000";                      //선택된 리스트 스타일추가

            selectAmount = $(mybtn).attr("myAmount");        //눌린 권종의 현재매수
            selectMoney = $(mybtn).attr("myMoney");          //눌린 권종의 금액
            selectIndexNum = Number($(mybtn).attr("index")); //눌린 권종의 인덱스

            tenClass.tmpGab = ""                                        //매번 새로 입력 되게
            tenInput.innerText = newAmount[selectIndexNum].innerText; //입력창엔 원래 입력했던 값 넣어는 줌

            //텐키 인풋박스에 단위 써주기
            if(mybtn.getAttribute("mymoneyunit") == "cash") $(".smcTenInput").attr('data-content',' 매');
            else                                            $(".smcTenInput").attr('data-content',' 개');

            //텐키 전체 딤드 해제
            tenClass.allDimd(0);
            tenClass.tendimded(9,"0");
            tenClass.tendimded(11,"0");
            //  
        }
    }



    //텐키 입력 시 데이터 셋팅 함수
    function inputDataSet(input){   
        //0 중복금지, 텐키 첫번째 글자가 0일 경우 삭제 및 텐키딤드제어
        if(tenClass.tmpGab.length !== 1 && tenClass.tmpGab.substr(0,1) == "0") {
            tenClass.tmpGab = tenClass.tmpGab.substr(1,1);
            tenInput.innerText = tenClass.tmpGab;
            if((tenClass.tmpGab*1) == 0) tenClass.tmpGab = 0;    
            
            if (tenClass.tmpGab.length >= tenClass.maxGab) tenClass.allDimd("1");
            else {
                tenClass.allDimd("0");
                tenClass.tendimded(9,"0");
                tenClass.tendimded(11,"0");
            }
        }
        //
        
        //입력 값 셋팅
        if(selectFlag){
            if(coinMaxData > selectAmount && Number(tenClass.tmpGab) > selectAmount){ //권종의 현재 수량보다 방출 수량이 클 수 없음
                tenClass.tmpGab = selectAmount.toString();
                tenInput.innerText = selectAmount.toString();
            }else if(coinMaxData < selectAmount && Number(tenClass.tmpGab) > coinMaxData) { // 최대값보다 방출 수량이 클 수 없음
                tenClass.tmpGab = coinMaxData.toString();
                tenInput.innerText = coinMaxData.toString();
            }
            newAmount[selectIndexNum].innerText =  Number(tenClass.tmpGab); 
        }
       //confirmDimdSet();
       //리턴값 셋팅
       tenObj.outReturnG = returnSet();
       tenClass.confirmDimd(0);
    }

    // 모두 0 매 가능함 딤드체크 안하는걸로
    // 선택방출 버튼 딤드 이벤트
    // function confirmDimdSet(){
    //     let temp = 0;
    //     newAmount.forEach((element) => temp += Number(element.innerText));
    //     if(temp !== 0) tenClass.confirmDimd(0);
    //     else tenClass.confirmDimd(1);
    // }

    function returnSet(){
        //리턴값 셋팅
        let returnSet;
        let sumReturn = "";
        for(let i = 0; i < cashUnit.length; i++){
            returnSet = cashUnit[i].getAttribute("mymoney") + "=" + newAmount[i].innerText + ";";
            sumReturn += returnSet;
        }

        return sumReturn
    }


    // 텐키 연동
    this.tenCall = function(input){
        console.log('들어옴==============',input);
        if(!selectFlag) tenClass.cal('allBtnDimed',tenClass.dxtIndex);
        inputDataSet(input);
    }
}