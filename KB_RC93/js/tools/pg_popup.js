/*****************************************************************************

국민은행 시재관리기 셀프키오스크
- 사용안내 팝업 스크립트 호출

***********************************************************************************/

"use strict";

function pgPopup(num){
  $(".page_guide_btn").on("touchstart mousedown", function(e){
    if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
    if(e.type=="mousedown" && mFlag)return true;

    
    $(".page_guide_pop[data-gpopnum='" + num + "']").addClass("active");
    
    ws_send("k[10]");
  });

  $(".page_guide_pop .close").on("touchstart mousedown", function(e){
    if(e.type=="touchstart")mFlag=true; //터치가 되면 다음부터는 터치만 체크
    if(e.type=="mousedown" && mFlag)return true;

    $(this).parents(".page_guide_pop").removeClass("active");
    ws_send("k[10]");
  });
}