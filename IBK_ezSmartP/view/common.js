var com  = com  || {};

/*****************************************************************************
*
*			날짜(date) 관련 함수 정의
*
******************************************************************************/
com.date = function() {

	return {
		
		/**
		 * 유효한(존재하는) 날짜형식인지 체크
		 */
		isValidDate : function(ymd) {
		    if(ymd == "" || ymd.length != 8) {
		        return false;
		    }

		    if(!this.isValidYear(ymd.substr(0, 4))) {
		        return false;
		    }

		    if(!this.isValidMonth(ymd.substr(4, 2))) {
		        return false;
		    }

		    if(!this.isValidDay(ymd.substr(0, 4),ymd.substr(4, 2),ymd.substr(6, 2))) {
		        return false;
		    }

		    return true;
		},
        
		/**
		 * 유효한(존재하는) 년도인지 체크
		 */
		isValidYear : function(yyyy) {
		    var m = parseInt(yyyy,10);
		    return (m >= 1900 && m <= 2200);
		},

		/**
		 * 유효한(존재하는) 월(月)인지 체크
		 */
		isValidMonth : function(mm) {
		    var m = parseInt(mm,10);
		    return (m >= 1 && m <= 12);
		},

		/**
		 * 유효한(존재하는) 일(日)인지 체크
		 */
		isValidDay : function(yyyy, mm, dd) {
		    var m = parseInt(mm,10) - 1;
		    var d = parseInt(dd,10);

		    var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
		    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
		        end[1] = 29;
		    }

		    return (d >= 1 && d <= end[m]);
		},		
		
		nowDate : function(delimiter,delimiter2){
				// 시간표시
				var now = new Date();
				var yyyy = now.getFullYear();
				var mm = com.util.generateZero(now.getMonth() + 1);
				var dd = com.util.generateZero(now.getDate());
				var hh = com.util.generateZero(now.getHours());
				var mi = com.util.generateZero(now.getMinutes());
				var ss = com.util.generateZero(now.getSeconds());       
			    
			  if(com.util.isNull(delimiter)){
			  	 delimiter = ".";
			  }
			  
			  if(com.util.isNull(delimiter2)){
			  	 delimiter2 = ":";
			  }
			    
			  return yyyy + delimiter + mm + delimiter + dd + ' ' + hh + delimiter2 + mi + delimiter2 + ss;
		},
	  
		nowDateYmd : function(delimiter){
				// 시간표시
				var now = new Date();
				var yyyy = now.getFullYear();
				var mm = com.util.generateZero(now.getMonth() + 1);
				var dd = com.util.generateZero(now.getDate());
			    
			  if(com.util.isNull(delimiter)){
			  	 delimiter = ".";
			  }
			  			    
			  return yyyy + delimiter + mm + delimiter + dd;
		},
		  
		fnGetCurrDate : function() {
			var nowDate = new Date();

			var strYear = nowDate.getFullYear().toString(10);
			var strMonth = (nowDate.getMonth() + 1).toString(10);
			var strDay = nowDate.getDate().toString(10);

			if (strMonth.length == 1)
				strMonth = "0" + strMonth;
			if (strDay.length == 1)
				strDay = "0" + strDay;

			return (strYear + strMonth + strDay);
		},	  
		  
		fnGetAddDate : function(type, count, dt) { 
	        var yy =  dt.substring(0,4);
	        var mm =  dt.substring(4,6) - 1 ;
	    	var dd =  dt.substring(6,8);
	        
	        var Year = "";
	        var Month = "";
	        var Day = "";
	         
	        // 년
	    	if (type == "Y") {		
	    		yy = yy * 1 + count;
	    	}
	        // 월
	    	if (type == "M") {		
	    		mm = mm * 1 + count;
	    	}
	        // 일
	    	if (type == "D") {		
	    		dd = dd * 1 + count;
	    	}    

	    	var d = new Date(yy, mm, dd);

	    	Year = d.getFullYear();
	    	Month = d.getMonth() + 1;
	    	Day = d.getDate();       

	        if (Month < 10) {
	        	Month = "0" + Month;
	     	}	
	        if (Day < 10) {
	        	Day = "0" + Day;
	     	}		
	        return Year + "" + Month + "" + Day;    
		},
		fnGetFormatDate : function (inputValue) {
        	
        	if(!inputValue){
        		return '';
        	}
        	return this.getFormatMaskPassword('zzzz-zz-zz',inputValue);
		},
		getFormatMaskPassword : function (arSequence, strValue) {
	    	var arReturnValue = [];
	    	var arValues = strValue.split('');
	    	for (var i = 0,arrLen=0, len = arValues.length; arrLen < len; i++)
	    	{
	    		var strChar = arValues[arrLen];
	    		var strPattern = arSequence[i];
	    		if (strPattern == '*' )
	    		{
	    			arReturnValue.push(strPattern);
	    			arrLen++;
	    		}else if(strPattern == '-'){
	    			arReturnValue.push(strPattern);
	    		}else if(strPattern == '.'){
	    			arReturnValue.push(strPattern);
	    		}
	    		else if(strPattern == ':'){
	    			arReturnValue.push(strPattern);
	    		}
	    		else
	    		{
	    			arReturnValue.push(strChar);
	    			arrLen++;
	    		}
	    	}
	    	return arReturnValue.join('');
		},
		getSysDateTimeString : function(){
				// 시간표시
				var now = new Date();
				var yyyy = now.getFullYear();
				var mm = com.util.generateZero(now.getMonth() + 1);
				var dd = com.util.generateZero(now.getDate());
				var hh = com.util.generateZero(now.getHours());
				var mi = com.util.generateZero(now.getMinutes());
				var ss = com.util.generateZero(now.getSeconds());       
			    
				return "" + yyyy + mm + dd + hh + mi + ss;
	  },		
	}
}();


