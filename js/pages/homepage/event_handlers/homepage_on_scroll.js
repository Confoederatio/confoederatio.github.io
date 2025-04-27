//Declare local element variables
var about_me_section = document.getElementById("about-me-section");
var homepage_banner_el = document.getElementById("homepage-banner");

var last_scroll_top = 0;

window.onscroll = function (e) {
  //Declare local instance variables
  var delta_y = window.pageYOffset || document.documentElement.scrollTop;
  var vh_scroll = window.scrollY/window.innerHeight;

  //Event handler functions
  parallaxLabelOnScroll();
  triumphAndTragedyOnScroll();

  //Parallax scrolling for other labels
  homepageAboutOnScroll();
  if (ministratMapScrollHandler(e)) return;

  //Initialise parallax_scroll_progress if not defined
  if (!window.parallax_scroll_progress) window.parallax_scroll_progress = 0;

  //Lock to second viewport when scrollign the project gallery
  var scroll_position = Math.round(window.scrollY);
  var parallax_gallery_top = window.innerHeight;
  var parallax_gallery_bottom = window.innerHeight*2;

  var scroll_direction = (scroll_position > last_scroll_top) ? "down" : "up";

  window.last_scroll_top = scroll_position

  if (scroll_position >= parallax_gallery_top) {
    //Check if user has already scrolled to the very end
    if (parallax_scroll_progress <= 100)
      document.getElementById("project-parallax-anchor").scrollIntoView({
        behavior: "instant"
      });
  }
  if (scroll_position <= parallax_gallery_top)
    if (parallax_scroll_progress >= 50)
      if (scroll_direction == "up")
        document.getElementById("project-parallax-anchor").scrollIntoView({
          behavior: "instant"
        });
};
