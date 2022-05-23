/*************************************************************************************
    FileName			:	customControl.js
    Description			:	사용자정의 기능 ( custon control) 생성함수 (이미지 콘트롤러 등)
                             - AS IS : msg 의 urlpath(이미지 이름) 가 SPD_, NH_ 등으로 시작되면 특수화면으로 처리함 (묵시적 설정)
                             - TO BE : customControl tag 를 추가하고, image 와 source 를 정의함 (명시적 설정)
	Created Date		:	2020.07.07
	Created By			:	ATEC AP, cyg
    Revision History	:	
        ver 1.0.0.0 - 최초 작성
        ver 1.0.0.1 - js/msg/ 폴더위치를 customDir 변수로 변경함, (cyg)
        ver 1.0.0.2 (2021.02.15) - 특수화면 prefix 에 ATEC 추가, (cyg)
        ver 1.0.0.3 (2021.03.16) - 전처리 msg 와 tag 이름을 다르게 변경함 (msg -> cm :customMessage), cyg
        ver 1.0.0.4 (2021.05.03) - 특수화면 처리를 cm 으로 완전 이동함, cyg
        ver 1.0.0.5 (2021.05.19) - 모듈 로딩완료 설정, cyg
                                 - doSendJson() 에서 JSON 검사를 정산기 방식을 우선 검사함
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

// 특수화면 처리를 위한 변수
let cmArr = [];

// 사용자 정의기능 구현 함수
function custom_f(gab, lge, screenNumber) { 

    // xml tag 에 해당 노드가 없으면 종료 한다
    if (gab.length == 0)
    {
        // 모듈 로딩완료 설정, 2021.05.19 (cyg)
        checkCompleted(MODULE_CM);
        return;
    }


    // 특수화면 처리를 위해, cm 으로 시작되는 xml 을 cmArr 로 복사한다
    let cmIndex=0;
    $(gab).find("cm").each(function () {

        // cmArr[] 구조체 생성 및 member 추가
        cmArr[cmIndex] = {};
        cmArr[cmIndex].xmlObj = $(this);

        // member 초기화
        cmArr[cmIndex].jsObj = {};
        cmArr[cmIndex].index = 0;
        cmArr[cmIndex].class = "";
        cmArr[cmIndex].screenNumber = "";
        cmArr[cmIndex].iname = "";

        cmIndex++;
    });

    // cmArr 에 추가한 데이터가 없으면 함수 종료한다  
    if( cmArr.length ==  0)
    {
        // 모듈 로딩완료 설정, 2021.05.19 (cyg)
        checkCompleted(MODULE_CM);
        return;
    } 


    let cmMaxCount = cmArr.length;
    let cmCompletedCount = 0;

    // cm 해석부분
    let jsSrc = "";
    let className = "";
    let iname = "";

    // 특수화면 소스코드 처리 (동적으로 js 로딩)
    for (let i = 0; i < cmArr.length; i++) 
    {        
        // souce file 이름 및 className 생성
        jsSrc="";
        className="";
        iname = "";

        /** ui studio 가 완성되어, jsfile 과 class 가 없을때 처리부분을 생략함.
        // urlpath 에서 js 와 class 를 추출 한다
        let pngInfo = $(cmArr[i]).attr("urlpath");
        if( pngInfo != undefined )
        {
            let jsfile = png2jsFilename(pngInfo);
            jsSrc = jsfile.js;
            className = jsfile.cls;
        }

        // js 에서 js 와 class 를 추출 한다
        let jsInfo = $(cmArr[i]).attr("src");
        if( jsInfo != undefined ) 
        {
            jsSrc = jsInfo;
            className = js2classname(jsSrc);
        }

        // class 에서 class 를 추출 한다
        let clsInfo = $(cmArr[i]).attr("class");
        if( clsInfo != undefined )
        {
            className = clsInfo;
        }
        **/

        // js 이름 추출
        jsSrc = $(cmArr[i].xmlObj).attr("src");
        console.log(`custom.js - jsSrc = [${jsSrc}]`);
        
        // class 추출
        className = $(cmArr[i].xmlObj).attr("class");
        console.log(`custom.js - className = [${className}]`);

        // iname 추출
        iname = $(cmArr[i].xmlObj).attr("iname");
        console.log(`custom.js - iname = [${iname}]`);

        // <container> 에 <div id=cmXX> 를 생성 및 추가한다.
        let cm = $('<div></div>'); 
        cm.attr({
            'id': 'cm' + i,
            'class': 'cm'
        }); //속성 추가
        cm.css({
            'position': 'absolute',
            'top': Number($(cmArr[i].xmlObj).attr("mby")) + 'px',
            'left': Number($(cmArr[i].xmlObj).attr("mbx")) + 'px',
            'transform-origin': 'top left',
            'height' : '0px'
        });
        $("#container").append(cm)


        // <div> tag 중 id 가 cm+i 에 script element 를 생성하여 js 를 로딩한다.

        // 동일한 js 가 있는지 검사
        let sameClass = 0;
        for (let s = 0; s < cmArr.length; s++) {
            if (cmArr[s].class == className) {
                sameClass++;
                break;
            }
        }

        // 모듈 로딩완료 설정, 2021.05.19 (cyg) - 불필요한 sameClass 기능 제거
        // 이전에 로딩된 js 가 없을경우만 스크립트 추가한다
        //if (sameClass == 0) { 

        // cm+i 속성에 <scrpt> tag 생성 및 src 추가
        let parentC = document.getElementById('cm' + i);
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = customDir + jsSrc;

        console.log(`## custom.js - jsSrc = [${jsSrc}], length=${jsSrc.length}, load start`);

        // 모듈 로딩완료 설정, 2021.05.19 (cyg) - 문법오류 수정: callback() -> callback
        script.addEventListener("load", callback, false);
        parentC.appendChild(script);

        // script 로딩완료 이벤트 수신후 loadObj 변수 설정
        function callback(e) {

            // 모듈 로딩완료 설정, 2021.05.19 (cyg)
            console.log(`## custom.js : jsSrc = [${jsSrc}] , load completed`);
            cmCompletedCount ++;
            if( cmCompletedCount >=  cmMaxCount ) checkCompleted( MODULE_CM);
        }
        //} 

        // 특수화면정보를 cmArr 의 멤버 변수에 저장
        cmArr[i].index = i;
        cmArr[i].class = className;
        cmArr[i].screenNumber = screenNumber;
        cmArr[i].iname = iname;
        console.log(`*** custom.js - cmArr[${i}].index = [${cmArr[i].index}], cmArr[${i}].class = [${cmArr[i].class}]`);
        
        // 변수 초기화 (Gabage collection 유도)
        msg = null;
        jsSrc = null;
    }
};  // end of function

