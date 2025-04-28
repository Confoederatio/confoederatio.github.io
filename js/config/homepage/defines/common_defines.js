config.homepage.defines.common = {
  selectors: {
    //Viewport 1
    viewport_one: {
      //Element selectors
      about_me_body_text: document.getElementById("about-me-body-text"),
      about_me_overlay_title: document.getElementById("about-me-overlay-title"),
      about_me_overlay_subtitle: document.getElementById("about-me-overlay-subtitle"),
      biography_body_text: document.getElementById("biography-body-text"),
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
};
