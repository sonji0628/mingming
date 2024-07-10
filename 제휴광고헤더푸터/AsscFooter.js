jQuery(function($){

var footer_innerHTML = '<div class="footer">';
	footer_innerHTML += '<div class="area">';
	footer_innerHTML += '	<div class="policy">';
	footer_innerHTML += '		<ul>';
	footer_innerHTML += '			<li><a href="https://www.akplaza.com/etc/company/ideology" target="_blank" title="새창열림">애경유통그룹소개</a></li>';
	footer_innerHTML += '			<li><a href="https://www.akmall.com/info/UseStiplt.do" onclick="goUrlPath(this.href, \'\', \'K1_01\', \'0\'); return false;" target="_blank" title="새창열림">이용약관</a></li>';
	footer_innerHTML += '			<li><a href="https://www.akmall.com/info/PartnerShip.do" onclick="goUrlPath(this.href, \'\', \'K1_02\', \'0\'); return false;" target="_blank" title="새창열림">제휴파트너쉽</a></li>';
	footer_innerHTML += '			<li><a href="https://www.akmall.com/info/LaunchComp.do" onclick="goUrlPath(this.href, \'\', \'K1_03\', \'0\'); return false;" target="_blank" title="새창열림">입점문의</a></li>';
	footer_innerHTML += '			<li><a href="https://www.akmall.com/info/PrsnlTreat.do" onclick="goUrlPath(this.href, \'\', \'K1_04\', \'0\'); return false;" target="_blank" title="새창열림" class="color-pink">개인정보처리방침</a></li>';
	footer_innerHTML += '			<li><a href="https://www.akmall.com/info/PrsnlTreatYouth.do" onclick="goUrlPath(this.href, \'\', \'K1_04\', \'0\'); return false;" target="_blank" title="새창열림">청소년보호정책</a></li>';
	footer_innerHTML += '			<li><a href="https://www.akmall.com/info/PrsnlTreatTen.do" onclick="goUrlPath(this.href, \'\', \'K1_05\', \'0\'); return false;" target="_blank" title="새창열림">개인정보보호10계명</a></li>';
	footer_innerHTML += '			<li><a href="https://www.akmall.com/info/pMailReject.do" target="_blank" onclick="openWindowPopup(addUrlPath(this.href, \'\', \'K1_06\', \'0\'), \'pMailReject\', 552, 371, \'center\'); return false;" target="_blank" title="새창열림">이메일무단수집거부</a></li>';
	footer_innerHTML += '		</ul>';
	footer_innerHTML += '	</div>';
	footer_innerHTML +=	'</div>';
	footer_innerHTML +=	'<div class="info">';
	footer_innerHTML +=	'	<div class="footer_logo">';
	footer_innerHTML +=	'		<i class="ico ico_footer_logo"><em>AK MALL</em></i>';
	footer_innerHTML +=	'	</div>';
	footer_innerHTML +=	'	<div>';
	footer_innerHTML +=	'		<p class="blind">고객센터 정보</p>';
	footer_innerHTML +=	'		<dl>';
	footer_innerHTML +=	'			<dt>고객센터</dt>';
	footer_innerHTML +=	'			<dd>상담가능시간 : 09:00 ~ 18:00 (토, 공휴일 휴무)</dd>';
	footer_innerHTML +=	'			<dd>Tel : <b>1588-2055</b></dd>';
	footer_innerHTML +=	'			<dd>Fax : 032-321-6201  </dd>';
	footer_innerHTML +=	'			<dd>Mail : akfriendly@interparkshop.com</dd>';
	footer_innerHTML +=	'		</dl>';
	footer_innerHTML +=	'		<button type="button" onclick="location.href=\'https://www.akmall.com/customer/OneToOneQna.do\'">1:1 고객상담</button>';
	footer_innerHTML +=	'		<button type="button" onclick="location.href=\'https://www.akmall.com/customer/FaqList.do\'">문의 전 클릭</button>';
	footer_innerHTML +=	'	</div>';
	footer_innerHTML +=	'	<div>';
	footer_innerHTML +=	'		<dl>';
	footer_innerHTML +=	'			<dt>주식회사 인터파크커머스</dt>';
	footer_innerHTML +=	'			<dd>대표이사 : 김동식</dd>';
	footer_innerHTML +=	'			<dd>사업자등록번호 : 422-81-03185</dd>';
	footer_innerHTML +=	'			<dd>통신판매업신고 : 2024-서울강남-02073</dd>';
	footer_innerHTML +=	'			<dd>서울특별시 강남구 영동대로 502 (삼성동) </dd>';
	footer_innerHTML +=	'		</dl>';
	footer_innerHTML +=	'		<button type="button" onclick="window.open(\'http://www.ftc.go.kr/bizCommPop.do?wrkr_no=4228103185\')">사업자정보확인</button>';
	footer_innerHTML +=	'	</div>';
	footer_innerHTML +=	'	<div>';
	footer_innerHTML +=	'		<dl>';
	footer_innerHTML +=	'			<dt>소비자피해보상보험</dt>';
	footer_innerHTML +=	'			<dd>';
	footer_innerHTML +=	'				고객님은 안전거래를 위해 현금 등으로 결제 시';
	footer_innerHTML +=	'				저희 쇼핑몰에서 가입한 구매 안전서비스, 소비자피해보상보험';
	footer_innerHTML +=	'				서비스를 이용하실 수 있습니다. <br/>';
	footer_innerHTML +=	'				보상대상 : 미배송, 반품/환불거부, 쇼핑몰부도';
	footer_innerHTML +=	'			</dd>';
	footer_innerHTML +=	'		</dl>';
	footer_innerHTML +=	'		<button type="button" onclick="openWindowPopup(\'https://www.akmall.com/resource/templates/popup/purchaseSafety_confirmUse_commerce.html\', \'소비자피해보상보험\', \'566\', \'800\', true, false)">서비스 가입사실 확인</button>';
	footer_innerHTML +=	'	</div>';
	footer_innerHTML +=	'</div>';
	footer_innerHTML +=	'<div class="social_group" style="padding-right: 0px;">';
	footer_innerHTML +=	'	<div class="inr">';
	footer_innerHTML +=	'		<span>';
	footer_innerHTML +=	'			<a href="#" onclick="AppDownloadPopup();" title="바로가기">';
	footer_innerHTML +=	'				<i class="ico ico_app_down"></i>';
	footer_innerHTML +=	'				<b>모바일앱<br/>다운로드 안내</b>';
	footer_innerHTML +=	'			</a>';
	footer_innerHTML +=	'		</span>';
	footer_innerHTML +=	'		<span class="sns">';
	footer_innerHTML +=	'			<a href="https://www.instagram.com/akmall.official/" title="바로가기">';
	footer_innerHTML +=	'				<i class="ico ico_instargram"><em>instargram</em></i>';
	footer_innerHTML +=	'			</a>';
	footer_innerHTML +=	'			<a href="https://www.facebook.com/akmallcom/" title="바로가기">';
	footer_innerHTML +=	'				<i class="ico ico_facebook"><em>facebook</em></i>';
	footer_innerHTML +=	'			</a>';
	footer_innerHTML +=	'			<a href="https://www.youtube.com/channel/UCF4FHMLkUHBYIeAe8iV4d9g" title="바로가기">';
	footer_innerHTML +=	'				<i class="ico ico_youtube"><em>youtube</em></i>';
	footer_innerHTML +=	'			</a>';
	footer_innerHTML +=	'		</span>';
	footer_innerHTML +=	'	</div>';
	footer_innerHTML +=	'	<div class="inr">';
	footer_innerHTML +=	'		<span class="cert">';
	footer_innerHTML +=	'			<a href="https://www.kolsa.or.kr" title="바로가기">';
	footer_innerHTML +=	'				<i class="ico ico_kolsa"><em>KOLSA 사단법인 한국온라인쇼핑협회</em></i>';
	footer_innerHTML +=	'			</a>';
	footer_innerHTML +=	'			<a href="https://www.safetykorea.kr" title="바로가기">';
	footer_innerHTML +=	'				<i class="ico ico_safety"><em>제품안전 협력매장 제품안전정보센터 1600-1384 국가기술표준원</em></i>';
	footer_innerHTML +=	'			</a>';
	footer_innerHTML +=	'			<a href="https://www.akmall.com/resource/front/images/etc/2014_AK_ISMS.pdf" title="바로가기">';
	footer_innerHTML +=	'				<i class="ico ico_internet"><em>한국 인터넷진흥원 정보보호관리체계인증</em></i>';
	footer_innerHTML +=	'			</a>';
	footer_innerHTML +=	'			<span style=" float: right; margin-left: 10px;font-size: 11px;color: #999;line-height: 15px; margin-top: 4px;">';
	footer_innerHTML +=	'				<li>[인증범위] : AK몰 및 대외서비스 운영</li>';
	footer_innerHTML +=	'				<li>[유효기간] : 2021.07.07 ~ 2024.07.06 </li>';
	footer_innerHTML +=	'			</span>';
	footer_innerHTML +=	'		</span>';
	footer_innerHTML +=	'	</div>';
	footer_innerHTML +=	'</div>';
	footer_innerHTML +=	'</div>'; //footer

	

	$('body').append(footer_innerHTML);
});