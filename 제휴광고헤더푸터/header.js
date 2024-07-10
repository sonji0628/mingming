
var xdr;

jQuery(function($) {

	var val = getCookie();

	// if ( navigator.userAgent.indexOf("MSIE") != -1 && getInternetExplorerVersion() < 10 ) {
	// 	xdr = new XDomainRequest();
    //     if ( xdr ) {
    //         xdr.onload  = getHeaderLoad;
    //         // The URL is preset in the text area. This is passed in the
    //         // open call with a get request.
    //         xdr.open("get", "http://www.akmall.com/special/AsscHeader.do?c="+val);
    //         // The request is then sent to the server.
	// 		xdr.withCredentials = true;
    //         xdr.send();
    //     }
    // } else {
    	//$.support.cors = true;

        $.ajax({
			crossDomain : true,
			type      : "get",
			url       : "http://www.akmall.com/special/AsscHeader.do?c="+val,
			dataType  : "html",
			success   : function(data, textStatus, jqXHR){
                getHeaderSuccess(data, textStatus, jqXHR);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                getHeaderError(jqXHR, textStatus, errorThrown);
            },
            complete: function(jqXHR,textStatus){
                getHeaderComplete(jqXHR,textStatus);
            }
        });
    // }
});
function getHeaderLoad() {
    $("#wrap").prepend(xdr.responseText);
    setGnbEffect();
}
function getHeaderSuccess(data, textStatus, jqXHR) {
    $("#wrap").prepend(data);
}
function getHeaderError(jqXHR, textStatus, errorThrown) {
	//alert("error:["+jqXHR.status+"]"+jqXHR.statusText+"\r"+jqXHR.responseText);
}
function getHeaderComplete(jqXHR,textStatus) {

}


// function getInternetExplorerVersion() {
//     var rv = -1; // Return value assumes failure.
//     if (navigator.appName == 'Microsoft Internet Explorer') {
//         var ua = navigator.userAgent;
//         var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
//         if (re.exec(ua) != null)
//               rv = parseFloat(RegExp.$1);
//     }

//     if ( rv >= 7 ) {
//         var trident = navigator.userAgent.match(/Trident\/(\d)/i);
//         if(trident != null){
//             var trident_ver = trident[0];
//             if ( trident_ver == 4 ) {
//                 return 8;
//             }
//             else if ( trident_ver == 5 ) {
//                 return 9;
//             }
//             else if ( trident_ver == 6 ) {
//                 return 10;
//             }
//             else {
//                 return rv;
//             }
//         } else{
//             return 7;
//         }
//     }
//     return rv;
// }
/*
function getCookies(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
         start += cName.length;
         var end = cookieData.indexOf(';', start);
         if(end == -1)end = cookieData.length;
         cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}
*/