/*************************************************************************************
    FileName			:	arrowSts.js
    Description			:	시작, 진행, 종료 의 진행상태를 표시하는 기능
                             - AS IS : msg 의 특수화면으로 각 site 별 구현함
                             - TO BE : arrowSts 를 추가하고, image 정보에 의한 동작으로 신규제작함
	Created Date		:	2020.08.07
	Created By			:	ATEC AP, cyg
    Revision History	:	
             ver 1.0.0.0 - 최초작성
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/


// 이미지 위치정보를 저장하기 위한 변수
let imgPos = {};
imgPos.left = [];
imgPos.top = [];
imgPos.width = [];
imgPos.height = [];

// 각 step 별 이미지 이름을 저장하기 위한 변수
let stsStep={};
stsStep.img1=[];
stsStep.img2=[];
stsStep.img3=[];
stsStep.img4=[];
stsStep.img5=[];



// 처리중 기능 분석 함수
function arrowSts_f(data, lge) { // 진행중 상태 표시 함수

    console.log( "arrowSts -- 함수호출됨");

    // 이전화면에서 그린 arrwoSts 요소를 제거한다.
    destroyArrowSts();

    // xml tag 에 해당 노드가 없으면 종료 한다
    if (data.length == 0) return;

    console.log( "arrowSts -- 시작");

    // ----------------------------------------------------------------------
    // xml 저장 및 유효성 판정
    // ----------------------------------------------------------------------

    // xml 데이터 저장 변수
    let imgPosArrXml = [];      // image 정보 (img1..img5)
    let stsStepArrXml = [];     // 진행중 표시 정보 (step0..step3)

    // 진행중 표시를 위해 image 의 좌표정보를 imgPosArrXml 로 복사한다
    $(data).find("img").each(function () {
        imgPosArrXml.push($(this));
    });
    if( imgPosArrXml.length ==  0) return;

    // 진행중 상태정보를 arrowStsArrXml 에 복사한다
    $(data).find("sts").each(function () {
        stsStepArrXml.push($(this));
    });
    if( stsStepArrXml.length ==  0) return;

    // ----------------------------------------------------------------------
    // xml 분석 및 데이터 생성
    // ----------------------------------------------------------------------

    // position 정보 대입
    for( let i=0; i<imgPosArrXml.length; i++)
    {
        let pos = $(imgPosArrXml[i]).attr("pos");
        console.log("pos="+pos);

        imgPos.left[pos] =  $(imgPosArrXml[i]).attr("left");
        imgPos.top[pos] =  $(imgPosArrXml[i]).attr("top");
        imgPos.width[pos] =  $(imgPosArrXml[i]).attr("width");
        imgPos.height[pos] =  $(imgPosArrXml[i]).attr("height");
    }

    // 상태 표시용 이미지 대입
    for( let i=0; i<stsStepArrXml.length; i++)
    {
        let step = $(stsStepArrXml[i]).attr("step");
        console.log("step="+step);

        stsStep.img1[step]=$(stsStepArrXml[i]).attr("img1");
        stsStep.img2[step]=$(stsStepArrXml[i]).attr("img2");
        stsStep.img3[step]=$(stsStepArrXml[i]).attr("img3");
        stsStep.img4[step]=$(stsStepArrXml[i]).attr("img4");
        stsStep.img5[step]=$(stsStepArrXml[i]).attr("img5");
    }



    // ----------------------------------------------------------------------
    // 이미지 출력을 위한 html tag 생성 및 초기값 수행
    // ----------------------------------------------------------------------
    // 최초 표시할 상태 번호
    let start = $(data).attr("start"); 

    // 구조정의
    /**
    let html = `
    <div class="arrowSts">
        <img src=../msg_${lge}/${stsStep.img1[start]} id="arrowSts-img1"/>
        <img src=../msg_${lge}/${stsStep.img2[start]} id="arrowSts-load1"/>
        <img src=../msg_${lge}/${stsStep.img3[start]} id="arrowSts-img2"/>
        <img src=../msg_${lge}/${stsStep.img4[start]} id="arrowSts-load2"/>
        <img src=../msg_${lge}/${stsStep.img5[start]} id="arrowSts-img3"/>
    </div>`;
    **/
   let html = `
   <div class="arrowSts">
       <img src=${imgDir}${stsStep.img1[start]} id="arrowSts-img1"/>
       <img src=${imgDir}${stsStep.img2[start]} id="arrowSts-load1"/>
       <img src=${imgDir}${stsStep.img3[start]} id="arrowSts-img2"/>
       <img src=${imgDir}${stsStep.img4[start]} id="arrowSts-load2"/>
       <img src=${imgDir}${stsStep.img5[start]} id="arrowSts-img3"/>
   </div>`;

    // 구조를 동적으로 생성함
    // $("#container__uiCreator").append(html);
    $("#container").append(html);

    // css 를 동적으로 생성함
    $("#arrowSts-img1").css  ( {'top':`${imgPos.top[1]}px`, 'left':`${imgPos.left[1]}px`, 'width':`${imgPos.width[1]}px` , 'height':`${imgPos.height[1]}px`, 'position': 'absolute' });
    $("#arrowSts-load1").css ( {'top':`${imgPos.top[2]}px`, 'left':`${imgPos.left[2]}px`, 'width':`${imgPos.width[2]}px` , 'height':`${imgPos.height[2]}px`, 'position': 'absolute' });
    $("#arrowSts-img2").css  ( {'top':`${imgPos.top[3]}px`, 'left':`${imgPos.left[3]}px`, 'width':`${imgPos.width[3]}px` , 'height':`${imgPos.height[3]}px`, 'position': 'absolute' });
    $("#arrowSts-load2").css ( {'top':`${imgPos.top[4]}px`, 'left':`${imgPos.left[4]}px`, 'width':`${imgPos.width[4]}px` , 'height':`${imgPos.height[4]}px`, 'position': 'absolute' });
    $("#arrowSts-img3").css  ( {'top':`${imgPos.top[5]}px`, 'left':`${imgPos.left[5]}px`, 'width':`${imgPos.width[5]}px` , 'height':`${imgPos.height[5]}px`, 'position': 'absolute' });

}  // end of function



