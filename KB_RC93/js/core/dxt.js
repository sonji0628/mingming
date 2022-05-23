/*****************************************************************************
   동적텍스트 생성 클라스
   2015. 09. 09
   전기준 black™ (010-4255-3564)
   json이 아닌 xml파싱으로 변경함(2016_01_07)
	   ver 1.0.0.0 - 최초 작성
	   ver 1.0.0.1 - destory 와 후처리 함수를 여기로 이동함, cyg
	   ver 1.0.0.2 - 아랍어의 폰트 출력위치 (우->좌) 대응 필요함 (writing-mode:horizontal-rl 작업중...)
	   ver 1.0.0.3 (2021.02.01) - iname 클래스 추가, 손지민
	   ver 1.0.0.4 (2021.02.20) - text color 설정방식 개선, cyg
	   ver 1.0.0.5 (2021.04.16) - btn div 생성 시 속성 수정(class에 추가되던 iname 삭제. data-iname 속성을 추가하여 xml iname과 동일하게 셋팅)
	                              doTxtMsg 함수에서 indexG로 찾는 코드 iname으로 변경
***********************************************************************************/
function dxt_f(gab, lge) {  //동적텍스트 표시 함수	
    let zero;
	if(gab.length){
        $(gab).find("im").each(function(){  //동적텍스트 오브젝트를 배열로 넣기                     
            dxtArr.push($(this)) 
        });
		
		let zero
		for (let i = 0; i < dxtArr.length; i++) {

            // 코드통합 2021.01.22 (cyg) start ==>
            /** '0' 채움기능을 padStart() 함수로 대체
            //console.log(dxtArr[i]._bText)
		    let tcolor = Number($(dxtArr[i]).attr("tcolor")).toString(16);
            zero="000000";
	        zero=zero.substring(tcolor.length,zero.length)
	        tcolor=zero+tcolor;  
            **/
           // text color 값을 htx string 으로 변경
           let tcolor = Number($(dxtArr[i]).attr("tcolor")).toString(16).padStart(6,'0');
           // 코드통합 2021.01.22 (cyg) end <==
		   
            let tuline="0";//밑줄 추가 (black™ 전기준 - 2019.01.21)
            if ($(dxtArr[i]).attr("uLineis") == "1") {
                tuline = "2"
		    }
		    let tbold = "nomal";
		    // if (txtArr[i]._boldis == "1") {
		    if ($(dxtArr[i]).attr("fontis") == "nb" || $(dxtArr[i]).attr("fontis") == "xb" || $(dxtArr[i]).attr("fontis") == "ls") { //나눔고딕B,XB일때
		        tbold = "bold"
			} 
			// 작업중... 아랍어 폰트는 출력방향을 우 -> 좌 로 변경야 됨. (기본언어는 좌 -> 우)

		    //  }
            let fontAll=""
            for(let j=0;j<$(dxtArr[i]).attr("bText").length;j++){	//개행처리 for구문                
				if($(dxtArr[i]).attr("bText").charCodeAt(j)==10){ //개행문자라면
				    fontAll+="<br>";                                
				}else{                             
				    fontAll+=$(dxtArr[i]).attr("bText").charAt(j);	
				}
			}
		    let dxt;
            if($(dxtArr[i]).attr("inputis")=="1"){
                dxt = $('<input type="text" value="'+fontAll+'" autocomplete="off">'); //캡션문구	    
            }else{
                dxt = $('<div>' + fontAll + '</div>'); //캡션문구	
            }
			// btn html 속성에 iname 추가(마크업 표준에 맞춰 속성 이름 앞에 data- 붙임) 2021.04.16 손지민
		    dxt.attr({ 'id': 'dxt' + i, 'class': 'dxt', 'data-iname':$(dxtArr[i]).attr("iname")});//속성 추가
			const dxtIname = $(dxtArr[i]).attr("iname");

			//className 태그 추가되어 미사용코드 2021.04.16 손지민
			//iname 클래스 추가(2021.02.01 손지민)
			// var className = $(dxtArr[i]).attr("iname").split(" ");//iname을 담아서..
            // for(var j = 0;j < className.length;j++){//순회
            //     if(isNaN(Number(className[j]))){//만약 class이름이 숫자가 아니라면..
            //         dxt.addClass(className[j]);
            //     }
			// }

			//className 클래스 추가(2021.03.19 이희수)
			var htmlClass = $(dxtArr[i]).attr("className").split(" ");//className을 담아서..
            for(var j = 0;j < htmlClass.length;j++){//순회
                if(isNaN(Number(htmlClass[j]))){//만약 class이름이 숫자가 아니라면..
                    dxt.addClass(htmlClass[j]);
                }
			}

			if( dxtIname=== "depth1" || dxtIname === "depth2"){
				$(`#${dxtIname} .depthText`).html(fontAll);
			} else {
				dxt.css({
					'font-size': Number($(dxtArr[i]).attr("tsize")) + 'px',
					'color': '#' + tcolor,
					'letter-spacing': Number($(dxtArr[i]).attr("lspacing")) + 'px',
					'line-height': Number($(dxtArr[i]).attr("linesp")) +Number($(dxtArr[i]).attr("tsize"))+ 'px',
					'text-align': $(dxtArr[i]).attr("talign"),
					'font-weight': tbold,
					'border':'solid 0px',
					'border-bottom': tuline+'px solid #'+tcolor,  //underline추가
					//'padding-bottom':'7px',
					'position': 'absolute',
					'top': (Number($(dxtArr[i]).attr("bmy")) -Number($(dxtArr[i]).attr("linesp"))/2) + 'px',
					'left': Number($(dxtArr[i]).attr("bmx")) + 'px',
					'font-family': fontIs($(dxtArr[i]).attr("fontis")),
					'width': Number($(dxtArr[i]).attr("bwidth")) + 'px',
					'height': Number($(dxtArr[i]).attr("bheight")) + 'px',
					'word-wrap': 'break-word',
					'z-index': Number($(dxtArr[i]).attr("depthG")),
					'-webkit-filter': 'opacity(100%)',
				})			      
				$('#container').append(dxt);
                // $("#g-container").contents().find("#container__uiCreator").append(dxt)
				//$("#container__uiCreator").append(dxt)
			}
			
            tcolor=null;
            tbold=null
            tuline=null;
            fontAll=null
            dxt=null
		}
        zero=null;
	}
}	

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 동적 텍스트 Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고: iframe 의 html 교체시 DOM 이 자동으로 CLEAR 됨
function destroyDxt(){    
    
    if(dxtArr.length>0){
        for(let i=0;i<dxtArr.length;i++){   
			$('#dxt'+i).remove();
			// $("#g-container").contents().find('#dxt'+i).remove();
        }
        i=null;
    }
    dxtArr = [];
}	

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 동적 텍스트 후처리 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

