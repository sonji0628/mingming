/*****************************************************************************

   내용: css 및 js 로딩 함수
   최조 작성일: 2018. 03. 14
   작성자: 최용균, 임광진
   변경사항
      ver 1.0.0.0 - 최초 작성
      ver 1.0.0.1 - loadCSS, loadJS 함수 추가 (2018.03.18)
      ver 1.0.0.2 - head태그에 동적으로 js파일링크 생성시키도록 loadCSSsub와 loadJSsub함수 수정 (2018. 06. 15) - 전기준 black™
      ver 1.0.0.3 (2021.01.22) - 폴더구조 변경 대응을 위한 path 관련 변수 정의 (cyg)
      ver 1.0.0.4 (2021.02.15) - 소스통합, 폴더구조 변경 대응, loadCSS(), loadJS() 외 미사용 함수 삭제, 국가상관없는 이미지 폴더 추가(btnOffical, imgOffical) (cyg)
***********************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

// ---------------------------------------------------------------------------------------
// path 설정을 위한 상수 및 변수 정의
// ---------------------------------------------------------------------------------------

// 폴더 위치를 지정하는 변수
const imgRootDir="./images/";                      // images 폴더의 root 위치 (하단에 btn_xx, msg_xx, icons 존재함)  ==> ./ 를 ./images 로 변경
const xmlRootDir="./xmls/";                      // xml 폴더의 root 위치 (하단에 xml_xx 존재함)  ==>  ./ 를 ./xmls 로 변경
const jsRootDir="./js/";                    // script 폴더의 root 위치 (하단에 common, pages 존재함)  ./js 로 사용함(변경없음)
const soundRootDir="./sound/";                    // sound 폴더의 root 위치 (하단에 mp3, snd 존재함),  ==> ./ 를 /sound 로 변경
let btnDir=imgRootDir+"btn_kr/";           // imgRootDir+"/"+btn_xx (언어설정에 따라서 동적으로 변경됨)
let btnOffical=imgRootDir+"btn/"            // 국가 상관없는 통합 버튼 이미지 
let imgDir=imgRootDir+"img_kr/";           // imgRootDir+"/"+msg_xx (언어설정에 따라서 동적으로 변경됨)  ==> msg 를 img 로 변경  (기존 msgDir 변수를 imgdir 변수로 변경함)
let imgOffical=imgRootDir+"img/"            // 국가 상관없는 통합 이미지 
let iconsDir=imgRootDir+"icons/";          // imgRootDir+"/icons" 
let aniDir=imgRootDir+"ani/";              // imgRootDir+"/ani" 
let videoDir=imgRootDir+"video/";          // imgRootDir+"/ani" 
let xmlsDir=xmlRootDir+"xmls_kr/";         // xmlRootDir+"/"+xmls_xx (언어설정에 따라서 동적으로 변경됨)
let coreDir=jsRootDir+"core/";           // 엔진의 코어 코드 (이전의 common 폴더), ==>  common 을 core 로 변경
let toolsDir=jsRootDir+"tools/";            // 엔진의 공통 코드 (이전의 myas, lg_cns 등 으로 존재, 정적로딩) ==> myas 를 tools 로 변경
let customDir=jsRootDir+"custom/";            // custom 폴더 위치 (이전의 msg, smc, nh 등 여러가지 이름으로 존재함, 동적로딩)  ==>  msg 를 custom 으로 변경
let mp3Dir=soundRootDir+"mp3/";            // mp3 폴더 위치
let sndDir=soundRootDir+"snd/";            // snd 폴더 위치

// ---------------------------------------------------------------------------------------
// 소스파일 로딩하는 함수
// ---------------------------------------------------------------------------------------

/*************************************************************************************
	Description		: css 로딩 함수
                        - script 태그 동적 호출
	Input Param		: path = 파일 위치, name= 파일 이름
	Output Param	: None
	return Value	: None
**************************************************************************************/
function loadCSS(path, name){
    let tempLink = document.createElement("link");
    tempLink.href = path + name;
    tempLink.rel = "stylesheet";
    tempLink.type = "text/css";
    document.getElementsByTagName("body")[0].appendChild(tempLink);
}

/*************************************************************************************
	Description		: js 로딩 함수
                        - script 태그 동적 호출
	Input Param		: path = 파일 위치, name= 파일 이름
	Output Param	: None
	return Value	: None
**************************************************************************************/
function loadJS(path, name){
    let tempScript = document.createElement("script");
    tempScript.src = path + name;
    console.log("loadJS: "+  tempScript.src);
    document.getElementsByTagName("body")[0].appendChild(tempScript);
}


