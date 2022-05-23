/*************************************************************************************
    FileName			:	SMC_20014.js
    Description			:	smc 통신변수 화면(S20014,S20015화면 사용)
    Created Date		:	2018.04.23
    Created By			:	ATEC AP, (신성철)
    Revision History	:	
             ver 1.0.0.0 (2018.04.23) - 최초작성
                                        S7574
                                        모듈제한 화면
                                        현재 모듈의 상태를 ON OFF 로 확인하고 클릭을 통해 체크 후 아이디|상태값; 을 ap로 보냄 (신성철)
             ver 1.0.0.2 (2019.01.29) - JSON 변환 css 분리 완료 (신성철)
             ver 1.0.0.3 (2021.11.03) - 장보고 버전 -> 국민은행 시재관리기 버전으로 수정
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";
for (let i = 0; i < cmArr.length; i++) {
    if (cmArr[i].class == "20016") { //요기 바꿔주고
        cmArr[i].jsObj = new SMC_20016(Number(cmArr[i].index)); //요기 바꿔주고
        cmArr[i].jsObj.evt();
    }
}

function SMC_20016(ind) {
    this.iname = $(cmArr[ind].xmlObj).attr("iname");

    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));


    // MODULE_ID|MODULE_NAME|MODULE_STATE;...;MODULE_ID|MODULE_NAME|MODULE_STATE;
    // MODULE_STATE => 0 : ON, 1 : OFF
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let arrList;                                       //파라미터값을 ';'구분자로 배열화시키는 변수
    let moduleData;                                    //파라미터값을 '|'구분자로 배열화시키는 변수

    let mySection;
    let myModuleArea;      //모듈 영역
    let myModule;          

    mySection = $(`<div id='mySection' class='smc20016'><ul></ul></div>`);
    mySection.css({
        "width" : this.width + "px",
        "height" : this.height + "px",
        "display":"flex",
        "justify-content":"center"
    })
    $("#cm"+ind).append(mySection);

    this.evt = function () {
        this.callF(evtParam)
    }
    this.callF = function (gab) {
        if("" !== gab){
            arrList = gab.split(";"); //gab을 ';'구분자로 배열화시키는 변수
            arrList = arrList.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
                return item !== '';
            })  
            

            //데이터 갯수만큼 돌려 리스트 생성하기
            for(let i = 0; i < arrList.length; i++){
                moduleData = arrList[i].split("|"); //gab을 '|'구분자로 배열화시키는 변수
                create_module(i);// 모듈생성             
            }

            myModule = document.querySelectorAll("li.moduleArea");
            myModule.forEach(element => element.addEventListener("click",moduleClick));

            //데이터 갯수에 따른  css
            if(arrList.length == 1){
                mySection.find("ul").css({"justify-content":"center"})
            }else if(arrList.length == 2){
                mySection.find("ul").css({"width":"70%"})
            }else if(arrList.length > 2 && arrList.length%3 !== 0){
                console.log(arrList.length%3)
                mySection.find("ul").append(`<li class='moduleArea empty' style='width:140px'></li>`);
            }
            //

            btnArr[1].breturn = "=[" + returnSet() + "]";
        }
    }
    
    function create_module(i){
        myModuleArea = $(`<li class='moduleArea' state='${moduleData[2]}'>
                            <div class='moduleBox'>
                                <div class='check'></div>
                            </div>
                            <div class='myName'>${moduleData[1]}</div>
                        </li>`);
        myModuleArea.attr({"index":i, "myID":moduleData[0]});
        mySection.find("ul").append(myModuleArea);
    }
            
    function moduleClick(){
        let mymy = this;
        if (!eventFlag){
            bleepPlay();// 버튼 소리 함수
            ws_send("K[10]");

            //체크상태 바꿔주기
            //상태값만 바꿔주면 css에서 텍스트,위치,색상 모두 바꿔줌
            //0:on, 1:off
            let getMyState = mymy.getAttribute("state");
            if(getMyState == 0) mymy.setAttribute("state",1);
            if(getMyState == 1) mymy.setAttribute("state",0);

            btnArr[1].breturn = "=[" + returnSet() + "]";
        }
    }

    function returnSet(){
        //리턴값 셋팅
        let returnSet;
        let sumReturn = "";
        for(let i = 0; i < myModule.length; i++){
            returnSet = myModule[i].getAttribute("myID") + "|" + myModule[i].getAttribute("state") + ";";
            sumReturn += returnSet
        }
    //    return sumReturn.replace(/;$/, '');
        return sumReturn;
    }



}
