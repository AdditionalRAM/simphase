// check if any given element is in the viewport, considering offset from the bottom
function isElementInViewport(el, offset) {
  const rect = el.getBoundingClientRect();
  // the top of the element must be in the viewport, we don't care about the bottom
  return (
    rect.top >= 0 &&
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) - offset
  );
}

const offset = 100; // 100 pixels offset from the top of the viewport

let scrollEffectElements = undefined;
let documentReady = false;

// transition all elements with the class "scroll-effect" when they enter the viewport with an offset
$(document).ready(() => {
  documentReady = true;
  scrollEffectElements = $(".scroll-effect");
  transitionElements();
});

function transitionElements(){
  if(!documentReady) return;
  scrollEffectElements.each((index, element) => {
    if (isElementInViewport(element, offset)) {
      $(element).addClass("show");
      if ($(element).hasClass("yt-vid-holder")) {
        setTimeout(() => {
          $(element).addClass("unhide-video");
        }, 700);
      }
    }
  });
}

// on window scroll
$(window).on("scroll", () => {
  transitionElements();
});

// on document load, transition elements

