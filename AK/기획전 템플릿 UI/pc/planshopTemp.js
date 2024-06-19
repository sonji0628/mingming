// 팝업 열기/닫기
function popOpen(ele){
    ele.nextElementSibling.style.display="block";
}
function popClose(ele){
    ele.parentElement.style.display="none";
}

// 탭 클릭 이벤트
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
}

$(document).ready(function(){

    // 템플릿 타입 : 상품(끌어오기) --> plan_type13.jsp
    $(".planshopGoodsDisplayTemplate_area .slider, .planshop_display_area[data-type='rolling'] .slider").each(function(){
        var itemLength = $(this).find(".item_card").length;
        var itemViewLength = $(this).attr("data-item-length") !== undefined ? $(this).attr("data-item-length") : 4;
        var slider = $(this).bxSliderV2({
            stopAutoOnClick: true,
            auto: false,
            autoHover:true,
            pager: itemLength > itemViewLength ? true : false,
            touchEnabled: false,
            slideWidth: 1070 / itemViewLength,
            maxSlides : itemViewLength,
            minSlides : itemViewLength,
            moveSlides : itemViewLength,
            slideMargin : 26,
            autoControlsCombine: false,
            onSliderLoad: function(){
                if(itemLength <= 4) {
                    $(this).closest('.area').find('.bg_group').css('display','none');
                    $(this).closest('.area').find('.bx-controls').css('display','none');
                }
                var page_num = Math.ceil(this.getSlideCount() / 4);
                if(page_num <= 0) {
                    page_num = 1;
                }

                $(this).closest('.area').find('.bg_group .prev, .bg_group .next').html("<em>" + (this.getCurrentSlide() + 1) + "</em> / " + page_num);
            },
            onSlideNext: function() {
                var page_num = Math.ceil(this.getSlideCount() / 4);
                if(page_num <= 0) {
                    page_num = 1;
                }
                $(this).closest('.area').find('.bg_group .prev, .bg_group .next').html("<em>" + (this.getCurrentSlide() + 1) + "</em> / " + page_num);
            },
            onSlidePrev: function() {
                var page_num = Math.ceil(this.getSlideCount() / 4);
                if(page_num <= 0) {
                    page_num = 1;
                }

                $(this).closest('.area').find('.bg_group .prev, .bg_group .next').html("<em>" + (this.getCurrentSlide() + 1) + "</em> / " + page_num);
            },
            responsive: false
        });
        
        $(this).closest('.planshopGoodsDisplayTemplate_area.tabType').find(".planshop_section_tab_content").click(function() {
            slider.reloadSlider()
        });
    });

    //템플릿 타입 : 네비게이션 --> plan_type14.jsp
    let planNaviSet = {
        init : function(){
            let anchorSection = document.querySelectorAll(".plan_anchor_section");
            let naviTemp = document.querySelector(".naviTemplate_area");
            let naviWrap = naviTemp.querySelector(".navi_wrap .slider");
            let naviItem = naviWrap.querySelectorAll("li");
            let naviItemWidth = naviWrap.scrollWidth;
            let naviWrapWidth = naviWrap.offsetWidth;
            let maxScroll = naviItemWidth - naviWrapWidth;
            let containerTop = document.querySelector("#contents") !== null ? document.querySelector("#contents").offsetTop : 0;
            let navHeight = naviTemp.offsetHeight;
            let navTop = containerTop + naviTemp.offsetTop;

            let hashItem = document.querySelectorAll(".plantop_wrap a");

            /////////////
            navInitSet("set");
            addEventListener("scroll", e => navInitSet("scroll"));
            // naviItem.forEach(ele => ele.addEventListener("click", (function(){navAnchorAction(this)})));
            // 네비바 외에서도 사용 할 수 있도록 수정
            hashItem.forEach(ele => {
                if(ele.href.indexOf("#navi_id") != -1) ele.addEventListener("click", (function(){navAnchorAction(this)}));
            });
            ////////////

            function navAnchorAction(ele){
                naviTemp.classList.add("nav");
                event.preventDefault();
                $('html,body').animate({scrollTop:$(ele.hash).offset().top - navHeight + 2}, 300);
            };

            function navInitSet(type){
                if(window.scrollY > navTop) naviTemp.classList.add("nav");
                else naviTemp.classList.remove("nav");

                let currentEle = "";
                anchorSection.forEach(ele => {
                    let sectionTop = ele.offsetTop + containerTop - navHeight;
                    let sectionH = sectionTop + ele.offsetHeight;
                    
                    if(window.scrollY >= sectionH) {
                        naviItem.forEach(menu => {
                            menu.classList.remove("on");
                            naviWrap.classList.add("notApply");
                        });
                        return false;
                    }
                    if(window.scrollY >= sectionTop) {
                        currentEle = ele.id;
                        return false;
                    }
                    
                });

                naviItem.forEach(menu => {
                    menu.classList.remove("on");
                    if(menu.querySelector("a").hash.replace("#","") == currentEle) {
                        menu.classList.add("on");
                        naviWrap.classList.remove("notApply");
                    }
                });

                if(naviItemWidth > naviWrapWidth) {
                    if(type !== "scroll") {
                        naviTemp.setAttribute('data-itemtype', 'rolling');
                        navControlSet();
                    };

                    moveSlide();
                    navControlDisalbe();
                };
            };

            function moveSlide(){
                let width = 0, movedValue = 0, myIndex = 0, moveFlag = false;
                if(naviWrap){
                    for(let i = 0 ; i < naviItem.length; i++){
                        if(!naviItem[i].classList.contains('on')){
                            width+= naviItem[i].offsetWidth;
                        }else{
                            if(myIndex <= 1) {
                                naviWrap.scrollTo({left:0, behavior: "smooth"});
                                moveFlag = false;
                            }
                            else {
                                movedValue = width - naviItem[myIndex].offsetWidth - naviItem[myIndex - 1].offsetWidth;
                                naviWrap.scrollTo({left:movedValue, behavior: "smooth"});
                                moveFlag = true;
                            }
                            return [movedValue, moveFlag];
                        }
                        myIndex = i;
                    }
                }
            };
            function navControlSet(){
                let navControlsEle = document.createElement("div");
                navControlsEle.classList.add("nav-controls");
                navControlsEle.innerHTML = `<div class="nav-controls-direction">
                                                <a class="nav-prev" href="javascript:void(0);">Prev</a>
                                                <a class="nav-next" href="javascript:void(0);">Next</a>
                                            </div>`;
                naviWrap.after(navControlsEle);

                let wrapDiv = document.createElement("div");
                wrapDiv.classList.add("slider_wrap");
                naviWrap.parentElement.insertBefore(wrapDiv, naviWrap);
                wrapDiv.appendChild(naviWrap);

                let naviControl = navControlsEle.querySelectorAll(".nav-controls-direction a");
                naviControl.forEach(ele => ele.addEventListener("click", (function(){
                    let currentIndex = 0;
                    naviItem.forEach((ele,index) => {if(ele.classList.contains("on")) currentIndex = index});
                    
                    let naviScrollLeft = naviWrap.scrollLeft;
                    let minScroll = naviItem[0].offsetWidth + naviItem[1].offsetWidth;
                    let lastNaviItemWidth = naviItem[naviItem.length - 1].offsetWidth + naviItem[naviItem.length - 2].offsetWidth;
                    let nextWidth = currentIndex < (naviItem.length - 1) ? naviItem[currentIndex].offsetWidth + naviItem[currentIndex + 1].offsetWidth : naviItem[currentIndex].offsetWidth;
                    let prevWidth = currentIndex >= 1 ? naviItem[currentIndex].offsetWidth + naviItem[currentIndex - 1].offsetWidth : naviItem[currentIndex].offsetWidth;
                    let prevScroll = naviScrollLeft - prevWidth < minScroll ? 0 : naviScrollLeft - prevWidth;
                    let nextScroll = maxScroll - naviScrollLeft < lastNaviItemWidth ? maxScroll : naviScrollLeft + nextWidth;
                    if(ele.classList.contains("nav-prev")){
                        naviWrap.scrollTo({left:prevScroll, behavior: "smooth"});

                        if(minScroll >= naviScrollLeft - prevWidth) naviTemp.querySelector(".nav-prev").classList.add("disable");
                        else                                        naviControl.forEach(ele => ele.classList.remove("disable"));
                    }else {
                        naviWrap.scrollTo({left:nextScroll, behavior: "smooth"});

                        if(naviScrollLeft + nextWidth >= maxScroll) naviTemp.querySelector(".nav-next").classList.add("disable");
                        else                                        naviControl.forEach(ele => ele.classList.remove("disable"));
                    }
                })));
            };

            function navControlDisalbe(){
                let movedValue = moveSlide() !== undefined ? moveSlide() : [0, false];
                if(!movedValue[1] || movedValue[0] <= 0) naviTemp.querySelector(".nav-prev").classList.add("disable");
                else naviTemp.querySelector(".nav-prev").classList.remove("disable");

                if(movedValue[0] >= maxScroll) naviTemp.querySelector(".nav-next").classList.add("disable");
                else naviTemp.querySelector(".nav-next").classList.remove("disable");
            };
        }
    };

    if(document.querySelector(".naviTemplate_area") !== null){
        if(document.querySelector(".planshoptmp") !== null) {
            $(".planshoptmp").ready(function(){
                setTimeout(() => planNaviSet.init(), 500);
            });
        }else{
            planNaviSet.init();
        }
    };


    // 브랜드 소개 이미지 영역 --> templates/Temp_slidePrdctIntrd.jsp
    // 이미지 슬라이드 템플릿  --> /WEB-INF/front/planshop/templates/plan_type09.jsp
    $('.temp_slider[data-pagination-type="bullet"] .slide_img_area > ul').each(function(){
        var slideBnnrLeng = $(this).find('li').length;
        $(this).bxSliderV2({
            mode: 'horizontal',
            speed: 500,
            maxSlides: 1,
            controls: (slideBnnrLeng > 1) ? true: false,
            auto: true,
            infiniteLoop: true,
            pager: (slideBnnrLeng > 1) ? true: false,
            randomStart:true,
            touchEnabled : false,
            autoHover: true
        });
    });

});