/*************************************************************************************
	FileName			:	init.js
	Description			:	전역변수 정의 및 window.onload 실행
                            상수는 const로 선언, 나머지 변수는 let으로 선언한다.
	Created Date		:	2020-03.16
	Created By			:	ATEC AP, 
	Revision History	:	
         ver 1.0.0.0 - 최초 작성
         ver 1.0.0.1 (2020.03.16) - 기존 init.js 을 수정하여 생성함
         ver 1.0.0.2 (2021.02.01) - 하나은행 통합작업, 날짜/시간 표시기능 추가 - init() 에 realTime() 추가함.
         ver 1.0.0.3 - loadJS() 를 common.js 로 이동
         ver 1.0.0.4 (2021.03.03) - 거래키 리턴정보를 이용한 네비게이션 영역 출력기능 추가 (cyg)
         ver 1.0.0.5 (2021.03.24) - UI Studio 와 screenTester 를 동시에 사용하기 위해, ws_screenTester 추가함 (cyg) 
         ver 1.0.0.6 (2021.05.19) - 네비게이션 정보 update 후 loadPageOk 송신 으로 변경, cyg
         ver 1.0.0.7 (2021.05.20) - screenTester 재접속 횟수를 30 -> 10회 변경, debugMode_screenTester 를 false 로 설정 (통합테스트 준비), cyg
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

// ---------------------------------------------------------------------------------------
// websocket 을 위한 상수 및 변수 선언
// ----------------------------------------------------------------------------------------

// 통신접속을 위한 상수 선언
const port = "6020"; // CAT : 6020, AD : 7020, SMC : 8020
const url = "ws://127.0.0.1:" + port;


// 테스트, 디버깅을 위한 변수로 pc에서는 click이벤트, 기기에서는 mousedown 이벤트를 적용한다(주석 사용)
let debugMode = false; // 디버그모드, 화면에 return값을 표시하는 용도로 사용 예정

// websocket 처리를 위한 변수 선언
let ws; //소켓객체를 전역변수로 선언 함
let wsFlag = false; // 소켓 메시지 송신 함수 ws_send()에서 사용할 플래그변수
let wsTimeOut=0;    // 소켓 재접속을 위한 타임아웃 변수


// 코드통합 2021.03.24 (cyg)
// UI Studio 와 screenTester 를 동시에 사용하기 위한 변수 선언
let debugMode_screenTester = false;    // UI Studio 와 screenTester 를 동시에 사용할지 판정하기 위한 변수
const url_screenTester =  "ws://127.0.0.1:" + (Number(port)+1);   // UI Studio 와 screenTester 를 동시에 사용하기 위한 ws 접속주소
let ws_screenTester;                        //소켓객체를 전역변수로 선언 함
let wsFlag_screenTester = false;            // 소켓 메시지 송신 함수 ws_send()에서 사용할 플래그변수
let wsTimeOut_screenTester=0;               // 소켓 재접속을 위한 타임아웃 변수
let errorCount_screenTester = 0;            // screenTester 의 error count 가 지정횟수 이상 경과되면, 자동으로 debugMode_screenTester 를 false 로 변경한다.
const MAX_ERROR_COUNT_SCREEN_TESTER = 10;   // screenTester 의 error count 최대값
//let pageNumber = ""

let branchNameSet = ""; //점번,기번 이름 저장하기 위한 변수 21.10.13 손지민

// 폴더구조 변경을 위한 파일위치 변수 선언
/*************************************************************************************
    Description		: root_main.html이 로드되었을때 실행되는 이벤트 함수
                    기존의 $(document).ready(function(){}) 부분을 jqwery 제외한 버전 ( jqwery와 로드시점 차이 있음 )
                    문서의 기본 
	Input Param		: None
	Output Param	: None
	return Value	: None
**************************************************************************************/
window.onload = () => {
    console.log("root_main.html 로드완료");

    // 마우스 우클릭, 드래그 및 바탕화면 클릭 이벤트 방지
    document.oncontextmenu = function(){ return false;}
    document.ondragstart = function(){ return false;}
    document.selectstart = function(){ return false;}

    // 아우스 더블클릭 방지
    // $('*').dblclick(function() {});

    // 화면변수 초기화
    initScreenName();       // screenName.js 의 함수 호출함
    //initCalendar();             // LBanner 영역에 칼렌더 표시


    call(); // 소켓연결시작

    // screenTester 를 추가로 사용하는 경우
    if( debugMode_screenTester == true) 
    {
        call_screenTester();
    }
    
}


