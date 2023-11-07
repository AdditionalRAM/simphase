let navMenuToggled = false;
let menuList = [];
const header = $("#header");
let headerHovering = false;

$("#lets-scrum-menu a, #about-us-menu a").on('click', function (event) {
    // Check if current element is a child of lets-scrum
    if ($(this).parents("#lets-scrum-menu").length > 0 && window.location.href.indexOf("lets-scrum") === -1) {
        return;
    }
    // Check if current element is a child of about-us
    if ($(this).parents("#about-us-menu").length > 0 && window.location.href.indexOf("about-us") === -1) {
        return;
    }

    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        let targetOffset =  $(hash).offset().top - (0.1 * $(window).height()) // 10vh offset
        $('html, body').animate({
            scrollTop: targetOffset
        }, 800,"easeOutExpo", () => {
            scrollTop: targetOffset
        });
    }
});

function anyMenuToggled(){
    return menuList.length > 0;
}

function setMenuList(item, value){
    if(value){
        menuList.push(item);
    }
    else{
        menuList = menuList.filter((_item) => {
            return _item !== item;
        });
    }
    checkHeaderCSS();
}

function checkHeaderCSS(){
    // check if a #background-vid exists in the page, if not always opaque
    if($("#background-vid").length === 0 && !anyMenuToggled()){
        header.css("background-color", "rgba(32, 32, 32, 0.95)");
        return;
    }

    if (!anyMenuToggled() && !headerHovering) {
        header.css("background-color", "rgba(32, 32, 32, 0.35)");
    }
    else{
        header.css("background-color", "rgba(32, 32, 32, 0.81)");
    }
    // if screen is scrolled down more than 100vh, header should be opaque
    if ($(window).scrollTop() > $(window).height() && !anyMenuToggled()) {
        header.css("background-color", "rgba(32, 32, 32, 0.95)");
    }
}

$("#mobile-navmenu-toggle").on("click", (e) => {
    $("#mobile-navmenu").toggleClass("navmenu-mobile-hidden");
    navMenuToggled = !navMenuToggled;
    setMenuList("mobile-navmenu", navMenuToggled);
});

header.on("mouseenter", () => {
    headerHovering = true;
    checkHeaderCSS();
});

header.on("mouseleave", () => {
    headerHovering = false;
    checkHeaderCSS();
});

$(".navmenu li").on("mouseenter", (e) => {
    //get the .a-underline child element of the li
    let underline = $(e.currentTarget).children(".a-underline");
    // add class show
    underline.addClass("show");
})
$(".navmenu li").on("mouseleave", (e) => {
    //get the .a-underline child element of the li
    let underline = $(e.currentTarget).children(".a-underline");
    // remove class show
    underline.removeClass("show");
})

manageHeaderMenus("#lets-scrum-header", "#lets-scrum-menu", "lets-scrum");
manageHeaderMenus("#about-us-header", "#about-us-menu", "about-us");

function manageHeaderMenus(hoverID, menuID, menuListItem){
    let headerElement = $(hoverID);
    let menuElement = $(menuID);

    function functionOnResize() {
        checkHeaderCSS();
        let paddingLeft = parseFloat(menuElement.find("li").css("padding-left").replace('px', ''));
        let headerLeft = parseFloat(headerElement.offset().left);
        let headerTop = parseFloat(headerElement.offset().top) - $(window).scrollTop(); // Add the scroll position
        menuElement.css("left", headerLeft - paddingLeft + "px");
        menuElement.css("top", /*headerTop + */header.outerHeight() + "px");
    }
    functionOnResize();
    // $(window).on("resize", functionOnResize);
    headerElement.on('transitionend', functionOnResize);
    $(window).on("scroll", functionOnResize);
    

    let mouseOnMenu = false;
    // menu should be enabled if mouse is on menuElement OR headerElement
    menuElement.on("mouseenter", () => {
    mouseOnMenu = true;
    })
    menuElement.on("mouseleave", () => {
        mouseOnMenu = false;
        menuElement.addClass("navmenu-hidden");
        setMenuList(menuListItem, !menuElement.hasClass("navmenu-hidden"));
    });
    headerElement.on("mouseenter", () => {
        menuElement.removeClass("navmenu-hidden");
        setMenuList(menuListItem, !menuElement.hasClass("navmenu-hidden"));
    });
    headerElement.on("mouseleave", () => {
        setTimeout(() => {
            if(!mouseOnMenu)
            menuElement.addClass("navmenu-hidden");
            setMenuList(menuListItem, !menuElement.hasClass("navmenu-hidden"));
        }, 50);
        mouseOnMenu = false;
    });
}

