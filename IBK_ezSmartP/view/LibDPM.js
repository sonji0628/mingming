includeJSS("app.common","/core/app.common.js");

var gDefaultTimeout = 5000;

/*
 DPM_STATUS 
 * Description
 - A4 프린터 출력이 가능한지 상태를 체크한다.
 
 * Parameters
 - N/A
 
 * Return
 - true : 출력 가능
 - false : 출력 불가
*/
function DPM_STATUS(){
	if (IsOpenDevice.DPM != true){
		console.log("DPM is not open!");
		return false;
	}
	let object, jsonRet;
	let stDevice, stPaper, stToner;
	
	// 기기 상태
	object = host.DPM.GetstDevice();
	jsonRet = eval("(" + object + ")");	
	stDevice = jsonRet.Result;
	if (stDevice != "DEVONLINE")
		return false;
	// "PAPERJAMMED" 인 경우 stDevice 값이 "DEVHWERROR" 여서 return false;
	
	// A4 용지 상태
	object = host.DPM.GetstPaper();
	jsonRet = eval("(" + object + ")");	
	stPaper = jsonRet.Result;
	if (stPaper[0] == "PAPEROUT")
		return false;
	
	// 토너 상태
	object = host.DPM.GetstToner();
	jsonRet = eval("(" + object + ")");	
	stToner = jsonRet.Result;
	if (stPaper[0] == "TONEROUT")
		return false;
		
	return true;
}