/*************************************************************************************
    Description		: 소켓연결 함수
                      수신된 명령으로 전처리, 후처리 함수를 호출함
                      전처리: 'bank' => showScreen() 호출
                      후처리: 기타 명령 => refreshScreen() 호출
	Input Param		: None
	Output Param	: None
	return Value	: None
**************************************************************************************/
function call()
{
    console.log("# call() 호출 ==> start");

    // 이전 연결된 WS 의 이벤트를 해제한다
    if( window.addEventListener)
    {
        if( typeof(ws) ==='object')
        {
            console.log("ws 정의되어 있음 -> 이벤트 제거 ===>");
            ws.removeEventListener("message", this.socketMessage);
            ws.removeEventListener("open", this.socketOpen);
            ws.removeEventListener("error", this.socketError);
            ws.removeEventListener("close", this.socketClose);
            ws.close();
            delete(ws);
            console.log("ws 정의되어 있음 -> 이벤트 제거 <===");
        }
        else
        {
            console.log("ws 정의되어 있지 않음 -> 이벤트 제거 불필요");
        }
    }

    // WS 를 생성하고, EVENT 를 등록한다
    ws = new WebSocket(url);

    // 소켓 데이터가 수신 되는 경우
    ws.addEventListener("message", this.socketMessage, false);
   
    // 소켓 열릴 때
    ws.addEventListener("open", this.socketOpen, false);

    // 소켓 에러
    ws.addEventListener("error", this.socketError, false);

    // 소켓 닫힐 때
    ws.addEventListener("close", this.socketClose, false);

    console.log ("webSocket="+ws);

    console.log("# call() 호출 <== end");

}

// 추가로 접속되는 screenTester 용 소켓연결 함수
function call_screenTester()
{
    console.log("# call_screenTester () 호출 ==> start");

    // 이전 연결된 WS 의 이벤트를 해제한다
    if( window.addEventListener)
    {
        if(typeof(ws_screenTester) ==='object')
        {
            console.log("ws_screenTester 정의되어 있음 -> 이벤트 제거 ===>");
            ws_screenTester.removeEventListener("message", this.socketMessage_screenTester);
            ws_screenTester.removeEventListener("open", this.socketOpen_screenTester);
            ws_screenTester.removeEventListener("error", this.socketError_screenTester);
            ws_screenTester.removeEventListener("close", this.socketClose_screenTester);
            ws_screenTester.close();
            delete(ws_screenTester);
            console.log("ws_screenTester 정의되어 있음 -> 이벤트 제거 <===");
        }
        else
        {
            console.log("ws 정의되어 있지 않음 -> 이벤트 제거 불필요");
        }

        // screenTester 오류가 30회 (1분) 경과되면 접속시도를 종료한다.
        // console.log("### errorCount_screenTester:"+errorCount_screenTester);
        if( errorCount_screenTester > MAX_ERROR_COUNT_SCREEN_TESTER ) 
        {
            debugMode_screenTester = false;
            console.log("$$$ debugMode_screenTester : "+debugMode_screenTester);
            return;
        }
    }

    // WS 를 생성하고, EVENT 를 등록한다
    ws_screenTester = new WebSocket(url_screenTester);

    // 소켓 데이터가 수신 되는 경우
    ws_screenTester.addEventListener("message", this.socketMessage_screenTester, false);

    // 소켓 열릴 때
    ws_screenTester.addEventListener("open", this.socketOpen_screenTester, false);

    // 소켓 에러
    ws_screenTester.addEventListener("error", this.socketError_screenTester, false);

    // 소켓 닫힐 때
    ws_screenTester.addEventListener("close", this.socketClose_screenTester, false);

    console.log ("webSocket_screenTester="+ws_screenTester);

    console.log("# call_screenTester() 호출 <== end");

}


