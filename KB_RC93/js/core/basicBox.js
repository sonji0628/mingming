/*****************************************************************************

   기본상자 생성 클라스
   2015. 09. 02
   전기준 black™ (010-4255-3564)
   Canvas 걷어내고 Css로 처리함(2015_10_08)
   json이 아닌 xml파싱으로 변경함(2016_01_07)
   그림자 기능확장 함.(2019.01.28)
       ver 1.0.0.0 - 최초작성
       vwr 1.0.0.1 - destory 함수를 여기로 이동함, cyg
***********************************************************************************/
function basicBox_f(gab, lge){  //버튼 표시 함수
    let zero;
	if(gab.length){
        $(gab).find("bgx").each(function(){
            bgxArr.push($(this))                            
        });
		
		for(let i=0;i<bgxArr.length;i++){   
            let bgx = $('<div></div>'); //캡션문구
            bgx.attr({ 'id': 'bgx' + i, 'class': 'bgx'});//속성 추가
            //그림자 처리
            let shadowDi=Number($(bgxArr[i]).attr("shadowDi"));
            let shadowAn=Number($(bgxArr[i]).attr("shadowAn"));
            let shadowBl=Number($(bgxArr[i]).attr("shadowBl"));
            let shadowSt=Number($(bgxArr[i]).attr("shadowSt"));  
            let shadowCo=Number($(bgxArr[i]).attr("shadowCo")).toString(16);  
            zero="000000";
	        zero=zero.substring(shadowCo.length,zero.length)
	        shadowCo=zero+shadowCo;
            
            let shadowIn=$(bgxArr[i]).attr("shadowIn");
            if(shadowIn=="true"){
                shadowIn="inset";
            }else if(shadowIn=="false"){
                shadowIn="";
            }
            let shadowX=shadowDi*Math.cos(shadowAn*Math.PI/180);
            let shadowY=shadowDi*Math.sin(shadowAn*Math.PI/180);
            let shadowGab=""
            
            if($(bgxArr[i]).attr("shadowis")=="1"){ //그림자가 있다면
                shadowGab=shadowX+'px '+shadowY+'px '+shadowBl+'px '+shadowSt+'px '+'rgba('+Number(String(parseInt(shadowCo.substr(0,2),16)))+','+Number(String(parseInt(shadowCo.substr(2,2),16)))+','+Number(String(parseInt(shadowCo.substr(4,2),16)))+','+Number($(bgxArr[i]).attr("shadowAl"))+') '+shadowIn;
            }else{
                shadowGab='0px 0px rgba(0,0,0,0))';
            }
            //배경칼라            
            let bcolor=Number($(bgxArr[i]).attr("bgco")).toString(16);
            zero="000000";
	        zero=zero.substring(bcolor.length,zero.length)
	        bcolor=zero+bcolor;
            
            //라인칼라-라인칼라를 16진법으로 변환하여 6자리로 바꾸기              
            let lcolor=Number($(bgxArr[i]).attr("lco")).toString(16);
            zero="000000";
	        zero=zero.substring(lcolor.length,zero.length)
	        lcolor=zero+lcolor;
            
            //className 클래스 추가(2021.03.19 이희수)
			var htmlClass = $(bgxArr[i]).attr("className").split(" ");//className을 담아서..
            for(var j = 0;j < htmlClass.length;j++){//순회
                if(isNaN(Number(htmlClass[j]))){//만약 class이름이 숫자가 아니라면..
                    bgx.addClass(htmlClass[j]);
                }
			}

            bgx.css({                                                            
				'position': 'absolute',
				//'top': ((12*i)+35)+"%",
				'top': Number($(bgxArr[i]).attr("ygab")) + 'px', //두께만큼 빼줘야 함.
				'left': Number($(bgxArr[i]).attr("xgab")) + 'px',
                'z-index':Number($(bgxArr[i]).attr("depthG")),
				'width': Number($(bgxArr[i]).attr("wgab")) + 'px', //두께만큼 빼줘야 함.
                'height': Number($(bgxArr[i]).attr("hgab")) + 'px',
                'box-shadow': shadowGab, 
                'background-color': 'rgba('+Number(String(parseInt(bcolor.substr(0,2),16)))+','+Number(String(parseInt(bcolor.substr(2,2),16)))+','+Number(String(parseInt(bcolor.substr(4,2),16)))+','+Number($(bgxArr[i]).attr("balpha"))+')',     
                'border': Number($(bgxArr[i]).attr("lth"))+'px solid rgba('+Number(String(parseInt(lcolor.substr(0,2),16)))+','+Number(String(parseInt(lcolor.substr(2,2),16)))+','+Number(String(parseInt(lcolor.substr(4,2),16)))+','+Number($(bgxArr[i]).attr("lalpha"))+')',//"#000000";;
                'border-radius': Number($(bgxArr[i]).attr("xround"))/2+'px',
                'background-clip': 'content-box',//라인과 배경이 겹치지 않도록 하기위함.
                'transform':'rotate('+$(bgxArr[i]).attr("rotate")+'deg)',
                'transform-origin':'top left'
                    //'border':'1px solid red'
            })                    
            // returnArr.push(bgx);
            $('#container').append(bgx);
            //$("#g-container").contents().find("#container__uiCreator").append(bgx)
            shadowDi=null;
            shadowAn=null;
            shadowBl=null;
            shadowSt=null;  
            shadowCo=null;  
            shadowIn=null;
            shadowX=null;
            shadowY=null;
            shadowGab=null;
            
            bgx=null;
        }
        // return returnArr;
	}
}	


//////////////////////////////////////////////////////////////////////////////////////////////////////
// 기본상자 Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고: iframe 의 html 교체시 DOM 이 자동으로 CLEAR 됨
function destroyBgx(){    
    if(bgxArr.length>0){
        for(let i=0;i<bgxArr.length;i++){                       
            $('#bgx'+i).remove();
            // $("#g-container").contents().find('#bgx'+i).remove();
        }
        i=null;
    }
    bgxArr = [];
}