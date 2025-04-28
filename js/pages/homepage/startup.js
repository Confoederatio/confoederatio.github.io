//Initialise main variable
window.main = {
  banner: {},
  gallery: {
    //Viewport dimensions
    viewport_height: document.documentElement.clientHeight/100,
    viewport_width: document.documentElement.clientWidth/100,

    //UI Patterns
    exempt_id_patterns: [
      "body-text",
      "btn",
      "content-panel", 
      "development-date",
      "divider",
      "indicator",
      "preview",
      "project-parallax-bookmark-label",
      "project-parallax-bookmark-minimise-icon",
      "project-parallax-bookmark-text-icon",
      "status",
      "text-wrapper",
      "title"
    ],
    panel_id_patterns: [
      "body-text",
      "content-panel",
      "development-date", 
      "divider",
      "indicator",
      "preview",
      "project-parallax-bookmark-label",
      "project-parallax-bookmark-minimise-icon",
      "project-parallax-bookmark-text-icon",
      "status",
      "text-wrapper",
      "title"
    ],

    //State variables
    can_scroll_further: false,
    closing_bookmark: false,

    //Parallax settings configuration
    parallax: new Parallax(document.getElementById("scene")),
    parallax_settings: {}
  },
  about: {
    y: 200 //scrollY in vh
  }
};

//Reset main.gallery.parallax
setTimeout(function(){
  main.gallery.parallax = new Parallax(document.getElementById("scene"));
  console.log(main.gallery.parallax.scalarX, main.gallery.parallax.scalarY);
}, 1000);

//Initialise main
var common_selectors = config.homepage.defines.common.selectors;

//Add common_selectors to main
var all_viewport_one_selectors = Object.keys(common_selectors.viewport_one);
var all_viewport_two_selectors = Object.keys(common_selectors.viewport_two);

//Iterate over all viewport one selectors
for (var i = 0; i < all_viewport_one_selectors.length; i++)
  main.banner[all_viewport_one_selectors[i]] = common_selectors.viewport_one[all_viewport_one_selectors[i]];
//Iterate over all viewport two selectors
for (var i = 0; i < all_viewport_two_selectors.length; i++)
  main.gallery[all_viewport_two_selectors[i]] = common_selectors.viewport_two[all_viewport_two_selectors[i]];

//There are two bodies for some reason! Where did that mess come from?
var all_bodies = document.querySelectorAll("body");
all_bodies[0].remove();

//Mobile temporary fix
if (isMobileDevice()) {
  window.alert(`You are on a mobile device.\n\nThis website is currently unoptimised for mobile devices. Please use a desktop computer to view this website. Experimental Patch: 015`);

  document.getElementById("about-me-section").setAttribute("class",
    document.getElementById("about-me-section").getAttribute("class") + " display-none"
  );
}

//Hack fix for glitched elements
setTimeout(function(){
  //Viewport 1
  //Start top-banner animation for homepage
  homepageBannerAnimation();

  settings_btn.setAttribute("class", "settings-btn hidden");

  //Viewport 2
  //Gallery
  initGalleryTiles();
  initGalleryUI();
  
  homepageAboutOnScroll();
}, 1);

setTimeout(function(){
  //General fix
  fixMobileVh();

  //Viewport 2
  //Initialise magnifiers for all .preview-image elements
  var all_art_preview_imgs = document.querySelectorAll(".preview-image-container");
  console.log(all_art_preview_imgs)

  for (var i = 0; i < all_art_preview_imgs.length; i++) magnify(
    all_art_preview_imgs[i].querySelector("img"),
    3
  );
}, 650);
