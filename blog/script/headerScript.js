$(function(){
});

let lastScrollTop = 0;
let isScrolling = false;
let isDesktop = window.matchMedia("screen and (min-width: 1024px)").matches;

const mediaQuery = window.matchMedia("screen and (min-width: 1024px)");
mediaQuery.addListener(e => isDesktop = e.matches);

$(window).on('scroll', () => {
    if (isDesktop) {
        $('header >div:nth-of-type(1)').stop(true, true).slideDown(100);
    } else if (!isScrolling) {
        isScrolling = true;
        setTimeout(() => {
            lastScrollTop = headerScroll(lastScrollTop);
            isScrolling = false;
        }, 250);
    }
});

function headerScroll(lastScrollTop) {
    let currentScrollTop = $(window).scrollTop();
    const $header = $('header >div:nth-of-type(1)');
    if (currentScrollTop > lastScrollTop) {
        $header.stop(true, true).slideUp(100);
    } else {
        $header.stop(true, true).slideDown(100);
    }
    return currentScrollTop;
}

function subMenuToggle(){
    if(document.getElementById("subMenu").style.right != "0px"){
        document.getElementById("subMenu").style.right = "0px";
    }else{
        document.getElementById("subMenu").style.right = "-100%"
    }
}