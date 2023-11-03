// Function to check if an element is in the viewport with an offset
function isElementInViewport(element, offset) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Offset value (adjust as needed)
  var offset = 100; // Example: 100 pixels offset from the top of the viewport
  
  // transition all elements with the class "scroll-effect" when they enter the viewport with an offset
  var scrollEffectElements = $(".scroll-effect");
  
  // on window scroll
  $(window).on("scroll", function () {
    // for each element with the class "scroll-effect"
    scrollEffectElements.each(function (index, element) {
      // if the element is in the viewport with the specified offset
      if (isElementInViewport(element, offset)) {
        // add the class "show" to initiate the transition
        $(element).addClass("show");
        if($(element).hasClass("yt-vid-holder")){
            // set time out 600ms $(element).removeClass("hide-video");
            setTimeout(function(){
                $(element).addClass("unhide-video");
            }, 700);
        }
      }
    });
  });