/*****************************************************************************

국민은행 시재관리기 셀프키오스크
- 입력 박스 위치 조절 및 기능 설정

***********************************************************************************/
"use strict";
for (var i = 0; i < cmArr.length; i++) {
  if (cmArr[i].class == "input_clear") { //요기 바꿔주고
    cmArr[i].jsObj = new input_clear(Number(cmArr[i].index)); //요기 바꿔주고
    cmArr[i].jsObj.evt();
    //LG_CNS.log("SMC_header클래스 추가"); //요기 바꿔주고
  }
}


function input_clear(ind) { //해당 콘트롤러의 인덱스값을 받아옴.
  this.iname = $(cmArr[ind].xmlObj).attr("iname");
  this.evt = function () {
    let inputClearBtn = $('<button class="input_clear_btn">정정</button>'),
        inputClearBtnZ = $(".hd_ten_input").css("z-index")*1 + 1,
        inputClearBtnL = $(".hd_ten_input").css("left").replace(/[^0-9]/g, "")*1 + $(".hd_ten_input").innerWidth() - 70,
        inputClearBtnT = $(".hd_ten_input").css("top").replace(/[^0-9]/g, "")*1 + 15;

    inputClearBtn.css({
      "z-index": inputClearBtnZ,
      "left": inputClearBtnL,
      "top": inputClearBtnT
    });

    $('#cm'+ind).append(inputClearBtn);
    $(".input_clear_btn").on("touchstart mousedown",function(e){
        if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
        if(e.type=="mousedown" && mFlag)return true;
        
        tenClass.cal("clear", tenClass.dxtIndex);
        ws_send("k[10]");
    });
  }

  this.callF = function (gab) {
  }
}
