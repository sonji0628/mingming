/*************************************************************************************
	FileName			:	finds.js
	Description			:	다목적 키워드 및 단어 검색함수                            
	Created Date		:	2019.08.00
	Created By			:	ATEC AP, 임광진
	Revision History	:	
         ver 1.0.0.0 - 최초작성
         ver 1.0.0.1 - 하나은행 통합, global 변수 myFinds 를 local this 로 변경함, cyg
         ver 1.0.0.2 (2021.02.15) - lge 사용부분을 imgDir, btnDir 로 변경함, cyg
         ver 1.0.0.3 (2021.03.05) - width, height 값을 상수에서 입력param 정보로 변경함, (임광진)
         ver 1.0.0.4 (2021.03.09) - 더블클릭수정
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
let acceessableCount = 1;
let spObj = null//;,timer = null;
var gifArr =["Completed","ic_error_l","ic_caution_l","ic_notice"] //한번짜리 애니 리스트
//var imgFindArr = [];
var imgFindArr = ["1080/894/200/130","btn_check.png","btn_check_check.png","btn_confirm_check.png","btn_confirm_check_red.png"];//확인 "btn_confirm_check_red.png"
var imgNextArr = ["1080/894/200/130","btn_next.png","btn_next_eng.png","main_next.png","btn_inquiry.png"];//다음,"btn_pay.png" ,"btn_pay_black.png","btn_pay_red.png","btn_next_cancel_23.png"
var imgMoreArr = ["1080/894/200/130","btn_transfer.png","btn_agree.png","foreign_request.png","foreign_exchange_black.png","btn_pay_arrow.png"]//기타버튼들
var imgCanelArr = ["1092/100/188/93","btn_cancel.png","btn_cancel2.png","btn_finish.png"];//취소
var imgPrelArr = ["0/925/200/100","btn_previous.png","btn_before.png"];//이전
var arryKindArr = [imgFindArr,imgNextArr,imgMoreArr,imgCanelArr,imgPrelArr];
var maxNum  = Math.max(imgFindArr.length,imgNextArr.length,imgMoreArr.length,imgCanelArr.length,imgPrelArr.length);
var arr = (arryKindArr[0].length == maxNum)?arryKindArr[0]:(arryKindArr[1].length == maxNum)?arryKindArr[1]:(arryKindArr[2].length == maxNum)?arryKindArr[2]:(arryKindArr[3].length == maxNum)?arryKindArr[3]:arryKindArr[4];
arryKindArr.splice(arryKindArr.indexOf(arr),1);
//clickFlag = true////////////////
//findClass = new finds();
function finds(){
    var toggle = false;
    var handle = null;
    var indexNum;
    this.findObj=function(gab1,gab2,gab3){
        var lszES=""
        var i = 0
        switch(gab1){
            case "btnGab":
                for (i = 0; i < btnArr.length; i++) {
                    if ($(btnArr[i]).attr("iname") == gab2) {
                        //console.log(value)
                        btnArr[i].breturn = gab3;
                        break;
                    }
                }
                break ;
            case "btn":
                for(i = 0 ; i<btnArr.length ; i++) {
                    if($(btnArr[i]).attr(gab3)==gab2){
                        lszES = i
                        break;
                    }
                }
                return lszES;
                break ;
            case "dxt":
                for(i = 0 ; i<dxtArr.length ; i++) {
                    if($(dxtArr[i]).attr(gab3)==gab2){
                        lszES = i
                        break;
                    }
                }	
                // console.log("lszES = "+lszES)
                return lszES;
                break ;
            case "txt":
                for(i = 0 ; i<txtArr.length ; i++) {
                    if($(txtArr[i]).attr(gab3)==gab2){
                        lszES = i
                        break;
                    }
                }	
                // console.log("lszES = "+lszES)
                return lszES;
                break ;
            case "msg":
                for(i = 0 ; i<msgArr.length ; i++) {
                    if($(msgArr[i]).attr(gab3)==gab2){
                        lszES = i
                        break;
                    }
                }	
                // console.log("lszES = "+lszES)
                return lszES;
                break ;
            case "bgx":
                for(i = 0 ; i<msgArr.length ; i++) {
                    if($(bgxArr[i]).attr(gab3)==gab2){
                        lszES = i
                        break;
                    }
                }	
                // console.log("lszES = "+lszES)
                return lszES;
                break ;
            case "ten":
                for(i = 0 ; i<tenArr.length ; i++) {
                    if($(tenArr[i]).attr(gab3)==gab2){
                        lszES = i
                        break;
                    }
                }	
                // console.log("lszES = "+lszES)
                return lszES;
                break ;
            default :
                //console.log("유형을 추가")
        }
    }
    ///////////////////////////////////////////////////팝업창
    this.popupShow=function(visibleF,pageNum){
        if(visibleF ==1){
            $('#blackBgF').css({'top':'0px'})
            $('#popupTotalF').css({'top':'168px'})
            let handle = setTimeout(function(){
                $('#blackBgF').css({'top':'-800px'})
                $('#popupTotalF').css({'top':'-632px'})
            },setupInfo[bankKinds][0].popupWord[pageNum][3])
        }else if(visibleF ==0){
            $('#blackBgF').css({'top':'-800px'})
            $('#popupTotalF').css({'top':'-632px'})
        }
    }
    this.popupPlus=function(pageNum){
        let bgDiv =`
        <div id='blackBgF'></div>
        <div id='popupTotalF' style='position:absolute'>
          <img src='${imgOffical}/popupF2.png'>
          <div id ='secendTxtF' class='popTxtF'><span></span>${setupInfo[bankKinds][0].popupWord[pageNum][1]}</div>
        </div>
        `
        $('#'+setupInfo[bankKinds][0].popupWord[pageNum][0]).append(bgDiv);
        $('#'+setupInfo[bankKinds][0].popupWord[pageNum][0]).css({'z-index':'100'});
        $('#blackBgF').css({'position':'absolute','width':'1024px','height':'768px','top':'-800px','background-color':'#000','opacity':'0.7','z-index':'100','transition':'opacity 0.8s, top 0.4s'})
        $('#popupTotalF').css({'position':'absolute','top':'-632px','left':'168px','opacity':'1','z-index':'101','transition':'opacity 0.8s, top 0.4s'})
        $('#secendTxtF').css({'position':'absolute','top':'55%','left':'50%','transform':'translate(-50%,-60%)','font':setupInfo[bankKinds][0].popupWord[pageNum][2]});
        $('#secendTxtF span').css({'color':'#FB3F6B'});
    }
    ////////////////////////////////////////////////////////////
    this.imgFinds=function(){

        // 코드통합 2021.01.22 (cyg) start ==>
        /**
       arr.forEach(function(element,index){
            if(myFinds.findObj("btn",element,"urlpath").length != 0){
                //console.log("element = "+element,"index = "+index)
                var p = myFinds.findObj("btn",element,"urlpath")
                $("#btn"+p).css({'width':arr[0].split("/")[2]+'px','height':arr[0].split("/")[3]+'px','top':arr[0].split("/")[1]+'px','left':arr[0].split("/")[0]+'px'});
                $("#btn"+p+" img").css({'width':arr[0].split("/")[2]+'px','height':arr[0].split("/")[3]+'px','z-index':'200'})
            }
            for(var i=0 ; i<arryKindArr.length ; i++){
                var arrName = arryKindArr[i]
                if(arrName[index] != undefined){
                     if(myFinds.findObj("btn",arrName[index],"urlpath").length != 0){
                         var p2 = myFinds.findObj("btn",arrName[index],"urlpath")
                         $("#btn"+p2).css({'width':arrName[0].split("/")[2]+'px','height':arrName[0].split("/")[3]+'px','top':arrName[0].split("/")[1]+'px','left':arrName[0].split("/")[0]+'px'});
                         $("#btn"+p2+" img").css({'width':arrName[0].split("/")[2]+'px','height':arrName[0].split("/")[3]+'px','z-index':'200'})
                     }
                }
            }
        });
        **/
        // 코드통합 2021.01.22 (cyg) end <==
        arr.forEach(function(element,index){
            if(this.findObj("btn",element,"urlpath").length != 0){
                //console.log("element = "+element,"index = "+index)
                var p = this.findObj("btn",element,"urlpath")
                $("#btn"+p).css({'width':arr[0].split("/")[2]+'px','height':arr[0].split("/")[3]+'px','top':arr[0].split("/")[1]+'px','left':arr[0].split("/")[0]+'px'});
                $("#btn"+p+" img").css({'width':arr[0].split("/")[2]+'px','height':arr[0].split("/")[3]+'px','z-index':'200'})
            }
            for(var i=0 ; i<arryKindArr.length ; i++){
                var arrName = arryKindArr[i]
                if(arrName[index] != undefined){
                     if(this.findObj("btn",arrName[index],"urlpath").length != 0){
                         var p2 = this.findObj("btn",arrName[index],"urlpath")
                         $("#btn"+p2).css({'width':arrName[0].split("/")[2]+'px','height':arrName[0].split("/")[3]+'px','top':arrName[0].split("/")[1]+'px','left':arrName[0].split("/")[0]+'px'});
                         $("#btn"+p2+" img").css({'width':arrName[0].split("/")[2]+'px','height':arrName[0].split("/")[3]+'px','z-index':'200'})
                     }
                }
            }
        });

    }
    this.korChange = function(num){
        var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십")
        var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천")
        var result ="";
        var han;
        for(var i=0 ; i<num.length; i++){
            str = "";
            han = hanA[num.charAt(num.length-(i+1))];
            if(han != "")str += han + danA[i];
            if(i==4)str+="만";
            if(i==8)str+="억";
            if(i==12)str+="조";
            result = str + result; 
        }
        if(num!=0){
            result = result + "원"
        }
        return result;
    }
    this.Dimds = function (gab, flag) {
        var p1 = this.findObj(gab.split('/')[0],gab.split('/')[1],gab.split('/')[2])//샘플 btn/2/iname
            if (flag) { //1 DIMD
                $('#btn' + p1).css('-webkit-filter', 'grayscale(100%) opacity(30%)')
                btnArr[p1].dimd = "1";
            } else { // 0 not DIMD
                $('#btn' + p1).css('-webkit-filter', 'grayscale(0%) opacity(100%)')
                btnArr[p1].dimd = "0";
            }

    }
    this.Dimds2 = function (gab, index) {
        $('#btn' + index).css('-webkit-filter', 'grayscale(100%) opacity(30%)')
        btnArr[index].dimd = gab;
    }
    this.formatChange = function() {
        var theString = arguments[0]
        //console.log('before theString =' +theString)
        for(var i = 0; i < arguments.length; i++) {
            var regExp = new RegExp('\\{' + (i-1) + '\\}', 'gm');
            theString = theString.replace(regExp, arguments[i]);
        }
        //console.log('after theString =' +theString)
        return theString;
    }
    this.aniMotion=function(gab1,gab1){
        this.findObj(gabs1[0],gabs1[1],gabs1[2])
    }
    this.toggleMotion=function(gab1,gab2,gab3,gab4){
        var gabs1=gab1.split("/")   ///("msg","0550back.png","urlpath")=="0"  
        var gabs2=gab2.split("/")   //("msg","10","iname")
        var gabs3=gab3.split("/")   //("dxt","dxt02","iname")
        // console.log("gab4="+gab4)
        var  check1, check2
        if(this.findObj(gabs1[0],gabs1[1],gabs1[2])==gabs1[3]){
            check1 = this.findObj(gabs2[0],gabs2[1],gabs2[2])
            check2 = this.findObj(gabs3[0],gabs3[1],gabs3[2])
            var paramTxt = ""
            if(gab4=="undefined"){
                paramTxt = $(msgArr[check1]).attr("param")
            }else {
                paramTxt = $(dxtArr[check2]).attr("param")
            }
            if($(msgArr[check1]).attr("param")!=""){
                if($(msgArr[check1]).attr("param")=="0"){    
                    this.stopInterval();
                    $("#dxt"+check2).html("");
                }else if(Number($(msgArr[check1]).attr("param"))>3){  
                    this.stopInterval();
                    $("#dxt"+check2).html("");
                }else{
                    $("#dxt"+check2).html(paramTxt);
                    this.startInterval(check2);
                }
            }else{
                this.stopInterval();
                $("#dxt"+check2).html("");
            }
        }
    }
    this.startInterval0=function(num,fn){
        this.stopInterval();
        if(handle==null){
            handle=setInterval(function(){
                if(num==0){
                    // 코드통합 2021.01.22 (cyg)
                    //myFinds.stopInterval();
                    this.stopInterval();
                    fn();
                    //console.log('clean')
                }else{
                    num--
                    //console.log('num = '+num)
                }
            },1000)
        }
    }
    this.startInterval=function(num1){
        if(handle==null){
            handle=setInterval(function(){
              //console.log("interval")
                toggleBg(num1)
            },350)
        }
    }
    
    /////////////////////////////
    this.setTrigger=function(callBack,domCompare,domEvent){
        if(handle==null){
            handle=setInterval(callBack,100,domCompare,domEvent)
        }
    }
    /*this.evtCheck = function(gab1,gab2){
        if($('#'+gab1)[0]!=undefined){
            triggerF = true
            $("#"+gab2).trigger("click"); //기간버튼 클릭 이벤트
            this.stopInterval();
        }else{
            console.log("아직 안들어옴")
        }
    }*/
    ////////////////////////////////////////
    
    this.startInterval2=function(num1,num2,num3){
        if(handle==null){
            handle=setInterval(function(){
              //console.log("interval")
                toggleBg2(num1,num2,num3)
            },450)
        }
    }
    this.startOnceInterval=function(num1,num2){
        handle=setTimeout(function(){
            $("#"+num1+num2).css({'visibility':'hidden'});
            handle =null; 
        },2500)
    }
    this.startOnceInterval2=function(cb,num2,times){
        handle=setTimeout(function(){
            cb(num2)
            handle =null;
            console.log("한번실행")    
        },times)
    }
    
    this.stopInterval=function(){
        clearInterval(handle);
        handle =null;
    }
    //this.toggleBg=function(num){
    function toggleBg(num1){
        if(toggle){
            $("#dxt"+num1).css({'color':'#ffcc00'});
        }else{
            $("#dxt"+num1).css({'color':'#2868EC'});
        }
        toggle = !toggle
    }
    function toggleBg2(num1,num2,num3){
        if(toggle){
            $("#dxt"+num1).css({'color':'#'+num2});
        }else{
            $("#dxt"+num1).css({'color':'#'+num3});
        }
        toggle = !toggle
    }
    this.tenClickOver = function (btnObj,btnColor,btnImg,topNum,sFlag) {
        console.log('acceessableCount0 = '+acceessableCount)
        //acceessableCount = 1
        //if(acceessableCount !=1){return};
        let mymy = btnObj
        let btnNum = this.numberFlag(mymy.id);
        let mymyColor = $('#textten'+btnNum).css('color'), mymyImg = $('#imgten'+btnNum).attr('src')
        bleep.pause();
        bleep.currentTime = 0;
        bleep.oncanplaythrough = function(){
            sFlag == "soundNo"?"":bleep.play(); //소리
            if(acceessableCount == 1){
               acceessableCount  = acceessableCount -1; 
                $('#imgten'+btnNum).attr('src',`${btnOffical}/${btnImg}.png`);
                $('#textten'+btnNum).css({'color':`${btnColor}`});
                $(mymy).stop().animate({   //jQuary를 이용하여 눌림효과 주기
                    top: `+=${topNum}px`,
                }, 50);
            }
            handle0 = setTimeout(reback,50,mymy,mymyColor,mymyImg);
            function reback(idG,mymyC,mymyI) {
                //acceessableCount = acceessableCount==1?0:0;
                if(acceessableCount == 0){
                    acceessableCount = acceessableCount +1;
                    if(eventFlag == false){
                        ws_send("k[10]");
                    }
                    $('#imgten'+btnNum).attr('src',mymyI);
                    $('#textten'+btnNum).css({'color':mymyC});
                    $(idG).stop().animate({
                        top: `-=${topNum}px`,
                    },50);
                    idG = null, handle0 = null;
                    bleep.oncanplaythrough = null;
                }
            }
        }
        console.log('acceessableCount1 = '+acceessableCount)
    }
    this.dashF = function (gab,did){
        var didArr= did.split("-");			
        if(didArr.length==2){
            if(gab.length>didArr[0]){
                return gab.substr(0,Number(didArr[0]))+"-"+
                       gab.substr(Number(didArr[0]),Number(didArr[1]))
            }else{
                //console.log('gab ='+gab)
                return gab;
            }
        }else if(didArr.length==3){
            if(gab.length>Number(didArr[0])+Number(didArr[1])){
                return gab.substr(0,Number(didArr[0]))+"-"+
                       gab.substr(Number(didArr[0]),Number(didArr[1]))+"-"+
                       gab.substr(Number(didArr[0])+Number(didArr[1]),Number(didArr[2]))
            }else if(gab.length>didArr[0]){
                return gab.substr(0,Number(didArr[0]))+"-"+
                       gab.substr(Number(didArr[0]),Number(didArr[1]))
            }else{
                return gab;
            }

        }else if(didArr.length==4){
            if(gab.length>Number(didArr[0])+Number(didArr[1])+Number(didArr[2])){
                return gab.substr(0,Number(didArr[0]))+"-"+
                       gab.substr(Number(didArr[0]),Number(didArr[1]))+"-"+
                       gab.substr(Number(didArr[0])+Number(didArr[1]),Number(didArr[2]))+"-"+
                       gab.substr(Number(didArr[0])+Number(didArr[1])+Number(didArr[2]),Number(didArr[3]))
            }else if(gab.length>Number(didArr[0])+Number(didArr[1])){
                return gab.substr(0,Number(didArr[0]))+"-"+
                       gab.substr(Number(didArr[0]),Number(didArr[1]))+"-"+
                       gab.substr(Number(didArr[0])+Number(didArr[1]),Number(didArr[2]))
            }else if(gab.length>didArr[0]){
                return gab.substr(0,Number(didArr[0]))+"-"+
                       gab.substr(Number(didArr[0]),Number(didArr[1]))
            }else{
                return gab;
            }
        }else{
            return gab;
        }
    }

    this.btnClick0 = function (btnObj) {
        var mymy = btnObj;
        bleep.pause();
        bleep.currentTime = 0;
        bleep.oncanplaythrough = function(){
            bleep.play(); //소리
            if(acceessableCount == 1){
                $(mymy).stop().animate({   //jQuary를 이용하여 눌림효과 주기
                    top: '+=5px',
                }, 50, reback);
                acceessableCount  = acceessableCount -1; 
            }
            function reback() {
                if(acceessableCount == 0){
                    $(mymy).stop().animate({
                        top: '-=5px',
                    }, 50);
                    mymy = null;
                    bleep.oncanplaythrough = null
                    acceessableCount = acceessableCount +1; 
                }
            }
        }
    }
    this.btnClick = function (btnObj) {
        var mymy = btnObj;
        bleep.pause();
        bleep.currentTime = 0;
        bleep.oncanplaythrough = function(){
            bleep.play(); //소리
            if(acceessableCount == 1){
                $(mymy).stop().animate({   //jQuary를 이용하여 눌림효과 주기
                    top: '+=5px',
                    opacity: '0.5',
                }, 50, reback);
                acceessableCount  = acceessableCount -1; 
            }
            function reback() {
                if(acceessableCount == 0){
                    $(mymy).stop().animate({
                        top: '-=5px',
                        opacity: '1',
                    }, 50);
                    //ws_send("k[10]");
                    mymy = null;
                    bleep.oncanplaythrough = null
                    acceessableCount = acceessableCount +1; 
                }
            }
        }
        ws_send("k[10]");
    }
    this.btnClick2 = function (btnObj,flagNum,clickName,moveNum) {
        var mymy = btnObj;
        //console.log(mymy.id)
        let topNum = moveNum
        bleep.pause();
        bleep.currentTime = 0;
        if(flagNum){
            topNum = 0
            ws_send("k[10]");
        }else{
            eventFlag = true;
            ws_send(clickName)
        }
        bleep.oncanplaythrough = function(){
            bleep.play(); //소리
            $('#'+mymy.id+' #bg').css({'opacity':0.5})
            if(acceessableCount == 1){
                $(mymy).stop().animate({   //jQuary를 이용하여 눌림효과 주기
                    top: '+='+topNum+'px', 
                    }, 100, reback);
                acceessableCount  = acceessableCount -1; 
            }
            function reback() {
                if(acceessableCount == 0){
                    $('#'+mymy.id+' #bg').css({'opacity':0})
                    $(mymy).stop().animate({
                        top: '-='+topNum+'px',
                    }, 100);
                    //ws_send("k[10]");
                    mymy = null;
                    bleep.oncanplaythrough = null
                    acceessableCount = acceessableCount +1; 
                }
            }
        }
    }
    let obj2 = "", obj3 = "", minGab = "";
    this.DivCreate = function(divT,colorG,fontG,obj,imgName,cssLocal){
        var divTag = "",  obj22 = "" ,obj1 = ""
        //if(divT =='del'){return}; 
        obj1 = obj.split("/")[0];
        obj22 = obj.split("/")[1];
        if(obj.split("/")[1].indexOf("~")>-1){
            obj2 = obj22.split("~")[0];
            obj3 = obj22.split("~")[1];
        }else{
            obj2 = "0";
            obj3 = obj22;
        }
        var cssTop = Number(cssLocal.split("/")[0].split("-")[0]);
        var cssTopUnit = Number(cssLocal.split("/")[0].split("-")[1]);
        var cssLeft = Number(cssLocal.split("/")[1].split("-")[0]);
        var cssLeftUnit = Number(cssLocal.split("/")[1].split("-")[1]);
        var cssWidth = Number(cssLocal.split("/")[2].split("-")[0]);
        var cssHeight = Number(cssLocal.split("/")[2].split("-")[1]);
        var imgLink = new Array();
        var imgNameArray = imgName.split("^")[1].split(',')//
        if(imgName.indexOf("|")>0){
            imgLink = imgName.split("^")[0].split("|")//
        }else{
            for(var k = 0 ; k<Number(obj3) ; k++){
                imgLink.push(imgName.split("^")[0]);//
            }
        }
        //myFinds.imgMake('ten/ten','btn/9~12','ten3.png|ten1.png|ten4.png^,0,정정','278-0/7-134',tenLink,"bgx0");


        // 코드통합 2021.01.22 (cyg)
        //obj1 = (obj1=='img')?'msg':obj1
        obj1 = (obj1=='img')?'img':obj1;
        
        var divClass = "",divId = "",divId2 = ""
        if(divT.indexOf("/")>0){
            divClass = divT.split("/")[1]
            divId = divT.split("/")[0]
        }else{
            divClass = divT
            divId = divT
        }
        minGab = Number(obj3) - Number(obj2)
        for(var i=0 ; i<minGab; i++){
            //////추가
            var cssTolWidth = cssLocal.split("/")[2].indexOf(',')>-1?Number(cssLocal.split("/")[2].split(',')[i].split("-")[0]):cssWidth;
            var cssTolHeight = cssLocal.split("/")[2].indexOf(',')>-1?Number(cssLocal.split("/")[2].split(',')[i].split("-")[1]):cssHeight;
            //////
            if(obj1 == "txt"){
                divTag =
                divTag+`
                <div onContextMenu="return false" onSelectStart="return false" onDragStart="return false" id = '${divId+(i+Number(obj2))}' class='${divClass}' style = 'position:absolute;top:${cssTop+cssTopUnit*i}px;left:${cssLeft+cssLeftUnit*i}px;color:${colorG};font:${fontG}'>
                ${imgName}
              </div>
             `; 
         }else if(obj1 == "img" || obj1 == "btn"){
            let objDir = "";

            // 이미지 경로 저시력 , 공통처리
            if(obj1=="img")     objDir = (tenObj.lge == "lv") ?  imgDir: imgOffical;
            else                objDir = (tenObj.lge == "lv") ?  btnDir: btnOffical;

            if(divT.split("/").length == 3){
                 divTag =
                 divTag+`
                  <div onContextMenu="return false" onSelectStart="return false" onDragStart="return false" id = '${divId}' class='${divClass}' style = 'position:absolute;top:${cssTop+cssTopUnit*i}px;left:${cssLeft+cssLeftUnit*i}px'>
                    <div style = 'position:relative;text-align:center;width:${cssTolWidth}px;height:${cssTolHeight}px'>
                        <img id = 'img${divId}' style = 'vertical-align: middle' src="${objDir + imgLink[i]}">
                        <div id = 'text${divId}' style = 'position:absolute;vertical-align: middle;top:50%;left:50%;transform: translate(-50%,-60%);color:${colorG};font:${fontG};width:100%'>${imgNameArray[i]}</div>
                    </div>
                  </div>
                 `;
            }else{
                 divTag =
                 divTag+`
                  <div onContextMenu="return false" onSelectStart="return false" onDragStart="return false" id = '${divId+(i+Number(obj2))}' class='${divClass}' style = 'position:absolute;top:${cssTop+cssTopUnit*i}px;left:${cssLeft+cssLeftUnit*i}px'>
                    <div style = 'position:relative;text-align:center;width:${cssTolWidth}px;height:${cssTolHeight}px'>
                        <img id = 'img${divId+(i+Number(obj2))}' style = 'vertical-align: middle' src="${objDir + imgLink[i]}">
                        <div id = 'text${divId+(i+Number(obj2))}' style = 'position:absolute;vertical-align: middle;top:50%;left:50%;transform: translate(-50%,-60%);color:${colorG};font:${fontG};width:100%'>${imgNameArray[i]}</div>
                    </div>
                  </div>
                 `;
            }
            // <img id = 'img${divId+(i+Number(obj2))}' style = 'vertical-align: middle' src="${objDir}/${imgLink[i]}" onerror="this.onerror = null; this.src = '${btnOffical + imgLink[i]}'">

         }else {
             /*divTag =
             divTag+`
              <div id='${divT+i}' class='${divT}' style = 'top:${cssTop+cssTopUnit*i}px;left:${cssLeft+cssLeftUnit*i}px'>
                <img src="${obj1}_${lge}/${imgLink}.png">
              </div>
             `;*/
         }
     }
     obj1 = '', obj22 = '', cssTop = '', cssTopUnit = '', cssLeft = '', cssLeftUnit = '', cssWidth = '', cssHeight = '';
     imgLink =[], imgNameArray = [];
     return divTag;
    }
    this.numberFlag = function(num){////숫자만 뽑기
        var thisindex = num.replace(/[^0-9]/g,'');
        return thisindex
        
    }
    this.alphaFlag = function(num){////문자만 뽑기
        var thisindex = num.replace(/[0-9]/g,"");
        return thisindex
        
    }
    this.imgMake = function(divT,colorG,fontG,obj,imgName,cssLocal,cb,iname){ 
        console.log("★"+btnDir, tenObj.lge);
        $("#"+iname).append(this.DivCreate(divT,colorG,fontG,obj,imgName,cssLocal));//div id값, 경로, 이미지이름, 이미지Top값, 이미지,Left값
        //this.DivCreate('del')
        var thislength = ''//this.numberFlag(divT)////2020.06.08 다시 수정해야함
        var thislength2 = divT.split('/')[0]//this.alphaFlag(divT.split('/')[0])
        var thislength3= obj.split("/")[0].toString()
        if(thislength3 == "btn"){
            if(divT.indexOf("/")>-1){
                if(thislength != ""){
                    $('#'+thislength2+thislength+'0').val("k[10]");
                    $('#'+thislength2+thislength+'0').bind('mousedown touchstart',cb);
                    //$('#'+thislength2+thislength+'0').bind('touchstart mousedown',cb);
                }else{
                    let forNum = (obj.split('/')[1].indexOf("~")>-1)?minGab:Number(obj.split('/')[1]);
                    for(var i =0 ; i<forNum; i++){
                        $('#'+thislength2+(i+Number(obj2))).val("k[10]");
                        $('#'+thislength2+(i+Number(obj2))).bind('mousedown touchstart',cb);
                        //$('#'+thislength2+(i+Number(obj2))).bind('touchstart mousedown',cb);
                    }
                }
            }else{
                console.log('#')
                $('.'+divT).val("k[10]");
                $('.'+divT).bind('mousedown touchstart',cb);
                //$('.'+divT).bind('touchstart mousedown',cb);
            }
        }
        //myFinds.imgMake('ten/ten','btn/0~3','ten1.png^1,2,3','8-0/7-134',tenLink,"bgx0");
        thislength = '', thislength2 = '', thislength3 = '', obj2 = '', obj3 = ''
    }
}