/*****************************************************************************
*
*			기타 유틸(util) 함수 정의
*
******************************************************************************/
com.util = function() {

	return {
		
		// true 값 확인
		isTrue : function(data){
		    if(data == true || data ==="true"){
		        return true;
		    }else{
		        return false;
		    }
		},
		// null 체크
		isNull : function(obj){
		    if ((obj == null) || (obj == undefined) || (obj == "")) {
		        return true;
		    } else {
		        return false;
		    }
		},
		
		isNull2 : function (psVal) {
			if (psVal == null) return true;
			if (psVal === "") return true;
			if (psVal == undefined) return true;
			if (String(psVal).length == 0) return true;
			return false;
		},

		toCommaNumber : function (pnVal) {
			var nNum = Number(pnVal);
			var sRet = nNum.toLocaleString();

			return sRet;
		},
				
		//콤마
		Comma : function(x){
			x = String(x).split(",").join("");
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}, 
					
		// 한자리수 숫자에 0붙여주기
		generateZero : function(str)
		{    	    	   
		   if(str < 10) str = "0" + str;	
			 return str
		},		
				
		fnGetFormatMoney : function (inputValue) {
		  return this.getFormatMoney(inputValue, 0);
		},		
		
		getFormatMoney : function (inputValues,jum) {
		
		  	var inputValue = String(inputValues);
		  	var minusValue ='';
		  	
		  	if(inputValue[0] =='-'){
		  		minusValue ='-';
		  		inputValue =inputValue.substr(1);        		
		  	}
		  	
		  	if(inputValue){
		  		inputValue = String(inputValue).replace(/[,]/g,'');
		  	}
		  	
		  	var strValue =String(parseInt(inputValue));
		  	var arReturnValue = [];
		  	var arSequence ='zzz,zzz,zzz,zzz,zzz,zzz,zzz,zzz';
		  	
		  	var jumValue = strValue.substr(strValue.length-jum);
		  	
		  	for(var a =jumValue.length-1; -1<a ;a--){
		  		if(jumValue[a] =='0'){
		  			jumValue =jumValue.substr(0,a);			
		  		}else{
		  			break;
		  		}
		  	}
		  	
		  	if(jumValue){arReturnValue.unshift('.'+jumValue);}
		  	strValue =strValue.substr(0,strValue.length-jum);
				var arValues = strValue.split('');
			
		  	for (var i = arSequence.length,arrLen=arValues.length; 0 <arrLen; i--)
		  	{
		  		var strChar = arValues[arrLen-1];
		  		var strPattern = arSequence[i-1];
		  		if (strPattern == ',' )
		  		{
		  			arReturnValue.unshift(strPattern);
		  			i--;
		  		}	    		
		  		arReturnValue.unshift(strChar);
		  		arrLen--;
		  		
		  	}
		  	
		  	return minusValue+arReturnValue.join('');
		  	
		},
		
	  // E-mail 유효성 검사
	  fnEmailValidation : function(obj) {      
	        var regExp = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;    
	        if (obj == "") {
	            return false;
	        }
	        // 유효한 값이면
	        if (regExp.test(obj)) {        
	            return true; 
	        } else {
	            //globalErrmsg = "잘못된 형식의 E-mail입니다.";
	            return false;
	        }    
	    },
		 // 체크카드 이메일 구분코드 가져오는 함수
	   fnGetCardEmailCode : function(value) {      
	        var MailArray =['chol.com','dreamwiz.com','empal.com','freechal.com','gmail.com','hanmail.net',
	                        'hotmail.com','korea.com','nate.com','naver.com','paran.com','unitel.co.kr','yahoo.co.kr'];
	        
	        var codeValue =MailArray.indexOf(value);
	        
	        if(codeValue == '-1'){	
	        	return '';
	        }else{
	        	return codeValue+1;
	        }
	        
	    },
			
		StrToDecimal : function(data,length,scale){				
			  //문자열(숫자)을 Decimal Type으로 변경
			  var f , b , frontLen;
							
			//소수점을 가지고있다면            
			if(data.indexOf('.') != -1){
				//console.log("소수점 있을때 data : "+data);
				var str = data.split('.');
		
				//앞자리 Length 구하기
				frontLen = length -(scale +1);
		
				//앞자리 0찍기
				var jumFront = str[0].padding(-frontLen,'0');           
				f = jumFront;  
		
				//뒷자리 0찍기
				var jumBack = str[1].padding(scale,'0');
		
				b = jumBack;            
		
				//뒷자리보다 scale이 크면 scale만큼 자르기
				if(str[1].length > scale){
					b = str[1].substring(0,scale);                                
				}        
			}
		
			//소수점 없을때
			else{
				//console.log("소수점 없을때 data :  " + data);
				
				//앞자리 Length 구하기
				frontLen = length -(scale +1);
		
				//앞자리 0찍기
				var nojumFront = data.padding(-frontLen,'0');
				f = nojumFront;  
				b ='';
		
				//뒷자리 0찍기
				var nojumBack = b.padding(scale,'0');
				b = nojumBack;  
			}
			return f+'.'+b;
		},

		fnPaddingData : function(strSource, strFiller, nMaxDataLen, bLeft) {
			var strFilledData = "";

			if (strFiller == undefined || strFiller.length == 0) return strSource;

			// is LeftPadding / RightPadding ...
			if (bLeft == undefined) bLeft = false;

			// Dummy Filler String
			for (var i = 0; i < nMaxDataLen; i++) strFilledData += strFiller;

			// Left Padding
			if (bLeft == true) {

				var strSource = String(strSource);
				if (strSource.charAt(0) == '-') {
					strFilledData = strSource.charAt(0) + strFilledData.substring(0, nMaxDataLen - (strSource.length)) + strSource.substring(1, strSource.length);
				} else {
					strFilledData = strFilledData + strSource;
				}

				return this.fnSubstrByteLen(strFilledData, this.fnGetByteLengthMBCS(strFilledData) - nMaxDataLen);
			}
			// Right Padding
			else {
				strFilledData = strSource + strFilledData;

				return this.fnSubstrByteLen(strFilledData, 0, nMaxDataLen);
			}
		},		    		
		
		fnSubstrByteLen : function(str, start, length) {
			var startb = 0, lenb = 0, bChLen = 0;
			if (length == undefined) {
				for (var i = 0, len = str.length; i < len; i++) {
					startb += (str.charCodeAt(i) > 128) ? 2 : 1;
					if (startb > start) return str.substr(i);
				}
				return str.substr(startb);
			} else {
				var startPos = 0;
				for (var i = 0, len = str.length; i < len; i++) {
					bChLen = (str.charCodeAt(i) > 128) ? 2 : 1;
					if (startb < start) {
						startb += bChLen;
						startPos = i + 1;
					} else {
						lenb += bChLen;
					}

					if (lenb > length) {
						return str.substring(startPos, i);
					}
				}

				return str.substring(startPos);
			}
		},
		
    fnGetByteLength : function (strSource ) {
        var byteLen, i, charCode;
        for (byteLen = i = 0; charCode= strSource.charCodeAt(i++);byteLen+=charCode>>11?3:charCode>>7?2:1);

        return byteLen;
    },	        

	fnGetByteLengthMBCS : function(strSource) {
		var chOneChar;
		var nResult = 0;
		for (var i = 0, len = strSource.length; i < len; i++) {
			chOneChar = strSource.charCodeAt(i);
			nResult += chOneChar <= 255 ? 1 : 2;
		}
		return nResult;
	},
	// usd 포맷 표시
	fnUsdMoneyChgFormat : function (money){
		var returnVal = "";
		if(com.util.isNull(money)){
		return returnVal;
		}
		if(money.indexOf(".") > -1) {
			var sp = money.split(".");
			var re = com.util.fnGetFormatMoney(sp[0]) + "."+ sp[1].substr(0,2);
			returnVal = re;
		} else {
			returnVal = money;
		}
		return returnVal;
	},
	getBytesLength: function (strSource) {
            var startb = 0;
            for (var i = 0; i < strSource.length; i++) {
                startb += (strSource.charCodeAt(i) > 128) ? 2 : 1;
            }

            return startb;
        },
		// 데이터 포맷변경
		fnGetFormatData : function (arSequence, strValue) {
	    	var arReturnValue = [];
	    	var arValues = strValue.split('');
	    	for (var i = 0,arrLen=0, len = arValues.length; arrLen < len; i++)
	    	{
	    		var strChar = arValues[arrLen];
	    		var strPattern = arSequence[i];
	    		if (strPattern == '*' )
	    		{
	    			arReturnValue.push(strPattern);
	    			arrLen++;
	    		}else if(strPattern == '-'){
	    			arReturnValue.push(strPattern);
	    		}else if(strPattern == '.'){
	    			arReturnValue.push(strPattern);
	    		}
	    		else if(strPattern == ':'){
	    			arReturnValue.push(strPattern);
	    		}
	    		else
	    		{
	    			arReturnValue.push(strChar);
	    			arrLen++;
	    		}
	    	}
	    	return arReturnValue.join('');
	    },	
		
		// 생년 구하는 함수
		fnGetBirthYear : function(jumin){
			var rtnValue = "";
			var juminCode = jumin.substr(6,1);
			if(juminCode == "9" || juminCode == "0"){
				rtnValue = "18";
			} else if(juminCode == "1" || juminCode == "2" || juminCode == "5" || juminCode == "6"){
				rtnValue = "19";
			} else if(juminCode == "3" || juminCode == "4" || juminCode == "7" || juminCode == "8"){
				rtnValue = "20";
			}
			return rtnValue;
		},
		
		// 성별구하는 함수
		fnGetSex : function (jumin){
			var rtnValue = "";
			var juminCode = jumin.substr(6,1);
			if(juminCode == "9" || juminCode == "1" || juminCode == "3" || juminCode == "5" || juminCode == "7"){
				rtnValue = "1";  // 남성
			} else {
				rtnValue = "2";  // 여성
			}
			return rtnValue;
		},
		
		// 내외국인 구하는 함수
		fnGetFrom : function(jumin){
			// 0:내국인, 1:외국인
			var rtnValue = "";
			var juminCode = jumin.substr(6,1);
			if(juminCode == "9" || juminCode == "0" || juminCode == "1" || juminCode == "2" || juminCode == "3" || juminCode == "4"){
				rtnValue = "0";
			} else if(juminCode == "5" || juminCode == "6"|| juminCode == "7" || juminCode == "8"){
				rtnValue = "1";
			}
			return rtnValue;
		},
		
		// 비밀번호 유효성검사
		fnValidation : function(pwdPrev, pwdNext){

	    	var bRetVal = true;
	    	if(!pwdPrev.Text || pwdPrev.Text.length != pwdPrev.MaxLength) {
	    		console.log('비밀번호 자릿수를 확인해주세요');
	    		//bRetVal = false;
	    		return bRetVal = "비밀번호 자릿수를 확인해주세요";
	    	}
	    	if (this.isCountinuedValue(pwdPrev.Text) == true){
	    		console.log('연속되지 않은 숫자로 입력해주세요');
	    		//bRetVal = false;
	    		return bRetVal = "연속되지 않은 숫자로 입력해주세요";
	    	}
	    	if(pwdNext != undefined){
	    		if(!pwdNext.Text || pwdNext.Text.length != pwdNext.MaxLength) {
	    			console.log('비밀번호재입력 자릿수를 확인해주세요');
	    			//bRetVal = false;
	    			return bRetVal = "비밀번호재입력 자릿수를 확인해주세요";
	    		} else if (pwdPrev.Text != pwdNext.Text) {
	    			console.log('비밀번호가 불일치합니다.');
	    			//bRetVal = false;
	    			return bRetVal = "비밀번호가 불일치합니다";
	    		} else if (this.isCountinuedValue(pwdNext.Text) == true) {
	    			console.log('연속되지 않은 숫자로 입력해주세요');
	    			//bRetVal = false;
	    			return bRetVal = "연속되지 않은 숫자로 입력해주세요";
	    		}
	    	}
	    	return bRetVal;
	    },
		//비밀번호가 연속적인 값인지 체크합니다.
		isCountinuedValue :function (value){
			var num1=0;
			var num2=0;
			var num3=0;
			
			var value0='';
			var value1='';
			var value2='';
			var value3='';
			
			var num3Limt = 2;
			if( value.length ==6 ){
				num3Limt = 3;
			}
			
			for(var i=0;i<value.length;i++){
				value0= value.charAt(i);
				value1= value.charAt(i+1);
				value2= value.charAt(i+2);
				value3= value.charAt(i+3);
				
				if(value0.charCodeAt(0)-value1.charCodeAt(0) ==1  ){
					num1 =num1+1;
				}
				if(value0.charCodeAt(0)-value1.charCodeAt(0)==-1 ){
					num2 =num2+1;
				}
				if(value0.charCodeAt(0)-value1.charCodeAt(0) ==0 ){
					num3 =num3+1;
				}
				
			}
			if(num1 > 2 || num2 > 2 || num3 > num3Limt){
					return true;
			}else{
					return false;
			}
		}
		
	}
}();


