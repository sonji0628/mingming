/**********************************************************

   ','자동 추가 삭제 Class
   2015. 11. 12
   전기준 black™ (010-4255-3564)

***********************************************************/
function Comma(){
    //콤마 빼주는 메소드
    this.mComma=function(dat){
        lszES = "";
        for(var i=0;i<dat.length;i++) {
            if(dat.charAt(i) != ',') {
                lszES = lszES + (dat.substring(i,i+1));
            }
        }	
        return lszES;
    }
    
    //콤마 더해주는 메소드
    this.pComma=function(num){
        var minus;
        if (Number(num) < 0) {
		      num = String(Number(num) * -1); 
              minus = true;
        }else{ minus = false; }			
        var dotPos = (num+"").split(".")
		var dotU = dotPos[0]
		var dotD = dotPos[1]
		var commaFlag = dotU.length%3
		if(commaFlag) {
		      var out = dotU.substring(0, commaFlag) 
              if (dotU.length > 3) out += ","
        }
			else out = ""
		
		for (var i=commaFlag; i < dotU.length; i+=3) {
		      out += dotU.substring(i, i+3) 
              if( i < dotU.length-3) out += ","
        }
		
		if(minus) out = "-" + out
		if(dotD) return out + "." + dotD
		else return out 
    }
    
}