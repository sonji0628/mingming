/*************************************************************************************
    FileName			:	ATEC_querty.js
    Description			:	하나은행 쿼티 자판 생성
	Created Date		:	ATEC AP, 왕장원
	Created By			:	
    From AP             :   TextInput설명문구|최소값|최대값|TextInput에들어갈문구|순서|TextInput타입 (0: 일반입력, 1: 비밀번호 입력)
                            ex) 직원번호|7|7|직원번호를 입력하여 주십시오|0;비밀번호|8|16|비밀번호를 입력하여 주십시오|1
    Return to AP        :   확인: =[직원번호 | 비밀번호]
                            취소: ~[~]  
    Revision History	:	
        ver 1.0.0.0 - 최초 작성
        ver 1.0.0.1 (2021.03.11) - 특수화면 처리를 custom tag 방식으로 변경, cyg
        ver 1.0.0.2 (2021.03.16) - 확인버튼의 리턴값 오류 수정, cyg
        ver 1.0.0.3 (2021.04.02) - paramXml.data 와 paramXml.class 분리, cyg
                                   첫번재 자음, shift, 한/영 버튼 입력시 K[10] 송신되지 않던 문제 수정, cyg
        ver 1.0.0.4 (2021.04.22) - 확인키 iname으로 찾던 코드 className으로 변경(손지민)
        ver 1.0.0.5 (2021.05.07) - 인풋박스 빈칸일 경우 확인 딤드 기능 추가
                                 - 해당 기능 사용 시 확인키에 "confirm" 클래스 있어야함
                                   paramClass에 "confirmChk" 있어야함(손지민)
        ver 1.0.0.6 (2021.05.24) - 특수화면을 cm tag 로 완전전환, 관련 변수 변경 (cyg)
        ver 1.0.0.7 (2021.10.06) - 국민은행 시재관리기 버전으로 수정(손지민)
        ver 1.0.0.8 (2021.12.27) - 특수문자 추가 (김성윤)
                                   사용하지 않는 코드 삭제
                                   소스 리팩토링

**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

"use strict";

for (let i = 0; i < cmArr.length; i++) {
    console.log("cmArr[i].class: " + cmArr[i].class);
    if (cmArr[i].class == "makeQwerty") { //요기 바꿔주고
        cmArr[i].jsObj = new ATEC_makeQwerty( Number(cmArr[i].index) ); //요기 바꿔주고
        cmArr[i].jsObj.evt();
        break;
    }
}


function ATEC_makeQwerty(ind) {

    const QWERTY_EN = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
    const QWERTY_EN_SHIFT = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];
    const QWERTY_NUM = ["1","2","3","4","5","6","7","8","9","0","!","@","#","$","%","^","&","*",".","(", ")","<",">","/",",","~"];                            
    const QWERTY_NUM_SHIFT = ["`", "_", "-", ":", ";", "\"", "'", "?", "+", "=", "[", "]", "{", "}", "\\", "|", "", "", "", "", "", "", "", "", "", ""];
    
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기

    let paramXml = {};
    paramXml.data = $(cmArr[ind].xmlObj).attr("param");
    paramXml.class = $(cmArr[ind].xmlObj).attr("paramClass");

    let param2Xml = {};
    param2Xml.Data = $(cmArr[ind].xmlObj).attr("param2");
    param2Xml.class = $(cmArr[ind].xmlObj).attr("param2Class");

    let setData = [];       
    let shiftFlag = false; // shift on = true , shift cancel = false        
    let numFlag = false; //숫자/특수문자 on = true , 숫자/특수문자 cancel = false     

    evtParam = evtParam.split(";").filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환        
        return item !== "";
    });

    for(let i = 0 ; i < evtParam.length ; i++) {
        setData.push(evtParam[i].split("|"));
    }
    
    //전처리 함수
	this.evt = function() {        

        $("#cm"+ind).append('<div id="input_wrap"></div>'
                            +'<div id="qwerty_wrap">'
                            +'    <div class="qwerty_key_line">'
                            +'        <div class="qwerty_key key">q</div>'
                            +'        <div class="qwerty_key key">w</div>'
                            +'        <div class="qwerty_key key">e</div>'
                            +'        <div class="qwerty_key key">r</div>'
                            +'        <div class="qwerty_key key">t</div>'
                            +'        <div class="qwerty_key key">y</div>'
                            +'        <div class="qwerty_key key">u</div>'
                            +'        <div class="qwerty_key key">i</div>'
                            +'        <div class="qwerty_key key">o</div>'
                            +'        <div class="qwerty_key key">p</div>'
                            +'    </div>'
                            +'    <div class="qwerty_key_line">'
                            +'        <div class="qwerty_key key">a</div>'
                            +'        <div class="qwerty_key key">s</div>'
                            +'        <div class="qwerty_key key">d</div>'
                            +'        <div class="qwerty_key key">f</div>'
                            +'        <div class="qwerty_key key">g</div>'
                            +'        <div class="qwerty_key key">h</div>'
                            +'        <div class="qwerty_key key">j</div>'
                            +'        <div class="qwerty_key key">k</div>'
                            +'        <div class="qwerty_key key">l</div>'
                            +'        <div class="qwerty_key back">←</div>'
                            +'    </div>'
                            +'    <div class="qwerty_key_line">'
                            +'        <div class="qwerty_key num">&123</div>'
                            +'        <div class="qwerty_key shift">↑</div>'
                            +'        <div class="qwerty_key key">z</div>'
                            +'        <div class="qwerty_key key">x</div>'
                            +'        <div class="qwerty_key key">c</div>'
                            +'        <div class="qwerty_key key">v</div>'
                            +'        <div class="qwerty_key key">b</div>'
                            +'        <div class="qwerty_key key">n</div>'
                            +'        <div class="qwerty_key key">m</div>'
                            +'        <div class="qwerty_key clear">정정</div>'
                            +'    </div>'
                            +'</div>');


        let selectBox = "";

        for(let i = 0 ; i < setData.length; i++) {

            let lbl = setData[i][0]; // textinput 상단의 표시문구
            let minLength = setData[i][1]; // textinput 최소값
            let maxLength = setData[i][2]; // textinput 최대값
            let placeHolder = setData[i][3]; // textinput 안의 표시문구
            let inputType = (setData[i][4] == 0) ? "text":"password"; // textinput 타입

            $("#cm" + ind + " #input_wrap").append(`<div class="inputArea">
                                                       <label for="inputBox${i}">
                                                          ${lbl}
                                                       </label>
                                                       <input type="${inputType}"
                                                              class="textBox inputBox"
                                                              id="inputBox${i}"
                                                              minlength="${minLength}"
                                                              maxlength="${maxLength}"
                                                              placeholder="${placeHolder}" />
                                                     </div>`);
                                                
            selectBox = $("#inputBox0");
            selectBox.addClass("focus");
        }

        // 숫자부터 그려주기
        if( param2Xml.class && param2Xml.class.includes('num')) {
            numFlag = true;
            for(let i = 0 ; i < $(".qwerty_key").length ; i++) {
                $(".qwerty_key.key:eq(" + i + ")").text(QWERTY_NUM[i]);
            }
            $(".qwerty_key.num")[0].innerText = "EN";
            shiftFlag = false;
        }
                
        $(".textBox").bind("touchstart mousedown", onTextInput);
        $(".qwerty_key").on('touchstart mousedown', onKey);
       
        /**
         * 키입력
         * @param  {jQuery이벤트} event 이벤트
         * @return none
         */ 
        function onKey(event) {            
            if(event.type == "touchstart") mFlag = true;
            if(event.type == "mousedown" && mFlag) return true;

            if( $(this).hasClass('key') ) {
                onCharacter($(this).text()); // 문자입력 입력
            } else if( $(this).hasClass('back') ) {
                onBack(); // 1글자 삭제
            } else if( $(this).hasClass('clear') ) {
                onClear(); // 선택TextInput 삭제
            } else if( $(this).hasClass('shift') ) {
                onShift(); // 쉬프트키 입력
            } else if( $(this).hasClass('num') ) {
                onNum($(this)); // 영문 <-> 숫자,특수문자 입력
            }
            
            if($(this).text().length == 0) return; // 공백 키보드 입력시 아무동작 안함

            ws_send("K[10]");
            bleepPlay();
        }
        
        /**
         * 문자입력
         * @param  none
         * @return none
         */ 
        function onCharacter(str) {            
            // 공백 키보드 입력시 아무동작 안함
            if(str.length == 0) return; 
                        
            let afterStr = selectBox.val() + str;   // 입력 후 글자
            let maxLength = selectBox[0].maxLength; // 입력 가능 최대 글자 수
            let isOver = ( afterStr.length > maxLength );  // 입력 가능 최대 글자 수 초과 유무 (true: 초과됨, false: 초과안됨)
            
            if(!isOver) {
                selectBox.val(afterStr);            
                selectBox.focus();
            }
            
            checkMinMax();

            returnSetting();           
            confirmSet();
        }

        /**
         * 1글자 삭제
         * @param  none
         * @return none
         */ 
        function onBack() {          
            selectBox.val(selectBox.val().slice(0, -1));                       
            selectBox.addClass("focus");
            selectBox.focus();

            returnSetting();
            confirmSet();
            
            checkMinMax();
        }

        /**
         * 선택 textinput 글자 모두 삭제
         * @param  none
         * @return none
         */           
        function onClear() {            
            selectBox.val("");                        
            selectBox.addClass("focus");
            selectBox.focus();

            returnSetting();
            confirmSet();          
        }

        /**
         * Shitft 키 누름
         * @param  none
         * @return none
         */    
        function onShift() {            
            let keyboardLayout;
            
            if(numFlag) {                
                if(shiftFlag) keyboardLayout = QWERTY_NUM;       // 숫자/특수문자 화면 -> 특수문자2 화면
                else          keyboardLayout = QWERTY_NUM_SHIFT; // 특수문자2 화면 -> 숫자/특수문자 화면 
            } else {                
                if(shiftFlag) keyboardLayout = QWERTY_EN;        // 알파벳 입력 화면: 알파벳 대문자 -> 알파벳 소문자                    
                else          keyboardLayout = QWERTY_EN_SHIFT;  // 알파벳 입력 화면: 알파벳 소문자 -> 알파벳 대문자                    
            }
            
            shiftFlag = !shiftFlag;
            
            updateLayout(keyboardLayout); // 레이아웃 새로 그리기
        }
        
        /**
         * 영문 <-> 숫자/특수문자 전환
         * @param  none
         * @return none
         */ 
        function onNum(target) {            
            let keyboardLayout;

            if(numFlag) {
                if(shiftFlag) keyboardLayout = QWERTY_EN_SHIFT;  // shift ON  상태에서 '숫자입력' -> '알파벳 입력' : 대문자키보드                                      
                else          keyboardLayout = QWERTY_EN;        // shift OFF 상태에서 '숫자입력' -> '알파벳 입력' : 소문자키보드                             
                target[0].innerText = "&123"
            } else {
                if(shiftFlag) keyboardLayout = QWERTY_NUM_SHIFT; // shift ON  상태에서 '알파벳 입력' -> '숫자입력' : 특수문자 2                    
                else          keyboardLayout = QWERTY_NUM;       // shift OFF 상태에서 '알파벳 입력' -> '숫자입력' : 특수문자 1
                target[0].innerText = "EN";
            }
            
            updateLayout(keyboardLayout); // 레이아웃 새로 그리기
            
            numFlag = !numFlag;           
        }

        /**
         * TextInput선택*/
         // @param  none
         // @return none
        
        function onTextInput(event) {            
            if(event.type == "touchstart") mFlag = true;
            if(event.type == "mousedown" && mFlag) return true;

            selectBox = $(this);            
            $(".textBox").removeClass("focus");
            selectBox.addClass("focus");

            event.stopPropagation();

            let keyboardLayout;
            
            if(selectBox[0].id == "inputBox0") {
                // 첫번째 textinput 선택 시, 키보드레이아웃을 숫자/특수문자(특수문자 1)로 변경
                numFlag = true;                
                shiftFlag = false;
                $(".qwerty_key.num")[0].innerText = "EN";
                keyboardLayout = QWERTY_NUM;
            } else {
                // 두번째 textinput 선택 시, 키보드레이아웃을 영문소문자로 변경
                numFlag = false;
                shiftFlag = false;
                $(".qwerty_key.num")[0].innerText = "&123"
                keyboardLayout = QWERTY_EN;
            }

            updateLayout(keyboardLayout); // 레이아웃 새로 그리기

            ws_send("K[10]");
        }

        /**
         * 입력 최소길이, 최대길이 체크
         * 
         * @param  none
         * @return none
         */
        function checkMinMax() {    
            
            let isExceed = ( selectBox.val().length >= selectBox[0].maxLength ); // 입력최대값초과유무 (true: 초과됨, false: 초과안됨)
            
            let tmp0 = $("#inputBox0");
            let tmp1 = $("#inputBox1");
            
            let isMinOK_0 = ( tmp0.val().length >= tmp0[0].minLength ); // 첫번째 TextInput 최소값 초과 유무 (true: 초과됨, false: 초과안됨)
            let isMinOK_1 = ( tmp1.val().length >= tmp1[0].minLength ); // 두번째 TextInput 최소값 초과 유무 (true: 초과됨, false: 초과안됨)

            if(isExceed) {
                               
                selectBox.removeClass("focus");
                let isChanged = false; // TextInput 포커스 변경 유무 (true: TextInput Focus 변경O, false: TextInput Focus 변경X)

                if(selectBox[0].id == "inputBox0") {
                    if(!isMinOK_1) {
                        selectBox = $("#inputBox1");
                        isChanged = true;
                    }
                } else if(selectBox[0].id == "inputBox1") {
                    if(!isMinOK_0) {
                        selectBox = $("#inputBox0");
                        isChanged = true;
                    }
                }

                selectBox.addClass("focus");
                selectBox.focus();

                if(isChanged) {
                    // 클릭 시 숫자패드, 영문패드 자동 전환
                    if(selectBox[0].id == "inputBox0") {
                        numFlag = true;
                        shiftFlag = false;                    
                        $(".qwerty_key.num")[0].innerText = "EN";
                        updateLayout(QWERTY_NUM);
                    } else if(selectBox[0].id == "inputBox1") {                  
                        numFlag = false;
                        shiftFlag = false;
                        $(".qwerty_key.num")[0].innerText = "&123"
                        updateLayout(QWERTY_EN);
                    }            
                }
            }
        }
     
        /**
         * 리턴값 세팅
         * @param  none
         * @return none
         */    
        function returnSetting() {  
            for(let i = 0 ; i < btnArr.length ; i++) {
                // iname으로 찾던 값 className으로 변경
                if(btnArr[i].attr("className") == "confirm_btn") {
                    btnArr[i].breturn = '=[' + replaceText($("#inputBox0").val()) + "_|_" + replaceText($("#inputBox1").val()) + ']';
                    console.log(btnArr[i].breturn)
                }
            }

            
        }

        //[,]는 AP약속된 문자라 사용할 수 없기때문에
        //AP에서 지정해준 문자열로 바꿔 셋팅해주는 함수
        function replaceText(val){
            var exString = val;
            var exChager = exString.replace(/(\[|\])/g, function(vl){
                    switch(vl){
                     case "[" : return "&b|<;";
                     case "]" : return "&n|>;";
                    }
            })

            return exChager
        }

        /**
         * 확인버튼 활성화 유무 체크
         *  - 입력창 최소자리수까지 입력해야 확인버튼 활성화
         * @param  none
         * @return none
         */ 
        function confirmSet(){
            let confirmBtn;
            if( paramXml.class && paramXml.class.includes('confirmChk')) {
                for(let i = 0 ; i < btnArr.length ; i++) {
                    if(btnArr[i].attr("className") == "confirm_btn") {
                        confirmBtn = btnArr[i];
                        break;
                    }
                }
                
                let isReady = $("#inputBox0").val().length >= $("#inputBox0")[0].minLength 
                           && $("#inputBox1").val().length >= $("#inputBox1")[0].minLength;

                if(isReady) {
                    confirmBtn.dimd = "0";
                    $(".confirm_btn").css({'-webkit-filter': 'grayscale(0) opacity(1)'});
                }else{
                    confirmBtn.dimd = "1";
                    $(".confirm_btn").css({'-webkit-filter': 'grayscale(100%) opacity(0.5)'});
                }
            }
        }

       /**
        * 키보드 레이아웃 갱신
        * 
        * @param keyboardLayout Array 키보드 레이아웃 배열
        */
        function updateLayout(keyboardLayout) {        
            for(let i = 0 ; i < $(".qwerty_key.key").length ; i++) {                
                let obj =  $(".qwerty_key.key:eq(" + i + ")");
                obj.text(keyboardLayout[i]);
                if(obj.text().length == 0) obj.addClass("qwerty_key_disabled");    // 이름없는 키는 비활성화
                else                       obj.removeClass("qwerty_key_disabled");
            }
        }
    }   // end of 전처리

    // 후처리 함수
    this.callF = function (gab) {
    }
}