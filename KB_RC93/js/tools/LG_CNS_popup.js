/********************************************************************
    팝업패키지
    전기준 black™
    수정 2018.07.27 업무종료 후 연속 거래 선택 화면 클라스인 Common생성

    Revision History
        ver 1.0.0.0 - 최초작성
        ver 1.0.0.1 (2021.02.15) - lgcns.popup 변수 초기화 추가, cyg
*********************************************************************/
lgcns.popup={};

//일반팝업클라스 시작
lgcns.popup.Common=function(){
    //전체화면 덮는 반투명 검은박스
    var sudan=$("<div id='PopupWindow'></div>");
    sudan.css({
        'position': 'absolute',
        'left': '0px',
        'top': '-1100px',
        'width':'1280px',    
        'height':'1280px',
        'background-color': 'rgba(0,0,0,0.6)',
        'display':'block',
        'transition': '0.6s'
    });
    
    //흰색 팝업창 크기조절 가능토록 고민 중...
    $("#continueMenu").append(sudan);
     var sudanSelect=$("<div></div>");
    sudanSelect.css({
        'position': 'absolute',
        'left': '80px',
        'top': '80px',
        'width':'1120px',    
        'height':'864px',
        'background-color': 'rgba(255,255,255,1)'
    });
    
    sudan.append(sudanSelect);
    sudan=null;
    
    //안내문구
    var continueAnne=$("<div></div>");
    continueAnne.attr({ 'id': 'continueAnne'});//속성 추가
    continueAnne.css({
        'font-size':'40px',
        'color':'#222222',
        'position': 'absolute',
       'width':'100%',
        'top': '161px',
        'text-align':'center',
         'font-family':fontIs('ls'),
        'letter-spacing':'-4px'
    });    
    
    //버튼아래안내문구
    var continueAnne2=$("<div></div>");
    continueAnne2.attr({ 'id': 'continueAnne2'});//속성 추가
    continueAnne2.css({
        'font-size':'20px',
        'color':'#858585',
        'position': 'absolute',
       'width':'100%',
        'top': '517px',
        'text-align':'center',
         'font-family':fontIs('ls'),
        'letter-spacing':'-2px'
    })
    sudanSelect.append(continueAnne,continueAnne2);
    continueAnne=null;
    continueAnne2=null;
    
    //취소버튼
    var sudanCancel=$("<div id='continueCancel'><img src='icons/sudan_cancel.png'></div>");
    sudanCancel.css({
        'position': 'absolute',
        'width': '1120px',
        'top': '20px',
        'text-align':'right',
        'display':'none'
    })
    sudanSelect.append(sudanCancel);
    myDim.startDim(sudanCancel);
    
    //버튼그룹-3개 버튼을 묶어주는 박스 생성, 버튼은 1개~3개로 동적 생성토록 함. 
    var continueG=$("<div></div>");
    continueG.css({
        'position': 'absolute',
        'width':'100%',
        'top': '317px',
        'text-align':'center',
       // 'border':'solid 0.5px red'
    })
    sudanSelect.append(continueG);
    
    //첫번째버튼
    var continueF_btn=$("<div id='continueBtn0' class='continueBtn'></div>");
    continueF_btn.css({
        'width':'236px',
        'height':'156px',
        'border':'solid #d71921 2px',        
        'background-color':'#d71921',
        'display':'inline-block',
        'margin':'0px 8px 0px 8px',        
    })
    continueF_btn.val("y[0]")
    //첫번째버튼 글자
    var continueF_txt=$("<div id='continue0'></div>");
    continueF_txt.css({
        'position': 'absolute',
        'width':'236',
        'top': '52px',
        'text-align':'center',
        'font-size':'24px',
        'color':'#ffffff',
        'font-family':fontIs('lb'),
        'line-height':'30px'
    })
   // continueF_txt.html("인증 해제 후<br>업무종료");
    continueF_btn.append(continueF_txt);
    continueG.append(continueF_btn);    
    continueF_txt=null;
    //두번째 버튼
     var continueS_btn=$("<div id='continueBtn1' class='continueBtn'></div>");
    continueS_btn.css({
        'width':'236px',
        'height':'156px',
        'border':'solid #222222 2px',
        'display':'inline-block',
        'margin':'0px 8px 0px 8px'
    });
    continueS_btn.val("y[1]")
     //두번째버튼 글자
    var continueS_txt=$("<div id='continue1'></div>");
    continueS_txt.css({
        'position': 'absolute',
        'width':'236',
        'top': '52px',
        'text-align':'center',
        'font-size':'24px',
        'color':'#222222',
        'font-family':fontIs('lb'),
        'line-height':'30px'
    })
    //continueS_txt.html("다른 거래<br>계속하기");
    continueS_btn.append(continueS_txt);
    continueG.append(continueS_btn);
    continueS_txt=null;
    //세번째 버튼
     var continueT_btn=$("<div id='continueBtn2' class='continueBtn'></div>");
    continueT_btn.css({
        'width':'236px',
        'height':'156px',
        'border':'solid #bbbbbb 2px',
        'display':'inline-block',
        'margin':'0px 8px 0px 8px'
    })
    continueT_btn.val("y[2]")
     //세번째버튼 글자
    var continueT_txt=$("<div id='continue2'></div>");
    continueT_txt.css({
        'position': 'absolute',
        'width':'236',
        'top': '67px',
        'text-align':'center',
        'font-size':'24px',
        'color':'#222222',
        'font-family':fontIs('lb'),
        'line-height':'30px'
    })
   // continueT_txt.html("추가 이체하기");
    continueT_btn.append(continueT_txt);
    continueG.append(continueT_btn);
    continueT_txt=null;
    continueG=null;
    continueF_btn=null;
    continueS_btn=null;
    continueT_btn=null;
    
    
    //하단라인
    var continueLine=$("<hr id='continueL'>");
    continueLine.css({
        'position':'absolute',
        'top':'640px',
        'width':'1120px',
        'background':'#dddddd',
        'border':'none',
        'height':'2px'
    })
    sudanSelect.append(continueLine);
    continueLine=null;
    
    //로그아웃 주의문구
    var continueLogoutTxt=$("<div id='continueCaution'></div>");
    continueLogoutTxt.css({
        'font-size':'30px',
        'color':'#222222',
        'position': 'absolute',
        'width':'100%',
        'top': '704px',
        'text-align':'center',
         'font-family':fontIs('ls'),
        'letter-spacing':'-4px'
    })
    continueLogoutTxt.html("떠나시기 전, 반드시 로그아웃 해주세요.");
    
    var continueLogoutTxt2=$("<div id='continueCaution2'></div>");
    continueLogoutTxt2.css({
        'font-size':'20px',
        'color':'#858585',
        'position': 'absolute',
        'width':'100%',
        'top': '755px',
         'font-family':fontIs('ls'),
        'text-align':'center',
        'letter-spacing':'-1px'
    })
    continueLogoutTxt2.html("로그아웃하지 않고 자리를 비우신다면<br>개인정보 유출 및 도용 등 범죄에 악용되어 피해가 발생할 수 있습니다.")
    sudanSelect.append(continueLogoutTxt,continueLogoutTxt2);
    continueLogoutTxt=null;
    continueLogoutTxt2=null;
    
    
    $(".continueBtn").bind('touchstart mousedown',continueClick);//버튼클릭 이벤트   
   
    $(sudanCancel).bind('touchstart mousedown',continueClick);//버튼클릭 이벤트   
    sudanCancel=null;
    function continueClick(){  //클릭시 
        if(event.type=="touchstart"){
            mFlag=true;//터치가 되면 다음부터는 터치만 체크
        };
        if(event.type=="mousedown" && mFlag){
            return true;
        };
        if(!eventFlag){ 
            var mymy = this;
            if(this.dimmed!="1"){
                //myDim.startDim(this);
                if($(this).val()!="cancel"){
                    if($(this).prop('id')=="continueCancel"){
                        ws_send("J[J]"); 
                    }else{
                       // ws_send("y["+$(this).prop('id').substr(11,1)+"]");
                        ws_send($(this).val());
                    }
                    eventFlag=true;
                }else{
                    $("#continueBtn0").val("y[0]")
                    $("#continueBtn1").val("y[1]")
                    $("#PopupWindow").css({'top':'-1100px'});//그냥닫기
                    if($(".logoutClass").css('visibility')=="visible"){ //로그인 상태일경우만
                        f_receive('setLO', '2|page', globalTimer.firstTime);
                    }
                }
                bleep.pause();//기존소리를 죽이고 새로...
                bleep.currentTime = 0;
                bleep.play(); //소리            
                $(mymy).animate({   //jQuary를 이용하여 눌림효과 주기
                    top: '+=5px',
                    opacity: '0.5',			
                }, 50,reback);
                function reback() {
                    $(mymy).animate({
                         top: '-=5px',
                         opacity: '1',                        
                     }, 50);
                    //mybtn=null;
                    mymy=null;
                };     
            }
        }
    }
    
    sudanCancel=null;
}
lgcns.popup.Common.prototype.startDraw=function(gab){
    eventFlag=false
    var gabArr=gab.split(";");
    var popupbtnArr=gabArr[1].split("|");
    $("#PopupWindow").css({'top':'0px'})
    $("#continueAnne").html(gabArr[0]);
    $("#continueAnne").css({
        'top': '161px',
    })
    $("#continueBtn0").css({'border':'solid #d71921 2px','background-color':'#d71921'});
    $("#continue0").css({'color':'#ffffff'});
    var i;
    for(i=0;i<3;i++){
        if(popupbtnArr[i]==""){
            $("#continueBtn"+i).css({'display':'none'});
        }else{
            $("#continueBtn"+i).css({'display':'inline-block'});
        }

        
        
            
        
        if(popupbtnArr[i].split("br").length==2){ //개행이 있다면 top조절하기
            $("#continue"+i).css({'top':'52px'});
        }else if(popupbtnArr[i].split("br").length==3){ //개행이 있다면 top조절하기
            $("#continue"+i).css({'top':'35px'});

        }else{
            $("#continue"+i).css({'top':'65px'});
        }
        $("#continue"+i).html(popupbtnArr[i]);
    }
    i=null;
     $("#continueAnne2").css({
        'top': '517px',
    })
     $("#continueL").css({'display':'block'})
    $("#continueCaution,#continueCaution2").css({'display':'block'})
    $("#continueAnne2").html(gabArr[2]); //두 번째 안내문구
}