// 화면에 상태정보를 표시한다
// inparam: step 
// return: none
function doArrowSts(step, param2)
{
    console.log("doArrowSts " + step + ","+stsStep.img1.length);

    // 미정의 step 을 호출하면 아무동작 하지 않는다
    if( stsStep.img1[step] == undefined) return;

    // step 에 의해서 처리중 화면을 변경 한다
    switch(step)
    {
        case '0': // 이미지 준비
        case '1': // 시작
        case '2': // 진행
        case '3': // 종료
        case '4': // 이전
        default:    // 기타 정의된 항목
            /**
            $("#arrowSts-img1").attr("src",  `../msg_${lge}/${stsStep.img1[step]}` );
            $("#arrowSts-load1").attr("src", `../msg_${lge}/${stsStep.img2[step]}` );
            $("#arrowSts-img2").attr("src",  `../msg_${lge}/${stsStep.img3[step]}` );
            $("#arrowSts-load2").attr("src", `../msg_${lge}/${stsStep.img4[step]}` );
            $("#arrowSts-img3").attr("src",  `../msg_${lge}/${stsStep.img5[step]}` );
            **/
           $("#arrowSts-img1").attr("src",  `${imgDir}${stsStep.img1[step]}` );
           $("#arrowSts-load1").attr("src", `${imgDir}${stsStep.img2[step]}` );
           $("#arrowSts-img2").attr("src",  `${imgDir}${stsStep.img3[step]}` );
           $("#arrowSts-load2").attr("src", `${imgDir}${stsStep.img4[step]}` );
           $("#arrowSts-img3").attr("src",  `${imgDir}${stsStep.img5[step]}` );
           break;
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
// arrowSts 의 Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고: iframe 의 html 교체시 DOM 이 자동으로 CLEAR 됨
function destroyArrowSts(){
    
    // imgPos 변수 초기화
    for(let i =0; i<imgPos.left; i++)
    {
        imgPos.left[i] = null;
        imgPos.top[i] = null;
        imgPos.width[i] = null;
        imgPos.height[i] = null;
    }

    // stsStep 변수 초기화
    for( let i=0; i<stsStep.img1.length; i++)
    {
        stsStep.img1[i] = null;
        stsStep.img2[i] = null;
        stsStep.img3[i] = null;
        stsStep.img4[i] = null;
        stsStep.img5[i] = null;
    }

    // arrowSts tag 제거
    $('.arrowSts').remove();
   
}