// 소켓 데이터가 수신되는 경우
function socketMessage(e)
{
    socketMessage_sub(e);
}

// screenTester 에서 소켓 데이터가 수신되는 경우
function socketMessage_screenTester(e)
{
    socketMessage_sub(e);
}

function socketMessage_sub(e)
{
    let receivedDataArr = e.data.split('`'); // 명령어`xmlData`옵션
    console.log("message 수신 : 길이 = "+ receivedDataArr.length);
    if(receivedDataArr.length >= 1)  // 데이터가 들어왔을 경우            
    { 
        let command = receivedDataArr[0]; // 명령어
        console.log("message 수신 : "+ command);

        // 화면호출 명령 (전처리 기능)
        if(command.toLowerCase() === "bank")    // 명령어가 bank(화면호출)로 들어온 경우만 전처리 함수 호출함  (구, call_f2)
        { 
            // 화면호출 함수 호출
            console.log("message 수신 : showScreen() 호출전");
            showScreen(receivedDataArr[0], receivedDataArr[1], receivedDataArr[2]); // ./js/core/call_f2.js
        } 
        // 후처리 명령 (구, call_f2 에 통합되어 있었음)
        else 
        {
            // 후처리 함수 호출
            console.log("message 수신 : updateScreen() 호출전");
            updateScreen(receivedDataArr[0], receivedDataArr[1], receivedDataArr[2]); // ./js/core/call_f2.js
        }
    }

    receivedDataArr = null;
    e.data = null;
}

// 소켓 열릴 때
function socketOpen()
{
    ws_send_sub("connectionOk"); // 소켓준비
    console.log(`소켓열림`);

    try {
        // 초기화 작업 시작
        init();
    } catch (e) {
        console.log(e)
    }
}
// screenTester 소켓 열림
function socketOpen_screenTester()
{
    ws_send_screenTester("connectionOk"); // 소켓준비
    console.log(`screenTester 소켓열림`);
}


// 소켓 에러
function socketError(e)
{
    console.log("** 소켓에러");
    console.log(e);
    
    // debugMode 인 경우, 화면 상단에 리턴값 표시
    if(debugMode)
    { 
        // 화면에 리턴값 표시 (개발 & 디버그용)
        $("#rtn").text("socket error");
    }
}
// screenTester 소켓 에러
function socketError_screenTester(e)
{
    // screenTester 소켓에러 카운트를 +1 증가 시킨다.
    errorCount_screenTester++;

    console.log("** screenTester 소켓에러");
    console.log(e);
}

// 소켓 닫힐 때
function socketClose(e)
{
    console.log("** 소켓닫힘");
    console.log(e);
    console.log("** wsTimeOut=" + wsTimeOut);
    
    wsTimeOut = setTimeout(wsCheck, 1000); //1초에 한번씩

    // debugMode 인 경우, 화면 상단에 리턴값 표시
    if(debugMode)
    { 
        // 화면에 리턴값 표시 (개발 & 디버그용)
        $("#rtn").text("socket closed");
    }
}
// screenTester 소켓 닫힐 때
function socketClose_screenTester(e)
{
    console.log("** screenTester 소켓닫힘");
    console.log(e);
    console.log("** screenTester wsTimeOut=" + wsTimeOut_screenTester);
    
    wsTimeOut_screenTester = setTimeout(wsCheck_screenTester, 2000); //2초에 한번씩

}




/*************************************************************************************
	Description		: 소켓 연결 후 초기화 함수
                    화면 로딩시 전역으로 작동되어야 할 부분은 이곳에서 처리
	Input Param		: None
	Output Param	: None
	return Value	: None
**************************************************************************************/
function init() {

    myComma = new Comma();     //컴마제어클라스, TEN_xx.js 에서 사용함
    realTime();
}


