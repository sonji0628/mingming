// 공통 json parsing
"use strict";

//카세트 구분을 KIND에서 같이 내려받고 있어 포함된 string 을 분리하기 위해 js 추가됨 - 추후 삭제 예정
function parseJson(data, type, process) {  // data = 소켓으로 받은 json, type = 처리할 권종 타입, process = 처리방식(같은 권종 모음 = sum | 카세트별 분리 = detach | 그대로 가져옴 == basic)

    var setData = [];  // json 데이터 정리해서 담을 배열(2차원 배열)  =  0 : 권종(한글), 1 : 권종(숫자), 2 : MAX, 3 : NOW, 4 : NEW <- 현금, 동전 등의 경우
                        // 현금, 동전등이 아닐 경우 해당 값을 그대로 전달
    const name = Object.getOwnPropertyNames(data);

    for(var i = 0 ; i < name.length ; i++) {
        if(name[i] == type) {
            if(process == "detach" || process == "sum" || process == "basic") {
                setData = intDataSetting(data[name[i]], type, process);
                return setData;
            } else if(process == "text") {
                setData.push(data[name[i]][0]["SRV_CENTER_PHNUM"]);
                setData.push(data[name[i]][0]["STORE_NM"]);
                return setData;
            } else if(process == "singleNum") {
                return data[name[i]];
            }
        }
    }
}

//사용할 권종 체크
function kindCheck(data) {
    const kind = [["백만원", "1000000"], ["오십만원", "500000"], ["삼십만원", "300000"], ["십만원", "100000"], ["오만원", "50000"], ["만원", "10000"], ["오천원", "5000"], ["이천원", "2000"], ["천원", "1000"], ["오백원", "500"], ["백원", "100"], ["오십원", "50"], ["십원", "10"]];
    for(var i = 0 ; i < kind.length ; i++) {
        if(kind[i][1] == data) {
            return kind[i];
        }
    }
}

//data 정렬 반복함수
function intDataSetting(data, type, process) {

    var getData = [];

    if(process == "detach") { //같은 권종 분리하기
        for(var i = 0 ; i < data.length ; i++) {
            var createData = [];
            if(!isNaN(data[i]["KIND"]) == false) {
                var kindName = kindCheck(data[i]["KIND"].slice(0, -1));
                if(data[i]["KIND"].substr(data[i]["KIND"].length-1) == "B") {
                    createData.push(kindName[0]+("(1)"));
                } else if(data[i]["KIND"].substr(data[i]["KIND"].length-1) == "S") {
                    createData.push(kindName[0]+("(2)"));
                } else if(data[i]["KIND"].substr(data[i]["KIND"].length-1) == "L") {
                    createData.push(kindName[0]+("(1)"));
                } else if(data[i]["KIND"].substr(data[i]["KIND"].length-1) == "R") {
                    createData.push(kindName[0]+("(2)"));
                }
                createData.push(parseInt(kindName[1]));
            } else {
                var kindName = kindCheck(data[i]["KIND"]);
                createData.push(kindName[0]);
                createData.push(parseInt(kindName[1]));
            }
            createData.push(data[i]["MAX"]);
            createData.push(data[i]["NOW"]);
            createData.push(data[i]["NEW"]);
            createData.push(data[i]["KIND"]); //리턴값 셋팅할때 사용할 이름 - 추후 삭제 예정
            getData.push(createData);
        }
        return getData;
    } else if(process == "sum") { //같은 권종 합치기
        for(var i = 0 ; i < data.length ; i++) {
            var createData = [];
            var kindName = "";
            if(!isNaN(data[i]["KIND"]) == false) {
                kindName = kindCheck(data[i]["KIND"].slice(0, -1));
            } else {
                kindName = kindCheck(data[i]["KIND"]);
            }

            var sumFlag = false;
            var sumPosition = 0;
            for(var j = 0 ; j < getData.length ; j++) {
                if(getData[j][0] == kindName[0]) {
                    sumFlag = true;
                    sumPosition = j;
                }
            }

            if(sumFlag == true) {
                if(type != "COIN_IN" || type != "CHECK_IN" || type != "GIFT_IN") {
                    getData[sumPosition][2] = getData[sumPosition][2] + data[i]["MAX"];
                }
                getData[sumPosition][3] = getData[sumPosition][3] + data[i]["NOW"];
                getData[sumPosition][4] = getData[sumPosition][4] + data[i]["NEW"];
            } else {
                createData.push(kindName[0]);
                createData.push(parseInt(kindName[1]));
                createData.push(data[i]["MAX"]);
                createData.push(data[i]["NOW"]);
                createData.push(data[i]["NEW"]);
                createData.push(data[i]["KIND"]); //리턴값 셋팅할때 사용할 이름 - 추후 삭제 예정
                getData.push(createData);
            }
        }
        return getData;
    } else if(process == "basic") {
        for(var i = 0 ; i < data.length ; i++) {
            var createData = [];
            createData.push(data[i]["KIND"]);
            createData.push("");
            createData.push(data[i]["MAX"]);
            createData.push(data[i]["NOW"]);
            createData.push(data[i]["NEW"]);
            createData.push(data[i]["KIND"]);  //리턴값 셋팅할때 사용할 이름 - 추후 삭제 예정
            getData.push(createData);
        }
        return getData;
    }
}

