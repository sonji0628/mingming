/*****************************************************************************

국민은행 시재관리기 셀프키오스크
- 상단 지점명-층수-기기번호 출력

***********************************************************************************/
"use strict";
for (var i = 0; i < cmArr.length; i++) {
  if (cmArr[i].class == "myAmount10103") { //요기 바꿔주고
    cmArr[i].jsObj = new ATEC_myAmount10103(Number(cmArr[i].index)); //요기 바꿔주고
    cmArr[i].jsObj.evt();
  }
}

function ATEC_myAmount10103(ind) { //해당 콘트롤러의 인덱스값을 받아옴.
  this.iname = $(cmArr[ind].xmlObj).attr("iname");
  let evtParam = $(cmArr[ind].xmlObj).attr("param");//초기 파라미터값 넣어주기  

  this.evt = function () {
    console.log("(전처리)evt 파라미터는 : ☞   " + evtParam + "   ☜ 잘넘어옴, iname" + this.iname);
    this.callF(evtParam);
  }

  this.callF = function (gab) {
    console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);
        if("" != gab) {
            $("#dxt1").text(myComma.pComma(gab));
        }
    
  }
}
