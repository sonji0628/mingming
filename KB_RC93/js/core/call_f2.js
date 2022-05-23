/*************************************************************************************
	FileName			:	call_f2.js
	Description			:	소켓 메시지 수신 후 화면호출 처리 (전처리)
                             - iframe 에 화면번호.html 로딩
                             - 화면의 pageNumber 영역에 화면번호 출력 
	Created Date		:	2020-03.16
	Created By			:	ATEC AP, cyg
	Revision History	:	
         ver 1.0.0.0 (2020-03-16) - 기존 call_f2.js 을 수정하여 생성함
         ver 1.0.0.1 (2020.01.18) - iframe 관련 코드 삭제, 국가코드에 따른 path 변경기능 추가, cyg
         ver 1.0.0.2 (2020.02.01) - 하나은행 통합,  util 변수 삭제, myComma 추가 외 추가, cyg
         ver 1.0.0.3 (2020.02.05) - 하나은행 통합,  후처리명령 'f5', 'SENDJSON' 추가, cyg
         ver 1.0.0.4 (2020.02.18) - 하나은행 통합,  후처리명령 'popup' 추가, cyg
         ver 1.0.0.5 (2020.03.15) - globalIs 변수를 btns.js 로 이동, cyg
         ver 1.0.0.6 (2021.04.30) - 특수화면 처리를 cm 으로 완전 이동함, cyg
         ver 1.0.0.7 (2021.05.19) - 모듈 로딩완료 설정, (cyg)
         ver 1.0.0.8 (2021.05.21) - doPopup 다국어 폰트 대응(parameter추가), LHS
         ver 1.0.0.9 (2021.05.21) - 특수화면(custon) 초기화 종료후 tenKey 로딩방식으로 변경, (임광진)
         ver 1.0.0.10 (2021.05.26) - 오타수정: SENDJSONE -> SENDJSON, (cyg)
                                   - doToggleDebugMode(), doToggleScreenTester() 추가 
         ver 1.0.0.11 (2021.10.25) _ 점번, 기번 셋팅 함수 추가 (손지민)
         ver 1.0.0.12 (2021.10.26) - main화면과 계원화면 등등 화면전환으로 인한 스킨 변경을 위해 
                                     updateScreen함수에 command 추가 =>"directCmd"
                                     doDirectCmd 함수 추가 (손지민)
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/


// ----------------------------------------------------------------------------------------
// 화면 엔진의 데이터 저장을 위한 변수 선언
// ----------------------------------------------------------------------------------------
// 기본엔진 처리를 위한 xml 저장용 array 변수 선언
let bgxArr = [];//박스 배열
let btnArr = [];//버튼 배열
let videoArr = [];//영상 배열 ==> flvArr 을 videoArr 로 변경함

// 특수화면 cm tag 완전 전환 2021.04.30 (cyg)
//let msgArr = [];//이미지 배열 

let txtArr = [];//글자 배열 
let dxtArr = [];//동적 글자 배열
let tenArr = [];//텐 버튼 배열 
let aniArr = [];//시퀀스 이미지 배열 

// 특수화면 처리용 변수
let msgClassArr = [];//msg 클래스 배열 
let msgObj = {};//특수화면을 담을 msg오브젝트 

let tenObj = {};//텐키를 담을 ten오브젝트 




// ---------------------------------------------------------------------------------------
// AP에서 수신된 메세지를 저장하는 변수
// ---------------------------------------------------------------------------------------
var RcvData={
    lge:"",              // language code 저장 변수 (lge)
    xmlData:"",         // 화면 xml 데이터
    screenNumber:"",    // 화면번호
    };


// ---------------------------------------------------------------------------------------
// 상수선언
// ---------------------------------------------------------------------------------------
// 미사용 상수 삭제 2021.05.19 (cyg)
//const tranDelay = "0.6s";       // transition 시간
//const testmode = true;          // true : pc환경에서 테스트값 전송, false : 테스트값 대신 param값

// 미사용변수 삭제함, 특수화면 cm tag 완전 전환 2021.05.14 (cyg)
// const testmode = true;          // true : pc환경에서 테스트값 전송, false : 테스트값 대신 param값
const eventType = "click";      // win10 기기에서 마우스,클릭 이벤트가 아닌 터치이벤트로 발생 pc에서 사용할땐 click, 기기올릴땐 touchstart 설정


// ---------------------------------------------------------------------------------------
// 변수 선언
// ---------------------------------------------------------------------------------------
let eventFlag = false;          //화면 종료면 true, 확인 또는 취소버튼 누른경우 true로 바뀌고 화면 호출되면 false됨
let clickFlag = false;          //버튼이 눌렸는지 체크

let globalInterval = [];        // interval 사용 후 이 배열에 넣으면 화면 변경 시 call_f2에서 자동으로 clear함 -- 삭제여부 판단 필요
let uiCreator = false;          // uiCreator 기능을 사용할것인지 ( ### 기존 변수 일단 그대로 둠 2020.03.16 ### )

//let util;                       // util.js를 사용하기 위한 전역객체
let tenClass = null;            //텐객체-비번인지, 만천인지, 일반 텐키인지에 따라서 클라스를 다르게 부른다.
let myComma = {};               // 컴마제어클라스, TEN_xx.js 에서 사용하며, init() 에서 초기화 됨
let mFlag=false;                //터치가 가능한 환경인지....이값이 true면 mousedown이벤트 무시

let key_listner_check=false;    // 키리스너인지 (전맹용 변수?)
let timerFlag = false;          // util.js 에서 사용한 (timeCount() 함수), local 변수로 변경 필요함
let intervalArr = new Array();  // interval 변수 저장 배열 화면 변경시 clear, util(timeCount(), coinTimer() ), pipup.js 에서 사용함

// 모듈 로딩완료 설정, 2021.05.19 (cyg)
// ---------------------------------------------------------------------------------------
// 화면 종료후 loadPageOk 를 송신하기 위한 변수 및 상수 선언
// ---------------------------------------------------------------------------------------
let coreCompletedFlag = false;      // true: core 소스 로딩 완료
let cmCompletedFlag = false;        // true: custom 의 모든 javascript 로딩 및 초기화 완료
let tenkeyCompletedFlag = false;    // true: tenKey 에서 해당 javascript 로딩 및 초기화 완료
let flagLoadPageOk = false;         // true: loadPageOk 송신완료
const MODULE_CORE = 1;              
const MODULE_CM = 2;            
const MODULE_TENKEY = 3;


// loadpage_ok 를 회신하기 위한 flag 
let loadObj = { // load완료를 검사하기위한 객체
    spdLength : 0,          // 특수화면 갯수 (js 파일 로딩 시작 기준)
    spdloadingSu : 0,       // 로딩된 특수화면 클래스 갯수 (js 파일 로딩완료 이벤트 수신 기준)
    msgLC : "0",            // 특수화면 로드완료 변수
    tenLC : "0"             // 텐키화면 로드완료 변수
}


/*************************************************************************************
	Description		: 화면 호출 함수  (전처리 과정)
    Input Param		: command - 명령어, 
                      xmlData - 호출된 화면.xml의 data, 
                      languageCodeo - language 코드 
	Output Param	: None
	return Value	: None
**************************************************************************************/
function showScreen( command, xmlData, languageCode ){ // 명령어, xmldata, languageCode
    // command 가 bank 인 경우만 전처리 동작을 한다
    if(command.toLowerCase() !== "bank")
    {
        console.log("message 수신 : showScreen() 잘못된 호출");
        return;
    }
    console.log("message 수신 : showScreen() 처리 시작");

    // RcvData 구조제 변수 초기화
    languageCode = languageCode.toLowerCase();

    // 화면번호 파싱 (xml data 의 화면번호 추출)
    let screenNum = String($(xmlData).find("screenNumber")[0].innerText).trim().toUpperCase();

    // 수신 data 보관
    RcvData.xmlData = xmlData;          // 화면 xml 데이터 보관
    RcvData.lge=languageCode;           // showScreen 으로 전달된 languageCode
    RcvData.screenNumber = screenNum;   // 화면번호 보관


    // 전맹, 저시력에 따른 특수 처리 (스킨변경)
    switch (languageCode)
    {
        case 'bp':      // 전맹일
            // skim 을 변경한다.
            $('#skin').css( {'display': 'none'});
            $('#skin_lv').css( {'display': 'none'});
            $('#skin_bp').css( {'display': 'block'});
            break;
        case 'lv':      // 저시력인
            // skim 을 변경한다.
            $('#skin').css( {'display': 'none'});
            $('#skin_lv').css( {'display': 'block'});
            $('#skin_bp').css( {'display': 'none'});
            break;
        default:        // 일반화면
            $('#skin').css( {'display': 'block'});
            $('#skin_lv').css( {'display': 'none'});
            $('#skin_bp').css( {'display': 'none'});
            break;
    }
    
    // 언어 변경에 따른 폴더위치 변수 설정
    switch( languageCode)
    {
        case "bp":   // 전맹인
        case "lv":   // 저시력
        case "kr":   // 한국어
        case "en":   // 영어  
        case "ch":   // 중국어
        case "jp":   // 일본어
        case "bt":   // 베트남
        case "ge":   // 독일  
        case "fr":   // 프랑스
        case "id":   // 인도  
        case "pk":   // 파키스탄
        case "sp":   // 스페인
        case "ti":   // 태국  
        case "th":   // 몽골 
        case "ph":   // 필리핀 
        case "bg":   // 방글라데시
        case "ru":   // 러시아 
        case "in":   // 인도네시아
        case "sl":   // 스리랑카 
        case "ca":   // 캄보디아어
        case "np":   // 네팔
            // 언어코드의 path 를 설정한다
            btnDir=imgRootDir+"/btn_"+languageCode+"/";         // imgRootDir+"/"+btn_xx (언어설정에 따라서 동적으로 변경됨)
            imgDir=imgRootDir+"/img_"+languageCode+"/";         // imgRootDir+"/"+img_xx (언어설정에 따라서 동적으로 변경됨)
            //xmlsDir=xmlRootDir+"/xmls_"+languageCode+"/";        // xmlRootDir+"/"+xmls_xx (언어설정에 따라서 동적으로 변경됨)
            break;
        default:
            // 미정의 언어코드는 한글로 설정한다
            btnDir=imgRootDir+"/btn_kr/";         
            imgDir=imgRootDir+"/img_kr/";         
            //xmlsDir=xmlRootDir+"/xmls_kr/"        
            break;
    }

    // 국가코드에 해당되는 기본 폰트정보를 설정한다
    setDefaultFont( languageCode);

    // 이전화면 정보 clear
    initScreen();

    // 수신된 xml 분석 및 화면 그리기 (전처리) 수행
    xmlParse(xmlData, languageCode, screenNum);
    
    // debugMode 인 경우, 화면 상단에 화면번호 표시
    if(debugMode)
    { 
        // 화면에 화면번호 표시 (개발 & 디버그용)
        $("#pageNumber").text(screenNum);
    }

    // showScreen() 호출 시 ws_send("_loadPageOk"); 호출 후 eventFag = false; 하게 함
    // eventFlag = false;
    
    // 화면 호출 시 wsFlag = false 로 초기화
    wsRTN_f("");

    // 모듈 로딩완료 설정, 2021.05.19 (cyg)
    $(document).ready(function() {
        checkCompleted(MODULE_CORE);
    });
    // ws_send("_loadPageOk");
    

    console.log(`#1 message 수신 : showScreen()  처리 종료, screenNumbere=${screenNum} `);
}

