/*************************************************************************************
	FileName			:	ATEC_make_moneyState.js
	Description			:	메인화면
                            단말시재/기기시재 현황 테이블 생성                           
	Created Date		:	2021.09.24
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
	if (cmArr[i].class == "make_moneyState") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_make_moneyState( Number(cmArr[i].index) ); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}


function ATEC_make_moneyState(ind) {
    //let util = new Util();

    console.log("===================현황표 그리기 시작===================");   
    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));

    let evtParam;
    let mySection; //시재현황 영역
    let myTable;   //시재현황 테이블
    let label = ['오 만 원','만 원','오 천 원','천 원','회 수 함','오 백 원','백 원','오 십 원','십 원','총 금 액'];
    let addInfoTable;   //더보기 내용 테이블
    let addInfoSection; //더보기 팝업 영역
    

    //시재현황 영역 html
    mySection = $(`<div id='moneyState'>
                    <div class='sectionTitle'><p>단말시재/기기시재 현황</p></div>
                    <div class='stateTable'>
                        <ul>
                            <li class='table_title'>
                                <div>단말시재</div>
                                <div>|</div>
                                <div>기기시재</div>
                                <div class='infoBtn' style='position:absolute;top:36px;display:flex;justify-content:flex-end'><img src='${iconsDir}/more.png'></div>
                            </li>
                            <div class='cashWrap'>
                                <div class='wrapTitle'>현금부</div>
                                <ul></ul>
                            </div>
                            <div class='coinWrap'>
                                <div class='wrapTitle'>동전부</div>
                                <ul></ul>
                            </div>
                            <div class='totalWrap'>
                                <div class='wrapTitle'></div>
                                <ul></ul>
                            </div>
                        </ul>
                    </div>
                </div>`);

    mySection.css({
        "top" : this.top + "px",
        "left" : this.left + "px",
        "width" : this.width + "px",
        "height" : this.height + "px",
    })
    addInfoSection = $(`<div id='addInfoArea'>
                            <div class='sectionTitle'>
                                <p>기기시재 현황 자세히 보기</p>
                                <div class='closePop'><img src=${iconsDir}/icon_cancel.png></div>
                            </div>
                            <div class='infoTable'>
                                <ul>
                                    <li class='table_title'>
                                        <div>현금금액</div>
                                        <div>|</div>
                                        <div>동전금액</div>
                                        <div>|</div>
                                        <div>봉투입금금액</div>
                                    </li>
                                    <div class='cashWrap'>
                                        <div class='wrapTitle'>현금부</div>
                                        <ul></ul>
                                    </div>
                                    <div class='coinWrap'>
                                        <div class='wrapTitle'>동전부</div>
                                        <ul></ul>
                                    </div>
                                    <div class='totalWrap'>
                                        <div class='wrapTitle'></div>
                                        <ul></ul>
                                    </div>
                                </ul>
                            </div>
                     </div>`);
    addInfoSection.css({
        "position":"absolute",
        "top" : "-30px",
        "left" : "0",
        "width" : "470px",
        "height" : "540px",
        "background":"#f7f7f7",
        "z-index":"-111",
        "display":"none"
    })

    $("#cm"+ind).append(mySection); 
    $("#cm"+ind).append(addInfoSection); 

    // 라벨 데이터 갯수만큼 돌려 테이블 생성하기
    for(let i = 0; i < label.length; i++){
        create_moneyState_table(i);//테이블 내 li 생성
    }

    // let infoLabel = label;
    // infoLabel.splice(infoLabel.indexOf("회 수 함"),1)
    for(let i = 0; i < label.length; i++){
        create_addInfo_table(i);
    }

    /* 예외사항 class 수정 및 제거*/
    //총 금액 클래스 수정
    let myTableRow = document.querySelectorAll('.stateTable > ul > div > ul > li');
    //회수함 클래스 수정 및 html 수정
    myTableRow[4].className = "recoveryShip";
    myTableRow[4].getElementsByClassName('hostCash')[0].innerHTML = '';
    myTableRow[4].getElementsByClassName('localCash')[0].innerHTML = '<span> </span> 건';
    
    //addInfo 각 항목 당 안쓰는 div 제거
    let myInfoRow = document.querySelectorAll('.addInfo');
    let myInfoRow_array = Array.prototype.slice.call(myInfoRow); // converts NodeList to Array
    
    //myInfoRow[9].className = "totalCash";

    let recoveryShipRemove = myInfoRow_array.slice(4,5)[0];
    recoveryShipRemove.querySelectorAll("div").forEach(function(element) {
        element.classList.add("remove");
    });

    myInfoRow_array.slice(4,9).forEach(function(element) {
        element.children[1].classList.add("remove");
    });

    myInfoRow_array.slice(0,4).forEach(function(element) {
        element.children[2].classList.add("remove");
    });

    document.querySelectorAll(".remove").forEach(function(element) {
        element.innerHTML = "";
    });
    //

    //테이블 내 li 생성 함수
    function create_moneyState_table(i){
        //각 권종별 li html
        myTable = $(`<li class='cashUnit compare'>
                        <div class='title'><span>${label[i]}</span></div>
                        <div class='hostCash'><span> </span> 원</div>
                        <div class='localCash'><span> </span> 원</div>
                    </li>`);
        if(i < 5) {
            $(".stateTable > ul > .cashWrap > ul").append(myTable);
            myTable.addClass("cash");
        }else if(i <9){
            $(".stateTable > ul > .coinWrap > ul").append(myTable);
            myTable.addClass("coin");
        }else{
            $(".stateTable > ul > .totalWrap > ul").append(myTable);
            myTable.addClass("totalCash");
        }
    } 

    //addInfo 테이블 내 li 생성 함수
    function create_addInfo_table(i){
        //각 권종별 li html
        addInfoTable = $(`<li class='cashUnit addInfo'>
                            <div class='title'><span>${label[i]}</span></div>
                            <div class='cash'><span> </span> 원</div>
                            <div class='coin'><span> </span> 원</div>
                            <div class='pouch'><span> </span> 원</div>
                        </li>`);
        if(i < 4) {
            $(".infoTable > ul > .cashWrap > ul").append(addInfoTable);
            addInfoTable.addClass("cash");
        }else if(i == 4){
            $(".infoTable > ul > .coinWrap").before(addInfoTable);
            addInfoTable.addClass("empty");
        }else if(i <= 8){
            $(".infoTable > ul > .coinWrap > ul").append(addInfoTable);
            addInfoTable.addClass("coin");
        }else{
            $(".infoTable > ul > .totalWrap > ul").append(addInfoTable);
            addInfoTable.addClass("totalCash");
        }

    } 
    console.log("===================현황표 다그림===================");  

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////

        let addInfoArea = document.querySelector('#addInfoArea') //팝업 영역
        let infoBtn = document.querySelector('.infoBtn') //기기시재 자세히 보기 버튼
        let closePopBtn = document.querySelector('.closePop') //기기시재 자세히 보기 닫기 버튼
        let totalCashPop = addInfoArea.querySelector('.totalCash > .cash > span') //팝업 테이블 내에 있는 현금부 총금액 영역
        let totalCoinPop = addInfoArea.querySelector('.totalCash > .coin > span') //팝업 테이블 내에 있는 현금부 총금액 영역
        let totalPouchPop = addInfoArea.querySelector('.totalCash > .pouch > span') //팝업 테이블 내에 있는 현금부 총금액 영역

        let addInfoCashs = document.querySelectorAll('.cashUnit.addInfo > .cash > span');   //권종별 금액
        let addInfoCoins = document.querySelectorAll('.cashUnit.addInfo > .coin > span');   //권종별 금액
        let addInfoPouchs = document.querySelectorAll('.cashUnit.addInfo > .pouch > span');   //권종별 금액


        let compareList = document.querySelectorAll('.compare') //일치,불일치 알려줄 영역

        let hostTotalCash = document.querySelector('.totalCash > .hostCash > span'); //총 금액
        let hostRecoveryShip = document.querySelector('.recoveryShip > .hostCash');//회수
        let hostCashs = document.querySelectorAll('.cashUnit > .hostCash > span');   //권종별 금액
        
        let localTotalCash = document.querySelector('.totalCash > .localCash > span'); //총 금액
        let localRecoveryShip = document.querySelector('.recoveryShip > .localCash > span');//회수함
        let localCashs = document.querySelectorAll('.cashUnit > .localCash > span');   //권종별 금액

        //전처리 데이터 가져오기
        let hostData = $(cmArr[0].xmlObj).attr("param"); // host Data 가져오기
        let localData = $(cmArr[1].xmlObj).attr("param");// local Data 가져오기
        let localAddInfoData = $(cmArr[2].xmlObj).attr("param");// local Add Info Data 가져오기
                
        let data = {};

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // 팝업 버튼 함수
    infoBtn.addEventListener("click",openPop);
    closePopBtn.addEventListener("click",closePop);
    function openPop(){
        if (!eventFlag){
            btnAni(mybtn);// 버튼 소리 함수
            ws_send("K[10]");

            if(!infoBtn.classList.contains("flip")){
                infoBtn.classList.add("flip");
                addInfoArea.style.zIndex = 99;
                addInfoArea.style.display = "block";
                addInfoArea.style.left = "480px";
                $("#bgx1").css({'width':'493px'});
            } else {
                infoBtn.classList.remove("flip");
                addInfoArea.style.zIndex = -111;
                addInfoArea.style.display = "none";
                addInfoArea.style.left = "0";
                $("#bgx1").css({'width':'982px'});
            }
        }
        
    }
    function closePop(){
        if (!eventFlag){
            btnAni(mybtn);// 버튼 소리 함수
            ws_send("K[10]");
            infoBtn.classList.remove("flip");
            addInfoArea.style.zIndex = -111;
            addInfoArea.style.display = "none";
            addInfoArea.style.left = "0";
            $("#bgx1").css({'width':'982px'});
        }
    }
    //

    //전처리 함수
	this.evt = function() {    
        if(hostData !== "" && localData !== "") this.callF(evtParam)
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("hostData 들어옴" + hostData)
        console.log("localData 들어옴" + localData)
        console.log("localAddInfoData 들어옴" + localAddInfoData)

        let addInfo_cashData = localAddInfoData.split(";")[0].split("|").map(Number).slice(0,4);
        let addInfo_coinData = localAddInfoData.split(";")[0].split("|").map(Number).slice(4);
        let addInfo_pouchData = localAddInfoData.split(";")[1].split("|").map(Number);

   
        dataSet("normal","host",hostData,hostTotalCash,hostRecoveryShip,hostCashs);
        dataSet("normal","local",localData,localTotalCash,localRecoveryShip,localCashs);
        //팝업 데이터 셋팅
        dataSet("popup","addInfoCash",addInfo_cashData,totalCashPop,"",addInfoCashs);
        dataSet("popup","addInfoCoin",addInfo_coinData,totalCoinPop,"",addInfoCoins);
        dataSet("popup","addInfoPouch",addInfo_pouchData,totalPouchPop,"",addInfoPouchs);
        //

        // 단말시재, 기기시재 값 비교
        for(let i = 0; i < compareList.length; i++){

            let hostData = compareList[i].children[1].children[0].innerText;
            let localData = compareList[i].children[2].children[0].innerText;

            //아이콘 추가
            let img = document.createElement("img")
            img.src = `${iconsDir}/icon_notice.png`;
            img.style.position = 'absolute';
            img.style.marginTop = '10px';
            img.style.right = '-27px';
            //

            if(hostData !== localData) {
                if(compareList[i].classList.contains("totalCash")) compareList[i].parentElement.parentElement.style.backgroundColor = "rgba(255,180,180,0.2)";
                else compareList[i].style.backgroundColor = "rgba(255,180,180,0.2)";
                compareList[i].append(img);
            }
        }
    }

    //전처리 데이터를 가져와 각 영역에 데이터 셋팅해주는 함수
    //type : normal or popup, name : 데이터 이름, mydata : 전처리 데이터 담긴 배열
    //totalArea : 총금액 입력 영역, recoveryShipArea : 회수함 입력 영역, cashsArea : 각 금액별 입력 영역
    function dataSet(type,name,mydata,totalArea,recoveryShipArea,cashsArea){
        data[name] = [];                  // 데이터 배열 생성
        data[name].dataList = mydata;     // 데이터를 ';'구분자로 배열화
        data[name].totalCash = 0;         // 총 금액
        data[name].recoveryShipData = ""; // 회수함 매수
        data[name].cashUnits = [];        // 권종별 데이터
        data[name].cashUnitData = [];     // 권종별 데이터를 '|'구분자로 배열화

        if(type == "normal"){
            data[name].dataList = mydata.split(";"); //mydata를 ';'구분자로 배열화시키는 변수
            data[name].dataList = data[name].dataList.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
                return item !== '';
            })
            data[name].totalCash = Number(data[name].dataList[0]).toLocaleString();    //총금액 데이터
            data[name].recoveryShipData = name == "local" ? Number(data[name].dataList[1]).toLocaleString() : "";   //회수함 데이터
            data[name].cashUnits = name == "local" ? data[name].dataList.slice(2,data[name].dataList.length) : data[name].dataList.slice(1,data[name].dataList.length);  //총금액, 회수함 데이터를 뺀 나머지 금액 데이터 
            
            totalArea.innerText = data[name].totalCash; //★ 총금액 시재 현황 입력
            recoveryShipArea.innerText = data[name].recoveryShipData;//★ 회수함 시재 현황 입력
        }else if(type == "popup") {
            data[name].cashUnits = mydata;
            data[name].totalCash = totalMoneySum(mydata);
            totalArea.innerText = data[name].totalCash;
            console.log(data)
        }
       
        for(let i = 0; i < data[name].cashUnits.length; i++){
            data[name].cashUnitData = type == "normal" ? data[name].cashUnits[i].split("|") : mydata;    //권종별 데이터를 '|' 구분자로 배열화
            cashsArea[i].innerText = type == "normal" ? Number(data[name].cashUnitData[1]).toLocaleString() : data[name].cashUnitData[i].toLocaleString(); //★ 권종별 시재 현황 입력
        }      
    }

    function totalMoneySum(data){
        let temp = 0;
        for(let i = 0; i < data.length; i++){
            temp += data[i];
        }
        return Number(temp).toLocaleString();
    }

}