/*
    필요한 유틸리티는 여기서 생성, 관리 ( 2019. 02. 12 신성철) 

    Revision History
        ver 1.0.0.0 - 최초작성
        ver 1.0.0.1 (2021.02.03) - 하나은행 통합, cyg
        ver 1.0.0.2 (2021.02.03) - startTimer, stopTimer 추가, 손지민
*/

function Util() { }

/*
    value 와 iname을 매개변수로 받아
    현재화면의 버튼 객체의 iname과 일치하는것을 찾아 value넣어줌
*/
Util.prototype.setReturnBtn = function (value, iname) {
    for (var i = 0; i < btnArr.length; i++) {
        if ($(btnArr[i]).attr("iname") == iname) {
            //console.log(value)
            btnArr[i].breturn = value;
        }
    }
}
/*
    text 와 iname을 매개변수로 받아
    현재화면의 Dxt 객체의 iname과 일치하는 것을 찾아 text 넣어줌
*/
Util.prototype.setTextDxt = function (text, iname) {
    for (var i = 0; i < dxtArr.length; i++) {
        if ($(dxtArr[i]).attr("iname") == iname) {
            //console.log(value)
            $("#dxt" + i).text(text)
        }
    }
}
/*
    iname을 매개변수로 받아
     iname과 일치하는 Dxt 객체를 찾아 넘김 넣어줌
*/
Util.prototype.getDxt = function (iname) {
    for (var i = 0; i < dxtArr.length; i++) {
        if ($(dxtArr[i]).attr("iname") == iname) {
            return $("#dxt" + i);
        }
    }
}
/*
    iname을 매개변수로 받아
     iname과 일치하는 Btn 객체를 찾아 넘김 넣어줌
*/
Util.prototype.getBtn = function (iname) {
    for (var i = 0; i < dxtArr.length; i++) {
        if ($(btnArr[i]).attr("iname") == iname) {
            return $("#btn" + i);
        }
    }
}
/*
    버튼 누름효과
    k[10]
*/
Util.prototype.btnClick = function (btnObj) {
    var mymy = btnObj;
    
    // 2020.07.03 sound 가 빨리 반복호출되면 오류발생되는 현상 개선, 최용균
    /**
    bleep.pause();
    bleep.currentTime = 0;
    bleep.play(); //소리            
    **/
    bleepPlay();

    $(mymy).stop().animate({   //jQuary를 이용하여 눌림효과 주기
        top: '+=5px',
        opacity: '0.5',
    }, 50, reback);
    function reback() {
        $(mymy).stop().animate({
            top: '-=5px',
            opacity: '1',
        }, 50);

        mymy = null;
    }

    ws_send("k[10]")
}
/*
    버튼 클릭 이벤트
    특수화면에서 만든 버튼일 경우 버튼 jquery 객체와 리턴값을 설정하여 send
*/
Util.prototype.btnClickSend = function (btnObj, breturn) {
    if (eventFlag == false) {
        eventFlag = true;
        var mymy = btnObj;
        bleep.pause();
        bleep.currentTime = 0;
        bleep.play(); //소리            
        $(mymy).animate({   //jQuary를 이용하여 눌림효과 주기
            top: '+=5px',
            opacity: '0.5',
        }, 50, reback);
        function reback() {
            $(mymy).animate({
                top: '-=5px',
                opacity: '1',
            }, 50);

            mymy = null;
        }
        ws_send(breturn)
    }
}


/*
    딤드 
    flag 0 - 비활성화
    flag 1 - 활성화
*/
Util.prototype.btnDimd = function (flag, iname) {
    for (var i = 0; i < btnArr.length; i++) {
        if ($(btnArr[i]).attr("iname") == iname) {
            if (flag) { //1 DIMD
                $('#btn' + i).css('-webkit-filter', 'grayscale(100%) opacity(30%)')
                btnArr[i].dimd = "1";
            } else { // 0 not DIMD
                $('#btn' + i).css('-webkit-filter', 'grayscale(0%) opacity(100%)')
                btnArr[i].dimd = "0";
            }
        }
    }
}

