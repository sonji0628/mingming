/*************************************************************************************
    FileName			:	ATEC_videoPlay.js
    Description			:	동영상삽입
	Created Date		:	2021-11-16, 손지민
	Created By			:	
    Revision History	:	
        ver 1.0.0.0 - 최초 작성
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/
"use strict";

for (var i = 0; i < cmArr.length; i++) {
	if (cmArr[i].class == "videoPlay") { //요기 바꿔주고
		cmArr[i].jsObj = new ATEC_videoPlay(Number(cmArr[i].index), cmArr[i].screenNumber); //요기 바꿔주고
		cmArr[i].jsObj.evt();
	}
}

function ATEC_videoPlay(ind,myPageNum) {
	this.top = Number($(cmArr[ind].xmlObj).attr("mby"));
	this.left = Number($(cmArr[ind].xmlObj).attr("mbx"));
	this.width = Number($(cmArr[ind].xmlObj).attr("mbw"));
	this.height = Number($(cmArr[ind].xmlObj).attr("mbh"));

	let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    let mySection;

	this.evt = function() {
        mySection = $(`<div id='videoSection'>
                            <div class='videoPlayBtn'>
                                <div class='btn'><img src='${iconsDir}playIcon.png'></div>
                                <div class='bgdimd'></div>
                            </div>
                            <video id='video' width='450px' height='460px' poster='${videoDir}${myPageNum}.jpg'>
                                <source src='${videoDir}${myPageNum}.webm' type='video/webm'>
                            </video>
                        </div>`);	
        $("#cm"+ind).append(mySection); 

        let videoPlayBtn = document.querySelector(".videoPlayBtn");  //비디오 재생 버튼 영역
        let videoControls = videoPlayBtn.querySelectorAll("div");    //비디오 재생 버튼 영역 내 div
        let video = document.querySelector("#video");                //비디오

        //비디오 컨트롤
        videoPlayBtn.addEventListener("click",togglePlay);
        video.addEventListener('play', function() {
            changeButtonState('playpause');
        }, false);
         video.addEventListener('pause', function() {
            changeButtonState('playpause');
        }, false);
        //

        function togglePlay(){
            if (video.paused || video.ended) video.play();
            else                             video.pause();

            setTimeout(function() {
                btnArr[0].dimd = 0;
                $("#btn0").css({'-webkit-filter': 'grayscale(0) opacity(1)'});
            }, 2000);
        }

        let changeButtonState = function(type) {
            // Play/Pause button
            if (type == 'playpause') {
               if (video.paused || video.ended) {
                    videoPlayBtn.setAttribute('data-state', 'play');
                    videoControls.forEach(element => element.style.visibility = "visible");
               }
               else {
                    videoPlayBtn.setAttribute('data-state', 'pause');
                    videoControls.forEach(element => element.style.visibility = "hidden");
               }
            }
         }
	}

	this.callF = function (gab) {
        const jsonObj = JSON.parse(gab);
	}
}
