/**
 * 일반 윈도우팝업 생성 스크립트
 *
 * @param url,
 *            팝업이름, 가로크기, 세로크기, 중앙여부:'center', 스크롤바여부:true/false
 */
function openWindowPopup(url, name, width, height, isCenter, isScroll) {
	var posLeft = "";
	var posTop = "";
	if (isCenter == "center" || isCenter == true) {
		posLeft = (screen.width - (width * 1)) / 2;
		posTop = (screen.height - (height * 1)) / 2;
	} else {
		posLeft = 0;
		posTop = 0;
	}

	if (!isScroll)
		isScroll = 1;

	var options = "menubar=" + 0 + ",width=" + width + ",height=" + height + ",toolbar=" + 0 + ",scrollbars=" + isScroll + ",status=" + 1 + ",resizable=" + 0 + ",left=" + posLeft + ",top=" + posTop;

	var win = window.open(url, name, options);
	self.name = "openPage";
	win.opener = self;
	win.focus();
}

/**
 * 즐겨찾기 추가
 * @param String domain
 */
function addFavorite(domain){

	var title = 'AK몰 - 백화점을 클릭하다';

	// Internet Explorer
	if (document.all){
		window.external.AddFavorite(domain, title);
	}
	// Google Chrome
	else if (window.chrome){
      alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
	}
	// Firefox
	else if (window.sidebar){
       window.sidebar.addPanel(title, domain, "");
	}
	// Opera
	else if (window.opera && window.print){
		var elem = document.createElement('a');
		elem.setAttribute('href',domain);
		elem.setAttribute('title',title);
		elem.setAttribute('rel','sidebar');
		elem.click();
	}
}
/*
function getCookie() {
	var nameOfCookie = "akmall=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}
*/

function getCookie() {
	var cName = "akmall=";
	var cookieData = (document.cookie).split('; ');
	var cValue = '';
	for(var i = 0; i < cookieData.length; i++){
		if(cookieData[i].indexOf(cName) !== -1){
			cValue = cookieData[i].replace(cName,'');
			break;
		}
	}
	return cValue;
}
