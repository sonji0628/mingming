/*************************************************************************************
    FileName			:	ATEC_makeList.js
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
	if(cmArr[i].class == "makeList") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_makeList(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_makeList(ind) {
    this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
    this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
    this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
    this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));

    let screenNumClass = {};
    screenNumClass.Data = $(cmArr[ind].xmlObj).attr("param2");
    screenNumClass.class = $(cmArr[ind].xmlObj).attr("param2Class");
    $("#cm"+ind).addClass(screenNumClass.class);//css를 위해 cm 태그에 화면번호 추가

    //2000000|50000|10000|5000|1000|500|100|50|10|0;
    //DATA : 총금액|오만|만|오천|천|오백|백|오십|십|Dimd여부;
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let arrList; //파라미터값을 ';'구분자로 배열화시키는 변수
    let listData;//파라미터값을 '|'구분자로 배열화시키는 변수
    let cashUnitData = {};    //권종별 데이터만 담은 배열

    let maxListLength = 3;     //한페이지에 들어갈 리스트 갯수
    let pagelist;
    let pagenum = 0;
    let page = 1;  //현재페이지
    let mySection; //권종별 테이블 영역
    let myList;    //데이터별 리스트
    let myUnit;    //리스트 내 권종별 내용
    let label = ['오만원','만원','오천원','천원','오백원','백원','오십원','십원'];
    let myColor = ['#d8ae66','#89b584','#ae8468','#9badb9','#84898d','#b4b4b4','#a7c3c4','#fdcd7b'];//권종별 그래프 색상
    let cashList; //리스트

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
                listData = arrList[i].split("|").map(Number); //gab을 ';'구분자로 배열화시키는 변수
                listData = listData.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
                    return item !== '';
                })  
                cashUnitData = listData.slice(1,(listData.length - 1)); //권종별 데이터만

                // 페이징         
                if((0 == i) || (0 == (i%maxListLength)))  create_pagelist(i);
                create_cashList(i);// 리스트 만들기

                // 리스트 별 딤드셋팅 및 클릭이벤트
                cashList = document.querySelectorAll(".cashList");             
                if(listData[listData.length - 1] == 0) dimdSet("", cashList[i], 0);
                else dimdSet("", cashList[i], 1); 
                addEventListenerMulti(cashList[i], ["mousedown", "touchstart"], listSelectBtn);
                //
            }

            
            //리스트가 페이지 당 최대 갯수보다 적을 경우 빈칸 만들어 위치 값 틀어지지 않게 만들기
            if(arrList.length%maxListLength !== 0){
                for(let i = 0; i < maxListLength - arrList.length%maxListLength; i++){
                    mySection.append(`<div class='cashList empty'></div>`);
                }
            }
            //이전다음 버튼 생성
            if(arrList.length > 3 ) create_btnNextPrev();
            //페이지 이동 이벤트
            showPage();
            
        }

    }
   
    //페이지 div 설정
    function create_pagelist(i){
        //i값이 maxListLength의 배수가 되면 페이지 증가하기 
        if(0 == i) pagenum = 0;
        else pagenum++;
        //테이블 그려주기
        mySection = $(`<div id='pagelist${pagenum}' class='pagelist'></div>`);
        mySection.css({
            'position': 'relative',  
            "width" : $(cmArr[ind].xmlObj).attr("mbw") + "px",
            "height" : $(cmArr[ind].xmlObj).attr("mbh") + "px",
        })
        $("#cm"+ind).append(mySection); 
    }

    //데이터별 리스트 생성 함수
    function create_cashList(i){
        myList = $(`<div class='cashList' dimd='${listData[listData.length - 1]}'>
                        <div class='totalAmount'>마감금액<br><span>${listData[0].toLocaleString()}</span></div>
                        <ul></ul>
                    </div>`);

        myList.attr({"index":i});
        mySection.append(myList);
        create_cashUnit();
    }
    //

    //리스트 내 권종별 내용 생성 함수
    function create_cashUnit(){
        for(let i = 0; i < cashUnitData.length; i++){
            label[i] = label[i].replace(/(.{1})/g,"$1 "); //라벨 데이터 양쪽 정렬을 위해 각 단어에 공백 추가
            myUnit = `<li class='cashUnit'>
                          <div class='title'>
                              <span class='colorBox' style='background:${myColor[i]}'></span>
                              <span class='text'>${label[i]}</span>
                          </div>
                          <div class='money'><span>${cashUnitData[i].toLocaleString()}</span></div>
                      </li>`;
            myList.find("ul").append(myUnit);
        }
    }
    //

    //이전&다음 버튼
    function create_btnNextPrev(){
        let nextPrevBtn = $(`<div class='nextPrevBtn_area'></div>`);
        let btnPrev = $(`<div class='btn_listPrev'><img src='${btnDir}/btn_listPrev.png'></div>`);
        let btnNext = $(`<div class='btn_listNext'><img src='${btnDir}/btn_listNext.png'></div>`);
        
        $("#cm"+ind).append(nextPrevBtn); 
        $(nextPrevBtn).append(btnPrev);
        $(nextPrevBtn).append(btnNext);

        btnPrev = document.querySelector(".btn_listPrev"); // 이전버튼
        btnNext = document.querySelector(".btn_listNext"); // 다음 버튼 
        addEventListenerMulti(btnPrev, ["mousedown", "touchstart"], pagingBtn);       //팝업 취소 버튼
        addEventListenerMulti(btnNext, ["mousedown", "touchstart"], pagingBtn);       //팝업 확인 버튼
    }

    function showPage() {
        //해당 페이지 표출
        $('.pagelist').hide();
        $('#pagelist' + (page - 1)).show();

            if(!(1 < page) && !((page * maxListLength) < arrList.length)){
                $(".btn_listPrev").hide();
                $(".btn_listNext").hide();
            }else{
                $(".btn_listPrev").show();
                $(".btn_listNext").show();
            }

            //이전버튼 활성화, 비활성화 처리
            if (1 < page) dimdSet("", ".btn_listPrev", 0);
            else dimdSet("", ".btn_listPrev", 1); 

            //다음버튼 활성화, 비활성화 처리
            if ((page * maxListLength) < arrList.length) dimdSet("", ".btn_listNext", 0);
            else dimdSet("", ".btn_listNext", 1);
    };

    function pagingBtn(event) {
        let mybtn = $(this);
        if(event.type=="touchstart") mFlag=true;//터치가 되면 다음부터는 터치만 체크
        if(event.type=="mousedown" && mFlag) return true;

        if (!eventFlag && mybtn.attr('dimd') != '1'){ //다른게 눌리지 않아야지 됨, 딤드된 버튼은 눌리지 않아야지 됨
            btnAni(mybtn);// 버튼 소리 함수

            ws_send("k[10]");
            //페이징 처리
            if ("btn_listNext" == mybtn.attr("class")) page = page + 1;
            else if ("btn_listPrev" == mybtn.attr("class")) page = page - 1;
            console.log(mybtn)
            showPage();

        }
    };

    function listSelectBtn(event) {
        let mybtn = $(this);
        if(event.type=="touchstart") mFlag=true;//터치가 되면 다음부터는 터치만 체크
        if(event.type=="mousedown" && mFlag) return true;

        if (!eventFlag && mybtn.attr('dimd') != '1'){ //다른게 눌리지 않아야지 됨, 딤드된 버튼은 눌리지 않아야지 됨
            
            // 버튼 소리 함수
            bleepPlay();
            $(mybtn).animate({   //jQuary를 이용하여 눌림효과 주기
                'margin-top': '+=5px',
            }, 100, reback);
            function reback() {
                $(mybtn).animate({
                    'margin-top': '-=5px',
                }, 100);
            }  
            //
            $(".cashList[dimd='0']").css({'background':'#fff','border': '1px solid #bbbbbb','outline':'none'});
            mybtn.css({'background':'#fdffce','outline': '4px solid #ffbc00','border': '1px solid #ffbc00'});


            //확인버튼 셋팅
            let returnGab = mybtn.attr('index');
            btnArr[1].dimd = 0;
            $("#btn1").css({'-webkit-filter': 'grayscale(0) opacity(1)'});
            btnArr[1].breturn = returnGab + "[" + returnGab + "]";
            //
        }
    };

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