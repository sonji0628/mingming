/*************************************************************************************
    FileName			:	SMC_menual.js
    Description			:	smc 매뉴얼 화면
    Created Date		:	2018.05.16
    Created By			:	ATEC AP, (신성철)
    Revision History	:	
             ver 1.0.0.0 (2019.01.29) - 최초작성
                                        계원메뉴 메인화면에서 사용되는 특수화면(신성철)
             ver 1.0.0.2 (2019.01.28) - JSON 변환 css 분리 완료 (신성철)
             ver 1.0.0.3 (2021.11.11) - 장보고 버전 -> 국민은행 시재관리기 버전으로 수정 (손지민)
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

"use strict";
for (let i = 0; i < cmArr.length; i++) {
    if (cmArr[i].class == "menual") { //요기 바꿔주고
        cmArr[i].jsObj = new SMC_menual(Number(cmArr[i].index)); //요기 바꿔주고
        cmArr[i].jsObj.evt();
    }
}

function SMC_menual(ind) { //해당 콘트롤러의 인덱스값을 받아옴.

    $("#cm"+ind).css("z-index","999");

    $(document).off("click", ".menual_close");
    $(document).off('click',".menual_main_exit");

    this.iname = $(cmArr[ind].xmlObj).attr("iname");

    let dataDepthCount = 1;

    let depth_main = [1];

    let depth_1_1 = [4, "1.1 제품 사양", "기기 구성의 이해 / 제품 사양", "기본 사양", "images/img_kr/menual_base_machine"];
    
    // let depth_2_1 = [2, "2.1 시스템 시작", "시스템 및 기기 구동", "전원 ON", "전원 올리기", "images/video/system_on", 
    //                 ["① 전면부를 오픈한 후 기기 내부 중앙 우측의 스위치를 올린 후 전원 버튼을 누르면 시스템이 시작됩니다."]];
    // let depth_2_2 = [2, "2.2 시스템 종료", "시스템 및 기기 종료", "전원 OFF", "전원 내리기", "images/video/system_off", 
    //                 ["① 전면부를 오픈한 후 기기 내부 중앙 우측의 스위치를 계원 모드로 변경합니다.", "② 계원모드의 비밀번호를 입력하고 좌측 하단의 시스템 종료를 실행하면 시스템이 종료됩니다."]];
    let depth_2_1 = [2, "2.1 시스템 시작", "시스템 및 기기 구동", "전원 ON", "전원 올리기", "images/img_kr/menual_comingSoon", 
                    ["① 전면부를 오픈한 후 기기 내부 중앙 우측의 스위치를 올린 후 전원 버튼을 누르면 시스템이 시작됩니다."]];
    let depth_2_2 = [2, "2.2 시스템 종료", "시스템 및 기기 종료", "전원 OFF", "전원 내리기", "images/img_kr/menual_comingSoon", 
                    ["① 전면부를 오픈한 후 기기 내부 중앙 우측의 스위치를 계원 모드로 변경합니다.", "② 계원모드의 비밀번호를 입력하고 좌측 하단의 시스템 종료를 실행하면 시스템이 종료됩니다."]];
    
    let depth_3_1 = [3, 
                    ["3.1 지폐부 장애조치", "3.1.1 지폐부 계수잼 장애", "계수잼 오픈 및 문제해결", "계수잼", "images/video/1_계수잼제거", 
                    ["① 뒷면의 손잡이를 밀어 뚜껑을 열고 중간에 걸려있는 지폐를 제거할 수 있습니다.", "② 전면 하단의 레버를 당긴 후 걸려있는 지폐를 제거할 수 있습니다.", "③ 측면 각 부위의 레버를 당겨 걸려있는 지폐를 제거할 수 있습니다.", "④ 후면의 뒤쪽과 상단의 뚜껑을 열어 걸려있는 지폐를 제거할 수 있습니다."]],
                    ["3.1 지폐부 장애조치", "3.1.2 지폐부 입금잼 장애", "입금잼 오픈 및 문제해결", "입금잼", "images/video/2_입금잼제거", 
                    ["① 후면 전체 및 전면 하단에 끼어있는 지폐를 제거할 수 있습니다.", "② 측면 각 부위의 레버를 당겨 걸려있는 지폐를 제거할 수 있습니다.", "③ 최 하단의 뚜껑을 들어올려 걸려있는 지폐를 제거할 수 있습니다.", "④ 기기 하단의 각 카세트를 열어 걸려있는 지폐를 제거할 수 있습니다."]],
                    ["3.1 지폐부 장애조치", "3.1.3 지폐부 지폐출금잼 장애", "지폐출금잼 오픈 및 문제해결", "지폐출금잼", "images/video/3_지폐출금잼", 
                    ["① 기기 하단의 각 카세트를 열어 걸려있는 지폐를 제거할 수 있습니다.", "② 기기 하단와 측면의 각 레버를 열어 걸려있는 지폐를 제거할 수 있습니다.", "③ 기기 후면의 각 부분에서 걸려있는 지폐를 제거할 수 있습니다.", "④ 전면부 밑의 뚜껑을 열어 걸려있는 지폐를 제거할 수 있습니다."]],
                    ];
    let depth_3_2 = [2, "3.2 동전입금부 장애조치", "동전입금부 장애조치 방법", "동전입금부 오픈 및 문제 해결", "동전입금부", "images/img_kr/menual_comingSoon", 
                    ["① 동전 입금부를 열어 동전이 내려가는 부분에 걸려있는 동전을 제거하고 부드러운 천이나 티슈로 이물질을 걸러낼 수 있습니다."]];
    let depth_3_3 = [2, "3.3 동전출금부 장애조치", "동전출금부 장애조치 방법", "동전출금부 오픈 및 문제 해결", "동전출금부", "images/img_kr/menual_comingSoon", 
                    ["① 동전 출금부의 후면의 잠금장치를 풀고 문제가 있는 권종의 동전부를 분리합니다.", "② 동전부를 뒤집어 장치를 분리하고 사이에 끼어있는 이물질을 제거할 수 있습니다."]];
    let depth_3_4 = [2, "3.4 명세표부 장애조치", "명세표부 장애조치 방법", "명세표부 오픈 및 문제 해결", "명세표부", "images/video/명세표", 
                    ["① 명세표부에서 종이가 출력되는 부분의 장치를 각 레버를 통해 뚜껑을 열고 찢어지거나 걸려있는 명세표 종이를 제거할 수 있습니다."]];

    /* let depth_ex_5 = [5, 
                    ["타이틀1", "제목1", "부제목1", "이미지경로1"],
                    ["타이틀2", "제목2", "부제목2", "이미지경로2"],
                    ["타이틀3", "제목3", "부제목3", "이미지경로3"]
                    ]; */
    
    let depth_caution = [6, // 안전을 위한 주의사항 페이지
                        ["images/icons/menual_icon_alert", "경고", 
                        ["전원코드 위에 무거운 것을 올려 놓거나 전원코드를 구부리지 마십시오.", "코드가 손상되어 화재나 감전의 우려가 있습니다.",
                        "손상된 코드나 끝이 벌어진 플러그를 사용하지 마십시오.", "화재나 감전의 우려가 있습니다.",
                        "반드시 접지해 주십시오.", "누전이나 고장의 경우 감전의 위험이 있습니다.",
                        "사양으로 지정된 전압이외의 다른 전압을 사용하지 마십시오.", "화재나 감전의 우려가 있습니다.",
                        "계원조작부 및 고객조작부의 고정 나사를 풀어 내부를 열지 마십시오.", "코드가 손상되어 화재나 감전의 우려가 있습니다.",
                        "전원 플러그를 콘센트에 정확하게 꽂으십시오.", "전원 코드를 잡아당기면 코드가 손상되어 화재나 감전의 우려가 있습니다.",
                        "제품의 통풍구를 막거나 물건을 집어넣지 마십시오.", "화재나 감전의 우려가 있습니다."
                        ]],
                        ["images/icons/menual_icon_alert", "경고", 
                        ["젖은 손으로 제품이나 전원 커넥터를 만지지 마십시오.", "감전의 우려가 있습니다.",  
                        "만일 연기나 이상한 냄새등의 이상상태가 발생하면 즉시 '긴급단락' 스위치를 OFF해 주십시오.","그대로 사용하면 화재나 감전의 우려가 있습니다.",  
                        "물기가 있거나 고온의 장소에 설치하지 마십시오.","화재나 감전의 우려가 있습니다.",  
                        "제품 위에 물이 든 그릇 또는 작은 금속물을 올려놓지 마십시오.","제품안에 물이 들어가면 화재나 감전의 우려가 있습니다.",  
                        "각 유니트의 전원 커넥터나 모듈 자체를 분해하지 마십시오.","감전 및 고장의 우려가 있습니다.",  
                        "고객조작부 화면을 물걸레로 닦지 마십시오.","화재나 감전의 우려가 있습니다.",  
                        "시스템 설치시 캐비닛 양측면에 임의로 구멍(Hole)을 뚫지 마십시오.","화재나 감전의 우려가 있습니다."
                        ]],
                        ["images/icons/menual_icon_caution", "주의",
                        ["불안정하거나 경사진 곳에 설치하지 마십시오.", "넘어지면 다칠 위험이 있습니다.",
                        "고객조작부 화면은 벤젠, 아세톤, 신나, 연마제(치약) 등으로 닦지 마시고, 이소프로필알코올(IPA, 공업용 알코올)을 부드러운 헝겊에 조금 묻혀 닦아 주십시오.", "고장의 위험이 있습니다.",    
                        "각 모듈을 빼낸 상태로 앉아서 작업하지 마십시오.", "다칠 위험이 있습니다.",    
                        "각 모듈을 집어 넣었을 때에는 손잡이 이외에는 잡지 마십시오.", "손이 끼이거나 다칠 위험이 있습니다.",    
                        "각 모듈을 밀어 넣었을 때에는 고객조작부 방향에 다른 사람의 손 등이 끼지 않았는지 확인 후 넣어 주십시오.", "감전 및 고장의 우려가 있습니다.",    
                        "지폐입출금기, POWER/메인콘트롤 유니트를 꺼낼 때에는 손, 발을 주의하십시오.", "다칠 위험이 있습니다."   
                        ]],
                        ["images/icons/menual_icon_caution", "주의",
                        ["손가락이나 머리카락을 팬의 흡배기구에 가까이 하지 마십시오.", "다칠 위험이 있습니다.", 
                        "각 모듈을 빼낼 때에는 무리하게 당기지 마십시오.", "고장의 위험이 있습니다.", 
                        "잼이 발생한 지폐, 동전 등을 모듈에서 빼낼 때에는 손이 끼이지 않도록 주의하십시오.", "다칠 위험이 있습니다.", 
                        "지폐입출금기 모듈의 상단 유니트는 반드시 걸림쇠가 걸렸는지 확인하십시오.", "상단 유니트가 떨어져 다칠 위험이 있습니다.", 
                        "지폐입출금기 모듈의 상단 유니트를 열린 상태로 두지 마십시오.", "다칠 위험이 있습니다.", 
                        "무자격자에게 수리를 의뢰하지 마십시오.", "다칠 위험이 있습니다." 
                        ]]
                        ];
    
    //전처리
    this.evt = function () {

        mainFrame(); //좌측 메뉴 및 우측 메인 화면 구성

        //좌측 1 depth 메뉴 선택하면 2 depth 메뉴 표시할 함수들
        $("#menual_depth_1").on("click", function() {
            if(eventFlag) return
            let mybtn = this;

            $("#menual_depth_1_box").slideDown(500);
            $("#menual_depth_2_box").slideUp(500);
            $("#menual_depth_3_box").slideUp(500);

            btnAni(mybtn);
            ws_send("K[10]");  
        });

        $("#menual_depth_2").on("click", function() {
            if(eventFlag) return
            let mybtn = this;

            $("#menual_depth_2_box").slideDown(500);
            $("#menual_depth_1_box").slideUp(500);
            $("#menual_depth_3_box").slideUp(500);
            
            btnAni(mybtn);
            ws_send("K[10]");            
        });

        $("#menual_depth_3").on("click", function() {
            if(eventFlag) return
            let mybtn = this;

            $("#menual_depth_3_box").slideDown(500);
            $("#menual_depth_1_box").slideUp(500);
            $("#menual_depth_2_box").slideUp(500);

            btnAni(mybtn);
            ws_send("K[10]");  
        });

        // 2 depth 메뉴 선택시 해당 화면 출력
        $(".menual_menu").on("click", function() {
            if(eventFlag) return
            let mybtn = this;

            $(".menual_menu").css("color","#606060");
            $(".menual_menu").find("span").css({"color":"#606060","font-family":"Noto Sans CJK KR Regular"});
            $(this).css("color","#f13a67");
            $(this).find("span").css({"color":"#f13a67","font-family":"Noto Sans CJK KR Bold"});
            $("#menual_main_box").empty();
            let name = $(this).find("label").text();
            drawDepth(eval(name));

            btnAni(mybtn);
            ws_send("K[10]");  
        });

        $(".menual_menu_caution").on("click", function() {
            if(eventFlag) return
            let mybtn = this;

            dataDepthCount = 1;
            $("#menual_depth_1_box").slideUp(500);
            $("#menual_depth_2_box").slideUp(500);
            $("#menual_depth_3_box").slideUp(500);
            $("#menual_main_box").empty();
            drawDepth(depth_caution);

            btnAni(mybtn);
            ws_send("K[10]"); 
        });

        $(document).on("click", ".menual_close", function() {
            if(eventFlag) return
            let mybtn = this;

            $("#menual_depth_1_box").slideUp(500);
            $("#menual_depth_2_box").slideUp(500);
            $("#menual_depth_3_box").slideUp(500);
            $("#menual_main_box").empty();
            drawDepth(depth_main);
            dataDepthCount = 1;

            btnAni(mybtn);
            ws_send("K[10]"); 
        });

        $(".menual_exit_pop_cancel").on('click', function() {
            if(eventFlag) return
            let mybtn = this;

            $(".menual_exit_pop_bg").addClass("menual_exit_pop_hidden");

            btnAni(mybtn);
            ws_send("K[10]"); 
        });

        $(".menual_exit_pop_confirm").on("click", function() {
            if(eventFlag) return

            eventFlag = true;
            bleepPlay();
            ws_send("J[J]");
        });

        $(document).on('click',".menual_main_exit", function() {
            if(eventFlag) return
            let mybtn = this;

            $(".menual_exit_pop_bg").removeClass("menual_exit_pop_hidden");

            btnAni(mybtn);
            ws_send("K[10]"); 
        });

    }
    //후처리
    this.callF = function (gab) {

    }

    //메인화면
    function mainFrame() {
        $("#cm"+ind).append(
             '<div id="menual_box">'
            +'  <div class="menual_exit_pop_bg menual_exit_pop_hidden">'  // 종료 팝업
            +'      <div class="menual_exit_pop">'
            +'          <div class="menual_exit_pop_title">사용자 메뉴얼을 종료하시겠습니까?</div>'
            +'          <div class="menual_exit_pop_cancel">취소</div>'
            +'          <div class="menual_exit_pop_confirm">종료</div>'
            +'      </div>'
            +'  </div>'
            +'  <div id="menual_left_box">' // 좌측메뉴
            +'      <div id="menual_logo"><img src="images/styles/menual_logo.png"></div>'
            +'      <div id="menual_depth_1" class="menual_depth">'
            +'          <div class="menual_depth_num">1</div><div class="menual_depth_name">기기 구성의 이해</div>'
            +'      </div>'
            +'      <div id="menual_depth_1_box" class="menual_depth_box">'
            +'          <div class="menual_menu">1.1<span>제품 사양</span><label>depth_1_1</label></div>'
            +'      </div>'
            +'      <div id="menual_depth_2" class="menual_depth">'
            +'          <div class="menual_depth_num">2</div><div class="menual_depth_name">시스템 ON/OFF</div>'
            +'      </div>'
            +'      <div id="menual_depth_2_box" class="menual_depth_box">'
            +'          <div class="menual_menu">2.1<span>시스템 시작</span><label>depth_2_1</label></div>'
            +'          <div class="menual_menu">2.2<span>시스템 종료</span><label>depth_2_2</label></div>'
            +'      </div>'
            +'      <div id="menual_depth_3" class="menual_depth">'
            +'          <div class="menual_depth_num">3</div><div class="menual_depth_name">각종 매체 잼 제거 및 장애 조치 방법</div>'
            +'      </div>'
            +'      <div id="menual_depth_3_box" class="menual_depth_box">'
            +'          <div class="menual_menu">3.1<span>지폐부 장애조치</span><label>depth_3_1</label></div>'
            +'          <div class="menual_menu">3.2<span>동전입금부<br>장애조치</span><label>depth_3_2</label></div>'
            +'          <div class="menual_menu">3.3<span>동전출금부<br>장애조치</span><label>depth_3_3</label></div>'
            +'          <div class="menual_menu">3.4<span>명세표부 장애조치</span><label>depth_3_4</label></div>'
            +'      </div>'
            +'      <div class="menual_menu_caution"></div>'
            +'  </div>'
            +'  <div id="menual_main_box">' // 메인구역
            +'      <div class="menual_main_image"><div class="menual_main_exit"></div></div>'
            +'  </div>'
            +'</div>'
        );
    }

    //메뉴를 눌렀을때 표시할 내용
    function drawDepth(data) {
        if(data[0] == 1){ // 메인화면 호출때 --------------------------------------
            $("#menual_main_box").append(
                '<div class="menual_main_image"><div class="menual_main_exit"></div></div>'
            );
        } else if(data[0] == 2) { // 영상포함일때 (단일페이지) --------------------------------------
            dataDepthCount = 1;
            $("#menual_main_box").append(
                '<div class="menual_title">'+data[1]+'</div>'
               +'<div class="menual_close"></div>'
               +'<div class="menual_full_frame_box">'
               +'  <div class="menual_full_frame">'
               +'      <div class="menual_full_title_box">'
               +'          <div class="menual_full_title">'+data[2]+'</div>'
               +'          <div class="menual_full_sub_title">'
               +'              <div class="menual_full_sub_title_arrow">▶</div>'
               +'              <div class="menual_full_sub_title_text">'+data[3]+'</div>'
               +'          </div>'
               +'      </div>'
               +'      <div class="menual_movie_title"><span>|</span>'+data[4]+'</div>'
               +'      <div class="menual_movie">'
               +'      </div>'
               +'  </div>'
               +'</div>'
            );
            if(data[5] == "images/img_kr/menual_comingSoon"){
                $(".menual_movie")[0].innerHTML = "<img src="+data[5]+".png>"
            }else{
                $(".menual_movie")[0].innerHTML = ''
                                                +'<video width="512" height="384" controls>' // 영상 사이즈, 컨트롤
                                                +'  <source src="'+data[5]+'.webm" type="video/webm" />' //영상 파일 경로와 파일명
                                                +'</video>'
            }
            if(data[6].length == 1) {
                $(".menual_full_frame").append('<div class="menual_movie_text">'+data[6][0]+'</div>');
            } else {
                for(let i = 0 ; i < data[6].length ; i++) {
                    $(".menual_full_frame").append('<div class="menual_movie_text">'+data[6][i]+'</div>');
                }
            }
               
           
        }  else if(data[0] == 3) { // 영상포함일때 (다중페이지) --------------------------------------
            $("#menual_main_box").append(
                '<div class="menual_title">'+data[dataDepthCount][0]+'</div>'
               +'<div class="menual_close"></div>'
               +'<div class="menual_full_frame_box">'
               +'  <div class="menual_full_frame">'
               +'      <div class="menual_full_title_box">'
               +'          <div class="menual_full_title">'+data[dataDepthCount][1]+'</div>'
               +'          <div class="menual_full_navi">'
               +'              <div class="menual_full_navi_inbox">'
               +'                  <div class="menual_full_navi_prev">◀</div>'
               +'                  <div class="menual_full_navi_num">'+dataDepthCount.toString()+'</div>'
               +'                  <div class="menual_full_navi_divide">/</div>'
               +'                  <div class="menual_full_navi_end">'+(data.length-1).toString()+'</div>'
               +'                  <div class="menual_full_navi_next">▶</div>'
               +'              </div>'
               +'          </div>'
               +'          <div class="menual_full_sub_title">'
               +'              <div class="menual_full_sub_title_arrow">▶</div>'
               +'              <div class="menual_full_sub_title_text">'+data[dataDepthCount][2]+'</div>'
               +'          </div>'
               +'      </div>'
               +'      <div class="menual_movie_title"><span>|</span>'+data[dataDepthCount][3]+'</div>'
               +'      <div class="menual_movie">'
               +'      </div>'
               +'  </div>'
               +'</div>'
            );
            if(data[dataDepthCount][4] == "images/img_kr/menual_comingSoon"){
                $(".menual_movie")[0].innerHTML = "<img src="+data[dataDepthCount][4]+".png>"
            }else{
                $(".menual_movie")[0].innerHTML = ''
                                                +'<video width="512" height="384" controls>' // 영상 사이즈, 컨트롤
                                                +'  <source src="'+data[dataDepthCount][4]+'.webm" type="video/webm" />' //영상 파일 경로와 파일명
                                                +'</video>'
            }
            if(data[dataDepthCount][5].length == 1) {
                $(".menual_full_frame").append('<div class="menual_movie_text">'+data[dataDepthCount][5][0]+'</div>');
            } else {
                for(let i = 0 ; i < data[dataDepthCount][5].length ; i++) {
                    $(".menual_full_frame").append('<div class="menual_movie_text">'+data[dataDepthCount][5][i]+'</div>');
                }
            }

            $(".menual_full_navi_next").on("click", function() {
                if(eventFlag) return
                let mybtn = this;

                if(data.length-1 !== dataDepthCount) {
                    $("#menual_main_box").empty();
                    dataDepthCount++;
                    drawDepth(data);
                }

                btnAni(mybtn);
                ws_send("K[10]");
            });

            $(".menual_full_navi_prev").on("click", function() {
                if(eventFlag) return
                let mybtn = this;

                if(dataDepthCount !== 1) {
                    $("#menual_main_box").empty();
                    dataDepthCount--;
                    drawDepth(data);
                }

                btnAni(mybtn);
                ws_send("K[10]");
            });
               
           
        } else if(data[0] == 4) { // 동영상 없이 단순 이미지 출력 페이지의 경우
            dataDepthCount = 1;
            $("#menual_main_box").append(
                '<div class="menual_title">'+data[1]+'</div>'
                +'<div class="menual_close"></div>'
                +'<div class="menual_full_frame_box">'
                +'  <div class="menual_full_frame">'
                +'      <div class="menual_full_title_box">'
                +'          <div class="menual_full_title">'+data[2]+'</div>'
                +'          <div class="menual_full_sub_title">'
                +'              <div class="menual_full_sub_title_arrow">▶</div>'
                +'              <div class="menual_full_sub_title_text">'+data[3]+'</div>'
                +'          </div>'
                +'      </div>'
                +'      <div class="menual_full_image"><img src="'+data[4]+'.png"></div>'
                +'  </div>'
                +'</div>'
            );
        } else if(data[0] == 5) { // 동영상 없이 단순 이미지 출력 페이지에서 다중 페이지 ------------------------------------
            $("#menual_main_box").append(
                '<div class="menual_title">'+data[dataDepthCount][0]+'</div>'
                +'<div class="menual_close"></div>'
                +'<div class="menual_full_frame_box">'
                +'  <div class="menual_full_frame">'
                +'      <div class="menual_full_title_box">'
                +'          <div class="menual_full_title">'+data[dataDepthCount][1]+'</div>'
                +'          <div class="menual_full_navi">'
                +'              <div class="menual_full_navi_inbox">'
                +'                  <div class="menual_full_navi_prev">◀</div>'
                +'                  <div class="menual_full_navi_num">'+dataDepthCount.toString()+'</div>'
                +'                  <div class="menual_full_navi_divide">/</div>'
                +'                  <div class="menual_full_navi_end">'+(data.length-1).toString()+'</div>'
                +'                  <div class="menual_full_navi_next">▶</div>'
                +'              </div>'
                +'          </div>'
                +'          <div class="menual_full_sub_title">'
                +'              <div class="menual_full_sub_title_arrow">▶</div>'
                +'              <div class="menual_full_sub_title_text">'+data[dataDepthCount][2]+'</div>'
                +'          </div>'
                +'      </div>'
                +'      <div class="menual_full_image"><img src="'+data[dataDepthCount][3]+'.png"></div>'
                +'  </div>'
                +'</div>'
            );
            $(".menual_full_navi_next").on("click", function() {
                if(eventFlag) return
                let mybtn = this;

                if(data.length-1 !== dataDepthCount) {
                    $("#menual_main_box").empty();
                    dataDepthCount++;
                    drawDepth(data);
                }

                btnAni(mybtn);
                ws_send("K[10]");
            });

            $(".menual_full_navi_prev").on("click", function() {
                if(eventFlag) return
                let mybtn = this;

                if(dataDepthCount !== 1) {
                    $("#menual_main_box").empty();
                    dataDepthCount--;
                    drawDepth(data);
                }

                btnAni(mybtn);
                ws_send("K[10]");
            });
        } else if(data[0] == 6) { // 안전을 위한 주의사항 - 페이지 내용이 공통적인 부분을 제외한 나머지 전부 직접 하드코딩
            if(dataDepthCount == 1) {
                $("#menual_main_box").append(
                    '<div class="menual_title"><div class="menual_title_point">!</div><div>안전을 위한 주의사항</div></div>'
                    +'<div class="menual_close"></div>'
                    +'<div class="menual_full_frame_box">'
                    +'  <div class="menual_full_frame">'
                    +'      <div class="menual_full_title_box">'
                    +'          <div class="menual_full_title">안전을 위한 주의사항</div>'
                    +'          <div class="menual_full_navi">'
                    +'              <div class="menual_full_navi_inbox">'
                    +'                  <div class="menual_full_navi_prev">◀</div>'
                    +'                  <div class="menual_full_navi_num">'+dataDepthCount.toString()+'</div>'
                    +'                  <div class="menual_full_navi_divide">/</div>'
                    +'                  <div class="menual_full_navi_end">'+(data.length-1).toString()+'</div>'
                    +'                  <div class="menual_full_navi_next">▶</div>'
                    +'              </div>'
                    +'          </div>'
                    +'          <div class="menual_full_sub_title">'
                    +'              <div class="menual_full_sub_title_arrow">▶</div>'
                    +'              <div class="menual_full_sub_title_text">다음에 표시되어있는 안전을 위한 주의사항들은 제품을 안전하고<br>정확하게 사용하여 예기치 못한 위험이나 손해를 사전에 예방하기 위한 것입니다.</div>'
                    +'          </div>'
                    +'      </div>'
                    +'      <div style="float:left; width:786px; height:20px;">&nbsp;</div>'
                    +'      <div class="menual_cuation_inTitle">경고 표시(Sign Word)의 의미</div>'
                    +'      <div class="menual_caution_imgText_box">'
                    +'          <div class="menual_caution_imgText_alert">경고</div>'
                    +'          <div class="menual_caution_imgText_text">지시사항을 위반할 경우 심각한 상해나 사망이 발생할 수 있습니다.</div>'
                    +'      </div>'
                    +'      <div class="menual_caution_imgText_box">'
                    +'          <div class="menual_caution_imgText_caution">주의</div>'
                    +'          <div class="menual_caution_imgText_text">지시사항을 위반할 경우 경미한 상해나 제품의 손상이 발생할 수 있습니다.</div>'
                    +'      </div>'
                    +'      <div class="menual_cuation_inTitle">그림 기호(Alert Word)의 의미</div>'
                    +'      <div class="menual_caution_imgText_box2">'
                    +'          <div class="menual_caution_imgText_box2_img"><div class="menual_alert_icon"></div><div class="menual_caution_icon"></div></div>'
                    +'          <div class="menual_caution_imgText_box2_text">이 그림 기호는 위험을 끼칠 우려가 있는 사항과 조직에 대해 주의를 환기시키기 위한 기호입니다. 이 기호가 있는 부분은 위험발생을 피하기 위하여 주의깊게 읽고 지시를 따라야 합니다.</div>'
                    +'      </div>'
                    +'      <div class="menual_cuation_inTitle">사용자 안내문</div>'
                    +'      <div class="menual_caution_text_box">이 기기는 업무용으로 전파적 적합등록을 한 기업이오니 판매자 또는 사용자는 이 점을 주의하시기 바랍니다.</div>'
                    +'  </div>'
                    +'</div>'
                );
            } else {
                $("#menual_main_box").append(
                    '<div class="menual_title"><div class="menual_title_point">!</div><div>안전을 위한 주의사항</div></div>'
                    +'<div class="menual_close"></div>'
                    +'<div class="menual_full_frame_box">'
                    +'  <div class="menual_full_frame">'
                    +'      <div class="menual_full_title_box">'
                    +'          <div class="menual_full_title"><img src="'+data[dataDepthCount-1][0]+'.png">'+data[dataDepthCount-1][1]+'</div>'
                    +'          <div class="menual_full_navi">'
                    +'              <div class="menual_full_navi_inbox">'
                    +'                  <div class="menual_full_navi_prev">◀</div>'
                    +'                  <div class="menual_full_navi_num">'+dataDepthCount.toString()+'</div>'
                    +'                  <div class="menual_full_navi_divide">/</div>'
                    +'                  <div class="menual_full_navi_end">'+(data.length-1).toString()+'</div>'
                    +'                  <div class="menual_full_navi_next">▶</div>'
                    +'              </div>'
                    +'          </div>'
                    +'      </div>'
                    +'  </div>'
                    +'</div>'
                );
                let textCount = 0;
                for(let i = 0 ; i < (data[dataDepthCount-1][2].length) / 2 ; i++) {
                    $(".menual_full_frame").append(
                        '<div class="menual_full_sub_title_caution">'
                       +'  <div class="menual_full_sub_title_arrow_caution">▶</div>'
                       +'  <div class="menual_full_sub_title_text_caution">'+data[dataDepthCount-1][2][textCount]+'</div>'
                       +'  <div class="menual_full_sub_title_text_caution_info">'+data[dataDepthCount-1][2][textCount+1]+'</div>'
                       +'</div>'
                   );
                   textCount = textCount + 2;
                }
                
            }

            $(".menual_full_navi_next").on("click", function() {
                if(eventFlag) return
                let mybtn = this;

                if(data.length-1 !== dataDepthCount) {
                    $("#menual_main_box").empty();
                    dataDepthCount++;
                    drawDepth(data);
                }

                btnAni(mybtn);
                ws_send("K[10]");
            });

            $(".menual_full_navi_prev").on("click", function() {
                if(eventFlag) return
                let mybtn = this;

                if(dataDepthCount !== 1) {
                    $("#menual_main_box").empty();
                    dataDepthCount--;
                    drawDepth(data);
                }

                btnAni(mybtn);
                ws_send("K[10]");
            });
            
        }
        

    }
}