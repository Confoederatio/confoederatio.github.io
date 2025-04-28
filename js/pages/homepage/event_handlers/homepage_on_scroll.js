//Declare local element variables
var about_me_section = document.getElementById("about-me-section");
var homepage_banner_el = document.getElementById("homepage-banner");

var last_scroll_top = 0;

function initGlobalScrollEventHandler (e) {
  //Declare local instance variables
  var delta_y = window.pageYOffset || document.documentElement.scrollTop;
  var vh_scroll = (window.scrollY/window.innerHeight)*100;

  //Event handler functions
  fixMobileVh();
  parallaxLabelOnScroll();
  triumphAndTragedyOnScroll();

  //Parallax scrolling for other labels
  homepageAboutOnScroll();
  if (ministratMapScrollHandler(e)) return;

  //Initialise parallax_scroll_progress if not defined
  if (!window.parallax_scroll_progress) window.parallax_scroll_progress = 0;

  //Lock to second viewport when scrolling the project gallery
  var scroll_position = Math.round(window.scrollY);
  var parallax_gallery_top = window.innerHeight;
  var parallax_gallery_bottom = window.innerHeight*2;

  var scroll_direction = (scroll_position > last_scroll_top) ? "down" : "up";

  window.last_scroll_top = scroll_position;

  //Viewport 1 to Viewport 2 scroll handling
  if (vh_scroll > 100)
    if (parallax_scroll_progress <= 5)
      if (scroll_direction == "down")
        scrollGalleryIntoView();

  //Viewport 2 to Viewport 3 scroll handling
  if (vh_scroll < 100)
    if (parallax_scroll_progress >= 95)
      if (scroll_direction == "up")
        scrollGalleryIntoView();
}

window.onscroll = function (e) {
  initGlobalScrollEventHandler(e);
};
