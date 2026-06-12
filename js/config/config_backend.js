window.config = {}; //[WIP] - Config
config.homepage = {
  js_files: [
    //Icoemi
    "js/UF/icoemi/icoemi.js",
    
    //Head files
    "js/UF/animation/basic_animation.js",
    "js/UF/arrays/basic_arrays.js",
    "js/UF/arrays/conversion_arrays.js",
    "js/UF/arrays/dataframes_arrays.js",
    "js/UF/arrays/maths_arrays.js",
    "js/UF/arrays/search_sort_arrays.js",
    "js/UF/BrowserUI/basic_html.js",
    "js/UF/BrowserUI/context_menus.js",
    "js/UF/BrowserUI/groups_framework.js",
    "js/UF/BrowserUI/hierarchy_framework.js",
    "js/UF/BrowserUI/WebComponent.js",
    "js/UF/class/class_basic.js",
    "js/UF/colours/basic_colours.js",
    "js/UF/date/basic_date.js",
    "js/UF/date/history_date.js",
    "js/UF/log/basic_log.js",
    "js/UF/numbers/basic_numbers.js",
    "js/UF/numbers/ranges_numbers.js",
    "js/UF/objects/basic_objects.js",
    "js/UF/objects/maths_objects.js",
    "js/UF/objects/smart_search_objects.js",
    "js/UF/pathfinding/a_star_pathfinding.js",
    "js/UF/strings/basic_strings.js",
    "js/UF/strings/cleaning_strings.js",
    "js/UF/strings/split_strings.js",
    
    //Viewport 1
    "js/pages/homepage/viewport_1/HomepageBanner.js",
    
    //Viewport 2
    "js/pages/homepage/viewport_2/HomepageGallery.js",
    
    //Viewport 3
    "js/pages/homepage/viewport_3/homepage_about_animation.js",
    
    //Config files
    "js/config/homepage/gallery_tiles/gallery_tiles26.js"
  ],
  
  defines: {
    common: {
      selectors: {
        //Viewport 1
        viewport_one: {
          //Element selectors
          about_body_container: document.getElementById("about-body-container"),
          about_me_overlay_title: document.getElementById("about-me-overlay-title"),
          about_me_overlay_subtitle: document.getElementById("about-me-overlay-subtitle"),
          biography_overlay_subtitle: document.getElementById("biography-overlay-subtitle")
        },
        
        //Viewport 2
        viewport_two: {
          //Core elements
          gallery_width: 500, //Gallery width in vh
          scene: document.getElementById("scene"),
          
          //Bookmark selectors
          bookmark_container: document.getElementById("project-parallax-bookmark-container"),
          bookmark_label: document.getElementById("project-parallax-bookmark-labels-container"),
          bookmark_minimise_btn: document.getElementById("project-parallax-bookmark-minimise-icon"),
          bookmark_scroll_x: 0,
          bookmark_preview_container: document.getElementById("project-parallax-preview-container"),
          bookmark_no_label: document.getElementById("project-parallax-no-bookmark-label"),
          bookmark_old_index: 1,
          bookmark_selected: "",
          bookmark_items: [],
          no_bookmark_label: document.getElementById("project-parallax-no-bookmark-label"),
          
          //Content panel selectors
          content_panel_container: document.getElementById("main-parallax-content-panel-wrapper"),
          content_panel_scroll_container: document.getElementById("main-parallax-content-panel-scroll-wrapper"),
          content_panel_update_paused: false,
          
          //Parallax selectors
          parallax_body: document.getElementById("project-parallax-container"),
          parallax_container: document.getElementById("project-parallax-scroll-container"),
          parallax_buttons: document.getElementById("project-parallax-dots-container"),
          parallax_scroll_indicator: document.getElementById("project-parallax-scroll-fill-indicator"),
          parallax_current_scroll_x: 0,
          parallax_scroll_x: 0,
          parallax_selected: [],
          parallax_pinned_items: []
        },
        
        //Viewport 3
        viewport_three: {
          
        }
      }
    }
  },
  
  //Config parsers
  banner: {},
  gallery: {},
};
