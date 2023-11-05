$(document).ready(() => {
    let largeContainer = $(".larged-image");
    let largeImages = $(".largeable-image ");

    largeImages.on("click", (e) => {
        console.log("clicked")
        let image = $(e.currentTarget);
        let imageSrc = image.attr("src");
        
        largeContainer.addClass("show");
        largeContainer.children("img").attr("src", imageSrc);
        console.log(largeContainer);
    });

    // add click event to button inside large container
    largeContainer.children("button").on("click", (e) => {
        largeContainer.removeClass("show");
    });
});