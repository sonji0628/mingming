/*************************************************************************************
    FileName			:	makeList10406.js
    Description			:	가로형 리스트 생성
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
	if(cmArr[i].class == "makeList10406") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_makeList10406(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_makeList10406(ind) {
    this.iname = $(cmArr[ind].xmlObj).attr("iname");
    
    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));

    let screenNumClass = {};
    screenNumClass.Data = $(cmArr[ind].xmlObj).attr("param2");
    screenNumClass.class = $(cmArr[ind].xmlObj).attr("param2Class");
    $("#cm"+ind).addClass(screenNumClass.class);//css를 위해 cm 태그에 화면번호 추가

    //1234567|2021.05.01|2021.10.01|2021.09.22|2021.09.01|Y|;1234567|2021.05.01||2021.09.22||N|직접삭제;1234567|2021.05.01|2021.10.01|2021.09.22|2021.09.01|N|기간초과;1234567|2021.05.01|2021.10.01|||Y|;
    //DATA : 사원번호|최초등록일|최종접속일|재등록일|삭제일|사용여부|삭제사유;  ……
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let arrList; //파라미터값을 ';'구분자로 배열화시키는 변수
    let listData;//파라미터값을 '|'구분자로 배열화시키는 변수

    let listSection; //리스트 영역
    let mySection; //리스트 열 영역
    let myList;    //데이터별 리스트
    let fingerList;//리스트 내 데이터별 라인

    listSection = $(`<div id='fingerDBSection'>
                        <div class='fingerDBList'>
                            <ul class='title'>
                                <li class='list_title'>
                                    <div class='listNum'>No</div>
                                    <div class='idNum'>직원번호</div>
                                    <div class='firstDay'>최초등록일</div>
                                    <div class='lastDay'>최종접속일</div>
                                    <div class='reRegister'>재등록일</div>
                                    <div class='removeDay'>삭제일</div>
                                    <div class='useInfo'>사용여부</div>
                                    <div class='removRreason'>삭제사유</div>
                                </li>
                            </ul>
                            <ul class='data'></ul>
                        </div>
                    </div>`);
    listSection.css({
        "top" : this.top + "px",
        "left" : this.left + "px",
        "width" : this.width + "px",
        "height" : this.height + "px",
    })
    $("#cm"+ind).append(listSection);

	this.evt = function() {
        console.log("(전처리)evt 파라미터는 : ☞   " + evtParam + "   ☜ 잘넘어옴, iname" + this.iname);
        this.callF(evtParam);
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);      
        
        if("" != gab) {
            arrList = gab.split(";"); //gab을 ';'구분자로 배열화시키는 변수
            arrList = arrList.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
                return item !== '';
            })  
            

            //데이터 갯수만큼 돌려 리스트 생성하기
            for(let i = 0; i < arrList.length; i++){
                listData = arrList[i].split("|"); //gab을 '|'구분자로 배열화시키는 변수

                create_fingerList(i);// 리스트 만들기

                // 리스트 별 딤드셋팅 및 클릭이벤트
                fingerList = document.querySelectorAll(".fingerList");             
                if(listData[5] == "N") dimdSet("listLine", fingerList[i], 1);
                else dimdSet("listLine", fingerList[i], 0); 
                //

                
            }
            // 스크롤 만들기        
            if(arrList.length > 7) $(".fingerDBList > ul.data").css({'width':'calc(100% + 30px)','overflow-y':'scroll','padding-right':'10px'})
        }

    }

    //데이터별 리스트 생성 함수
    function create_fingerList(i){
        myList = $(`<li class='fingerList' dimd='0'>
                        <div class='listNum'>${i + 1}</div>
                        <div class='idNum'>${listData[0]}</div>
                        <div class='firstDay'>${listData[1]}</div>
                        <div class='lastDay'>${listData[2]}</div>
                        <div class='reRegister'>${listData[3]}</div>
                        <div class='removeDay'>${listData[4]}</div>
                        <div class='useInfo'>${listData[5]}</div>
                        <div class='removRreason'>${listData[6]}</div>
                    </li>`);

        
        myList.attr({"index":i});
        listSection.find("ul.data").append(myList);
    }
    //

    //딤드처리 함수
    function dimdSet(type, target, dimd){
        if(type == ""){
            if(dimd == 1){
                $(target).attr("dimd", 1);
                $(target).css({'-webkit-filter': 'grayscale(100%) opacity(0.5)'});
            }else{
                $(target).attr("dimd", 0);
                $(target).css({'-webkit-filter': 'grayscale(0) opacity(1)'});
            }
        }else if(type == "listLine"){
            if(dimd == 1){
                $(target).attr("dimd", 1);
                $(target).css({'-webkit-filter': 'grayscale(100%) opacity(0.3)'});
            }else{
                $(target).attr("dimd", 0);
                $(target).css({'-webkit-filter': 'grayscale(0) opacity(1)'});
            }
        }
    }

}