/*****************************************************************************

   msg 요소에 사용가능한 광고부 하단 status 클라스
   2016. 03. 09
   전기준 black™ (010-4255-3564)

***********************************************************************************/


var myT
var yy
var clickbtnid
var mybtn

function ClickEvt(ind){  //해당 콘트롤러의 인덱스값을 받아옴.
    mybtn=btnArr[ind]
    if (!eventFlag && ("0" == mybtn.dimd)) { //다른게 눌리지 않아야지 됨, 딤드된 버튼은 눌리지 않아야지 됨
        clickbtnid=ind
        clickFlag = true;//click시작
        eventFlag = true
        
        ws.send(mybtn.breturn);

        yy = mybtn.yy 

        document.getElementById('btn'+ind).style.opacity='0.5'
        document.getElementById('btn'+ind).style.top=(yy + 2) + 'px'
        //$('#btn'+ind).css({ "opacity": "0.5", "top": (yy + 2) + "px" });//아래로 2픽셀내리고 반투명으로    


        mybtn=null
        bleep.pause();//기존소리를 죽이고 새로...
        bleep.currentTime = 0;
        bleep.play(); //소리

        myT=setTimeout(btnTimeout, 100);//0.1초후에 눌림상태에서 복귀하기
    }
} 

function btnTimeout() {
      document.getElementById('btn'+clickbtnid).style.opacity='1'
      document.getElementById('btn'+clickbtnid).style.top=(yy) + 'px'
      //$('#btn'+clickbtnid).css({ "opacity": "1", "top": (yy) + "px" });
      clickFlag = false;
       clearTimeout(myT) 
       myT=null
       yy=null
       clickbtnid=null
}



                