lgcns.popup.Common.prototype.endDraw=function(){

    $('#continueBtn0').val("y[0]")
    $('#continueBtn1').val("y[1]")
     $("#PopupWindow").css({'top':'-1100px'})
}


lgcns.popup.Common.prototype.startDraw2=function(gab){
    $("#continueAnne").css({
        'top': '350px',
    })
    $("#PopupWindow").css({'top':'0px'})
    $("#continueAnne").html(gab);
    
    var i;
    $(".continueBtn").css({'display':'none'});
    $("#continueAnne2").css({
        'top': '470px',
    })
    $("#continueAnne2").html("떠나기 전, 잊으신 물건이 없는지 확인해주세요."); //두 번째 안내문구
    $("#continueCaution,#continueCaution2").css({'display':'none'})
    $("#continueL").css({'display':'none'})
    i=null;
}
lgcns.popup.Common.prototype.startDraw3=function(gab){
    eventFlag=false
    var gabArr=gab.split(";");
    var popupbtnArr=gabArr[1].split("|");
    $("#PopupWindow").css({'top':'0px'})
    $("#continueAnne").html(gabArr[0]);
    $("#continueAnne").css({
        'top': '161px',
    })
    
    $(".continueBtn").css({'display':'none'});
    var i;
    if(popupbtnArr.length==1){
        $("#continueBtn0").css({'border':'solid #222222 2px','background-color':'#ffffff'})
        $("#continue0").css({'color':'#222222'});
    }else{
        $("#continueBtn0").css({'border':'solid #d71921 2px','background-color':'#d71921'});
        $("#continue0").css({'color':'#ffffff'});
    }
    for(i=0;i<popupbtnArr.length;i++){
        $("#continueBtn"+i).css({'display':'inline-block'});
        if(popupbtnArr[i].indexOf("br")>0){ //개행이 있다면 top조절하기
            $("#continue"+i).css({'top':'52px'});
        }else{
            $("#continue"+i).css({'top':'67px'});
        }
        $("#continue"+i).html(popupbtnArr[i]);
    }
    i=null;
     $("#continueAnne2").css({
        'top': '517px',
    })
    $("#continueCaution,#continueCaution2").css({'display':'none'})
    $("#continueL").css({'display':'none'})
    $("#continueAnne2").html(gabArr[2]); //두 번째 안내문구
}