/*****************************************************************************
*
*			계좌번호(acct) 관련 함수 정의
*
******************************************************************************/
com.acct = function() {

	return {
		
      convertBankName : function(pParam){
            if(pParam == "001") return   "한국은행";
            if(pParam == "002") return   "한국산업은행";
            if(pParam == "003") return   "중소기업은행";
            if(pParam == "004") return   "국민은행";
            if(pParam == "005") return   "KEB하나은행";
            if(pParam == "006") return   "국민은행";
            if(pParam == "007") return   "수협은행";
            if(pParam == "008") return   "한국수출입은행";
            if(pParam == "009") return   "수협은행";
            if(pParam == "010") return   "농협은행";
            if(pParam == "011") return   "농협은행";
            if(pParam == "012") return   "농업협동조합";
            if(pParam == "013") return   "농업협동조합";
            if(pParam == "014") return   "농업협동조합";
            if(pParam == "015") return   "농업협동조합";
            if(pParam == "016") return   "농협";
            if(pParam == "017") return   "농업협동조합";
            if(pParam == "018") return   "농업협동조합";
            if(pParam == "019") return   "국민은행";
            if(pParam == "020") return   "우리은행";
            if(pParam == "021") return   "신한은행";
            if(pParam == "022") return   "우리은행";
            if(pParam == "023") return   "SC은행";
            if(pParam == "024") return   "우리은행";
            if(pParam == "025") return   "KEB하나은행";
            if(pParam == "026") return   "신한은행";
            if(pParam == "027") return   "한국씨티은행";
            if(pParam == "028") return   "신한은행";
            if(pParam == "029") return   "국민은행";
            if(pParam == "031") return   "대구은행";
            if(pParam == "032") return   "부산은행";
            if(pParam == "033") return   "KEB하나은행";
            if(pParam == "034") return   "광주은행";
            if(pParam == "035") return   "제주은행";
            if(pParam == "036") return   "한국씨티은행";
            if(pParam == "037") return   "전북은행";
            if(pParam == "038") return   "조흥은행";
            if(pParam == "039") return   "경남은행";
            if(pParam == "040") return   "조흥은행";
            if(pParam == "043") return   "중소기업은행";
            if(pParam == "044") return   "외환카드";
            if(pParam == "045") return   "새마을금고중앙회";
            if(pParam == "046") return   "새마을금고연합회";
            if(pParam == "047") return   "신협";
            if(pParam == "048") return   "신협";
            if(pParam == "049") return   "신협";
            if(pParam == "050") return   "저축은행";
            if(pParam == "051") return   "외국은행";
            if(pParam == "052") return   "모간스탠리";
            if(pParam == "053") return   "한국씨티은행";
            if(pParam == "054") return   "HSBC은행";
            if(pParam == "055") return   "도이치 은행";
            if(pParam == "056") return   "알비에스";
            if(pParam == "057") return   "JP모건";
            if(pParam == "058") return   "미즈호코페레이트";
            if(pParam == "059") return   "엠유에프지";
            if(pParam == "060") return   "BANK OF AMERICA";
            if(pParam == "061") return   "비엔피파리바은행";
            if(pParam == "062") return   "중국공상은행서울";
            if(pParam == "063") return   "중국은행 서울지점";
            if(pParam == "064") return   "산림조합";
            if(pParam == "065") return   "대화은행";
            if(pParam == "067") return   "중국건설은행";
            if(pParam == "071") return   "정보통신부우체국";
            if(pParam == "072") return   "정보통신부우체국";
            if(pParam == "073") return   "정보통신부우체국";
            if(pParam == "074") return   "정보통신부우체국";
            if(pParam == "075") return   "정보통신부우체국";
            if(pParam == "076") return   "신용보증기금";
            if(pParam == "077") return   "기술신용보증기금";
            if(pParam == "078") return   "국민은행";
            if(pParam == "079") return   "국민은행";
            if(pParam == "080") return   "KEB하나은행";
            if(pParam == "081") return   "KEB하나은행";
            if(pParam == "082") return   "KEB하나은행";
            if(pParam == "083") return   "우리은행";
            if(pParam == "084") return   "우리은행";
            if(pParam == "085") return   "새마을금고연합회";
            if(pParam == "086") return   "새마을금고연합회";
            if(pParam == "087") return   "새마을금고중앙회";
            if(pParam == "088") return   "신한은행";
            if(pParam == "089") return   "케이뱅크";
            if(pParam == "090") return   "카카오뱅크";
            if(pParam == "091") return   "(주)한네트";
            if(pParam == "092") return   "토스뱅크";
            if(pParam == "093") return   "KI뱅크넷";
            if(pParam == "094") return   "청호";
            if(pParam == "095") return   "롯데VAN";
            if(pParam == "096") return   "나이스";
            if(pParam == "097") return   "효성";
            if(pParam == "098") return   "WEB";
            if(pParam == "099") return   "금융결제원";
            if(pParam == "09C") return   "SKN";
            if(pParam == "09D") return   "BGF캐시넷";
            if(pParam == "101") return   "한국신용정보원";
            if(pParam == "102") return   "대신저축은행";
            if(pParam == "103") return   "에스비아이저축은행";
            if(pParam == "104") return   "에이치케이저축은행";
            if(pParam == "105") return   "웰컴저축은행";
            if(pParam == "209") return   "유안타증권";
            if(pParam == "218") return   "KB증권";
            if(pParam == "221") return   "골든브릿지투자증권";
            if(pParam == "222") return   "한양증권";
            if(pParam == "223") return   "리딩투자증권";
            if(pParam == "224") return   "BNK투자증권";
            if(pParam == "225") return   "IBK투자증권";
            if(pParam == "226") return   "KB증권";
            if(pParam == "227") return   "KTB투자증권";
            if(pParam == "230") return   "미래에셋";
            if(pParam == "238") return   "미래에셋대우";
            if(pParam == "240") return   "삼성증권";
            if(pParam == "243") return   "한국투자";
            if(pParam == "247") return   "NH투자증권";
            if(pParam == "261") return   "교보증권";
            if(pParam == "262") return   "하이투자";
            if(pParam == "263") return   "현대차증권";
            if(pParam == "264") return   "키움증권";
            if(pParam == "265") return   "이베스트";
            if(pParam == "266") return   "SK증권";
            if(pParam == "267") return   "대신증권";
            if(pParam == "268") return   "아이엠증권";
            if(pParam == "269") return   "한화증권";
            if(pParam == "270") return   "하나대투";
            if(pParam == "278") return   "신한투자";
            if(pParam == "279") return   "DB금융투자";
            if(pParam == "280") return   "유진증권";
            if(pParam == "287") return   "메리츠종금증권";
            if(pParam == "289") return   "NH투자증권";
            if(pParam == "290") return   "부국증권";
            if(pParam == "291") return   "신영증권";
            if(pParam == "292") return   "케이프투자증권";
            if(pParam == "293") return   "한국증권금융";
            if(pParam == "294") return   "펀드온라인코리아";
            if(pParam == "295") return   "우리종합금융";
            if(pParam == "296") return   "삼성선물";
            if(pParam == "297") return   "외환선물";
            if(pParam == "298") return   "현대선물";
            if(pParam == "299") return   "아주캐피탈";
            if(pParam == "361") return   "비씨카드";
            if(pParam == "364") return   "광주은행카드";
            if(pParam == "365") return   "삼성카드";
            if(pParam == "366") return   "신한카드";
            if(pParam == "367") return   "현대카드";
            if(pParam == "368") return   "롯데카드";
            if(pParam == "369") return   "수협카드";
            if(pParam == "370") return   "씨티카드";
            if(pParam == "371") return   "NH카드";
            if(pParam == "372") return   "전북은행카드";
            if(pParam == "373") return   "제주은행카드";
            if(pParam == "374") return   "하나SK카드";
            if(pParam == "381") return   "KB 카드";
            if(pParam == "431") return   "미래에셋생명";
            if(pParam == "432") return   "한화생명";
            if(pParam == "433") return   "교보라이프플래닛생명";
            if(pParam == "434") return   "푸본현대생명";
            if(pParam == "435") return   "라이나생명";
            if(pParam == "436") return   "교보생명";
            if(pParam == "437") return   "에이비엘생명";
            if(pParam == "438") return   "신한생명";
            if(pParam == "439") return   "KB생명보험";
            if(pParam == "440") return   "농협생명";
            if(pParam == "441") return   "삼성화재";
            if(pParam == "442") return   "현대해상";
            if(pParam == "443") return   "DB손해보험";
            if(pParam == "444") return   "KB손해보험";
            if(pParam == "445") return   "롯데손해보험";
            if(pParam == "446") return   "오렌지라이프생명";
            if(pParam == "447") return   "악사손해보험";
            if(pParam == "448") return   "메리츠화재";
            if(pParam == "449") return   "농협손해보험";
            if(pParam == "450") return   "푸르덴셜생명보험";
            if(pParam == "452") return   "삼성생명";
            if(pParam == "453") return   "흥국생명";
            if(pParam == "454") return   "한화손해보험";
            if(pParam == "455") return   "AIA생명보험";
            if(pParam == "456") return   "DGB생명보험";
      },
      
      convertBankName2 : function(pParam){
            if(pParam == "002") return   "산업";
            if(pParam == "003") return   "기업은행";
            if(pParam == "004") return   "국민";
            if(pParam == "005") return   "외환";
            if(pParam == "011") return   "농협";
            if(pParam == "012") return   "단위농협";
            if(pParam == "020") return   "우리";
            if(pParam == "023") return   "SC제일";
            if(pParam == "027") return   "한국씨티";
            if(pParam == "031") return   "대구";            
            if(pParam == "032") return   "부산";
            if(pParam == "034") return   "광주";
            if(pParam == "035") return   "제주";
            if(pParam == "037") return   "전북";
            if(pParam == "039") return   "경남";
            if(pParam == "045") return   "새마을금고";            
            if(pParam == "048") return   "신협";
            if(pParam == "071") return   "우체국";
            if(pParam == "081") return   "하나";
            if(pParam == "088") return   "신한";
            if(pParam == "089") return   "케이뱅크";
            if(pParam == "090") return   "카카오뱅크";
            if(pParam == "092") return   "토스뱅크";
      },

      // 신용카드상품명 가져오기
      cardProductCodes : function(pParam){  
          if(pParam == "B11") return   "국내일시불";
          if(pParam == "B12") return   "해외일시불";
          if(pParam == "B21") return   "할부";
          if(pParam == "B31") return   "국내단기카드대출";
          if(pParam == "B32") return   "해외단기카드대출";
          if(pParam == "B41") return   "국내일부결제금액이월일시불";
          if(pParam == "B42") return   "해외일부결제금액이월일시불";
          if(pParam == "B51") return   "국내일부결제금액이월단기카드대출";
          if(pParam == "B52") return   "해외일부결제금액이월단기카드대출";
          if(pParam == "B61") return   "현금인출";        	
          if(pParam == "B70") return   "알파장기카드대출";        	
          if(pParam == "B71") return   "일반장기카드대출";        	
          if(pParam == "BA1") return   "연회비";        	
          if(pParam == "BA8") return   "연체";        	
          if(pParam == "BA9") return   "미납연회비";        	
          if(pParam == "C11") return   "국내체크일시불";        	
          if(pParam == "C12") return   "해외체크일시불";        	
          if(pParam == "VB1") return   "법적비용";        	
          if(pParam == "VC1") return   "과잉금";        	
      	
      },

	    fnGetAccountPattern: function (strValue) {
	        var me = this;
	       
	        if(!strValue){
        		return '';
        	}
	        return this.getMultiBPRAcc(strValue);
      
	    },       
       
			getMultiBPRAcc : function(account) {
				account = account.replace(/\-/g, '');
				account =account.trim()
				if (account.length == 11) {
					return account;//this.getTransNum(account, 'accA');
				} else if (account.length == 12) {
					return this.getTransNum(account, 'accB');
				} else if (account.length == 13) {
					return this.getTransNum(account, 'accC');
				} else if (account.length == 14) {
					return this.getTransNum(account, 'accE');
				} else if (account.length == 15) {
					return this.getTransNum(account, 'accD');
				} else if (account.length == 16) {
					return this.getTransNum(account, 'accF');
				}else {
					return account;
				}
			},
			
      fnGetAmountPattern : function (inputValues) {
          return this.getAmountPattern(inputValues);
      },
        			
      getAmountPattern : function (inputValues) {
        	var inputValue = String(inputValues);
        	var minusValue ='';
        	if(inputValue[0] =='-'){
        		minusValue ='-';
        		inputValue =inputValue.substr(1);        		
        	}
        	if(inputValue){
        		inputValue = String(inputValue).replace(/[,]/g,'');
        	}
	    	var strValue =String(parseInt(inputValue));
	    	var arReturnValue = '';
	    	var arSequence ='zzz,zzz,zzz,zzz,zzz,zzz,zzz,zz9';
	    	
	    	var arSequenceLen = arSequence.length;
	    	var length = strValue.length;
	    	var commaLength = parseInt((length - 1)/ 3);
	    	
	    	arReturnValue = arSequence.substr(arSequenceLen - length - commaLength);
	    	return arReturnValue;
	    },			
						
			getTransNum : function(num, type) {
				var strPatternData = '';
	
				for ( var j = 0; j < num.length; j++) {
					strPatternData += num.substr(j, 1);
					switch (type) {
					case 'accA': // 11자리
						if (j == 2 || j == 4)
							strPatternData += '-';
						break;
					case 'accB': // 12자리
						if (j == 2 || j == 4|| j == 10)
							strPatternData += '-';
						break;
					case 'accC': // 13자리
						if (j == 2 || j == 6|| j == 10)
							strPatternData += '-';
						break;
					case 'accD': // 15자리
						if (j == 2 || j == 4|| j == 10)
							strPatternData += '-';
						break;
					case 'accE': // 14자리
						if (j == 2 || j == 8|| j == 10)
							strPatternData += '-';
						break;
					case 'accF': // 16자리
						if (j == 2 || j == 8|| j == 10)
							strPatternData += '-';
						break;
					case 'phoneS': // 전화번호 10자리미만
						if (j == 1 || j == 4)
							strPatternData += '-';
						break;
					case 'phone102': // 전화번호 10자리 02가 포함되어잇는경우
						if (j == 1 || j == 5)
							strPatternData += '-';
						break;
					case 'phone10': // 전화번호 10자리
						if (j == 2 || j == 5)
							strPatternData += '-';
						break;
					case 'phone11': // 전화번호 11자리
						if (j == 2 || j == 6)
							strPatternData += '-';
						break;
					case 'phone12': // 전화번호 12자리
						if (j == 3 || j == 7)
							strPatternData += '-';
						if (j == 11) {
							var leng = strPatternData.length - 1;
							if (strPatternData.substr(leng, leng) == '-')
								strPatternData = strPatternData.substr(0, leng);
							return strPatternData;
						}
						break;
					case 'jumin10': // 주민번호 10자리 (사업자)
						if (j == 2 || j == 4)
							strPatternData += '-';
						break;
					case 'jumin': // 주민번호
						if (j == 5)
							strPatternData += '-';
						if (j == 12) {
							var leng = strPatternData.length - 1;
							if (strPatternData.substr(leng, leng) == '-')
								strPatternData = strPatternData.substr(0, leng);
							return strPatternData;
						}
						break;
					case 'post': // 우편번호
						if (j == 2)
							strPatternData += '-';
						break;
					case 'fax9':
						if (j == 1 || j == 4)
							strPatternData += '-';
						break;
					case 'fax10':
						if (j == 1 || j == 5)
							strPatternData += '-';
						break;
					case 'fax102':
						if (j == 2 || j == 5)
							strPatternData += '-';
						break;
					case 'fax11':
						if (j == 3 || j == 6)
							strPatternData += '-';
						break;
					case 'fax112':
						if (j == 2 || j == 6)
							strPatternData += '-';
						break;
					case 'fax12':
						if (j == 1 || j == 3||j == 9)
							strPatternData += '-';
						break;
					default:
						break;
					}
				}
				var leng = strPatternData.length - 1;
				if (strPatternData.substr(leng, leng) == '-')
					strPatternData = strPatternData.substr(0, leng);
				return strPatternData;
			},
			
			//계좌번호 하이픈 찍기
			accountHypen : function(str){
				if(str == 'undefined' || str == null || str ==''){
					return;
				}
				str = str.replace(/[^0-9]/g, '');
				var tmp = '';
				if( str.length < 4 ) {
					return str;
				}
				else if (str.length < 10){
					tmp += str.substr(0,3);
					tmp += '-';
					tmp += str.substr(3);
					return tmp;
				}
				
				else if(str.length < 12){
					tmp += str.substr(0, 3);
					tmp += '-';		
					tmp += str.substr(3, 6);
					tmp += '-';		
					tmp += str.substr(9);
					return tmp;
				}
				else{
					tmp += str.substr(0, 3);
					tmp += '-';		
					tmp += str.substr(3, 6);
					tmp += '-';		
					tmp += str.substr(9 , 2);
					tmp += '-';
					tmp += str.substr(11);		
					return tmp;
				}
				return str;
		  }
		
	}
}();		


