/***********************************************************************
공통클라스 정리함
1. 로그
2. 딤드처리
3. 팝업

2018.07.18 - 전기준 black™

Revision History
    ver 1.0.0.0 - 최초작성
    ver 1.0.0.1 (2021.02.15) - lgcns 변수선언을 common 에서 여기로 이동함
************************************************************************/

let lgcns={};   //LG_CNS패키지선언

//딤드 클라스시작
lgcns.dimmed=function(){
    var dimdIs = ""; //회색으로
    var opacityIs = "";//반투명하게
    var brightIs="";//밝기
    this.startDim=function(obj){    
        dimdIs = 'grayscale(100%)';
        opacityIs = 'opacity(30%)';
        brightIs = 'brightness(1.4)';
        obj.dimmed="1";//xml객체는 값 변경 안됨.
        actionDim(obj);
    }
    this.endDim=function(obj){        
        dimdIs = 'grayscale(0%)';
        opacityIs = 'opacity(100%)'
        brightIs = 'brightness(1)';
        obj.dimmed="0";//xml객체는 값 변경 안됨.
        actionDim(obj);
    }
    function actionDim(myobj){
        $(myobj).css({                                                           
            '-webkit-filter': dimdIs + ' ' + opacityIs +' ' + brightIs
        });
    }
}



//로그아웃 타이머 클라스시작
lgcns.GlobalTimer=function(){
    
    
    var logoutTimer;//로그아웃 타이머 변수
    var logoutSec;//로그아웃 타이머
    var logoutT;//타임아웃 스트링 변수
   
    this.logoutText;//외부에서 받아올 텍스트필드 아이디
    
    this.globalTStart=function(gab){
        logoutT=this.logoutText; //표시할 텍스트 필드를 스트링 변수에 넣는다.
        
        logoutSec=gab;
        this.firstTime=gab;
        clearTimeout(logoutTimer);
        logoutTimer=setTimeout(lotimer_f,1000);
        lotimer_f()
    }
   
    this.globalTEnd=function(){ //로그아웃 타이머 멈추는 메서드
        clearTimeout(logoutTimer);
    }
    this.globalTContinue=function(){
        clearTimeout(logoutTimer);
        logoutTimer=setTimeout(lotimer_f,1000);
        lotimer_f()
    }
    function lotimer_f(){
        clearTimeout(logoutTimer);
        logoutSec--
        //msec++
        var bun=Math.floor(logoutSec/60)
        var cho=logoutSec-(bun*60);
        if(cho<10){
            cho="0"+String(cho)
        }
        $("#"+logoutT).text(bun+":"+cho);
        if(!eventFlag){//버튼대기 상태일때만 동작하는걸로
            if(logoutSec!=0){
                logoutTimer=setTimeout(lotimer_f,1000);
            }else{
                //ws_send("X[login]");
                ws_send("j[j]");
                eventFlag = true;
                /*
                for(i=0;i<msgClassArr.length;i++){
                    if(msgClassArr[i].iname=="gnb"){  //iname에 맞는 msgClassArr 필드를 찾기   
                        ws_send(msgClassArr[i].param.split("|")[1]);//파라미터로 받아온 값을 리턴값으로 넘기기
                        break;
                    };
                }
                */
            }
        }
        
    }
}
//글로벌 타이머 예제
//var globalTimer=new lgcns.GlobalTimer();
//globalTimer.logoutText="loginTimerText"
//globalTimer.globalTStart(70);