/*************************************************************************************
    Description		: 소켓 재연결 함수
                    소켓접속 에러, 소켓 닫혔을 때 리로드 함
	Input Param		: None
	Output Param	: None
	return Value	: None
**************************************************************************************/
function wsCheck() {
    if (ws.readyState != 1) { //접속이 안됬으면 리로드 함
        call();
    };
}
// screenTester 소켓재연결 함수
function wsCheck_screenTester() {
    if (ws_screenTester.readyState != 1) { //접속이 안됬으면 리로드 함
        call_screenTester();
    };
}


/*************************************************************************************
    Description		: 소켓 데이터 전송 함수
                    소켓접속 에러, 소켓 닫혔을 때 리로드 함
                    * K[10]을 송신할 경우 사용자의 키 입력이 발생하여 화면 타임아웃 시간을 리셋 시킬때 사용한다.
	Input Param		: data : data는 ckey[extKey]로 구분함 cKey는 보통 대문자 알파벳, extKey는 보통 거래코드, 비밀번호 등이 들어감.
                    ckey는 보통 대문자 알파벳을 사용하고, 버튼에 따른 거래 등을 구분할 때 사용.
                    extKey는 보통 거래코드, 은행(증권사)코드, 비밀번호, 등 사용자가 입력한 값이나 거래코드 등이 들어감.
	Output Param	: None
	return Value	: None
**************************************************************************************/
function ws_send(data)
{

    // 네비게이션 정보 update
    console.log("screenName.btnInfoArr.length="+screenName.btnInfoArr.length);
    if( screenName.btnInfoArr.length != 0)
    {
        updateScreenName(data);
    }

    // 모듈 로딩완료 설정, 2021.05.19 (cyg) - 네비게이션 정보 update 후 loadPageOk 송신
    ws_send_sub(data);


    // screenTester 를 추가로 사용하는 경우
    if( debugMode_screenTester == true) 
    {
        ws_send_screenTester(data);
    }
}
function ws_send_sub(data)
{
    let sendTimer;
    if (wsFlag) 
    {
        // 현재 websocket 송신중 이면, 10ms 후 송신한다
        //wsData = data;
        sendTimer = setTimeout(wsRTN_f, 10, data);
    } 
    else 
    {
        // websocket 송신중 flag 를 true 로 설정 한다
        wsFlag = true
        ws.send(data);
        
        // 10ms 후 websocket 송신중 flag 가 false 로 변경됨
        //wsData = ""
        sendTimer = setTimeout(wsRTN_f, 10, "");	
    }

    // showScreen() 호출 시 ws_send("_loadPageOk"); 호출 후 eventFag = false; 하게 함
    if( data == "_loadPageOk" ) eventFlag = false;

    // debugMode 인 경우, 화면 상단에 리턴값 표시
    if(data != "_loadPageOk" && debugMode){ 
        // 화면에 리턴값 표시 (개발 & 디버그용)
        $("#rtn").text(data);
    }
}

// timer 에 의해 호출되는 websocket send 함수
function wsRTN_f(data) 
{
    if (data != "") 
    {
        ws.send(data);
        console.log("wsSend:" + data);
        //wsData = "";
    }
    
    // websocket 송신중 flag 를 false 로 설정 한다
    wsFlag = false;
}

// screenTester 로 데이터 송신
function ws_send_screenTester(data)
{
    let sendTimer;
    if (wsFlag_screenTester) 
    {
        // 현재 websocket 송신중 이면, 100ms 후 송신한다
        sendTimer = setTimeout(wsRTN_f_screenTester, 100, data);
    } 
    else 
    {
        // websocket 송신중 flag 를 true 로 설정 한다
        wsFlag_screenTester = true
        ws_screenTester.send(data);
        
        // 100ms 후 websocket 송신중 flag 가 false 로 변경됨
        sendTimer = setTimeout(wsRTN_f_screenTester, 100, "");
    }
}

// screenTester 송신을 위한 timer 에 의해 호출되는 websocket send 함수
function wsRTN_f_screenTester(data) 
{
    if (data != "") 
    {
        ws_screenTester.send(data);
        console.log("wsSend_screenTester:" + data);
    }
    
    // websocket 송신중 flag 를 false 로 설정 한다
    wsFlag_screenTester = false;
}

