/*************************************************************************************
    FileName			:	screenName.js
    Description			:	화면 navigation 영역에 거래명을 출력한다
                             - 하나은행 요건에 맞게 1차 개발함
	Created Date		:	2021.01.21
	Created By			:	ATEC AP, cyg
    Revision History	:	
             ver 1.0.0.0 - 최초작성
             ver 1.0.0.1 (2021.03.02) - 거래선택 버튼에 의한 네비게이션 자동설정 기능 추가 (cyg)
             ver 1.0.0.3 (2021.03.16) - 전처리 btns 와 tag 이름을 다르게 변경함 (btns -> btn), cyg
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

// 화면 네비게이션을 위한 변수
let screenName = {};    
screenName.depth=0;         // 최종 depth 값
screenName.type=[];         // 거래명(type) 의 array
screenName.shortType=[];    // 거래명(shortType) 의 array
screenName.btnArr=[];       // 버튼정보 xml을 저장하기 위한 array
screenName.btnInfoArr=[];       // 버튼 속성을 저장하기 위한 array

const screenNameDelimiter=" ＞ ";   // 네비게이션 영역에 표시되는 거래명의 구분자
//const screenNameDelimiter=" 〉 ";   // 네비게이션 영역에 표시되는 거래명의 구분자
//const screenNameDelimiter=" 》 ";   // 네비게이션 영역에 표시되는 거래명의 구분자 (테스트)


/* ************************************************************************
  function: 화면이름 표시 함수
       xml 의 screen tag 를 분석하여, 화면의 screenName 영역에 "홈 > 거래명" 형식의 네비게이션을 표시한다.
  inparam: 
       data - xml 데이터의 screen tag 영역
       lge - 언어코드 
 ************************************************************************ */