/*************************************************************************************
    Description		: 파일이름에서 특수화면 prefix 길이 추출
    Input Param		: 이미지 file name (HH_xxx.png, xxx.png, HH_xxx.jpg, xxx.jpg)
	Output Param	: None
	return Value	: prefix Header 의 길이, 0=없음, 1..n: Header 길이('_' 포함)
                 예; NH_xxxx.png => NH_ (3)
**************************************************************************************/
function getPrefixLength(msgName)
{
    let specialHeaderSize=0;

    // 특수화면용 prefix
    let ctrlHeader = ["NH", "SPD", "ACTION", "SMC", "ATEC" ];
    for(let i=0; i<ctrlHeader.length; i++)
    {
        if( msgName.substr(0, ctrlHeader[i].length) == ctrlHeader[i] )
        {
            // XX_ 의 size 를 리턴한다.
            specialHeaderSize = ctrlHeader[i].length + 1;
            break;
        }
    }
    return specialHeaderSize;
}

/*************************************************************************************
    Description		: pngfile 에서 jsfile 이름 과  class 이름 추출
    Input Param		: 이미지 파일 이름 (HH_xxx.png, xxx.png, HH_xxx.jpg, xxx.jpg)
	Output Param	: None
	return Value	: 로딩할 js 파일이름 과 클래스 이름
              jsfilename.js = js 소스 파일이름 (HH_xxx.js)
              jsfilename.cls = js 에서 참조할 클래스 이름 (xxx)
**************************************************************************************/
function png2jsFilename(pngName)
{
    let specialHeaderSize = 0;
    let jsfilename = {};
    
    specialHeaderSize = getPrefixLength(pngName);
    jsfilename.js = pngName.split('.')[0]+".js";
    jsfilename.cls = pngName.substr(specialHeaderSize, pngName.length-specialHeaderSize-4);
    
    return jsfilename;
}

