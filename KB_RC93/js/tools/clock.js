/*
    2019 01 08
    시계 클래스
    10초마다 갱신되도록 구현
*/

"use strict";
function realTime() { // body에서 호출하는 함수
  const today = new Date();
  time_input(today)
}

function time_input(today) { // 오늘날짜에 대한 정보를 구하고 html에 삽입
  let year = today.getFullYear();
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 일
  let hour = today.getHours(); // 시
  let minute = today.getMinutes(); // 분
  const dateArr = new Array('일', '월', '화', '수', '목', '금', '토');
  let day = dateArr[today.getDay()]; //요일
  let ampm = hour > 11 ? (function(){ hour = hour == 12 ? 12 : (hour - 12); return "오후"; } )() : "오전" ;

  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }

  $('.ampm').text(ampm);
  $('.time').text(hour + ":" + minute);
  $('.mm-dd').text(month + "월 " + date + "일(" + day + ")");
  //$('.day').text('(' + day + ')')

  setTimeout(function () { // 10초마다 realTime함수를 호출하여 화면에 보여지는 시간이 갱신됨, 계속 해서 시간이 갱신되도록
    realTime();
  }, 10000);
}
