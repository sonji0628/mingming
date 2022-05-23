/*****************************************************************************
   동영상 생성 클라스
   2015. 09. 02
   전기준 black™ (010-4255-3564)
   json이 아닌 xml파싱으로 변경함(2016_01_07)
       ver 1.0.0.0 - 최초 작성
       ver 1.0.0.1 - destory 와 후처리 함수를 여기로 이동함, cyg
       ver 1.0.0.2 - 파일이름 과 함수이름 변경, flv.js -> video.js, flv_f() -> video_f(), flvArr-> videoArr cyg - 2021.01.19   
***********************************************************************************/
function video_f(gab, lge){  //버튼 표시 함수
	if(gab.length){
        $(gab).find("flvmovie").each(function(){  //동적텍스트 오브젝트를 배열로 넣기                     
            videoArr.push($(this)) 
        });		
		
		for(let i=0;i<videoArr.length;i++){
		    let flv = $('<video></video>'); //캡션문구	
            let flvname=$(videoArr[i]).attr("flvurl").split('.')[0]	
            console.log(flvname)
            flv.attr({ 'id': 'flv' + i, 'class': 'flv'  ,'src': 'video/'+flvname+'.webm', 'autoplay':Boolean($(videoArr[i]).attr("autoplay")), 'width':Number($(videoArr[i]).attr("flvw")), 'height':Number($(videoArr[i]).attr("flvh")), 'loop':true});//속성 추가
			flv.css({                                                            
				'position': 'absolute',
				//'top': ((12*i)+35)+"%",
				'top': Number($(videoArr[i]).attr("flvy")) + 'px',
				'left': Number($(videoArr[i]).attr("flvx")) + 'px',
                'z-index': Number($(videoArr[i]).attr("depthG"))
				//'border':'1px solid red'
			}) 
            
           
            $('#container').append(flv);		
            // $("#g-container").contents().find("#container__uiCreator").append(flv);
            //$("#container__uiCreator").append(flv);

            let myVideo=document.getElementById("flv" + i)
            //console.log("볼륨"+$(videoArr[i]).attr("vol"))
            try{
                myVideo.volume=Number($(videoArr[i]).attr("vol"));//볼륨 추가
            }catch(e){}
/*
            //uiCreator에서 요소 선택가능하도록 함.
            if(uiCreator){ //uiCreator변수가 true에서만 동작                
                $(".flv").on(eventType,function(){                    
                    $('#selectedBox').html("");
                    let selectBox=$("<div></div>");
                   // selectBox.attr({'draggable':'true'})
                    selectBox.css({
                        'top': $(this).css("top"),
                        'left': $(this).css("left"),                      
                        'width': $(this).attr("width"), 
                        'height':$(this).attr("height"), 
                    })
                    $('#selectedBox').append(selectBox);
                    ws_send("yoso`flv`"+$(this).prop("id").substring(3,$(this).prop("id").length));//UICreator에게 선택요소 알려주기(2019.02.27)
                })                
            }
*/
            flv=null;
		}
	}
}	

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 동영상 Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고: iframe 의 html 교체시 DOM 이 자동으로 CLEAR 됨
function destroyVideo(){    
    
    if(videoArr.length>0){
        for(let i=0;i<videoArr.length;i++){ 
            $('#flv'+i).remove();
            // $("#g-container").contents().find('#flv'+i).remove();
        }
        i=null;
    }
    videoArr = [];
}



//////////////////////////////////////////////////////////////////////////////////////////////////////
// 동영상 후처리 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////


/*************************************************************************************
	Description		: 동영상 play (농협 STM 소스)
	Input Param		: param1, param2
	Output Param	: None
	return Value	: None
**************************************************************************************/
function doVideoPlay( param1, param2)
{
	var bb = param1;
	var cc = param2;

    var myVideo = document.getElementById("flv" + bb);
    if( myVideo == null)
    {
        console.log("doVideoPlay: video 없음");
        return;
    }

	var tmpArr = cc.split(";");
	if (tmpArr[0] == "1") {
		myVideo.play();
	} else {
		myVideo.pause();
	};
	if (tmpArr.length > 1) {
		myVideo.volume = Number(tmpArr[1]);
	};
	myVideo = null;
	tmpArr = null;

}