// 화면을 새로 그리기 전에 xml요소를 저장한 데이터를 삭제한다
function initScreen()
{ 
    destroyBgx();       // 기본상자
    destroyBtn();       // 버튼
    destroyMsg();       // 이미지
    destroyTxt();       // 글자
    destroyDxt();       // 동적글자
    destroyVideo();     // 영상
    destroyTen();       // 텐키
    destroyAni();       // 이미지 시퀀스
    destroyArrowSts();  // 처리중 컨트롤 
    destoryPopup();     // popup 화면 종료

    // 특수화면 cm tag 완전 전환 2021.04.30 (cyg)
    destroyCustom();    // 특수화면 
    
    //clearInterval(timer)
    // gloval 변수 초기화
    timerFlag = false;
    key_listner_check = false;

    // 모듈 로딩완료 설정, 2021.05.19 (cyg) - 동적 js 로딩 변수 초기화
    coreCompletedFlag = false;
    cmCompletedFlag = false;
    tenkeyCompletedFlag = false;
    flagLoadPageOk = false;


    $("body").css({"background-color":"#ffffff"});

    // 코드통합 2021.03.15 (cyg)
    // popup 초기화 
    /** POPUP.JS 로 이동함
    $("#popup_background_div_black").remove(); // 팝업 종료
    intervalArr.forEach((element,index) => { // interval clear
        clearInterval(element)
    });
    intervalArr = [];
    **/

    if($("#skin").find("div").hasClass("journal_print_loading") == true) {
        $(".journal_print_loading").remove();
    }
}
    