/*************************************************************************************
    Description		: jsfile 에서 class 이름 추출
    Input Param		: js 파일이름 (HH_xxx.js, xxx.js)
	Output Param	: None
	return Value	: class 이름 (xxx)
              예; HH_xxx.js => xxx
**************************************************************************************/
function js2classname(jsfilename)
{
    let specialHeaderSize = 0;
    let classname = "";
    
    specialHeaderSize = getPrefixLength(jsfilename);
    classname = jsfilename.substr(specialHeaderSize, jsfilename.length-specialHeaderSize-3);
    
    return classname;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 특수화면 (cm) Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////
function destroyCustom() {
    
    cmArr = [];
    $('.cm').remove();
};



//////////////////////////////////////////////////////////////////////////////////////////////////////
// 특수화면 (custom) 후처리 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////


/*************************************************************************************
    Description		: 특수화면 호출 
                       - 상세 데이터는 하이폰 array 형태로 전달됨
    Input Param		: 
                - param1 : 기능구분 (일반적으로 iname 사용함)
                - param2 : 상세 데이터
	Output Param	: None
	return Value	: None
**************************************************************************************/
function doSendMsg( param1, param2)
{
    let bb=param1;
    let cc=param2;

	for (i = 0; i < cmArr.length; i++) {
		if (cmArr[i].iname == bb) {         //iname에 맞는 msgClassArr 필드를 찾아서 글자 넣기                    
			cmArr[i].jsObj.callF(cc);       //후처리 파라미터 값 전달
		};
	};
    
}

/*************************************************************************************
    Description		: 특수화면 호출 
                       - 상세 데이터는 하이폰 json 형태로 전달됨
                       - jason 여부 확인후 .iname 과 callF 함수 호출함
    Input Param		: 
            1) 농협stm, 정산기 방식 (param1, param2 가 sendMsg 와 바뀌어서 들어옴 - 최초 설계 오류)
                - param1 : 상세 테이터 (json data)
                - param2 : 기능구분 (일반적으로 iname 사용함)
            2) atm 통합코드 방식 (param1, param2 가 sendMsg 와 동일 들어옴 - 설계 수정)
                - param1 : 기능구분 (일반적으로 iname 사용함)
                - param2 : 상세 데이터 (json data)
	Output Param	: None
	return Value	: None
**************************************************************************************/
function doSendJson (param1, param2)
{
    let bb = param1;
    let cc = param2;

    if ( IsJsonString(bb))
    {
        // 농협stm, 정산기 방식
        for (i = 0; i < cmArr.length; i++) {
            if (cmArr[i].iname == cc) {         //iname에 맞는 msgClassArr 필드를 찾아서 글자 넣기
                cmArr[i].jsObj.callF(bb);       //후처리 파라미터 값 전달
            };
        };
    }
    else
    {
        // atm 통합코드 방식
        for (i = 0; i < cmArr.length; i++) {
            if (cmArr[i].iname == bb) {         //iname에 맞는 msgClassArr 필드를 찾아서 글자 넣기                    
                cmArr[i].jsObj.callF(cc);       //후처리 파라미터 값 전달
            };
        };    
    }
}

// json 테이터 타입을 구분하는 함수
function IsJsonString(str) {
    try {
        JSON.parse(str);      
    } catch (e) {
        return false;
    }
    return true;
  }