//각 페이지에서 합계 및 전체 매수를 구하기 위한 함수
function calSumNum(data, process, kind) {
    var sum = 0;
    var certain = 0;
    if(kind == "new") {
        certain = 4;
    } else if(kind == "now") {
        certain = 3;
    }
   //console.log("데이타는 "+data)
    for(var i = 0 ; i < data.length ; i++) {
        if(process == "sum") {
               sum = sum + (data[i][certain] * data[i][1]);
        } else if(process == "num") {
               sum = sum + data[i][certain];
        }
    }
    return sum;
}

function testJson(page) {

    var jsonTest = {     // 현재 추가 옵션값은 추가하기에 기간이 짧아 카세트 및 권종, 호퍼 순서대로 내역이 들어와야 함.
        "CASH" : [    //현금 입금함
            {
                "KIND": "50000",
                "MAX": 1000,
                "NOW": 1000,
                "NEW": 1000
            },
            {
                "KIND": "10000",
                "MAX": 1000,
                "NOW": 500,
                "NEW": 0
            },
            {
                "KIND": "5000",
                "MAX": 1000,
                "NOW": 1000,
                "NEW": 0
            },
            {
                "KIND": "1000",
                "MAX": 1000,
                "NOW": 100,
                "NEW": 0
            }
        ],
        "COIN_OUT" : [                  //동전 출금함
            {
                // ***************** 추후 설정 추가 예시 ********************
                //"INDEX" : "1",       // INDEX=호퍼위치 (1,2,3,4)
                //"SIZE" : "BIG",      // SIZE=크기 또는 종류 (LARGE: 대형, SMALL:소형, MIDDLE:중형)
                //"POSITION" : "LEFT",  // TYPE=크기 또는 종류 (LEFT:왼쪽, RIGHT:오른쪽)
                //"KIND" : "500",      // KIND=권종 (500: 500원)
                "KIND": "500",      // KIND=권종+크기 또는 종류 (500: 500원, 500L: 500원 LEFT, 500R: 500원 RIGHT, 1000B: 1000원 대, 1000S: 1000원 소)
                "MAX": 1000,         // MAX=최대값
                "NOW": 100,          // NOW=현재 보유 값 또는 잔량
                "NEW": 10            // NEW=변경할 값, 요청값 (입금시 - 입금되는 값, 출금시 - 출금 요청값)
            },
            {
                "KIND": "100",
                "MAX": 1000,
                "NOW": 999,
                "NEW": 10
            },
            {
                "KIND": "50",
                "MAX": 1000,
                "NOW": 100,
                "NEW": 10
            },
            {
                "KIND": "10",
                "MAX": 1000,
                "NOW": 100,
                "NEW": 10
            }
        ],
        "COIN_IN" : [  //동전 입금함
            {
                "KIND": "500",
                "MAX": 10000,  //입금함 최대치(공통)
                "NOW": 0,
                "NEW": 0
            },
            {
                "KIND": "100",
                "MAX": 10000,  //입금함 최대치(공통)
                "NOW": 0,
                "NEW": 0
            },
            {
                "KIND": "50",
                "MAX": 10000,  //입금함 최대치(공통)
                "NOW": 0,
                "NEW": 0
            },
            {
                "KIND": "10",
                "MAX": 10000,  //입금함 최대치(공통)
                "NOW": 0,
                "NEW": 10
            }
        ],
        "CHECK_IN" : [  //수표 입금함
            {
                "KIND": "1000000",
                "MAX": 10000,  //입금함 최대치(공통)
                "NOW": 100,
                "NEW": 10
            },
            {
                "KIND": "500000",
                "MAX": 10000,  //입금함 최대치(공통)
                "NOW": 100,
                "NEW": 10
            },
            {
                "KIND": "100000",
                "MAX": 10000,  //입금함 최대치(공통)
                "NOW": 100,
                "NEW": 10
            }
        ],
        "GIFT_IN": [  //상품권 입금함
            {
                "KIND": "",   //공백
                "MAX": 3000,
                "NOW": 100,
                "NEW": 10
            }
        ],
        "ENVELOPE": [  //봉투 입금함
            {
                "KIND": "",   //공백
                "MAX": 3000,
                "NOW": 100,
                "NEW": 10
            }
        ],
        "REJECT": [  //리젝 입금함
            {
                "KIND": "",   //공백
                "MAX": 3000,
                "NOW": 100,
                "NEW": 10
            }
        ],
        "REJECT_IN": [  //?? 입금함
            {
                "KIND": "",   //공백
                "MAX": 3000,
                "NOW": 100,
                "NEW": 10
            }
        ],
        "REJECT_OUT": [  //?? 입금함
            {
                "KIND": "",   //공백
                "MAX": 3000,
                "NOW": 100,
                "NEW": 10
            }
        ],
        "MIX": [   //혼합 입금함
            {
                "KIND": "",   //혼합
                "MAX": 3000,
                "NOW": 100,
                "NEW": 10
            }
        ],
        "STORE_INFO" : [
            {
                "SRV_CENTER_PHNUM": "1578-1577",
                "STORE_NM": "성수점"
            }
        ],
        "OPEN":1, //정상개국 1, 비정상 개국 0,
        "IN" : 10000
    }
    return f_receive('TESTJSON', JSON.stringify(jsonTest), page);
}


