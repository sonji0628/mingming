/*****************************************************************************
   기본상자 생성 클라스
   2015. 09. 02
   전기준 black™ (010-4255-3564)
   json이 아닌 xml파싱으로 변경함(2016_01_07)
       - ver 1.0.0.0 - 최초 작성
       - ver 1.0.0.1 - destory 함수를 여기로 이동함, cyg
       - ver 1.0.0.2 - tcolor, tbold 설정방식 개선, (하나은행) 클래스네임 추가
***********************************************************************************/
function txt_f(gab, lge) {  //버튼 표시 함수   
	if(gab.length){
        $(gab).find("bm").each(function(){
            txtArr.push($(this)) 
        });
        //onsole.log('갯수는:'+String(ifrArr.length))
		for (let i = 0; i < txtArr.length; i++) {
            
            // 코드통합 2021.01.22 (cyg) start ==>
            /** '0' 채움기능을 padStart() 함수로 대체
		    let tcolor = Number($(txtArr[i]).attr("tcolor")).toString(16);
		    if (tcolor.length == 4) {
		        tcolor = "00" + tcolor;//red가 없다면 0으로 변경
		    } else if (tcolor.length == 2) {
		        tcolor = "0000" + tcolor; //green이 없다면 0으로 변경
		    }else if(tcolor.length == 5){ // 파란색(#0699BE)의 경우 추가 - 2018. 08. 21 최승수
				tcolor = "0" + tcolor;
            }
            **/
           // text color 값을 htx string 으로 변경
           let tcolor = Number($(txtArr[i]).attr("tcolor")).toString(16).padStart(6,'0');
           // 코드통합 2021.01.22 (cyg) end <==

            
           // 코드통합 2021.01.22 (cyg) start ==>
            let tbold = "nomal";
            /* bold 조건설정을 위한 함수를 switch case 로 변경함
		    if ($(txtArr[i]).attr("boldis") == "1") {
                tbold = "bold"
            }
		    if ($(txtArr[i]).attr("fontis") == "nb" || $(txtArr[i]).attr("fontis") == "xb" || $(txtArr[i]).attr("fontis") == "lb") { //나눔고딕B,XB일때
		        tbold = "bold"
		    }
            if($(txtArr[i]).attr("fontis") == "ls"){   // 나눔스퀘어_B의 경우추가 - 2018. 08. 21 최승수
				tbold = "700";
			}
			if($(txtArr[i]).attr("fontis") == "ll"){ 
				tbold = "100";
			}
			if($(txtArr[i]).attr("fontis") == "lr"){ 
				tbold = "400";
			}
			if($(txtArr[i]).attr("fontis") == "yg"){ 
				tbold = "500";
                //tbold = "100";
            }
            */

		    if ($(txtArr[i]).attr("boldis") == "1") {
                tbold = "bold"
            }
            else{
                switch ( $(txtArr[i]).attr("fontis") )
                {
                    case "nb":  //나눔고딕B,XB일때
                    case "xb":
                    case "lb":
                        tbold = "bold";    
                        break;
                    case "ls":  // 나눔스퀘어_B
                        tbold = "700";
                        break;
                    case "ll":
                        tbold = "100";
                        break;
                    case "lr":
                        tbold = "400";
                        break;
                    case  "yg":
                        tbold = "500";
                        break;
                }
            }
            // 코드통합 2021.01.22 (cyg) end <==

            // 농협용 타이틀 텍스트 개행처리 2019.08.27 신성철
            let enter = false;
            let fontAll=""
            for(let j=0;j<$(txtArr[i]).attr("bText").length;j++){	//개행처리 for구문
                ////console.log($(txtArr[i]).attr("bText").charAt(j)+"("+$(txtArr[i]).attr("bText").charCodeAt(j)+")")
				if($(txtArr[i]).attr("bText").charCodeAt(j)==10){ //개행문자라면
				    fontAll+="<br>";   
                    enter = true;                             
				}else{                             
				    fontAll+=$(txtArr[i]).attr("bText").charAt(j);	
				}
			}

            let txt =$('<div></div>')  // 캡션문구
        
            
            let t_iname = $(txtArr[i]).attr("iname");

            // 농협용 타이틀 텍스트 일괄처리 2019.08.14 신성철
            if( t_iname === "stepDel" ) {
                $("#NH_msg").hide();
                $("#NH_step").hide();
                $("#NH_bottom").hide();
            } else if( t_iname === "txtDel" ) {
                $("#NH_msg").hide();
            } else if( t_iname === "bottomDel" ) {
                $("#NH_bottom").hide();
            } else if(t_iname === "infoText"){
                $("#NH_info_text").css("top","30px");
                $("#NH_info_text").css("line-height","31px");
                $("#NH_info_text").css("font-size","32px");
                $("#NH_info_text").html(fontAll);
                // 농협용 타이틀 텍스트 개행처리 2019.08.27 신성철
                if(enter){
                    $("#NH_info_text").css("top","8px");
                    $("#NH_info_text").css("line-height","38px");
                    $("#NH_info_text").css("font-size","30px");
                }
            } else if(t_iname === "txts"){
                $("#NH_txt_change").hide();
            }else {
                txt = $('<div>' + fontAll + '</div>'); //캡션문구	
                txt.attr({ 'id': 'txt' + i, 'class': 'txt'});//속성 추가			
                
                // 하나은행 클래스네임 추가
                let className = $(txtArr[i]).attr("iname").split(" ");//iname을 담아서..
                for(let j = 0;j < className.length;j++){//순회
                    if(isNaN(Number(className[j]))){//만약 class이름이 숫자가 아니라면..
                        txt.addClass(className[j]);
                    }
                }
    
                //className 클래스 추가(2021.03.19 이희수)
                var htmlClass = $(txtArr[i]).attr("className").split(" ");//className을 담아서..
                for(var j = 0;j < htmlClass.length;j++){//순회
                    if(isNaN(Number(htmlClass[j]))){//만약 class이름이 숫자가 아니라면..
                        txt.addClass(htmlClass[j]);
                    }
                }

                txt.css({
                    'font-size': Number($(txtArr[i]).attr("tsize")) + 'px',
                    'color': '#' + tcolor,
                    'letter-spacing': Number($(txtArr[i]).attr("lspacing")) + 'px',
                    'line-height': Number($(txtArr[i]).attr("linesp")) +Number($(txtArr[i]).attr("tsize"))+ 'px',
                    'text-align': $(txtArr[i]).attr("talign"),
                    'font-weight': tbold,
                    'position': 'absolute',
                    'top': Number($(txtArr[i]).attr("bmy"))  + 'px',
                    'left': Number($(txtArr[i]).attr("bmx")) + 'px',
                    //  'font-family': '산돌고딕 M',
                    'font-family': fontIs($(txtArr[i]).attr("fontis")),
                    'transform':'rotate('+$(txtArr[i]).attr("rotate")+'deg) scaleX('+$(txtArr[i]).attr("xscale")+')',
                    'transform-origin':'top left',
                    '-webkit-filter': 'opacity('+Number($(txtArr[i]).attr("alp"))*100+'%)',
                    'white-space': 'pre',
                    'z-index': Number($(txtArr[i]).attr("depthG"))
                })		
                
            
                $('#container').append(txt);
                //$("#g-container").contents().find("#container__uiCreator").append(txt)
                //$("#container__uiCreator").append(txt);


            }	
            tcolor=null;
            tbold=null
            fontAll=null
            txt=null
		}		
        gab = null;
	}
}	


//////////////////////////////////////////////////////////////////////////////////////////////////////
// 글자 Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고: iframe 의 html 교체시 DOM 이 자동으로 CLEAR 됨
function destroyTxt(){    
    
    if(txtArr.length>0){
        for(let i=0;i<txtArr.length;i++){     
            $('#txt'+i).remove();
            // $("#g-container").contents().find('#txt'+i).remove();
        }
        i=null;
    }
    txtArr = [];
}	