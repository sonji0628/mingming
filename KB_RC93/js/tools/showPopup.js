/*****************************************************************************

    내용: css 및 js 로딩 함수
    최조 작성일: 2021. 02. 05
    작성자: ATEC AP, 이희수
    * get DATA : ShowPopup`화면타입|매체정보`AP전달텍스트
    * 화면타입 DATA : 1 => 처리중입니다. 잠시만 기다려주세요.
    *         DATA : 2 => "매체정보"를 읽고 있습니다. 잠시만 기다려주세요.
    *         DATA : 3 => "매체정보"를 세고 있습니다. 잠시만 기다려주세요.
    * 매체정보 DATA : 화면타입 1 => X , 화면타입 2 => readType Array 참고 , 화면타입 3 => countType Array 참고

    변경사항
        ver 1.0.0.0 - 최초 작성
        ver 1.0.0.1 (2021.02.18) - call_f2 에서 함수 호출하는 param 을 param1, param2 로 변경함, cyg
        ver 1.0.0.2 (2021.03.09) - 이미지 폴더위치를 상수형식 에서 imgOffical 변수로 변경함, cyg
                                    viewType 변수를 string 으로 변경함, 
                                    destoryPopup 함수 추가
                                    함수이름변경 : writePopup() => doPopup()
                                    입력 param1 의 입력 오류 검사 추가
                                    prarm1 이 0 이면 popup 종료 (테스트 용)
        ver 1.0.0.3 (2021.03.10) -  팝업별 고정 텍스트 AP 빈 값 여부로 나누어 들어가도록 변수로 대체, LHS
        ver 1.0.0.4 (2021.03.12) - param2 유무 검사 수정, cyg
        ver 1.0.0.5 (2021.05.21) - 다국어대응 폰트 적용, LHS
        ver 2.0.0.0 (2021.05.24) - 팝업 진행방식 변경, innerTxtTable에 다국어포함 모든 팝업 텍스트 담아두는 방식
        ver 3.0.0.0 (2022.01.05) - 국민은행 시재관리기 버전으로 수정
                                    하나은행과 다르게 AP에서 문구 및 버튼 셋팅 할 수 있도록 수정
***********************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

// 코드통합 2021.01.22 (cyg)
function doPopup(param1, param2, lge){    
    console.log("★doPopup★"+param1, param2,lge);
    destoryPopup(); // 이전에 그려진 popup 삭제

    let container = document.getElementById("container");
    let dimBg = document.createElement("div");
    dimBg.className = "dimBg";
    dimBg.innerHTML = `<div class="popup">
                            <div class="txtArea"></div>
                            <div class="btnArea"></div>
                        </div>`;
    container.append(dimBg);

    let popup = document.querySelector(".popup");
    popup.style = `
                position: relative;
                width: 700px;
                max-width: 80%;
                min-height: 410px;
                background: #fff;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-radius:20px;
                `;

    let txtArea = document.querySelector(".txtArea");
    txtArea.style = `
                min-height:350px;
                background:#fff;
                font-size:32px;
                color:#000;
                text-align:center;
                display:flex;
                flex-direction: column;
                justify-content: center;
                `;
    let btnArea = document.querySelector(".btnArea");
    btnArea.style = `
                height:60px;
                font-size:24px;
                color:#fff;
                text-align:center;
                display:flex;
                justify-content: space-between;
                align-items: center;
                background:#fff;
                `;

    let apTextData = param1;
    let apTextDataArr = apTextData.split("|");
    apTextDataArr = apTextDataArr.filter(function(item){ // 파라미터 값 중 값이 있는 것만 반환
        return item !== '';
    })
    let apBtnData = param2;
    let apBtnDataArr = apBtnData.split("|");

    //데이터 갯수만큼 돌려 리스트 생성하기
    for(let i=0; i < apTextDataArr.length; i++){
        dataSet("text", apTextDataArr[i]);
    }

    dataSet("btn", apBtnDataArr[0]);
    dataSet("btn", apBtnDataArr[1]);
    dataSet("btn", apBtnDataArr[2]);

    function dataSet(type, data){
        switch(type){
            case "text" :
                        let p = document.createElement("p");
                        p.className = "popTxt";
                        p.innerText = data;
                        txtArea.appendChild(p);

                        break
            case "btn" :
                        let btn = document.createElement("div");
                        btn.className = "popBtn";
                        btn.innerHTML = `<div class="btnTxt">${data}</div>`;
                        btn.classList = data == "" ? "empty_btn": data == "취소" ? "cancel_btn" : data == "확인" ? "confirm_btn" : "etc_btn";
                        console.log(data)
                        btnArea.appendChild(btn);

                        break
        }
    }
     
    //$("#container").append(dimdBg);

    //


    // //타입별 이미지설정
    // switch(param1){
    //     case "2|0" : dataImg = "popupCard";     break;
    //     case "2|1" : dataImg = "popupbankbook"; break;
    //     case "3|0" : dataImg = "insertcash";    break;
    //     case "3|1" : dataImg = "insertcheck";   break;
    //     case "3|2" : dataImg = "insertmixed";   break;
    // }

    // //국가별 폰트설정
    // switch(codeUpper){
    //     case "KR" : fontStyle='KoPub돋움체 Medium';     break;
    //     case "EN" : fontStyle='Arial';                  break;
    //     case "JP" : fontStyle='MS Gothic';              break;
    //     case "BT" : fontStyle='Tahoma';                 break;
    //     case "PH" : fontStyle='Arial';                  break;
    //     case "TI" : fontStyle='TH Baijam';              break;
    //     case "BG" : fontStyle='Bangla';                 break;
    //     case "TH" : fontStyle='Tahoma';                 break;
    //     case "RU" : fontStyle='Tahoma';                 break;
    //     case "GE" : fontStyle='Arial';                  break;
    //     case "SP" : fontStyle='Tahoma';                 break;
    //     case "FR" : fontStyle='Arial';                  break;
    //     case "IN" : fontStyle='Arial';                  break;
    //     case "SL" : fontStyle='FMBindumathi x';         break;
    //     case "PK" : fontStyle='Jameel Noori Nastaleeq'; break;
    //     case "CH" : fontStyle='SimSun';                 break;
    //     case "NP" : fontStyle='Preeti';                 break;
    //     case "CA" : fontStyle='ABC-TEXT-02';            break;
    //     case "ID" : fontStyle='Mangal';                 break;
    // }

    // // 팝업 타입별 컨테이너
    // let viewType1 = `
    // <div class="dimBg">
    //     <img src="${imgOffical}/motion/pop_type1.gif" class="loadingImg">
    //     <p class="popTxt" style="font-family:${fontStyle}">${innerTxtTable[codeUpper][param1]}</p>
    // </div>`;

    // let viewType2 = `
    // <div class="dimBg">
    //     <img src="${imgOffical}/${dataImg}.png" class="motionImg">
    //     <img src="${imgOffical}/motion/loading.gif" class="loadingBar">
    //     <p class="popTxt" style="font-family:${fontStyle}">${innerTxtTable[codeUpper][param1]}</p>
    // </div>`;

    // let viewType3 = `
    // <div class="dimBg">
    //     <img src="${imgOffical}/motion/loading.gif" class="loadingBar">
    //     <img src="${imgOffical}/motion/${dataImg}.gif" class="motionImg">
    //     <p class="popTxt" style="font-family:${fontStyle}">${innerTxtTable[codeUpper][param1]}</p>
    // </div>`;
    

    // // popup 화면에 그려주기
    // switch(viewType) {
    //     case 1 :    $("#container").append(viewType1);     break;
    //     case 2 :    $("#container").append(viewType2);     break;
    //     case 3 :    $("#container").append(viewType3);     break;
    // }

}

// 코드통합 2021.01.22 (cyg)
// popup 화면을 제거한다
function destoryPopup(){
    $(".dimBg").remove();
}


