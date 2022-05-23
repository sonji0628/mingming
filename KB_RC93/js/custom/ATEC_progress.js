/*************************************************************************************
    FileName			:	ATEC_progress.js
    Description			:	진행상태를 표시하는 progress bar 표시 함수
    Created Date		:	2021.04.08
    Created By			:	ATEC AP, 
    Revision History	:	
            ver 1.0.0.0 (2021.04.08) - 최초작성 (김성윤)             
            ver 1.0.0.1 (2021.05.03) - timer중복실행 방지 (김성윤)
                                       말풍선 위치 조절 (김성윤)
            ver 1.0.0.6 (2021.05.24) - 특수화면을 cm tag 로 완전전환, 관련 변수 변경 (cyg)		
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2021  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

"use strict";
for (let i = 0; i < cmArr.length; i++) {
    console.log("cmArr[i].class: " + cmArr[i].class);
    if (cmArr[i].class == "progress") { //요기 바꿔주고
        cmArr[i].jsObj = new Progress( Number(cmArr[i].index) ); //요기 바꿔주고
        cmArr[i].jsObj.evt();
    }
}


function Progress(ind) {

    this.evt = function () { //전처리함수
        
        countTime = $(cmArr[ind].xmlObj).attr("param");

        initStyle();    // ProgressBar 스타일 초기화
        drawBG();       // ProgressBar 배경 초기화
        fill();         // ProgressBar 시작 
        
    }

    this.callF = function (gab) { // 후처리함수
        const jsonObj = JSON.parse(gab);
    }    
   
    var holder = $('#cm' + ind);  

    const DEFAULT_FILL_COLOR = '#00C3B8';
    const DEFAULT_BG_COLOR = '#DDDDDD';  
    
    const DEFAULT_TRACK_WIDTH = 720;
    const DEFAULT_TRACK_HEIGHT = 10;
    const DEFAULT_BALLOON_WIDTH = 54;

    var context, canvas;
    let text = '',
        styleStr = '';
    
    var startTime;
      
    var countTime = 120000;
    var startTime = Date.now();


    /**
     * 옵션에 따른 스타일링 초기화
     * 
     * @param {Object} options  스타일 옵션
     */
    function initStyle(options = null) {

        let fillColor = (options && options.fillColor) ? options.fillColor : DEFAULT_FILL_COLOR;
        let trackColor = (options && options.trackColor) ? options.trackColor : DEFAULT_BG_COLOR;
        let trackHeight = (options && options.trackHeight) ? options.trackHeight : DEFAULT_TRACK_HEIGHT;
        
        styleStr += `#pContainer {
            width: ` + (DEFAULT_TRACK_WIDTH + DEFAULT_BALLOON_WIDTH) + `px;       
            height: 68px;     
            left: 0px;
            position: absolute;
        }`;

        styleStr += `#canvas {
            width: ` + (DEFAULT_TRACK_WIDTH + DEFAULT_BALLOON_WIDTH) + `px;            
            position: absolute; 
        }`;
        
        // ProgressBar 배경(Track) 스타일 정의
        styleStr += `#bg {
            width: ` + DEFAULT_TRACK_WIDTH + `px;
            height: ` + trackHeight + `px;
            top: 0px; 
            left: ` + DEFAULT_BALLOON_WIDTH / 2 + `px;
            background-color: ` + trackColor + `;
            position: absolute;
        }`;

        // ProgressBar Fill영역 스타일 정의
        styleStr += `#fillDiv {           
            height: ` + trackHeight + `px;        
            top: 0px; 
            left: ` + DEFAULT_BALLOON_WIDTH / 2 + `px;            
            background-color: ` + fillColor + `;` +
            `position: absolute;
        }`;

        // Style적용
        let style = document.createElement('style');
        style.innerHTML = styleStr;
        let ref = document.querySelector('script');
        ref.parentNode.insertBefore(style, ref);
    }

    /**
     * ProgressBar 배경 그리기
     */
    function drawBG() {        

        // ProgressBar 전체를 담은 컨테이너 생성
        const pContainer = document.createElement("div");
        pContainer.id = "pContainer";

        // 말풍선을 그릴 Canvas 생성
        canvas = document.createElement("canvas");        
        canvas.width = DEFAULT_TRACK_WIDTH + DEFAULT_BALLOON_WIDTH;     
        canvas.id = "canvas";
        context = canvas.getContext("2d");
        pContainer.appendChild(canvas);

        // 배경초기화
        const bgDiv = document.createElement("div");
        bgDiv.id = "bg";
        pContainer.appendChild(bgDiv);

        // Fill영역 초기화
        const fillDiv = document.createElement("div");
        fillDiv.id = "fillDiv";
        pContainer.appendChild(fillDiv);

        holder.append(pContainer);
    }

    /**
     * ProgressBar 그리기
     */
    function fill() {

        if(window.timer != null) {
            clearInterval(timer);
        }

        window.timer = setInterval(frame, 20);

        function frame() {
            let timePassed = Date.now() - startTime;
            let fillPercent = (timePassed * 100) / countTime;

            if (timePassed >= countTime) {
                // 시간이 완료되었을 경우(Timer 완료)
                clearInterval(timer);
                fillPercent = 100;               
            }

            text = getLeftTime(countTime, timePassed);
            
            try {                
                fillDiv.style.width = (DEFAULT_TRACK_WIDTH * fillPercent) / 100 + "px";
                drawBalloon(fillDiv.offsetWidth, 20, DEFAULT_BALLOON_WIDTH, 23, 15, 9);
            } catch {
                console.log('[ATEC_progress.js] 에러발생');
                clearInterval(window.timer);
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }

    /**
     * 남은 시간구하기
     * 
     * ex) _getLeftTime(120000, 4000)
     *     총 카운트시간 2분, 지나간 시간 4초 
     *     return 1:56
     * 
     * @param {number} totalSecond   // 카운트할 시간(초, ms)
     * @param {number} passedSecond  // 지나간 시간(초, ms)
     * 
     * @return {String} leftTime    // 남은시간
     */
    function getLeftTime(totalSecond, passedSecond) {

        let leftSecond = Math.floor((totalSecond - passedSecond) / 1000); // 남은시간 (초)
        let minitue = Math.floor(leftSecond / 60);
        let second = padding(Math.floor(leftSecond % 60));

        if (minitue < 0) minitue = 0;
        if (second < 0) second = 0;

        return minitue + ':' + second;

        function padding(str) {
            if (str.toString().length == 1) return "0" + str;
            return str;
        }

    }

    /**
     * 말풍선 그리기
     * 
     * @param {number} offsetX 
     * @param {number} offsetY 
     * @param {number} balloonWidth 
     * @param {number} balloonHeight 
     * @param {number} balloonTailWidth 
     * @param {number} balloonTailHeight 
     */
    function drawBalloon(offsetX, offsetY, balloonWidth, balloonHeight, balloonTailWidth, balloonTailHeight) {
             
        offsetX = offsetX;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();

        let region = new Path2D();

        region.moveTo(offsetX, balloonTailHeight + offsetY);
        region.lineTo((balloonWidth - balloonTailWidth) / 2 + offsetX, balloonTailHeight + offsetY);
        region.lineTo(balloonWidth / 2 + offsetX, offsetY);
        region.lineTo((balloonWidth - balloonTailWidth) / 2 + balloonTailWidth + offsetX, balloonTailHeight + offsetY);
        region.lineTo(balloonWidth + offsetX, balloonTailHeight + offsetY);
        region.lineTo(balloonWidth + offsetX, balloonHeight + balloonTailHeight + offsetY);
        region.lineTo(offsetX, balloonHeight + balloonTailHeight + offsetY);
        region.lineTo(offsetX, balloonHeight + offsetY);

        region.closePath();

        context.fillStyle = '#00C3B8';
        context.fill(region, 'evenodd');

        context.font = "15px Helvetica";
        context.fillStyle = '#FFFFFF';

        let textX = offsetX + (balloonWidth - context.measureText(text).width) / 2;
        let textY = offsetY + balloonHeight;

        context.fillText(text, textX, textY + 2);
    }   
}