/*****************************************************************************
*
*			화면(SCREEN) 관련 함수 정의
*
******************************************************************************/
com.screen = function() {
	var timerId = null;
	
	return {
		// 팝업 : 모달, 메인화면과 같은 위치, 같은 사이즈
		createPopup : function(screenNo, msg){
		    let opt = { 
			    'new' : true,
			    'url' : this._getUrl(screenNo) + "?msg=" + msg, 
			    'openParam' : {
			    	type : 3,
			    	posX : 0,
			    	posY : 0,
			    	width : 1280,
			    	height : 1024,
			    	fullscreen : false,
			    },
		    }	
			host.form.openTab(opt);
		},
		
		createPopupEx : function(screenNo, params){
		    let opt = { 
			    'new' : true,
			    'url' : this._getUrl(screenNo) + "?" + params.join('&'), 
			    'openParam' : {
			    	type : 3,
			    	posX : 0,
			    	posY : 0,
			    	width : 1280,
			    	height : 1024,
			    	fullscreen : false,
			    },
		    }	
			host.form.openTab(opt);
		},
		
		closePopup : function(f_close){
			if (host.form.isPopup) {
				f_close(host.form.opener);
				host.form.close();
			} else {
				f_close(parent);
				Form.Close();
			}
		},
		
		screenCall : function(screenNo, params){
			Form.Url = this._getUrl(screenNo) + "?" + params.join('&');
		},
		
		_getUrl : function(screenNo){
			return "/KRG/0301/"+screenNo+".html";
		},
		
		setTimeoutEx : function(time, cbFunc){
			$(document).on("click", function(e){
				if (timerId == null){
					console.log("[document] timerId == null");				
					return;
				}
				clearTimeout(timerId);
				console.log(">> [document] clearTimeout : id = " + timerId);
				
				timerId = setTimeout(cbFunc, time);
				console.log(">> [document] Reset Timeout : time = " + time + ", id = " + timerId);
			});
			
			$("body").on("click", function(e){
				if (timerId == null){
					console.log("[body] timerId == null");		
					e.stopPropagation();
					return;
				}
				clearTimeout(timerId);
				console.log(">> [body] clearTimeout : id = " + timerId);
				
				timerId = setTimeout(cbFunc, time);
				console.log(">> [body] Reset Timeout : time = " + time + ", id = " + timerId);
				
				e.stopPropagation();
			});
			
			$("iframe.ui-include").contents().on("click", function(e){
				if (timerId == null){
					console.log("[iframe.ui-include] timerId == null");				
					return;
				}
				clearTimeout(timerId);
				console.log(">> [iframe.ui-include] clearTimeout : id = " + timerId);
				
				timerId = setTimeout(cbFunc, time);
				console.log(">> [iframe.ui-include] Reset Timeout : time = " + time + ", id = " + timerId);
				
				e.stopPropagation();
			});
			
			timerId = setTimeout(cbFunc, time);
			console.log("setTimeoutEx : time = " + time + ", id = " + timerId);
		},
		

		clearTimeoutEx : function(){
			if (timerId == null){
				console.log("[clearTimeoutEx] timerId == null");
				return;
			}
			$(document).off("click");
			$("body").off("click");
			$("iframe.ui-include").contents().off("click");
			
			console.log("clearTimeoutEx id : " + timerId);
			clearTimeout(timerId);
			timerId = null;
		}
		
	}
}();


