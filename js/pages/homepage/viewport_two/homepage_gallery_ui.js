//Initialise functions
{
  function initGalleryDesktopEventHandlers () {
    //Declare local instance variables
    var gallery_obj = main.gallery;

    //Set event listeners
    gallery_obj.parallax_body.addEventListener("mousemove", (e) => {
      //Define instance variables
      var half_width = gallery_obj.parallax_body.clientWidth/2,
        half_height = gallery_obj.parallax_body.clientHeight/2,
        mouse_x = half_width + gallery_obj.parallax_body.offsetLeft - e.pageX,
        mouse_y = half_height + gallery_obj.parallax_body.offsetTop - e.pageY;

      //Restrict mouse movement by 32x if a content panel is maximised
      if (gallery_obj.content_panel_update_paused) {
        mouse_x = mouse_x/32;
        mouse_y = mouse_y/32;
      }

      var maximum_x_degrees = 1.25;
      var maximum_y_degrees = 1.25;

      //Calculate current degrees
      window.perspective_deg_x = ((mouse_y/half_height)*maximum_x_degrees*-1)+(maximum_x_degrees/2) + "deg";
      window.perspective_deg_y = ((mouse_x/half_width)*maximum_y_degrees*-1)+2 + "deg";

      //Apply 3D CSS to local element
      window.perspective_string = `rotateX(${perspective_deg_x}) rotateY(${perspective_deg_y})`;
      gallery_obj.scene.setAttribute(
        "style",
        `transform: perspective(20em) ${perspective_string};`
      );
    });

    //Translate vertical scroll to horizontal scroll
    gallery_obj.parallax_body.addEventListener("wheel", (e) => {
      //Declare local instance variables
      var scroll_enabled = true;
      var is_over_panel_container = false;
      var is_over_content_panel = false;
      
      //Check if we're over a panel container or content panel
      for (var i = 0; i < gallery_obj.panel_id_patterns.length; i++) {
        is_over_panel_container = (e.target.id.includes(gallery_obj.panel_id_patterns[i])) ? true : is_over_panel_container;
      }
      is_over_content_panel = e.target.closest('.parallax-item-content-panel') !== null;

      //If over a panel container or content panel, handle content panel scrolling
      if (is_over_panel_container || is_over_content_panel) {
        var hovered_element;
        var all_hover_elements = document.querySelectorAll(":hover");
        for (var i = 0; i < all_hover_elements.length; i++) {
          try {
            if (all_hover_elements[i].getAttribute("class") && 
                all_hover_elements[i].getAttribute("class").includes("content-wrapper")) {
              hovered_element = all_hover_elements[i];
              break;
            }
          } catch {}
        }

        if (hovered_element) {
          var container_height = hovered_element.querySelector(".text-wrapper").offsetHeight - hovered_element.offsetHeight;
          var current_scroll = Math.ceil(hovered_element.scrollTop);

          //Prevent scrolling if at bounds
          if ((e.deltaY < 0 && current_scroll == 0) || (e.deltaY > 0 && current_scroll >= container_height - 1)) {
            e.preventDefault();
            return;
          }
          
          //Allow content panel scrolling
          return;
        }
      }

      //Prevent default scroll behaviour from occurring so far as the scroll bounds have not been reached (conditional)
      gallery_obj.parallax_current_scroll_x = e.deltaY/gallery_obj.viewport_width/1.5;

      //Leftwards scroll bound
      scroll_enabled = (gallery_obj.parallax_current_scroll_x < 0 && gallery_obj.parallax_scroll_x > 0) ? false : scroll_enabled;

      //Rightwards scroll bound
      scroll_enabled = (gallery_obj.parallax_current_scroll_x > 0 && gallery_obj.parallax_scroll_x*-1 > gallery_obj.gallery_width) ? false : scroll_enabled;

      //Only prevent scrolling back to viewport 1 if we're not at the beginning of the gallery
      if (!isElementAtTop(gallery_obj.parallax_body) && e.deltaY < 0 && Math.abs(gallery_obj.parallax_scroll_x) >= 5) {
        e.preventDefault();
        return;
      }

      //Scrolling is disabled if any content panels are maximised and shown
      if (document.querySelectorAll(".maximised.shown").length != 0 || document.querySelectorAll(".preview-image:hover").length != 0) {
        scroll_enabled = false;
        e.preventDefault();
      }

      if (scroll_enabled && window.scrollY <= window.innerHeight*2.1) {
        //Make sure 100% of the screen is occupied
        if (parallax_scroll_progress > 5)
          scrollGalleryIntoView();

        //Flip it around to maintain intuitive direction
        gallery_obj.parallax_current_scroll_x = gallery_obj.parallax_current_scroll_x*-1;

        //Fetch current scroll and update translateX
        gallery_obj.parallax_scroll_x += gallery_obj.parallax_current_scroll_x;

        if (!gallery_obj.parallax_container.getAttribute("class").includes("fast-scroll"))
          gallery_obj.parallax_container.setAttribute("class",
            gallery_obj.parallax_container.getAttribute("class").replace(" slow-scroll", "") + " fast-scroll"
          );
        gallery_obj.parallax_container.style.transform = `translateX(${gallery_obj.parallax_scroll_x}vh)`;

        e.preventDefault();
      }

      window.parallax_scroll_progress = Math.abs(gallery_obj.parallax_scroll_x*(100/gallery_obj.gallery_width));
      gallery_obj.parallax_scroll_indicator.style.width = `${gallery_obj.parallax_scroll_x*(100/gallery_obj.gallery_width)*-1}vw`;
    });
  }

  function initGalleryMobileEventHandlers () {
    //Declare local instance variables
    var gallery_obj = main.gallery;
    var touch_start_x = 0;
    var touch_start_scroll_x = 0;

    //Set event listeners
    gallery_obj.parallax_body.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        var half_height = gallery_obj.parallax_body.clientHeight/2;
        var half_width = gallery_obj.parallax_body.clientWidth/2;
        var touch = e.touches[0];
        var mouse_x = half_width + gallery_obj.parallax_body.offsetLeft - touch.pageX;
        var mouse_y = half_height + gallery_obj.parallax_body.offsetTop - touch.pageY;

        if (gallery_obj.content_panel_update_paused) {
          mouse_x = mouse_x/32;
          mouse_y = mouse_y/32;
        }

        var maximum_x_degrees = 1.25;
        var maximum_y_degrees = 1.25;
        
        window.perspective_deg_x = ((mouse_y/half_height)*maximum_x_degrees*-1)+(maximum_x_degrees/2) + "deg";
        window.perspective_deg_y = ((mouse_x/half_width)*maximum_y_degrees*-1) + 2 + "deg";

        window.perspective_string = `rotateX(${perspective_deg_x}) rotateY(${perspective_deg_y})`;
        gallery_obj.scene.setAttribute(
          "style",
          `transform: perspective(20em) ${perspective_string};`
        );
      }

      //Scroll behaviour
      if (touch_start_x != null && e.touches.length == 1) {
        var delta_x = e.touches[0].clientX - touch_start_x;

        //Adjust sensitivity if needed (dividing delta_x)
        gallery_obj.parallax_scroll_x = touch_start_scroll_x + (delta_x/5);

        //Enforce scroll bounds
        if (gallery_obj.parallax_scroll_x > 0) gallery_obj.parallax_scroll_x = 0;
        if (gallery_obj.parallax_scroll_x*-1 > gallery_obj.gallery_width) gallery_obj.parallax_scroll_x = -gallery_obj.gallery_width;

        //Update UI
        gallery_obj.parallax_container.style.transform = `translateX(${gallery_obj.parallax_scroll_x}vh)`;
        e.preventDefault();
      }
    });

    gallery_obj.parallax_body.addEventListener("touchstart", (e) => {
      if (e.touches.length == 1) {
        touch_start_x = e.touches[0].clientX;
        touch_start_scroll_x = gallery_obj.parallax_scroll_x;
      }
    });

    gallery_obj.parallax_body.addEventListener("touchend", (e) => {
      touch_start_x = null;
      touch_start_scroll_x = null;
    });
  }

  //initGallery() - Hide all parallax elements that are dependencies by default
  function initGallery () {
    //Declare local instance variables
    var gallery_obj = main.gallery;
    var hide_elements = [];
    var parallax_elements = document.querySelectorAll(".parallax-item");

    //Iterate over all gallery elements
    for (var i = 0; i < parallax_elements.length; i++) {
      var parallax_obj = gallery_obj.parallax_settings[parallax_elements[i].id];

      //Other initialisation
      initParallaxElement(parallax_elements[i].id);

      //hide_elements can never contain elements that are pinned
      if (getParent(parallax_elements[i].id).length > 0 && !gallery_obj.parallax_pinned_items.includes(parallax_elements[i].id))
        hide_elements.push(parallax_elements[i].id);
    }
    hide_elements = unique(hide_elements);

    //Iterate over all hidden elements
    for (var i = 0; i < hide_elements.length; i++) {
      var local_el = document.getElementById(hide_elements[i]);
      var local_obj = gallery_obj.parallax_settings[local_el.id];

      local_el.setAttribute("class",
        local_el.getAttribute("class") + " hidden"
      );
      if (local_obj.animation)
        local_el.setAttribute("animation",
          `${local_obj.animation}`
        );
    }

    //Iterate over all bookmarked items; show bookmarks in preview area
    for (var i = 0; i < gallery_obj.bookmark_items.length; i++)
      addBookmarkItem(gallery_obj.bookmark_items[i], true);
  }
  
  function initGalleryUI () {
    //Declare local instance variables
    var gallery_obj = main.gallery;
  
    //Restrict parallax fluidity
    gallery_obj.parallax.scalar(12.5, 35);
  
    //Bookmark UI
    {
      gallery_obj.bookmark_minimise_btn.onclick = function () {
        (!gallery_obj.bookmark_minimise_btn.getAttribute("class").includes("minimised")) ? hideBookmarkUI() : showBookmarkUI();
      }
    }
  
    //Content Panel UI
    {
      setTimeout(function(){
        var all_content_titles = document.querySelectorAll(".parallax-item-content-panel-title");
        var all_content_panels = document.querySelectorAll(`#main-parallax-content-panel-wrapper .content-wrapper`);

        //Iterate over all_content_panels
        for (var i = 0; i < all_content_panels.length; i++) {
          var local_content_title = all_content_panels[i].querySelector(`div.parallax-item-content-panel-title`);
          var local_id = all_content_panels[i].id
            .replace("-content-panel", "")
            .replace("-content-wrapper", "");

          local_content_title.innerHTML = `${local_content_title.textContent}
            <img id = "${local_id}-close-btn" class = "content-panel-close-btn" src = "gfx/interface/icons/close_btn.png" draggable = "false" onclick = "closeContentPanel('${local_id}');">
            <img id = "${local_id}-maximise-btn" class = "content-panel-maximise-btn" src = "gfx/interface/icons/maximise_icon.png" draggable = "false" onclick = "maximiseContentPanel('${local_id}');">
            ${(document.getElementById(local_id + "-preview") ) ? `<img id = "${local_id}-preview-btn" class = "content-panel-preview-btn active" src = "gfx/interface/icons/preview_icon.png" draggable = "false" onclick = "togglePreview('${local_id}', this);">` : ""}
          `;
        }
      }, 500);
    }
  
    //Parallax event listeners for scrolling/panning around
    {
      initGalleryDesktopEventHandlers();
    }
  
    //Parallax gallery logic
    var parallax_gallery_logic = setInterval(function(){
      for (var i = 0; i < gallery_obj.parallax_selected.length; i++) {
        if (gallery_obj.parallax_settings[gallery_obj.parallax_selected[i]]) {
          var item_obj = gallery_obj.parallax_settings[gallery_obj.parallax_selected[i]];
  
          //Show dependencies if not already shown
          if (item_obj.dependencies) {
            for (var x = 0; x < item_obj.dependencies.length; x++) {
              var child_element = document.getElementById(item_obj.dependencies[x]);

              if (child_element)
                if (child_element.id) {
                  var child_obj = gallery_obj.parallax_settings[child_element.id];

                  if (child_obj)
                    if (child_element.getAttribute("class").includes(" hidden")) {
                      child_element.setAttribute("class", child_element.getAttribute("class").replace(" hidden", ""));
                      if (gallery_obj.parallax_settings[child_element.id].animation) {
                        var local_obj = gallery_obj.parallax_settings[child_element.id];
                        //Invoke show_function
                        local_obj.show_function();
                      }
                    }
                }
            }
          }
        }
      }
    }, 100);
  
    //Update content panel container
    var content_panel_container_logic = setInterval(function(){
      updateContentPanelContainer();
    }, 0);
  
    //Initialise the gallery
    initGallery();
  }

  function scrollGalleryIntoView () {
    //Declare local instance variables
    var anchor_el = document.getElementById("project-parallax-anchor");
    var y_position = anchor_el.getBoundingClientRect().top + window.pageYOffset;

    //Scroll gallery into view
    /*window.scrollTo({
      top: y_position,
      behavior: "auto"
    });
    setTimeout(function(){
      window.scrollTo({
        top: y_position,
        behavior: "instant"
      });
    }, 50);*/
    document.getElementById("project-parallax-anchor").scrollIntoView({
      behavior: "instant"
    });
  }
  
  function updateContentPanelContainer () {
    //Declare local instance variables
    var gallery_obj = main.gallery;
    var main_parallax_scene = document.querySelector(".layer.main");
  
    //Regular error trapping
    try {
      if (!gallery_obj.content_panel_update_paused) {
        gallery_obj.content_panel_container.setAttribute("style",
          main_parallax_scene.getAttribute("style")
        );
        gallery_obj.content_panel_scroll_container.setAttribute(
          "style",
          `transform: perspective(40em) rotateX(${parseInt(window.perspective_deg_y.replace("deg", ""))*0.5}deg) translateX(${gallery_obj.parallax_scroll_x}vh);`
        );
        gallery_obj.content_panel_container.style.left = `0vh`;
      }
    } catch {}
  }
}