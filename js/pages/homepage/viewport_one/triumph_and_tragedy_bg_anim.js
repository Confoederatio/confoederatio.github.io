//Declare global scroll offsets
var triumph_and_tragedy_bg_offsets = [
  0,
  1,
  1.025,
  1.05,
  1.075,
  1.1,
  1.125,
  1.15,
  1.175
];

//Initialised in scroll scope
function triumphAndTragedyOnScroll () {
  //Set vertical offset
  var scroll_y = window.pageYOffset;
  var triumph_and_tragedy_bg_elements = document.querySelectorAll(".homepage-banner-triumph-and-tragedy-bg img");

  for (var i = 0; i < triumph_and_tragedy_bg_elements.length; i++) {
    var translate_y = scroll_y*triumph_and_tragedy_bg_offsets[i];
    triumph_and_tragedy_bg_elements[i].setAttribute("style", `
      transform: translateY(${translate_y}px);
    `);
  }
}
