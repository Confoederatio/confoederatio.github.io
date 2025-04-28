//Initialise functions
{
  function closeContentPanel (arg0_element_id) {
    //Convert from parameters
    var local_el = document.getElementById(`${arg0_element_id}-content-panel`);
    var gallery_obj = main.gallery;
    console.log(arg0_element_id);

    //Replace 'shown' class with nothing
    local_el.setAttribute("class",
      local_el.getAttribute("class").replace(" shown", "")
    );
    gallery_obj.parallax_scroll_indicator.style.opacity = 1;
  }

  function getMaximisedContentPanel () {
    //Declare local instance variables
    var maximised_content_panel = document.querySelector(".parallax-item-content-panel.shown.maximised");

    //Return statement
    return (maximised_content_panel) ? maximised_content_panel.id.replace("-content-panel", "") : undefined;
  }

  function hideAllContentPanels () {
    //Declare local instance variables
    var all_shown_content_panels = document.querySelectorAll(".parallax-item-content-panel.shown");

    //Iterate over them and remove 'shown' class
    for (var i = 0; i < all_shown_content_panels.length; i++) all_shown_content_panels[i].setAttribute("class",
      all_shown_content_panels[i].getAttribute("class").replace(" shown", "")
    );
  }

  function getMaximisedContentPanel () {
    //Declare local instance variables
    var maximised_content_panel = document.querySelector(".parallax-item-content-panel.shown.maximised");

    //Return statement
    return (maximised_content_panel) ? maximised_content_panel.id.replace("-content-panel", "") : undefined;
  }

  function maximiseContentPanel (arg0_element_id) {
    //Declare local instance variables
    var local_id = arg0_element_id;

    var local_element = document.getElementById(`${arg0_element_id}-content-panel`);
    var maximise_btn = document.getElementById(`${arg0_element_id}-maximise-btn`);
    var gallery_obj = main.gallery;

    //Reset container styling
    try {
      gallery_obj.content_panel_update_paused = true;
      gallery_obj.content_panel_container.setAttribute("style", `
        transform-style: preserve-3d;
        backface-visibility: hidden;
        position: relative;
        display: block;
        left: 0vh;
        top: 0px;
        transition: all 2s ease;
      `);
      gallery_obj.content_panel_scroll_container.setAttribute("style", `
        transition: all 2s ease;
      `);

      //Apply maximised class
      if (!local_element.getAttribute("class").includes("maximised"))
        local_element.setAttribute("class",
          local_element.getAttribute("class") + " maximised"
        );

      maximise_btn.setAttribute("onclick", `minimiseContentPanel('${local_id}');`);
      gallery_obj.parallax_scroll_indicator.style.opacity = 0;
    } catch (e) {
      console.error(e);
    }
  }

  function minimiseContentPanel (arg0_element_id, arg1_instant) {
    //Declare local instance variables
    var local_element = document.getElementById(`${arg0_element_id}-content-panel`);
    var local_id = arg0_element_id;
    var is_instant = arg1_instant;
    var minimise_btn = document.getElementById(`${arg0_element_id}-maximise-btn`);
    var gallery_obj = main.gallery;

    //Reset container styling to default
    gallery_obj.content_panel_update_paused = false;

    //Reset container styles to match the parallax scene
    var main_parallax_scene = document.querySelector(".layer.main");
    gallery_obj.content_panel_container.setAttribute("style", main_parallax_scene.getAttribute("style"));
    gallery_obj.content_panel_scroll_container.setAttribute(
      "style",
      `transform: perspective(40em) rotateX(${parseInt(window.perspective_deg_y.replace("deg", ""))*0.5}deg) translateX(${gallery_obj.parallax_scroll_x}vh);`
    );

    //Hide maximised class
    local_element.setAttribute("class",
      local_element.getAttribute("class").replace(" maximised", "") + ((!is_instant) ? " being-minimised" : " instant-minimisation")
    );
    //Remove being-minimised class to stop animation
    setTimeout(function(){
      local_element.setAttribute("class",
        local_element.getAttribute("class").replace(" being-minimised", "").replace(" instant-minimisation", "")
      );
    }, (!is_instant) ? 1000 : 500);

    minimise_btn.setAttribute("onclick", `maximiseContentPanel('${local_id}');`);
    gallery_obj.parallax_scroll_indicator.style.opacity = 1;
  }

  function toggleContentPanel (arg0_element_id) {
    //Convert from parameters
    var local_el = document.getElementById(`${arg0_element_id}-content-panel`);
    var local_id = arg0_element_id;
    var gallery_obj = main.gallery;

    try {
      //Declare local instance variables
      var all_hover_elements = document.querySelectorAll(":hover");
      var is_valid = true;
      var pre_check = local_el.getAttribute("class").includes("shown");
      var was_maximized = local_el.getAttribute("class").includes("maximised");

      //Check to see that no hover elements have an onclick parameter that does not include toggleContentPanel()
      for (var i = 0; i < all_hover_elements.length; i++) try {
        is_valid = (!all_hover_elements[i].getAttribute("onclick").includes("toggleContentPanel")) ? false : is_valid;
      } catch {}

      if (is_valid) {
        //Apply shown class if not shown, hide if shown
        hideAllContentPanels();
        if (local_el) if (!pre_check) {
          //Reset container styles to match the parallax scene
          var main_parallax_scene = document.querySelector(".layer.main");
          gallery_obj.content_panel_container.setAttribute("style", main_parallax_scene.getAttribute("style"));
          gallery_obj.content_panel_scroll_container.setAttribute(
            "style",
            `transform: perspective(40em) rotateX(${parseInt(window.perspective_deg_y.replace("deg", ""))*0.5}deg) translateX(${gallery_obj.parallax_scroll_x}vh);`
          );
          
          local_el.setAttribute("class",
            local_el.getAttribute("class") + " shown"
          );

          //If panel was previously maximized, restore that state
          if (was_maximized)
            maximiseContentPanel(local_id);
        } else {
          hideAllContentPanels();
        }
      }

      //Reset perspective to default first if needed
      if (document.querySelector(".parallax-item-content-panel.maximised") && getMaximisedContentPanel() != local_id)
        gallery_obj.content_panel_update_paused = false;
      if (getMaximisedContentPanel())
        if (getMaximisedContentPanel() != local_id || !gallery_obj.content_panel_update_paused)
          minimiseContentPanel(getMaximisedContentPanel(), true);
    } catch (e) {
      console.error("Error in toggleContentPanel:", e);
    }
  }

  function updateContentPanelContainer () {
    //Declare local instance variables
    var main_parallax_scene = document.querySelector(".layer.main");
    var gallery_obj = main.gallery;

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
      }
    } catch {}
  }
}