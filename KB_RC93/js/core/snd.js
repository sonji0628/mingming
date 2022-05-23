/*************************************************************************************
	FileName			:	snd.js
	Description			:	sound (mp3) 출력을 위한 함수
	Created Date		:	2020.06.23
    Created By			:	ATEC AP, cyg
    주의사항             :
        - chrome 의 보안정책으로, audio.play() 가 최초 터치후 함수 동작함
        - 크롬에서 테스트를 위해서는 시작시 option 추가 필요함: chrome.exe --autoplay-policy=no-user-gesture-required
    Revision History	:	
        - ver 1.0.0.0 (2020.06.23) - snd 전처리 함수 추가, cyg
        - ver 1.0.0.1 (2020.07.03) - bleep sound 가 빨리 반복호출되면 오류발생되는 현상 개선 후 함수 추가, cyg
        - ver 1.0.0.2 (2021.01.18) - mp3 폴더를 mp3Dir 변수로 변경, snd 폴더를 sndDir 변수로 변경함. cyg
        - ver 1.0.0.3 (2021.05.10) - snd tag 의 mp3 file 이름 앞에 space 있는경우에도 정상적으로 소리 출력하게 수정함, cyg
                                     미사용 변수 (soundFlag) 삭제
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

// ---------------------------------------------------------------------------------------
// 상수선언
const loadSound = new Audio(); // 화면로드사운드
//var soundFlag = true;  // false일경우 loadSound 출력안함.

// sound 출력 함수	
function snd_f(xmlData, lge) 
{  
    console.log(xmlData);

    // 사운드 데이터 유무 확인
    if( xmlData.text().length == 0 ) return;

    let tmpSndPath = $(xmlData).text().trim();
    console.log(`### :mp3Dir=[${mp3Dir}] tmpSndPath=[${tmpSndPath}]`);

    loadSound.src = mp3Dir + String(tmpSndPath);
    loadSound.preload = "auto";
    loadSound.currentTime = 0;
    loadSound.volume = .6;
    //loadSound.muted = "muted";
    try {
        loadSound.play();
    } catch (e) {
        console.log("사운드 플레이 에러: " + e);
    }

    tmpSndPath = null;


    /**
	//화면 사운드가 있으면 출력을 수행한다
	if (xmlData.text().length > 0 && soundFlag) 
	{ 
        //console.log("snd="+xmlData.text());
		var length = xmlData.text().length;
        var tmpSndPath = "";
        for (i = 0; i < length; i++) {
			if ( xmlData.text().charCodeAt(i) != 10 && xmlData.text().charCodeAt(i) != 9) 
			{
                tmpSndPath += xmlData.text().charAt(i);
            };
		};
        
        console.log(`### :mp3Dir=[${mp3Dir}] tmpSndPath=[${tmpSndPath}]`);
        // loadSound.src = "mp3/" + String(tmpSndPath).split(".")[0] + ".wav";
        //loadSound.src = "../mp3/" + String(tmpSndPath);
        loadSound.src = mp3Dir + String(tmpSndPath);
        loadSound.preload = "auto";
        loadSound.currentTime = 0;
        loadSound.volume = .6;
        //loadSound.muted = "muted";
        try {
            loadSound.play();
        } catch (e) {
            console.log("사운드 플레이 에러: " + e);
        }

        tmpSndPath = null;
    };
    **/
}

// sound play 를 stop 한다.
function stopSnd()
{
	// sound play 를 stop 한다.
    loadSound.pause();


}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 동적 텍스트 Resouce 초기화 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 참고: iframe 의 html 교체시 DOM 이 자동으로 CLEAR 됨
function destroySnd(){    

	// sound play 를 stop 한다.
	loadSound.pause();
	
}	



//////////////////////////////////////////////////////////////////////////////////////////////////////
// 경고음과 알림음 출력을 안전하게 출력하기 위한 함수
//////////////////////////////////////////////////////////////////////////////////////////////////////



// ---------------------------------------------------------------------------------------
// 버튼 클릭 소리 설정 

const bleep = new Audio(); // 클릭음
//bleep.src = "../snd/ding2.wav"; 
bleep.src = sndDir+"ding2.wav"; 
bleep.preload = "auto";

let isPlayingBleep = false;

// On video playing toggle values
bleep.onplaying = function() {
    isPlayingBleep = true;
};

// On video pause toggle values
bleep.onpause = function() {
    isPlayingBleep = false;
};

// 클릭음 중지 함수
// sound 가 빨리 반복호출되면 오류발생되는 현상 개선
function bleepPause()
{
    if (!bleep.paused && isPlayingBleep) {
        bleep.pause();
    }
}

// 클릭음 실행 함수
// sound 가 빨리 반복호출되면 오류발생되는 현상 개선
function bleepPlay()
{
    // 출력중인 클릭음 종료
    bleepPause();

    if (bleep.paused && !isPlayingBleep) {
        bleep.currentTime = 0;
        bleep.play();
    }
}


// ---------------------------------------------------------------------------------------
// 경고음 설정
/**
class Audio1 {
    alertSound;
    getAlertSound() {
        return this.alertSound
    }
    setAlertSound() {

    }
    getVar () {
        return {
            alertSound
        }
    }
    constructor(param) {
        alertSound = new Audio();
        alertSound.src = "../snd/alert.wav"; 
        alertSound.preload = "auto";
    }
    onplaying() {
        console.log("소리냄")
        this.alertSound
    }
    onpause() {
        console.log("멈춤")
    }
}

let util = {};
util.pro

const audio1 = new Audio1("111")
console.log(audio1.alertSound)
audio1.onplaying

**/

const alertSound = new Audio(); // 알림음
//alertSound.src = "../snd/alert.wav"; 
alertSound.src = sndDir+"alert.wav"; 
alertSound.preload = "auto";

let isPlayingAlert = false;

// On video playing toggle values
alertSound.onplaying = function() {
    isPlayingAlert = true;
};

// On video pause toggle values
alertSound.onpause = function() {
    isPlayingAlert = false;
};

// 클릭음 중지 함수
// sound 가 빨리 반복호출되면 오류발생되는 현상 개선
function alertPause()
{
    if (!alertSound.paused && isPlayingAlert) {
        alertSound.pause();
    }
}

// 클릭음 실행 함수
// sound 가 빨리 반복호출되면 오류발생되는 현상 개선
function alertPlay()
{
    // 출력중인 경고음 종료
    alertPause();

    if (alertSound.paused && !isPlayingAlert) {
        alertSound.currentTime = 0;
        alertSound.play();
    }
}


/**
 * 오디오 파일 재생
 * 
 * @author 김성윤
 * @since  2021.05.10
 * @param  {string} filePath Audio 파일경로
 * @param  {string} fileName Audio 파일명
 */
function playAudio(fileName, filePath = 'sound/snd/') {

    let audio = new Audio();
    audio.src = filePath + fileName;    
    audio.preload = "auto";
    audio.currentTime = 0;
    audio.volume = .6;

    // 재생완료
    audio.onended = (event) => {
        
    }

    // 재생가능상태
    audio.oncanplaythrough = (event) => {         
        let playedPromise = audio.play();
        if (playedPromise) {
            playedPromise.catch((e) => {
                console.log(e)
                if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') { 
                    //console.log(e.name);
                }
            }).then(() => {
                // 재생성공
            });
        }
    }    
} 