// 수신된 xml 을 해석하여 화면을 그리는 함수를 호출 한다.
function xmlParse(xmlData, languageCode, screenNumber)
{
    console.log('xml parse start');
    //console.log('xmlData = ' + xmlData);

    stopSnd();      // 기존 출력되는 소리가 있으면 정지한다.
    basicBox_f($(xmlData).find("BasicBox"), languageCode); // 기본상자 파싱
    btn_f($(xmlData).find("sButton"), languageCode);       // 버튼 파싱
    msg_f($(xmlData).find("BlockBox"), languageCode);      // 이미지 파싱 및 특수화면 파싱
    txt_f($(xmlData).find("BlockMsg"), languageCode);      // 글자 파싱
    dxt_f($(xmlData).find("InputMsg"), languageCode);      // 동적글자 파싱
    custom_f($(xmlData).find("Custom"), languageCode, screenNumber);     // 특수화면 (Custom control) 파싱
    video_f($(xmlData).find("Video"), languageCode);       // 영상 파싱 ==> flv 를 video 로 변경함
    // ten_f($(xmlData).find("Tenkey"), languageCode);        // 텐키 파싱
    ani_f($(xmlData).find("aniBox"), languageCode);        // 이미지 시퀀스 파싱
    snd_f($(xmlData).find("Snd"), languageCode);           // sound play 파싱
    arrowSts_f($(xmlData).find("ArrowSts"), languageCode);    // 처리중 컨트롤 파싱
    screenName_f($(xmlData).find("screenName"), languageCode);       // 화면 navigation 파싱
    

    console.log('xml parse end');
}

