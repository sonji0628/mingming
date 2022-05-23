/*************************************************************************************
    FileName			:	showCalendar.js
    Description			:	wide screen 을 사용할때, 화면 좌측에 칼렌터를 표시하는 기능
                             - 화면이 wide screen 이면 "LBanner-container" 영역에 칼렌터 표시
                             - 칼렌더의 날짜 변경을 위해 10분 간격으로 함수 호출함
	Created Date		:	2021.02.23
	Created By			:	ATEC AP, cyg
    Revision History	:	
             ver 1.0.0.0 - 최초작성
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

// 화면 해상도를 판단하여 LBanner 필요하면, calendar 를 생성함
function initCalendar()
{
    // 브라우저 해상도 검사
    console.log(`브라우저 외부 넖이=${window.outerWidth}, 높이=${window.outerHeight}<br>`);
    console.log(`브라우저 내부 넖이=${window.innerWidth}, 높이=${window.innerHeight}<br>`);

    if( (window.innerWidth / window.innerHeight ) >  (4.5/3) )
    {
        console.log ("wide screen: LBannker 에 칼렌더 생성함");
        createCalendar();
        buildCalendar();
        $("#LBanner-container").show();
        $("#container").css({'position':'absolute', 'left': '255px', 'top':'0px'});
    }
    else
    {
        console.log ("표준 스크린: LBannker 생성하지 않음");
        $("#LBanner-container").hide();
        $("#container").css({'position':'absolute', 'left': '0px', 'top':'0px'});

    }
    

}

// 칼렌더를 표시하기 위한 초기화 함수
function createCalendar()
{
    // 칼렌더를 그리기 위한 html 삽입 문장
    let html = `
    <table id = "calendar" >
        <tr id = "cal-Head" >
            <td colspan="7" > 
                <div id="cal-Head-LeftSide">
                    <div id="cal-Head-Year" ></div>
                    <div id="cal-Head-MonthEng" ></div>
                </div>
                <div id="cal-Head-RightSide">
                    <div id="cal-Head-Month" ></div>
                    
                </div>
            </td> 
        </tr>
        <tr class = "cal-Body">
            <td class="cal-sun">일</td>
            <td class="cal-day">월</td>
            <td class="cal-day">화</td>
            <td class="cal-day">수</td>
            <td class="cal-day">목</td>
            <td class="cal-day">금</td>
            <td class="cal-sat">토</td>
        </tr>
    </table>`;

    // 구조를 동적으로 생성함
    $("#LBanner-container").append(html);
}

// 칼렌더 생성 함수
function buildCalendar()
{
    let today = new Date(); // 오늘 날짜
    let date = new Date();

    console.log("달력 그리기" + today + ":" + today.getMilliseconds());

    let nMonth = new Date(today.getFullYear(), today.getMonth(), 1); //현재달의 첫째 날
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //현재 달의 마지막 날
    let tbcal = document.getElementById("calendar"); // 테이블 달력을 만들 테이블
    
    let year = document.getElementById("cal-Head-Year");     // 년도 출력할 곳
    year.innerHTML = today.getFullYear();

    let month = document.getElementById("cal-Head-Month");   // 월 출력할 곳
    month.innerHTML = (today.getMonth()+1).toString(10).padStart(2,'0');

    let monthEng = document.getElementById("cal-Head-MonthEng"); // 영문 월 출력할 곳
    let monthStringEng = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthEng.innerHTML = monthStringEng[today.getMonth()]; 

    // 남은 테이블 줄 삭제
    while (tbcal.rows.length > 2) 
    {
        tbcal.deleteRow(tbcal.rows.length - 1);
    }
    let row = null;
    row = tbcal.insertRow();
    row.className = "cal-Body";

    let cnt = 0;

    // 1일 시작칸 찾기
    for (i = 0; i < nMonth.getDay(); i++) 
    {
        cell = row.insertCell();
        cnt = cnt + 1;
    }

    // 달력 출력
    for (i = 1; i <= lastDate.getDate(); i++) // 1일부터 마지막 일까지
    { 
        cell = row.insertCell();
        cnt = cnt + 1;

        // 날짜 표시용 class 변수
        let classToday="";
        let classWeek="";

        // 오늘 인지 판단함
        classToday="";
        if(today.getFullYear()==date.getFullYear()&&today.getMonth()==date.getMonth()&&i==date.getDate()) 
        {
            // 오늘 지정하는 클래스 변수
            classToday = " cal-today";
        }


        // 요일별 날짜 출력
        if (cnt % 7 == 1)  //일요일 계산
        {
            classWeek = "cal-sun"; //일요일 색
            cell.innerHTML = `<div class="${classWeek}${classToday}"> ${i} </div>` ;
        }
        else if (cnt % 7 == 0)  // 1주일이 7일 이므로 토요일 계산
        {
            classWeek = "cal-sat";  // 토요일 색
            cell.innerHTML = `<div class="${classWeek}${classToday}"> ${i} </div>` ;

            row = calendar.insertRow();// 줄 추가
            row.className = "cal-Body";
            
        }
        else // 평일
        {
            classWeek = "cal-day";      // 평일 색
            cell.innerHTML = `<div class="${classWeek}${classToday}"> ${i} </div>` ;
        }

    }

    // 빈 라인 1개 추가
    row = tbcal.insertRow();
    cell = row.insertCell();
    cell.innerHTML = `<div class="cal-end">*</div>` ;


    // 10분 간격으로 칼렌더를 다시 그린다
    setTimeout(function() {
        buildCalendar();
        }, 1000*60*10);

}

