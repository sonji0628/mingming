/*************************************************************************************
    FileName			:	ATEC_10103.js
    Description			:	출금금액직접입력 화면
    Created Date		:	2021.10.16
    Created By			:	ATEC AP, (손지민)
    Revision History	:	
             ver 1.0.0.0 (2021.10.12) - 최초작성 
             ver 1.0.0.1 (2021.11.10) - 사양변경
                                        전 영업일 금액과 상관없이 입력 가능
                                        권종별 매수,개수 제한(현금 총 200매/동전 각 50매 초과 금지)
                                        권종별 최대값 넘어간 파람값이 들어오면 확인키 Dimd 및 안내문구 노출 등
                                        테이블 디자인 수정 (손지민)
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (var i = 0; i < cmArr.length; i++) {
	if(cmArr[i].class == "10103") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_10103(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
        console.log(cmArr[i].class);
        break;
	}
}

function ATEC_10103(ind) {
    this.iname = $(cmArr[ind].xmlObj).attr("iname");

    let screenNumClass = {};
    screenNumClass.Data = $(cmArr[ind].xmlObj).attr("param2");
    screenNumClass.class = $(cmArr[ind].xmlObj).attr("param2Class");


    //50000|3796|100;10000|0|2;5000|500|50;1000|500|800;500|500|0;100|500|0;50|500|0;10|0|0;
    //권종1|잔량1|매수1;권종2|잔량2|매수2;…….권종8|잔량8|매수8;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    //let arrList; //파라미터값을 ';'구분자로 배열화시키는 변수

    // xml 태그
    let totalCashInput = document.querySelector(".cash_input");             // 최종 마감 금액  dxt
    let tenBox = document.querySelector("#bgx0");                      // 텐키 박스
    let tenInput = document.querySelector(".ten_input");               // 텐키 인풋 박스
    let noticeTT = document.querySelector("#txt2")                     // notice 텍스트 박스
    let confirmBtn = document.querySelector(".confirm_btn");           // 확인 버튼
    //

    let mySection; //권종별 테이블 영역
    let myTable;   //권종별 테이블
    let label = ['오만원','만원','오천원','천원','오백원','백원','오십원','십원'];
    let cashUnits = {};    //파라미터값을 ';'구분자로 배열화시키는 변수
    let cashUnitData = []; //권종별 금액 데이터


    //테이블 그려주기
    mySection = $(`<div id='cashTableSection'>
                    <div class='cashTable'>
                        <ul>
                            <li class='table_title'>
                                <div class='title'></div>
                                <div class='ramainPaper'>잔량</div>
                                <div class='inputPaper'>매수</div>
                                <div class='inputCash'>금액</div>
                                <div class='selectBtn'></div>
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

    let pop = `<div class='dimBg' style='display:none;z-index:0'>
                    <div class='popBg'>
                        <div class='inputCashPopup'>
                            <div class='title'>
                                <p></p>출금 금액 입력
                            </div>
                            <div class='inputInfoArea'>
                                <div class='tenInputArea'>
                                    입력 매수
                                    <p>매</p>
                                </div>
                                <div class='info'>
                                    <div class='inputCashInfo'>
                                        <span>입력 금액</span>
                                        <p class="text"></p>
                                    </div>
                                    <div class='remainPaperInfo'>
                                        <span>잔량</span>
                                        <p class="text"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

    
    
    let popBtn = `<div class='pop_btn_area'>
                    <div class='cancelBtn' dimd='0'>취소</div>
                    <div class='confirmBtn' dimd='0'>확인</div>
                </div>`;

    let notice = `<div class='pop_notice' style='display:none'><span>최종 마감 금액을 초과하였습니다.</span></div>`

    $("#cm"+ind).addClass(screenNumClass.class);//css를 위해 cm 태그에 화면번호 추가
    $("#cm"+ind).append(mySection); 
    $("#cm" + ind).append(pop);
    $('.popBg').append(notice); //안내 문구
    $('.popBg').append(popBtn); //팝업 버튼영역

    // 라벨 데이터 갯수만큼 돌려 테이블 생성하기
    for(let i = 0; i < label.length; i++){
        label[i] = label[i].replace(/(.{1})/g,"$1 "); //라벨 데이터 양쪽 정렬을 위해 각 단어에 공백 추가
        create_cashTable_table(i);//테이블 내 li 생성
    }
   
    //테이블 내 li 생성 함수
    function create_cashTable_table(i){
        //각 권종별 li html
        myTable = $(`<li class='cashUnit' dimd='1'>
                        <div class='title'><span>${label[i]}</span></div>
                        <div class='ramainPaper'><span> </span></div>
                        <div class='inputPaper'><span> </span></div>
                        <div class='inputCash'><span> </span></div>
                        <div class='selectBtn'><button>선택</button></div>
                    </li>`);
        myTable.attr({"index":i});
        if(i < 4) $(".cashTable > ul > .cashWrap >ul").append(myTable);
        else      $(".cashTable > ul > .coinWrap >ul").append(myTable);
    }
    //



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let cashUnit = document.querySelectorAll(".cashUnit");                       //권종별 li
    let ramainPaper = document.querySelectorAll(".ramainPaper > span");          //해당 권종의 잔량 매수 div의 입력칸
    let inputPaper = document.querySelectorAll(".inputPaper > span");            //해당 권종의 입력 매수 div의 입력칸
    let inputCash = document.querySelectorAll(".inputCash > span");              //해당 권종의 입력 금액 div의 입력칸
    let selectBtn = document.querySelectorAll(".selectBtn > button");            //해당 권종의 선택 버튼 
    let moneyUnit;   // 지폐인지 동전인지
    let mainNoticeFlag = false; //초과 금액이 있는지 확인

    //팝업에서 사용하는 변수
    //선택 된 권종 데이터 저장 변수
    let myCashName;    // 권종이름 저장
    let mymyIndexNum;  // 인덱스 번호 저장
    let myRamainPaper; // 잔량 저장
    let myMoney;       // 권종 금액
    let myMoneyUnit;   // 지폐인지 동전인지

    let inputPopWrap = document.querySelector(".dimBg");                                      // 팝업
    let inputPop = document.querySelector(".popBg");                                          // 팝업 전체
    let inputCashPopup = inputPop.querySelector(".inputCashPopup");                           // 팝업 인포 영역
    let myPopTitle = inputCashPopup.querySelector(".title > p");                              // 어떤 권종의 팝업인지 알려주는 타이틀
    let inputCashInfoText = inputCashPopup.querySelector(".inputCashInfo > .text");           // 입력 금액 
    let remainPaperInfoText = inputCashPopup.querySelector(".remainPaperInfo > .text");       // 잔량 매수
    let popCancelBtn = inputPop.querySelector(".pop_btn_area > .cancelBtn");                  // 팝업 취소 버튼
    let popConfirmBtn = inputPop.querySelector(".pop_btn_area > .confirmBtn");                // 팝업 확인 버튼

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //각 버튼에 이벤트
    for(var i = 0; i < label.length; i++) {
        addEventListenerMulti(selectBtn[i], ["mousedown", "touchstart"], selectBtnClick); //선택버튼
    }
    addEventListenerMulti(popCancelBtn, ["mousedown", "touchstart"], popBtnClick);        //팝업 취소 버튼
    addEventListenerMulti(popConfirmBtn, ["mousedown", "touchstart"], popBtnClick);       //팝업 확인 버튼
    //addEventListenerMulti(confirmBtn, ["mousedown", "touchstart"], confirmChk);           //확인 버튼


	this.evt = function() {
        console.log("(전처리)evt 파라미터는 : ☞   " + evtParam + "   ☜ 잘넘어옴, iname" + this.iname);
        this.callF(evtParam);
    };
    
    this.callF = function(gab) { //후처리 함수
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);      

        if("" == gab)  return

        cashUnits = gab.split(";"); //gab을 ';'구분자로 배열화시키는 변수
        cashUnits = cashUnits.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
            return item !== '';
        })  

        // 데이터 셋팅
        for(let i = 0; i < cashUnits.length; i++){
            cashUnitData = cashUnits[i].split("|").map(Number);    //권종별 데이터를 '|' 구분자로 배열화
            dataSet(i);
        }
  
    }


    //데이터 셋팅 함수
    function dataSet(i){
        ramainPaper[i].innerText = cashUnitData[1];                                     // 권종별 출금가능 잔량 현황 입력
        inputPaper[i].innerText = cashUnitData[2];                                      // 권종별 매수 현황 입력
        inputCash[i].innerText = (cashUnitData[2] * cashUnitData[0]).toLocaleString();  // 권종별 금액 현황 입력

        cashUnit[i].setAttribute("myMoney",cashUnitData[0]);       //권종 별 해당 금액 속성 추가
        moneyUnit = cashUnitData[0] >= 1000 ? "cash" : "coin";
        cashUnitData[0] >= 1000 ? cashUnit[i].setAttribute("myMoneyUnit","cash") : cashUnit[i].setAttribute("myMoneyUnit","coin");   // 지폐인지 동전인지
        cashUnitData[0] >= 1000 ? cashUnit[i].classList.add("cash") : cashUnit[i].classList.add("coin");   // 지폐인지 동전인지
        
        if(cashUnitData[1] == 0)  cashUnit[i].setAttribute("dimd",1);
        else  cashUnit[i].setAttribute("dimd",0);
        
        if(moneyUnit == "coin") mainNoticeE(cashUnitData[2],cashUnit[i]);        
    }

    ////초기값 중 초과값 있을 경우///
    //data : 비교값(입력된 초기값이나 수정된 인풋값), my : 해당권종li노드
    function mainNoticeE(data,my){
        let notice = document.createElement("div");

        if(data > 50){ //초과했을 경우 초과안내문구 노출 밑 리스트 스타일 셋팅, notice icon 추가
            mainNoticeFlag = true;
            noticeTT.classList.add("noticeIcon");  
            noticeTT.innerHTML = "동전 최대 출금 개수를 초과했습니다.<br>각 동전별 최대 출금 개수는 50개 입니다";
            notice.className = 'notice';
            my.append(notice);
            my.classList.add("notice");  
        }else if(Number(data) <= 50 && my.classList.contains('notice')){
            mainNoticeFlag = false;
            my.lastChild.remove();
            my.classList.remove("notice");  
        }

        // 모두 수정 되었을 경우 초과안내문구 삭제
        if(document.querySelector(".cashUnit.coin.notice") == undefined) {
            noticeTT.classList.remove("noticeIcon");  
            noticeTT.innerHTML = "";
        }
    }


    // 권종별 선택 버튼 이벤트
    function selectBtnClick(event){
        if(event.type=="touchstart") mFlag=true;//터치가 되면 다음부터는 터치만 체크
        if(event.type=="mousedown" && mFlag) return;

        let mybtn = $(this).parent().parent();

        //선택 버튼 데이터 저장
        mymyIndexNum = Number(mybtn.attr("index")); //눌린 권종의 인덱스
        myCashName = mybtn.find(".title")[0].innerText.replace(/ /g,""); 
        myRamainPaper = Number(mybtn.find(".ramainPaper > span")[0].innerText);
        myMoney = mybtn.attr("myMoney");
        myMoneyUnit = mybtn.attr("myMoneyUnit");
        //

        // 동전, 지폐 구분하여 금액 단위 바꿔주기(매/개)
        if(mybtn.hasClass("coin")){
            $(".tenInputArea")[0].innerHTML = "입력 개수<p>개</p>";
            $(".inputCashPopup .inputInfoArea div p.text").attr("data-content","개");
        }else {
            $(".tenInputArea")[0].innerHTML = "입력 매수<p>매</p>";
            $(".inputCashPopup .inputInfoArea div p.text").attr("data-content","매");
        }


        if (!eventFlag && mybtn.attr('dimd') != '1'){ //다른게 눌리지 않아야지 됨, 딤드된 버튼은 눌리지 않아야지 됨
            btnAni(mybtn);// 버튼 소리 함수
            setPopup("show");

            //초기값 중 초과값 있을 경우 팝업 안내문구
            if(mybtn.hasClass("notice")){
                $(".pop_notice").css({"display":"flex"});
                $(".pop_notice > span")[0].innerHTML = "출금할 수 있는 최대 개수를 초과하였습니다."
                $(".pop_notice").css({"display":"flex","align-items":"center"});
                //텐키 전체 딤드 해제
                tenClass.allDimd(0);
                tenClass.tendimded(9,"0");
                tenClass.tendimded(11,"0");
                //
            }else{
                $(".pop_notice").css({"display":"none"});
            }
            

            ws_send("K[10]");
        }
    }

    //팝업 셋팅 함수
    //gab --> "hide","show"
    function setPopup(gab){
        ws_send("K[10]");

        if(gab == "hide"){
            inputPopWrap.style.display = "none";
            inputPopWrap.style.zIndex  = "0";
            tenBox.style.left = "1200px";
            tenBox.style.zIndex  = "0";
            tenInput.style.left = "1200px";
            tenInput.style.zIndex  = "0";
        }else if(gab == "show"){
            $(".pop_notice").css({"display":"none"});  
            inputPopWrap.style.display = "flex";
            inputPopWrap.style.zIndex  = "9999";
            //권종 데이터 셋팅
            myPopTitle.innerText = myCashName;
            remainPaperInfoText.innerText = myRamainPaper;  
            //

            if(inputPaper[mymyIndexNum].innerText == 0){  //출금 매수 값이 없을 경우 초기화
                tenClass.cal('clear',tenClass.dxtIndex,"1");
                inputCashInfoText.innerText = 0;
                dimdSet("", ".pop_btn_area > .confirmBtn", 1);
            }else{ //있으면 데이터를 다시 셋팅해준다
                tenClass.cal('clear',tenClass.dxtIndex,"1");
                tenClass.tendimded(9,"0");
                tenClass.tendimded(11,"0");
                tenInput.innerText = inputPaper[mymyIndexNum].innerText;
                inputCashInfoText.innerText = inputCash[mymyIndexNum].innerText;
                dimdSet("", ".pop_btn_area > .confirmBtn", 0);
            }
            tenBox.style.left = "585px";
            tenBox.style.zIndex  = "99999";
            tenInput.style.left = "270px";
            tenInput.style.zIndex  = "99999";
        }
    }

    //팝업 버튼 이벤트
    function popBtnClick(event) {
        let mybtn = $(this);
        if(event.type=="touchstart") mFlag=true;//터치가 되면 다음부터는 터치만 체크
        if(event.type=="mousedown" && mFlag) return;

        if (!eventFlag && mybtn.attr('dimd') != '1'){ //다른게 눌리지 않아야지 됨, 딤드된 버튼은 눌리지 않아야지 됨
            btnAni(mybtn);// 버튼 소리 함수
            setPopup("hide");// 팝업 가리기

            if(mybtn[0].className == "cancelBtn"){                          // 취소버튼이면 텐키 인풋 데이터 초기화
                tenClass.tmpGab = inputPaper[mymyIndexNum].innerText;
                tenClass.defaultGab = inputPaper[mymyIndexNum].innerText;
                tenClass.allDimd("1");
            }else if(mybtn[0].className == "confirmBtn"){                   // 확인버튼이면 해당 권종 리스트에 입력값 셋팅               
                inputPaper[mymyIndexNum].innerText = tenInput.innerText;
                inputCash[mymyIndexNum].innerText = inputCashInfoText.innerText;
                if(myMoneyUnit == "coin") mainNoticeE(inputPaper[mymyIndexNum].innerText,cashUnit[mymyIndexNum]);
            }

            //인풋 변경 될 때마다 리턴값 셋팅, 합계 셋팅
            tenObj.outReturnG = returnSet();
            tenClass.confirmDimd(0);
            totalSum();

            ws_send("K[10]");
        }        
    }

    function returnSet(){
        //리턴값 셋팅
        let returnSet;
        let sumReturn = "";
        for(let i = 0; i < cashUnit.length; i++){
            returnSet = cashUnit[i].getAttribute("mymoney") + "=" + inputPaper[i].innerText + ";";
            sumReturn += returnSet
        }
        return sumReturn
    }
    

    //텐키 입력 시 데이터 셋팅 함수
    function inputDataSet(input){
        //입력 금액 없을 시 초기화
        if(input == ""){
            console.log(input)
            input = 0;
            tenInput.innerText = 0;
            inputCashInfoText.innerText = 0;
            $(".pop_notice").css({"display":"none"}); 
        }else{
            $(".pop_notice").css({"display":"none"});           
            inputCashInfoText.innerText =  Number(tenClass.tmpGab * myMoney).toLocaleString(); //입력금액 계산
            //텐키 전체 딤드 해제
            tenClass.allDimd(0);
            tenClass.tendimded(9,"0");
            tenClass.tendimded(11,"0");
            //
            dimdSet("", ".pop_btn_area > .confirmBtn", 0); 
        }
        
        if(Number(input) > Number(remainPaperInfoText.innerText)){ //최대값보다 크게 입력 하지 못하게
            $(".pop_notice").css({"display":"flex"});
            tenClass.allDimd("1");
            //dimdSet("", ".pop_btn_area > .confirmBtn", 1); 
        }
        //지폐or동전 총 출금가능 매수 확인
        if(inputPaper[mymyIndexNum] !== undefined) inputPaerSum(myMoneyUnit)

    }

    //지폐or동전 총 출금가능 합
    // my = "cash":"coin"
    function inputPaerSum(my){
        let cashInput = document.querySelectorAll("." + my + "> .inputPaper > span");
        let sum = 0;
        cashInput.forEach(element => sum += Number(element.innerText));
        let myMax = (sum - inputPaper[mymyIndexNum].innerText + Number(tenClass.tmpGab));
        let max = my == "cash" ? 200 : 50;

        if(my == "cash"){
            if(Number(tenClass.tmpGab) > max){
                $(".pop_notice > span")[0].innerHTML = "출금할 수 있는 최대 매수를 초과하였습니다."
                $(".pop_notice").css({"display":"flex","align-items":"center"});
                tenClass.allDimd("1");
                dimdSet("", ".pop_btn_area > .confirmBtn", 1); 
            }else if(Number(tenClass.tmpGab) > max || myMax > 200){
                $(".pop_notice > span")[0].innerHTML = my == "cash" ? "지폐의 총 출금 매수는 200매입니다.<br>현재 총 출금 매수가 200매가 넘었습니다." : "동전의 총 출금 갯수는 200개 입니다.<br>현재 총 출금 갯수가 200개를 넘었습니다.";
                $(".pop_notice").css({"display":"flex","align-items":"flex-start"});
                tenClass.allDimd("1");
                dimdSet("", ".pop_btn_area > .confirmBtn", 1); 
            }
        }

        
        
    }

    //합계
    function totalSum(){
        let sum = 0;
        inputCash.forEach(element => sum += Number(element.innerText.replace(/,/g, "")));
        totalCashInput.innerText = sum.toLocaleString();
    }

    // 텐키 연동
    this.tenCall = function(input){
        console.log('들어옴==============',input);
         //리턴값 초기 셋팅
        tenObj.outReturnG = returnSet();
        tenClass.confirmDimd(0);
         
        //첫번째 입력 시 0이 들어오면 두번째 입력 시 0 삭제
        //0을 연속으로 입력 시 값을 0으로
        if(input.length !== 1 && input.substr(0,1) == "0") {
            tenClass.tmpGab = tenClass.tmpGab.substr(1);
            tenInput.innerText = tenClass.tmpGab;
            if((tenClass.tmpGab*1) == 0) tenClass.tmpGab = 0;           
        }
        
        inputDataSet(input);
    }

    // 두가지 이벤트 리스너 합수
    function addEventListenerMulti(ele, events, hendler){
        events.forEach(function(e){
            ele.addEventListener(e, hendler)
        })
    }
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
        }
    }

}