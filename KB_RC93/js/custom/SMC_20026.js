/*************************************************************************************
    FileName			:	SMC_20026.js
    Description			:	smc 기기볼륨설정화면
    Created Date		:	2019.01.29
    Created By			:	ATEC AP, (신성철)
    Revision History	:	
             ver 1.0.0.0 (2019.01.29) - 최초작성
                                        리턴 기준
                                        0 - 0%, 1 - 5%, 2 - 10%, 3 - 20%, 4 - 40%, 5 - 60%, 6 - 80%, 7 - 100%
                                        음량 버튼 클릭시 바로 리턴을 날리는 형태
                                        Ex. 20% 음량 조절버튼을 누르게 되면 A[3] 으로 리턴됨
                                        전달받는 파라미터는 3 , 5 이런식으로 한개만 해주시면 됩니다.(신성철)
             ver 1.0.0.2 (2019.01.29) - JSON 변환 css 분리 완료 (신성철)
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
    if (cmArr[i].class == "20026") { //요기 바꿔주고
        cmArr[i].jsObj = new SMC_20026(Number(cmArr[i].index)); //요기 바꿔주고
        cmArr[i].jsObj.evt();
    }
}

function SMC_20026(ind) {
    let UTIL = new Util();
    let evtParam = $(cmArr[ind].xmlObj).attr("param"); //초기 파라미터값 넣어주기
    const sound_imgList = {
        "img": ["v0.png", "v5.png", "v10.png", "v20.png", "v40.png", "v60.png", "v80.png", "v100.png"]
    };

    const sound_bar_imgList = {
        "img": ["bar_g0.png", "bar_g5.png", "bar_g10.png", "bar_g20.png", "bar_g40.png", "bar_g60.png", "bar_g80.png", "bar_g100.png"]
    };

    // 선택된 값이 들어온 이후의 변경된 이미지 리스트
    const change_sound_imglist = {
        "img": ["v0_s.png", "v5_s.png", "v10_s.png", "v20_s.png", "v40_s.png", "v60_s.png", "v80_s.png", "v100_s.png"]
    };

    const change_sound_bar_imglist = {
        "img": ["bar_g0_s.png", "bar_g5_s.png", "bar_g10_s.png", "bar_g20_s.png", "bar_g40_s.png", "bar_g60_s.png", "bar_g80_s.png", "bar_g100_s.png"]
    };

    
    this.evt = function () {
        $('#cm'+ind).append($("<div id='SMC_20026_soundContainer' class='SMC'></div>"));

        // 스피커 버튼 위의 BAR 형태의 음량 크기 설정 부분
        for (let i = 0; i < sound_bar_imgList.img.length; i++) {
            let soundArea = $("<div class= soundBar" + i + "></div>");
            let barImage = $("<img id='SMC_20026_imgBar" + i + "' class='SMC_20026_imgBar'></img>");
            barImage.attr({
                'src': './images/img_kr/' + sound_bar_imgList.img[i],
            });
            $('#SMC_20026_soundContainer').append(soundArea);
            $(soundArea).append(barImage);
        }

        // 스피커 버튼 동적 생성 부분
        for (let i = 0; i < sound_imgList.img.length; i++) {
            let btnImage = $("<img id='SMC_20026_imgBtn" + i + "' class='SMC_20026_imgBtn' index=" + i + "></img>");
            btnImage.attr({
                'src': './images/img_kr/' + sound_imgList.img[i]
            });
            $('.soundBar' + i).append(btnImage);
            $("#SMC_20026_imgBtn" + i).on("mousedown", soundController_Click);
        }
        this.callF(evtParam);
    }
    this.callF = function (gab) {
        let volume = gab;
        basicSetting(volume);
        UTIL.setReturnBtn("A[" + volume + "]", "confirm");
    }
    function basicSetting(basicParam) {
        console.log("함수 내부에 전달된 값 : " + basicParam)
        switch (basicParam) {
            case '0':
                basicParam = 0;
                break;
            case '1':
                basicParam = 1;
                break;
            case '2':
                basicParam = 2;
                break;
            case '3':
                basicParam = 3;
                break;
            case '4':
                basicParam = 4;
                break;
            case '5':
                basicParam = 5;
                break;
            case '6':
                basicParam = 6;
                break;
            case '7':
                basicParam = 7;
                break;
            default:
                basicParam = 0;
                break;
        }
        if (basicParam == 0) {
            $('#SMC_20026_imgBar0').attr("src", "./images/img_kr/" + change_sound_bar_imglist.img[0]);
        } else {
            for (let i = 0; i <= basicParam; i++) {
                $('#SMC_20026_imgBar' + i).attr("src", "./images/img_kr/" + change_sound_bar_imglist.img[i]);
            }
        }
        // 눌렀을 경우 버튼의 색상을 변경할 부분
        $('#SMC_20026_imgBtn' + basicParam).attr("src", "./images/img_kr/" + change_sound_imglist.img[basicParam]);
    }
    function soundController_Click() {
        // 처음 세팅된 값을 초기화 하기 위함.
        if (0) {
            $('#SMC_20026_imgBar0').attr("src", "./images/img_kr/" + sound_bar_imgList.img[0]);
        } else {
            for (let i = 0; i <= sound_bar_imgList.img.length; i++) {
                $('#SMC_20026_imgBar' + i).attr("src", "./images/img_kr/" + sound_bar_imgList.img[i]);
                $('#SMC_20026_imgBtn' + i).attr("src", "./images/img_kr/" + sound_imgList.img[i]);
            }
        }

        // 클릭이 된 이벤트를 실질적으로 시행할 부분
        const clickBtnId = this.id;
        const returnVAL = this.getAttribute("index")
        if (returnVAL == 0) {
            $('#SMC_20026_imgBar0').attr("src", "./images/img_kr/" + change_sound_bar_imglist.img[0]);
        } else {
            for (let i = 0; i <= returnVAL; i++) {
                $('#SMC_20026_imgBar' + i).attr("src", "./images/img_kr/" + change_sound_bar_imglist.img[i]);
            }
        }

        // 눌렀을 경우 버튼의 색상을 변경할 부분
        $('#' + clickBtnId).attr("src", "./images/img_kr/" + change_sound_imglist.img[returnVAL]);

        if(clickBtnId.substr(clickBtnId.length-1) == "1") {
            bleep.volume = 0.14;
        } else if(clickBtnId.substr(clickBtnId.length-1) == "2") {
            bleep.volume = 0.28;
        } else if(clickBtnId.substr(clickBtnId.length-1) == "3") {
            bleep.volume = 0.43;
        } else if(clickBtnId.substr(clickBtnId.length-1) == "4") {
            bleep.volume = 0.57;
        } else if(clickBtnId.substr(clickBtnId.length-1) == "5") {
            bleep.volume = 0.71;
        } else if(clickBtnId.substr(clickBtnId.length-1) == "6") {
            bleep.volume = 0.86;
        } else if(clickBtnId.substr(clickBtnId.length-1) == "7") {
            bleep.volume = 1;
        } else if(clickBtnId.substr(clickBtnId.length-1) == "0") {
            bleep.volume = 0;
        }
        //리턴을 실행할 부분
        console.log("리턴 발생 : " + "A[" + returnVAL + "]")
        bleepPlay();

        UTIL.setReturnBtn("A[" + returnVAL + "]", "confirm");
    }

}