/*****************************************************************************
*
*			세션스토리지(sessionStorage) 관련 함수 정의
*
******************************************************************************/
com.ss = function() {
	
	return {

		  // 세션스토리지 인덱스로 키값 가져오기
			getKey : function(index){
				if(com.util.isNull(index) || isNaN(index)){
					return "";
				}
				return sessionStorage.key(index);
			},	
				
		  // 세션스토리지 아이템 가져오기
			getItem : function(key){
				if(com.util.isNull(key)){
					return "";
				}
				return sessionStorage.getItem(key);
			},
			
			// 세션스토리지 아이템 셋팅
			setItem : function(key,val){
				 sessionStorage.setItem(key,val);
			},
			
			// 세션스토리지 아이템 삭제
		  removeItem : function(key){
				 sessionStorage.removeItem(key);
			},
			
			// 세션스토리지 아이템 초기화
			clear : function(){   
				 sessionStorage.clear();
			}
					
	}
}();
	

/*****************************************************************************
*
*			prototype 함수 정의
*
******************************************************************************/
String.prototype.padding = function(n,c){
    var val = this.valueOf();
    //console.log("시작 val  :  "+val);
    if(Math.abs(n) <= val.length){
        return val;
    }        

    var m = Math.max((Math.abs(n) - this.length) || 0,0);
    var pad = Array(m +1 ).join(String(c || '').charAt(0));
    return (n<0)? pad +val : val+pad;       
};


