includeJSS("app.common","/core/app.common.js");

var gDefaultTimeout = 5000;

/*
 DPM_STATUS 
 * Description
 - A4 ������ ����� �������� ���¸� üũ�Ѵ�.
 
 * Parameters
 - N/A
 
 * Return
 - true : ��� ����
 - false : ��� �Ұ�
*/
function DPM_STATUS(){
	if (IsOpenDevice.DPM != true){
		console.log("DPM is not open!");
		return false;
	}
	let object, jsonRet;
	let stDevice, stPaper, stToner;
	
	// ��� ����
	object = host.DPM.GetstDevice();
	jsonRet = eval("(" + object + ")");	
	stDevice = jsonRet.Result;
	if (stDevice != "DEVONLINE")
		return false;
	// "PAPERJAMMED" �� ��� stDevice ���� "DEVHWERROR" ���� return false;
	
	// A4 ���� ����
	object = host.DPM.GetstPaper();
	jsonRet = eval("(" + object + ")");	
	stPaper = jsonRet.Result;
	if (stPaper[0] == "PAPEROUT")
		return false;
	
	// ��� ����
	object = host.DPM.GetstToner();
	jsonRet = eval("(" + object + ")");	
	stToner = jsonRet.Result;
	if (stPaper[0] == "TONEROUT")
		return false;
		
	return true;
}