function screenName_f(data, lge) 
{ 

    // data 정보가 없으면 네비게이션 영역을 초기화 하고, 함수 리턴 한다
    if(data.length == 0)
    {
        // 화면의 네비게이션 영역삭제
        $("#screenName").text("");
        return;
    } 
    
    let screenDepth = Number( $(data).attr("depth") );      // 화면 네비게이션을 위한 메뉴트리의 depth 번호
    let screenDisplay = Number( $(data).attr("display") );  // 화면 네비게이션 을 위한 문자열 표시여부
    let screenType =  $(data).attr("type");                 // 화면 네비게이션을 위한 거래이름 (전체이름)
    let screenShortType =  $(data).attr("shortType");       // 화면 네비게이션을 위한 거래이름 (단축이름)

    /**
    console.log("screen.depth="+screenDepth);
    console.log("screen.display="+screenDisplay);
    console.log("screen.type="+screenType);
    console.log("screen.shorttype="+screenShortType);
    **/

    // 입력데이터 예외처리
    if(screenDepth == NaN || screenDisplay == NaN || screenType == undefined || screenShortType == undefined)
    {
        // 화면의 네비게이션 영역삭제
        $("#screenName").text("");
        return;
    }

    // depth 가 0 이 아니면 현재 값을 저장한다
    if( screenDepth != 0)
    {
        screenName.depth = screenDepth;
        screenName.type[screenName.depth]=screenType;
        screenName.shortType[screenName.depth]=screenShortType;

        // depth 다음의 변수는 "" 로 초기화 한다
        if( (screenName.depth+1) < screenName.type.length)
        {
            //console.log("screenName.depth: 지울것 있음");

            for( let i=(screenName.depth+1); i<screenName.type.length; i++)
            {
                //console.log("screenName.type["+i+"]="+screenName.type[i]);
                //console.log("screenName.shortType["+i+"]="+screenName.shortType[i]);
                screenName.type[i]="";
                screenName.shortType[i]="";
        
            }
        }
    }

    // display 가 0 이 아니면 navigation 을 표시 한다
    if( (screenDisplay != 0) && (screenName.depth != 0) )
    {

        let tranString ="";

        // 화면 네비게이션 을 위한 문자열 생성
        let i=1;
        for(i=1; i<screenName.depth; i++)
        {
            // 미정의 화면이름 초기화
            if(screenName.shortType[i] == undefined) screenName.shortType[i]="";

            if( i==1 || screenName.shortType[i]=="")
            {
                // 첫번째 화면이름은 구분자 없음 (단축이름)  
                tranString += screenName.shortType[i] ;
            }
            else
            {
                // 두번째 화면이름 부터 구분자 있음 (단축이름-화면이름이 있는 경우만 구분자 추가됨)
                tranString += (screenNameDelimiter + screenName.shortType[i]) ;
            }
        }     
        
        // 미정의 화면이름 초기화
        if(screenName.type[i] == undefined) screenName.type[i]="";

        // 마지막 화면이름은 전체이름을 사용함 (화면이름이 있는 경우만 구분자 추가됨)
        if( i==1 || screenName.type[i]=="")
        {
            tranString += screenName.type[i];  
        }
        else 
        {
            tranString += (screenNameDelimiter + screenName.type[i]);  
        }

        // 화면의 네비게이션 영역에 문자열 표시
        $("#screenName").text(tranString);
    }
    else
    {
        // 화면의 네비게이션 영역삭제
        $("#screenName").text("");
    }

    ////////////////////////////////////////////////////////////////////////////////////
    // 거래선택 버튼정보를 저장
    ////////////////////////////////////////////////////////////////////////////////////

    // 버튼정보 초기화
    screenName.btnArr=[];
    screenName.btnInfoArr = [];

    // xml 데이터 검색
    $(data).find("btn").each(function(){
        screenName.btnArr.push($(this)) 
    }); 
    console.log("screenName.btnArr 길이="+screenName.btnArr.length);


    if(screenName.btnArr.length == 0)
    {
        // 버튼 정보가 없으면, btnInfoArr 를 저장하지 않는다.
        console.log("버튼정보 없음: screenName.btnInfoArr.length="+screenName.btnInfoArr.length);
    }
    else
    {
        for (let i = 0; i < screenName.btnArr.length; i++) {
            screenName.btnInfoArr[i]={};
            screenName.btnInfoArr[i].btext=$(screenName.btnArr[i]).attr("btext");
            screenName.btnInfoArr[i].breturn=$(screenName.btnArr[i]).attr("breturn");
            screenName.btnInfoArr[i].depth=$(screenName.btnArr[i]).attr("depth");
            screenName.btnInfoArr[i].type=$(screenName.btnArr[i]).attr("type");
            screenName.btnInfoArr[i].shortType=$(screenName.btnArr[i]).attr("shortType");
        }
        console.log("버튼정보 있음:screenName.btnInfoArr.length="+screenName.btnInfoArr.length);
    }
}

// 버튼 입력시 navigation 정보를 재설정 한다
function updateScreenName( breturn)
{
    console.log("updateScreenName 호출됨 breturn="+breturn);
    for (let i = 0; i < screenName.btnArr.length; i++) {
        if( breturn == screenName.btnInfoArr[i].breturn)
        {
            // depth 가 0 이 아니면 현재 값을 저장한다
            let screenDepth = screenName.btnInfoArr[i].depth;
            if( screenDepth != 0)
            {
                screenName.depth = screenDepth;
                screenName.type[screenName.depth]=screenName.btnInfoArr[i].type;
                screenName.shortType[screenName.depth]=screenName.btnInfoArr[i].shortType;

                console.log("depth="+screenName.depth);
                console.log("type="+screenName.type[screenName.depth]);
                console.log("shortType="+screenName.shortType[screenName.depth]);

            }
            break;
        }
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 화면 네비게이션 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

function initScreenName()
{
    screenName.depth=0;
    screenName.type=[]; 
    screenName.shortType=[]; 
    screenName.btnArr=[];
    screenName.btnInfoArr=[];

}