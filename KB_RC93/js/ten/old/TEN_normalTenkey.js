/*************************************************************************************
	FileName			:	TEN_NORMALtENKEY.js
	Description			:	TEN-KEY 기능 통합
	Created Date		:	2021.01.02
	Created By			:	ATEC AP, 임광진
	Revision History	:	
         ver 1.0.0.0 - 최초작성
         ver 1.0.0.1 - global myFinds 를 local 변수로 변경함.
         ver 1.0.0.2 - 재배열, 비교수, 금액한글화, 저시력 추가
         ver 1.0.0.3 - 날짜관련 텐키추가 및, 경고창추가
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";
//let event = jQurey.Event('addItem')
//setTimeout(evtStart,10)
//function evtStart(){
    tenClass = new TEN_normalTenkey();////클래스 인스턴스 생성  
    tenClass.zero = Number(tenObj.paramArr[0].split(":")[1]);//0사용유무 정하는 변수
    tenClass.minGab =tenObj.paramArr[1].split(":")[1].indexOf("/")>-1?Number(tenObj.paramArr[1].split(":")[1].split("/")[0]):Number(tenObj.paramArr[1].split(":")[1]);//최소값
    tenClass.korIndex = tenObj.paramArr[1].split(":")[1].indexOf("/")>-1?Number(tenObj.paramArr[1].split(":")[1].split("/")[1]):"";//금액 한글화를 위한 텍스트창 인덱스값 담는 변수
    tenClass.maxGab = tenObj.paramArr[2].split(":")[1].indexOf("/")>-1?tenObj.paramArr[2].split(":")[1].split("/")[0]:tenObj.paramArr[2].split(":")[1];//최대값
    tenClass.maxGabIndex = tenObj.paramArr[2].split(":")[1].indexOf("/")>-1?tenObj.paramArr[2].split(":")[1].split("/")[1]:"";//실제 최대값 비교할 숫자넣은 텍스트 인덱스값 변수 
    tenClass.firstMaxGab = tenClass.maxGab//만천키 최대값을 재설정을 하기위한 변수 
    tenClass.returnFlag = Number(tenObj.paramArr[3].split(":")[1]);// 자동리턴 유무 담는 변수
    tenClass.pwFlag = tenObj.paramArr[4].split(":")[1];//패스원드 아스타 처리 유무 담는 변수
    tenClass.comma = Number(tenObj.paramArr[5].split(":")[1]);// 금액숫자에 콤마 처리 유무 변수
    ///만천키 사용유무 담는 변수
    tenClass.manchon = tenObj.paramArr[6].split(":")[1].indexOf("-")>-1?Number(tenObj.paramArr[6].split(":")[1].split("-")[0]):Number(tenObj.paramArr[6].split(":")[1]);
    tenClass.specialGab = tenObj.paramArr[6].split(":")[1].indexOf("-")>-1?tenObj.paramArr[6].split(":")[1].split("-")[1]:"만,천,원";//텐키외 버튼추가시에 들어갈 버튼 캡션문구
    tenClass.shuffle = tenObj.paramArr[7]!=undefined?Number(tenObj.paramArr[7].split(":")[1]):0;//재배열 사용유무 변수
    tenClass.confirmurl = tenObj.confirmurl;//확인버튼 연결변수
    tenClass.dxtIndex = tenObj.dxtIndex.length == 1?tenObj.dxtIndex:tenObj.dxtIndex.charAt(0);////////한자리수면 그대로 다이나믹텍스트 인덴스번호
                                                                                              ////////두자리수면 첫번째수는 다이나믹텍스트 인덴스번호, 두번째번호는 연결할 box오브젝트 인덱스번호
    tenClass.allDimdF = tenObj.paramArr[8]!=undefined?Number(tenObj.paramArr[8].split(":")[1]):0;//all딤드추가, 하나은행1106케이스
    tenClass.popupFlag = tenObj.paramArr[9]!=undefined?Number(tenObj.paramArr[9].split(":")[1]):0;//팝업관련변수추가
    tenClass.lge = tenObj.lge;//나라별 구분변수
    tenClass.screenNumber = tenObj.screenNumber;//화면번호구분
    tenClass.connectF = tenObj.paramArr[10]!=undefined?Number(tenObj.paramArr[10].split(":")[1]):tenObj.connectF;//다른JS와 연결유무에 관한 변수
    //텐키 사용시 기본으로 연결되는 아이디값으로 박스개체의 #bgx0이 기본임
    $('#bgx0').css({'border-radius':'6px'});
    if(tenClass.shuffle===1){
        $('#bgx0').css({'visibility':'hidden'});
        $('#bgx0').css({'width':'540px'})
        $('#bgx0').css({'visibility':'visible'});
    }
    tenClass.evt()
//}
function TEN_normalTenkey() {
    //console.log('ddddd-=='+$('#container').find('#msg2'))
    let myFinds = new finds();///클래스 인스턴스 생성 
    this.outReturnG = "";////외부값 리턴
    this.tmpGab = ""; //실제 입력값
    ////////아스타값, 아스타처리갯수,아스타처리위치      ,주민기능유무,두개텍스트창이용,확인키연결변수      ,외부js링크유무, 외부js 전처리값(파라미터값)
    let aster = "", asterNum = 0,asterPosition = '',jumin = 0, dxtIndex2 = 0, confirmNumber = 0, linkNum = 0, paramG="";
    this.dashGab = "";//대시처리유무 변수
    this.zero = 1; //0입력받음 
    this.maxGab = 4//최대값
    let maxGab2 = 0 //두개의 텍스트창 이용시 두번째 텍스트값 으로 이동 유무의 기중이 되는 첫번째 텍스트값 최대값
    this.maxGabIndex = "";
    this.korIndex = "";
    this.minGab = 1;
    this.pwFlag = "0";
    this.comma = false;
    this.manchon = false;
    this.specialGab=""
    this.returnFlag = false;
    this.confirmurl = ""; //확인 버튼 인덱스
    this.wonNumber = 0;
    this.manNumber = 0;
    this.chonNumber = 0;
    this.shuffle = false;
    this.lge = "kr"
    this.screenNumber= ""
    this.allDimdF = 0;
    this.popupFlag = 0;
    let txtNum = 0;
    let triggerF = false;
    this.connectF = 0;
    let pageNum = '';//msgObj.pageNumberArr[msgObj.pageNumberArr.length-1];//현재페이지명 담는 변수
    let pageNumber = '';//pageNum.substr(2,4);///현재페이지명중 숫자만 담는 변수
    let spName = '';
    /////JSON방식의 정보를 담고있는 TEN_setup.js파일 가공부분
    let confirmLocation = {////확인버튼 위치 정보담는 객체변수  
        top:setupInfo[bankKinds][0].confirmLocation[0].top,
        left:setupInfo[bankKinds][0].confirmLocation[0].left,
    }
    let confirmLocation_LV = {////저시력 확인버튼 위치 정보담는 객체변수  
        top:setupInfo["LV_Confirm"][0].top,
        left:setupInfo["LV_Confirm"][0].left,
    }
    //imgMake사용시 TEN_setup.js파일의 JSON방식의 데이터를 담을 배열변수들
    let locationTopArr = [],locationLeftArr = [], locationSizeArr = [], shuffleTopArr = [], shuffleLeftArr = [], shuffleSizeArr = [], manChonTopArr = [], manChonLeftArr = [], manChonSizeArr = [], fontGab = '';
    let lvTopArr = [],lvLeftArr = [], lvSizeArr = [], lvLinkArr = [], lvFontColorArr = [], lvFontsArr = [];
    let arrPosition = setupInfo[bankKinds][0].arrPositions
    setupInfo[bankKinds][0].locationSize.forEach(function(element){
        locationTopArr.push(element.top);
        locationLeftArr.push(element.left);
        locationSizeArr.push(element.size);
    });
    setupInfo[bankKinds][0].shuffleLocationSize.forEach(function(element){
        shuffleTopArr.push(element.top);
        shuffleLeftArr.push(element.left);
        shuffleSizeArr.push(element.size);
    });
    setupInfo[bankKinds][0].manChonLocationSize.forEach(function(element){
        manChonTopArr.push(element.top);
        manChonLeftArr.push(element.left);
        manChonSizeArr.push(element.size);
    });
    tenArr =[];
    //특수화면담을 배열인덱스번호, 다른JS연결 판단할 변수, 나라명 담을변수
    let spArrNumber = -1, spFlag = false, national = '';
    this.evt = function(){
        console.log('this.screenNumber===='+this.screenNumber)//
        pageNum = this.screenNumber//pageNumber//msgObj.pageNumberArr[msgObj.pageNumberArr.length-1];//현재페이지명 담는 변수//$("#pageNumber").text()//
        pageNumber = pageNum.substr(2,4);///현재페이지명중 숫자만 담는 변수
        console.log('pageNum===='+pageNum,'pageNumber ='+pageNumber)//
        national = this.lge.trim();
        national = 'kr'; // 2021-05-31 계원모드 작업중 화면이름으로 national 값이 설정되는 이유로 임의로 'kr' 설정
        if(national == 'kr' || national == 'lv' || national == 'bp'){//kr, 저시력, 전맹 빼고는 나머지 국가는 만,천이 10000,1000으로 분기
            this.specialGab = this.specialGab
        }else{
            this.specialGab = '10000,1000,'+setupInfo[bankKinds][0].txt[national][2]
            this.comma = this.manchon?1:this.comma;//텍스트창에 만,천이 들어가면 콤마가 안나오지만 숫자만 입력시 금액 입력이기에 자동으로 콤마변수가 활성화 된다.
        }
        linkNum = tenObj.dxtIndex.length>1?Number(tenObj.dxtIndex.charAt(1)):0;/////////박스아이디 숫자값유무
        maxGab2 = this.pwFlag.indexOf('/')>-1?Number(String(this.maxGab).split('-')[0]):0;////패스워드유무에 '/'존재시 maxGab2값이 부여됌
        //national = 'ru'////테스트용
        let nationalWord ={
            'change':setupInfo[bankKinds][0].txt[national][0],
            'Rearrange':setupInfo[bankKinds][0].txt[national][1],
        }
        
        let fontsObj = {
                'normalColor': setupInfo[bankKinds][0].fontFamily[national][0].fonts.split(',')[0],
                'normal':setupInfo[bankKinds][0].fontFamily[national][0].fonts.split(',')[1],
                'normalClickColor':setupInfo[bankKinds][0].fontFamily[national][3].fonts,
                'otherColor':setupInfo[bankKinds][0].fontFamily[national][1].fonts.split(',')[0],
                'other':setupInfo[bankKinds][0].fontFamily[national][1].fonts.split(',')[1],
                'otherClickColor':setupInfo[bankKinds][0].fontFamily[national][4].fonts,
                'manChonColor':setupInfo[bankKinds][0].fontFamily[national][2].fonts.split(',')[0],
                'manChon':setupInfo[bankKinds][0].fontFamily[national][2].fonts.split(',')[1],
                'manChonClickColor':setupInfo[bankKinds][0].fontFamily[national][5].fonts,
                'manChonOther':setupInfo[bankKinds][0].fontFamily[national][6].fonts.split(',')[1],
        }
        if(tenClass.shuffle === 3){
            setupInfo['LV'].forEach(function(element){
                lvTopArr.push(element.top);
                lvLeftArr.push(element.left);
                lvSizeArr.push(element.size);
                lvLinkArr.push(element.link);
                lvFontColorArr.push(element.fontColor);
                lvFontsArr.push(element.fonts);
            });
        }
        let manchonP = 0, shuffleP = 0, maxArr =[], maxG = 0;
        let firstMaxGab = this.maxGab//만천키 맥스값을 위해서 저장
        //console.log("firstMaxGab="+firstMaxGab)
        $('#ten0').attr('id','ten00');
        (this.popupFlag)?myFinds.popupPlus(pageNumber):"";
        for (let k = 0; k < btnArr.length; k++) {
            if(this.confirmurl == $(btnArr[k]).attr("po")){
                confirmNumber = k;
            }
        }
        if(this.returnFlag!=1 && this.returnFlag!=3){////////////ten키 확인버튼 지정이 없을경우 디폴트는 인덱스0인 버튼임
            if(tenClass.shuffle==3){
                if(this.manchon){
                    $('#btn'+confirmNumber).css({'visibility':'visible','top':(Number(confirmLocation_LV.top)+26)+'px','left': confirmLocation_LV.left+'px'})
                }else{
                    $('#btn'+confirmNumber).css({'visibility':'visible','top':(Number(confirmLocation_LV.top)+0)+'px','left': confirmLocation_LV.left+'px'})
                }
            }else{
                console.log('this.confirmurl='+this.confirmurl,'confirmNumber='+confirmNumber)
                if(confirmNumber != ""){
                    $('#btn'+confirmNumber).css({'visibility':'visible','top':confirmLocation.top+'px','left':confirmLocation.left+'px'});
                }
            }
        }
        if(String(this.maxGab).indexOf('-')>-1){
            this.dashGab = String(this.maxGab);
            maxArr= this.dashGab.split('-')
            maxArr.forEach(element => maxG = maxG + Number(element));
            if(this.pwFlag=="1" && maxArr[0] == "6" && maxArr[1] == "7"){//////////주민번호 처리시에 사용
            //if(String(this.maxGab).indexOf('A')>-1){
                jumin = 1
                this.maxGab = this.maxGab.substr(0,this.maxGab.length-1)
                dxtIndex2 = myFinds.findObj('dxt','jumin','iname')
            }else if(this.pwFlag.indexOf('/')>-1){///////두번째 텍스트를 아스타처리 안하고 할때 사용
                jumin = 2;
                this.maxGab = this.maxGab.substr(0,this.maxGab.length-1)
                dxtIndex2 = Number(this.pwFlag.split('/')[1]);
                this.pwFlag = this.pwFlag.split('/')[0];
                console.log('this.pwFlag====='+this.pwFlag,'dxtIndex2======='+dxtIndex2)
            }
        }else{
            if(this.maxGab.indexOf('*')>-1){
                asterPosition = this.maxGab.length-1 == this.maxGab.indexOf('*')?'back':'front';
                if(asterPosition == 'front'){
                    asterNum = Number(this.maxGab.split('*')[0])
                    this.maxGab = asterNum+Number(this.maxGab.split('*')[1].substring(0,this.maxGab.split('*')[1].length-1))
                }else if(asterPosition == 'back'){
                    asterNum = Number(this.maxGab.split('N')[1].substring(0,this.maxGab.split('N')[1].length-1))
                    this.maxGab=Number(this.maxGab.split('N')[0])+asterNum
                }
                console.log('asterPosition===='+asterPosition,this.maxGab,asterNum, this.comma)
            }
            this.dashGab = "";
        }
        this.maxGab = this.dashGab != ""?maxG:Number(this.maxGab);
        if(this.manchon && tenClass.shuffle!=3){
            let boxLocation = this.shuffle===1?setupInfo[bankKinds][0].manChonBox[1].top+'/'+setupInfo[bankKinds][0].manChonBox[1].left+'/'+setupInfo[bankKinds][0].manChonBox[1].size:setupInfo[bankKinds][0].manChonBox[0].top+'/'+setupInfo[bankKinds][0].manChonBox[0].left+'/'+setupInfo[bankKinds][0].manChonBox[0].size;
            manchonP = 6
            myFinds.imgMake('box/box',fontsObj.manChonColor,fontsObj.manChon,'img/1','manchonbox.png^',boxLocation,"","bgx"+linkNum);
            myFinds.imgMake('ten/ten',fontsObj.manChonColor,fontsObj.manChon,'btn/15~18','ten5_'+bankKinds+'.png^'+this.specialGab,manChonTopArr[0]+'/'+manChonLeftArr[0]+'/'+manChonSizeArr[0],tenLink,setupInfo[bankKinds][0].manChonBox[0].linkG);   
            if(tenObj.lge == 'kr' || tenObj.lge == 'lv' || tenObj.lge == 'bp'){////나라별 서체 맞추기위한
            }else{
                $('#textten15, #textten16').css({'font':fontsObj.manChonOther})
                $('#textten15').text('10,000')
                $('#textten16').text('1,000')
                this.wonNumber = 17
            }
        }
        if(tenClass.shuffle==1){
            shuffleP = 3;
            myFinds.imgMake('ten/ten',fontsObj.normalColor,fontsObj.normal,'btn/0~4','ten1_'+bankKinds+'.png^1,2,3,4',shuffleTopArr[0]+'/'+shuffleLeftArr[0]+'/'+shuffleSizeArr[0],tenLink,"bgx"+linkNum);
            myFinds.imgMake('ten/ten',fontsObj.normalColor,fontsObj.normal,'btn/4~8','ten1_'+bankKinds+'.png^5,6,7,8',shuffleTopArr[1]+'/'+shuffleLeftArr[1]+'/'+shuffleSizeArr[1],tenLink,"bgx"+linkNum);
            myFinds.imgMake('ten/ten',fontsObj.normalColor,fontsObj.normal,'btn/8~12','ten1_'+bankKinds+'.png|ten1_'+bankKinds+'.png|ten6_'+bankKinds+'.png|ten6_'+bankKinds+'.png^9,0,,',shuffleTopArr[2]+'/'+shuffleLeftArr[2]+'/'+shuffleSizeArr[2],tenLink,"bgx"+linkNum);
            myFinds.imgMake('ten/ten',fontsObj.normalColor,fontsObj.normal,'btn/12~14','ten3_'+bankKinds+'.png|ten5_'+bankKinds+'.png^,'+nationalWord.change,shuffleTopArr[3]+'/'+shuffleLeftArr[3]+'/'+shuffleSizeArr[3],tenLink,"bgx"+linkNum);
            myFinds.imgMake('ten/ten',fontsObj.normalColor,fontsObj.normal,'btn/14~15','shuffle_'+bankKinds+'.png^'+nationalWord.Rearrange,shuffleTopArr[4]+'/'+shuffleLeftArr[4]+'/'+shuffleSizeArr[4],tenLink,"bgx"+linkNum);
            $('#ten13 > div > div, #ten14 > div > div').css({'color':fontsObj.otherColor,'font':fontsObj.other});
        }else if(tenClass.shuffle === 3){
            let manchonDif = 0, imgName = "";
            if(this.manchon){
                manchonP = 6, manchonDif = 16 , imgName ="S"//만,천,원 버튼추가로 이미지 바꿈
                lvTopArr[1] = (Number(lvTopArr[1].split("-")[0])-(manchonDif*1))+"-"+lvTopArr[1].split("-")[1];
                lvTopArr[2] = (Number(lvTopArr[2].split("-")[0])-(manchonDif*2))+"-"+lvTopArr[2].split("-")[1];
                lvTopArr[3] = (Number(lvTopArr[3].split("-")[0])-(manchonDif*3))+"-"+lvTopArr[3].split("-")[1];
                lvTopArr[4] = (Number(lvTopArr[4].split("-")[0])-(manchonDif*4))+"-"+lvTopArr[4].split("-")[1];
                lvSizeArr[0] = lvSizeArr[0].split("-")[0]+"-"+(Number(lvSizeArr[0].split("-")[1])-14);
                lvSizeArr[1] = lvSizeArr[1].split("-")[0]+"-"+(Number(lvSizeArr[1].split("-")[1])-14);
                lvSizeArr[2] = lvSizeArr[2].split("-")[0]+"-"+(Number(lvSizeArr[2].split("-")[1])-14);
                lvSizeArr[3] = lvSizeArr[3].split("-")[0]+"-"+(Number(lvSizeArr[3].split("-")[1])-14);
                lvSizeArr[4] = lvSizeArr[4].split("-")[0]+"-"+(Number(lvSizeArr[4].split("-")[1])-14);
                myFinds.imgMake('ten/ten',lvFontColorArr[4],lvFontsArr[4],'btn/15~18','lowTen_blue_btnS'+imgName+'.png^'+this.specialGab,lvTopArr[4]+'/'+lvLeftArr[4]+'/'+lvSizeArr[4],tenLink,lvLinkArr[4]);
            }
            myFinds.imgMake('ten/ten',lvFontColorArr[0],lvFontsArr[0],'btn/0~3','lowTen_blue_btnS'+imgName+'.png^1,2,3',lvTopArr[0]+'/'+lvLeftArr[0]+'/'+lvSizeArr[0],tenLink,lvLinkArr[0]);
            myFinds.imgMake('ten/ten',lvFontColorArr[1],lvFontsArr[1],'btn/3~6','lowTen_blue_btnS'+imgName+'.png^4,5,6',lvTopArr[1]+'/'+lvLeftArr[1]+'/'+lvSizeArr[1],tenLink,lvLinkArr[1]);
            myFinds.imgMake('ten/ten',lvFontColorArr[2],lvFontsArr[2],'btn/6~9','lowTen_blue_btnS'+imgName+'.png^7,8,9',lvTopArr[2]+'/'+lvLeftArr[2]+'/'+lvSizeArr[2],tenLink,lvLinkArr[2]);
            myFinds.imgMake('ten/ten',lvFontColorArr[3],lvFontsArr[3],'btn/9~12','lowTen_arrow_btnS'+imgName+'.png|lowTen_blue_btnS'+imgName+'.png|lowTen_yellow_btnS'+imgName+'.png^,0,'+nationalWord.change,lvTopArr[3]+'/'+lvLeftArr[3]+'/'+lvSizeArr[3],tenLink,lvLinkArr[3]);
            $('.ten > div > div').css({'padding-top':'8px'});
            $('#ten10 > div > div').css({'color':lvFontColorArr[2],'font':lvFontsArr[2]});
        }else{
            myFinds.imgMake('ten/ten',fontsObj.normalColor,fontsObj.normal,'btn/0~3','ten1_'+bankKinds+'.png^1,2,3',locationTopArr[0]+'/'+locationLeftArr[0]+'/'+locationSizeArr[0],tenLink,"bgx"+linkNum);
            myFinds.imgMake('ten/ten',fontsObj.normalColor,fontsObj.normal,'btn/3~6','ten1_'+bankKinds+'.png^4,5,6',locationTopArr[1]+'/'+locationLeftArr[1]+'/'+locationSizeArr[1],tenLink,"bgx"+linkNum);
            myFinds.imgMake('ten/ten',fontsObj.normalColor,fontsObj.normal,'btn/6~9','ten1_'+bankKinds+'.png^7,8,9',locationTopArr[2]+'/'+locationLeftArr[2]+'/'+locationSizeArr[2],tenLink,"bgx"+linkNum);
            myFinds.imgMake('ten/ten',fontsObj.normalColor,fontsObj.normal,'btn/9~12','ten3_'+bankKinds+'.png|ten1_'+bankKinds+'.png|ten5_'+bankKinds+'.png^,0,'+nationalWord.change,locationTopArr[3]+'/'+locationLeftArr[3]+'/'+locationSizeArr[3],tenLink,"bgx"+linkNum);
            $('#ten11 > div > div').css({'color':fontsObj.otherColor,'font':fontsObj.other});
        }
        //배열 초기화
        locationTopArr = [],locationLeftArr = [], locationSizeArr = [], shuffleTopArr = [], shuffleLeftArr = [], shuffleSizeArr = [], manChonTopArr = [], manChonLeftArr = [], manChonSizeArr = [], fontGab = ''
        lvTopArr = [],lvLeftArr = [], lvSizeArr = [], lvLinkArr = [], lvFontColorArr = [], lvFontsArr = [];
        for(let i =0 ; i<12+manchonP+shuffleP ; i++){
            var tenOb = new Object();
            if(tenClass.shuffle===1){
                tenOb.dimd = (i===10 || i===11 || i===12 || i===13)?"1":"0";
                tenOb.del = (i===12)?"1":"0";
                tenOb.clr = (i===13)?"1":"0";
            }else{
                tenOb.dimd = (i===9 || i===11)?"1":"0";
                tenOb.del = (i===9)?"1":"0";
                tenOb.clr = (i===11)?"1":"0";
            }
            switch(i){
                case 9:
                    tenOb.tendata = tenClass.shuffle===1?"0":String(i+1);
                    break;
                case 10:
                    tenOb.tendata = tenClass.shuffle===1?"":"0";
                    //tenOb.dimd = tenClass.shuffle===1?"1":"0";
                    break;
                case 11:
                    tenOb.tendata = tenClass.shuffle===1?"":String(i+1);
                    //tenOb.dimd = tenClass.shuffle===1?"1":"0";
                    break;
                case 14:
                    tenOb.tendata = "shuffle";
                    break;
                case 15:
                    tenOb.tendata = this.specialGab.length===0?"만":this.specialGab.split(",")[0];
                    break;
                case 16:
                    tenOb.tendata = this.specialGab.length===0?"천":this.specialGab.split(",")[1];
                    break;
                case 17:
                    tenOb.tendata = this.specialGab.length===0?"원":this.specialGab.split(",")[2];
                    break;
                default:
                    tenOb.tendata = (i+1);
                    tenOb.tendata = String(tenOb.tendata);
                    break;
            }
            tenArr.push(tenOb);
        }
        ////////////////////////////////////////특수페이지 체크///////////////////////////////////
        
        // 모듈 로딩완료 설정, 2021.05.19 (cyg)
        // setTrigger() 를 삭제하고 evtCheck(msgArr.length,'') 를 직접 호출하는 방식으로 수정하세요
        // evtCheck(msgL,compare) 에서 myFinds.stopInterval(); 은 필요 없는것 같습니다.
        //myFinds.setTrigger(evtCheck,msgArr.length,'');
        evtCheck(cmArr.length,'');
        function evtCheck(msgL,compare){
            //if($('#msg'+(msgArr.length-1))[0]!=undefined){
                    triggerF = true;
                //if(this.korIndex != ""){
                    //console.log('msgObj.msgArr.length=='+msgObj.msgArr.length);
                    let tenkeyF = "";
                    /*cmArr.forEach(function(element,index){
                        tenkeyF = $(cmArr[index].xmlObj).attr("isTenkey");
                        if(isTenkey=="1"){spArrNumber=cmArr[index].index}////////특수화면 인덱스값
                        /////spArrNumber = isTenkey=="1"?cmArr[index].index:
                    }*/            
                    for(var i=0;i<msgL;i++){
                        let pngInfomation = $(cmArr[i].xmlObj).attr("urlpath");
                        spName = pngInfomation.split('_')[0]+'_';
                        tenkeyF = $(cmArr[i].xmlObj).attr("isTenkey");
                        if(tenkeyF=="1" && tenkeyF!=undefined){
                            spArrNumber=cmArr[i].index;
                        }////////특수화면 인덱스값
                        //console.log('pngInfomation ============================'+pngInfomation);
                        if(getPrefixLength(pngInfomation) && tenkeyF == "1"){
                            //console.log(`**** msg.js - msgObj.msgArr[${i}] = [${msgObj.msgArr[i]}], msgObj.classArr[${i}] = [${msgObj.classArr[i]}]`);
                            //console.log('pngInfomation ============================'+pngInfomation,i,$(msgArr[i]).attr("iname"),msgArr.length,$(msgArr[i]).attr("class"));
                            spFlag = tenClass.connectF?true:false;//////////연동중 서로 값에 링크가 필요없을시에
                            console.log('i='+i,'spArrNumber=== '+spArrNumber,'spFlag====='+spFlag,tenClass.connectF,pngInfomation,cmArr[spArrNumber].screenNumber)
                            if(setupInfo[bankKinds][0].specialPage.indexOf(cmArr[spArrNumber].screenNumber)>-1){///초기에 세팅해야 할때
                                console.log('최종연결','spName==='+spName);
                                switch(pngInfomation.split('.')[0]){
                                    case spName+'1106':   //하나은행1106
                                        paramG = $(cmArr[spArrNumber].xmlObj).attr("param").split('|')[3];
                                        console.log('paramG=='+paramG,typeof paramG)
                                        if(paramG != "0"){
                                            cmArr[spArrNumber].jsObj.tenCall('1');//연결된 js안에 함수tenCall
                                            tenClass.cal(paramG,tenClass.dxtIndex)
                                        }else if(paramG == "0"){
                                            cmArr[spArrNumber].jsObj.tenCall('2');//연결된 js안에 함수tenCall
                                            //cmArr[spArrNumber].jsObj.tenCall('2');//연결된 js안에 함수tenCall
                                            tenClass.cal('clear',tenClass.dxtIndex)
                                        }
                                    break;
                                    case spName+'5007': 
                                    break;
                                    default://추후업데이트할수도 있는구간  
                                    break;
                                }
                            }
                        }
                    }
                //}
                //myFinds.stopInterval();
            //}else{
                //myFinds.stopInterval();
            //}
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        console.log('this.allDimdF===='+this.allDimdF)
        if(this.allDimdF==1){
            tenClass.cal('allBtnDimed',tenClass.dxtIndex)
            this.confirmDimd(0); 
        }else{
            //console.log('msgObj.pageNumberArr=='+msgObj.pageNumberArr)
            /*if(cmArr[spArrNumber].screenNumber != undefined && setupInfo[bankKinds][0].specialPage.indexOf(cmArr[spArrNumber].screenNumber)>-1){
                tenClass.cal('clear',tenClass.dxtIndex)
            }else{
                tenClass.cal('clear',tenClass.dxtIndex)
                //(tenObj.dxtIndex.length == 1)?tenClass.cal('clear',tenClass.dxtIndex):"";
                this.confirmDimd(1); 
            }*/
            console.log("spArrNumber======================================"+spArrNumber)
            if(spArrNumber==-1){
                tenClass.cal('clear',tenClass.dxtIndex)
                //(tenObj.dxtIndex.length == 1)?tenClass.cal('clear',tenClass.dxtIndex):"";
                this.confirmDimd(1); 
            }else{
               paramG == ""?tenClass.cal('clear',tenClass.dxtIndex):"";
            }
        }
        let shuffleF = tenClass.shuffle===1?this.keyDraw():"";
    };
    
    ////////////////텐키 누르시이벤트 작동시 실행되는 함수///////////////////////////////
    function tenLink(){
        let mymy = this, btnNum = Number(myFinds.numberFlag(mymy.id));
        if(tenClass.shuffle===1){
            tenArr[btnNum].tendata  = (tenArr[btnNum].tendata=="13")?'back':(tenArr[btnNum].tendata=="14")?"clear":tenArr[btnNum].tendata;
        }else{
            tenArr[btnNum].tendata  = (tenArr[btnNum].tendata=="10")?'back':(tenArr[btnNum].tendata=="12")?"clear":tenArr[btnNum].tendata;
        }
        if(acceessableCount != 1){return true};
        if(event.type=="touchstart"){mFlag=true};
        if(event.type=="mousedown" && mFlag){return true};
        if(!eventFlag && tenArr[btnNum].dimd == "0"){  
            acceessableCount = 1    
            if(btnNum == 9){
                tenClass.shuffle===1?myFinds.tenClickOver(mymy,'#FFF','ten2_'+bankKinds,0):tenClass.shuffle===3?myFinds.btnClick(mymy):myFinds.tenClickOver(mymy,'#FFF','ten4_'+bankKinds,0);
            }else if(btnNum == 12){    
                tenClass.shuffle===1?myFinds.tenClickOver(mymy,'#FFF','ten4_'+bankKinds,0):tenClass.shuffle===3?myFinds.btnClick(mymy):myFinds.tenClickOver(mymy,'#FFF','ten2_'+bankKinds,0);
            }else if(btnNum == 14){    
                tenClass.shuffle===1?myFinds.tenClickOver(mymy,'#FFF','shuffle2_'+bankKinds,0):tenClass.shuffle===3?myFinds.btnClick(mymy):myFinds.tenClickOver(mymy,'#FFF','ten2_'+bankKinds,0);
            }else{
                tenClass.shuffle===1?btnNum == 10 || btnNum == 11?myFinds.tenClickOver(mymy,'#FFF','ten6_'+bankKinds,0,"soundNo"):myFinds.tenClickOver(mymy,'#FFF','ten2_'+bankKinds,0):tenClass.shuffle===3?myFinds.btnClick(mymy):myFinds.tenClickOver(mymy,'#FFF','ten2_'+bankKinds,0);
                
            }
            if(tenArr[btnNum].tendata!="")tenClass.cal(tenArr[btnNum].tendata,tenClass.dxtIndex);
        }
    }
    
    
    /////재배열시 버튼위치세팅 함수
    this.keyDraw=function() {
        let randomNum1 = Math.floor(Math.random()*12)+1;
        let randomNum2 = Math.floor(Math.random()*12)+1;
        while(randomNum1 == randomNum2){
            randomNum2 = Math.floor(Math.random()*12)+1;
        }

        for(var i = 0, j = 0; i < 12; i++){
            var cssJson = {
                'left': arrPosition[i][0],
                'top': arrPosition[i][1]
            }
            if(i == randomNum1-1 ) {
                $('#ten10').css(cssJson);
            } else if( i== randomNum2-1) {
                $('#ten11').css(cssJson);
            } else {
                $('#ten'+j).css(cssJson);
                j++;
            }
        }
    }
    this.commaAndNormal = function(dxtIndex){
        if(this.maxGabIndex != ""){
            let compareNum  = Number(myComma.mComma($("#dxt" + this.maxGabIndex).text()));
            if(Number(this.tmpGab)>Number(compareNum)){
                this.cal("clear",this.dxtIndex)
                return
            }
        }
        if(this.korIndex != "" && this.connectF){////////다른 JS파일과 연동일때쓰는걸로 금액한글화 상관없음
            $("#dxt" + this.korIndex).text("("+myFinds.korChange(String(10000*Number(this.tmpGab)))+")")
        }
        if(this.comma){
            let numberFlag = myFinds.numberFlag(this.tmpGab).length != this.tmpGab.length?1:0;
            //console.log('numberFlag===='+numberFlag)
            if(numberFlag){
                $("#dxt" + dxtIndex).text(this.tmpGab);
            }else{
                $("#dxt" + dxtIndex).text(myComma.pComma(this.tmpGab));
            }
        }else{
            if(asterNum != 0){
                let changeGab = ""
                for(var i = 0 ; i<this.tmpGab.length ; i++){
                    if(asterPosition == 'front'){
                        if(i<asterNum){
                            changeGab = changeGab+"∗"//this.tmpGab.substr(i,1)
                            $("#dxt" + dxtIndex).text(changeGab);
                        }else{
                            $("#dxt" + dxtIndex).text(changeGab+this.tmpGab.slice(asterNum,this.tmpGab.length));
                        }  
                    }else if(asterPosition == 'back'){
                        if(i<this.maxGab - asterNum){
                            $("#dxt" + dxtIndex).text(this.tmpGab);
                        }else{
                            changeGab = changeGab+"∗"
                            $("#dxt" + dxtIndex).text(this.tmpGab.slice(0,this.maxGab - asterNum)+changeGab);
                        } 
                    }
                }
            }else{
                $("#dxt" + dxtIndex).text(this.tmpGab);
            }
        }
    }
    this.maxGabCal = function(){
        //console.log(typeof this.maxGab,typeof this.firstMaxGab)
        if(this.tmpGab.indexOf('천')>0 || this.tmpGab.indexOf('만')>0){
            return this.maxGab+1
        }else if(this.tmpGab.indexOf('천')<0 || this.tmpGab.indexOf('만')<0){ 
            return Number(this.firstMaxGab)
        }
    }
    this.cal = function (gab, dxtIndex,outNum) {/////////outNum매개변수는 다른js에서 cal함수를 호출유무에 관한것으로 없는것은 텐키에서 호출, 있는것은 다른js파일에서 호출 
        let outFlag = outNum, pageFlag = spName+pageNum.substr(2,4)
        this.maxGab = this.manchon && tenObj.lge == 'kr'?this.maxGabCal():this.maxGab;
        switch (gab) {
            case "shuffle":
                this.keyDraw();
            break;
            case "back": //지우기 버튼으로 들어오면
                //console.log('this.tmpGab===='+this.tmpGab,'aster======='+aster)
                this.tmpGab = this.tmpGab.slice(0, this.tmpGab.length - 1);
                aster = aster.slice(0, aster.length - 1);
                if(this.dashGab == ""){
                    if (this.pwFlag=="1"){
                        $("#dxt" + dxtIndex).text(aster);
                    }else{
                        this.commaAndNormal(dxtIndex);
                    }
                }else{
                    if(jumin==1){
                        if(this.tmpGab.length<6){
                            $("#dxt" + dxtIndex).text(this.tmpGab);
                        }else{
                            $("#dxt" + dxtIndex2).text(aster);
                        }
                    }else if(jumin==2){/////////텍스트창 두개일 경우
                        if(this.tmpGab.length<maxGab2){
                            txtNum = 0
                            $("#dxt" + dxtIndex).text(this.tmpGab);
                        }else{
                            txtNum = 1
                            $("#dxt" + dxtIndex2).text(aster);
                        }
                    }else{
                        $("#dxt" + dxtIndex).text(myFinds.dashF(this.tmpGab,this.dashGab));
                    }
                }
                for (var i = 0; i < tenArr.length; i++) {
                    $("#ten" + i).css('-webkit-filter', 'grayscale(0%) opacity(100%)');
                    tenArr[i].dimd = "0";
                }
                if(this.manchon){
                    this.unitButton_Disabled()
                }
                if (this.tmpGab == "") { //입력된 숫자없을경우 일단 지우기와 정정버튼 딤드시키기
                    if(this.korIndex != "" && this.connectF){
                        $("#dxt" + this.korIndex).text("");
                    } 
                    for (i = 0; i < tenArr.length; i++) {
                        if (tenArr[i].del == "1" || tenArr[i].clr == "1") {
                            $("#ten" + i).css('-webkit-filter', 'grayscale(100%) opacity(30%)')
                            tenArr[i].dimd = "1";
                        }
                        if (tenArr[i].tendata == "0" && this.zero == 0) { //'0'입력을 받지 않을경우){
                            $("#ten" + i).css('-webkit-filter', 'grayscale(100%) opacity(30%)')
                            tenArr[i].dimd = "1";
                        }
                    }
                }
                break;
            case "clear": //정정 버튼으로 들어오면
                $("#dxt" + dxtIndex).text("");
                if(jumin==1 || jumin==2){
                    $("#dxt" + dxtIndex2).text("");
                }
                if(this.korIndex != ""  && this.connectF){///다른 js 링크때문에1106
                    $("#dxt" + this.korIndex).text("");
                } 
                aster = "";
                this.tmpGab = ""
                this.allDimd("0");
                if(this.manchon){
                    this.unitButton_Disabled();
                    this.tenE("zero",true)
                    this.tenE("man",true)
                    this.tenE("chon",true)
                    this.tenE("del",true)
                    this.tenE("clr",true)
                }
                txtNum = 0
                if(paramG == "0"){
                    $("#dxt" + dxtIndex).text("0");
                    paramG =""
                    return
                }
                break;
            case "allBtnDimed": 
                for (var i = 0; i < tenArr.length; i++) {
                    $("#ten" + i).css('-webkit-filter', 'grayscale(100%) opacity(30%)');
                    tenArr[i].dimd = "1";
                }
                txtNum = 0
                break;
            default:
                if((this.manchon && gab =="원") || this.manchon && gab == setupInfo[bankKinds][0].txt[national][2]){
                    eventFlag = true;
                    ws_send('=[' + this.retValue() + ']');
                    return
                }
                for (var i = 0; i < tenArr.length; i++) { //숫자들어오면 일단 지우기와 정정 딤드풀기
                    if (tenArr[i].del == "1" || tenArr[i].clr == "1") {
                        $("#ten" + i).css('-webkit-filter', 'grayscale(0%) opacity(100%)');
                        tenArr[i].dimd = "0";

                    }
                    if (tenArr[i].tendata == "0" && this.zero == 0){ //'0'입력을 받지 않을경우){
                        $("#ten" + i).css('-webkit-filter', 'grayscale(0%) opacity(100%)');
                        tenArr[i].dimd = "0";
                    }
                }
                ///////////////////////////////////////경고창 유무///////////////////////////////////////////////////////
                if(this.popupFlag){
                    switch(pageFlag){
                        case spName+'2102': 
                            if($("#dxt" + dxtIndex).text()!="" && $("#dxt" + dxtIndex2).text()!=""){
                                let popFlag = this.compareF(this.tmpGab+gab)
                                if(popFlag){
                                    myFinds.popupShow(1,pageNumber)
                                    return
                                }
                            }
                            break;
                        case spName+'2057': 
                            if(Number(this.tmpGab+gab)>Number($("#dxt7").text())-Number($("#dxt1").text())){
                                myFinds.popupShow(1,pageNumber)
                            }
                        default:  ////LV2057  
                            break;
                    }
                }
                //////////////////////////////////////////////////////////////////////////////////////////////////////
                this.tmpGab = gab == 10000 || gab == 1000?String(this.tmpGab*gab):this.tmpGab + gab;
                //this.tmpGab + gab;//gab == 10000 || gab == 1000?this.tmpGab*gab:this.tmpGab + gab;
                //console.log('maxGab2='+maxGab2,typeof maxGab2,'dxtIndex='+dxtIndex,'dxtIndex2='+dxtIndex2,'l=='+this.tmpGab.length)
                if(this.dashGab == ""){
                    aster = aster + "*";
                    if (this.pwFlag=="1"){
                        $("#dxt" + dxtIndex).text(aster);
                    }else{
                        this.commaAndNormal(dxtIndex); 
                    }
                }else{
                    if(jumin==1){
                        if(this.tmpGab.length<=6){
                            $("#dxt" + dxtIndex).text(this.tmpGab);
                        }else{
                            aster = aster + "*";
                            $("#dxt" + dxtIndex2).text(aster);
                        }
                    }else if(jumin==2){/////////텍스트창 두개일 경우
                        if(this.tmpGab.length<=maxGab2){
                            $("#dxt" + dxtIndex).text(this.tmpGab);
                        }else{
                            //aster = aster + "*";
                            aster = aster  + gab;
                            $("#dxt" + dxtIndex2).text(aster);
                        }
                    }else{
                        $("#dxt" + dxtIndex).text(myFinds.dashF(this.tmpGab,this.dashGab));
                    }
                }
                if((this.manchon && tenObj.lge == 'kr') || this.manchon && tenObj.lge == 'lv'){
                    this.unitButton_Disabled()
                }
                break;
        }
        if (this.tmpGab.length >= this.maxGab) { //리턴값 날아가면 다 딤드 // 4자리 입력하면 ws.send
            this.allDimd("1");
            if(Number(this.returnFlag)==1){
                this.autoReturn();
            }else{
                //ws_send('k[10]');
                this.confirmDimd(0);
            }
        }else if(this.tmpGab.length < this.maxGab && this.tmpGab.length >= this.minGab){
            this.confirmDimd(0);
            //ws_send('k[10]');
        }else{
            this.confirmDimd(1)
        }
        if(spFlag && outFlag == undefined){
            if(gab=="clear"){
                switch(pageFlag){
                    case spName+'1106':  
                        cmArr[spArrNumber].jsObj.tenCall('2');
                        break;
                    case spName+'5007':      
                        if(cmArr[spArrNumber].jsObj.min!=undefined){
                            cmArr[spArrNumber].jsObj.tenCall(this.minGab);
                        }
                        break;
                    case spName+'2057':    
                    default:
                        cmArr[spArrNumber].jsObj.tenCall(this.tmpGab);
                        break;
                }
            }else{
                if(this.tmpGab.length==0){
                    switch(pageFlag){
                        case spName+'1106':
                            cmArr[spArrNumber].jsObj.tenCall('2');
                            break;
                        case spName+'2057'://저시력용
                            cmArr[spArrNumber].jsObj.tenCall(this.tmpGab);
                            break;
                        case spName+'5007': 
                            if(cmArr[spArrNumber].jsObj.min!=undefined){
                                cmArr[spArrNumber].jsObj.tenCall(this.minGab);
                            }
                            break;
                        default:
                            break;
                    }
                }else{
                    switch(pageFlag){
                        case spName+'1106':   
                            cmArr[spArrNumber].jsObj.tenCall('1');
                            break;
                        case spName+'5007':
                            if(cmArr[spArrNumber].jsObj.min!=undefined){
                                cmArr[spArrNumber].jsObj.tenCall(this.minGab);
                            }
                            break;
                        case spName+'2057':
                        default:
                            cmArr[spArrNumber].jsObj.tenCall(this.tmpGab);
                            break;
                    }
                }
            }
        }
        switch(pageFlag){////특별히 특정페이지에 기능추가시에
            case spName+'2102':      
                this.caseDimd($("#dxt" + txtNum).text().length);
                txtNum = $("#dxt" + dxtIndex).text().length<maxGab2?0:1;
            break;
            default:
            break;
        }
        if(gab=="allBtnDimed"){
            for (var i = 0; i < tenArr.length; i++) {
                $("#ten" + i).css('-webkit-filter', 'grayscale(100%) opacity(30%)');
                tenArr[i].dimd = "1";
            }
            this.confirmDimd(0)///날짜조회때 날짜 지정버튼 누를시(하나은행KR2102 참조)
        }
    }
    /////////////////////////////////////////////////////////////////////팝업창비교//////////////////////////////////////////////////////////////////
    this.compareF = function(txtGab){
        let text2 = txtGab.slice(8,txtGab.length)
        let text1 = $("#dxt" + this.dxtIndex).text()
        console.log('t2===='+Number(text2),'t1===='+Number(text1.slice(0,text2.length)))
        if(Number(text2)<Number(text1.slice(0,text2.length))){
            return 1;
        }else{
            return 0;
        }
    }
    this.autoReturn = function(){
        eventFlag = true;
        $("#ten9").css('-webkit-filter', 'grayscale(100%) opacity(30%)');
        tenArr[9].dimd = "1";
        $("#ten11").css('-webkit-filter', 'grayscale(100%) opacity(30%)');
        tenArr[11].dimd = "1";
        this.confirmDimd(1);
        if(this.manchon){
            //this.shuffle==1?ws_send('=[' + this.retValue() + ']'):ws_send('=[' + this.tmpGab + ']');
            ws_send('=[' + this.retValue() + ']');
        }else{
            ws_send('=[' + this.tmpGab + ']');
        }
        
    }
    this.allDimd = function (gab) {
        for (var i = 0; i < tenArr.length; i++) {
            if(tenArr[i].del == "1" || tenArr[i].clr == "1"){
                if (gab == "0") { //정정시
                    $("#ten" + i).css('-webkit-filter', 'grayscale(100%) opacity(30%)');
                    tenArr[i].dimd = "1";
                } else {
                    $("#ten" + i).css('-webkit-filter', 'grayscale(0%) opacity(100%)');
                    tenArr[i].dimd = "0";
                }
            }else if($(tenArr[i]).attr("tendata") == "0" && this.zero == 0){ //'0'입력을 받지 않을경우)
                $("#ten" + i).css('-webkit-filter', 'grayscale(100%) opacity(30%)');
                tenArr[i].dimd = "1";
            }else{
                if (gab == "0") { //정정시
                    $("#ten" + i).css('-webkit-filter', 'grayscale(0%) opacity(100%)');
                } else { //모두입력시
                    $("#ten" + i).css('-webkit-filter', 'grayscale(100%) opacity(30%)');
                }
                if(this.shuffle == 1){
                    if(i ==10 || i ==11){
                        tenArr[i].dimd = 1;
                    }else{
                        tenArr[i].dimd = gab;
                    }
                }else{
                   tenArr[i].dimd = gab;
                }
            }
            if($(tenArr[i]).attr("tendata") == "만" || $(tenArr[i]).attr("tendata") == "천" || $(tenArr[i]).attr("tendata") == "원") {
                this.wonNumber = $(tenArr[i]).attr("tendata") == "원"?i:0;
                this.manNumber = $(tenArr[i]).attr("tendata") == "만"?i:0;
                this.chonNumber = $(tenArr[i]).attr("tendata") == "천"?i:0;
                if (gab == "1") { //정정시
                    $("#ten" + i).css('-webkit-filter', 'grayscale(100%) opacity(30%)');
                    tenArr[i].dimd = "1";
                } else {
                    $("#ten" + i).css('-webkit-filter', 'grayscale(0%) opacity(100%)')
                    tenArr[i].dimd = "0";
                }
            }
        }
    }
    this.tendimd = function(num){
       if(tenArr[num].dimd =="0"){
           $("#ten" + num).css('-webkit-filter', 'grayscale(0%) opacity(100%)')
       }else{
           $("#ten" + num).css('-webkit-filter', 'grayscale(100%) opacity(30%)')
       }        
    }
    this.tendimded = function(num,gab){
        if(gab=='1'){
            $("#ten" + num).css('-webkit-filter', 'grayscale(100%) opacity(30%)')
            tenArr[num].dimd = '1';
            //console.log('tenArr[i].dimd=='+tenArr[i].dimd)
        }else if(gab=='0'){
            $("#ten" + num).css('-webkit-filter', 'grayscale(0%) opacity(100%)')
            tenArr[num].dimd = '0';
        }      
    }
    ///////////////////////////////////////날짜딤드 시작 추가
    let nowDate=new Date();
    this.caseDimd = function(gab){
        let textG = $("#dxt" + txtNum).text();
        for (var i = 0; i < 9; i++) {
            //$("#ten" + i).css('-webkit-filter', 'grayscale(100%) opacity(30%)');
            //tenArr[i].dimd = 1
            this.tendimded(i,"1")
        }
        this.tendimded(10,"1")
        //console.log('gab========='+gab)
        switch(gab){
            case 0:
                this.tendimded(0,"0")
                this.tendimded(1,"0")
            break;
            case 1:
                if(textG=="2"){				
                    this.tendimded(10,"0")	
                }else{
                    this.tendimded(8,"0")
                }
            break;
            case 2:
                if(textG=="20"){				
                    this.tendimded(10,"0")	
                    this.tendimded(0,"0")
                    if(nowDate.getFullYear().toString().substr(0,3)=="202"){ //2020이후일 경우
                        this.tendimded(1,"0")		
                    }
                }else{
                    this.tendimded(8,"0")	
                }
            break;
            case 3:
                    for(i=0;i<9;i++){
                        this.tendimded(i,"0")		
                    }
                    this.tendimded(10,"0")

            break;
            case 4:						
                    this.tendimded(10,"0")	
                    this.tendimded(0,"0")	

            break;
            case 5:		//월단위 일자리
                if(textG.substr(4,1)=="1"){
                    this.tendimded(10,"0")	
                    this.tendimded(0,"0")
                    this.tendimded(1,"0")
                }else{
                    for(i=0;i<9;i++){
                        this.tendimded(i,"0")		
                    }
                }
            break;
            case 6:		//일단위 십자리
                this.tendimded(10,"0")	
                this.tendimded(0,"0")
                this.tendimded(1,"0")	
                this.tendimded(2,"0")

            break;
            case 7:		//일단위 십자리
                if(textG.substr(6,1)=="3"){
                    this.tendimded(10,"0")	
                    this.tendimded(0,"0")				
                }else {
                    for(i=0;i<9;i++){
                        this.tendimded(i,"0")		
                    }
                    if(textG.substr(6,1)!="0"){
                        this.tendimded(10,"0")	
                    }
                }		
            break;
            case 8:
                if(txtNum==0){
                    this.caseDimd(0)
                }
            break;
            default:
            break;
        }
        this.tendimded(9,"0")
        this.tendimded(11,"0")
        ////////경고창 띄우는 로직 앞에서 분류했음.
        /*if(textG!="" && Number(textG1.substr(0,gab))>Number(textG)){
            mymc.myMsg.ArrMc[2].tmovie.caution_mc.gotoAndPlay(2)
            cal("back")
        }*/

    }
    this.confirmDimd = function (boo) { //숫자들 딤드시키기
        //console.log('tenObj.outReturnG='+tenObj.outReturnG)
        //console.log('spFlag ='+spFlag)
        console.log('wonNumber='+this.wonNumber,'manNumber='+this.manNumber,'chonNumber='+this.chonNumber)
        if (this.confirmurl == $(btnArr[confirmNumber]).attr("po")) {
            btnArr[confirmNumber].dimd = String(boo)               
            if (boo) {
                $("#btn" + confirmNumber).css('-webkit-filter', 'grayscale(100%) opacity(30%)');
                //eventFlag = true;
            }else{
                $("#btn" + confirmNumber).css('-webkit-filter', 'grayscale(0%) opacity(100%)');
            }
            if(this.manchon && this.specialGab.indexOf('만,천,원')>-1 || this.manchon && this.specialGab.indexOf('10000,1000')>-1){
                if (boo) {
                    $("#ten" + this.wonNumber).css('-webkit-filter', 'grayscale(100%) opacity(30%)');
                }else{
                    $("#ten" + this.wonNumber).css('-webkit-filter', 'grayscale(0%) opacity(100%)');  
                }
                tenArr[this.wonNumber].dimd = String(boo);
                //this.shuffle==1?btnArr[confirmNumber].breturn = "=[" + this.retValue() + "]":btnArr[confirmNumber].breturn = "=[" + this.tmpGab + "]";
                btnArr[confirmNumber].breturn = "=[" + this.retValue() + "]"
            }else{
                tenClass.returnGab();
            }
        }
    }
    this.returnGab = function(){//////////////////////////////////////////////////////////////////////////////////다른 JS하고 연결하고 쓸 함수임
        let pageFlag = spName+''+pageNum.substr(2,4)
        if(spFlag){//////////////connectF가 true시 즉 tenCall함수 사용해야 하는 상황
            switch(pageFlag){
                case spName+'1106':
                    //console.log('tenObj.outReturnG==='+tenObj.outReturnG)
                    btnArr[confirmNumber].breturn = "=[" + this.tmpGab + tenObj.outReturnG + "]";
                break;
                case spName+'2057'://추후추가 할것리 있으면 추가 default와 같음.
                default:
                    btnArr[confirmNumber].breturn = "=[" + this.tmpGab + "]";
                break; 
            }
        }else{ 
            switch(pageFlag){
                case spName+'2102':   
                    console.log("tenObj.outReturnG==="+tenObj.outReturnG)
                    if(this.popupFlag && tenObj.outReturnG=='5'){
                        let classCheck = $('#recent').attr('class')/////////하나은행2102
                        let sortVal = classCheck.indexOf('onSelected')>-1?"1":"2";
                        btnArr[confirmNumber].breturn = "=[5" +sortVal+ this.tmpGab + "]";
                    }//else{
                       // btnArr[confirmNumber].breturn = "=[" + this.tmpGab + "]";
                    //}
                break;
                default:
                    btnArr[confirmNumber].breturn = "=[" + this.tmpGab + "]";
                break;
            }
        }
    }
    this.tenE = function(isTen,tGab){
        switch(isTen){
            case "num":
                for(var i=0;i<tenArr.length;i++){ //숫자들어오면 일단 지우기와 정정 딤드풀기
                    if(Number(tenArr[i].tendata)>=0 && Number(tenArr[i].tendata) < 10){
                        tenArr[i].dimd=String(Number(tGab));
                        this.tendimd(i);
                    }	
                }
            break;
            case "man":
                for(i=0;i<tenArr.length;i++){ //숫자들어오면 일단 지우기와 정정 딤드풀기
                    if(tenArr[i].tendata=="만"){ 
                        tenArr[i].dimd=String(Number(tGab));
                        this.tendimd(i);
                    }	
                }
            break;
            case "chon":
                for(i=0;i<tenArr.length;i++){ //숫자들어오면 일단 지우기와 정정 딤드풀기
                    if(tenArr[i].tendata=="천"){ 
                        tenArr[i].dimd=String(Number(tGab));
                        this.tendimd(i);
                    }	
                }
            break;
            case "won":
                for(i=0;i<tenArr.length;i++){ //숫자들어오면 일단 지우기와 정정 딤드풀기
                    if(tenArr[i].tendata=="원"){ 
                        tenArr[i].dimd=String(Number(tGab));
                        this.tendimd(i);
                        //console.log('i====='+i)
                    }	
                }
            break;
            case "zero":
                for(i=0;i<tenArr.length;i++){ //숫자들어오면 일단 지우기와 정정 딤드풀기
                    if(tenArr[i].tendata=="0"){ 
                        tenArr[i].dimd=String(Number(tGab));
                        this.tendimd(i);
                    }	
                }
            break;
            case "del":
                for(i=0;i<tenArr.length;i++){
                    if(tenArr[i].del==1 || tenArr[i].clr==1){
                        tenArr[i].dimd=String(Number(tGab));
                        this.tendimd(i);
                    }
                }

            break;
            case "clr":
                for(i=0;i<tenArr.length;i++){
                    if(tenArr[i].del==1 || tenArr[i].clr==1){
                        tenArr[i].dimd=String(Number(tGab));
                        this.tendimd(i);
                    }
                }

            break;
            case "shuffle":
                for(var i=0;i<tenArr.length;i++){ //숫자들어오면 일단 지우기와 정정 딤드풀기
                    if(tenArr[i].tendata=="shuffle"){
                        tenArr[i].dimd=String(Number(tGab));
                        this.tendimd(i);
                    }	
                }

            break;
            default:		
            break;
        }
    }

    /**** 만, 천단위 버튼 활성,비활성 처리함수 ****/
    this.unitButton_Disabled = function(){	
        let my_txt = $("#dxt" + this.dxtIndex).text();
        let man_su = my_txt.lastIndexOf("만")
        let chun_su = my_txt.lastIndexOf("천")
        let total_su = my_txt.length		
        //$("#dxt3").text("만위치:"+man_su.toString()+"/천위치:"+String(chun_su)+"/토탈:"+total_su)	
        this.tenE("num",false)
        if (my_txt.lastIndexOf("만") == -1 && my_txt.lastIndexOf("천") == -1) { //'만','천'둘다 입력되지 않았다면
            if (my_txt.length == 1){  //임광진-하나라도 입력되어 있다면
                //$("#dxt2").text("둘다 입력되지 않음, 숫자는 하나입력됨")			
                this.tenE("chon",false)
            }else {			
                this.tenE("chon",true)//19.02.11수정
            }
            if (my_txt.length >= 1 && my_txt.length <= 4){ //임광진-숫자가 하나이상 네개이하로 입력됬을경우
                //$("#dxt2").text("둘다 입력되지 않음, 숫자는 하나이상 4이하입력됨")			
                this.tenE("man",false)	
            }else {
                //$("#dxt2").text("죄다 숫자라고")
                if(my_txt.length !=0){ 
                    //dimd.endD(btn_num0)			
                    this.tenE("zero",false)
                }
                if(my_txt.length>=5){
                    this.tenE("man",true)
                }
                if(my_txt.length>=6){
                    this.tenE("chon",true)//19.02.11수정
                }
                if(my_txt.length ==0){
                    this.tenE("man",true)
                    this.tenE("chon",true)
                    this.tenE("zero",true)
                }

            }
        }else if(my_txt.lastIndexOf("만") != -1 && my_txt.lastIndexOf("천") != -1){
            //$("#dxt2").text("둘다 입력됨")	
            this.tenE("man",true)
            if (my_txt.lastIndexOf("만") > my_txt.lastIndexOf("천")){//천이 만보다 먼저일경우
                //$("#dxt2").text("천이 만보다 먼저")
                if (my_txt.length - my_txt.lastIndexOf("만") - 1 == 1){
                    this.tenE("chon",false)
                    this.tenE("zero",false)
                }else{
                    this.tenE("chon",true)
                    this.tenE("zero",false)
                }
                if (my_txt.length - my_txt.lastIndexOf("만") - 1 == 0){				
                    //$("#dxt2").text("둘다 입력됬지만 0은 안되-----")
                    this.tenE("zero",true)
                }
                if (my_txt.length - my_txt.lastIndexOf("만") - 1 >= 4){
                    this.tenE("num",true)
                    this.shuffle==1?this.tenE("shuffle",true):"";
                    if(Number(this.returnFlag)==1)this.autoReturn();
                }
            }else{       //임광진-만이 천보다 먼저일 경우
                //$("#dxt2").text("만이 천보다 먼저")
                this.tenE("chon",true)
                if (my_txt.length - my_txt.lastIndexOf("천") - 1 <= 3){
                    this.tenE("man",true)					
                    this.tenE("zero",false)
                    if (my_txt.length - my_txt.lastIndexOf("천") - 1 >= 3){
                        this.tenE("num",true)
                        this.shuffle==1?this.tenE("shuffle",true):"";
                        if(Number(this.returnFlag)==1)this.autoReturn();
                    }
                    if (my_txt.length - my_txt.lastIndexOf("천") - 1 == 0){
                        if ((my_txt.lastIndexOf("천") - my_txt.lastIndexOf("만")-1)==1){
                            this.tenE("chon",true)
                        }
                        //$("#dxt2").text("'00'은 못눌러요~물론 천도 이미 눌렀는데")
                        this.tenE("zero",true)
                    }
                }
            }
        }else if (my_txt.lastIndexOf("만") != -1){
            //$("#dxt2").text("'만'만 입력됨")
            this.tenE("man",true)
            if (my_txt.length - my_txt.lastIndexOf("만") - 1 == 1){ //임광진-천자리수가 하나 들어갔을 경우
                this.tenE("chon",false)
            }else{
                this.tenE("chon",true)
            }
            if (my_txt.length - my_txt.lastIndexOf("만") - 1 == 0){ //임광진-천자리수가 하나 들어갔을 경우
                //$("#dxt2").text("'000'은 못눌러요")
                this.tenE("zero",true)
            }else{
                this.tenE("zero",false)
            }
            if (my_txt.length - my_txt.lastIndexOf("만") - 1 >= 4){ //임광진-만 이하자리가 천자리까지 입력됬을경우
                //$("#dxt2").text("'만'만 입력됨 숫자는 그만")
                this.tenE("num",true)
                this.shuffle==1?this.tenE("shuffle",true):"";
                if(Number(this.returnFlag)==1)this.autoReturn();
            }
        }else{
            //$("#dxt2").text("'천'만 입력됨")
            this.tenE("chon",true)
            if (my_txt.length - my_txt.lastIndexOf("천") - 1 <= 3){  //임광진-천만원 이상입력할려면 
                //$("#dxt2").text("'천'만 입력됨 만원입력가능 ")
                this.tenE("man",false)
            }else{
                //$("#dxt2").text("'천'만 입력됨 만원입력불가능 ")	
                this.tenE("man",true)
            }
            if (my_txt.length - my_txt.lastIndexOf("천") - 1 == 0){  //임광진-'0'  입력금지 
                //$("#dxt2").text("'0000'은 못눌러요")
                this.tenE("zero",true)
            }else{
                this.tenE("zero",false)
            }
            if (my_txt.length - my_txt.lastIndexOf("천") - 1 >= 3){
                this.tenE("num",true)
                this.shuffle==1?this.tenE("shuffle",true):"";
                if(Number(this.returnFlag)==1)this.autoReturn();
            }
        }
    }

    this.retValue = function(){
        let my_txt = this.tmpGab
        let intMoney = 0;
        let firstChon=my_txt.indexOf("천")
        let firstMan=my_txt.indexOf("만")
        let lastChon=my_txt.lastIndexOf("천")
        if(firstChon>0 && firstChon<firstMan){//맨앞에 천이 있다면
            intMoney=Number(my_txt.substring(0,firstChon))*10000000
        }else{
            firstChon=-1
            intMoney=0
        }	

        if(firstMan>0){
            intMoney+=Number(my_txt.substring(firstChon+1,firstMan))*10000
        }	
        if(lastChon>0 && lastChon>firstMan){ //뒤에 천이 있다면
            if(my_txt.length-lastChon < 5){
                var ff=lastChon
                var ff2=firstChon
                //$("#dxt2").text("Fff="+ff+",ff2=="+ff2)
                if(my_txt.length-lastChon == 1){
                    intMoney+=Number(my_txt.substring(lastChon-1,lastChon))*1000	
                    //intMoney+=Number(my_txt.substring(0,lastChon))*1000
                }else{
                    intMoney+=Number(my_txt.substring(lastChon-1,lastChon))*1000	
                }
            }else{
                intMoney+=Number(my_txt.substring(lastChon-1,lastChon))*10000000
            }
            intMoney+=Number(my_txt.substr(lastChon+1,my_txt.length))
        }else{
            intMoney+=Number(my_txt.substr(firstMan+1,my_txt.length))
        }
        let maxG ="";
        for(let i =0; i<Number(this.maxGab); i++) maxG=maxG+"9";
        if (firstChon==-1 && firstMan==-1){
            if (intMoney.toString().length == Number(this.maxGab) || intMoney >= Number(maxG)){
            //if (intMoney.toString().length == 8 || intMoney >= 99999999){
                this.tenE("num",true)
                this.tenE("man",true)
            }		
        }else{
            //if (intMoney >= 99999999){
            if (intMoney >= Number(maxG)){
                this.tenE("num",true)	
                this.tenE("chon",true)
                this.tenE("man",true)	
            }		
        }
        return intMoney;
    }
}