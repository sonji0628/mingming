/****************************************************************************************************
서체 클라스
2015. 09. 09
전기준 black™ (010-4255-3564)

Revision Hostory
  ver 1.0.0.0 - 최초작성
  ver 1.0.0.1 (2021.02.25) - font 의 이름 (메타데이터의 '제목') 으로 폰트 설정 가능하게 수정함 (cyg)
  ver 1.0.0.2 (2021.03.15) - 국가코드별 defaultFont 기능을 추가함, cyg
  ver 1.0.0.3 (2021.03.16) - 한국어(kr) 대표 폰트변경, 'KoPub돋움체 Light' -> '"KoPub돋움체 Medium', cyg
  ver 1.0.0.4 (2021.03.18) - 폰트코드 사용하지 않음, 

*****************************************************************************************************/
let defaultFont="";


// 코드통합 2021.03.18 (cyg)
// 더이상 fontCode (2자리) 를 사용하지 않음. countryCode 의 defaultFont 또는 font 의 title(제목) 을 사용함.
/*
function fontIs(fontCode) {
    var myfont="";
    switch (fontCode) {
        case "kr":
            //myfont = "KoPub돋움체 Light";
            myfont = "KoPub돋움체 Medium";
            break;
        case "bt":
            myfont = "KoPub돋움체 Light";//Light 사용 가능성있으므로 수정
            break;
        case "gr":
            myfont = "KoPubWorld돋움체 Light";
            break;
        case "lg":
            myfont = "KoPub돋움체 Bold";
            break;
        case "yg":
            myfont = "KoPubWorld돋움체 Bold";
            break;
        case "nb": //나눔B
            myfont = "Noto Sans CJK KR B";
            break;
        case "xb": //나눔xb
            myfont = "나눔고딕 ExtraBold";
            break;
        case "ka": //캄보디아
            myfont = "Limon S2";
            break;
        case "np": //네팔
            myfont = "Preeti";
            break;
        case "ll":  //lg스마트L
            myfont = "나눔스퀘어 Light";
            break;
        case "lr": //lg스마트r
            myfont = "나눔스퀘어";
            break;
        case "ls": //lg스마트sb
            myfont = "NanumSquare";
            break;
        case "lb": //lg스마트b
            myfont = "나눔스퀘어 ExtraBold";
            break;
        case "sl": //스리랑카
            myfont = "FMBindumathi x"
            break;
        case "mg": //몽골
            myfont = "Mongols"
            break;
        case "ml":  //arial 유니코드
            myfont = "맑은 고딕"
            break;
        case "sp"://나눔손글씨 펜(2016_01_26)
            myfont = "나눔손글씨 펜";
            break;			
        case "mj"://나눔명조(2016_01_26)
            myfont = "나눔명조";
            break;
        case "sv"://나눔손글씨 (2016_01_26)
            myfont = "나눔손글씨 붓";
            break;
        case "bg"://나눔바른고딕(2016_01_26)
            myfont = "나눔바른고딕";
            break;
        case "":  // 언어의 기본 font 지정
            myfont = defaultFont;    
            //console.log("##### default font =["+myfont+"]");
            break;
        default:
            myfont = fontCode; // font 의 '제목' 대응
            break;

    }
    return myfont;
}
*/

function fontIs(fontCode) {
  var myfont="";

  if(fontCode.length < 3 )
  {
    // 기존의 2자리 폰트코드는 더이상 사용하지 않음. 국가코드이 default 폰트로 대체함.
    myfont = defaultFont;    
  }
  else
  {
    // font 의 'title(제목)' 을 사용함
    myfont = fontCode; 
  }

  return myfont;
}
// 코드통합 2021.03.18 (cyg) end <==


// 하나은행 대응
// 화면 전환시 국가코드에 해당되는 기본 폰트정보를 저장한다.
function setDefaultFont( languageCode)
{
  switch( languageCode)
  {
    case "bp":   // 전맹인
    case "lv":   // 저시력
    case "kr":   // 한국어
        defaultFont = 'Noto Sans CJK KR';
        break;
    case "en":   // 영어  
    case "ge":   // 독일  
    case "in":   // 인도네시아
    case "fr":   // 프랑스
    case "ph":   // 필리핀 
        defaultFont = 'Arial';
        break;
    case "jp":   // 일본어
        defaultFont = 'MS Gothic';
        break;
    case "ch":   // 중국어
        defaultFont = 'SimSun';
        break;
    case "ru":   // 러시아 
    case "th":   // 몽골 
    case "bt":   // 베트남
    case "sp":   // 스페인
        defaultFont = 'Tahoma';
        break;
    case "bg":   // 방글라데시
        defaultFont = 'Bangla';
        break;
    case "sl":   // 스리랑카 
        defaultFont = 'FMBindumathi x';
        break;
    case "id":   // 인도 (힌디어) 
        defaultFont = 'Mangal';
        break;
    case "ti":   // 태국  
        defaultFont = 'TH Baijam';
        break;
    case "pk":   // 파키스탄
        defaultFont = 'Jameel Noori Nastaleeq';
        break;
    case "ca":   // 캄보디아어
        defaultFont = 'ABC-TEXT-02';
        break;
    case "np":   // 네팔
        defaultFont = 'Preeti';
        break;
    default:  // 미정의 언어코드는 한글에 사용된 폰트로 설정한다
        defaultFont = 'KoPub돋움체 Medium';
        break;
  }

  return defaultFont;
}


/*
  2018 05 16 신성철 연구원
  UI크레이터 업데이트 전 기본 폰트가 산돌(kr)이었는데
  산돌체를 국민은행 시재관리기 기본 폰트 Hyundai_B1012으로 변경


function fontIs(gab) {
    var myfont = "";
    console.log('폰트는?'+gab)
    switch (gab) {
      case "kr":
        myfont = "에브리데이고딕 B";
        //myfont = "Hyundai";
  
        break;
      case "bt":
  
        break;
      case "gr":
        myfont = "AdobeHeitiStd-Regular";
        break;
      case "lg":
        myfont = "GulimChe";
        break;
      case "yg":
        myfont = "나눔고딕";
        break;
      case "nb":
        myfont = "나눔고딕";
        break;
      case "xb":
        myfont = "나눔고딕 ExtraBold";
        break;
      case "sb":
        myfont = "산돌고딕B";
        break;
      case "ka":
        myfont = "Limon S2";
        break;
      case "np":
        myfont = "Preeti";
        break;
      case "ll":
        myfont = "LG스마트체 Light";
        break;
      case "lr":
        myfont = "LG스마트체 Light";
        break;
      case "ls":
        myfont = "LG Smart_H SemiBold";
        break;
      case "lb":
        myfont = "LG Smart_H SemiBold";
        break;
      case "sl":
        myfont = "FMBindumathi x";
        break;
      case "mg":
        myfont = "Mongols";
        break;
      case "ml":
        myfont = "맑은 고딕";
        break;
      case "sp":
        myfont = "나눔손글씨 펜";
        break;
      case "mj":
        myfont = "나눔명조";
        break;
      case "sv":
        myfont = "나눔손글씨 붓";
        break;
      case "bg":
        myfont = "나눔바른고딕";
        break;
      case "hb":
        myfont = "에브리데이고딕 B";
      break;
      case "hy":
        myfont = "Hyundai_R1012";
        break;
    };
    return myfont;
  };
  */