/*
    전화번호 검사
    
*/
Util.prototype.phoneNumValidation = function (phoneNum) {
    const phone = typeof (phoneNum) !== "string" ? String(phoneNum) : phoneNum;
    //02 10자리일때
    const firstArr9 = ["02"]

    //011 016 ... 02 031 032 ... 등 10자리일때
    const firstArr10 = ["011", "016", "017", "018", "019", "02", "051", "053", "032", "062", "042", "052", "044", "031", "033", "043", "041", "063", "061", "054", "055", "064"]

    //010, 070 등 11자리일때
    const firstArr11 = ["010", "070"]
    let first;
    let second;
    let third;

    /*
    var reg = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    if(!reg.test(phone)) {
        return true;
    }
    if(!regPhone.test(phone)) {
        return true;
    }
    return false;
    */
    if (phone.length === 9) {
        if (phone.substr(0, 2) === "02") {
            first = phone.substr(0, 2);
            second = phone.substr(2, 4);
            third = phone.substr(6, 4);

        }
        if (firstArr9.indexOf(first) !== -1) {
            return true;
        } else {
            return false;
        }
    }
    else if (phone.length === 10) {
        if (phone.substr(0, 2) === "02") {
            first = phone.substr(0, 2);
            second = phone.substr(2, 4);
            third = phone.substr(6, 4);
        } else {
            first = phone.substr(0, 3);
            second = phone.substr(3, 3);
            third = phone.substr(6, 4);
        }
        if (firstArr10.indexOf(first) !== -1) {
            return true;
        } else {
            return false;
        }
    } else if (phone.length === 11) {
        first = phone.substr(0, 3);
        second = phone.substr(3, 4);
        third = phone.substr(7, 4);
        if (firstArr11.indexOf(first) !== -1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

/*
    날짜 반환
    param   = date object
    return  = json object
*/
Util.prototype.getToday = function (today) {
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 일
    let hour = today.getHours(); // 시
    let minute = today.getMinutes(); // 분
    const dateArr = new Array('일', '월', '화', '수', '목', '금', '토');
    let day = dateArr[today.getDay()]; //요일
    let last = new Date(year, month, 0);
    return {
        "year": year,
        "month": month,
        "date": date,
        "day": day,
        "hour": hour,
        "minute": minute,
        "last": last.getDate()
    }
}

/*
    이전 이후, 날짜 반환
    param   = date object, "prev"or"next"
    return  = json object
*/
Util.prototype.getPrevNextDate = function (today, option) {
    const dateArr = new Array('일', '월', '화', '수', '목', '금', '토');

    let year = today.getFullYear(); //년 
    let month = today.getMonth(); // 월
    let date = today.getDate(); // 일
    let day = dateArr[today.getDay()]; //요일

    //현재 달의 마지막날짜를 구함
    let last = new Date(year, month, 0)
    var last_date = last.getDate();

    let returnDate;
    if (option === "prev") {
        //------------이전 날짜를 구함---------------
        // 1일일 경우
        if (month == 0 && date == 1) { // 1월 1일일 경우 12월 31일
            returnDate = new Date(year - 1, 12, 0);
        } else if (date == 1) { // 이전달의 마지막 날을 구함
            returnDate = new Date(year, month, 0);
        } else {
            returnDate = new Date(year, month, date - 1);
        }
    } else if (option === "next") {
        //------------이후 날짜를 구함---------------
        if (date == last_date && month == 12) { // 12월 31일일 경우 1월 1일
            returnDate = new Date(parseInt(year) + 1, 1, 1); // 1월 1일
        } else if (date == last_date) {
            returnDate = new Date(year, parseInt(month) + 1, 1); // 다음달 1일
        } else {
            returnDate = new Date(year, month, parseInt(date) + 1); // 이번달, 오늘 날짜 +1
        }
    } else {
        //console.log("option param error!!")
        return null;
    }
    year = returnDate.getFullYear();
    month = parseInt(returnDate.getMonth() + 1);
    date = returnDate.getDate();
    day = dateArr[returnDate.getDay()]; //

    //-------------두자리 수로 변환------------
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }

    return {
        "year": year,
        "month": month,
        "date": date,
        "day": day
    }
}

/*
    이전 이후, 달 반환
    param   = date object, "prev"or"next"
    return  = json object
*/
Util.prototype.getPrevNextMonth = function (today, option) {

    let year = today.getFullYear(); //년 
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 일
    let last_date;
    let returnDate;
    if (option === "prev") {
        //------------이전 날짜를 구함---------------
        // 1일일 경우
        if (month == 1) { // 1월일때 이전 년도 12월
            returnDate = new Date(year - 1, 12, 0);
        } else {
            returnDate = new Date(year, month - 1, 0);
        }
    } else if (option === "next") {
        //------------이후 날짜를 구함---------------
        if (month == 12) { // 12월일때 다음 년도 1월
            returnDate = new Date(parseInt(year) + 1, 1, 0); // 1월 1일
        } else {
            returnDate = new Date(year, month + 1, 0); // 이번달, 오늘 날짜 +1
        }
    } else {
        //console.log("option param error!!")
        return null;
    }
    year = returnDate.getFullYear();
    month = parseInt(returnDate.getMonth() + 1);
    date = returnDate.getDate();
    last_date = returnDate.getDate();

    //-------------두자리 수로 변환------------


    return {
        "year": year,
        "month": month,
        "date": date,
        "last_date": last_date
    }
}

/*
    스크롤
*/
Util.prototype.scroll = function (bgid) {
    var downFlag = false;//마우스가 다운중인지 여부. down이며 true,down은 false
    var startX, startY;
    var oldX, oldY, mytimer, firsttimer;
    var vy = 1;//속도
    var nowY;
    var friction = 0.97;//마찰
    var parentID;//부모아이디
    document.getElementById(bgid).onscroll = function () { myFunction() };

    function myFunction() {
        nowY = document.getElementById(bgid).scrollTop

    }
    function scroll_f(e) {
        switch (e.type) {
            case "mousedown":
                ws_send("k[10]");
                downFlag = true
                startX = e.pageX;
                startY = e.pageY;

                oldY = document.getElementById(bgid).scrollTop;
                clearTimeout(firsttimer);
                clearTimeout(mytimer)
                mytimer = setTimeout(trackVelocity, 15);
                break;
            case "mouseup":
                //downFlag = false;
                downFlag = false
                clearTimeout(mytimer);
                clearTimeout(firsttimer);
                firsttimer = setTimeout(enterframe, 15);
                break;
            case "mousemove":

                if (downFlag && 1920 > e.pageY && 0 < e.pageY) {
                    var nowSc = document.getElementById(bgid).scrollTop;//현재 스크롤값
                    var moveSc = (startY - e.pageY) / 20;//움직인값
                    //console.log("움직인값:"+Math.abs(startY-e.pageY))
                    // $('#'+bgid).scrollTop(nowSc + moveSc);
                    nowY = nowSc + moveSc
                    parentID = $('#' + bgid).parent().id;//부모 id가져오기
                    $('#' + parentID + ', #' + bgid).scrollTop(nowSc + moveSc);
                }
                break;
            case "mouseleave":
                downFlag = false;
                break;
            default:
                break;
        }
    }
    function enterframe() {


        vy *= friction;

        var lastgab = nowY += vy;
        //console.log("라스트값"+vy)
        parentID = $('#' + bgid).parent().id;//부모 id가져오기
        $('#' + parentID + ', #' + bgid).scrollTop(lastgab);
        if (Math.abs(vy) > 0.01) {
            firsttimer = setTimeout(enterframe, 15);
        }

    }

    function trackVelocity() {
        vy = (nowY - oldY);
        //console.log("속도는"+vy)

        oldY = nowY;
        mytimer = setTimeout(trackVelocity, 15)
    }

    $('#' + bgid).bind('mousedown mouseup mousemove mouseleave', scroll_f);
}

Util.prototype.timeCount = function (count, send) {
    var setCount = setInterval(function() {
        if(count == 0) {
            clearInterval(setCount);
            if(timerFlag == true) {
                ws_send(send);
            }
        }
        count--;
        bleep.pause();
        bleep.currentTime = 0;
        bleep.play(); //소리    
        if(count >= 0) {
            $(".black_round_timer").text(count);
        }
    }, 1000);
    intervalArr.push(setCount);
}

Util.prototype.coinTimer = function() {
    var coinTime = 60;
    var timer = arguments.length == 0 ? coinTime-10 : coinTime-arguments[0];
    
    var setCoinTimer = setInterval(function() {
        if(coinTime == 0) {
            clearInterval(setCoinTimer);
        }        
            
            coinTime--;
            if(coinTime <= timer) {
                alertSound.pause();
                alertSound.currentTime = 0;
                alertSound.play();
            }
            
        }, 1000);
        intervalArr.push(setCoinTimer);
    }
Util.prototype.replaceAll = function (str, beforeStr, afterStr) {
    return str.split(beforeStr).join(afterStr);
}

/**
    금액에 , 붙이는 함수(타입,대상)
    
    type : 0 붙이기
    type : 1 떼기 
 */
Util.prototype.comma = function (type, num) {
    if (type == 0) {
        // num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var minus;
        if (Number(num) < 0) {
            num = String(Number(num) * -1);
            minus = true;
        } else { minus = false; }
        var dotPos = (num + "").split(".")
        var dotU = dotPos[0]
        var dotD = dotPos[1]
        var commaFlag = dotU.length % 3
        if (commaFlag) {
            var out = dotU.substring(0, commaFlag)
            if (dotU.length > 3) out += ","
        }
        else out = ""

        for (var i = commaFlag; i < dotU.length; i += 3) {
            out += dotU.substring(i, i + 3)
            if (i < dotU.length - 3) out += ","
        }

        if (minus) out = "-" + out
        if (dotD) return out + "." + dotD
        else return out
    } else {
        num = String(num);
        // num = num.replace(/,/gi,"");
        let lszES = "";
        for (var i = 0; i < num.length; i++) {
            if (num.charAt(i) != ',') {
                lszES = lszES + (num.substring(i, i + 1));
            }
        }
        return lszES;
    }
    return num;
}

/*
    들어온 데이터를 가공해주는 함수(대상json) / 기존에 데이터 응용함
    데이터를 화면에서 사용하기 쉽게 가공(obj재배치)
    param   = jsonObj object, type string
    return  = parse_obj object
*/
Util.prototype.parse_obj = function(jsonObj,type){
    let parse_obj = new Object;
    let continue_name = ["coin","cash","gift","check"];//포함시키기 싫은 객체 이름 배열로 담음
    switch(type){
        case "A"://1004 들어온 값을 기반으로 반든 객체
            for(let name in jsonObj){//사용할수있는 데이터 가공중
                name = name.toLowerCase();//들어온 데이터가 무엇이든 소문자로 전환(데이터 셋팅용)
                name_ = name.toUpperCase(); //들어온 데이터가 무엇이든 대문자로 전환(데이터 읽을 때 사용됨)
                recycle1(name);
                for(let i = 0;i<jsonObj[name_].length;i++){
                    //내부적인값 생성및 세팅
                    if(jsonObj[name_][i].KIND !== undefined){
                        recycle2(name,jsonObj[name_][i].KIND,jsonObj[name_][i].MIN,jsonObj[name_][i].MAX,type);
                    }
                }
            }
        break;
        default:
            for(let name in jsonObj){//사용할수있는 데이터 가공중
                name = name.toLowerCase();//들어온 데이터가 무엇이든 소문자로 전환(데이터 셋팅용)
                name_ = name.toUpperCase(); //들어온 데이터가 무엇이든 대문자로 전환(데이터 읽을 때 사용됨)
                recycle1(name);
                for(let key in jsonObj[name_].IN){
                    //내부적인값 생성및 세팅
                    
                    if(name === "ja" || name === "ta"){
                        continue;
                    }
                    recycle2(name,jsonObj[name_].IN[key].KIND,Number(jsonObj[name_].IN[key].COUNT),"",type);
                }
            }
        break;
    }

    function recycle1(name){
        //1차가공 모듈 전체적인금액 생성및 세팅(상위객체)
        for(let i = 0 ; i < continue_name.length ; i++){
            if(name.includes(continue_name[i])){
                parse_obj[name] = {};
                parse_obj[name].data = {};
                parse_obj[name].name = name;
                parse_obj[name].group_sum = 0;
                parse_obj[name].count_sum = 0;
                name.includes("coin") ? parse_obj[name].quantity = "개":parse_obj[name].quantity = "매";
                parse_obj.won = "원";
            }
        }
    }

    function recycle2(name,kind,min,max,type){
        //2차가공모듈(상위객체,종류,최소값,최대값,구분타입)
        parse_obj[name].data[kind] = {};
        parse_obj[name].data[kind].str = Util.prototype .parse_str(kind);
        parse_obj[name].data[kind].type = Number(kind);
        type==="A"?parse_obj[name].data[kind].max = Number(max):"";
        parse_obj[name].data[kind].count = Number(min);
        parse_obj[name].data[kind].sum = Number(kind) * Number(min);
        parse_obj[name].group_sum += Number(kind) * Number(min);
        parse_obj[name].count_sum += Number(min);
    }
    return parse_obj;
}

/*
    들어온 시재에 따라서 문자열로 가공해서 리턴해주는 함수
    param   = gab string
    return  = save string
*/
Util.prototype.parse_str = function(gab){//데이터 가공시 필요한 함수
    let save = "";
    firstStr();
    lastStr();
    function firstStr(){//앞자리의 숫자를 파싱
        switch(Number(gab.substr(0,1))){
            case 2 : save += "이" ; break;
            case 3 : save += "삼" ; break;
            case 4 : save += "사" ; break;
            case 5 : save += "오" ; break;
            case 6 : save += "육" ; break;
            case 7 : save += "칠" ; break;
            case 8 : save += "팔" ; break;
            case 9 : save += "구" ; break;
        }
    }
    function lastStr(){
        switch(gab.length){//길이에 따라서 파싱
            case 2 : save += "십"  ;  break;
            case 3 : save += "백"  ;  break;
            case 4 : save += "천"  ;  break;
            case 5 : save += "만"  ;  break;
            case 6 : save += "십만";  break;
            case 7 : save += "백만";  break;
        }
    }
    return save + "원";
}

/*
    들어온 시재에 따라서 영문 문자열로 리턴해주는 기능
    param   = gab string
    return  = class string
*/
Util.prototype.parse_en = function(gab){//데이터 가공시 필요한 함수
    let save = "";
    switch(gab){
        case "50000" : save = "oman"  ; break;
        case "10000" : save = "man"   ; break;
        case "5000"  : save = "ochun" ; break;
        case "1000"  : save = "chun"  ; break;
        case "500"   : save = "obek"  ; break;
        case "100"   : save = "bek"   ; break;
        case "50"    : save = "osib"  ; break;
        case "10"    : save = "sib"   ; break;
    }
    return save;
}

/*
    1004번 화면처럼 시재표시를 위해서 가공해주는 함수
    시재와 class를 받아서 해당되는 class에 시재에 대한 그래프 값을 담아서 리턴해주는 과정
    param   = arr array, target class
    return  = arrMoneyData array(2중배열)
*/
Util.prototype.balance_print = function(arr,target){// scope 생성, 금액 표시되는부분 밑단에 해당되는 권종의 잔량 표시
    var cnt = 0;
    var arrSetData = new Array();
    var arrMoneyData = new Array();

    for(var j = 0;j<arr.length;j++){
        recycle(arr[j]);
    }

    function recycle(data){
        for(var i = Object.keys(data).length-1 ; i >= 0 ; i--){//반대로
            $(`.${target}`).eq(cnt).find("span").text(Util.prototype.comma(0,data[Object.keys(data)[i]].count.toString()));
            arrSetData.push(data[Object.keys(data)[i]].max);
            arrSetData.push(data[Object.keys(data)[i]].count);
            arrMoneyData.push(arrSetData);
            arrSetData = [];
            cnt++;
        }
    }
    return arrMoneyData;
}

/**
 * 터치 이벤트 테스트 하기 위해서 모듈 삽입(css 문법으로 받아오면됨)
 * @param ele
 */
Util.prototype.test_event = function(ele){
    event_start("drag");

    event_start("mouseenter");
    event_start("mousedown");
    event_start("mousemove");
    event_start("mouseover");
    event_start("mouseup");
    event_start("mouseout");
    event_start("scroll");

    event_start("touchstart");
    event_start("touchmove");
    event_start("touchend");

    function event_start(event){
        $(ele).on(event,function(e){
            LG_CNS.log(e.type);
        })
    }
}

/*
    딤드여부 확인
    obj : 대상객체 ex) $(this)

    대상객체 -webkit-filter css속성이 none, undefined면 딤드 아닌것으로 체크
    return : 딤드인경우 true, 딤드아니면 false
    2019.08.08 최승수
 */
Util.prototype.isDimd = function (obj) {
    if (obj.css('-webkit-filter') != 'none' && obj.css('-webkit-filter') != undefined && obj.css('-webkit-filter') != "grayscale(0) opacity(1)") return true;
    else return false;
}

/*
    파람값 파싱
 */
Util.prototype.paramParse = function (paramStr, splitStr) {
    if (paramStr.length == 0) {
        return new Array();
    } else {
        return paramStr.split(splitStr);
    }
}
/*
    시간(초) 카운트다운
    UI크레이터 내 static text 또는 dynamic text 에서 아래 내용 복사 위치는 UI크레이터로 잡으면 됨
    <span class="클래스명">시간(초)</span><script>UTIL.timeCountDown("클래스명")</script> 
 */
Util.prototype.timeCountDown = function (clsName) {
    var timeObj = $("." + clsName);
    var timeCnt = Number(timeObj.text());
    var tmpInterval = setInterval(function () {
        if(timeCnt == 0 ){
            ws_send("~[-3]")
            clearInterval(tmpInterval);
        }
        timeObj.text(--timeCnt);
    }, 1000)
    globalInterval.push(tmpInterval);
}
/*
    휴대폰 번호 포맷 
    param 
    - type
        0 : - 삽입
        1 : - 제거
    - phoneNum
        11자리 111-2222-3333
        10자리 011-222-3333
 */
Util.prototype.phoneDash = function (type, phoneNum) {
    let retValue = "";

    if (type === 0) {
        var tmpPhoneNum = "" + phoneNum;
        var firstStr = "";
        var secondStr = "";
        var thirdStr = "";
        if (tmpPhoneNum.length <= 3) {
            firstStr = tmpPhoneNum;
        } else if (tmpPhoneNum.length <= 6) {
            firstStr = tmpPhoneNum.substr(0, 3);
            secondStr = "-" + tmpPhoneNum.substr(3, tmpPhoneNum.length - 3);
        } else if (tmpPhoneNum.length <= 7) {
            firstStr = tmpPhoneNum.substr(0, 3);
            secondStr = "-" + tmpPhoneNum.substr(3, 3);
            thirdStr = "-" + tmpPhoneNum.substr(6, 1);
        } else if (tmpPhoneNum.length <= 11) {
            firstStr = tmpPhoneNum.substr(0, 3);
            secondStr = "-" + tmpPhoneNum.substr(3, 4);
            thirdStr = "-" + tmpPhoneNum.substr(7, tmpPhoneNum.length - 7);
        }
        retValue = firstStr + secondStr + thirdStr;
    } else {
        var tmpValue = phoneNum.toString();
        retValue = tmpValue.replace(/\-/gi, "");
    }
    return retValue;

}
/*
    날짜 형식
    param 
    - type
        0 : - 삽입
        1 : - 제거
    - dot
        "." : .형식 (2019.09.20)
        "-" : -형식 (2019-09-20)
    - date
        8자리 20190920
 */
Util.prototype.DateFormat = function (type, dot ,dateStr) {
    let retValue = "";

    if (type === 0) {
        var tmpDateStr = "" + dateStr;
        var firstStr = "";
        var secondStr = "";
        var thirdStr = "";
        if (tmpDateStr.length <= 4) {
            firstStr = tmpDateStr;
        } else if (tmpDateStr.length <= 6) {
            firstStr = tmpDateStr.substr(0, 4);
            secondStr = dot + tmpDateStr.substr(4, tmpDateStr.length - 4);
        } else if (tmpDateStr.length <= 8) {
            firstStr = tmpDateStr.substr(0, 4);
            secondStr = dot + tmpDateStr.substr(4, 2);
            thirdStr = dot+ tmpDateStr.substr(6, tmpDateStr.length - 6);
            if(tmpDateStr.length == 8) thirdStr = dot+ tmpDateStr.substr(6, tmpDateStr.length - 6) + dot;
        }
        retValue = firstStr + secondStr + thirdStr;
    } else {
        var tmpValue = dateStr+"";
        if(dot == "-"){
            retValue = tmpValue.replace(/\-/gi, "");
        } else {
            retValue = tmpValue.replace(/\./gi, "");
        }
    }
    return retValue;

}
Util.prototype.juminFormat = function (type, dot ,dateStr) {
    let retValue = "";
    if (type === 0) {
        var tmpDateStr = "" + dateStr;
        var firstStr = "";
        var secondStr = "";
        if (tmpDateStr.length <= 6) {
            firstStr = tmpDateStr;
        } else if (tmpDateStr.length <= 13){
            firstStr = tmpDateStr.substr(0, 6);
            secondStr = dot + tmpDateStr.substr(6, tmpDateStr.length - 6);
        }
        retValue = firstStr + secondStr
    } else {
        var tmpValue = dateStr+"";
        if(dot == "-"){
            retValue = tmpValue.replace(/\-/gi, "");
        } else {
            retValue = tmpValue.replace(/\./gi, "");
        }
    }
    return retValue;

}
Util.prototype.driveFormat = function (type, dot ,dateStr) {
    let retValue = "";

    if (type === 0) {
        var tmpDateStr = "" + dateStr;
        var firstStr = "";
        var secondStr = "";
        var thirdStr = "";
        if (tmpDateStr.length <= 2) {
            firstStr = tmpDateStr;
        } else if (tmpDateStr.length <= 8) {
            firstStr = tmpDateStr.substr(0, 2);
            secondStr = dot + tmpDateStr.substr(2, tmpDateStr.length - 2);
        } else if (tmpDateStr.length <= 10) {
            firstStr = tmpDateStr.substr(0, 2);
            secondStr = dot + tmpDateStr.substr(2, 6);
            thirdStr = dot+ tmpDateStr.substr(8, tmpDateStr.length - 8);
        }
        retValue = firstStr + secondStr + thirdStr;
    } else {
        var tmpValue = dateStr+"";
        if(dot == "-"){
            retValue = tmpValue.replace(/\-/gi, "");
        } else {
            retValue = tmpValue.replace(/\./gi, "");
        }
    }
    return retValue;

}
/*
    dxt 세로정렬
    param
        - iname
    
    iname으로 dxt를 찾은 후 css속성 추가
 */
Util.prototype.verticalAlign = function (iname) {

    var dxtObj = this.getDxt(iname);
    var dxtTxt = dxtObj.html();
    dxtObj.text(""); // 원래값 비우고
    dxtObj.css({ 
        "display":"table"
    });
    dxtObj.append(`<span style="display:table-cell;vertical-align:middle;"></span>`);
    dxtObj.find("span").html(dxtTxt);
}

/*
    전화번호 형식 체크

    @param :  앞자리, 가운데, 뒷자리
*/
Util.prototype.isPhone = function (front, center, end) {
    var regExpFront =/(02)$/;
    var regExpCenter =/([0-9]{3,4})$/;
    var regExpEnd =/([0-9]{4})$/;
    
    if(regExpFront.test(front)){
        if(regExpCenter.test(center)){
            if(regExpEnd.test(end)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }else{
        regExpFront =/(0[3-9]{1}[0-9]{1})$/;
        regExpCenter =/([0-9]{3,4})$/;
        regExpEnd =/([0-9]{4})$/;
        if(regExpFront.test(front)){
            if(regExpCenter.test(center)){
                if(regExpEnd.test(end)){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        } else {
            return false;
        }
    }
}
/*
    휴대폰번호 형식 체크

    @param : 앞자리, 가운데, 뒷자리
*/
Util.prototype.isMobile = function (front, center, end) {
    var regExpFront =/(01[016789])$/;
    var regExpCenter =/([0-9]{3,4})$/;
    var regExpEnd =/([0-9]{4})$/;

    if(regExpFront.test(front)){
        if(regExpCenter.test(center)){
            if(regExpEnd.test(end)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }else{
        return false;
    }
}
/*
    이메일 형식 체크

    @param : id + domain
*/
Util.prototype.isEmail = function (data) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if(regExp.test(data)){
        return true;
    }else{
        return false;
    }
}
/*
    이름 형식 체크
    한글 2~6자 또는 영문 2~10자

    @param : 이름
*/
Util.prototype.isName = function (data) {
    var regExpKr = /^[가-힣]{2,6}$/;
    var regExpEn = /^[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;

    if(regExpKr.test(data)){
        // 한글
        return true;
    }else{
        if(regExpEn.test(data)){
            // 영어
            return true;
        } else {
            return false;
        }
    }
}
/*
    입력받을 항목 data 정규식 체크

    /^[0-9a-zA-Z가-힣\.\-\_]+$/
    : 숫자, 영소문자, 영대문자, '.', '-', '_' 만 사용가능 + 띄어쓰기 가능

    @param : data
*/
Util.prototype.isInputData = function (data) {
    var regExp = /^[0-9a-zA-Z가-힣\.\-\_\(\)\/\s]+$/;

    if(regExp.test(data)){
        return true;
    }else{
        return false;
    }
}
/*
    날짜 정규식 체크
    /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/
    3001 발급일자 체크용

    @param : data
*/
Util.prototype.isDate = function (data) {
    var regExp = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;

    if(regExp.test(data)){
        return true;
    }else{
        return false;
    }
}
/*
    win10 터치이벤트 환경에서 scroll시 k[10]
*/
Util.prototype.addScrollSendEvent = function (clsName) {
    $(clsName).on("touchmove",function(e){
        if($(this).scrollTop() % Math.round($(clsName).height()/100) == 0){
            ws_send("k[10]")
        }
    })
}

/*
  하나은행,국민은행 시재관리기 카운트
  
*/
let isWokingTimer = false;
let counter;

Util.prototype.startTimer = function(callback){
    if(!isWokingTimer) {
        console.log("■ Timer시작");
        counter = setInterval(callback, 1000);
        isWokingTimer = true;
    }
}

Util.prototype.stopTimer = function(){
    console.log('□ stopTimer');
    isWokingTimer = false;
    if(counter) {
        clearInterval(counter);
        counter = null;
    }
}