/*****************************************************************************
*
*			그외 기타 함수 정의
*
******************************************************************************/

// 리스트 클릭 이벤트
function comSelectAnimate($obj) {
    var chs = this;
		
    $(chs).animate({
        top: '+=5px',
        opacity: '0.5',
    }, 50, reback);

    function reback() {
        $(chs).animate({
            top: '-=5px',
            opacity: '1',
        }, 50);
        chs = null;
    }

    // 리스트 박스 테두리 디폴트 셋팅    			        
    if($obj != null && $obj != undefined && $obj != ""){
       $obj.css({'border': '1px solid #9c9c9c'});
    }
    
    /**** 리스트가 많을때 셀렉터를 지정하지 않으면 제대로 동작을 안함??!!(셀렉터 지정 필요)    
    if($obj != null && $obj != undefined && $obj != ""){
       $obj.css({'border': '1px solid #9c9c9c'});
    } else {
	     $(chs).parent("div").children("div").css({'border': '1px solid #9c9c9c'});
    }
    ****/
   	
    // 선택한 박스 테두리 셋팅
    $(chs).css({'border': '5px solid #9c9c9c'});
    					  
}  // end func - comSelectAnimate	

/*****************************************************************************
*
*			MP3 관련 함수 정의
*
******************************************************************************/
com.mp3 = function() {
	var audio = new Audio();
	
	return {
		
		play : function(path){
			audio.preload = "auto";
			audio.src = path;
			audio.volume = .4;
			audio.play();
		},
		
		pause : function(){
			audio.pause();
		}	
	}
}();



