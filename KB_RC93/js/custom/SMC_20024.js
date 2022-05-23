/*************************************************************************************
    FileName			:	SMC_20024.js
    Description			:	전자저널
    Created Date		:	2020.04.29
    Created By			:	ATEC AP, (왕장원)
    Revision History	:	
             ver 1.0.0.0 (2020.04.29) - 최초작성
             ver 1.0.0.2 (2021.11.09) - 국민은행모출납기 -> 국민은행 시재관리기 버전으로 수정(손지민)
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

"use strict";
for (let i = 0; i < cmArr.length; i++) {
	if (cmArr[i].class == "20024") { //요기 바꿔주고
		cmArr[i].jsObj = new SMC_20024(Number(cmArr[i].index)); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

// 전자저널 신규 페이지 제작 2020-04-29 왕장원


function SMC_20024(ind) {
	this.iname = $(cmArr[ind].xmlObj).attr("iname");
    let evtParam = $(cmArr[ind].xmlObj).attr("param");
    $("#cm"+ind).css({"display": "flex","justify-content": "center","align-items": "flex-end","width": "1024px","height": "768px","padding-bottom":"110px"})

    $(".confirm").hide();
    let dateTimeSetFlag = false;
    let receiptSetReturn;

    let getDate = ["", ""];
    let listCount = 0;
    let getCount = 0;

    let pageCount = [1, 0];

    let leftFlag = false;
    let rightFlag = false;

    let fullData = [];
    let setTimeCount;

	this.evt = function () {
        evtParam = evtParam.split("|");

        getDate[0] = evtParam[0].toString();
        getDate[1] = evtParam[1].toString();
        listCount = parseInt(evtParam[2]);

	    $("#cm"+ind).append('<div class="journal_wrapper">'
                            +'  <div class="journal_date">검색기간 : '+getDate[0].substring(0, 4)+'-'+getDate[0].substring(4, 6)+'-'+getDate[0].substring(6, 8)+' ~ '+getDate[1].substring(0, 4)+'-'+getDate[1].substring(4, 6)+'-'+getDate[1].substring(6, 8)+'<div class="journal_date_research">기간 변경</div></div>'
                            +'  <div class="journal_search">'
                            +'      <div class="journal_search_text">검색 조건 설정</div>'
                            +'      <div class="searchWrap">'
                            +'          <div class="journal_search_btn all_select journal_search_btn_selected">전체조회</div>'
                            +'          <div class="journal_search_btn journal_search_btn_selected">입금</div>'
                            +'          <div class="journal_search_btn journal_search_btn_selected">출금</div>'
                            +'          <div class="journal_search_btn journal_search_btn_selected">장애</div>'
                            +'          <div class="journal_search_btn journal_search_btn_selected">보충</div>'
                            +'          <div class="journal_search_btn journal_search_btn_selected">회수</div>'
                            +'          <div class="journal_search_btn journal_search_btn_selected">마감</div>'
                            +'          <div class="journal_search_btn journal_search_btn_selected">NG</div>'
                            +'          <div class="journal_search_btn journal_search_btn_selected">조작중취소</div>'
                            +'      </div>'
                            +'  </div>'
                            +'  <div class="journal_list_title_line">'
                            +'      <div class="journal_list_title_num">거래일련번호</div>'
                            +'      <div class="journal_list_title_date">거래일시</div>'
                            +'      <div class="journal_list_title_type">거래종류</div>'
                            +'      <div class="journal_list_title_result">결과</div>'
                            +'      <div class="journal_list_title_money">금액</div>'
                            +'      <div class="journal_list_title_id">직원ID</div>'
                            +'  </div>'
                            +'  <div class="journal_list_wrap">'
                            +'  </div>'
                            +'</div>'
                            +'<div class="journal_list_navi nextPrevBtn_area"></div>'
                            +'<div class="journal_list_popup">'
                            +'  <div class="journal_list_popup_box">'
                            +'          <div class="journal_list_popup_title">'
                            +'              <div class="journal_list_popup_title_num">거래일련번호 : <span></span></div>'
                            +'              <div class="journal_list_popup_title_date"></div>'
                            +'          </div>'
                            +'      <div class="journal_list_popup_data">'
                            +'          <div class="journal_list_popup_table">'
                            +'              <div class="journal_list_popup_table_box">'
                            +'                  <div class="journal_list_popup_table_title">거래 종류</div>'
                            +'                  <div class="journal_list_popup_table_data"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box">'
                            +'                  <div class="journal_list_popup_table_title">결과</div>'
                            +'                  <div class="journal_list_popup_table_data"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box">'
                            +'                  <div class="journal_list_popup_table_title">금액</div>'
                            +'                  <div class="journal_list_popup_table_data"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box">'
                            +'                  <div class="journal_list_popup_table_title">직원 ID</div>'
                            +'                  <div class="journal_list_popup_table_data"></div>'
                            +'              </div>'
                            +'          </div>'
                            +'          <div class="journal_list_popup_table cashInfo">'
                            +'              <div class="journal_list_popup_table_box">'
                            +'                  <div class="journal_list_popup_table_title"></div>'
                            +'                  <div class="journal_list_popup_table_counter journal_bg_gray">잔량</div>'
                            +'                  <div class="journal_list_popup_table_counter journal_bg_gray">거래 매수</div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box cashData">'
                            +'                  <div class="journal_list_popup_table_title">오만원</div>'
                            +'                  <div class="journal_list_popup_table_counter remain"></div>'
                            +'                  <div class="journal_list_popup_table_counter amount"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box cashData">'
                            +'                  <div class="journal_list_popup_table_title">만원</div>'
                            +'                  <div class="journal_list_popup_table_counter remain"></div>'
                            +'                  <div class="journal_list_popup_table_counter amount"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box cashData">'
                            +'                  <div class="journal_list_popup_table_title">오천원</div>'
                            +'                  <div class="journal_list_popup_table_counter remain"></div>'
                            +'                  <div class="journal_list_popup_table_counter amount"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box cashData">'
                            +'                  <div class="journal_list_popup_table_title">천원</div>'
                            +'                  <div class="journal_list_popup_table_counter remain"></div>'
                            +'                  <div class="journal_list_popup_table_counter amount"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box cashData">'
                            +'                  <div class="journal_list_popup_table_title">오백원</div>'
                            +'                  <div class="journal_list_popup_table_counter remain"></div>'
                            +'                  <div class="journal_list_popup_table_counter amount"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box cashData">'
                            +'                  <div class="journal_list_popup_table_title">백원</div>'
                            +'                  <div class="journal_list_popup_table_counter remain"></div>'
                            +'                  <div class="journal_list_popup_table_counter amount"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box cashData">'
                            +'                  <div class="journal_list_popup_table_title">오십원</div>'
                            +'                  <div class="journal_list_popup_table_counter remain"></div>'
                            +'                  <div class="journal_list_popup_table_counter amount"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box cashData">'
                            +'                  <div class="journal_list_popup_table_title">십원</div>'
                            +'                  <div class="journal_list_popup_table_counter remain"></div>'
                            +'                  <div class="journal_list_popup_table_counter amount"></div>'
                            +'              </div>'
                            +'          </div>'
                            +'          <div class="journal_list_popup_table photo">'
                            +'              <div class="journal_list_popup_table_box">'
                            +'                  <div class="journal_list_popup_table_title">고객부</div>'
                            +'                  <div class="journal_list_popup_table_picture"></div>'
                            +'              </div>'
                            +'              <div class="journal_list_popup_table_box">'
                            +'                  <div class="journal_list_popup_table_title">수취부</div>'
                            +'                  <div class="journal_list_popup_table_picture"></div>'
                            +'              </div>'
                            +'          </div>'
                            +'      </div>'
                            +'      <div class="journal_popup_btnArea">'
                            +'          <div class="journal_popup_btn_confirm smcYellowBtn">확인</div>'
                            +'          <div class="journal_popup_btn_receipt smcBrownBtn">명세표 재발행</div>'
                            +'      </div>'
                            +'  </div>'
                            +'</div>');

        let myBox = $(".journal_list_popup_table.cashInfo").find(".journal_list_popup_table_box");
        myBox.css({"width":100/myBox.length+"px"});

        $(".journal_date_research").bind("click", function() {
            if (!eventFlag){
                eventFlag = true;
                ws_send("C[C]");
                bleepPlay();
            }
        })

        $(".journal_search_btn").bind("click", function() {
            if (!eventFlag){
                if($(this).hasClass("journal_search_btn_selected") == true) {
                    if($(this).hasClass("all_select") == true) {
                        $(".journal_search_btn").removeClass("journal_search_btn_selected");
                    } else {
                        $(this).removeClass("journal_search_btn_selected");
                        $(".all_select").removeClass("journal_search_btn_selected");
                    }
                } else {
                    if($(this).hasClass("all_select") == true) {
                        $(".journal_search_btn").addClass("journal_search_btn_selected");
                    } else {
                        $(this).addClass("journal_search_btn_selected");
                        let count = 0;
                        for(let i = 1 ; i < $(".journal_search_btn").length ; i++) {
                            if($(".journal_search_btn:eq("+i+")").hasClass("journal_search_btn_selected") == false) {
                                count++;
                            }
                        }
                        if(count == 0) {
                            $(".all_select").addClass("journal_search_btn_selected");
                        }
                    }
                }
                pageCount[0] = 1;
                listDraw();
                naviDraw();
                ws_send("K[10]");
                bleepPlay();
            }
        })

        $(".journal_popup_btn_confirm").bind("click", function() {
            let myBtn = this;
            if (!eventFlag){
                btnAni(myBtn);
                $(".journal_list_popup").animate({
                    "top" : "1080px"
                }, 700);
                setTimeout(function() {
                    $(".confirm").show();
                }, 700);
                $(".journal_list_popup_table_picture").html("");
                ws_send("K[10]");
            }
        })

        $(".journal_popup_btn_receipt").bind("click", receiptReturnSet);
    
        $("#cm"+ind).append('<div class="journal_loading_info">전자저널 정보를 불러오는 중입니다.<br>잠시만 기다려 주십시오<canvas id="loadingCircleB" width="200" height="200"></canvas></div>');

        //최초 로딩 대기
        let cc = document.getElementById("loadingCircleB");
        let ctxx = cc.getContext("2d");
        let startt = 0;
        let endd = 0;
        setTimeCount = setInterval(function() {
            ctxx.clearRect(0,0,200,200);
            ctxx.beginPath();
            ctxx.strokeStyle = "#d71820";
            ctxx.lineWidth = 8;

            if(endd % 2.5 <= 1.25) {
                startt = startt + (3/360);
            } else {
                startt = startt + (76/360);
                if(startt >= (endd * Math.PI)) {
                    startt = (endd * Math.PI);
                }
            }
            endd = endd + (12/360);
            ctxx.arc(100,100,60, startt, endd * Math.PI);
            ctxx.stroke();
        },20);
        
	}

	this.callF = function (gab) {
        console.log("★(후처리)callF 파라미터는 : ☞   " + gab + "   ☜ 잘넘어옴, iname" + this.iname);

        gab = gab.split("|");

        if(getCount == gab[0]) {
            fullData.push(gab);
            getCount++;
        } else {
            ws_send("R["+getCount+"]");
        }
        if(fullData.length == listCount && !dateTimeSetFlag) {
            for(let i = 0 ; i < fullData.length ; i++) {
                dateTimeSetFlag = true;
                let dateTime = fullData[i][2].substring(0, 4) + "-" + fullData[i][2].substring(4, 6) + "-" + fullData[i][2].substring(6, 8) + " " + fullData[i][2].substring(8, 10) + ":" + fullData[i][2].substring(10, 12) + ":" + fullData[i][2].substring(12, 14);
                fullData[i][2] = dateTime;
                fullData[i][3] = accountTypeSet(fullData[i][3]);
            }
            listDraw();
            naviDraw();
            setTimeout(function() {
                $(".journal_loading_info").hide();
                clearInterval(setTimeCount);
                $(".confirm").show();
            }, 1000);
        }



	}

    function accountTypeSet(accountType){
        switch (accountType) {
            case '1000':
                accountType = '출금';
                break;
            case '1001':
                accountType = '입금';
                break;
            case '1002':
                accountType = '보충';
                break;
            case '1003':
                accountType = '회수';
                break;
            case '1004':
                accountType = '마감';
                break;
            case '1005':
                accountType = '마감해제';
                break;
            case '1006':
                accountType = '지문관리';
                break;
            case '1007':
                accountType = '봉투입금';
                break;
            case '1008':
                accountType = '봉투출금';
                break;
            case '1010':
                accountType = '동전합산';
                break;
            case '1011':
                accountType = '동전감사';
                break;
            default:
                accountType = accountType;
                break;
        }

        return accountType
    }


    function listDraw() {

        let searchText = [];
        let searchData = [];

        for(let i = 1 ; i < $(".journal_search_btn").length ; i++) {
            if($(".journal_search_btn:eq("+i+")").hasClass("journal_search_btn_selected") == true) {
                searchText.push($(".journal_search_btn:eq("+i+")").text());
            }
        }

        if($(".all_select").hasClass("journal_search_btn_selected") == true) {
            for(let i = 0 ; i < fullData.length ; i++) {
                searchData.push(fullData[i]);
            }
        } else {
            for(let i = 0 ; i < fullData.length ; i++) {
                for(let j = 0 ; j < searchText.length ; j++) {
                    if(fullData[i][3].includes(searchText[j]) == true || fullData[i][4].includes(searchText[j]) == true) {
                        searchData.push(fullData[i]);
                        break;
                    }
                }
            }
        }
        
        $(".journal_list_wrap").empty();

        if(searchData.length == 0) {
            $(".journal_list_wrap").append('<div class="journal_list_empty"><img src="./images/styles/x_icon.png">검색 결과가 없습니다</div>');
            pageCount = [1, 0];
        } else {

            if(searchData % 7 == 0) {
                pageCount[1] = searchData.length / 7;
            } else {
                pageCount[1] = (searchData.length / 7) + 1;
            }
            for(let i = (pageCount[0] * 7) - 7 ; i < (pageCount[0] * 7) ; i++) {
                if(i < searchData.length) {
                    $(".journal_list_wrap").append('<div class="journal_list_line" index='+searchData[i][0]+'>'
                                                  +'    <div class="journal_list_num">'+searchData[i][1]+'</div>'
                                                  +'    <div class="journal_list_date">'+searchData[i][2]+'</div>'
                                                  +'    <div class="journal_list_type">'+searchData[i][3]+'</div>'
                                                  +'    <div class="journal_list_result">'+searchData[i][4]+'</div>'
                                                  +'    <div class="journal_list_money">'+Number(searchData[i][5]).toLocaleString()+' 원</div>'
                                                  +'    <div class="journal_list_id">'+searchData[i][6]+'</div>'
                                                  +'</div>');
                }
            }
        }

        $(".journal_list_line").bind("click", function() {
            ws_send("K[10]");

            $(".confirm").hide();
            
            $(".journal_list_popup_title_num > span").text(fullData[Number($(this).attr("index"))][1])
            $(".journal_list_popup_title_date").text(fullData[Number($(this).attr("index"))][2])

            $(".journal_list_popup_table_data:eq(0)").text(fullData[Number($(this).attr("index"))][3]);
            $(".journal_list_popup_table_data:eq(1)").text(fullData[Number($(this).attr("index"))][4]);
            $(".journal_list_popup_table_data:eq(2)").text(Number(fullData[Number($(this).attr("index"))][5]).toLocaleString() + " 원");
            $(".journal_list_popup_table_data:eq(3)").text(fullData[Number($(this).attr("index"))][6]);


            let remainData = fullData[Number($(this).attr("index"))].slice(7,15);
            let amountData = fullData[Number($(this).attr("index"))].slice(15,23);
            let cashData = document.querySelectorAll(".journal_list_popup_table.cashInfo >.cashData");
            cashData.forEach((element,index) => element.querySelector(".remain").innerText = remainData[index]);
            cashData.forEach((element,index) => element.querySelector(".amount").innerText = amountData[index]);

            if(fullData[Number($(this).attr("index"))][23] !== "Empty") $(".journal_list_popup_table_picture:eq(0)").append('<img src="'+fullData[Number($(this).attr("index"))][23]+'" width="150" height="150">');
            else $(".journal_list_popup_table_picture:eq(0)").append('<div style="width:150px;height:150px">');
            if(fullData[Number($(this).attr("index"))][24] !== "Empty") $(".journal_list_popup_table_picture:eq(1)").append('<img src="'+fullData[Number($(this).attr("index"))][24]+'" width="150" height="150">');
            else $(".journal_list_popup_table_picture:eq(1)").append('<div style="width:150px;height:150px">');

            $(".journal_list_popup").animate({
                "top" : "0px"
            }, 700);

            let myDate = fullData[Number($(this).attr("index"))][2].substring(0,10).replace(/-/g, ""); 
            let myNumber = fullData[Number($(this).attr("index"))][1];
            receiptSetReturn = "R" + myDate + myNumber
        });
    }

    function receiptReturnSet(){
        if (!eventFlag){ //다른게 눌리지 않아야지 됨, 딤드된 버튼은 눌리지 않아야지 됨
            eventFlag = true;
            btnAni(mybtn);// 버튼 소리 함수
            ws_send('=[' + receiptSetReturn + ']');
        }
    }

    

    function naviDraw() {
        $(".journal_list_navi").empty();

        $(".journal_list_navi").append(`<div class='btn_listPrev journal_list_navi_left'><img src='${btnDir}/btn_listPrev_line.png'></div>`);
        for(let i = pageCount[0] ; i < pageCount[0] + 10 ; i++) {
            if(i < pageCount[1]) {
                $(".journal_list_navi").append('<div class="journal_list_navi_num">'+i+'</div>');
            } else {
                //$(".journal_list_navi").append('<div class="journal_list_navi_num"></div>');
            }
        }
        $(".journal_list_navi").append(`<div class='btn_listNext journal_list_navi_right'><img src='${btnDir}/btn_listNext_line.png'></div>`);

        if(pageCount[1] <= 10) {
            $(".journal_list_navi_left").css({"opacity" : "0"});
            $(".journal_list_navi_right").css({"opacity" : "0"});
            leftFlag = false;
            rightFlag = false;
        } else {
            if(pageCount[1] - (pageCount[1] % 10) < pageCount[0]) {
                $(".journal_list_navi_right").css({"opacity" : "0.2"});
                $(".journal_list_navi_left").css({"opacity" : "1"});
                rightFlag = false;
                leftFlag = true;
            } else if(pageCount[0] - 10 < 1) {
                $(".journal_list_navi_left").css({"opacity" : "0.2"});
                $(".journal_list_navi_right").css({"opacity" : "1"});
                leftFlag = false;
                rightFlag = true;
            }
        }
        for(let i = 0 ; i < 10 ; i++) {
            if(parseInt($(".journal_list_navi_num:eq("+i+")").text()) == pageCount[0]) {
                $(".journal_list_navi_num:eq("+i+")").addClass("journal_list_navi_num_selected");
            } else {
                $(".journal_list_navi_num:eq("+i+")").removeClass("journal_list_navi_num_selected");
            }
        }

        $(".journal_list_navi_num").bind("click", function() {
            if (!eventFlag && $(this).text() != "") {
                pageCount[0] = parseInt($(this).text());
                listDraw();
                $(".journal_list_navi_num").removeClass("journal_list_navi_num_selected");
                $(this).addClass("journal_list_navi_num_selected");
                ws_send("K[10]");
                bleepPlay();
            }
        });

        $(".journal_list_navi_left").bind("click", function() {
            if (!eventFlag && leftFlag == true){
                pageCount[0] = (pageCount[0] - (pageCount[0] % 10)) - 9;
                naviDraw();
                listDraw();
                ws_send("K[10]");
                bleepPlay();
            }
            
        });

        $(".journal_list_navi_right").bind("click", function() {
            if (!eventFlag && rightFlag == true){
                pageCount[0] = (pageCount[0] - (pageCount[0] % 10)) + 11;
                if(pageCount[0] > (pageCount[1] - (pageCount[1] % 10)) + 10) {
                    pageCount[0] = pageCount[0] - 10;
                }
                naviDraw();
                listDraw();
                ws_send("K[10]");
                bleepPlay();
            }
        });

    }


}