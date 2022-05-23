/*****************************************************************************

   smc 요소에 사용가능한  s3002 화면의 텐키 클라스
   2016. 11. 29
   전기준 black™ (010-4255-3564)

***********************************************************************************/


function SMC_keyboard(max) { //해당 콘트롤러의 인덱스값을 받아옴.
	var minGab; //텐키 최소값
	var maxGab; //텐키 최대값
	var tenType;
	var selectNum;
	//smc7542 = false;
	var listArr; //s3002의 전체갯수를 가져옴
	/***********************************************************
	 *   배경이미지
	 ***********************************************************/
	var bgImg = $('<div><img src="./msg_kr/ten_s3002.png"></div>');
	bgImg.css({
		'position': 'absolute',
		'top': '100px',
		'left': '115px',
	})
	$('#smc_tenkey').append(bgImg);
	/***********************************************************
	*   확인 버튼

	***********************************************************/
	var confirm_btn = $('<div id="confirm"><img src="./btn_kr/ten_confirm.png"></div>');
	confirm_btn.css({
		'position': 'absolute',
		'top': '420px',
		'left': '45px',
	});
	$(bgImg).append(confirm_btn);
	$(confirm_btn).bind("touchstart mousedown", cc_f); //클릭이벤트 주기

	/***********************************************************
	 *   취소 버튼
	 ***********************************************************/
	var cancel_btn = $('<div  id="cancel"><img src="./btn_kr/ten_cancel.png"></div>');
	cancel_btn.css({
		'position': 'absolute',
		'top': '420px',
		'left': '127px',
	});
	$(bgImg).append(cancel_btn);
	$(cancel_btn).bind("touchstart mousedown", cc_f); //클릭이벤트 주기
	/***********************************************************
	 *   항목명
	 ***********************************************************/
	var title_txt = $('<div id="title_txt">여긴어디</div>');
	title_txt.css({
		'position': 'absolute',
		'top': '25px',
		'left': '47px',
		'color': '#000099',
		'font-size': '24px',
		'font-weight': 'bold',
		//'border':'solid 1px red',
		'font-family': fontIs('hb')
	});
	$(bgImg).append(title_txt);

	/***********************************************************
	 *   현재값
	 ***********************************************************/
	var nowdata_txt = $('<div id="nowdata_txt"></div>');
	nowdata_txt.css({
		'position': 'absolute',
		'top': '120px',
		'left': '110px',
		'color': '#cc6600',
		'font-size': '18px',
		'font-weight': 'bold',
		//'border':'solid 1px red',
		'font-family': fontIs('hb')
	});
	$(bgImg).append(nowdata_txt);

	/***********************************************************
	 *   설명글
	 ***********************************************************/
	var des_txt = $('<div id="des_txt"></div>');
	des_txt.css({
		'position': 'absolute',
		'top': '170px',
		'left': '53px',
		'color': '#222222',
		'width': '210px',
		'font-size': '18px',
		'font-weight': 'bold',
		//'border':'solid 1px red',
		'font-family': fontIs('hb'),
		'word-break': ' break-all' //자동개행
	});
	$(bgImg).append(des_txt);

	/***********************************************************
	 *   텐키값
	 ***********************************************************/
	var input_txt = $('<div id="input_txt"></div>');
	input_txt.css({
		'position': 'absolute',
		'top': '75px',
		'left': '53px',
		'color': '#ffffff',
		'width': '210px',
		'font-size': '22px',
		'font-weight': 'bold',
		'text-align': 'center',
		//'border':'solid 1px red',
		'font-family': fontIs('hb'),
		'word-break': ' break-all' //자동개행
	});
	$(bgImg).append(input_txt);


	/*****************************
	 * 텐키 표시 또는 가리기
	 *********************************/
	this.showIs = function (gab) {
		if (gab) {
			$('#smc_tenkey').show();
		} else {
			$('#smc_tenkey').hide();
		}
	}

	//텐키 그리기
	for (var i = 0; i < 41; i++) {
		var ten = $('<div id="ten' + i + '" class="tenBtn"></div> ');
		ten.css({
			'position': 'absolute',
			'top': ((Math.floor(i / 6) * 65) + 20) + 'px',
			'left': ((73 * (i % 6)) + 288) + 'px',
		})
		var tenTxt = $('<div id="tenText' + i + '">' + (i + 1) + '</div>');
		tenTxt.css({
			'position': 'absolute',
			'color': '#ffffff',
			'width': '68px',
			'height': '44px',
			'padding-top': '14px',
			'font-size': '32px',
			'font-weight': 'bold',
			'text-align': 'center',
			//'border':'solid 1px red',
			'font-family': fontIs('hb'),
		})
		var tenBg = $('<img src="./btn_kr/ten_btn.png">');
		if (i < 12) {
			if (i == 9) {
				$(tenTxt).text("0");
			} else if (i == 10) {
				$(tenTxt).text("-");
			} else if (i == 11) {
				$(tenTxt).text(".");
			}
		} else if (i == 38) { //space일경우
			$(tenTxt).text("SP");
		} else if (i == 39) { //back
			$(tenTxt).text("◀");
			ten.css({
				'left': ((73 * ((i + 1) % 6)) + 288) + 'px',
			})
			tenBg.attr('src', './btn_kr/ten_btn_red.png'); //주황버튼으로 변경
		} else if (i == 40) { //정정
			$(tenTxt).text("정정");
			tenTxt.css({
				'font-size': '26px',
				'padding-top': '17px'
			})
			ten.css({

				'left': ((73 * ((i + 1) % 6)) + 288) + 'px',
			})
			tenBg.attr('src', './btn_kr/ten_btn_red.png'); //주황버튼으로 변경
		} else {
			$(tenTxt).text(String.fromCharCode(i + 53));
		}
		$(ten).append(tenTxt);
		$(ten).append(tenBg);
		$(bgImg).append(ten);
		$(ten).bind("click", ten_f);
		ten = null;
		tenTxt = null;
		tenBg = null;
	}
	/**************************************************
	 *   텐키타입에 맞게 보여주기
	 *****************************************************/
	this.tenDraw = function (idxArr, idNum) {
		//console.log('idxArr : '+idxArr)
		//console.log('idNum : '+idNum)
		$("#title_txt").text(idxArr[idNum].title);
		$("#nowdata_txt").text($('#td' + idNum).text()); //현재값
		$("#des_txt").text(idxArr[idNum].des); //현재값
		$("#input_txt").text("");

		for (var i = 0; i < 41; i++) {
			$("#ten" + i).show();
		}

		if (idxArr[idNum].tenType == "2" || idxArr[idNum].tenType == "1") {

			for (i = 18; i < 38; i++) {
				$("#ten" + i).hide();
			}
			if (idxArr[idNum].tenType == "1") {
				//$("#ten11").hide();
				$("#ten10").hide();
				$("#ten38").hide();
			}
		} else if (idxArr[idNum].tenType == "0") {
			for (var i = 10; i < 39; i++) {
				$("#ten" + i).hide();
			}
		}
		selectNum = idNum; //리스트 배열번호 넣기
		maxGab = idxArr[idNum].max;
		//console.log('맥스 : ' + maxGab)
		tenType = idxArr[idNum].tenType; //텐타입을 변수에 넣기-1일경우 0x붙이기 위해
		listArr = idxArr;
		//console.log(idxArr[idNum].title + "," + idxArr[idNum].lastGab + "," + idxArr[idNum].des + "," + idxArr[idNum].tenType + "," + idxArr[idNum].min + "," + idxArr[idNum].max + "전체수:" + idxArr.length)
	}

	function ten_f() {
		var myTenBtn = $(this);
		var idNum = myTenBtn.prop("id").substring(3, myTenBtn.prop("id").length);
		//		console.log(tenType)
		var caption = $("#tenText" + idNum).text();

		clickFlag = true; //click시작
		var top = myTenBtn.css("top");
		myTenBtn.css({
			"opacity": "0.5",
			"top": (top + 2) + "px"
		}); //아래로 2픽셀내리고 반투명으로
		//        bleep.pause();//기존소리를 죽이고 새로...
		//        bleep.currentTime = 0;
		//        bleep.play(); //소리
		setTimeout(timeout, 100); //0.1초후에 눌림상태에서 복귀하기
		function timeout() {
			myTenBtn.css({
				"opacity": "1",
				"top": (top) + "px"
			});
			clickFlag = false;
			myTenBtn = null;
		};



		if (tenType == "0") {
			$("#input_txt").text($("#input_txt").text()) //.substring(2,$("#input_txt").text().length))
			//			console.log(tenType + ', ' + caption)
		}
		switch (caption) {
			case ".":
				$("#input_txt").append(".");
				break;
			case "◀":
				$("#input_txt").text($("#input_txt").text().slice(0, $("#input_txt").text().length - 1));
				break;
			case "정정":
				$("#input_txt").text("");
				break;
			case "SP":
				$("#input_txt").append(" ");
				break;
			default:

				if (maxGab == 0) {
					$("#input_txt").append(caption);
				} else {
					if ($("#input_txt").text().length < maxGab.length) {
						$("#input_txt").append(caption);
					}
				}

				//console.log($("#input_txt").text())
				break;
		}
		if (tenType == "1") {
			//$("#input_txt").text("0x"+$("#input_txt").text())
			$("#input_txt").text($("#input_txt").text())
		}

		console.log('ws.send(K[10])');
		ws.send('K[10]');
	}
	/**************************************************************
	 * 확인 또는 취소 클릭시
	 **********************************************************/
	function cc_f() {
		var mybtn = $(this);
		clickFlag = true; //click시작
		var top = mybtn.css("top");
		mybtn.css({
			"opacity": "0.5",
			"top": (top + 2) + "px"
		}); //아래로 2픽셀내리고 반투명으로
		//        bleep.pause();//기존소리를 죽이고 새로...
		//        bleep.currentTime = 0;
		//        bleep.play(); //소리
		setTimeout(timeout, 100); //0.1초후에 눌림상태에서 복귀하기
		function timeout() {
			mybtn.css({
				"opacity": "1",
				"top": (top) + "px"
			});
			clickFlag = false;
			/************************************
			 * 버튼처리 함수
			 *************************************/
			if (mybtn.prop('id') == "confirm") {
				//console.log(selectNum);
				$("#td" + selectNum).text($("#input_txt").text());
				//                var lastGab="[";
				//                for(var i=0;i<listArr.length;i++){
				//                    lastGab+=$("#td"+i).text();
				//                    if(i+1 != listArr.length)
				//                    lastGab+=";"
				//                }
				//                lastGab+="]"
				//                btnArr[1].breturn=lastGab;
			}
			mybtn = null;
			$('#smc_tenkey').hide();


			console.log('ws.send(K[10])');
			ws.send('K[10]');

			for (var i = 0; i < msgObj.msgArr.length; i++) {
				if(msgClassArr[i].iname = '7572'){
					msgClassArr[i].setReturnValue();
				}
				
			}
		};
		
	}



}