/*************************************************************************************
	Description		: 글자 출력 (농협 STM 소스)
	Input Param		: param1, param2
	Output Param	: None
	return Value	: None
**************************************************************************************/
function doTxtMsg( param1, param2)
{
	var bb = param1;
	var cc = param2;

	//---------후처리 함수 개행처리------------- 
	var brStrArr = new Array('_[br]_','<br/>','\r\n') // 일단은 세 개만 넣었음.. 필요시 여기 추가하면됨
	//-----------------------------------------
	for (i = 0; i < dxtArr.length; i++) {
		//console.log("iname은:"+$(dxtArr[i]).attr("iname"))
		let myDxt = $(".dxt")[i];
		
		if ($(myDxt).data("iname") == bb) {  //iname에 맞는 dxt필드를 찾아서 글자 넣기
			//console.log("indexG는:"+$(dxtArr[i]).attr("indexG")) 
			var util = new Util();
			var tempCC = cc;
			if(tempCC.includes('〈') || tempCC.includes('〉') || tempCC.includes('＆') || tempCC.includes('＂')){
				tempCC = util.replaceAll(tempCC, '〈','<');
				tempCC = util.replaceAll(tempCC, '〉','>');
				tempCC = util.replaceAll(tempCC, '＆','&');
				tempCC = util.replaceAll(tempCC, '＂','"');
				//index를 찾아서 값 바꿔주는 코드 iname으로 변경
				$(myDxt).html(tempCC);
				//$("#dxt" + $(dxtArr[i]).attr("indexG")).html(tempCC);
			}else{
				$(myDxt).html(cc);
				//$("#dxt" + $(dxtArr[i]).attr("indexG")).html(cc);
			}

			//-------------------후처리 함수 개행처리 배열에 있는것만 검사 18.10.10 신성철----------------------------
			//2018 10 10 신성철
			for(var j = 0 ; j<brStrArr.length; j++) {
				if ($(myDxt).text().indexOf(brStrArr[j]) != -1) {
					//replacAll
					$(myDxt).html($(myDxt).text().split(brStrArr[j]).join('<br/>'));
				}
			}
			//----------------------------------------------------------------------------------------------------
		};
	};

}

