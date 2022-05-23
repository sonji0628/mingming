/*************************************************************************************
    FileName			:	SMC_20014.js
    Description			:	smc 통신변수 화면(S20014,S20015화면 사용)
    Created Date		:	2016.11.29
    Created By			:	ATEC AP, (전기준)
    Revision History	:	
             ver 1.0.0.0 (2016.11.29) - 최초작성 smc 요소에 사용가능한  s3002 클라스 전기준 black™ (010-4255-3564)
             ver 1.0.0.2 (2021.11.03) - 장보고 버전 -> 국민은행 시재관리기 버전으로 수정 (손지민)
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

"use strict";
for (var i = 0; i < cmArr.length; i++) {
  if (cmArr[i].class == "20014") { //요기 바꿔주고
    cmArr[i].jsObj = new SMC_20014(Number(cmArr[i].index)); //요기 바꿔주고
    cmArr[i].jsObj.evt();
    //LG_CNS.log("SMC_20014클래스 추가"); //요기 바꿔주고
  }
}

function SMC_20014(ind) { //해당 콘트롤러의 인덱스값을 받아옴.
    var UTIL = new Util();

    this.iname = $(cmArr[ind].xmlObj).attr("iname"); //iname 넣어주기

    //상태|0|1|OffLine=1,OnLine=0|0|1;...
    // 항목이름|키패드형식|초기데이터값|데이터내용(입력형식안내)|입력최소값|입력최대값;
    // 키패드형식 => 0 : 숫자패드, 1 : 숫자 + A-F, 2 : 숫자 + 영문전체
    var evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기

    var arrGetData = [];
    var arrSetData = [];
    var arrReturnData = [];
    var listNum = "";

    this.evt = function () { //전처리 함수
    this.callF(evtParam);

    arrGetData = evtParam.split(";");
    arrGetData = arrGetData.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
        return item !== '';
    })

    for(var i = 0 ; i < arrGetData.length; i++) {
        arrSetData[i] = arrGetData[i].split("|");
        arrReturnData[i] = arrGetData[i].split("|");
    }
    console.log("arrGetData Array => " + arrGetData);
    console.log("arrGetData Array [0] => " + arrGetData[0]);
    console.log("arrSetData Array => " + arrSetData);
    console.log("arrSetData Array [0] => " + arrSetData[0]);
    console.log("arrReturnData Array => " + arrReturnData);


    $("#cm"+ind).append('<div class="smc_main_768">'
                            +'        <div class="contentArea">'
                            +'            <div class="smc_20014_list_info">변경하실 변수를 선택하여 주십시오</div>'
                            +'            <div class="smc_20014_list_outline">'
                            +'            </div>'
                            +'        </div>'
                            +'    </div>'
                            +'    <div class="smc_setting_popup_box">'
                            +'        <div class="smc_setting_popup_inbox">'
                            +'            <div class="smc_setting_popup_info_box">'
                            +'                <div class="smc_setting_popup_info_title"></div>'
                            +'                <div class="smc_setting_popup_info_input_first">'
                            +'                    <div class="smc_setting_popup_info_input_first_title">초기값</div>'
                            +'                    <div class="smc_setting_popup_info_input_first_data"></div>'
                            +'                </div>'
                            +'                <div class="smc_setting_popup_info_now_info">'
                            +'                    <div class="smc_setting_popup_info_now_info_title">현재값</div>'
                            +'                    <div class="smc_setting_popup_info_now_info_data"></div>'
                            +'                </div>'
                            +'                <div class="smc_setting_popup_info_input">'
                            +'                     <div class="smc_setting_popup_info_input_ex"></div>'
                            +'                    <input type="text" class="smc_setting_popup_info_input_write">'
                            +'                </div>'
                            +'            </div>'
                            +'            <div class="smc_setting_popup_input_box">'
                            +'                <div class="smc_setting_popup_keypad keyset_1">1</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_1">2</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_1">3</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_1">4</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_1">5</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_1">6</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_1">7</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_1">8</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_1">9</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_1">0</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_2">.</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_2">_</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_2">A</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_2">B</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_2">C</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_2">D</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_2">E</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_2">F</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">G</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">H</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">I</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">J</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">K</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">L</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">M</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">N</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">O</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">P</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">Q</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">R</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">S</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">T</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">U</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">V</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">W</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">X</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">Y</div>'
                            +'                <div class="smc_setting_popup_keypad keyset_3">Z</div>'
                            +'                <div class="smc_setting_popup_keypad_box">'
                            +'                    <div class="smc_setting_popup_keypad align_right_keypad">CLEAR</div>'
                            +'                    <div class="smc_setting_popup_keypad align_right_keypad">BACK</div>'
                            +'                    <div class="smc_setting_popup_keypad align_right_keypad">SP</div>'
                            +'                </div>'
                            +'            </div>'
                            +'            <div class="smc_setting_popup_footer">'
                            +'                <div class="smc_setting_popup_footer_cancel smcBrownBtn">취소</div>'
                            +'                <div class="smc_setting_popup_footer_confirm smcYellowBtn" dimd="1">확인</div>'
                            +'            </div>'
                            +'        </div>'
                            +'    </div>');

    for (var i = 0 ; i < arrSetData.length ; i++) {
        $(".smc_20014_list_outline").append('<div class="smc_20014_list">'
                                            +'    <div class="smc_20014_list_data setlist'+i+'">'+arrSetData[i][2]+'</div>'
                                            +'    <div class="smc_20014_list_text">'+arrSetData[i][0]+'</div>'
                                            +'</div>');
    }

    if($(".smc_20014_list").length%2 !== 0) $(".smc_20014_list_outline").append('<div class="smc_20014_list empty"></div>');

    if(arrSetData[0][0].indexOf("CCU") == 0 ) {
        $(".smc_main_sub_title").text("동작변수");
        $(".mc_20014_list_info").text("변경하실 동작변수를 선택해 주십시오");
    }

    var keysetting = "";
    var nowSelect = "";
    $(".smc_20014_list_data").bind("click", function(){
        btnAni(this);// 버튼 소리 함수
        var regex = /[^0-9]/g;
        var getName = $(this).attr("class");
        if(!regex.test(getName.substr(-2,2)) == true) {
            listNum = getName.substr(-2,2);
        } else {
            listNum = getName.substr(-1,1);
        }
        keysetting = arrSetData[listNum][1];
        $(".smc_setting_popup_box").show();
        $(".smc_setting_popup_box").css({'display':'flex'});
        $(".smc_setting_popup_info_title").text(arrSetData[listNum][0]);
        $(".smc_setting_popup_info_input_ex").text(arrSetData[listNum][3]);
        $(".smc_setting_popup_info_now_info_data").text($(this).text());
        $(".smc_setting_popup_info_input_first_data").text(arrSetData[listNum][2]);
        nowSelect = $(this);
        $(".smc_setting_popup_info_input_write").focus();
        if(keysetting == "0") {
            $(".keyset_1").show();
        } else if(keysetting == "1") {
            $(".keyset_1").show();
            $(".keyset_2").show();
        } else if(keysetting == "2") {
            $(".keyset_1").show();
            $(".keyset_2").show();
            $(".keyset_3").show();
        }
        ws_send("K[10]");
    });

    $(".smc_setting_popup_keypad").bind("click", function() {
        btnAni(this);// 버튼 소리 함수
        var setText = $(".smc_setting_popup_info_input_write").val();
        if($(this).text() == "BACK") {
            setText = setText.substr(0, setText.length-1);
        } else if($(this).text() == "CLEAR") {
            setText = "";
        } else if($(this).text() == "SP") {
            setText = setText + " ";
        } else {
            setText = setText + $(this).text();
        }
        $(".smc_setting_popup_info_input_write").val(setText);
        if($(".smc_setting_popup_info_input_write").val() == "") {
            $(".smc_setting_popup_footer_confirm").attr("dimd","1");
        } else {
            $(".smc_setting_popup_footer_confirm").attr("dimd","0");
        }
        ws_send("K[10]");
    });

    $(".smc_setting_popup_footer_confirm").bind("click", function() {
        $(".smc_setting_popup_footer_confirm").attr("dimd","1");
        btnAni(this);// 버튼 소리 함수
        arrReturnData[listNum][2] = $(".smc_setting_popup_info_input_write").val();
        nowSelect.text($(".smc_setting_popup_info_input_write").val());
        $(".smc_setting_popup_box").hide();
        $(".smc_setting_popup_info_input_write").val("");
        $(".keyset_1").hide();
        $(".keyset_2").hide();
        $(".keyset_3").hide();
        var setReValue = "";
        for(var i = 0 ; i < arrReturnData.length; i++) {
            setReValue = setReValue + arrReturnData[i][2];
            setReValue = setReValue + ";";
        }
        var getReValue = "=["+setReValue+"]";
        UTIL.setReturnBtn(getReValue,'1');
    });

    $(".smc_setting_popup_footer_cancel").bind("click", function() {
        $(".smc_setting_popup_footer_confirm_cover").show();
        btnAni(this);// 버튼 소리 함수
        $(".smc_setting_popup_box").hide();
        $(".smc_setting_popup_info_input_write").val("");
        $(".keyset_1").hide();
        $(".keyset_2").hide();
        $(".keyset_3").hide();

        ws_send("K[10]");
    });



    }

    this.callF = function (gab) { //후처리 함수

    };


}
