<%--
  시스템 : AK MALL
  메  뉴 : 공통 > Footer 
  화  면 : 입점제안 작성

--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../inc/Directives.jsp"%>
<link rel="stylesheet" type="text/css" href="/resource/front/css/launchComp.css?20230504" />
<script type="text/javascript" src="/resource/common/js/popup.js?20190711"></script>
<script type="text/javascript">
        
		var isBindChk = true;
		var isPreview = false;
		
		 function launchCompSubmit() {
			 if( $("#flagBizNo").val() != "Y"){
				$("#businessNum1").focus();
				alert("사업자 인증을 진행해주세요.");
				return;
			}
			
			var chk = true;
			var requireInvidCheck = true;
			var optionInvidCheck = true;
			var invidCheck = true;
			var frm = document.frmWrite;
			
			isBindChk = false;
			
			requireInvidCheck = requireInvalidCheck();
			
			if(requireInvidCheck){
				optionInvidCheck = optionInvalidCheck();
			}else{
				 chk = false;
			}
			
			if(!optionInvidCheck){
				chk = false;
			}
			
			if(chk){
		    	frm.method = "POST";
			    frm.target = "_self";
			    frm.action = "${SERVER_SSL}/info/LaunchCompProc.do";
			    frm.submit();	
		    }
		 }
		 
		 function popupLaunchCompFormPreview(){
			if( $("#flagBizNo").val() != "Y"){
				$("#businessNum1").focus();
				alert("사업자 인증을 진행해주세요.");
				return;
			}
			var chk = true;
			var requireInvidCheck = true;
			var optionInvidCheck = true;
			var invidCheck = true;
			var frm = document.frmWrite;
			 
			requireInvidCheck = requireInvalidCheck();
			
			if(requireInvidCheck){
				optionInvidCheck = optionInvalidCheck();
			}else{
				 chk = false;
			}
			
			if(!optionInvidCheck){
				chk = false;
			}
			
		    if(chk){
			     var frmTarget = "pLaunchCompFormPreview";
			     
			     window.open("",frmTarget,"width=700, height=840");
			     //openWindowPopup("", frmTarget, 500, 800, true, false);
			     frm.action = "${SERVER_SSL}/info/pLaunchCompFormPreview.do";
			     frm.target = frmTarget;
			     frm.method = "POST";
			     frm.submit();
		     }
		 }
		 
		function requireInvalidCheck(){
			
			 var forChk = true;
			 var frm = document.frmWrite;
			 var arrCompetitor = [];
		     $("input:checkbox[name='chk_competitor']:checked").each(function(idx){
		     	if($(this).is(":checked")){
					arrCompetitor[idx] = $(this).val();
		     	}
		     });
		     
		     frm.competitor.value = arrCompetitor.toString();
		     frm.partner_ship_yn.value = $("input:radio[name='agreeRadio']:checked").val();
		     frm.phoneNumber.value = $("#frontPhoneNum option:selected").val()+$("#phoneBox").val();
		     
		     if("00" == $("#frontTel option:selected").val())
		     	frm.telNumber.value = "-";
		     else
		    	frm.telNumber.value = $("#frontTel option:selected").val()+$("#telBox").val();
		     
		     if("00" == $("#frontFax option:selected").val())
		    	frm.faxNumber.value = "-";
			     else
			    frm.faxNumber.value = $("#frontFax option:selected").val()+$("#faxBox").val();

		     frm.vendorEmail.value = $("#emailID").val()+"@"+$("#emailDomainAdd").val();

		     
		     let requiredValidation = document.querySelectorAll(".requireDataChk");
		     requiredValidation.forEach(ele => {
			    	var eleName = ele.getAttribute("name");
			    	if(forChk){
			    		if("businessLicenseNumber" == eleName){
			    			let businessLicenseNumber = document.querySelector(".business_license_number");
				    		let requiredNotice = businessLicenseNumber.querySelector(".requiredValue_notice");
				    		
				    		let businessNum1 = businessLicenseNumber.querySelector("#businessNum1");
				    		let businessNum2 = businessLicenseNumber.querySelector("#businessNum2");
				    		let businessNum3 = businessLicenseNumber.querySelector("#businessNum3");
				    		
				    		if(businessNum1.dataset.validation == "N"){
				    			businessNum1.focus();
				    			requiredNotice.innerText = "사업자등록번호는 필수 입력입니다.";
		                        allCheck(".basic_information");
		                        forChk = false;
						        isBindChk = true;
				    		}else if(businessNum2.dataset.validation == "N"){
				    			businessNum2.focus();
				    			requiredNotice.innerText = "사업자등록번호는 필수 입력입니다.";
		                        allCheck(".basic_information");
		                        forChk = false;
						        isBindChk = true;
				    			
				    		}else if(businessNum3.dataset.validation == "N"){
				    			businessNum3.focus();
				    			requiredNotice.innerText = "사업자등록번호는 필수 입력입니다.";
		                        allCheck(".basic_information");
		                        forChk = false;
						        isBindChk = true;
				    		}
				    		
			    		}else if("agreementBox" == eleName){
								let agreeChk = ele.querySelector("#noneEntry");
								
								if(agreeChk.checked == false){
									requiredInputKeyEvt(agreeChk, ele, "agreementBox");
									forChk = false;
							       	chk = false;
							        isBindChk = true;
								}
				    	}else if("businessLicensePaper" == eleName){
				    		let businessLicensePaperArea = document.querySelector(".business_license_paper_area");
				    		let requiredNotice = businessLicensePaperArea.querySelector(".requiredValue_notice");
				    		let file1 = businessLicensePaperArea.querySelector("#licensePaperUploadBtn");
				    		
	                        if(file1.dataset.validation == 'N'){
	                        	removeNotice(ele, requiredNotice, "add");
	                            requiredNotice.innerText = "사업자등록증 첨부는 필수입니다.";
	                        }
				    	}else if("compayAddress" == eleName){
				    		let addressBoxArea = document.querySelector(".address_box_area");
				    		let requiredNotice = addressBoxArea.querySelector(".requiredValue_notice");
				    		let addressPostCode = addressBoxArea.querySelector("input[name='postCode']");
				    		
				    		if("" == addressPostCode.value){
				    			addressPostCode.focus();
					    		requiredNotice.innerText = "기본주소는 필수 입력입니다.";
		                        allCheck(".basic_information");
		                        forChk = false;
						       	chk = false;
						        isBindChk = true;
				    		}
				    	}else if("entryStatus" == eleName){
				    		let entryStatusArea = document.querySelector(".entry_status_area");
				    		let entryCheckBox = entryStatusArea.querySelectorAll("input[type='checkbox']");
				    		
				    		entryCheckBox.forEach(ele => {
				    		    let requiredNotice = entryStatusArea.querySelector(".requiredValueWrap > .requiredValue_notice");
				    		    let count = checkboxFlag(entryCheckBox).filter(element => false == element).length;
				    		    if(count == entryCheckBox.length) {
				    		    	allEntry.focus();
					    			removeNotice(ele, requiredNotice, "add");
					    			requiredNotice.innerText = "입점 현황 선택은 필수입니다.";
					    			
					    			forChk = false;
							       	chk = false;
							        isBindChk = true;
				    		    }
				    		    allCheck(".detail_information")
				    		});
				    	}else if("phoneNum" == eleName){
				    		let phoneArea = document.querySelector(".phone_area");
				    		let phoneBox = phoneArea.querySelector("#phoneBox");
				    		let frontPhoneNum = phoneArea.querySelector("select[name='frontPhoneNum']");
				    		let frontPhoneNumOpt = phoneArea.querySelector("select[name='frontPhoneNum'] > option:checked");
				    		let requiredNotice = phoneArea.querySelector(".requiredValue_notice");
				    		
                            if(frontPhoneNumOpt.value == "00"){
                            	frontPhoneNum.focus();
                                removeNotice(frontPhoneNum, requiredNotice, "add");
                                requiredNotice.innerText = "휴대폰 앞자리는 필수 입력입니다.";
                                forChk = false;
    					        isBindChk = true;
                            }else if(phoneBox.dataset.validation == "N"){
                            	phoneBox.focus();
                                removeNotice(phoneBox, requiredNotice, "add");
                                requiredNotice.innerText = "휴대전화는 필수 입력입니다.";
                                forChk = false;
    					        isBindChk = true;
                            }else{
                                removeNotice(ele, requiredNotice, "remove");
                            }
				    	}else if("mainProducts" == eleName){
				    		let mainProductsArea = document.querySelector(".main_products_area");
				    		let requiredNotice = mainProductsArea.querySelector(".requiredValue_notice");
				    		
				    		let mainProducts1 = mainProductsArea.querySelector("#mainProductsPrice1");
				    		let mainProducts2 = mainProductsArea.querySelector("#mainProductsPrice2");
				    		let mainProducts3 = mainProductsArea.querySelector("#mainProductsPrice3");
				    		
				    		let productsPrice1 = (mainProducts1.value).replace(/,/g,"");
				    		let productsPrice2 = (mainProducts2.value).replace(/,/g,"");
				    		let productsPrice3 = (mainProducts3.value).replace(/,/g,"");
				    		
	                        if( productsPrice1 != "" && Number(productsPrice1) <= 0){
	                        	mainProducts1.focus();
	                        	removeNotice(mainProducts1, requiredNotice, "add");
	                            requiredNotice.innerText = "가격은 최소 1원 이상 입력해주세요.";
	                            allCheck(".detail_information");
	                            forChk = false;
    					        isBindChk = true;
	                    	}else if( productsPrice2 != "" && Number(productsPrice2) <= 0){
	                    		mainProducts2.focus();
	                        	removeNotice(mainProducts2, requiredNotice, "add");
	                            requiredNotice.innerText = "가격은 최소 1원 이상 입력해주세요.";
	                            allCheck(".detail_information");
	                            forChk = false;
    					        isBindChk = true;
	                    	}else if( productsPrice3 != "" && Number(productsPrice3) <= 0){
	                    		productsPrice3.focus();
	                        	removeNotice(productsPrice3, requiredNotice, "add");
	                            requiredNotice.innerText = "가격은 최소 1원 이상 입력해주세요.";
	                            allCheck(".detail_information");
	                            forChk = false;
    					        isBindChk = true;
	                    	}else if(ele.dataset.validation == "N"){
                            	document.querySelector("#mainProducts1").focus();
                            }else{
                                removeNotice(ele, requiredNotice, "remove");
                            }
				    	}else if(ele.dataset.validation == 'N') {
							if("dep2ItemSelect" == ele.getAttribute("name")){
                                let selectItemCode = document.querySelector(".basic_information > .select_item_code");
                                let requiredNotice = selectItemCode.querySelector(".requiredValue_notice");
                                let itemEle = selectItemCode.querySelector("#dep2ItemSelect");
                                
                                if(itemEle.dataset.validation == 'N'){
                                    removeNotice(ele, requiredNotice, "add");
                                    requiredNotice.innerText = "업체 품목 선택은 필수입니다.";
                                    document.querySelector("#categoryItemSearch").focus();
                                }
							}else{
								ele.focus();
							}
				       	 	forChk = false;
					        isBindChk = true;
				        }
			    	}
			    });
		     
		     return forChk;
		}
		
		function optionInvalidCheck(){
			var forChk = true;
			let optionValidation = document.querySelectorAll(".optionDataChk");
			optionValidation.forEach(ele => {
				var eleName = ele.getAttribute("name");
				
			    if("telNum" == eleName){
		    		let telArea = document.querySelector(".tel_area");
		    		let telBox = telArea.querySelector("#telBox");
		    		let frontTel = telArea.querySelector("select[name='frontTel']");
		    		let frontTelOpt = telArea.querySelector("select[name='frontTel'] > option:checked");
		    		let requiredNotice = telArea.querySelector(".requiredValue_notice");
		    		
	                if(frontTelOpt.value == "00" && telBox.value != ""){
	                	frontTel.focus();
	                    removeNotice(frontTel, requiredNotice, "add");
	                    requiredNotice.innerText = "지역번호를 선택 해주세요.";
	                    forChk = false;
				        isBindChk = true;
	                }else if(frontTelOpt.value != "00" && telBox.value == ""){
	                	frontTel.focus();
	                    removeNotice(telBox, requiredNotice, "add");
	                    requiredNotice.innerText = "전화번호를 입력 해주세요.";
	                    forChk = false;
				        isBindChk = true;
	                }else if(telBox.dataset.validation == "N"){
	                	telBox.focus();
	                    removeNotice(ele, requiredNotice, "add");
	                    requiredNotice.innerText = "전화번호를 확인해주세요.";
	                    forChk = false;
				        isBindChk = true;
	                }else{
	                    removeNotice(ele, requiredNotice, "remove");
	                }
			    }else if("faxNum" == eleName){
		    		let faxArea = document.querySelector(".fax_area");
		    		let faxBox = faxArea.querySelector("#faxBox");
		    		let frontFax = faxArea.querySelector("select[name='frontFax']");
		    		let frontFaxOpt = faxArea.querySelector("select[name='frontFax'] > option:checked");
		    		let requiredNotice = faxArea.querySelector(".requiredValue_notice");
		    	  
	                if(frontFaxOpt.value == "00" && faxBox.value != ""){
	                	frontFax.focus();
	                    removeNotice(frontFax, requiredNotice, "add");
	                    requiredNotice.innerText = "지역번호를 선택 해주세요.";
	                    forChk = false;
				        isBindChk = true;
	                }else if(frontFaxOpt.value != "00" && faxBox.value == ""){
	                	frontFax.focus();
	                    removeNotice(faxBox, requiredNotice, "add");
	                    requiredNotice.innerText = "팩스번호를 입력 해주세요.";
	                    forChk = false;
				        isBindChk = true;
	                }else if(faxBox.dataset.validation == "N"){
	                	faxBox.focus();
	                    removeNotice(faxBox, requiredNotice, "add");
	                    requiredNotice.innerText = "팩스번호를 확인해주세요.";
	                    forChk = false;
				        isBindChk = true;
	                }else{
	                    removeNotice(ele, requiredNotice, "remove");
	                }
			    }else if(ele.dataset.validation == 'N') {
	     			ele.focus();
	     			forChk = false;
			        isBindChk = true;
	     		}
	     		
	     	});
			
			return forChk;
		}
		
		$(window).bind("beforeunload", function(){
		
			if(isBindChk){
			      switch(document.readyState){
			    	 case "loading":
			    		 return "다른 페이지 이탈 시 작성한 내용은 저장되지 않습니다.\n페이지를 이탈하시겠습니까?";
			    		 break;
			    	 case "complete":
			    		 return "사이트를 새로고침하시겠습니까?\n변경사항이 저장되지 않을 수 있습니다.";
			    		 break;
				 }
			}
		 });

         
    </script>
   
            <!-- container -->
            <div class="container" id="contents">
	            <c:set var="location" value="3" />
				<%@include file="InfoLocation.jsp"%>
                <!--content-->
                
                <div class="content launch">
                    <div class="launch_title">
                        <h1>입점 신청 하기</h1>
                        <div class="sub_text">
                            <p>입점 심사까지 통상 1~2주 정도 소요됩니다.</p>
                            <p>승인/반려 결과는 입점 신청 시 작성한 신청담당자의 이메일과 전화번호로 안내됩니다. (카카오알림톡 및 SMS 발송)</p>
                        </div>
                    </div>
                    <form id="frmWrite" name="frmWrite" method="post" enctype="multipart/form-data">
                    	<input type="hidden" name="competitor" id="competitor">
                    	<input type="hidden" name="partner_ship_yn" id="partner_ship_yn">
                    	<input type="hidden" name="item_code" id="item_code">
                    	<input type="hidden" name="vendorEmail" id="vendorEmail">
                    	<input type="hidden" name="bizNo" id="bizNo">
                    	<input type="hidden" name="privercyAggreYn" id="privercyAggreYn" value="N">
                    	
                        <div class="partner_form">
                            <div class="form_wrap business_license_number">
                                <div class="title_area">
                                    <h3>사업자번호 인증</h3>
                                    <div class="validConfirm">사업자번호 등록 후&nbsp;<span class="c_pink"> 사업자 확인</span> 으로 인증해주세요.</div>
                                    <strong class="required_input"><span class="c_pink">*</span> 필수 입력 항목</strong>
                                </div>
                                <div class="content_area">
                                    <div class="content_title">사업자등록번호 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap requireDataChk" name="businessLicenseNumber">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="text" data-validation="N" autocomplete="off" class="requiredValue belowMin requireDataChk" id="businessNum1" name="businessNum1" title="사업자등록번호 앞 3자리 입력" placeholder="3자리" maxlength="3" minlength="3" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                                                <span class="dash"></span>
                                                <input type="text" data-validation="N" autocomplete="off" class="requiredValue belowMin requireDataChk" id="businessNum2" name="businessNum2" title="사업자등록번호 중간 2자리 입력" placeholder="2자리" maxlength="2" minlength="2" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                                                <span class="dash"></span>
                                                <input type="text" data-validation="N" autocomplete="off" class="requiredValue belowMin requireDataChk" id="businessNum3" name="businessNum3" title="사업자등록번호 끝 5자리 입력" placeholder="5자리" maxlength="5" minlength="5" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                                            </div>
                                            <div class="partners_btn">
                                                <input type="hidden" id="flagBizNo" name="flagBizNo" value="N" />
                                                <button type="button" id="btnBizNo" class="btn_darkgray" onclick="checkBizNo();" disabled>사업자 확인</button>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="form_wrap basic_information">
                                <div class="title_area">
                                    <h3>기본 정보</h3>
                                    <div class="validConfirm">회사 기본 정보를 입력해주세요.</div>
                                    <strong class="required_input"><span class="c_pink">*</span> 필수 입력 항목</strong>
                                </div>
                                <div class="content_area select_item_code">
                                    <div class="content_title">대표 품목 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap" name="selectItemCode">
                                        <div class="input_wrap flex_direction_column">
                                            <input type="hidden" id="dep1ItemSelect" name="dep1ItemSelect" data-validation="N" value="">
                                            <input type="hidden" id="dep2ItemSelect" name="dep2ItemSelect" data-validation="N" class="requiredValue validationInputChk requireDataChk" value="">
                                            <div class="input_box item_search_box">
                                                <i class="ico_search"></i>
                                                <input type="text" autocomplete="off" id="categoryItemSearch" title="업체 품목 키워드" placeholder="품목 키워드를 입력해주세요." disabled/>
                                                <div class="search_list" style="display:none;">
                                                    <ul>
                                                    </ul>
                                                    <div class="search_box_close">
                                                        <div class="remove_btn">닫기<i class="remove_btn_icon"></i></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="select_item_list">
                                                <div class="dep1">
                                                    <fieldset name="main_cate" disabled>
                                                        <legend>대분류 선택</legend>
                                                        <!-- input name 변경 가능 -->
                                                        
                                                        <c:forEach items="${itemList}" var="itemList" varStatus="vs">
															<label>
	                                                            <input type="radio" class="blind" name="dep1_select">
	                                                            <span>${itemList.dep_1}</span>
	                                                        </label>
														</c:forEach>
                                                    </fieldset>
                                                </div>
                                                <div class="dep2">
                                                    <!-- 대분류 선택 시 중분류 생성 -->
                                                </div>
                                            </div>
                                            <div class="search_result" style="display:none;">
                                                <span></span>
                                                <span></span>
                                                <i class="remove_btn" style="display:none;"></i>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area company_name_area">
                                    <div class="content_title">회사명 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap" name="companyName">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="text" data-validation="N" autocomplete="off" class="text_count_check requiredValue validationInputChk requireDataChk" id="companyName" name="companyName" title="회사명" placeholder="회사명을 입력해주세요" maxlength="50" minlength="1" disabled/>
                                                <div class="text_count"><span class="byte">0</span>/50</div>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>
                                </div>
                                <div class="content_area owner_name_area">
                                    <div class="content_title">대표자명 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap" name="ownerName">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="text" data-validation="N" autocomplete="off" class="text_count_check requiredValue validationInputChk requireDataChk" id="ownerName" name="ownerName" title="대표자명" placeholder="대표자명을 입력해주세요" maxlength="50" minlength="1" oninput="this.value = this.value.replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g, '');" disabled/>
                                                <div class="text_count"><span class="byte">0</span>/50</div>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area address_box_area">
                                    <div class="content_title">주소 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap requireDataChk" name="compayAddress" >
                                        <div class="input_wrap flex_direction_column">
                                            <div class="input_box">
                                                <div class="post_code_box">
                                                    <input type="text" data-validation="Y" id="postCode" name="postCode" class="requiredValue validationInputChk requireDataChk" title="우편번호" placeholder="우편번호" readonly/>
                                                    <button type="button" class="find_address_btn btn_darkgray" onclick="openPopAddrFind('postCode', 'roadAddrZipcode', 'baseAddress', 'detailAddress', 'new_addr_txt1', 'roadAddrZipcode', 'roadBaseAddr', 'roadDtlAddr', 'roadAddrYn');" disabled>주소 찾기</button>
                                                </div>
                                                <div class="address_box">
                                                    <input type="text" data-validation="Y" id="baseAddress" name="baseAddress" class="requiredValue validationInputChk requireDataChk" title="기본주소" placeholder="기본주소" readonly/>
                                                </div>
                                                <div class="detail_address_box">
                                                    <input type="text" data-validation="N" id="detailAddress" name="detailAddress" autocomplete="off" class="text_count_check requiredValue validationInputChk requireDataChk" title="상세주소" placeholder="상세주소를 입력해주세요" maxlength="150"/>
                                                    <div class="text_count"><span class="byte">0</span>/150</div>
                                                </div>
                                                <input type="hidden" id="roadAddrZipcode" name="roadAddrZipcode" />
                                                <input type="hidden" id="roadBaseAddr" name="roadBaseAddr" />
                                                <input type="hidden" id="roadDtlAddr" name="roadDtlAddr" />
                                                <input type="hidden" id="roadAddrYn" name="roadAddrYn" />
                                                <!-- ★ -->
                                            </div>
                                            <div class="requiredValue_notice"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="content_area corporate_name_area">
                                    <div class="content_title">법인번호 <span class="ptxt02">(선택)</span></div>
                                    <div class="content_box optionalValue" name="corporateName">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="text" data-validation="Y" autocomplete="off" class="belowMin validInutBelow optionDataChk" id="corporateName" name="corporateName" title="법인번호" placeholder="법인번호를 입력해주세요" maxlength="13" minlength="13" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  disabled/>
                                                <div class="notice">개인사업자 경우 생략 가능</div>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                            </div>
                            <div class="form_wrap offerer_information">
                                <div class="title_area">
                                    <h3>신청자 정보</h3>
                                    <div class="validConfirm">신청자 정보로 입점 결과를 안내 드립니다.</div>
                                    <strong class="required_input"><span class="c_pink">*</span> 필수 입력 항목</strong>
                                </div>
                                <div class="content_area offerer_name_area">
                                    <div class="content_title">성명 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap" name="offererName">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="text" data-validation="N" autocomplete="off" class="text_count_check requiredValue validationInputChk requireDataChk" id="offererName" name="offererName" title="성명" placeholder="입점 신청자 성함을 입력해주세요" maxlength="25" oninput="this.value = this.value.replace(/[^a-z|A-Z|ㄱ-ㅎ|가-힣]/g, '');" disabled/>
                                                <div class="text_count"><span class="byte">0</span>/25</div>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area offerer_position_area">
                                    <div class="content_title">직책 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap" name="offererPosition">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="text" data-validation="N" autocomplete="off" class="text_count_check requiredValue validationInputChk requireDataChk" id="offererPosition" name="offererPosition" title="직책" placeholder="입점 신청자 직책을 입력해주세요" maxlength="25" oninput="this.value = this.value.replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g, '');" disabled/>
                                                <div class="text_count"><span class="byte">0</span>/25</div>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area tel_area">
                                    <div class="content_title">전화번호 <span class="ptxt02">(선택)</span></div>
                                    <div class="content_box optionalValue optionDataChk" name="telNum">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <select id="frontTel" name="frontTel" title="지역번호 선택" class="numSelect" disabled>
                                                    <option value="00" selected="selected">선택</option>
                                                    <option value="02">02</option>
                                                    <option value="031">031</option>
                                                    <option value="032">032</option>
                                                    <option value="033">033</option>
                                                    <option value="041">041</option>
                                                    <option value="042">042</option>
                                                    <option value="043">043</option>
                                                    <option value="044">044</option>
                                                    <option value="051">051</option>
                                                    <option value="052">052</option>
                                                    <option value="053">053</option>
                                                    <option value="054">054</option>
                                                    <option value="055">055</option>
                                                    <option value="061">061</option>
                                                    <option value="062">062</option>
                                                    <option value="063">063</option>
                                                    <option value="064">064</option>
                                                    <option value="070">070</option>
                                                    <option value="0504">0504</option>
                                                    <option value="0505">0505</option>
                                                    <option value="0507">0507</option>
                                                </select>
                                                <input type="text" data-validation="Y" autocomplete="off" class="belowMin validInutBelow optionDataChk" id="telBox" name="telBox" title="전화번호" placeholder="- 제외한 번호를 입력해주세요." maxlength="8" minlength="4" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" disabled/>
                                            	<input type="hidden" name="telNumber" id="telNumber">
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area phone_area">
                                    <div class="content_title">휴대전화 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap requireDataChk" name="phoneNum">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <select id="frontPhoneNum" name="frontPhoneNum" title="휴대전화 선택" class="numSelect" disabled>
                                                    <option value="00" selected="selected">선택</option>
                                                    <option value="010">010</option>
                                                    <option value="011">011</option>
                                                    <option value="016">016</option>
                                                    <option value="017">017</option>
                                                    <option value="018">018</option>
                                                    <option value="019">019</option>
                                                </select>
                                                <input type="text" data-validation="N" autocomplete="off" class="requiredValue belowMin validationInputChk requireDataChk" id="phoneBox" name="phoneBox" title="휴대전화번호" placeholder="- 제외한 번호를 입력해주세요." maxlength="8" minlength="7" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" disabled/>
                                                <input type="hidden" name="phoneNumber" id="phoneNumber">
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area fax_area">
                                    <div class="content_title">팩스 <span class="ptxt02">(선택)</span></div>
                                    <div class="content_box optionalValue optionDataChk" name="faxNum">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <select id="frontFax" name="frontFax" title="팩스 지역번호 선택" class="numSelect" disabled>
                                                    <option value="00" selected="selected">선택</option>
                                                    <option value="02">02</option>
                                                    <option value="031">031</option>
                                                    <option value="032">032</option>
                                                    <option value="033">033</option>
                                                    <option value="041">041</option>
                                                    <option value="042">042</option>
                                                    <option value="043">043</option>
                                                    <option value="044">044</option>
                                                    <option value="051">051</option>
                                                    <option value="052">052</option>
                                                    <option value="053">053</option>
                                                    <option value="054">054</option>
                                                    <option value="055">055</option>
                                                    <option value="061">061</option>
                                                    <option value="062">062</option>
                                                    <option value="063">063</option>
                                                    <option value="064">064</option>
                                                    <option value="070">070</option>
                                                    <option value="0504">0504</option>
                                                    <option value="0505">0505</option>
                                                    <option value="0507">0507</option>
                                                </select>
                                                <input type="text" data-validation="Y" autocomplete="off" class="belowMin validInutBelow optionDataChk" id="faxBox" title="팩스번호" placeholder="- 제외한 번호를 입력해주세요." maxlength="15" minlength="4" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" disabled/>
                                                <input type="hidden" name="faxNumber" />
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area email_area">
                                    <div class="content_title">이메일 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap" name="emailAddress">
                                        <div class="input_wrap flex_direction_column">
                                            <div class="input_box">
                                                <input type="text" data-validation="N" autocomplete="off" class="email_box requiredValue validationInputChk requireDataChk" id="emailID" name="emailID" title="이메일 아이디" placeholder="이메일 아이디" disabled/>
                                                <span class="atSign">@</span>
                                                <input type="text" data-validation="N" autocomplete="off" class="email_box requiredValue validationInputChk requireDataChk" id="emailDomainAdd" name="emailDomainAdd" title="이메일 도메인" placeholder="이메일 도메인" disabled/>
                                                <select id="emailDomainAddSelect" name="emailDomainAddSelect" title="이메일 도메인 선택" class="emailSelect" onchange="emailDomainSelect(this.value); return false;" disabled>
                                                    <option value="" class="directInput">직접입력</option>
                                                    <option value="naver.com">naver.com</option>
                                                    <option value="gmail.com">gmail.com</option>
                                                    <option value="kakao.com">kakao.com</option>
                                                    <option value="daum.net">daum.net</option>
                                                    <option value="nate.com">nate.com</option>
                                                </select>
                                            </div>
                                            <div class="requiredValue_notice"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form_wrap detail_information">
                                <div class="title_area">
                                    <h3>상세 정보</h3>
                                    <div class="validConfirm">입점 정보에 대해 상세히 소개해주세요.</div>
                                    <strong class="required_input"><span class="c_pink">*</span> 필수 입력 항목</strong>
                                </div>
                                <div class="content_area representative_brand_area">
                                    <div class="content_title">대표브랜드 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap" name="representativeBrand">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="text" data-validation="N" autocomplete="off" class="text_count_check requiredValue validationInputChk requireDataChk" id="representativeBrand" name="representativeBrand" title="대표브랜드" placeholder="대표 브랜드를 입력해주세요." maxlength="50" disabled/>
                                                <div class="text_count"><span class="byte">0</span>/50</div>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area main_products_area">
                                    <div class="content_title">주요상품 및<br>가격대 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap validationInputChk requireDataChk" name="mainProducts" id="mainProducts" data-validation = 'N'>
                                        <div class="input_wrap flex_direction_column">
                                            <div class="input_box belowMinWrap">
                                                <input type="text" class="requiredValue belowMin" autocomplete="off" id="mainProducts1" name="mainProducts1" title="상품명" placeholder="상품명" disabled/>
                                                <div class="sub_text">/</div>
                                                <input type="text" class="requiredValue belowMin minPriceChk" autocomplete="off" id="mainProductsPrice1" name="mainProductsPrice1" title="가격대" placeholder="가격대" maxlength="10" oninput="this.value = this.value.replace(/^[0]/g,'').replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',')" disabled/>
                                                <div class="sub_text">원</div>
                                                <span class="ptxt02">최소 1개 이상 작성해주세요.</span>
                                            </div>
                                            <div class="input_box belowMinWrap">
                                                <input type="text"  class="belowMin" autocomplete="off" id="mainProducts2" name="mainProducts2" title="상품명" placeholder="상품명" disabled/>
                                                <div class="sub_text">/</div>
                                                <input type="text" class="belowMin minPriceChk" autocomplete="off" id="mainProductsPrice2" name="mainProductsPrice2" title="가격대" placeholder="가격대" maxlength="10" oninput="this.value = this.value.replace(/^[0]/g,'').replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',')" disabled/>
                                                <div class="sub_text">원</div>
                                            </div>
                                            <div class="input_box belowMinWrap">
                                                <input type="text" class="belowMin" autocomplete="off" id="mainProducts3" name="mainProducts3" title="상품명" placeholder="상품명" disabled/>
                                                <div class="sub_text">/</div>
                                                <input type="text" class="belowMin minPriceChk" autocomplete="off" id="mainProductsPrice3" name="mainProductsPrice3" title="가격대" placeholder="가격대" maxlength="10" oninput="this.value = this.value.replace(/^[0]/g,'').replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',')" disabled/>
                                                <div class="sub_text">원</div>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area company_site_url_area">
                                    <div class="content_title">자사 홈페이지<span class="ptxt02">(선택)</span></div>
                                    <div class="content_box optionalValue" name="homepageUrl">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="text" data-validation="Y" autocomplete="off" class="text_count_check validInutBelow optionDataChk" id="homepageAddress" name="homepageAddress" title="자사 홈페이지 주소" placeholder="자사 홈페이지가 있다면 입력해주세요." maxlength="150" onchange="urlCheck(this);" disabled/>
                                                <div class="text_count"><span class="byte">0</span>/150</div>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area entry_status_area">
                                    <div class="content_title">타 업체<br>입점 현황 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap requireDataChk" name="entryStatus">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="hidden" id="checkboxSelectArr" class="validationInputChk requireDataChk" name="checkboxSelectArr" data-validation="N" value="">
                                                <div class="checkbox_area entryStatus">
                                                    <label class="checkbox"><input type="checkbox" id="noneEntry" class="requiredValue" name="noneEntry" disabled/><span class="checkbox_icon"></span>없음</label>
                                                    <label class="checkbox"><input type="checkbox" id="allEntry" class="requiredValue" name="allEntry" disabled/><span class="checkbox_icon"></span>전체</label>
                                                </div>
                                                <div class="checkbox_area entryStatus">
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="SSG" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>SSG</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="롯데온" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>롯데온</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="GSSHOP" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>GSSHOP</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="CJ몰" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>CJ몰</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="현대몰" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>현대몰</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="이베이" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>이베이</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="지마켓" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>지마켓</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="11번가" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>11번가</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="쿠팡" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>쿠팡</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="티몬" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>티몬</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="위메프" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>위메프</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="네이버" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>네이버</label>
                                                    <label class="checkbox"><input type="checkbox" id="" name="chk_competitor" value="지그재그" class="brand_store requiredValue" disabled/><span class="checkbox_icon"></span>지그재그</label>
                                                    <label class="checkbox"><input type="checkbox" id="otherEntryCheckbox" class="requiredValue" name="otherEntryCheckbox" disabled/><span class="checkbox_icon"></span>그 외 기타</label>
                                                </div>
                                                <div class="other_input" style="display:none">
                                                    <div class="ptxt02">선택지에 없는 입점 업체를 입력해주세요. (복수 입력 가능)</div>
                                                    <div class="input_box" style="flex-direction: row;align-items: center;">
                                                        <input type="text" data-validation="Y" autocomplete="off" class="text_count_check" name="otherEntryInput" id="otherEntryInput" title="그 외 입점업체" placeholder="입력 예 : A업체, B업체, C업체" maxlength="50" disabled/>
                                                        <div class="text_count"><span class="byte">0</span>/50</div>
                                                    </div>
                                                    <div class="requiredValue_notice"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>
                                </div>
                                <div class="content_area partnership_linkage_area">
                                    <div class="content_title">상품 제휴<br>연동 동의 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap" name="partnershipLinkage">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <div class="radio_area">
                                                    <label class="radiobox"><input type="radio" id="linkageAgree" class="requiredValue" name="agreeRadio" value="Y" checked disabled/><span class="radiobtn_icon"></span>동의</label>
                                                    <label class="radiobox"><input type="radio" id="linkageDisagree" class="requiredValue" name="agreeRadio" value="N" disabled/><span class="radiobtn_icon"></span>미동의</label>
                                                </div>
                                                
                                                <div class="notice">
                                                    <div class="ptxt02">
                                                        동의 시, AK몰 제휴사에 상품이 연동 노출되어 다양한 채널에서 상품을 홍보할 수 있습니다.<br>
                                                        (연동 수수료 무료. 동의 이후 철회 가능)
                                                    </div>
                                                    <button type="button" class="detaile_notice_icon" onclick="noticePopView('show'); return false;"></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="notice_layer_pop" style="display: none;">
                                        <div class="popWindow">
                                            <div class="popHeader">
                                                <h1>AK MALL 상품 제휴 동의 안내</h1>
                                                <a href="#" class="btn_close" title="새창닫기" onclick="noticePopView('hide'); return false;">닫기</a>
                                            </div>
                                            <div class="popBody pSaveService">
                                                <dl>
                                                    <dt>1.제휴사 :</dt>
                                                    <dd class="ptxt01">- 국내 : 11번가, Ebay, 네이버, YIC, 위메프, 티몬, 쿠팡, GS, SSG, POSTY (10곳)</dd>
                                                    <dd class="ptxt01">- 글로벌 : G마켓글로벌, KAISUN, YIC글로벌 (3곳)</dd>
                                                </dl>
                                                <dl style="margin-top:20px">
                                                    <dt>2. 제휴내용 :</dt>
                                                    <dd class="ptxt01">AK MALL 입점 업체 (협력사) 가 등록한 상품의 상호 발전 목적과 원활한 거래를 도모하기 위해 제휴사에 상품을 노출하여 판매 촉진 및 프로모션을 운영함</dd>
                                                </dl>
                                                <dl style="margin-top:20px">
                                                    <dt>3. 제휴기간 :</dt>
                                                    <dd class="ptxt01">채널별 1년 단위이며, 퇴점 전까지 자동 갱신 (동의 후 연동 철회 가능)</dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="content_area business_license_paper_area">
                                    <div class="content_title">사업자등록증 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap requireDataChk" name="businessLicensePaper">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="file" data-validation="N" name="file1" id="licensePaperUploadBtn" class="uploadBtn file_hidden requiredValue validationInputChk requireDataChk" title="파일찾기" accept=".jpeg, .jpg, .png, .pdf, .zip" data-filesize="5" onchange="changeFile(this); return false;" disabled>
                                                <label for="licensePaperUploadBtn" class="btn_file btn_darkgray" >파일 등록</label>
                                                <span class="ptxt02">jpg, png, pdf, zip 형식 파일 가능 (용량 5MB 이하) </span>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>                
                                </div>
                                <div class="content_area company_introduce_paper_area">
                                    <div class="content_title">회사소개서 <span class="ptxt02">(선택)</span></div>
                                    <div class="content_box">
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <input type="file" id="introduceUploadBtn" name="file2" class="uploadBtn file_hidden" title="파일찾기" accept=".jpeg, .jpg, .png, .hwp, .word, .pdf, .xlsx, .zip, .docx" data-filesize="10" onchange="changeFile(this);  return false;" disabled>
                                                <label for="introduceUploadBtn" class="btn_file btn_darkgray">파일 등록</label>
                                                <span class="ptxt02">jpg, png, hwp, word, pdf, xlsx, zip 형식 파일 가능 (용량 10MB 이하)</span>
                                            </div>
                                        </div>
                                    </div>                
                                </div>
                                <div class="content_area company_introduce_area textbox_area">
                                    <div class="content_title">회사 소개 및<br>운영 특장점 <strong class="c_pink">*</strong></div>
                                    <div class="content_box requiredValueWrap" name="companyIntroduceTextbox">
                                        <div class="input_wrap flex_direction_column">
                                            <div class="input_box">
                                                <textarea name="companyIntroduce" data-validation="N" autocomplete="off" class="text_count_check belowMin requiredValue validationInputChk requireDataChk" maxlength="3000" minlength="80" disabled>1. 업체 컨셉 및 소개 :&#13;&#10;2. 주 타겟 연령층 :&#13;&#10;3. 운영 상품수 : &#13;&#10;4. 월 평균 매출 : &#13;&#10;5. 업체 운영 특장점 : </textarea>
                                                <div class="text_count"><span class="byte">0</span>/3,000</div>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>
                                </div>
                                <div class="content_area addition_area textbox_area">
                                    <div class="content_title">상담 내용 및<br>향후 운영 계획 <span class="ptxt02">(선택)</span></div>
                                    <div class="content_box optionalValue" name="additionTextbox">
                                        <div class="input_wrap flex_direction_column">
                                            <div class="input_box">
                                                <textarea name="addition" data-validation="Y" class="text_count_check validInutBelow belowMin optionDataChk" autocomplete="off" maxlength="3000" minlength="10" disabled></textarea>
                                                <div class="text_count"><span class="byte">0</span>/3,000</div>
                                            </div>
                                            <div class="notice">
                                                <ul class="ptxt02">
                                                    <li>입점 시 문의사항이나 향후 운영 계획에 대해 말씀해주세요.</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="form_wrap agreement_area">
                                <div class="title_area">
                                    <h3>개인정보 수집 이용 동의</h3>
                                    <strong class="required_input"><span class="c_pink">*</span> 필수 입력 항목</strong>
                                </div>
                                <div class="content_area">
                                    <div class="content_box requiredValueWrap requireDataChk" name="agreementBox">
                                        <div class="terms_box">
                                            <div class="content_title">사업자정보제공 안내</div>
                                            <ul>
                                                <li class="title">1. 개인정보의 수집 및 이용 목적</li>
                                                <li class="text">사업자 신용 정보 조회 및 입점 상담신청과 관련한 담당자 연락처 정보 확보</li>
                                            </ul>
                                            <ul>
                                                <li class="title">2. 수집하는 개인정보의 항목</li>
                                                <li class="text">회사명, 직책, 성명, 전화번호, 휴대폰번호, 팩스번호, 이메일</li>
                                            </ul>
                                            <ul>
                                                <li class="title">3. 개인정보의 보유 및 이용기간</li>
                                                <li class="text">원칙적으로 개인정보의 수집목적 또는 제공받은 목적이 달성되면 지체없이 파기합니다. 다만, 관계법률에 의해 보존할 필요가 있는 경우에는 일정기간 보존합니다. 이 경우, 당사는 보관하는 정보를 그 보관 목적으로만 이용합니다.</li>
                                            </ul>
                                        </div>
                                        <div class="input_wrap">
                                            <div class="input_box">
                                                <label class="checkbox">
                                                    <input type="checkbox" data-validation="N" id="noneEntry" name="noneEntry" class="requiredValue validationInputChk requireDataChk" disabled>
                                                    <span class="checkbox_icon" disabled></span>개인정보 수집 이용에 동의합니다.
                                                </label>
                                            </div>
                                        </div>
                                        <div class="requiredValue_notice"></div>
                                    </div>           
                                </div>
                            </div>
                        </div>
                        <div id="buttonArea">
                            <button type="button" class="btn_white_pinkline actionBtn" onclick="popupLaunchCompFormPreview(); return false;"><span>신청 내용 미리보기</span></button>
                            <button type="button" class="btn_pink actionBtn" onclick="launchCompSubmit(); return false;">신청 완료</button>
                        </div>
                    </form>
                    
            <script type="text/javascript">
                let form = document.querySelector("#frmWrite");
                
                
                //임시 확인용
                form.querySelectorAll("input").forEach(ele => ele.disabled = true);
                form.querySelectorAll("textarea").forEach(ele => ele.disabled = true);
                form.querySelectorAll(".find_address_btn").forEach(ele => ele.disabled = true);
                form.querySelectorAll("select").forEach(ele => ele.disabled = true);
                form.querySelectorAll("button").forEach(ele => ele.disabled = true);
                document.querySelector(".select_item_code .select_item_list > .dep1 fieldset").disabled = true;
                //
				form.querySelectorAll(".business_license_number input").forEach(ele => ele.disabled = false);
				form.querySelectorAll(".business_license_number button").forEach(ele => ele.disabled = false);
				form.querySelectorAll(".actionBtn").forEach(ele => ele.disabled = false);
				

                // 영역 타이틀 마다 작성완료 체크
                function allCheck(element){
                    let ele = document.querySelector(element);
                    let eleValidConfirm =  ele.querySelector(".validConfirm");
                    let requiredValidation = ele.querySelectorAll(".validationInputChk");
                    let belowValidation = ele.querySelectorAll(".validInutBelow");
                    let flagArr = [];
                    requiredValidation.forEach(el => {
                        if(el.dataset.validation == 'Y')      flagArr.push(true)
                        else if(el.dataset.validation == 'N') flagArr.push(false)
                        //console.log(el)
                    })
                    belowValidation.forEach(el => {
                        if(el.dataset.validation == 'Y')      flagArr.push(true)
                        else if(el.dataset.validation == 'N') flagArr.push(false)
                        //console.log(el)
                    })
                    if(flagArr.indexOf(false) == -1) eleValidConfirm.classList.add("on");
                    else                             eleValidConfirm.classList.remove("on");
                    //console.log(flagArr)
                }
                
                /***************************
                 *     유효성 체크 관련     *
                 ***************************/
                let requiredValueWrap = document.querySelectorAll(".requiredValueWrap");
                let belowMinInput = document.querySelectorAll(".optionalValue"); //필수 입력은 아니지만 유효성 검사 필요한 ele
                //let numSelect = document.querySelectorAll(".numSelect"); //번호 입력 검증
                requiredValueWrap.forEach(wrapEle => {
                    let wrapName = wrapEle.getAttribute("name");
                    if(wrapName == "agreementBox"){
                        wrapEle.querySelector("#noneEntry").addEventListener("change", (function () {requiredInputKeyEvt(this, wrapEle, wrapName)}));
                    }else{
                    	if(wrapName == "phoneNum"){
                        	wrapEle.querySelector("#frontPhoneNum").addEventListener("change", (function () {requiredInputKeyEvt(this, wrapEle, wrapName)}));
                        }
                        wrapEle.querySelectorAll(".requiredValue").forEach(inputEle => {
                            inputEle.addEventListener("focusout", (function () {requiredInputKeyEvt(this, wrapEle, wrapName)}));
                            inputEle.addEventListener("focusin", (function () {requiredInputKeyEvt(this, wrapEle, wrapName)}));
                            inputEle.addEventListener("keyup", (function () {requiredInputKeyEvt(this, wrapEle, wrapName)}));
                        })
                        wrapEle.querySelectorAll(".belowMin").forEach(inputEle => {
                            inputEle.addEventListener("focusout", (function () {belowMinCheck(this, wrapEle, wrapName)}));
                            inputEle.addEventListener("focusin", (function () {belowMinCheck(this, wrapEle, wrapName)}));
                            inputEle.addEventListener("keyup", (function () {belowMinCheck(this, wrapEle, wrapName)}));
                        })
                    }
                });
                
                belowMinInput.forEach(wrapEle => {
                    let wrapName = wrapEle.getAttribute("name");
                    
                    if(wrapName =="telNum"){
                    	wrapEle.querySelector("#frontTel").addEventListener("change", (function () {belowMinCheck(this, wrapEle, wrapName)}));
                    }else if(wrapName =="faxNum"){
                    	wrapEle.querySelector("#frontFax").addEventListener("change", (function () {belowMinCheck(this, wrapEle, wrapName)}));
                    }
                    
                    wrapEle.querySelectorAll(".belowMin").forEach(inputEle => {
                        inputEle.addEventListener("focusout", (function () {belowMinCheck(this, wrapEle, wrapName)}))
                        inputEle.addEventListener("keyup", (function () {belowMinCheck(this, wrapEle, wrapName)}))
                    });
                    
                    
                })
                function requiredInputKeyEvt(ele, parent, parentName){
                    let requiredNotice = parent.querySelector(".requiredValue_notice");
                    if(ele.value == "" && 
                    		ele.id !== "emailDomainAdd" && 
                    		ele.id !== "otherEntryInput" && 
                    		parentName !== "businessLicensePaper" && 
                    		parentName !== "mainProducts" && 
                    		parentName !== "agreementBox"){
                    	
                        if(ele.id == "emailDomainAdd") emailCheck(ele);
                        else removeNotice(ele, requiredNotice, "add");
                        switch (parentName){
                            case "businessLicenseNumber" :
                                requiredNotice.innerText = "사업자등록번호는 필수 입력입니다.";
                                // ele.focus();
                                break;
                            case "companyName" :
                                requiredNotice.innerText = "회사명은 필수 입력입니다.";
                                allCheck(".basic_information");
                                break;
                            case "ownerName" :
                                requiredNotice.innerText = "대표자명은 필수 입력입니다.";
                                allCheck(".basic_information");
                                break;
                            case "compayAddress" :
                                requiredNotice.innerText = "상세주소는 필수 입력입니다.";
                                allCheck(".basic_information");
                                break;
                            case "representativeBrand" :
                                requiredNotice.innerText = "브랜드는 필수 입력입니다.";
                                allCheck(".detail_information")
                                break;
                            case "offererName" :
                                requiredNotice.innerText = "성명은 필수 입력입니다.";
                                allCheck(".offerer_information")
                                break;
                            case "offererPosition" :
                                requiredNotice.innerText = "직책은 필수 입력입니다.";
                                allCheck(".offerer_information")
                                break;
                            case "phoneNum" :
                                requiredNotice.innerText = "휴대전화는 필수 입력입니다.";
                                allCheck(".offerer_information")
                                break;
                            case "emailAddress" :
                                requiredNotice.innerText = "이메일은 필수 입력입니다.";
                                allCheck(".offerer_information")
                                break;
                            case "companyIntroduceTextbox" :
                                requiredNotice.innerText = "회사 소개 및 운영 특장점은 필수 입력입니다."
                                allCheck(".detail_information")
                                break;
                            default :
                                requiredNotice.innerText = "필수 입력 항목입니다.";
                                break;
                        }
                    }else if(parentName == "phoneNum"){
                        let frontPhoneNum = ele.parentElement.querySelector("select[name='frontPhoneNum'] > option:checked");
                        if(frontPhoneNum.value == "00"){
                            removeNotice(ele, requiredNotice, "add");
                            requiredNotice.innerText = "휴대폰 앞자리는 필수 입력입니다.";
                        }else{
                            removeNotice(ele, requiredNotice, "remove");
                        }
                    }else if(parentName == "agreementBox"){
                        if(ele.checked == false) {
                        	$("#privercyAggreYn").val("N");
                            removeNotice(ele, requiredNotice, "add");
                            requiredNotice.innerText = "개인정보 수집 이용에 동의해주세요.";
                        }else{
                        	$("#privercyAggreYn").val("Y");
                        	removeNotice(ele, requiredNotice, "remove");
                            ele.dataset.validation = 'Y'
                        }
                    }else {
                        let requiredInput = parent.querySelectorAll(".requiredValue");
                        if(ele.id !== "emailDomainAdd" && requiredInput.length > 1 && parentName !== "compayAddress"){
                            switch (parentName){
                                case "emailAddress" : 
                                    emailCheck(ele);
                                    break;
                            }
                        }else if(ele.id == "emailDomainAdd" || ele.id == "emailID"){
                            emailCheck(ele);
                        }else if(ele.value !== '' && parentName !== "businessLicensePaper") {
                            removeNotice(ele, requiredNotice, "remove");
                            let parentWrap = parent.parentElement.parentElement;
                            if(parentWrap.classList.contains("basic_information")) allCheck(".basic_information");
                            else if(parentWrap.classList.contains("offerer_information")) allCheck(".offerer_information");
                            else if(parentName !== "businessLicensePaper" && parentWrap.classList.contains("detail_information")) allCheck(".detail_information");
                        }
                    }
                }
                function belowMinCheck(ele, parent, parentName){
                	let eleName = ele.getAttribute("name");
                    let requiredNotice = parent.querySelector(".requiredValue_notice");
                    if(ele.minLength !== -1 && 
                    	parentName !== "mainProducts" && 
                    	parentName !== "businessLicenseNumber" && 
                    	parentName !== "telNum" && 
                    	parentName !== "faxNum" ){
                    	
                        if(ele.value.length < ele.minLength){
                            if(ele.value !== ""){
                                removeNotice(ele, requiredNotice, "add");
                                switch (parentName){
                                    case "corporateName" :
                                        requiredNotice.innerText = "유효한 법인번호를 입력해주세요.";
                                        allCheck(".basic_information");
                                        break;
                                    case "telNum" :
                                        requiredNotice.innerText = "전화번호를 확인해주세요";
                                        allCheck(".offerer_information")
                                        break;
                                    case "phoneNum" :
                                    	requiredNotice.innerText = "휴대전화를 확인해주세요";
                                    	allCheck(".offerer_information")
                                    	break;
                                    case "faxNum" :
                                        requiredNotice.innerText = "팩스번호를 확인해주세요.";
                                        allCheck(".offerer_information")
                                        break;
                                    case "companyIntroduceTextbox" :
                                        requiredNotice.innerText = "최소 80자 이상 입력해주세요."
                                        allCheck(".detail_information")
                                        break;
                                    case "additionTextbox" :
                                        requiredNotice.innerText = "최소 10자 이상 입력해주세요."
                                        allCheck(".detail_information")
                                        break;
                                }
                            
                            }else{
                                switch (parentName){
                                    case "corporateName" :
                                        removeNotice(ele, requiredNotice, "remove");
                                        allCheck(".basic_information");
                                        break;
                                    case "telNum" :
                                        removeNotice(ele, requiredNotice, "remove");
                                        allCheck(".offerer_information")
                                        break;
                                    case "faxNum" :
                                        removeNotice(ele, requiredNotice, "remove");
                                        allCheck(".offerer_information")
                                        break;
                                    case "additionTextbox" :
                                        removeNotice(ele, requiredNotice, "remove");
                                        allCheck(".detail_information")
                                        break;
                                }
                            }
                        
                        }else if (ele.value.length >= ele.minLength) {
                            removeNotice(ele, requiredNotice, "remove");
                            let parentWrap = parent.parentElement.parentElement;
                            if(parentWrap.classList.contains("basic_information")) 
                            	allCheck(".basic_information");
                            else if(parentWrap.classList.contains("offerer_information")) 
                            	allCheck(".offerer_information");
                            else if(parentName !== "businessLicensePaper" && parentWrap.classList.contains("detail_information")) 
                            	allCheck(".detail_information");
                        }
                    }else if(parentName == "telNum"){
                        let frontTel = ele.parentElement.querySelector("select[name='frontTel'] > option:checked");
                        let telBox = ele.parentElement.querySelector("#telBox");
                        
                        if(frontTel.value == "00" && telBox.value != ""){
                            removeNotice(ele, requiredNotice, "add");
                            requiredNotice.innerText = "지역번호는 필수 입력입니다.";
                        }else if(frontTel.value != "00" && telBox.value == ""){
                        	
                            removeNotice(telBox, requiredNotice, "add");
                            requiredNotice.innerText = "전화번호를 확인 해주세요.";
                        }else{
                            removeNotice(ele, requiredNotice, "remove");
                        }
                    }else if(parentName == "faxNum"){
                        let frontFax = ele.parentElement.querySelector("select[name='frontFax'] > option:checked");
                        let faxBox = ele.parentElement.querySelector("#faxBox");
                        
                        if(frontFax.value == "00" && faxBox.value != ""){
                            removeNotice(ele, requiredNotice, "add");
                            requiredNotice.innerText = "지역번호는 필수 입력입니다.";
                        }else if(frontFax.value != "00" && faxBox.value == ""){
                        	
                            removeNotice(faxBox, requiredNotice, "add");
                            requiredNotice.innerText = "팩스번호를 확인 해주세요.";
                        }else{
                            removeNotice(ele, requiredNotice, "remove");
                        }
                    }else if(parentName == "businessLicenseNumber"){
                        let flagArr = eachFlagArr(ele.parentElement.querySelectorAll("input"));
                        if(flagArr.indexOf(false) !== -1){
                            removeNotice(ele, requiredNotice, "add");
                            requiredNotice.innerText = "사업자등록번호는 필수 입력입니다.";
                            if(ele.value.length >= ele.minLength) ele.classList.remove("validateFocus")
                        }else{
                            removeNotice(ele, requiredNotice, "remove");
                        }
                        // ele.focus();
                    }
                    else if(parentName == "mainProducts"){
                        // 주요상품 및 가격대 관련
                        let inputBoxWrap = ele.parentElement.parentElement;
                        let inputBox = ele.parentElement;
                        let eleFlag = ele.dataset.flag;
                        let itemArr = mainProductsFlag(ele, 'inputItem', 'arr');
                        let boxArr = mainProductsFlag(ele, 'inputBox', 'arr');
                        let itemAnswer = mainProductsFlag(ele, 'inputItem', 'answer');
                        let boxAnswer = mainProductsFlag(ele, 'inputBox', 'answer');
                        
                        if(boxAnswer == 'true'){
                            inputBoxWrap.querySelectorAll(".belowMinWrap").forEach(el => {removeNotice(el, requiredNotice, "remove")});
                            allCheck(".detail_information")
                        }else {
                            if(boxAnswer == 'none') {
                                removeNotice(inputBox, requiredNotice, "add");
                            }else if(boxAnswer == 'false'){
                                if((itemAnswer == 'true' || itemAnswer == 'none')) {
                                    if(boxArr.indexOf("false") !== -1) inputBox.classList.remove('validateFocus');
                                    else  removeNotice(inputBox, requiredNotice, "remove")
                                }else{
                                    removeNotice(inputBox, requiredNotice, "add")
                                    
                                }
                            }
                            allCheck(".detail_information")
                            requiredNotice.innerText = "주요상품 및 가격을 입력해주세요.";
                        }
                    }
                    
                    switch (eleName){
	                    case "mainProductsPrice1" :
	                    	let productsPrice1 = (ele.value).replace(/,/g,"");
	                        if( productsPrice1 != "" && Number(productsPrice1) <= 0){
	                        	removeNotice(ele, requiredNotice, "add");
	                            requiredNotice.innerText = "가격은 최소 1원 이상 입력해주세요.";
	                            allCheck(".detail_information")
	                    	}
	                        break;
	                    case "mainProductsPrice2" :
	                    	let productsPrice2 = (ele.value).replace(/,/g,"");
	                        if( productsPrice2 != "" && Number(productsPrice2) <= 0){
	                            requiredNotice.innerText = "가격은 최소 1원 이상 입력해주세요.";
	                            removeNotice(ele, requiredNotice, "add");
	                            allCheck(".detail_information")
	                    	}
	                        break;
	                    case "mainProductsPrice3" :
	                    	let productsPrice3 = (ele.value).replace(/,/g,"");
	                        if( productsPrice3 != "" && Number(productsPrice3) <= 0){
	                            requiredNotice.innerText = "가격은 최소 1원 이상 입력해주세요.";
	                            removeNotice(ele, requiredNotice, "add");
	                            allCheck(".detail_information")
	                    	}
	                        break;
                    }
                }
                function eachFlagArr(inputEle){
                    let flag = [];
                    inputEle.forEach(ele => {
                        if(ele.value == "")                       flag.push(false)
                        else if(ele.value.length < ele.minLength) flag.push(false)
                        else                                      flag.push(true)
                    })
                    return flag;
                }

                function removeNotice(ele, changeEle, state, eleWrap){
                    if(state == "remove"){
                        changeEle.innerText ="";
                        changeEle.classList.remove("on");
                        ele.classList.remove("validateFocus");
                        if(ele.closest(".requiredValueWrap") !== null){
                            if(ele.closest(".requiredValueWrap").getAttribute("name") == "mainProducts")  {
                                ele.closest(".requiredValueWrap").dataset.validation = 'Y';
                            } else if(ele.closest(".requiredValueWrap").getAttribute("name") == "entryStatus") {
                                ele.closest(".input_wrap").querySelector("#checkboxSelectArr").dataset.validation = 'Y';
                            }
                            ele.dataset.validation = 'Y';
                        }else {
                            ele.dataset.validation = 'Y';
                        }

                    }else if(state == "add"){
                        changeEle.classList.add("on");
                        ele.classList.add("validateFocus");
                        if(ele.closest(".requiredValueWrap") !== null){
                            if(ele.closest(".requiredValueWrap").getAttribute("name") == "mainProducts")  {
                                ele.closest(".requiredValueWrap").dataset.validation = 'N';
                            } else if(ele.closest(".requiredValueWrap").getAttribute("name") == "entryStatus") {
                                ele.closest(".input_wrap").querySelector("#checkboxSelectArr").dataset.validation = 'N';
                            }
                            ele.dataset.validation = 'N';
                        }else {
                            ele.dataset.validation = 'N';
                        }
                    }
                }
                /***************************/


                 /****************************
                 *   주요상품 및 가격대 관련   *
                 *****************************/
                let mainProductsArea = document.querySelector(".main_products_area");
                mainProductsArea.querySelectorAll("input").forEach(ele => ele.addEventListener("click", (function(){
                    let requiredNotice = mainProductsArea.querySelector(".requiredValue_notice");
                    if(mainProductsFlag(ele, 'inputBox', 'answer') == 'none'){
                        mainProductsArea.querySelectorAll(".belowMinWrap").forEach(el => {
                            removeNotice(el, requiredNotice, "remove");
                            removeNotice(ele.parentElement, requiredNotice, "add")
                        })
                        requiredNotice.innerText = "상품 및 가격은 최소 1개 이상 필수 입력입니다.";
                    }else{
                    	
                    }
                })))

                // 조건별 flag
                function mainProductsFlag(element, flagName, returnType){
                    let inputEle = element;
                    let inputBox = element.parentElement;
                    let inputWrap = inputBox.parentElement;
                    let requiredCheck = inputBox.querySelector('.requiredValue');
                    
                    let inputFlagArr = [];
                    let inputBoxFlagArr = [];

                    let inputAnswer = false;
                    let inputBoxAnswer = false;

                    inputBox.querySelectorAll("input").forEach(input => {
                        if(input.dataset.flag == undefined)  input.dataset.flag = 'none';
                        else if(inputEle.value == '')        inputEle.dataset.flag = 'none';
                        else if(inputEle.value !== '')       inputEle.dataset.flag = 'true';
                        inputFlagArr.push(input.dataset.flag);
                    }) 

                    inputWrap.querySelectorAll(".belowMinWrap").forEach(inpbox => {
                        if(inpbox.dataset.checkdata == undefined) inpbox.dataset.checkdata = 'none';
                        else if(inputFlagArr.filter(data => 'none' == data).length == 0 && inputFlagArr.indexOf('none') == -1) inputBox.dataset.checkdata = 'true';
                        else if(inputFlagArr.filter(data => 'none' == data).length == inputFlagArr.length) inputBox.dataset.checkdata = 'none';
                        else if(inputFlagArr.filter(data => 'true' == data).length < inputFlagArr.length) inputBox.dataset.checkdata = 'false';
                        inputBoxFlagArr.push(inpbox.dataset.checkdata);
                    })
                    if(flagName == 'inputItem'){
                        //false : 인풋창 한개라도 텍스트가 있을 경우
                        //none  : 인풋창 모두 빈칸일 경우 
                        //true  : 인풋창 모두 정상일 경우 
                        if(inputFlagArr.filter(data => 'true' == data).length == inputFlagArr.length) inputAnswer = 'true';
                        else if(inputFlagArr.filter(data => 'none' == data).length == inputFlagArr.length) inputAnswer = 'none';
                        else if(inputFlagArr.filter(data => 'true' == data).length !== inputFlagArr.length) inputAnswer = 'false';

                        if(returnType == 'answer') return inputAnswer
                        else if (returnType == 'arr') return inputFlagArr

                    }else if(flagName == 'inputBox'){

                        if(inputBoxFlagArr.filter(data => 'false' == data).length > 0) inputBoxAnswer = 'false';
                        else if(inputBoxFlagArr.filter(data => 'true' == data).length > 0) inputBoxAnswer = 'true';
                        else if(inputBoxFlagArr.filter(data => 'none' == data).length == inputBoxFlagArr.length) inputBoxAnswer = 'none';

                        // 한개라도 작성 했어야 true
                        if(returnType == 'answer') return inputBoxAnswer
                        else if (returnType == 'arr') return inputBoxFlagArr
                    }
                }
                /*****************************/
                

                /************************
                 *     사업자등록번호     *
                 ************************/
                let businessLicenseNumber = document.querySelector(".business_license_number");
                let businessNumberInput = businessLicenseNumber.querySelectorAll("input");
                let businessConfirmBtn = businessLicenseNumber.querySelector(".partners_btn > button");
                businessNumberInput.forEach(ele => ele.addEventListener("keyup",(function(){businessNumberInputEvent(this)})));
                let bizNo = "";
                let chkBizNo = "";
                let isChkBizNo = "N";
                let isBizNoDuplChk = "N";

                //사업자등록번호
                function businessNumberInputEvent(ele){
                    let focusEleId = document.activeElement.id;
                    if( businessConfirmBtn.disabled == true){
                        if(focusEleId == "businessNum1" && businessNumberInput[0].value.length == businessNumberInput[0].maxLength) businessNumberInput[1].focus();
                        if(focusEleId == "businessNum2" && businessNumberInput[1].value.length == businessNumberInput[1].maxLength) businessNumberInput[2].focus();
                    }
                    
                    bizNo = businessNumberInput[0].value + businessNumberInput[1].value + businessNumberInput[2].value;

                    if(!businessConfirmBtn.disabled && bizNo.length !== 10) businessConfirmBtn.disabled = true;
                    else if(bizNo.length == 10) businessConfirmBtn.disabled = false;
                }

                //정상입력 확인 및 하단 인풋 disabled 해제
                function checkBizNo() {
	               $.ajax({
	               type : "post",
	               url : "/info/checkBizNo.do",
	               dataType : "json",
	               data : {"bizNo": bizNo}, 
	               success : function(data) {
	               		if (data.result) {
	               			confirmBizNo();
	               		} else {
	               			alert("입점진행중이거나 입점되어 운영중인 사업자로 확인됩니다.\n추가문의는 담당자 정광임(031-780-8541)으로 연락바랍니다.");
	               		}
	               	},
	               	error : function(x, o, e) {
	               		alert("서버 통신이 원활하지 않습니다.\n" + x.status + " : " + o + " : " + e);
	               	}				
	               });
               	 if(isBizNoDuplChk == "Y"){
	                 
	                }
                }
                
                function confirmBizNo(){
                	if(isChkBizNo == "Y"){
	                	 $("#flagBizNo").val('N');
	                     $("#bizNo").val("");
	                     
	                     businessLicenseNumber.querySelector(".validConfirm").classList.remove("on");
	                     
	                     // 사업자 번호 수정으로 변경
	                     businessNumberInput.forEach(ele => ele.disabled = false);
	                     businessConfirmBtn.classList.add("change_biz_num");
	                     businessConfirmBtn.innerText = "사업자 확인";
	                     
	                     isChkBizNo = "N";
	                     document.querySelector("#businessNum1").dataset.validation = 'N';
	                     document.querySelector("#businessNum2").dataset.validation = 'N';
	                     document.querySelector("#businessNum3").dataset.validation = 'N';
	                 }else{
				         var data = {
							"b_no":[bizNo]
						     };
				         $.ajax({ 
				        		url: "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=mqwfw8hEoXcOV21ZxSi4TQieNdyKgpL4PRZwEJNczz4Mfs4%2FSVrQGD98v55CyZjzYhMs0MQtpu%2FBo2QvR4fA9Q%3D%3D", 
				        		type: "POST", 
				        		data: JSON.stringify(data), 
				        		dataType: "JSON", 
				        		contentType: "application/json", 
				        		accept: "application/json", 
				        		success: function(result) {
				        			console.log(result);
				        			if (result.data[0].b_stt_cd == "01") {
		                                 alert("사업자번호 확인이 완료되었습니다.\n신청폼 작성을 진행해주세요.");
		                                 $("#flagBizNo").val('Y');
		                                 $("#bizNo").val(bizNo);
		                                 
		                                 businessLicenseNumber.querySelector(".validConfirm").classList.add("on");
		                                 // 비활성화 풀기
		                                 itemCodeDep1.querySelector("fieldset").disabled = false;
		                                 form.querySelectorAll("input").forEach(ele => ele.disabled = false);
		                                 form.querySelectorAll("button").forEach(ele => ele.disabled = false);
		                                 form.querySelectorAll("textarea").forEach(ele => ele.disabled = false);
		                                 form.querySelectorAll("select").forEach(ele => ele.disabled = false);
		                                 form.querySelectorAll("button").forEach(ele => ele.disabled = false);
		                                 
		                                 itemCodeDep1List.forEach(ele => ele.addEventListener("click",function(){selectItemDep(this)}));
		                                 // 
		                                 // 사업자 번호 수정으로 변경
		                                 businessNumberInput.forEach(ele => ele.disabled = true);
		                                 businessConfirmBtn.classList.add("change_biz_num");
		                                 businessConfirmBtn.innerText = "사업자 수정";
		                                 
		                                 
		                                 isChkBizNo = "Y";
		                                 document.querySelector("#businessNum1").dataset.validation = 'Y';
		                                 document.querySelector("#businessNum2").dataset.validation = 'Y';
		                                 document.querySelector("#businessNum3").dataset.validation = 'Y';
		                                 
		                                 //업체품목 선택은 사업자 검증이후 이후 가능
		                                 
		                                 itemCodeDep1List.forEach(ele => ele.addEventListener("click",function(){selectItemDep(this)}));
		                                 chkBizNo = bizNo;
				        			 }else if (result.data[0].b_stt_cd != "01") {
	                                     alert("해당 사업자번호는 인증이 불가합니다.\n사업자 상태를 확인해주세요");
	                                     return;
				        			 }
		                             
				        		}, 
				        		error: function(result) { 
				        		console.log(result.responseText); //responseText의 에러메세지 확인 
				        		} 
				        	});
	                     }
                }
                /************************/

                /************************
                 *     업체품목 관련     *
                 ************************/
                let selectItemCode = document.querySelector(".select_item_code");
                let itemCodeDep1 = selectItemCode.querySelector(".select_item_list > .dep1");
                let fieldsetDisabled = itemCodeDep1.querySelector("fieldset");
                let itemCodeDep1List = itemCodeDep1.querySelectorAll("fieldset > label");
                let itemCodeDep2 = selectItemCode.querySelector(".select_item_list > .dep2");
                let searchResult = selectItemCode.querySelector(".search_result");
                let searchResultRemoveBtn = searchResult.querySelector(".remove_btn");
                let resultSetDep1 = document.querySelector("#dep1ItemSelect");
                let resultSetDep2 = document.querySelector("#dep2ItemSelect");

                //아이템배열
                let itemCodeDep2ItemArr = [
											<c:forEach items="${itemList}" var="itemList" varStatus="status">
												<c:choose>
													<c:when test="${status.last}">
														{index:${status.index},mainName:"${itemList.dep_1}",subName:"${itemList.dep_2}"}
													</c:when>
													<c:otherwise>
														{index:${status.index},mainName:"${itemList.dep_1}",subName:"${itemList.dep_2}"},
													</c:otherwise>
												</c:choose>
											</c:forEach>
                                        ];
    
                //품목 검색
                let categorySearchBox = document.querySelector(".item_search_box");
                let categoryItemSearch = document.querySelector("#categoryItemSearch");
                let searchListBox = categorySearchBox.querySelector(".search_list");
                let searchListWrap = searchListBox.querySelector("ul");
                let categorySearhRemoveBtn = searchListBox.querySelector(".remove_btn");

                categoryItemSearch.addEventListener("keyup",searchItemKeyEvent);
                categorySearhRemoveBtn.addEventListener("click", function(){searchBoxOpen("off")})

                function searchItemKeyEvent(){
                    searchItem(categoryItemSearch.value)
                    if(searchListWrap.childElementCount == 0 ) searchBoxOpen("off")
                    // 글자 있을 경우
                    
                    let searchList = searchListWrap.querySelectorAll("span.mid_cate");
                    searchList.forEach(ele => ele.innerHTML = ele.innerText.replace(categoryItemSearch.value,'<em style="font-weight:bolder;color:#000">'+categoryItemSearch.value+'</em>'));
                }

                function searchBoxOpen(state){
                    if(state == "on") {
                        categoryItemSearch.classList.add("on");
                        searchListBox.style.display = "block";
                    }else{
                        categoryItemSearch.classList.remove("on");
                        searchListBox.style.display = "none";
                    }
                }

                function searchItem(searchVal){
                    searchListBox.querySelector("ul").innerHTML ='';
                    let subCateArr = [];
                    itemCodeDep2ItemArr.forEach(ele => {
                        if(searchVal.length > 1 && ele.subName.includes(searchVal)) {
                            subCateArr = ele.subName.split(",");
                            subCateArr.forEach(itemName => {
                                if(itemName.includes(searchVal)) {

                                //console.log(subCateArr.indexOf(itemName));
                                let itemNameArr = [];
                                itemNameArr = itemName.split("|");
                                console.log(itemNameArr[0]+'indexof '+itemName+' = '+subCateArr.indexOf(itemName));
                                searchListWrap.insertAdjacentHTML("beforeend", `<li data-main-cate-index='`+ele.index+`' data-sub-cate-index='`+subCateArr.indexOf(itemName)+`' onclick="test('`+ele.mainName+`', '`+itemNameArr[0]+`', '`+ele.index+`', '`+subCateArr.indexOf(itemName)+`', '`+itemNameArr[1]+`');">
                                                                                    <span>`+ele.mainName+`&#62; </span>
                                                                                    <span class="mid_cate">`+itemNameArr[0]+`</span>
                                                                                    </li>`);
                                }
                            })
                            searchBoxOpen("on");
                        }
                    });
                }
                
                function test(mainTT, subTT, mainIndex, subIdex, itemCode){

                    searchBoxOpen("off")
                    searchResult.style.display = "block";
                    searchResultRemoveBtn.style.display = "inline-block";
                    searchResultRemoveBtn.addEventListener("click",searchResultRemoveBtnClickEvt)
                    searchResult.children[0].innerText = mainTT + ' >';
                    searchResult.children[1].innerText = subTT;
                    
                    resultSetDep1.value = mainTT;
                    resultSetDep1.dataset.validation = 'Y';
                    resultSetDep2.value = subTT;
                    resultSetDep2.dataset.validation = 'Y';
                    $("#item_code").val(itemCode);
                    itemCodeDep1List[mainIndex].querySelector("input").checked = true;
                    createSubCateItem(mainTT); // 메인 선택 시 아이템 불러오기

                    //스크롤이동
                    let itemCodeDep2List = itemCodeDep2.querySelectorAll("fieldset > label");
                    itemCodeDep2List[subIdex].querySelector("input").checked = true;
                    let dep1Scroll = itemCodeDep1List[0].offsetHeight * (mainIndex-1);
                    itemCodeDep1.scrollTo(0,dep1Scroll);
                    let dep2Scroll = itemCodeDep2List[0].offsetHeight * (subIdex-1);
                    itemCodeDep2.scrollTo(0,dep2Scroll);

                    allCheck(".basic_information");
                }

                //업체품목
                function selectItemDep(ele){
                    console.log(ele);
                    searchResult.style.display = "block";
                    if (ele.parentElement.name == "main_cate") {
                        let mainCateName = ele.querySelector("span").innerText;
                        createSubCateItem(mainCateName); // 메인 선택 시 아이템 불러오기
                        searchResult.children[0].innerText = ele.innerText + ' >';
                        let dep1Value = ele.innerText;
                        resultSetDep1.value = dep1Value;
                        resultSetDep2.value = "";
                        resultSetDep2.dataset.validation = 'N';
                    }else if (ele.parentElement.name == "sub_cate") {
                        searchResult.children[1].innerText = ele.innerText;
                        let dep2Value = ele.innerText;
                        resultSetDep2.value = dep2Value;
                        resultSetDep2.dataset.validation = 'Y';

                        let selectItemCode = resultSetDep2.parentElement.parentElement;
                        let selectBox = selectItemCode.querySelector(".select_item_list");
                        let requiredNotice = selectItemCode.querySelector(".requiredValue_notice");
                        removeNotice(selectBox, requiredNotice, "remove");

                        $("#item_code").val(ele.querySelector("input[type=radio]").value);
                        searchResultRemoveBtn.style.display = "inline-block";
                        searchResultRemoveBtn.addEventListener("click",searchResultRemoveBtnClickEvt)
                    }
                    allCheck(".basic_information");
                }

                function searchResultRemoveBtnClickEvt(){
                    searchResult.style.display = "none";
                    searchResult.querySelectorAll("span").forEach(ele => ele.innerText = "");
                    searchResultRemoveBtn.style.display = "none";
                    itemCodeDep1List.forEach(ele => {
                        ele.querySelector("input").checked = false;
                    });
                    categoryItemSearch.value = '';
                    itemCodeDep2.innerHTML = '';
                    resultSetDep1.value = '';
                    resultSetDep2.value = '';
                    resultSetDep1.dataset.validation = 'N';
                    resultSetDep2.dataset.validation = 'N';

                    let selectItemCode = resultSetDep2.parentElement.parentElement;
                    let selectBox = selectItemCode.querySelector(".select_item_list");
                    let requiredNotice = selectItemCode.querySelector(".requiredValue_notice");
                    removeNotice(selectBox, requiredNotice, "add");
                    requiredNotice.innerText = "업체 품목 선택은 필수입니다.";
                }

                function createSubCateItem(mainCate){
                    itemCodeDep2.innerHTML = '';
                    let fieldsetEle = document.createElement("fieldset");
                    fieldsetEle.name = "sub_cate";
                    document.querySelector(".dep2").append(fieldsetEle);
                    let subCateArr = [];
                    itemCodeDep2ItemArr.forEach(ele => {
                        if(mainCate == ele.mainName) subCateArr = ele.subName.split(",");
                        else                         return
                    })
                    subCateArr.forEach((itemName) => {
                        let labelEle = document.createElement("label");
                        labelEle.classList.add("radiobox");
                        let itemNameArr = [];
                        itemNameArr = itemName.split("|");
                        labelEle.innerHTML = `<input type="radio" name="dep2_select" value="`+itemNameArr[1]+`">
                                                <span class="radiobtn_icon"></span>`+itemNameArr[0];
                        fieldsetEle.append(labelEle);
                        labelEle.addEventListener("click",function(){selectItemDep(this)});
                    })
                }
                /************************/

                /************************
                 *   최대바이트수 체크   *
                 ************************/
                let textCountCheckEle = document.querySelectorAll(".text_count_check");
                textCountCheckEle.forEach(ele => ele.addEventListener("keyup", function(){textCountCheck(this)}))

                function textCountCheck(ele){
                    let length = ele.value.length;
                    let maxLength = ele.maxLength;
                    if(length > maxLength) ele.value = ele.value.substring(0, maxLength);
                    ele.nextElementSibling.querySelector(".byte").innerText = length;
                }
                /************************/

                /********************
                 *   입점현황 관련   *
                 ********************/
                let entryStatusArea = document.querySelector(".entry_status_area");
                let entryCheckBox = entryStatusArea.querySelectorAll("input[type='checkbox']");
                let brandEntryCheckBox = entryStatusArea.querySelectorAll("input[type='checkbox'].brand_store");
                let allEntry = document.querySelector("#allEntry");
                let noneEntry = document.querySelector("#noneEntry");
                let otherEntryCheckbox = document.querySelector("#otherEntryCheckbox");
                let otherInputArea = document.querySelector(".other_input");
                let otherEntryInput = document.querySelector("#otherEntryInput");
                
                entryCheckBox.forEach(ele => ele.addEventListener("change", function(){
                    let requiredNotice = entryStatusArea.querySelector(".requiredValueWrap > .requiredValue_notice");
                    let count = checkboxFlag(entryCheckBox).filter(element => false == element).length;
                    if(count == entryCheckBox.length) {
                        removeNotice(ele, requiredNotice, "add");
                        requiredNotice.innerText = "입점 현황 선택은 필수입니다.";
                    }else{
                        if(ele.checked == true && ele.getAttribute("name") == "chk_competitor"){
                        	noneEntry.checked = false;
                        }
                    	
                    	removeNotice(ele, requiredNotice, "remove");
                    }
                    allCheck(".detail_information")
                }))

                // 체크박스 미선택 flag
                function checkboxFlag(chkBoxEle){
                    let checkboxFlag = [];
                    chkBoxEle.forEach(ele => {
                        if(ele.checked == false) checkboxFlag.push(false)
                        else                     checkboxFlag.push(true)
                    })
                    return checkboxFlag;
                }

                //[브랜드] 전체 선택 시 [전체] 자동 체크 기능
                brandEntryCheckBox.forEach(ele => ele.addEventListener("change",function(){
                    let checkingEle = entryStatusArea.querySelectorAll("input[type='checkbox'].brand_store:checked");
                    if(checkingEle.length == brandEntryCheckBox.length) allEntry.checked = true;
                    else allEntry.checked = false;
                }))

                //[전체] 선택시
                allEntry.addEventListener("click", function(){
                    if(allEntry.checked == true){
                        entryCheckBox.forEach(ele => {
                            if(ele.id == "otherEntryCheckbox" && ele.checked == false) ele.checked = false;
                            else ele.checked = true;
                        });
                        noneEntry.checked = false;
                    }else {
                        entryCheckBox.forEach(ele => ele.checked = false);
                        otherEntryInputView("hide")
                    }
                })

                //[없음] 선택시
                noneEntry.addEventListener("click", function(){
                    if(noneEntry.checked == true){
                        entryCheckBox.forEach(ele => ele.checked = false);
                        noneEntry.checked = true;
                        otherEntryInputView("hide");
                    }
                })

                //[그 외 기타] 선택시
                otherEntryCheckbox.addEventListener("click", (function(){
                    if(otherEntryCheckbox.checked) {
                    	otherEntryInputView("view");
                    	noneEntry.checked = false;
                    } else {
                    	otherEntryInputView("hide");
                    }
                }));
                function otherEntryInputView(state){
                    if(state == "view"){
                        otherInputArea.style.display = "block";
                    }else if(state == "hide"){
                        otherInputArea.style.display = "none";
                        otherEntryInput.value = "";
                        removeNotice(otherEntryInput, otherInputArea.querySelector(".requiredValue_notice"), "remove");
                    }
                }

                otherEntryInput.addEventListener("keyup",function(){otherEntryInputKeyEvent(this)});
                //[그 외 기타] 입력값 리턴
                function otherEntryInputKeyEvent(ele){
                    let otherItem = ele.value;
                    let otherItemRetrun = '';
                    let requiredNotice = otherInputArea.querySelector(".requiredValue_notice");

                    if(otherItem.indexOf(",") > -1) otherItemRetrun = otherItem.split(",");
                    else                            otherItemRetrun = otherItem

                    if(otherItem == "") {
                        removeNotice(ele, requiredNotice, "add");
                        requiredNotice.innerText = "기타 입점 업체 선택 시 필수 입력입니다.";
                    }else{
                        removeNotice(ele, requiredNotice, "remove");
                    }
                    
                    return otherItemRetrun
                }
                /*********************/

                /************************
                 *   제휴연동 동의 팝업   *
                 ************************/
                function noticePopView(view){
                    if(view == "show") document.querySelector(".notice_layer_pop").style.display = "block";
                    else  document.querySelector(".notice_layer_pop").style.display = "none";
                }
                /************************/

                /*********************
                 *   파일 첨부 기능   *
                 *********************/
                function changeFile(ele) {
                    let fileEle = ele;
                    let acceptArr = ele.accept.replace(/\s|\./g, '').split(",");
                    let requiredNotice = document.querySelector(".business_license_paper_area .requiredValue_notice");
                    const { files } = event.target;
                    if (files.length <= 0) return;
                    const file = files[0];
                    const fileType = file.type.split("/")[1];//file 객체에서 타입 확인
					
                    let fileName = ele.value;
					let fileExtDot = fileName.lastIndexOf(".");
                    let fileExt = fileName.substring(fileExtDot+1, fileName.length).toLowerCase();
                    
                    let limitSize = 5;
                    let fileAccept = "jpg, png, pdf, zip";
                    if(ele.getAttribute("name") == "file2"){
        		        limitSize = 10;
        		        fileAccept = "jpg, png, hwp, word, pdf, xlsx, zip";
        		    }
                    let mySize = ele.dataset.filesize;
                    let fileSize = file.size;
                    let maxSize = limitSize * 1024 * 1024;

                    if (!acceptArr.includes(fileExt)) {
                        alert(fileAccept + ' 파일만 첨부 가능합니다.');
                        if(ele.id == "licensePaperUploadBtn") {
                            removeNotice(ele, requiredNotice, "add");
                            requiredNotice.innerText = "사업자등록증 첨부는 필수입니다.";
                        }
                        return;
                    }else if(fileSize > maxSize){
                        alert('첨부파일 사이즈는 ' + limitSize + 'MB 이내로 등록 가능합니다. ');
                        if(ele.id == "licensePaperUploadBtn") {
                            removeNotice(ele, requiredNotice, "add");
                            requiredNotice.innerText = "사업자등록증 첨부는 필수입니다.";
                        }
                        return;
                    }else{
                        const fileReader = new FileReader()
                        fileReader.readAsDataURL(file)
                        fileRemoveBtn(fileEle,'btn_file','file_name',file.name)
                        if(ele.parentElement.querySelector(".file_remove") == null) {
                            fileEle.parentElement.querySelector("label").insertAdjacentHTML("afterend", `
                            <button type="button" class="file_remove" value="삭제" onclick="fileRemoveBtn(this,'file_name','btn_file','파일 등록');"></button>
                            `);
                        }
                        removeNotice(ele, requiredNotice, "remove");
                    }
                    allCheck(".detail_information");
                }

                function fileRemoveBtn(ele, removeClass, addClass, innerTT){
                    let fileEle = ele.parentElement.querySelector("input[type='file']");
                    let requiredNotice = document.querySelector(".business_license_paper_area .requiredValue_notice");
                    fileEle.dataset.validation = "N";
                    ele.parentElement.querySelector("label").classList.remove(removeClass);
                    ele.parentElement.querySelector("label").classList.add(addClass);
                    ele.parentElement.querySelector("label").innerText = innerTT;
                    if(ele.classList.contains("file_remove")) ele.remove();
                    if(fileEle.id == "licensePaperUploadBtn") {
                        removeNotice(fileEle, requiredNotice, "add");
                        requiredNotice.innerText = "사업자등록증 첨부는 필수입니다.";
                    }
                    allCheck(".detail_information");
                }
                /*********************/

                /*******************************
                 *   홈페이지 주소 정규식 체크   *
                 *******************************/
                let urlArea = document.querySelector(".company_site_url_area");
                let urlInput = urlArea.querySelector("#homepageAddress");
                urlArea.querySelector("input").addEventListener('keyup',()=> urlCheck(urlInput))
                function urlCheck(ele){
                    let urlInput = ele;
                    let urlInputVal = ele.value;
                    let errorNotice = urlArea.querySelector(".requiredValue_notice");
                    
                    var url = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
                    var urlTest = url.test(urlInputVal); 
                    if(urlInputVal == ""){
                        removeNotice(urlInput, errorNotice, "remove");
                        allCheck(".detail_information")
                    }else if(!urlTest){
                        removeNotice(urlInput, errorNotice, "add");
                        errorNotice.innerText = "홈페이지 주소를 다시 확인해주세요.";
                        allCheck(".detail_information")
                        urlInput.focus();
                        return false;
                    }else if(urlInputVal !== ""){
                        if(urlInputVal.search(/https?:\/\//) == -1) ele.value = "http://" + urlInputVal;
                        removeNotice(urlInput, errorNotice, "remove");
                        allCheck(".detail_information")
                    }
                }
                /*******************************/

                /*******************************
                 *   이메일 도메인 정규식 체크   *
                 *******************************/
                function emailCheck(ele){
                    let emailRule =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
                    let emailId = document.querySelector("#emailID");
                    let domainSelBox = document.querySelector("#emailDomainAddSelect");
                    let emailDomain = document.querySelector("#emailDomainAdd").value;
                    let errorNotice = ele.closest(".input_wrap").querySelector(".requiredValue_notice");
                    if(!emailRule.test(emailDomain)){
                    	if(emailId.value != "") {
                    		removeNotice(emailId, errorNotice, "remove");
                    	}
                        removeNotice(ele, errorNotice, "add");
                        errorNotice.innerText = emailDomain !== "" ? "이메일을 형식에 맞게 입력해주세요." : "이메일은 필수 입력입니다.";
                    }else{
                        if(emailId.value == "") {
                            removeNotice(ele, errorNotice, "add");
                            errorNotice.innerText = "이메일은 필수 입력입니다.";
                        }else{
                            removeNotice(ele, errorNotice, "remove");
                        }
                    }
                    allCheck(".offerer_information");
                }

                // 도메인 select change 이벤트
                function emailDomainSelect(domain){
                    let domainEle = document.querySelector("#emailDomainAdd");
                    let emailId = document.querySelector("#emailID");
                    let domainSelBox = document.querySelector("#emailDomainAddSelect");
                    let errorNotice = document.querySelector(".email_area .requiredValue_notice");
                    domainEle.disabled = true;
                    if(domainSelBox.querySelector(".directInput").selected){
                        domainEle.disabled = false;
                        domainEle.focus();
                        domainEle.value = domain;
                    }else{
                        domainEle.value = domain;
                        domainEle.disabled = true;
                    }
                    if(emailId.value !== "" && domainEle.value !== "") {
                        removeNotice(domainEle, errorNotice, "remove");//도메인
                        removeNotice(emailId, errorNotice, "remove");  //아이디
                    }else if((emailId.value == "" && domainEle.value !== "") || 
                    		(emailId.value != "" && domainEle.value == "")){
                        removeNotice(domainEle, errorNotice, "remove");//도메인
                        removeNotice(emailId, errorNotice, "add");     //아이디
                        errorNotice.innerText = "이메일은 필수 입력입니다.";
                    }
                    
                    allCheck(".offerer_information");
                }
                /*******************************/
            </script>
            </div>
	<!--//content-->
	
</div>
<!--// container -->