// 모듈 로딩 완료후 loadpageOk 를 송신하는 함수
function checkCompleted(module){
    console.log("checkCompleted: "+module);
    switch(module)
    {
        case MODULE_CORE:
            coreCompletedFlag = true;
            break;
            case MODULE_CM:
                cmCompletedFlag = true;
                ten_f($(RcvData.xmlData).find("Tenkey"), RcvData.lge, RcvData.screenNumber);// 텐키 파싱
                 
            break;
        case MODULE_TENKEY:
            tenkeyCompletedFlag = true;
            break;
    }

    // core 모듈, 특수화면, tenKey 가 모두 completed 되면 loadpageOk 를 송신한다.
    if( coreCompletedFlag == true && cmCompletedFlag == true && tenkeyCompletedFlag == true)
    {
        // 화면 load 완료후 loadPageOk 는 최초 1회만 송신한다.
        if( flagLoadPageOk == false)
        {
            flagLoadPageOk = true;
            ws_send("_loadPageOk");
            console.log("_loadPageOk");
        }
    }
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    후처리 영역 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*************************************************************************************
	Description		: 후처리 작업 함수
						- UpdateText, UpdateBlockBox, ShowDimdBtn 등 이미 화면이 그려진 후의 처리
						- 전처리에 사용된 기본 컨트롤의 후처리 기능을 수행함
						- 미정의 기능은 각 화면에서 정의된 함수를 호출함
	Input Param		: command - 명령어, param1, param2 - 상세 데이터는 '|' 으로 구분되어 있음
	Output Param	: None
	return Value	: None
**************************************************************************************/
function updateScreen( command, param1, param2)
{
	let lge= RcvData.lge;
    
    /*
    후처리 - UpdateText, UpdateBlockBox, ShowDimdBtn 등 이미 화면이 그려진 후의 처리
    기존의 명령어

    - UpdateText
        txtMsg`iname`string
    - UpdateBlockBox
        sendMsg`iname`parameter
    - ShowDimdBtn
        dimdBtn`xml에들어간 요소 순서`flag ( 1 - dimd, 0 - no dimd )
    */

    // 작업중.. param 의 lge 를 제거하자 !!!
	switch (command) 
    {
		// 기본 후처리 함수
		case "dimdBtn":		// 버튼 축퇴
			// 함수위치: btn.js
			doDimdBtn(param1, param2);		
			break;
		case "idleDimd":	// 아이들 메뉴 딤드시키기  
			doIdledimd( param1, param2);
			break;
		case "showBtn":  	// 버튼 보이거나 가리기  
            // 함수위치: btn.js
			doShowBtn( param1, param2, lge);
			break;
		case "txtMsg":		// 글자 출력
			// 함수위치: dxt.js
			doTxtMsg( param1, param2);
			break;
		case "videoPlay":	// 동영상 play
			// 함수위치: flv.js
			doVideoPlay( param1, param2);
			break;
		case "sendMsg":		// 글자 넣기 및 후처리 함수 호출, 후처리 함수에 공통으로 사용됨.
            doSendMsg( param1, param2);
			break;
		case "arrowSts":   // 처리중 화살표
			doArrowSts(param1, param2);
            break;       
        case "SENDJSON":  // 후처리 jsonData 수신
            doSendJson( param1, param2);
            break;
        case "ShowPopup" :  // popup 화면 출력 (tools 에 구현되어 있음)
            doPopup( param1, param2, lge);
            break;
        case "ClosePopup" :  // popup 화면 AP 강제종료
            destoryPopup();
            break;
        case "f5":  // 개발자 기능: html reload 명령
            console.log("f5 수신 - 화면 reload");
            location.reload();
            break;
        case "f4": // 개발자 기능: screenTester 기동 또는 종료
            doToggleScreenTester(); 
            break;
        case "f3": // 개발자 기능: debugMode 토글 기능
            doToggleDebugMode();
            break;
        case "directCmd": // 기계별 셋팅 변경 -> 강건용책임님과 협의하여 추가 한 기능 (2021.10.26)
            doDirectCmd(param1, param2);
            break;

	}
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
// 메뉴 공통으로 적용되는 후처리 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////


/*************************************************************************************
	Description		: 전체메뉴 딤드 (농협 STM 소스)
					  updatePage() 에서 호출받는 형식 :  idleDimd`딤드시킬 버튼 리턴값1|리턴값2|리턴값3..`딤드는1 딤드해제는0 왼쪽 리턴값과 짝이 맞게 구성함
					  상세 데이터는 '|' 으로 구분되어 있음
					  예:idleDimd`c10|c03|c41|r11|r43`1|1|1|1|1 
	Input Param		: 
					  param1 = 딤드시킬 버튼 리턴값1|리턴값2|리턴값3 으로 구성된 문자열
					  param2 = 딤드는1 딤드해제는0 왼쪽 리턴값과 짝이 맞게 구성된 문자열
	Output Param	: None
	return Value	: None
**************************************************************************************/
function doIdledimd( param1, param2)
{
	var bbArr = param1.split('|');
	var cc = param2;
	var ccArr;
	
	if(cc != undefined && cc != null && cc != "") ccArr = param2.split('|');

	for(var j=0; j<bbArr.length; j++){
		$("#allMenu").find("label").each(function(){
			if($(this).text().split('[')[1].split(']')[0] == bbArr[j]){
				if(String(ccArr[j]) == "1"){
					myDim.startDim($(this).parent("div")); // 딤드 (disable)
				} else {
					myDim.endDim($(this).parent("div")); // 딤드해제 
				}
			}
		});
	}
}


/*************************************************************************************
	Description		: screenTester 를 위한 6021 websocket 을 기동, 중지 한다
                      ui studio 를 이용하여 화면개발시 6020 port 를 사용한다.
                      이때, screenTester 를 이용하여 화면 시험을 하고자 할때 이 기능을 사용한다.
                      f4`` 를 수신하면 기동과 종료를 토글시킨다.
	Input Param		: none
	Output Param	: None
	return Value	: None
**************************************************************************************/
function doToggleScreenTester()
{
    // 종료 상태이면 기동한다
    if( debugMode_screenTester == false)
    {
        console.log("f4 수신 - debugMode_screenTester 시작");
        debugMode_screenTester = true;
        errorCount_screenTester = 0;
        call_screenTester();
    }
    // 기동 상태 이면 종료 한다
    else
    {
        console.log("f4 수신 - debugMode_screenTester 중지");
        errorCount_screenTester = 100;
    }
    
}

/*************************************************************************************
	Description		: 화면에 화면번호, return Value 를 표시하는 기능을 토글한다.
                      f3`` 를 수신하면 화면번호, return value 표시를 on/off 한다
	Input Param		: none
	Output Param	: None
	return Value	: None
**************************************************************************************/
function doToggleDebugMode()
{
    // 종료 상태이면 기동한다
    if( debugMode == false)
    {
        console.log("f3 수신 - debugMode 시작");
        debugMode = true;
    }
    // 기동 상태 이면 종료 한다
    else
    {
        console.log("f3 수신 - debugMode 중지");
        debugMode = false;
        $("#rtn").text("");
        $("#pageNumber").text("");
    }
}


/*************************************************************************************
    Description		: 기계별 셋팅 변경
    Input Param		: 
                - param1 : 기능구분 (일반적으로 iname 사용함)
                - param2 : 상세 데이터
	Output Param	: None
	return Value	: None
**************************************************************************************/

//점번, 기번을 위한 변수
// let machineInfo = {}; //점번, 기번 데이터 저장
// machineInfo.branchNum = ""; //점번
// machineInfo.machineNum = "";//기번

function doDirectCmd(param1, param2)
{
    let name=param1;
    let data=param2;

    switch(name)
    {
        case    "_TERM_ID_":     
                // 점번, 기번 전송
                data = data.split("|");
                $("#branchName").empty().append("점번호 : " + data[0] + "&nbsp;&nbsp;기번 : " + data[1] + "&nbsp;&nbsp;" + data[2]);
                break;
        case    "_TOPIS_" :      
                // 화면 스킨 변경
                // data : main -> 일반 운영화면     kbmanage -> 계원화면
                if(data == "kbmanage")  $("#container").removeClass().addClass("manage");
                else                    $("#container").removeClass();   
                break;     
        }
    
}
