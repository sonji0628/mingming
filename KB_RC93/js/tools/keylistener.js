/*****************************************************************************
   내용: 점맹용 키보드 이벤트 리스너
   최조 작성일: 2021. 04. 20
   작성자: 김성윤
   변경사항
      ver 1.0.0.0 - 최초 작성
***********************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

"use strict";

window.addEventListener("keypress", checkKeyPressed, false);

//  charcode set - 확인 - 117: u,  61: =,  38: &     
//                 취소 -  74: J, 106: j, 126: ~
//                 정정 -  35: #
//                   천 -  94: ^
//                   만 -  37: %
//                   원 -  38: &
// key: keycode, value: DOM의 data-iname 속성값
const CHAR_CODE_MAP_TEN = {  48: 'ten10'   ,  49: 'ten0'   ,  50: 'ten1'   , 51: 'ten2', 52: 'ten3'
                          ,  53: 'ten4'    ,  54: 'ten5'   ,  55: 'ten6'   , 56: 'ten7', 57: 'ten8'
                          , 117: 'confirm' ,  61: 'confirm',  38: 'confirm' // 확인
                          ,  74: 'cancel'  , 106: 'cancel' , 126: 'cancel'  // 취소
                          ,  35: 'ten11'                                    // 정정
                          ,  94: ''                                         // 천
                          ,  37: ''                                         // 만
                          ,  38: ''                                         // 원
                          };

// key: keycode, value: btn identifier (xml에 정의된 버튼을 구분하기위한 식별자, iname)
const CHAR_CODE_MAP_BTN = {  48: 0 ,  49:  1,  50:  2, 51: 3, 52: 4
                          ,  53: 5 ,  54:  6,  55:  7, 56: 8, 57: 9 
                          , 117: 10,  61: 10,  38: 10  // 확인
                          ,  74: 11, 106: 11, 126: 11  // 취소
                          };

// 점맹용 mp3 파일명
// key: keycode, value: 재생할 파일명
const SOUND_FILES = {  48: '0.mp3'     ,  49: '1.mp3'   ,  50: '2.mp3'   , 51: '3.mp3', 52: '4.mp3'
                    ,  53: '5.mp3'     ,  54: '6.mp3'   ,  55: '7.mp3'   , 56: '8.mp3', 57: '9.mp3'
                    , 117: '확인.mp3'  ,  61: '확인.mp3' ,  38: '확인.mp3'    // 확인
                    ,  74: '취소.mp3'  , 106: '취소.mp3' , 126: '취소.mp3'    // 취소
                    ,  35: '정정.mp3'                                        // 정정
                    ,  94: '천.mp3'                                          // 천
                    ,  37: '만.mp3'                                          // 만
                    ,  38: '원.mp3'                                          // 원
                    };

function checkKeyPressed(e) {
    //if (!RcvData.lge.includes('bp')) return;   // 점맹화면일 경우에만 동작
    if (RcvData.screenNumber != "KR2001") return;   // KR2001 화면일 경우에만 동작
    
    let isTenkey = ( document.getElementsByClassName('ten').length != 0 );  // TENKEY화면인지 아닌지 (true: tenkey화면, false: 버튼만있는화면)
    let target, identifier, eventType = "click";
    // let audioFile = SOUND_FILES[e.charCode];

    //if(audioFile) playAudio(audioFile); // 키패드 입력 사운드 재생 

    if(isTenkey) {
        identifier = CHAR_CODE_MAP_TEN[e.charCode];
        target = document.querySelector(`div[data-iname='${identifier}']`);  // Tenkey화면의 '확인', '취소' 버튼일 경우 (일반 btns의 버튼)   
        if(!target) {
            target = document.getElementById(identifier); // Tenkey의 버튼일 경우 (Tenkey엔진에서 생성한 버튼)
            eventType = "mousedown";
        }        
    } else {
        identifier = CHAR_CODE_MAP_BTN[e.charCode];
        target = document.querySelector(`div[data-iname='${identifier}']`);                                
    }
      
    if(!target) return; // 누른 키패드 버튼이 화면에 없으면 return
    
    let isDimd = target.hasOwnProperty('data-dimd') && target.getAttribute('data-dimd') === '1';  
    if(!isDimd) target.dispatchEvent(new Event(eventType));  // dimd일 경우 이벤트 송출안함 
}