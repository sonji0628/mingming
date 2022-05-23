/*****************************************************************************
   msg 생성 클라스(이미지 콘트롤러 등)
   2015. 09. 02
   전기준 black™ (010-4255-3564)
   json이 아닌 xml파싱으로 변경함(2016_01_07)
   콘트롤러class에 사용되는 글자에 css 처리하는 전역함수 추가함(2016.03.11)
   특수화면(special Display)일 경우 동적으로 자바스크립트를 로드함 'SPD'가 이미지 이름앞에 들어가면 특수화면으로 인식하여 자바스크립트 파일을 로드해옴(black™ 전기준 2018.06.19)
       - ver 1.0.0.0 - 최초 작성
       - ver 1.0.0.1 - 특수화면 처리 기능을 <custom> 기능으로 분리, 기존의 특수화면 처리 기능은 호환성을 위해 최소 유지함 (cyg)
       - ver 1.0.0.2 - destory 와 후처리 함수를 여기로 이동함, cyg
       - ver 1.0.0.3 - msg_xx (이미지) 위치를 imgDir 변수로 변경, js/msg (특수화면 코드) 를 customDir 변수로 변경함, swf 대응코듬 삭제, cyg
       - ver 1.0.0.4 - 특수화면 판단로직 수정, cyg
       - ver 1.0.0.5 (2021.02.05) - SendJson 추가, param1 과 param2 가 바뀐경우 자동으로 대입하는 기능 추가, cyg
       - ver 1.0.0.6 (2021.04.30) - 특수화면 처리를 custom.js 로 완전이전, cyg
***********************************************************************************/

// 이미지 배열 변수 선언
let msgArr = [];

// 이미지 출력 함수
function msg_f(gab, lge) { 

    // xml tag 에 해당 node 가 없으면 종료 한다 - 2020.07.16 최용균
    if (gab.length == 0) return;
    
    // msg 로 시작되는 xml 을 msglArr 에 저장한다
    $(gab).find("msg").each(function () {
        msgArr.push($(this));
    });

    // msgArr 에 추가한 데이터가 없으면 함수 종료한다  - 2020.07.16 최용균
    if( msgArr.length ==  0) return;

    // msg 해석부분
    let i;
    for (i = 0; i < msgArr.length; i++) {

        // msg 변수에 <div> tag 생성 및 attr 추가
        let msg = $('<div></div>'); //캡션문구  

        // btn html 속성에 iname 추가(마크업 표준에 맞춰 속성 이름 앞에 data- 붙임) 2021.04.16 손지민
        msg.attr({'id': 'msg' + i, 'class': 'msg', 'data-iname':$(msgArr[i]).attr("iname")});//속성 추가

        //className 클래스 추가(2021.03.19 이희수)
        var htmlClass = $(msgArr[i]).attr("className").split(" ");//className을 담아서..
        for(var j = 0;j < htmlClass.length;j++){//순회
            if(isNaN(Number(htmlClass[j]))){//만약 class이름이 숫자가 아니라면..
                msg.addClass(htmlClass[j]);
            }
        }

        let msgImg = $(msgArr[i]).attr("urlpath");

        // 2021.04.15 img_[언어코드] 경로에 이미지가 없을경우 공통 이미지 경로를 찾음(김성윤 선임)             
        let imgPath = `<img src='${imgDir + msgImg}' id='msgBgImg${i}' onerror="this.onerror = null; this.src = '${imgOffical + msgImg}'">`;
        msgBgImg = $(imgPath); 
    
        if ($(msgArr[i]).attr("ign") == "false") { //ign이 true이면 width와 height값 적용 안 함
            msgBgImg.css({
                'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'width': Number($(msgArr[i]).attr("mbw")) + 'px',
                'height': Number($(msgArr[i]).attr("mbh")) + 'px'
            });
        }
        // 코드통합 2021.01.22 (cyg)
        // ign 이 true 이면, 이미지 출력하지 않게 처리함            
        else if ($(msgArr[i]).attr("ign") == "true")
        {
            msgBgImg.css({
                'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'width': '0px',
                'height': '0px'
            });
        }            

        // msg 변수의 <div> tag 에 css 속성 추가
        msg.css({
            'position': 'absolute',
            'top': Number($(msgArr[i]).attr("mby")) + 'px',
            'left': Number($(msgArr[i]).attr("mbx")) + 'px',
            'transform': 'rotate(' + $(msgArr[i]).attr("rotate") + 'deg)',
            'transform-origin': 'top left',
            'z-index': Number($(msgArr[i]).attr("depthG"))
        });

        // <container> 에 msg 변수 <div> 를 추가하고, msg <div> 에 msgBgImg <img> 를 추가한다
        $('#container').append(msg);
        $(msg).append(msgBgImg);
        


        msg = null;
        msgBgImg = null;
    };
};



//////////////////////////////////////////////////////////////////////////////////////////////////////
// 글자넣기(msg) Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고: iframe 의 html 교체시 DOM 이 자동으로 CLEAR 됨
function destroyMsg() {    
    
    msgArr = [];

    $('.msg').remove();

};



