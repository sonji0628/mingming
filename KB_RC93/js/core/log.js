/*************************************************************************************
    FileName			:	log.js
    Description			:	개발용 로그출력 함수
	Created Date		:	2021.05.03
	Created By			:	ATEC AP, cyg
    Revision History	:	
        ver 1.0.0.0 - 최초 작성
**************************************************************************************/

/*************************************************************************************
           (c) Copyright  2020  ATEC AP Inc. All Rights Reserved
            
       THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ATEC AP  Inc.
       The copyright notice above does not evidence any actual or intended
       publication of such source code.
**************************************************************************************/

// 로그출력 제어를 위한 상수
const displayConsoleLog = true;

let screen = {};
screen.console = {};
screen.console.log = function(msg)
{
    if( displayConsoleLog == false) return;

    // 로그 출력
    console.log(msg);
}
