includeJSS("app.common","/core/app.common.js");

var gDefaultTimeout = 5000;

/*
 SIU_FLICKER 
 * Description
 - id 에 해당하는 Flicker의 light를 설정한다.
 
 * Parameters
 [id]
 - "CARDUNIT"
 - "PINPAD"
 - "NOTESDISPENSER"
 - "COINDISPENSER"
 - "RECEIPTPRINTER"
 - "PASSBOOKPRINTER"
 - "ENVDEPOSITORY"
 - "CHEQUEUNIT"
 - "BILLACCEPTOR"
 - "ENVDISPENSER"
 - "DOCUMENTPRINTER"
 - "COINACCEPTOR"
 - "SCANNER"
 
 [mode]
 - "OFF"
 - "SLOW_FLASH"
 - "MEDIUM_FLASH"
 - "QUICK_FLASH"
 - "CONTINUOUS"
 
 * Return
 - true : 성공
 - false : 실패
 
 * Remarkable
 - 실패를 해도 예외 처리하지 않는다.
*/
function SIU_FLICKER(id, mode){
	if (IsOpenDevice.SIU != true){
		console.log("SIU is not open!");
		return false;
	}
	let object, jsonRet;
	
	object = host.SIU.SetGuidLight(id, mode, gDefaultTimeout, function (response){
		let json = eval("(" + response + ")");
		console.log("<< SIU SetGuidLight END : ReqID["+ jsonRet.Result +"], Result["+json.Callback.lResult+"]");		
	});
	
	if (!object){
		console.log("<< SIU SetGuidLight NG! ");
		return false;
	}
	
	jsonRet = eval("(" + object + ")");
	console.log("<< SIU SetGuidLight : ReqID["+ jsonRet.Result +"]");
	if (jsonRet.Result < 0){
		return false;
	}
	
	return true;
}