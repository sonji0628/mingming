/*************************************************************************************
	FileName			:	common.js
	Description			:	엔진 로딩 (css 및 js 로딩)
	Created Date		:	2020-03.16
	Created By			:	ATEC AP
    Revision History	:	
         ver 1.0.0.0 - 최초 작성
         ver 1.0.0.1 - 특수화면 처리용 변수 추가, 신규 컨트롤 추가(arrowSts, custom, screenName, snd) (cyg)
         ver 1.0.0.2 (2021.02.15) - 소스통합, 폴더구조 변경 대응, global 변수는 init.js 와 call_f2.js 로 이동 (cyg)
         ver 1.0.0.3 (2021.05.29) - consolelog 를 대체하기 위한 log.js 추가, cyg
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

/*****************************************************************************************
* 화면 기본요소엔진 모음*
*****************************************************************************************/


//---------------------------------[css]--------------------------------------


// ----------------------------------------------------------------------------------------
// css 로딩 - 공용
// ----------------------------------------------------------------------------------------
loadCSS("./css/", "bodyStyle.css");         // 배경스킨이미지 설정
loadCSS("./css/", "btnStyle.css");          // 버튼 css
loadCSS("./css/", "normalize.css");         // 브라우저간 호환 css


// ----------------------------------------------------------------------------------------
// css 로딩 - 국민은행 시재관리기 셀프 키오스크
// ----------------------------------------------------------------------------------------
// loadCSS("./css/", "add.css");               //광고 css
// loadCSS("./css/", "clock.css");             //시계 css
loadCSS("./css/", "calendar.css");                //캘릭더 css
loadCSS("./css/", "atec.css");                 // 국민은행 시재관리기 css
loadCSS("./css/", "atec_smc.css");             //계원 css
loadCSS("./css/", "qwerty.css");               //querty keypad

loadCSS("./css/", "webFonts.css");              //폰트 css



//---------------------------------[JS]--------------------------------------



// ----------------------------------------------------------------------------------------
// script 로딩 - 초기화 
// ----------------------------------------------------------------------------------------
loadJS("./js/core/", "init.js");
loadJS("./js/core/", "call_f2.js");   //후처리 관련


// ----------------------------------------------------------------------------------------
// script 로딩 - 엔진 CORE 스크립드 로딩  
// ----------------------------------------------------------------------------------------
loadJS("./js/core/", "btn.js");       //버튼
loadJS("./js/core/", "basicBox.js");  //기본사각형
loadJS("./js/core/", "msg.js");       //이미지요소
loadJS("./js/core/", "txt.js");       //글자
loadJS("./js/core/", "dxt.js");       //동적글자
loadJS("./js/ten/",  "TEN_setup.js");  
loadJS("./js/core/", "ten.js");       //텐키버튼
loadJS("./js/core/", "video.js");     //무비
loadJS("./js/core/", "ani.js");       //시퀀스애니메이션
loadJS("./js/core/", "fontIs.js");    //서체모음

// 화면엔진 스크립트 로드 - 추가엔진
loadJS("./js/core/", "custom.js");        //특수화면 (사용자 정의 컨트롤) 처리
loadJS("./js/core/", "snd.js");          //sound play
loadJS("./js/core/", "arrowSts.js");     //처리중 화살표 출력
loadJS("./js/core/", "screenName.js");   //화면 네비게이션 처리



// ----------------------------------------------------------------------------------------
// script 로딩 - 엔진 tools 스크립드 로딩  (유틸리티 모음)
// ----------------------------------------------------------------------------------------

// 유틸리티 모듈js
loadJS("./js/tools/", "comma.js");
loadJS("./js/tools/", "popup.js");
loadJS("./js/tools/", "clock.js");  
loadJS("./js/tools/", "util.js");  
loadJS("./js/tools/", "finds.js"); 
loadJS("./js/tools/", "SMC_keyboard.js")
loadJS("./js/tools/", "keylistener.js"); 
loadJS("./js/tools/", "jsonParse.js");   //jsonParse function 사용
loadJS("./js/tools/", "hd_popup.js"); // 공통 팝업 function 호출
loadJS("./js/tools/", "pg_popup.js"); // 사용안내 팝업 function 호출
//loadJS("./js/custom/", "AD_data.js"); // 메인화면(1004 or 1014)의 슬라이더 이미지 정의

// console.log 대치용 함수
loadJS("./js/core/", "log.js");                     // console.log 출력함수

// ----------------------------------------------------------------------------------------
// script 로딩 - 하나은행
// ----------------------------------------------------------------------------------------

// 하나은행 popup
loadJS("./js/tools/", "showPopup.js");