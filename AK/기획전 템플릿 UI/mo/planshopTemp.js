// 팝업 열기/닫기
function popOpen(ele){
    ele.nextElementSibling.style.display="block";
}
function popClose(ele){
    ele.parentElement.parentElement.parentElement.style.display="none";
}

//탭 클릭
function tabView(ele){
    let tab = ele.parentNode.parentNode;
    let tabItem = tab.querySelectorAll("li")
    let tabContent = tab.parentNode.querySelectorAll(".grid_box");
    let tabIndex = ele.dataset.index;
    tabItem.forEach(ele => ele.classList.remove("tabOn"));
    ele.classList.add("tabOn");
    tabContent.forEach(ele => {
        ele.style.display = "none";
        if(ele.dataset.index == tabIndex) ele.style.display = "grid";
    });
};

require(["plan"], function() {
    planshopTemplate()

});

function planshopTemplate() {
    // 템플릿 타입 : 결제혜택
    var cardItemSwiper = {
        init:function(){
            var cardWrap = document.querySelectorAll(".cardTemplate_area .swiper-container");
            cardWrap.forEach(ele => {
                if(ele.querySelectorAll(".card_content_box").length > 0){
                    var cardSwiper = new Swiper(ele, {
                        slidesPerView: 'auto',
                        loop:false,
                        spaceBetween: 15,
                        observer: true,
                        observeParents: true,
                        autoPlay:true,
                        centeredSlides: true,
                        lazyLoading: true,
                        lazyLoadingInPrevNext: true
                    })
                }
            })
        }
    }
    jQuery('.cardTemplate_area').length && cardItemSwiper.init();

    // 템플릿 타입 : 상품(끌어오기) --> plan_type12.jsp
    var goodsdisplaySwiper = {
        init:function(){
            var goodsDisplayWrap = document.querySelectorAll(".planshopGoodsDisplayTemplate_area .swiper-container");
            goodsDisplayWrap.forEach(ele => {
                if(ele.querySelectorAll(".goods_item_lst .goods_item").length > 0){
                    var displaySwiper = new Swiper(ele, {
                        freeMode:true,
                        slidesPerView: 'auto',
                        loop:false,
                        spaceBetween: 15,
                        observer: true,
                        observeParents: true,
                        autoPlay:true
                    });
                }
            })
        }
    }
    jQuery('.planshopGoodsDisplayTemplate_area').length && goodsdisplaySwiper.init();
    jQuery('.giftshop_best_info_tab .goods_item_wrap').length && goodsdisplaySwiper.init();

    // 템플릿 타입 : 쿠폰다운로드 --> plan_type13.jsp
    var couponItemSwiper = {
        init:function(){
            var couponWrap = document.querySelectorAll(".couponTemplate_area .swiper-container");
            couponWrap.forEach(ele => {
                if(ele.querySelectorAll(".coupon_content_box").length > 0){
                    var couponSwiper = new Swiper(ele, {
                        slidesPerView: 'auto',
                        spaceBetween: 15,
                        loop:false,
                        observer: true,
                        observeParents: true,
                        autoPlay:true,
                        centeredSlides: true,
                        lazyLoading: true,
                        lazyLoadingInPrevNext: true
                    });
                }
            })
        }
    }
    jQuery('.couponTemplate_area').length && couponItemSwiper.init();

    // 템플릿 타입 : 네비게이션 --> plan_type14.jsp
    var planNavi = {
        init:function(){
            let anchorSection = document.querySelectorAll(".plan_anchor_section");
            let planNaviWrap = document.querySelector(".plan_navi_wrap");
            let naviTemp = document.querySelector(".naviTemplate_area");
            let naviWrap = naviTemp.querySelector(".navi_wrap ul");
            let naviItem = naviWrap.querySelectorAll("li");
            let naviItemWidth = naviWrap.scrollWidth;
            let naviWrapWidth = naviWrap.offsetWidth;
            let navHeight = naviTemp.offsetHeight;

            let hashItem = document.querySelectorAll(".plantop_wrap a");

            /////////////
            navInitSet("set");
            addEventListener("scroll", e => {navInitSet("scroll");});
            //naviItem.forEach(ele => ele.addEventListener("click", (function(){navAnchorAction(this)})));
            // 네비바 외에서도 사용 할 수 있도록 수정
            hashItem.forEach(ele => {
                if(ele.href.indexOf("#navi_id") != -1) ele.addEventListener("click", (function(){navAnchorAction(this)}));
            });
            /////////////

            function navAnchorAction(ele){
                naviTemp.classList.add("nav");
                event.preventDefault();
                $('html,body').animate({scrollTop:$(ele.hash).offset().top - navHeight + 2}, 300);
            };


            function navInitSet(type){
                if(window.scrollY > planNaviWrap.offsetTop) naviTemp.classList.add("nav");
                else naviTemp.classList.remove("nav");

                let currentEle = "";
                anchorSection.forEach(ele => {
                    let sectionTop = ele.offsetTop - navHeight - 2;
                    let sectionH = sectionTop + ele.offsetHeight;

                    if(window.scrollY >= sectionH) {
                        naviItem.forEach(menu => {
                            menu.classList.remove("on");
                            naviWrap.classList.add("notApply");
                        });
                        return false;
                    }

                    if(window.scrollY >= sectionTop) {currentEle = ele.id;}
                });
    
                naviItem.forEach(menu => {
                    menu.classList.remove("on");
                    if(menu.querySelector("a").hash.replace("#","") == currentEle) {
                        menu.classList.add("on");
                        naviWrap.classList.remove("notApply");
                    }
                });
    
                moveSlide();

                if(type !== "scroll" && naviItemWidth > naviWrapWidth){ 
                    naviTemp.setAttribute('data-itemtype', 'rolling');
                    var visual_swiper = new Swiper('.navi_wrap .swiper-container', {
                        slidesPerView:"auto",
                        speed : 700
                    });
                };
            };
    
            function moveSlide(){
                let width = 0;
                let maxScroll = naviWrap.scrollWidth - naviWrapWidth;
                for(let i = 0 ; i < naviItem.length; i++){
                    if(!naviItem[i].classList.contains('on')){
                        width+= naviItem[i].offsetWidth;
                    }else{
                        width = width > maxScroll ? maxScroll : width;
                        naviWrap.style.transform = "translate3d(-" + width + "px, 0px, 0px)";
                        return false;
                    };
                };
            };
        }
    };

    jQuery('.naviTemplate_area').length && setTimeout(() => planNavi.init(), 500);

    // 브랜드 소개 이미지 영역 --> templates/Temp_slidePrdctIntrd.jsp
    // 이미지 슬라이드 템플릿  --> /WEB-INF/front/planshop/templates/plan_type09.jsp
    var slideSwiper = {
        init:function(){
            var slideWrap = document.querySelectorAll('.temp_slider[data-pagination-type="bullet"] .slide_img_area');
            slideWrap.forEach(ele => {
                ele.querySelectorAll("ul li").forEach(ele => {
                    if(!ele.classList.contains("swiper-slide")) ele.classList.add("swiper-slide");
                })
                if(ele.querySelectorAll("ul li").length > 1){
                    var slideWrapSwiper = new Swiper(ele, {
                        loop: true,
                        slidesPerView: 'auto',
                        centeredSlides: true,
                        autoplay: 3000,
                        autoplayDisableOnInteraction:false,
                        speed : 300,
                        pagination: '.swiper-page',
                        paginationType: 'bullets',
                        preloadImages: false,
                        lazyLoading: true,
                        lazyLoadingInPrevNext: true,
                        watchOverflow: true 
                    });
                }else{
                    ele.querySelector(".swiper-page").remove();
                }
            })
        }
    }
    jQuery('.slide_img_area').length && slideSwiper.init();

    //MD 롤링
    var rollSwiper = {
        init:function(){
            var displayRollWrap = document.querySelectorAll(".planshop_display_area[data-type='rolling'] .swiper-container");
            displayRollWrap.forEach(ele => {
                if(ele.querySelectorAll(".goods_item").length > 0){
                    var rollSwiper = new Swiper(ele, {
                        slidesPerView: 'auto',
                        loop:false,
                        spaceBetween: 15,
                        observer: true,
                        observeParents: true,
                        autoPlay:true,
                        centeredSlides: true,
                        pagination: '.swiper-pagination',
                        paginationType: 'fraction',
                        lazyLoading: true,
                        lazyLoadingInPrevNext: true
                    });
                }
            })
        }
    }
    jQuery(".planshop_display_area[data-type='rolling']").length && rollSwiper.init();
};