/*****************************************************************************
*
*			넘버패드 관련 함수 정의
*
******************************************************************************/

com.numberpad = function() {
	return {
		//MaxLength 일때 숫자버튼 disabled
		maxLength : function(target){
			if(target.$.hasClass('fixed')){
				let length = $('table.fixed').find("tbody > tr >td").length;
				for(let i = 0; i<length; i++){
					let key = $(".ui-numberpad >table.fixed >tbody >tr >td:eq("+i+")").attr('key');			
					if($.isNumeric(key) == true){
						target.$.find("tbody > tr >td:eq("+i+")").css({'background-color':'Transparent'}).addClass('ui-disabled');
						target.$.find("tbody > tr >td:eq("+i+") >div").css({'background-color':'rgb(237, 238, 240)' ,'opacity':'0.3'});

						//정정 backspace disabled 풀기 css
						target.$.find('>table.fixed >tbody >tr >td.clear >div').css({'border':'2px solid #00437d','background-color':'#026fce'});
						target.$.find('>table.fixed >tbody >tr >td.backspace >div').css({'border':'2px solid #2092bc','background-color':'#2eb6e9'});

						//정정 backspace 버튼 disabled 풀기
						target.$.find("tbody > tr >td.clear").css({'background-color':'Transparent'}).removeClass('ui-disabled');
						target.$.find("tbody > tr >td.backspace").css({'background-color':'Transparent'}).removeClass('ui-disabled');
					}
				}
			}
			else{
				let length = $('table.shuffle').find("tbody > tr >td").length;
				for(let i = 0; i<length; i++){
					let key = $(".ui-numberpad >table.shuffle >tbody >tr >td:eq("+i+")").attr('key');			
					if($.isNumeric(key) == true){
						target.$.find("tbody > tr >td[key='"+key+"']").css({'background-color':'Transparent'}).addClass('ui-disabled');
						target.$.find("tbody > tr >td[key='"+key+"'] >div").css({'background-color':'rgb(237, 238, 240)' ,'opacity':'0.3'});

						//정정 backspace disabled 풀기 css
						target.$.find('>table.shuffle >tbody >tr >td.clear >div').css({'border':'2px solid #00437d','background-color':'#026fce'});
						target.$.find('>table.shuffle >tbody >tr >td.backspace >div').css({'border':'2px solid #2092bc','background-color':'#2eb6e9'});

						//정정 backspace 버튼 disabled 풀기
						target.$.find("tbody > tr >td.clear").css({'background-color':'Transparent'}).removeClass('ui-disabled');
						target.$.find("tbody > tr >td.backspace").css({'background-color':'Transparent'}).removeClass('ui-disabled');
					}
				}
			}
		},
		//숫자 입력할때 
		notMaxLength : function(target){
			if(target.$.hasClass('fixed')){
				let length = $('table.fixed').find("tbody > tr >td").length;
				for(let i = 0; i<length; i++){
					let key = $("table.fixed >tbody >tr >td:eq("+i+")").attr('key');
					if($.isNumeric(key) == true){			
						target.$.find("tbody > tr >td:eq("+i+")").removeClass('ui-disabled');
						target.$.find("tbody > tr >td:eq("+i+") >div").css({'border':'2px solid #cfcfcf','background-color':'#eceef1','color':'#383838','opacity':'1.0'});
						
						//정정 backspace disabled 풀기 css
						target.$.find('>table.fixed >tbody >tr >td.clear >div').css({'border':'2px solid #00437d','background-color':'#026fce'});
						target.$.find('>table.fixed >tbody >tr >td.backspace >div').css({'border':'2px solid #2092bc','background-color':'#2eb6e9'});
						
						//정정 backspace 버튼 disabled 풀기
						target.$.find("tbody > tr >td.clear").css({'background-color':'Transparent'}).removeClass('ui-disabled');
						target.$.find("tbody > tr >td.backspace").css({'background-color':'Transparent'}).removeClass('ui-disabled');
					}
				}
			}
			else{
				let length = $('table.shuffle').find("tbody > tr >td").length;
				for(let i = 0; i<length; i++){
					let key = $("table.shuffle >tbody >tr >td:eq("+i+")").attr('key');
					if($.isNumeric(key) == true){
						target.$.find("tbody > tr >td[key='"+key+"']").removeClass('ui-disabled');						
						target.$.find("tbody > tr >td[key='"+key+"'] >div").css({'border':'2px solid #cfcfcf','background-color':'#eceef1','color':'#383838','opacity':'1.0'});

						//정정 backspace disabled 풀기 css
						target.$.find('>table.shuffle >tbody >tr >td.clear >div').css({'border':'2px solid #00437d','background-color':'#026fce'});
						target.$.find('>table.shuffle >tbody >tr >td.backspace >div').css({'border':'2px solid #2092bc','background-color':'#2eb6e9'});
						
						//정정 backspace 버튼 disabled 풀기
						target.$.find("tbody > tr >td.clear").css({'background-color':'Transparent'}).removeClass('ui-disabled');
						target.$.find("tbody > tr >td.backspace").css({'background-color':'Transparent'}).removeClass('ui-disabled');
					}
				}
			}
		},
		//정정 <- 버튼 Disabled (Shuffle Type은 재배열버튼 Hide)
		btnDisabled : function(target){
			if(target.$.hasClass('fixed')){
				target.$.find("tbody > tr >td.backspace").css({'background-color':'Transparent'}).addClass('ui-disabled');
				target.$.find('>table.fixed >tbody >tr >td.clear >div').css({'background-color':'rgb(207, 207, 207)','border':'2px solid #cfcfcf'});
		
				target.$.find("tbody > tr >td.clear").css({'background-color':'Transparent'}).addClass('ui-disabled');
				target.$.find('>table.fixed >tbody >tr >td.backspace >div').css({'background-color':'rgb(226, 226, 226)','border':'2px solid #cfcfcf'});
			}
			//Shuffle
			else{
				target.$.find("tbody > tr >td.backspace").css({'background-color':'Transparent'}).addClass('ui-disabled');
				target.$.find('>table.shuffle >tbody >tr >td.clear >div').css({'background-color':'rgb(207, 207, 207)','border':'2px solid #cfcfcf'});
		
				target.$.find("tbody > tr >td.clear").css({'background-color':'Transparent'}).addClass('ui-disabled');
				target.$.find('>table.shuffle >tbody >tr >td.backspace >div').css({'background-color':'rgb(226, 226, 226)','border':'2px solid #cfcfcf'});
				
				//재배열 버튼 Hide
				target.$.find('table.shuffle >tbody > tr >td.shuffle').css({'background-color':'Transparent'}).addClass("ui-disabled");
				target.$.find('table.shuffle >tbody > tr >td.shuffle >div').hide();
			}
		}
	}
}();
