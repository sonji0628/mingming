/*
  팝업생성 클래스
  전역변수로 선언된 popup에서 execute함수 호출하면 됨.
  파라미터는 제목 / 내용 / 유지시간
  ex ) popup.execute('제목','팝업창 내용',30);

  ver 1.0.0.0 - 최초작성
  ver 1.0.0.1 (2021.03.16) - popup 종료함수를 call_f2 에서 여기로 가져옴, cyg
*/
"use strict";
function ATEC_popup() {
  this.execute = function(title, content, timer) {
    let pop_time = parseInt(timer);
    let popupInterval ; // inerval 함수 변수

    $('body').append($('<div id="popup_background_div_black" class="popup"></div>'));// 투명한 검은색 바탕

    $("#popup_background_div_black").append($('<div id="popup_background_div_white" class="popup"></div>')); // 흰색 창
   
    $("#popup_background_div_white").append($('<span id="popup_title" class="popup popup_txt">' + title + '</span>')); // 팝업창 타이틀

    $("#popup_background_div_white").append($('<img id="popup_line" class="popup" src="msg_kr/HY_612line.png">'));// 타이틀 라인

    $("#popup_background_div_white").append($('<span id="popup_content" class="popup popup_txt">'+content+'</span>'));  // 팝업창 내용

    if(title == ' 입 금 주 의') {
      $("#popup_background_div_white").append($('<span id="popup_warning_text" class="popup popup_txt">해당 권종은 입금하실 수 없습니다.</span>'));  // 팝업창 내용
    }

    $("#popup_background_div_white").append($('<div id="popup_timer" class="popup">'+(pop_time--)+'초 후 자동으로 닫힙니다.<div>')); // 타이머 표시

    $("#popup_background_div_white").append($('<div id="popup_close_btn" class="popup"><div>')); // 닫기 영역

    $("#popup_close_btn").append($('<img id="popup_close_btn2" class="popup" src="btn_kr/HY_430btnWhite.png">')); // 닫기이미지

    $("#popup_close_btn").append($('<span id="popup_close_txt" class="popup">닫기</span>')); // 닫기 텍스트





    popupInterval = setInterval(function () {
        if (pop_time > 5) {
            $('#popup_timer').text(pop_time+'초 후 자동으로 닫힙니다.');
        } else {
            $('#popup_timer').text(pop_time+'초 후 자동으로 닫힙니다.');
        }
        //console.log(second);
        if (pop_time != 0) {
            pop_time--;
        } else {
            //console.log("리턴값 발생함, 자동로그아웃 시도됨!!! X[X]");
            ws.send('k[10]');
            $("#popup_background_div_black").remove();
            clearInterval(popupInterval);
        }
    }, 1000);

    
    intervalArr.push(popupInterval)


    $("#popup_close_btn").on('click', function() { // 닫기 버튼 이벤트
      ws.send('k[10]');
      $("#popup_background_div_black").remove();
      clearInterval(popupInterval);
    });
  }
}


// call_f2 에서 여기로 이동함.
function destroyATEC_Popup()
{
  $("#popup_background_div_black").remove(); // 팝업 종료
  intervalArr.forEach((element,index) => { // interval clear
      clearInterval(element)
  });
  intervalArr = [];
}
