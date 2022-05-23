/*************************************************************************************
    FileName			:	ATEC_10301.js
    Description			:	시재마감화면
    Created Date		:	2021.10.19
    Created By			:	ATEC AP, (손지민)
    Revision History	:	
             ver 1.0.0.0 (2021.10.12) - 최초작성 
             ver 1.0.0.1 (2021.11.08) - 메인처럼 파람값만 받아와서 그려주는 방식으로 변경
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (var i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "10301") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_10301(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
        break;
	}
}

function ATEC_10301(ind) {
    this.iname = $(cmArr[ind].xmlObj).attr("iname");

    let screenNumClass = {};
    screenNumClass.Data = $(cmArr[ind].xmlObj).attr("param2");
    screenNumClass.class = $(cmArr[ind].xmlObj).attr("param2Class");

    //10000000;50000|3796|3800;10000|0|1500;5000|500|1500;1000|500|1500;500|500|1500;100|500|1500;50|2500|1500;10|3000|1500;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기

    // xml 태그
    let hostAmount = document.querySelector(".hostAmountInput"); // 기기보유금액 dxt
    let localAmount = document.querySelector(".localAmountInput"); // 보충금액 dxt
    // let confirmBtn = document.querySelector(".confirm_btn");           // 확인 버튼
    //

    let mySection; //권종별 테이블 영역
    let myTable;   //권종별 테이블
    let label = ['오만원','만원','오천원','천원','오백원','백원','오십원','십원'];
    let myColor = ['#d8ae66','#d8ae66','#d8ae66','#d8ae66','#a7c3c4','#a7c3c4','#a7c3c4','#a7c3c4'];//권종별 그래프 색상
    let cashUnits = {};    //권종별 데이터만 담은 배열
    let cashUnitData = []; //권종별 금액 데이터

    
    //테이블 그려주기
    mySection = $(`<div class='amountTableSection'>
                        <div class='cashTable'>
                            <ul>
                                <li class='table_title'>
                                    <div class='title'></div>
                                    <div class='host'>단말시재</div>
                                    <div class='local'>기기시재</div>
                                    <div class='compare'></div>
                                </li>
                                <div class='cashWrap'>
                                    <div class='wrapTitle'>현금부</div>
                                    <ul></ul>
                                </div>
                                <div class='coinWrap'>
                                    <div class='wrapTitle'>동전부</div>
                                    <ul></ul>
                                </div>
                            </ul>
                        </div>
                </div>`);

    $("#cm"+ind).addClass(screenNumClass.class);//css를 위해 cm 태그에 화면번호 추가
    $("#cm"+ind).append(mySection); 

    // 라벨 데이터 갯수만큼 돌려 테이블 생성하기
    for(let i = 0; i < label.length; i++){
        label[i] = label[i].replace(/(.{1})/g,"$1 "); //라벨 데이터 양쪽 정렬을 위해 각 단어에 공백 추가
        create_cashTable_table(i);//테이블 내 li 생성
    }
   
    //테이블 내 li 생성 함수
    function create_cashTable_table(i){
        //각 권종별 li html
        myTable = $(`<li class='cashUnit'>
                        <div class='title'><span>${label[i]}</span></div>
                        <div class='host'><span> </span></div>
                        <div class='local'><span> </span></div>
                        <div class='compare'><span> </span></div>
                    </li>`);
        myTable.attr({"index":i});
        if(i < 4) {
            $(".cashTable > ul > .cashWrap > ul").append(myTable);
            myTable.addClass("cash");
        }else{
            $(".cashTable > ul > .coinWrap > ul").append(myTable);
            myTable.addClass("coin");
        }
    }
    //

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let cashUnit = document.querySelectorAll(".cashUnit");              //권종 li
    let inputHost = document.querySelectorAll(".host > span");          //해당 권종의 host 시재 입력칸
    let inputLocal = document.querySelectorAll(".local > span");        //해당 권종의 local 입력칸
    let inputCompare = document.querySelectorAll(".compare > span");    //해당 권종의 compare 입력칸
    let moneyUnit;   // 지폐인지 동전인지

    //전처리 데이터 가져오기
    let hostData = $(cmArr[0].xmlObj).attr("param"); // host Data 가져오기
    let localData = $(cmArr[1].xmlObj).attr("param");// local Data 가져오기
    let compareData = $(cmArr[2].xmlObj).attr("param");  // compare Data 가져오기

    let data = {};

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



	this.evt = function() {
        console.log("(전처리)evt 파라미터는 : ☞   " + evtParam + "   ☜ 잘넘어옴, iname" + this.iname);
        if(hostData !== "" && localData !== "") this.callF(evtParam);
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);      

        dataSet("host",hostData,hostAmount,inputHost);
        dataSet("local",localData,localAmount,inputLocal);
        dataSet("compare",compareData,"",inputCompare);
  
    }

    //전처리 데이터를 가져와 각 영역에 데이터 셋팅해주는 함수
    //name : 데이터 이름, mydata : 전처리 데이터 담긴 배열, inputArea : 데이터 입력 영역
    function dataSet(name,mydata,totalArea,inputArea){
        data[name] = [];                  // 데이터 배열 생성
        data[name].dataList = mydata;     // 데이터를 ';'구분자로 배열화
        data[name].totalCash = 0;         // 총 금액
        data[name].cashUnits = [];        // 권종별 데이터
        data[name].cashUnitData = [];     // 권종별 데이터를 '|'구분자로 배열화

        data[name].dataList = mydata.split(";"); //mydata를 ';'구분자로 배열화시키는 변수
        data[name].dataList = data[name].dataList.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
            return item !== '';
        })
        data[name].totalCash = Number(data[name].dataList[0]).toLocaleString();    //총금액 데이터
        data[name].cashUnits = name == "compare" ? data[name].dataList.slice(0,data[name].dataList.length) : data[name].dataList.slice(1,data[name].dataList.length);  //총금액, 회수함 데이터를 뺀 나머지 금액 데이터 
        
        if(name !== "compare") {
            totalArea.innerText = data[name].totalCash; //★ 총금액 시재 현황 입력
            for(let i = 0; i < data[name].cashUnits.length; i++){
                data[name].cashUnitData = data[name].cashUnits[i].split("|");    //권종별 데이터를 '|' 구분자로 배열화
                inputArea[i].innerText = Number(data[name].cashUnitData[1]).toLocaleString(); //★ 권종별 시재 현황 입력
            }   
        }else{
            for(let i = 0; i < data[name].cashUnits.length; i++){
                data[name].cashUnitData = data[name].cashUnits[i].split("|").map(Number);    //권종별 데이터를 '|' 구분자로 배열화
                let myCompare = data[name].cashUnitData[1] == 0 ? "일치" : "불일치";
                inputArea[i].innerText = myCompare;                // 권종별 잔량 현황 입력
                if(inputArea[i].innerText == "일치") {
                    inputArea[i].classList.add("yes");
                    inputArea[i].parentElement.parentElement.style.backgroundColor = "rgba(255,255,255,1)"
                }else if(inputArea[i].innerText == "불일치"){
                    inputArea[i].classList.add("no");
                    inputArea[i].parentElement.parentElement.style.backgroundColor = "rgba(255,180,180,0.2)"
                }
            }   
        }        
    }
}