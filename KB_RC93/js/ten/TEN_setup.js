/*************************************************************************************
	FileName			:	TEN_NORMALtENKEY.js
	Description			:	TEN-KEY 기능 통합
	Created Date		:	2021.01.02
	Created By			:	ATEC AP, 임광진
	Revision History	:	
         ver 1.0.0.0 - 최초작성
         ver 1.0.0.1 - 나라별 언어추가
**************************************************************************************/
"use strict"
let bankKinds = "";
function bankName(num){
    switch(num){
           case 1:
                bankKinds = "hana";
                break;
           case 2:
                bankKinds = "woori";
                break;
           case 3:
                bankKinds = "kb";
                break;
            case 4:
                 bankKinds = "hyundai";
                break;
    }
}
bankName(3);////////////////////////////은행에 따라 위에 switch문 보고 매개변수값 수정
console.log('bankKinds = '+bankKinds);
let setupInfo = {
    LV : [
        {top:'0-0',left:'0-136',size:'124-124',link:'bgx1',fontColor:'#FFF',fonts:'normal bold 80px/0px NanumSquare'},
        {top:'136-0',left:'0-136',size:'124-124',link:'bgx1',fontColor:'#FFF',fonts:'normal bold 80px/0px NanumSquare'},
        {top:'272-0', left:'0-136',size:'124-124',link:'bgx1',fontColor:'#FFF',fonts:'normal bold 80px/0px NanumSquare'},
        {top:'408-0', left:'0-136',size:'124-124',link:'bgx1',fontColor:'#FFF',fonts:'normal bold 55px/0px NanumSquare'},
        {top:'544-0', left:'0-136',size:'124-124',link:'bgx1',fontColor:'#FFF',fonts:'normal bold 60px/0px NanumSquare'},
    ],
    LV_Confirm : [
        {top:'590',left:'716'},
    ],
    hana:[
            {
                arrPositions : [
                    [9,9],[140,9],[271,9],[402,9],[9,99],[140,99],[271,99],[402,99],[9,189],[140,189],[271,189],[402,189]////재배열위치
                ],
                locationSize : [
                    {top:'8-0',left:'7-134',size:'128-84'},
                    {top:'98-0',left:'7-134',size:'128-84'},
                    {top:'188-0', left:'7-134',size:'128-84'},
                    {top:'278-0', left:'7-134',size:'128-84'},
                ],
                shuffleLocationSize : [
                    {top:'9-0',left:'9-131',size:'128-84'},
                    {top:'99-0',left:'9-131',size:'128-84'},
                    {top:'189-0',left:'9-131',size:'128-84'},
                    {top:'278-0',left:'9-132',size:'128-84'},
                    {top:'278-0',left:'273-0',size:'257-84'},//재밸열버튼
                ],
                manChonLocationSize : [
                    {top:'8-90',left:'7-0',size:'128-84'},
                ],
                fontFamily:{
                        'kr':[///한국어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal bold 32px/0px KoPubDotum'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px KoPubDotum'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],

                        'en':[///영어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 32px/0px Arial'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Arial'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],

                        'jp':[///일어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 32px/0px MS Gothic'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px MS Gothic'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],

                        'ch':[//중국어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 32px/0px SimSun'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px SimSun'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'ge':[//독일어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 32px/0px Arial'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Arial'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'ru':[//러시아
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 28px/0px Tahoma'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Tahoma'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'th':[//몽골어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 28px/0px Tahoma'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Tahoma'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'bg':[//방글라데시
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 30px/0px Bangla'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Bangla'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'bt':[//베트남
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 27px/0px Tahoma'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Tahoma'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'sp':[//스페인어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 32px/0px Tahoma'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Tahoma'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'sl':[//스리랑카어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 21px/0px FMBindumathi x'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px FMBindumathi x'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'id':[//인도(힌디어)
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 27px/0px Mangal'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Mangal'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'in':[//인도네시아
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 27px/0px Arial'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Arial'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'ti':[//태국어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 40px/0px TH Baijam'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px TH Baijam'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'pk':[//파키스탄어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 25px/0px Jameel Noori Nastaleeq'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Jameel Noori Nastaleeq'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'fr':[//프랑스어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 32px/0px Arial'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Arial'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'ph':[//필리핀어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 32px/0px Arial'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Arial'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        'ca':[//캄보디아어
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 30px/0px ABC-TEXT-02'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px ABC-TEXT-02'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                            {fonts:'#000,normal bold 36px/0px KoPub돋움체 Bold'},////다국어용 만천 서체사이즈
                        ],
                        /*'np':[//네팔
                            {fonts:'#000,normal bold 40px/0px KoPub돋움체 Bold'},////일반
                            {fonts:'#FFF,normal 400 32px/0px Preeti'},////일반다른유형
                            {fonts:'#FFF,normal bold 40px/0px Preeti'},////만천원
                            {fonts:'#FFF'},////알반버튼다운시유형
                            {fonts:'#FFF'},////알반다른버튼다운시유형
                            {fonts:'#FFF'},////만천원버튼다운시유형
                        ],*/
                        'lv':[///저시력은 공통이므로 위에 따로 데이터 있음
                            {fonts:','},////일반
                            {fonts:','},////일반다른유형
                            {fonts:','},////만천원
                            {fonts:''},////알반버튼다운시유형
                            {fonts:''},////알반다른버튼다운시유형
                            {fonts:''},////만천원버튼다운시유형
                            {fonts:''},////만천원버튼다운시유형
                        ],
                        'bp':[///저시력은 공통이므로 위에 따로 데이터 있음
                            {fonts:','},////일반
                            {fonts:','},////일반다른유형
                            {fonts:','},////만천원
                            {fonts:''},////알반버튼다운시유형
                            {fonts:''},////알반다른버튼다운시유형
                            {fonts:''},////만천원버튼다운시유형
                            {fonts:''},////만천원버튼다운시유형
                        ],
                    
                    
                },
                txt:{
                    'kr':['정정','재배열','원'],// 한국어
                    'en':['change','Rearrange','won'],// 영어  
                    'jp':['訂正','配列換え','won'],// 일본어
                    'ch':['修改','重新排列','元'],// 중국어
                    'ge':['Ändern','neu anordnen','won'],// 독일 
                    'ru':['Изменить','сбросить','вон'],// 러시아 
                    'th':['Засах','Дахин зохицуулалт','вон'],// 몽골 
                    'bg':['সংশোধন','৪ সংখ্যার পিন নম্বর চাপুন','অন'],// 방글라데시
                    'bt':['Chỉnh sửa','Hoán đổi ngẫu nhiên','won'],// 베트남
                    'sp':['Corregir','reordenamiento','won'],// 스페인
                    'sl':['වෙනස්කිරීම','නැවත සකස්කරන්න','fjdka'],// 스리랑카 /////////
                    'id':['सुधा','शंख्या फिर ब्यबस्थित','वॉन'],// 인도 
                    'in':['Koreksi','penyusunan kembali','won'],// 인도네시아
                    'ti':['แก้ไข','สลับแป้น','วอน'],// 태국  
                    'pk':['وون','تبدیل','براہ کرم اپنا 4 ہندسوں کا پن کوڈ درج کریں'],// 파키스탄
                    'fr':['Modifier','Intervertir','won'],// 프랑스
                    'ph':['Palitan','reshuffle','won'],// 필리핀 
                    'ca':['EkERbCafµI','ការរៀបចំឡើងវិញ','won'],// 캄보디아어
                    //'np':['정정','재배열'],// 네팔
                    'lv':['정정','재배열','원'],// 저시력
                    'bp':['','',''],// 점맹
                },
                confirmLocation :[
                    {top:'678',left:'734'},
                ],
                manChonBox :[
                    {top:'0-0',left:'416-0',size:'142-280',linkG:'box0'},//일반시 위치
                    {top:'0-0',left:'545-0',size:'142-280',linkG:'box0'},//재배열시 위치
                ],
                popupWord : {
                    '2102':['msg2','날짜가 잘못 입력되었습니다.<br>다시 입력해 주십시오','normal 500 28px/40px KoPub돋움체 medium',2000],
                    '2057':['bgx6','5만원입금 매수가 초과 되었습니다.','normal 500 50px/60px KoPub돋움체 medium',2000],
                },
                specialPage : [
                    'KR1106',
                    'KR5007',
                    'LV2057',
                ],
            },
    ],
    woori:[
    ],
    kb:[
        {
            arrPositions : [
                [9,9],[140,9],[271,9],[402,9],[9,99],[140,99],[271,99],[402,99],[9,189],[140,189],[271,189],[402,189]////재배열위치
            ],
            locationSize : [
                {top:'0-0',left:'0-109',size:'90-90'},
                {top:'109-0',left:'0-109',size:'90-90'},
                {top:'218-0',left:'0-109',size:'90-90'},
                {top:'327-0',left:'0-109',size:'90-90'},
            ],
            shuffleLocationSize : [
                {top:'9-0',left:'9-131',size:'128-84'},
                {top:'99-0',left:'9-131',size:'128-84'},
                {top:'189-0',left:'9-131',size:'128-84'},
                {top:'278-0',left:'9-132',size:'128-84'},
                {top:'278-0',left:'273-0',size:'257-84'},//재밸열버튼
            ],
            manChonLocationSize : [
            ],
            fontFamily:{
                    'kr':[///한국어
                        {fonts:'#60584c,normal bold 40px/0px Noto Sans CJK KR'},////일반
                        {fonts:'#60584c,normal bold 32px/0px Noto Sans CJK KR'},////일반다른유형
                        {fonts:'#60584c,normal bold 40px/0px Noto Sans CJK KR'},////만천원
                        {fonts:'#FFF'},////알반버튼다운시유형
                        {fonts:'#FFF'},////알반다른버튼다운시유형
                        {fonts:'#FFF'},////만천원버튼다운시유형
                        {fonts:'#000,normal bold 36px/0px Noto Sans CJK KR'},////다국어용 만천 서체사이즈
                    ]
            },
            txt:{
                'kr':['','재배열','원'],// 한국어
            },
            confirmLocation :[
                {top:'668',left:'764'},
            ],
            manChonBox :[
            ],
            popupWord : {
            },
            specialPage : [
                'KR10310',
                'KR10601',
                'KR10701',
                'KR10801',
                'KR10102',
                'KR10103',
                'S20003',
                'S20020',
                'S20025'
            ],
        },
    ],
    hyundai:[
        {
            arrPositions : [
                [9,9],[140,9],[271,9],[402,9],[9,99],[140,99],[271,99],[402,99],[9,189],[140,189],[271,189],[402,189]////재배열위치
            ],
            locationSize : [
                {top:'8-0',left:'7-169',size:'104-104'},
                {top:'127-0',left:'7-169',size:'104-104'},
                {top:'246-0',left:'7-169',size:'104-104'},
                {top:'365-0',left:'7-169',size:'104-104'},
            ],
            shuffleLocationSize : [
                {top:'9-0',left:'9-131',size:'128-84'},
                {top:'99-0',left:'9-131',size:'128-84'},
                {top:'189-0',left:'9-131',size:'128-84'},
                {top:'278-0',left:'9-132',size:'128-84'},
                {top:'278-0',left:'273-0',size:'257-84'},//재밸열버튼
            ],
            manChonLocationSize : [
                {top:'8-90',left:'7-0',size:'128-84'},
            ],
            fontFamily:{
                    'kr':[///한국어
                        {fonts:'#2f5b4e,normal bold 40px/0px Noto Sans CJK KR'},////일반
                        {fonts:'#2f5b4e,normal bold 32px/0px Noto Sans CJK KR'},////일반다른유형
                        {fonts:'#2f5b4e,normal bold 40px/0px Noto Sans CJK KR'},////만천원
                        {fonts:'#FFF'},////알반버튼다운시유형
                        {fonts:'#FFF'},////알반다른버튼다운시유형
                        {fonts:'#FFF'},////만천원버튼다운시유형
                        {fonts:'#000,normal bold 36px/0px Noto Sans CJK KR'},////다국어용 만천 서체사이즈
                    ]
            },
            txt:{
                'kr':['정정','재배열','원'],// 한국어
            },
            confirmLocation :[
                {top:'1800',left:'360'},
            ],
            manChonBox :[
                {top:'0-0',left:'416-0',size:'142-280',linkG:'box0'},//일반시 위치
                {top:'0-0',left:'545-0',size:'142-280',linkG:'box0'},//재배열시 위치
            ],
            popupWord : {
                '2102':['msg2','날짜가 잘못 입력되었습니다.<br>다시 입력해 주십시오','normal 500 28px/40px Noto Sans CJK KR',2000],
                '2057':['bgx6','5만원입금 매수가 초과 되었습니다.','normal 500 50px/60px Noto Sans CJK KR',2000],
            },
            specialPage : [
                'KR1106',
                'KR5007',
                'LV2057',
            ],
        },
    ]
}
/*////////////////////////////////이미지 정리////////////////////////////////
ex)하나은행인 경우 ten1_hana.png
ten1_은행명.png------텐키 일반버튼이미지                  
ten2_은행명.png------텐키 일반버튼다운이미지(mousedown)
ten3_은행명.png------텐키 백버튼이미지
ten4_은행명.png------텐키 백버튼다운이미지(mousedown)
ten5_은행명.png------텐키 만천원버튼이미지
ten6_은행명.png------텐키 재배열시 로고 이미지
shuffle_은행명.png---텐키 재배열버튼이미지
shuffle2_은행명.png--텐키 재배열버튼다운이미지(mousedown)
manchonbox.png------텐키 만천원버튼들 배경이미지
lowTen_blue_btnS.png------텐키 저시력 일반버튼이미지
lowTen_blue_btnSS.png-----텐키 저시력 만천키 들어간 페이지 일반버튼이미지 lowTen_blue_btnS.png이거보다 좀더 작음.
일반키:blue-----------lowTen_blue_btn.png     134*134
정정,백스페이스:yellow---lowTen_yellow_btn.png     134*134
취소:red--------------lowTen_red_btn.png     134*134
확인:green------------lowTen_green_btnL.png     134*13
*//////////////////////////////////////////////////////////////////////////

