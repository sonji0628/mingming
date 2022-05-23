/*****************************************************************************
   기본상자 생성 클라스
   2015. 10. 23
   전기준 black™ (010-4255-3564)

   Revision History
        ver 1.0.0.0 - 최초 작성
        ver 1.0.0.1 - json이 아닌 xml파싱으로 변경함(2016_01_07)
        ver 1.0.0.2 - destory 함수를 여기로 이동, input parma 에 langugaeCode 추가, cyg
        ver 1.0.0.3 - ani 폴더위치를 aniDir 로 변경 (2021.01.19), cyg
        ver 1.0.0.4 (2021.02.05) - anitimeoutArr[] 를 common.js 에서 여기로 옮김, cyg 
***********************************************************************************/

let anitimeoutArr=[];  //타임아웃 해제하기 위한 배열 2015.10.26

function ani_f(gab, lge){  //버튼 표시 함수
    let aniMc=[];//시퀀스 객체
    if(gab.length){
        $(gab).find("img").each(function(){  //동적텍스트 오브젝트를 배열로 넣기                     
            aniArr.push($(this))
        });
	
		
		for(let i=0;i<aniArr.length;i++){ //메인이미지를 통해서 위치와 크기 설정하기
            let obj=new Object()
            if($(aniArr[i]).attr("order")=="1"){               
			     let ani = $('<div></div>'); //캡션문구	
			     ani.attr({ 'class': 'ani','id':'ani'+i});//속성 추가
			     let aniImg = $(aniArr[i]).attr("urlpath");
			     //let aniBgImg = $('<img src="ani/' + aniImg + '" id="aniImg'+$(aniArr[i]).attr("indexG")+'">')
			     let aniBgImg = $('<img src="' +aniDir+ aniImg + '" id="aniImg'+$(aniArr[i]).attr("indexG")+'">')
                 aniBgImg.css({                				
                    'width': Number($(aniArr[i]).attr("aniw")) + 'px',
                    'height': Number($(aniArr[i]).attr("anih")) + 'px'				
                 })  
                 
                 ani.css({    //style설정                                                        
                    'position': 'absolute',				
                    'top': (Number($(aniArr[i]).attr("aniy"))-5) + 'px',
                    'left': (Number($(aniArr[i]).attr("anix")) - 5) + 'px',
                    'z-index':Number($(aniArr[i]).attr("depthG"))
                    //'border':'1px solid red'
                 })                   
                 obj.indexG=$(aniArr[i]).attr("indexG");                  
                 let timerid;//타이머 아이디
                 obj.timerid=timerid
                 anitimeoutArr.push(obj.timerid);//타이머 아이디 해제를 위해서 배열로 넣기
                 obj.func=function(lists,timerid){ //시퀀스 속성값과 타이머 아이디 받아옴.                   //                        
                        let orderNum=0;//0배열부터 돌리기                                  
                        startAni();//애니스타트
                        function startAni(){                            
                            
                            clearTimeout(anitimeoutArr[Number(lists[orderNum].indexG)]);
                            //console.log("인덱스는:"+lists[orderNum].indexG+"/경로는:"+lists[orderNum].urlpath+"/"+lists[orderNum].visibleis+"/"+lists[orderNum].startTime+"/"+lists[orderNum].endTime+"/"+no())
                           // console.log("ani:"+lists[orderNum].urlpath)
                            if(lists[orderNum].visibleis=="1"){  //보이는 이미지일 경우
                                if(lists[orderNum].endTime=="999999999999"){
                                    //$("#aniImg"+lists[orderNum].indexG).attr("src",'ani/'+lists[orderNum].urlpath);//이미지 바꿔 치기
                                    $("#aniImg"+lists[orderNum].indexG).attr("src",aniDir+lists[orderNum].urlpath);//이미지 바꿔 치기
                                    anitimeoutArr[Number(lists[orderNum].indexG)]=setTimeout(startAni,lists[orderNum].interval); //타임아웃 다시 걸기
                                    orderNum++
                                    if(orderNum==lists.length){
                                        orderNum=0
                                    }
                                   
                                }else{
                                    if(Number(lists[orderNum].startTime) > Number(no()) || Number(lists[orderNum].endTime) < Number(no())){
                                         orderNum++
                                        if(orderNum==lists.length){
                                            orderNum=0
                                        }
                                        startAni();//다시 체크    
                                    }else{
                                        //$("#aniImg"+lists[orderNum].indexG).attr("src",'ani/'+lists[orderNum].urlpath);//이미지 바꿔 치기
                                        $("#aniImg"+lists[orderNum].indexG).attr("src",aniDir+lists[orderNum].urlpath);//이미지 바꿔 치기
                                        anitimeoutArr[Number(lists[orderNum].indexG)]=setTimeout(startAni,lists[orderNum].interval); //타임아웃 다시 걸기
                                        orderNum++
                                        if(orderNum==lists.length){
                                            orderNum=0
                                        }                                        
                                    }
                                }
                            }else{  //보이지 않는 이미지일 경우우
                                orderNum++
                                if(orderNum==lists.length){
                                    orderNum=0
                                }
                                startAni();//다시 체크                                
                            }                          
                        }
                     
                        function no(){ //타임체크용 함수
                            try{
                                let now = new Date();
                                let yy=String(now.getFullYear()).substr(2,2);//년
                                let mm;
                                if((now.getMonth()+1)<10){
                                    mm="0"+String(now.getMonth()+1)	
                                }else{
                                    mm=String(now.getMonth()+1)
                                }

                                let dd;
                                if(now.getDate()<10){
                                    dd="0"+String(now.getDate())
                                }else{
                                    dd=String(now.getDate())
                                }

                                let hh;
                                if(now.getHours()<10){
                                    hh="0"+String(now.getHours())
                                }else{
                                    hh=String(now.getHours())
                                }

                                let mi;
                                if(now.getMinutes()<10){
                                    mi="0"+String(now.getMinutes())
                                }else{
                                    mi=String(now.getMinutes())
                                }

                                let ss;
                                if(now.getSeconds()<10){
                                    ss="0"+String(now.getSeconds())
                                }else{
                                    ss=String(now.getSeconds())
                                }
                                now=null;
                                return yy+mm+dd+hh+mi+ss;	
                            }finally{                                
                                yy=null;
                                mm=null;
                                dd=null;
                                hh=null;
                                mi=null;
                                ss=null;
                            }
                        }
                     //orderNum=null
                   //
                   
                   
                 }
                 aniMc.push(obj);  //메인이미지 배열넣기
                 
                $('#container').append(ani);
                //$("#g-container").contents().find("#container__uiCreator").append(ani)
                 
			     $(ani).append(aniBgImg);
                 console.log("ani = " + ani)
/*
                //uiCreator에서 요소 선택가능하도록 함.
                if(uiCreator){ //uiCreator변수가 true에서만 동작                
                    $(".ani").on(eventType,function(){
                        console.log("버튼 눌렀어"+i)
                        $('#selectedBox').html("");
                        let selectBox=$("<div></div>");
                       // selectBox.attr({'draggable':'true'})
                        selectBox.css({
                            'top': $(this).css("top"),
                            'left': $(this).css("left"),                      
                            'width': $("#aniImg0").css("width"),
                            'height': $("#aniImg0").css("height")
                        })
                        $('#selectedBox').append(selectBox);
                        ws_send("yoso`ani`"+$(this).prop("id").substring(3,$(this).prop("id").length));//UICreator에게 선택요소 알려주기(2019.02.27)
                    })                
                }
*/
                ani=null
                aniBgImg=null
                aniImg=null
            }
            obj=null
		}
        for(let j=0;j<aniMc.length;j++){ //생성된 메인 이미지만큼 돌리자			
            aniMc[j].imgArr=[];
            for(i=0;i<aniArr.length;i++){   
                    let tmpObj=new Object()
                    /*
                    let myFunc=function(){
                        console.log("이미지:"+$("#ani" + i).scr)
                    }*/
					if(aniMc[j].indexG ==$(aniArr[i]).attr("indexG")){ //index값이 같다면 메인오브젝트배열에 각 속성배열 넣어보자             
                        tmpObj.indexG=$(aniArr[i]).attr("indexG");
                        tmpObj.urlpath=$(aniArr[i]).attr("urlpath");
                        tmpObj.startTime=$(aniArr[i]).attr("startTime");
                        tmpObj.endTime=$(aniArr[i]).attr("endTime");
                        tmpObj.interval=$(aniArr[i]).attr("interval");
                        tmpObj.order=$(aniArr[i]).attr("order");
                        tmpObj.visibleis=$(aniArr[i]).attr("visibleis");                           
                        aniMc[j].imgArr.push(tmpObj);                       
					}
                    tmpObj=null
                    //myfunc=null
            }   
            
            
            aniMc[j].func(aniMc[j].imgArr,aniMc[j].timerid);   //첫번째인자는 배열속성들, 두번째 인자는 타이머아이디-타이머 해제용
            
        }
        
        
        //console.log(aniMc)
	}
    aniMc=null;
    
    gab=null
}	

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 시퀀스 이미지 배열 Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고: iframe 의 html 교체시 DOM 이 자동으로 CLEAR 됨
function destroyAni(){     
    if(aniArr.length>0){
        for(let i=0;i<aniArr.length;i++){             
            $('#ani'+i).remove();
            // $("#g-container").contents().find('#ani'+i).remove();
        }
        i=null;
    }
    aniArr = [];
}	