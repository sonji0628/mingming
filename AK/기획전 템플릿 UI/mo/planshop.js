////// 기획전 상단 템플릿 //////
if(document.querySelector(".planshoptmp") !== null) planshopView();
function planshopView(){
    let planshopSection = document.querySelector(".planshoptmp");
    let textSection =  document.querySelector(".planshoptmp .textArea");
    let mainImgSection = document.querySelector(".planshoptmp .imgArea");
    let goodsImgSection = document.querySelector(".planshoptmp .goods_imgBox");
    //
    if(planshopSection.children.length == 1 && planshopSection.children[0].classList.contains("textArea")) planshopSection.dataset.plantype="textType";
    else planshopSection.dataset.plantype="imgType";

    if(mainImgSection.children.length == 1) {
        textSection.dataset.textAlign="left";
        mainImgSection.dataset.imgtype="normal";
    }else if(mainImgSection.children.length > 1) {
        textSection.dataset.textAlign="center";
        mainImgSection.dataset.imgtype="fadeType";
    }

    let fadeType = planshopSection.querySelector('[data-imgtype="fadeType"]');
    let slideType = planshopSection.querySelector('[data-imgtype="slideType"]');

    window.addEventListener('DOMContentLoaded', function(){
        planshopSection.style.display = "grid";
        if(fadeType !== null) setData(fadeType);
        if(slideType !== null) setData(slideType);
        if(fadeType !== null) setHeight(fadeType);
        textMove();
    });

    function textMove(){
        if(matchMedia("screen and (max-width: 767px)").matches){
            if(slideType == null) textSection.style.cssText = "align-self:self-end;bottom:clamp(25px,10vw,48px);";
            else                  textSection.style.bottom = "calc(260px + 10vw)";
        }else{
            textSection.style.cssText = "";
        }
    }
    window.addEventListener('resize', function(){
        setHeight(fadeType);
        textMove();
        clearTimeout(timeOut);
        fadeTimeout();
        if(slideType !== null) {
            let myItemWrap = slideType.querySelectorAll("ul");
            let imgItem = myItemWrap[0].querySelectorAll("li");
            let setWidth = imgItem[0].offsetWidth * imgItem.length;
            myItemWrap.forEach(ele => ele.style.cssText = "width:"+ setWidth + "px; animation-duration:" + setWidth/10 + "s");
        }
    });
    //

    function setHeight(el){
        if(el !== null){
            let imgTag = el.querySelectorAll("li");
            let temp = 0;
            let imgArr = [];
            imgTag.forEach(ele => {
                imgArr.push(ele.children[0].clientHeight);
                if(Math.max.apply(null, imgArr) == 0) el.style.height = ele.children[0].clientHeight + "px";
                else el.style.height = Math.max.apply(null, imgArr) + "px";
                if(matchMedia("screen and (max-width: 767px)").matches){
                    ele.style.transform = "translate3d(0px, -" + temp + "px, 0px)";
                    temp = temp + ele.clientHeight;
                }else{
                    ele.style.transform = "";
                    temp = temp + ele.clientWidth;
                }
            })
            
        }
    }
    function setData(el){
        slideSet(el);
        fadeRollImg(el);
    }

    function wrap(el, wrapper, type, className) {
        if(type == "in") el.innerHTML = `<${wrapper} class="${className}">${el.innerHTML}</${wrapper}>`
        else if(type == "out") el.outerHTML = `<${wrapper} class="${className}">${el.outerHTML}</${wrapper}>`
    }

    function slideSet(el){
        if(el.children.length > 1){
            let imgTag = el.classList.contains("goods_imgBox") ? el.querySelectorAll("a") : el.querySelectorAll("img");
            imgTag.forEach(ele => wrap(ele, "li", "out", "img-slide"));
            if(el.dataset.imgtype == "slideType") wrap(el, "ul", "in", "img-wrapper");
        }
        el.classList.add("img-container");
        el.parentElement.dataset.plantype = "slideType";
    }

    function fadeRollImg(el){
        let imgWrap = el.querySelector("ul");
        let imgItem = el.querySelectorAll("li");

        switch(el.dataset.imgtype){
        case "fadeType" :
            if(el.querySelectorAll("li").length % 2 !== 0) el.querySelectorAll("li")[el.querySelectorAll("li").length - 1].remove();
            $(el).find("li:even").addClass("right");
            $(el).find("li:odd").addClass("left");
            $(el).find("li.right").wrapAll("<ul class='float_wrap'></ul>");
            $(el).find("li.left").wrapAll("<ul class='float_wrap'></ul>");
            imgItem.forEach(ele => ele.setAttribute("data-hidden", "true"));           
            fadeTimeout();
        break;
        case "slideType" :
            imgWrap.classList.add("roller");

            let parentWidth = el.parentElement.clientWidth;
            let myListWidth = imgWrap.offsetWidth;

            if(myListWidth > parentWidth){
                let roller = el.querySelector('.roller');
                imgWrap.setAttribute("data-clone", "original");
                el.style.justifyContent = "flex-start";

                let clone = roller.cloneNode(true);
                el.appendChild(clone).setAttribute("data-clone", "clone");
                
            }
            let setWidth = imgItem[0].offsetWidth * imgItem.length;
            imgWrap.style.width = setWidth + 'px';
            el.querySelectorAll("ul").forEach(ele => ele.style.animationDuration = setWidth/10 + "s");
        break;
        }
    }

    

    let i = 0;
    let count = 0;
    let timeOut = '';
    function fadeTimeout(){
        let item = fadeType.querySelectorAll("li");
        let liWrap = fadeType.querySelectorAll(".float_wrap");
        if(matchMedia("screen and (max-width: 767px)").matches){
            i = i === (item.length - 1) ? 0 : i + 1;
            item.forEach(ele => ele.setAttribute("data-hidden", "true"));
            item[i].setAttribute("data-hidden", "false");
        }else{
            i = i >= (liWrap[0].children.length - 1) ? 0 : i + 1;
            item.forEach(ele => ele.setAttribute("data-hidden", "true"));
            liWrap.forEach(ele => ele.children[i].setAttribute("data-hidden", "false"));
        }
        let myTimeout = count !== 0 ? 3000 : 100;
        timeOut = setTimeout(fadeTimeout, myTimeout);
        count = 1;
    }
}
////// 기획전 상단 템플릿 끝 //////

