/*****************************************************************************
   텐키처리 클라스
   2015. 09. 10
   전기준 black™ (010-4255-3564)
   
   json파싱을 통해서 tenkey버튼값과 입력 dxt, 콤포넌트 msg인덱스만 불러옴.
   관련 콤포넌트를 통해서 입력제어토록 함(예:password.js)-2015_11_11
   json이 아닌 xml파싱으로 변경함(2016_01_07)
    ver 1.0.0.0 - 최초 작성
    ver 1.0.0.1 - destory 함수를 여기로 이동함
    ver 1.0.0.2 - *.swf 대응코드 삭제(미사용), js/btn_xx 폴더를 btnDir 변수로 변경함, cyg
	ver 1.0.0.3 (2021.02.15) - 세미콜론(;) 일부누락 수정 (cyg)
    ver 1.0.0.4 (2021.05.19) - 모듈 로딩완료 설정, cyg
***********************************************************************************/

function ten_f(gab, lge, screenNumber) { //텐키처리함수
    let dxtIndex = $(gab).attr("dxtIndex"); //텐키가 들어갈 동적 텍스트 공간
    let imgIndex = $(gab).attr("imgIndex"); //텐키의 유형을 저장    
    let confirmurl = $(gab).attr("confirmurl"); //확인키
    let tenTimeout; //타임아웃 변수

    let sptIs; //특수텐키가 있다면 true로 바뀜
    // let zero;
    if ($(gab).find("ten").length) {
        $(gab).find("ten").each(function () { //동적텍스트 오브젝트를 배열로 넣기                     
            tenArr.push($(this))
        });

        sptIs = false;
        for (let i = 0; i < tenArr.length; i++) {
            //글자색 변환    
            // 코드통합 2021.01.22 (cyg) start ==>
            /**
            let tcolor = Number($(tenArr[i]).attr("tcolor")).toString(16);
            zero = "000000";
            zero = zero.substring(tcolor.length, zero.length)
            tcolor = zero + tcolor
            **/
            // text color 값을 htx string 으로 변경
            let tcolor = Number($(tenArr[i]).attr("tcolor")).toString(16).padStart(6,'0');
            // 코드통합 2021.01.22 (cyg) end <==


            //딤드여부
            let dimdIs = ""; //회색으로
            let opacityIs = ""; //반투명하게
            if ($(tenArr[i]).attr("dimd") == "0") {
                dimdIs = 'grayscale(0%)';
                opacityIs = 'opacity(100%)';
                tenArr[i].dimd = "0"; //dimd변수 추가 -2016_01_08
            } else {
                dimdIs = 'grayscale(100%)';
                opacityIs = 'opacity(30%)';
                tenArr[i].dimd = "1"; //dimd변수 추가
            }

            //배경이미지
            let bgimg = $(tenArr[i]).attr("tenurl").split('.')[0];
            let tenBgImg = $('<img>');
            /**
            if ($(tenArr[i]).attr("tenurl").split('.')[1] == 'swf') { //swf일경우만 svg로 변환                               
                tenBgImg.attr({
                    'id': 'tenBgImg' + i,
                    'class': 'tenBgImg',
                    'src': 'btn_' + lge + '/' + bgimg + '.svg'
                }); //속성 추가
            } else {
                bgimg = $(tenArr[i]).attr("tenurl")
                tenBgImg.attr({
                    'id': 'tenBgImg' + i,
                    'class': 'tenBgImg',
                    'src': '../btn_' + lge + '/' + bgimg
                }); //속성 추가
            }
            **/
           bgimg = $(tenArr[i]).attr("tenurl");
           tenBgImg.attr({
               'id': 'tenBgImg' + i,
               'class': 'tenBgImg',
            //    'src': btnDir + bgimg
           }); //속성 추가
       // console.log(bgimg);

			tenBgImg.css({
				'width': Number($(tenArr[i]).attr("tenw")) + 'px',
				'height': Number($(tenArr[i]).attr("tenh")) + 'px'
			})

            //텐바디
            let ten = $('<div></div>'); //텐키div
            ten.attr({
                'id': 'ten' + i,
                'class': 'ten'
            }); //속성 추가
            ten.css({
                '-webkit-filter': dimdIs + ' ' + opacityIs,
                'position': 'absolute',
                'top': Number($(tenArr[i]).attr("teny")) + 'px',
                'left': Number($(tenArr[i]).attr("tenx")) + 'px',
                'z-index': Number($(tenArr[i]).attr("depthG")),
            })
            if (lge == "bp") { //전맹일경우 무조건 가림(2016_03_16)
                visibleis = 'hidden'
                ten.css({
                    'visibility': 'hidden'
                })
            }
            //글자 visible여부- 이미지로 글자 넣을 경우 사용
            let txtHide = 'visible'; //기본은 글자보이게 함
            if ($(tenArr[i]).attr("txtHide") == "0") { //글자를 숨기겠다면
                txtHide = 'hidden';
            } else {
                if (lge == "bp") { //전맹일경우 무조건 가림(2016_03_16)
                    txtHide = 'hidden';
                } else {
                    txtHide = 'visible';
                }
            }
            //텐 캡션문구
            let tenText = $('<div class="dd1">' + $(tenArr[i]).attr("tendata") + '</div>'); //캡션문구  
            tenText.attr({
                'id': 'tenText' + i,
                'class': 'tenText'
            }); //속성 추가   
            tenText.css({
                'position': 'absolute',
                'top': (Number($(tenArr[i]).attr("tenh")) / 2 - Math.round(Number($(tenArr[i]).attr("tsize")) / 1.8)) + 'px', //사이트별로 조정필요

                'width': Number($(tenArr[i]).attr("tenw")) + 'px',
                'height': Number($(tenArr[i]).attr("tenh")) + 'px',  // 영역넘어가서 높이값 안줌 (농협?)
                'font-size': Number($(tenArr[i]).attr("tsize")) + 'px',
                'font-family': fontIs($(tenArr[i]).attr("fontis")),
                'text-align': "CENTER",
                'color': '#' + tcolor,

                'visibility': txtHide
            })
            
            $('#container').append(ten); //바디에 넣고
            $(ten).append(tenBgImg); //텐바디에 넣고
            $(ten).append(tenText); //역시 텐바디에 넣고
            //$("#g-container").contents().find("#container__uiCreator").append(ten)
            //$("#container__uiCreator").append(ten);

            //$("#ten" + i).mousedown(tenClick); //버튼클릭 이벤트  
            $("#ten" + i).on(eventType,tenClick);
            //$("#g-container").contents().find("#ten" + i).on(eventType,tenClick);//버튼클릭 이벤트

            //$("#ten" + i).mouseup(tenUp); //버튼클릭 이벤트  
/*
            //uiCreator에서 요소 선택가능하도록 함.
            if (uiCreator) { //uiCreator변수가 true에서만 동작                
                $(".ten").on(eventType, function () {
                    console.log("버튼 눌렀어" + $("#tenText" + i).css("width"))
                    $('#selectedBox').html("");
                    let selectBox = $("<div></div>");
                    // selectBox.attr({'draggable':'true'})
                    selectBox.css({
                        'top': $(this).css("top"),
                        'left': $(this).css("left"),
                        'width': $("#tenText" + $(this).prop("id").substring(3, $(this).prop("id").length)).css("width"),
                        'height': $("#tenText" + $(this).prop("id").substring(3, $(this).prop("id").length)).css("height")
                    })
                    $('#selectedBox').append(selectBox);
                    ws_send("yoso`ten`" + $(this).prop("id").substring(3, $(this).prop("id").length)); //UICreator에게 선택요소 알려주기(2019.02.27)
                })
            }
*/
            ten = null;
            tenText = null;
            txtHide = null;
            tenBgImg = null;
            bgimg = null;
        }

        function tenClick(e) {
            // console.log(e.type)
            if (!eventFlag && !clickFlag) { //이미 다른게 눌리지 않았다면
                clearTimeout(tenTimeout);
                let thisi = Number($(this).prop('id').substring(3, $(this).prop('id').length));
                if (tenArr[thisi].dimd == "0") {
                    //clickFlag = true;//click시작
                    // console.log($(tenArr[thisi]).attr("tendata")); //리턴값 주기

                    //parent.sendData(btnArr[Number($(this).prop('id').substr(3,1))]._breturn)
                    if ($(tenArr[thisi]).attr("del") == "1") {
                        cal('back'); //지우기라면
                    } else if ($(tenArr[thisi]).attr("clr") == "1") {
                        cal('clear'); //정정이라면
                    } else {
                        cal($(tenArr[thisi]).attr("tendata")); //동적 텍스트에 입력하기
                    }
                    //let obj = $(this).position();
                    //let yy = obj.top;
                    let mymy = this;

                    //$(mymy).css({ "opacity": "0.5", "top": (yy + 2) + "px" });//아래로 2픽셀내리고 반투명으로        
                    bleep.pause(); //기존소리를 죽이고 새로...
                    bleep.currentTime = 0;
                    bleep.play(); //소리
                    
                    //NH 농협 버튼클릭시 이미지 변경 S
                    /** 농협 관련사항 삭제
                    const imgObj = $(this).find("img");
                    const txtObj = $(this).find("div");
                    const imgName = imgObj.attr("src");
                    const fontColor = txtObj.css("color");
                    if(imgName.indexOf("nomal") >= 0){
                        imgObj.attr("src",imgName.replace("nomal","pressed"));
                        txtObj.css("color","#ffffff");
                    } else if(imgName.indexOf("normal") >= 0) {
                        imgObj.attr("src",imgName.replace("normal","pressed"));
                    } else {
    
                    }
                    */

                    $(mymy).animate({ //jQuary를 이용하여 눌림효과 주기
                        top: '+=5px',
                        opacity: '0.5',
                    }, 50, reback);
                    function reback() {
                        // $(mymy).animate({
                        //     top: '-=5px',
                        //     opacity: '1',
                        // }, 50);
                        $(mymy).animate({
                            top: '-=5px',
                            opacity: '1',
                        }, 50);
                        thisi = null;
                        mymy = null;

                        /* 농협 관련사항 삭제
                        if(imgName.indexOf("nomal") >= 0){
                            imgObj.attr("src",imgName);
                            txtObj.css("color",fontColor);
                        } else if(imgName.indexOf("normal") >= 0) {
                            imgObj.attr("src",imgName);
                        } else {
        
                        }
                        */
                        //NH 농협 버튼클릭시 이미지 변경 E
                    }
                }
                thisi = null;
            }
        }

        // 코드통합 2021.01.22 (cyg) start ==제
        /* 미사용 함수 삭제
        function tenUp(e) {
            // console.log(e.type)
            if (!eventFlag && !clickFlag) { //이미 다른게 눌리지 않았다면 
                if (tenClass != null) {
                    try {
                        tenClass.calup(dxtIndex);
                    } catch (err) {

                    }
                }
            }
        }
        */
       // 코드통합 2021.01.22 (cyg) end <==

        //tenkey유형(기존에 사용한 콤포넌트 파일명으로 구분)을 분류해서 클라스(콤포넌트) 불러오기(2015_11_11)
        // console.log("콤포넌트이미지" + imgIndex)

        // 농협 관련사항(?) 을 임광진 선임 작업내용으로 변경함
        let tenFunction  = $(tenArr[Number(imgIndex)] ).attr("tendata"), tenFlag = "";
        let tempImg = $(msgArr[Number(imgIndex)]).attr("urlpath") != undefined ? $(msgArr[Number(imgIndex)]).attr("urlpath").split('.')[0] : "";
        if(tempImg.substr(0,3)=="SPT" || tenFunction.length>3){ //special Display일 경우 동적으로 자바스크립트를 로드함(black™ 전기준 2018.08.09)
            //tempImg = (tenFunction.length>2)?tenFunction:tempImg;
            var parentC= document.getElementById('msg'+Number(imgIndex));
            let tempImgFlag = tenFunction.lastIndexOf("|") != undefined ? tenFunction.lastIndexOf("|") : "";
            var script= document.createElement('script');  
            script.type= 'text/javascript';
            if(tempImgFlag > 2) {
                tenFlag = "ten"
                //console.log("ten")
                tempImg = tenFunction;
                let minNumber = tempImg.split("_")[0].length+1;
                parentC= document.getElementById('ten0');

                // 모듈 로딩완료 설정, 2021.05.19 (cyg) - 문법오류 수정 callback() -> callback
                //script.addEventListener('load', callback(), false);
                script.addEventListener('load', callback, false);
                
                script.src= './js/ten/'+'TEN_'+tempImg.substring(minNumber,tempImg.length)+'.js';
                parentC.appendChild(script);
                $('#ten0').css({'visibility': 'hidden'});
            }else{
                tenFlag = "msg"
                //console.log("msg")
                if(tempImg.substr(0,3)=="SPT"){
                    sptIs=true;//특수화면이 있다
                    script.src= './js/ten/'+'TEN_'+tempImg.substring(4,tempImg.length)+'.js';
                    parentC.appendChild(script);
                    script.addEventListener('load', callback(), false);
                    $('#msg' + imgIndex).css({'visibility': 'hidden'}); //콤포넌트용 파일은 가리기
                }
            }
//                 script.onload = function () {
//                    callback(i);
//                 }
            function callback(){

                // 모듈 로딩완료 설정, 2021.05.19 (cyg)
                checkCompleted( MODULE_TENKEY);
            }

            var paramArr = [], tenGab = tenFunction.split('_')[0];
            if(tenFlag == "ten"){
                tenObj.paramArr = [];
                paramArr =tenGab.split("|");
                console.log("paramArr = " + paramArr);
                tenObj.paramArr=tenGab.split("|"); 
            }else if(tenFlag == "msg" && tempImg.substr(0,3)=="SPT"){
                paramArr = $(msgArr[Number(imgIndex)]).attr("param").split("|");
                tenObj.paramArr=$(msgArr[Number(imgIndex)]).attr("param").split("|"); 
            }
            tenObj.confirmurl=confirmurl;
            tenObj.dxtIndex=dxtIndex;
            tenObj.lge=lge;
            tenObj.outReturnG="";
            tenObj.connectF=0;
            tenObj.screenNumber=screenNumber
        }


        /** 농협 관련사항 삭제
        if (imgIndex.length > 0) { //SPT가 있을 경우만
            let tempImg = $(msgArr[Number(imgIndex)]).attr("urlpath").split('.')[0];

            if (tempImg.substr(0, 3) == "SPT") { //special Display일 경우 동적으로 자바스크립트를 로드함(black™ 전기준 2018.08.09)
                sptIs = true; //특수화면이 있다
                let parentC = document.getElementById('msg' + Number(imgIndex));
                let script = document.createElement('script');
                script.type = 'text/javascript';
                //script.src = './js/ten/' + space + 'TEN_' + tempImg.substring(4, tempImg.length) + '.js';
                //script.src = '../js/ten/TEN_' + tempImg.substring(4, tempImg.length) + '.js';
                script.src = jsRootDir+'/ten/TEN_' + tempImg.substring(4, tempImg.length) + '.js';

                parentC.appendChild(script)
                script.addEventListener("load", callback(), false);

                function callback(e) {
                    loadObj.tenLC = "1";
                    // LG_CNS.log("ten로딩완료" + e + "/ten.js/208");
                }

                tenObj.paramArr = $(msgArr[Number(imgIndex)]).attr("param").split("|");
                tenObj.confirmurl = confirmurl;
                tenObj.dxtIndex = dxtIndex;
            }

            $('#msg' + imgIndex).css({
                'visibility': 'hidden'
            }); //콤포넌트용 파일은 가리기
            //파일명으로 유형을 알아옴. 예: 기존 ten_confirm.swf -> ten_confirm
        }
        **/

        function cal(input_Gab) {
            if (tenClass != null) {
                tenClass.cal(input_Gab, dxtIndex);
            } else {
                $("#dxt" + dxtIndex).text($("#dxt" + dxtIndex).text() + input_Gab);
            }
        }

        if (!sptIs) { //특수화면이 ㅇ없다면
            // LG_CNS.log("특수텐키가 없어/ten.js/312")
            loadObj.tenLC = "1";
        }
        loadObj.tenLC = "1";
    } else {
        // LG_CNS.log("텐키가 없어/ten.js/319")
        loadObj.tenLC = "1";

        // 모듈 로딩완료 설정, 2021.05.19 (cyg)
        checkCompleted( MODULE_TENKEY);
    }

    keyTenClass = tenClass; //tenClass객체를 keyListener.js의 변수로 할당(2016_03_16)
    keyDxtIndex = dxtIndex;
    tenFunction = "", tempImg = "", tenFlag = "", tenGab = "";
    paramArr = [];

    //zero = null;
    //tenClass=null;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 텐키 Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고: iframe 의 html 교체시 DOM 이 자동으로 CLEAR 됨
function destroyTen() {
    if (tenArr.length > 0) {
        $('#ten00').remove();///추가된 아이디

        for (let i = 0; i < tenArr.length; i++) {
            $('#ten' + i).remove();
            // $("#g-container").contents().find('#ten' + i).remove();
        }
        i = null;
    }
    tenArr = [];
    tenClass = null;
    tenObj.paramArr = []; //특수화면 클라스 배열 추가(2018. 06.19)
    tenObj.confirmurl = null;
    tenObj.dxtIndex = null;
    tenObj.outReturnG="";
    tenObj.lge="";
}