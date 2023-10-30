let navMenuToggled = false;

$("#mobile-navmenu-toggle").on("click", (e) => {
    $("#mobile-navmenu").toggleClass("navmenu-hidden");
    navMenuToggled = !navMenuToggled;
});

$("#header").on("mouseenter", () => {
    $("#header").css("background-color", "rgba(32, 32, 32, 0.81)");
});

$("#header").on("mouseleave", () => {
    if (!navMenuToggled) {
        $("#header").css("background-color", "rgba(32, 32, 32, 0.25)");
    }
});

$("#mobile-navmenu li").on("mouseenter", (e) => {
    //get the .a-underline child element of the li
    let underline = $(e.currentTarget).children(".a-underline");
    // add class show
    underline.addClass("show");
})
$("#mobile-navmenu li").on("mouseleave", (e) => {
    //get the .a-underline child element of the li
    let underline = $(e.currentTarget).children(".a-underline");
    // remove class show
    underline.removeClass("show");
})