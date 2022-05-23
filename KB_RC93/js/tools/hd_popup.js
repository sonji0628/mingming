/*****************************************************************************

국민은행 시재관리기 셀프키오스크
- 팝업 스크립트 호출

***********************************************************************************/

"use strict";
function hdPopup() { // body에서 호출하는 함수
  let thisPopNum = 0;
  $("[data-popopen]").on("touchstart mousedown", function(e){
    if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
    if(e.type=="mousedown" && mFlag)return true;

    thisPopNum = $(this).attr("data-popopen");
    $("[data-popnum='" + thisPopNum + "']").addClass("active");
    ws_send("k[10]");
  });

  $(".alert_pop .close").on("touchstart mousedown", function(e){
    if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
    if(e.type=="mousedown" && mFlag)return true;

    $("[data-popnum='" + thisPopNum + "']").removeClass("active");
    ws_send("k[10]");
  });
}
