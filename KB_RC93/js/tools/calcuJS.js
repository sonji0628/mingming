// INIT
;
(function ($, window, document, undefined) {
	'use strict';

	var UTIL = new Util();
	// helpers
	function _id(e) {
		return document.getElementById(e);
	}

	function _e(e) {
		return document.querySelector(e);
	}

	function _ee(e) {
		return document.querySelectorAll(e);
	}

	function _for(e, f) {
		var i, len = e.length;
		for (i = 0; i < len; i++) {
			f(e[i]);
		}
	}

	function log(e, before) {
		before = before || '';
		//console.log(before + e);
	}

	function _hasClass(el, selector) {
		var className = " " + selector + " ";
		if ((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
			return true;
		} else {
			return false;
		}
	}


	// user select/click action
	function userSelect(e, main, month, year) {
		//console.log('userSelect Action! ');
		var sel1 = _id('sel1'),
			sel2 = _id('sel2');

		var isDisabled = _hasClass(e, 'disabled');
		var isDimd = _hasClass(e, 'notCurMonth'); // 딤드처리되었으면 true/ 아니면 false
		var isDimd2 = _hasClass(e, 'always_disabled'); // allways_딤드 true/ 아니면 false
		//		console.log('무엇'+isDisabled);
		// first doesnt exist
		if (sel1 != null) {
			console.log("(sel1 != null)")
			var td = e.parentNode.parentNode.querySelectorAll('td');
			_for(td, function (e) {
				e.classList.remove('range', 'disabled');
			});

			//			sel1.removeAttribute('class');
			sel1.classList.remove('sel1')
			sel1.removeAttribute('id');
			if (sel2 != null) {
				sel2.removeAttribute('class');
				sel2.removeAttribute('id');
			}
		}

		//if (sel1 === null && !isDisabled && !isDimd2) {
		if (!isDimd && !isDimd2) { // 딤드되지 않은 버튼을 눌렀을 때
			//console.log('처음 날짜를 눌렀을 때');

			e.id = 'sel1';
			e.classList.add('sel1');
			// 선택 일 이후 날이 딤드 처리 되지 않아 임시로 클릭시 딤드처리 주석 // 신성철 4/25
			//$(e).parent().prevAll('tr').find('td').addClass('disabled'); // ugly code
			//$(e).prevAll('td').addClass('disabled'); // ugly code
			//log('select second option');

			// temp
			if (_id('out1') === null) {
				$('#cal').after('<i id="out1"></i>');
			}
			_id('out1').innerHTML = '<br>Selected 1: ' + year + '/' + (month + 1) + '/' + e.innerText;
			// _id('sel1text').innerHTML = e.innerText + '-' + month + '-' + year;

			if (month.toString().length == 1) {
				month = '0' + month;
			}
			//			if (e.innerText.length == 1) {
			//				e.innerText = '0' + e.innerText;
			//			}

			var txtMonth = (Number(month) + 1).toString();
			var txtDay = e.innerText;
			if (txtMonth.length == 1) {
				txtMonth = '0' + txtMonth;
			}
			if (txtDay.length == 1) {
				txtDay = '0' + txtDay;
			}


			btnArr[1].dimd = "0"; // 날짜 클릭시 0으로 바꿈
			//console.log('ws.send(k[10]');
			ws.send('k[10]');
		
			UTIL.setReturnBtn("=["+year + txtMonth + txtDay+"]",'ret')
			//console.log(sendData);


			$('#totalCalContatiner').remove();
		}


	} //userSelect(e);


	$('#btnClose').click(function () {
		//console.log('닫기 버튼 눌림, ws.send(k[10])동작시킴');
		ws.send('k[10]');

		$('#totalCalContatiner').remove();
	});

	$('#btnToday').click(function () {
	    bleep.pause();//기존소리를 죽이고 새로...
        bleep.currentTime = 0;
        bleep.play(); //소리
		var date = new Date();
		var todayDate;
		if (date.getMonth.toString().length != 2) { // 만약 월의 숫자의 길이가 2가 아닌경우(1자리 숫자인경우)
			todayDate = "" + date.getFullYear() + "0" + (date.getMonth() + 1) + date.getDate();
			if (date.getDate().toString().length != 2) { // 만약 일의 숫자의 길이가 2가 아닌경우 (1자리 숫자인경우)
				todayDate = "" + date.getFullYear() + "0" + (date.getMonth() + 1) + "0" + date.getDate();
			}
		} else if (date.getDate().toString().length != 2) {
			todayDate = "" + date.getFullYear() + (date.getMonth() + 1) + "0" + date.getDate();
		} else {
			todayDate = "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
		}
		console.log("=[" + todayDate + "]")
		ws.send("=[" + todayDate + "]");
		$('#totalCalContatiner').remove(); // 리턴만 날리고 그 후에 달력이 종료되지 않는 문제 때문에 해당 구문 추가함.
	});
	/*-----------------------------------------------------

		GET MONTH DATA

	-----------------------------------------------------*/

	function getMonth(month, year) { //  year와 month 순서가 바뀌어있었음

		/* Expects month to be in 1-12 index based. */
		var monthInformation = function (year, month) {
			/* Create a date. Usually month in JS is 0-11 index based but here is a hack that can be used to calculate total days in a month */
			var date = new Date(year, month + 1, 0); // 0이 1월이였는데 객체의 파라미터로는 +1 해줘야한다.
			//		console.log('year : '+ year + ', month : ' + month);
			/* Get the total number of days in a month */
			this.totalDays = date.getDate();
			/* End day of month. Like Saturday is end of month etc. 0 means Sunday and 6 means Saturday */
			this.endDay = date.getDay();
			date.setDate(1);
			/* Start day of month. Like Saturday is start of month etc. 0 means Sunday and 6 means Saturday */
			this.startDay = date.getDay();
			/* Here we generate days for 42 cells of a Month */
			var days = new Array(42); // 한 달에 표시할 42개의 셀
			/* Here we calculate previous month dates for placeholders if starting day is not Sunday */
			var prevMonthDays = 0; // 이전 달의 날짜
			var prevMonth = new Date(year, month, 0);
			//			console.log('month에서 바로 ' + prevMonth.getMonth());
			prevMonth.setMonth(prevMonth.getMonth());
			if (this.startDay !== 0) prevMonthDays = prevMonth.getDate() - this.startDay;
			/* This is placeholder for next month. If month does not end on Saturday, placeholders for next days to fill other cells */
			var count = 0;
			// 42 = 7 columns * 6 rows. This is the standard number. Verify it with any standard Calendar
			for (var i = 0; i < 42; i += 1) {
				var day = {};
				/* So start day is not Sunday, so we can display previous month dates. For that below we identify previous month dates */
				if (i < this.startDay) {
					//					day.date = (prevMonthDays = prevMonthDays + 1);
					day.date = "";
					/* belong to next month dates. So, month does not end on Saturday. So here we get next month dates as placeholders */
				} else if (i > this.totalDays + (this.startDay - 1)) {
					//					day.date = (count = count + 1);
					day.date = "";
					/* belong to current month dates. */
				} else {
					day.date = (i - this.startDay) + 1;
				}
				days[i] = day.date;
			}
			this.days = days;
		};

		/* Usage below */
		var m = {};
		monthInformation.call(m, year, month);


		var days = m.days,
			startDay = m.startDay,
			endDay = m.endDay,
			totalDays = m.totalDays,
			len = days.length,
			key, str = '',
			i = 0,
			t = $('#t');

		str += '<table>';
		str += '<thead><tr><th style="color:red;">일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th style="color:blue;">토</th></tr></thead><tbody>';

		var tempKey = 0;
		var nowDate = new Date();
		var nMonth = nowDate.getMonth();
		var nDate = nowDate.getDate();
		var nYear = nowDate.getFullYear();
		for (key in days) {
			i++;

			if (i === 1) str += '<tr>';

			if (key < startDay) { // || key >= totalDays
				str += '<td class="notCurMonth"><i>' + days[key] + '</i></td>';
			} else {
				//console.log('key : ' + key + ', staryDay :' + startDay + 'days[key] : ' + days[key]);
				if (tempKey > days[key]) {
					//					str += '<td class="notCurMonth"><i>' + days[key] + '</i></td>';
					//					str += '<td class="notCurMonth"><i></i></td>';
					//console.log('i는 ' + i);
				} else {
					//console.log('i는 ' + i);
					tempKey = days[key];
					//console.log(year)
					//console.log(nYear)
					// 2021-08-20 : nYear == year and조건 추가
					if (nYear == year && nMonth == month && days[key] > nDate) { // 현재 달 오늘 날짜 이후 딤드
						str += '<td class="always_disabled" style="font-weight:bold; filter:grayscale(1) opacity(0.3);"><i style="font-style: normal;">' + days[key] + '</i></td>';
					} else if ((nMonth < month && nYear <= year) || (nYear < year)) {
						str += '<td class="always_disabled" style="font-weight:bold;"><i style="font-style: normal;">' + days[key] + '</i></td>';
					} else { // 오늘 날짜 이전의 날짜들
						if (i == 1) { // 일요일이므로 빨간색
							str += '<td class="sun" style="font-weight:bold; color:red;"><i style="font-style: normal;">' + days[key] + '</i></td>';
						} else if (i == 7) { // 토요일이므로 파란색
							str += '<td class="sat" style="font-weight:bold; color:blue;"><i style="font-style: normal;">' + days[key] + '</i></td>';
						} else {
							str += '<td style="font-weight:bold;"><i style="font-style: normal;">' + days[key] + '</i></td>';
						}
					}
				}

			}

			if (i === 7) {
				str += '</tr>';
				i = 0;
			}

		}
		str += '</tbody></table>';
		$('#cal').append(str);



	} // end getMonth()

	// months array (0 based index)
	var monthArr = [
		'1월',
		'2월',
		'3월',
		'4월',
		'5월',
		'6월',
		'7월',
		'8월',
		'9월',
		'10월',
		'11월',
		'12월'
	]

	/* INIT */
	var date = new Date();
	var month = date.getMonth(),
		year = date.getFullYear();
	getMonth(month, year);
	//	$('#month').text(year + '년 ' + monthArr[month - 1]);
	$('#month').text(year + '년 ' + monthArr[month]); // month == 0이 1월이기 때문에

	function bind(month, year) {
		var tb = _id('cal');
		$(tb).on('click', 'td:not(".always_disabled")', function () {
			userSelect(this, null, month, year);
			UTIL.btnDimd(0, 'ret');
			bleep.pause();//기존소리를 죽이고 새로...
            bleep.currentTime = 0;
            bleep.play(); //소리
		});

		// next month
		$('#disp').on('click', 'div', function () {

			var t = this;
			if (t.id == 'next') {
			    bleep.pause();//기존소리를 죽이고 새로...
                bleep.currentTime = 0;
                bleep.play(); //소리
                UTIL.btnDimd(1, 'ret');
				if (date.getMonth().toString() <= month && year == date.getFullYear()) {
					//console.log('-> 눌렀을 때 ws.send(k[10])');
					ws.send('k[10]');
				}
				else {
					//console.log('-> 눌렀을 때 ws.send(k[10])');
					ws.send('k[10]');
					month++;
				}
				if (month > 11) {
					year++;
					month = 0;
				} // switch year and reset month
			} else if(t.id == "prev") {
			    bleep.pause();//기존소리를 죽이고 새로...
                bleep.currentTime = 0;
                bleep.play(); //소리
                UTIL.btnDimd(1, 'ret');
				//console.log('<- 눌렀을 때 ws.send(k[10])');
				ws.send('k[10]');
				month--;
				if (month < 0) {
					year--;
					month = 11;
				} // switch year and reset month
			} else if(t.id == "month") {
			    return;
			}

			$('table').remove();
			//console.log('getmonth 보내기 전 0부터 시작하는 month : ' + month);
			getMonth(month, year);
			//			$('#month').text(year + '년 ' + monthArr[month - 1]);
			$('#month').text(year + '년 ' + monthArr[month]);

		})

	};


	bind(month, year);

})(jQuery, window, document); // end() init
