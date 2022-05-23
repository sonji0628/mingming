/*****************************************************************************
   버튼 생성 클라스
   2015. 09. 02
   전기준 black™ (010-4255-3564)
   json이 아닌 xml파싱으로 변경함(2016_01_07)
       ver 1.0.0.0 - 최초 작성
       ver 1.0.0.1 - destory 와 후처리 함수를 여기로 옮김, cyg
       ver 1.0.0.2 - btn 폴더위치를 btnDir 로 변경, *.swf 대응코드 삭제(미사용), cyg
       ver 1.0.0.3 - "2019.09.28 class 추가", 메인버튼 투명이미지 기능추가("" 또는 btnTrans.png) , cyg  
       ver 1.0.0.4 - btnAni() 누락소스 추가함, cyg    
       ver 1.0.0.5 - globalIs 변수를 call_f2.js 에서 여기로 이동, cyg
       ver 1.0.0.6 (2021.04.16) - call_f2.js에서 btn 관련 함수 위치 옮김(doShowBtn)
                     doShowBtn 함수에서 param1 = indexG ==> param1 = iname으로 수정함
                     btn div 생성 시 속성 수정(class에 추가되던 iname 삭제. data-iname 속성을 추가하여 xml iname과 동일하게 셋팅)
***********************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
let globalIs = false;           //여기값과 버튼요소의 'globalIs'이 모두 true면 전역 css를 가져옴(2016_02_17) .. (uiCreator 종속성 확인필요)

function btn_f(gab, lge ) {  //버튼 표시 함수
    //console.log($(gab).text()) 
    let zero;
    if(gab.length){
        $(gab).find("btns").each(function(){
            btnArr.push($(this)) 
        }); 
        gab=null    
        for (let i = 0; i < btnArr.length; i++) {

            //버튼배경
            /**
            if($(btnArr[i]).attr("urlpath").split('.')[1]=='swf'){ //swf일경우만 svg로 변환
                let bgimg=$(btnArr[i]).attr("urlpath").split('.')[0];
                btnBgImg = $('<img src="btn_'+lge+'/'+bgimg+'.svg" id="btnBgImg'+i+'">');    
            }else{
                let bgimg=$(btnArr[i]).attr("urlpath")
                //btnBgImg = $('<img src="./btn_'+lge+'/'+bgimg+'" id="btnBgImg'+i+'">'); 
                btnBgImg = $('<img src="'+btnDir+bgimg+'" id="btnBgImg'+i+'">'); 
            }
            **/
            let bgimg=$(btnArr[i]).attr("urlpath");
            
            // 2019.02.28 class 추가            
            // 2021.04.15 btn_[언어코드] 경로에 이미지가 없을경우 공통 이미지 경로를 찾음(김성윤 선임)
            // 2021.05.20 xml의 btns태그의 urlpath값이 있을 경우에만 이미지 적용 (김성윤 선임)
            if(bgimg && bgimg.length != 0) {
                let imgPath = `<img src='${btnDir + bgimg}' id='btnBgImg${i}' class='btnImg' onerror="this.onerror = null; this.src = '${btnOffical + bgimg}'">`;
                btnBgImg = $(imgPath); 
    
                //UICreator5에서 변경됨
                if($(btnArr[i]).attr("ign")=="false"){
                    btnBgImg.css({      
                        'position':'absolute',
                        'width': Number($(btnArr[i]).attr("bw")) + 'px',
                        'height': Number($(btnArr[i]).attr("bh")) + 'px',
                    })
                }
            }
               
            //리턴값
            btnArr[i].breturn=$(btnArr[i]).attr("breturn");
            btnArr[i].yy=Number($(btnArr[i]).attr("by"));
            //딤드여부
            let dimdIs = ""; //회색으로
            let opacityIs = "";//반투명하게
            if ($(btnArr[i]).attr("dimd") == "0") {
                dimdIs = 'grayscale(0%)';
                opacityIs = 'opacity(100%)'
                btnArr[i].dimd="0";//xml객체는 값 변경 안됨.
            } else {
                dimdIs = 'grayscale(100%)';
                opacityIs = 'opacity(30%)';
                btnArr[i].dimd="1";//xml객체는 값 변경 안됨.
            }

            //버튼 div
            //let btn = $('<div></div>');
            //속성 추가 /draggable와 contenteditable속성추가
            // 2019.02.28 class에 iname을 추가
            //btn.attr({ 'id': 'btn' + i, 'class': 'btn' + $(btnArr[i]).attr("iname")  });     

            /*************************************************************************************
                Description		: 버튼 div 생성
                Attribute		: id, class, data-iname
                Update          : 2021.04.16 (손지민)
                Memo            : btn html 속성에 iname 추가(마크업 표준에 맞춰 속성 이름 앞에 data- 붙임)
                                  기존에 iname을 class에 추가하던 코드 수정함. 에러 날 경우 'data-inmae'에서 찾을 수 있도록 코드 수정할 것

                Update          : 2021.05.10 (김성윤)
                Memo            : btn html 속성에 dimd 추가 (표준문서변환후: data-dimd)
            **************************************************************************************/
            
            let btn = $('<div></div>');
            btn.attr({ 'id': 'btn' + i, 'class': 'btn', 'data-iname': $(btnArr[i]).attr("iname"), 'data-dimd': $(btnArr[i]).attr("dimd")});//속성 추가

            //className 클래스 추가(2021.03.19 이희수)
			var htmlClass = $(btnArr[i]).attr("className").split(" ");//className을 담아서..
            for(var j = 0;j < htmlClass.length;j++){//순회
                if(isNaN(Number(htmlClass[j]))){//만약 class이름이 숫자가 아니라면..
                    btn.addClass(htmlClass[j]);
                }
			}
           
            let visibleis
            if($(btnArr[i]).attr("visibleis") == "show"){
                 
                visibleis='visible'
            }else{
                visibleis='hidden'  
            }
            if(lge=="bp"){ //전맹일경우 무조건 가림(2016_03_16)
                visibleis='hidden' 
            }
            btn.css({                                                            
                'position': 'absolute',
                '-webkit-filter': dimdIs + ' ' + opacityIs,
                'top': Number($(btnArr[i]).attr("by")) + 'px',
                'left': Number($(btnArr[i]).attr("bx")) + 'px',
                
                //'background-position': '0px 10px',
                'visibility':visibleis,
                'z-index': Number($(btnArr[i]).attr("depthG")),
                'width': Number($(btnArr[i]).attr("bw")) + 'px',
                'height': Number($(btnArr[i]).attr("bh")) + 'px'
            })                   
            $('#container').append(btn);

            // 메인버튼 투명이미지 처리
            //if(bgimg != "btnTran.png") $(btn).append(btnBgImg);
            if( !(bgimg == "" || bgimg == "../btn/btnTran.png") ) $(btn).append(btnBgImg);


            //$("#g-container").contents().find("#container__uiCreator").append(btn);
            //$("#container__uiCreator").append(btn);
            
            // 캡션문구 시작
            $(btnArr[i]).find("textIs").each(function(){
                //console.log($(this).attr("tcolor"))   
                let btnTxtAll="";//개행문자 처리하기
                for(j=0;j<$(this).attr("btext").length;j++){                                    
                    if($(this).attr("btext").charCodeAt(j)==10){ //개행문자라면
                        btnTxtAll+="<br>"
                    }else{
                        btnTxtAll+=$(this).attr("btext").charAt(j); 
                    }
                }
                let btnText = $('<div>' + btnTxtAll + '</div>'); //캡션문구
                // 2019.02.28 class 추가
                btnText.attr({ "class": "btnTxt", })

                 $(btn).append(btnText);
                let bcolor = Number($(this).attr("tcolor")).toString(16);
                
                zero="000000";
	            zero=zero.substring(bcolor.length,zero.length)
	            bcolor=zero+bcolor;
                
                let tbold = "nomal";
                // if (txtArr[i]._boldis == "1") {
                if ($(this).attr("fontis") == "nb" || $(this).attr("fontis") == "xb" || $(this).attr("fontis") == "lb") { //나눔고딕B,XB일때
                    tbold = "bold"
                }else if($(this).attr("fontis") == "ls"){
                    tbold = "700";
                }
                if($(this).attr("globalIs")=="0" || !globalIs){ //글로벌 속성이라면 css파일에서 가져오기
                    btnText.css({
                         'font-family': fontIs($(this).attr("fontis")),
                        'font-size': Number($(this).attr("tsize")) + 'px',
                        'color': '#' + bcolor
                    })
                }
                //dhisplay값을 flex로 설정하여 중앙정렬토록 함
                btnText.css({
                    'letter-spacing': Number($(this).attr("lspacing")) + 'px',
                    'position': 'absolute',
                    'font-weight': tbold,
                    'letter-spacing': Number($(this).attr("lspacing")) + 'px',
                    'line-height': Number($(this).attr("linesp")) +Number($(this).attr("tsize"))+ 'px',
                    'transform':'scaleX('+$(this).attr("xscale")+')',
                    'transform-origin':'top left',
                    'white-space': 'pre',
                })
                
                let btnTalign="left";
                if($(this).attr("talign")!=undefined){
                    btnTalign=$(this).attr("talign").toLowerCase();
                }
                if($(this).attr("centeris")=="1"){
                    btnText.css({
                        'display':'flex',
                        'align-items':'center',
                        'justify-content':'center',
                        'width': Number($(btnArr[i]).attr("bw")) + 'px',
                        'height': Number($(btnArr[i]).attr("bh")) + 'px',
                        'text-align':'center'
                    })
                }else{
                    btnText.css({
                        'text-align': btnTalign,                        
                        //'top': ((12*i)+35)+"%",
                        'top': Number($(this).attr("tmargin")) + 'px',
                        'left': Number($(this).attr("lmargin")) + 'px',                        
                        //버튼 영역에서 튀어나오지 않게 하기위해서 아래 스크립트 추가(2016_01_11)
                       // 'width':Number($(btnArr[i]).attr("bw"))-Number($(this).attr("lmargin")) + 'px',
                       // 'height':Number($(btnArr[i]).attr("bh"))-Number($(this).attr("tmargin")) + 'px'
                    })
                }
                
                btnTxtAll=null;
                btnText=null;
                bcolor=null;
                tbold=null;
                btnTalign=null;
            });   
            bgimg=null;
            visibleis=null;
            opacityIs=null;
            dimdIs=null;
            
            btnBgImg=null
            
            // $("#btn"+i).on(eventType,btnClick);//버튼클릭 이벤트
            //$("#g-container").contents().find("#btn"+i).on(eventType,btnClick);//버튼클릭 이벤트

            // 이벤트 이중등록 방지 (이벤트해제 후 등록)
            $("#btn"+i).off(eventType);         //버튼클릭 이벤트 해제
            $("#btn"+i).on(eventType,btnClick); //버튼클릭 이벤트

            btn=null;
            
        }          
        
        function btnClick() {    
            let mybtn=btnArr[Number($(this).prop('id').substring(3, $(this).prop('id').length))];

            if(!eventFlag&&!Number(mybtn.dimd)){
                //ClickEvt(Number($(this).prop('id').substring(3, $(this).prop('id').length)))

                eventFlag = true
                //console.log(mybtn.breturn);//리턴값 주기
                ws_send(mybtn.breturn);
                let mymy = this;

                // 2021.05.10 김성윤 수정
                // 점맹화면일 경우 beep음을 play하지않음
                // 점맹화면일 경우 beep음 대신, 숫자음성으로 출력 (keylistener.js에서 관리)
                if (!RcvData.lge.includes('bp')) {                
                    bleep.pause();//기존소리를 죽이고 새로...
                    bleep.currentTime = 0;
                    bleep.play(); //소리
                }
/*
                //NH 농협 버튼클릭시 이미지 변경
                const imgObj = $(this).find("img");
                const txtObj = $(this).find("div");
                const imgName = imgObj.attr("src");

                if(imgName.indexOf("_nomal.png") >= 0){
                    imgObj.attr("src",imgName.replace("nomal","pressed"));
                    txtObj.css("color","#ffffff");
                } else if(imgName.indexOf("_normal.png") >= 0) {
                    imgObj.attr("src",imgName.replace("normal","pressed"));
                } else if(imgName.indexOf("_off.png") >= 0){
                    imgObj.attr("src",imgName.replace("off","on"));
                } else {

                }
*/
                $(mymy).animate({   //jQuary를 이용하여 눌림효과 주기
                    top: '+=5px',
			        //opacity: '0.5',			
		        }, 100, reback);
                function reback() {
                    $(mymy).animate({
                         top: '-=5px',
                         //opacity: '1',                        
                     }, 100);
                    mymy=null;
                }                
            }
            mybtn=null;
        }
    }
    zero=null;
    //btnArr=[]
} 

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 버튼 Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고: iframe 의 html 교체시 DOM 이 자동으로 CLEAR 됨
function destroyBtn(){
    myT="";
    yy="";
    clickbtnid="";
    mybtn="";    
    if(btnArr.length>0){
        for(let i=0;i<btnArr.length;i++){           
            btnArr[i].breturn=null;
            btnArr[i].yy=null;  
            $('#btn'+i).remove();
            // $("#g-container").contents().find('#btn'+i).remove();
        }
        i=null;
    }
    btnArr = [];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 특수화면에서 버튼기능 사용후 호출하는 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 버튼 소리 함수
function btnAni(mybtn){
    var mymy = mybtn;

    // 코드통합 2021.01.22 (cyg) start ==>
    /** bleep 를 snd.js 의 함수로 변경함
    bleep.pause(); //기존소리를 죽이고 새로...
    bleep.currentTime = 0;
    bleep.play(); //소리
    **/
    bleepPlay();
    // 코드통합 2021.01.22 (cyg) end <==

    $(mymy).animate({   //jQuary를 이용하여 눌림효과 주기
        top: '+=5px',
        //opacity: '0.5',			
    }, 100, reback);
    function reback() {
        $(mymy).animate({
             top: '-=5px',
             //opacity: '1',                        
         }, 100);
        mymy=null;
    }  
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 버튼 후처리 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

/*************************************************************************************
	Description		: 버튼 축퇴 (농협 STM 소스)
	Input Param		: param1, param2 - 상세 데이터는 '|' 으로 구분되어 있음
	Output Param	: None
	return Value	: None
**************************************************************************************/
function doDimdBtn( param1, parma2)
{
    if( btnArr.length <= 0 )
    {
        console.log("doDimdBtn: 버튼없음");
        return;
    }

	var bbArr = param1.split("|");
	var ccArr = parma2.split("|");
	var i;
	var util = new Util();
	var notdimdFlag = false;
	var notdimdBtnIdx;

	// notDimdBtn이라는 iname이 있으면 딤드 param값 인덱스의 버튼은 딤드 무효
	if(util.getDxt("notDimdBtn")){ 
		notdimdFlag = true;
		notdimdBtnIdx = util.getDxt("notDimdBtn").hide().text();
	} 

	if(util.getDxt("hideBtn")){
		var hideFlag = true;
		for (i = 0; i < bbArr.length; i++) {
			var vis;
			if (ccArr[i] == "1") {
				vis = "hidden";
			} else {
				vis = "visible";
			};
			btnArr[Number(bbArr[i])].dimd = ccArr[i];
			$("#btn" + bbArr[i]).css({ 'visibility': vis });
			vis = null;
		} 
	} else {
		for (i = 0; i < bbArr.length; i++) {
			if( notdimdFlag && bb == notdimdBtnIdx){
				continue;
			}
			var vis;
			if (ccArr[i] == "1") {
				vis = "grayscale(1) opacity(0.3)";
			} else {
				vis = "grayscale(0) opacity(1)";
            };
            
            // 입력값이 숫자가 아니면 해당값을 무시함
            console.log("Number(bbArr[i])="+bbArr[i] );
            console.log("ccArr[i]="+ccArr[i] );
            if( $.isNumeric( bbArr[i]) == true && $.isNumeric( ccArr[i]) == true )
            {
                btnArr[Number(bbArr[i])].dimd = ccArr[i];
                $("#btn" + bbArr[i]).css({ '-webkit-filter': vis });
                vis = null;
            }
		}
	}
	i = null;
	bbArr = null;
	ccArr = null;
}

//call_f2.js에 있던 코드 위치 옮김 2021.04.16 (손지민)
/*************************************************************************************
	Description		: 버튼 보이거나 가리기 
    Input Param		: param1 = iname, 
                      param2 = 버튼상태(0:hidden, 1:visible)
	Output Param	: None
	return Value	: None
**************************************************************************************/
function doShowBtn( param1, param2 )
{
    let vis = (param2 == "1")?"block":"none";

    //html에서 btn class를 찾아서 param1과 같은 iname을 가진 btn에게 후처리 값 전송
    for(i = 0; i < $(".btn").length; i++){
        let thisBtn = $(".btn")[i];
        if($(thisBtn).data("iname") == param1) $(thisBtn).css({ 'display': vis });
    }
    vis = null;

    //인덱스로 처리하던 코드 수정함
    //$("#btn" + param1).css({ 'display': vis });
}
