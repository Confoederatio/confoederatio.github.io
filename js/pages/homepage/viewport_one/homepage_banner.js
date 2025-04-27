//Homepage Banner modification functions
{
  function homepageBannerCentreAlign () {
    title_element.setAttribute("alignment", "centre");

    //Update selected button in settings
    var all_alignments = document.querySelectorAll(".text-alignment-button");
    for (var i = 0; i < all_alignments.length; i++) all_alignments[i].setAttribute("class", "text-alignment-button");
    document.getElementById("change-centre-alignment").setAttribute("class", "text-alignment-button selected");
  }

  function homepageBannerChangeBanner (arg0_new_banner) {
    //Convert from parameters
    var new_banner = arg0_new_banner;

    //Set dot indicator to active
    homepageBannerClearAllDots();
    document.getElementById("change-banner-btn-" + new_banner).setAttribute("class", "homepage-banner-change-bg-btn active");

    //Update settings UI
    var all_bg_btn_elements = document.querySelectorAll(".change-bg-container .change-bg-select-option-container");
    for (var i = 0; i < all_bg_btn_elements.length; i++) all_bg_btn_elements[i].setAttribute("class", "change-bg-select-option-container");

    document.getElementById("change-bg-" + new_banner + "-container").setAttribute("class", "change-bg-select-option-container selected");

    //Switch to new banner
    current_banner = new_banner;
    switch (new_banner) {
      case "cleveland_fog":
        homepageBannerHideAllElements(cleveland_national_forest_bg);
        break;
      case "lava_lamp":
        homepageBannerHideAllElements(lava_lamp_bg);
        lava_lamp_animation_paused = false;
        break;
      case "main_video":
        homepageBannerHideAllElements(main_video_bg);
        //Play main_video_bg
        main_video_bg.currentTime = 0;
        main_video_bg.play();
        break;
      case "misty_forest":
        homepageBannerHideAllElements(misty_forest_bg);
        //Play misty_forest_bg
        misty_forest_bg.currentTime = 0;
        misty_forest_bg.play();
        break;
      case "rain":
        homepageBannerHideAllElements(raindrop_bg);
        raindrop_animation_paused = false; //Saves performance
        break;
      case "triumph_and_tragedy":
        homepageBannerHideAllElements(triumph_and_tragedy_bg);
        break;
    }
  }

  function homepageBannerChangeFont (arg0_new_font) {
    //Convert from parameters
    var new_font_family = arg0_new_font;

    //Declare instance variables
    var font_obj = banner_settings.fonts[new_font_family];

    //Apply font
    current_font = new_font_family;
    banner_title_text.style.fontFamily = font_obj.name;
    banner_caret_element.style.fontFamily = font_obj.name;
    banner_caret_spacer_element.style.fontFamily = font_obj.name;

    currently_selected_font.style.fontFamily = font_obj.name;

    //Update settings UI
    var new_font_weight_value = parseInt(banner_title_text.style.fontWeight);
    new_font_weight_value = new_font_weight_value/((font_obj.font_weight[1]-font_obj.font_weight[0])/100);

    document.getElementById("settings-change-font-weight").value = new_font_weight_value;
  }

  function homepageBannerChangeFontSize (arg0_font_size) {
    //Convert from parameters
    var font_size = arg0_font_size;

    //Declare local instance variables
    var new_font_size = (((banner_settings.font_size[1]-banner_settings.font_size[0])/100)*font_size)+banner_settings.font_size[0];
    var new_top = (100-new_font_size)/2;

    banner_title_text.style.fontSize = `${new_font_size}vh`;
    banner_caret_element.style.fontSize = `${new_font_size}vh`;
    banner_caret_spacer_element.style.fontSize = `${new_font_size}vh`;

    window.percentage_string = new_top;

    adjustFontSize(title_element, banner_title_text, { homepage_banner: true });
  }

  function homepageBannerChangeFontWeight (arg0_font_weight) {
    //Convert from parameters
    var font_weight = arg0_font_weight;

    //Declare instance variables
    var base_font_weight = banner_settings.fonts[current_font].font_weight[0];
    var new_font_weight = (((banner_settings.fonts[current_font].font_weight[1]-base_font_weight)/100)*font_weight)+base_font_weight;

    //Apply font weight
    banner_title_text.style.fontWeight = new_font_weight;
    current_font_weight = new_font_weight;
  }

  function homepageBannerChangeOpacity (arg0_opacity) {
    //Convert from parameters
    var new_opacity = arg0_opacity/100;
    var raw_opacity = arg0_opacity;

    //Change actual opacity
    homepage_banner_overlay.style.opacity = new_opacity.toString();

    //Update settings UI
    document.getElementById("settings-change-opacity").value = raw_opacity;
  }

  function homepageBannerChangeOverlay (arg0_colour) {
    //Convert from parameters
    var new_colour = arg0_colour;

    homepage_banner_overlay.style.filter = banner_settings.overlay.colours[new_colour].filter;
    current_overlay = new_colour;

    //Set settings indicator
    var all_overlay_elements = document.querySelectorAll(".change-overlay-container > .change-overlay-select-option-container");

    for (var i = 0; i < all_overlay_elements.length; i++) all_overlay_elements[i].setAttribute("class",
      all_overlay_elements[i].getAttribute("class").replace(" selected", "")
    );

    document.getElementById("change-overlay-" + new_colour + "-container").setAttribute("class", "change-overlay-select-option-container selected");
  }

  function homepageBannerChangeRawFontSize (arg0_font_size) {
    //Convert from parameters
    var font_size = arg0_font_size;

    //Declare instance variables
    var new_font_size = (font_size-banner_settings.font_size[0])/((banner_settings.font_size[1]-banner_settings.font_size[0])/100);

    //Apply new font size
    homepageBannerChangeFontSize(new_font_size);
    document.getElementById("settings-change-font-size").value = new_font_size;
  }

  function homepageBannerClearAllDots () {
    var all_dots = document.querySelectorAll(".homepage-banner-dots-container div");

    for (var i = 0; i < all_dots.length; i++) all_dots[i].setAttribute("class", "homepage-banner-change-bg-btn");
  }

  function homepageBannerHideAllElements (arg0_exception) {
    //Convert from parameters
    var exception_element = arg0_exception;
    var background_elements = [
      cleveland_national_forest_bg,
      lava_lamp_bg,
      main_video_bg,
      misty_forest_bg,
      raindrop_bg,
      triumph_and_tragedy_bg
    ];
    for (var i = 0; i < background_elements.length; i++) {
      if (exception_element.getAttribute("id") == background_elements[i].getAttribute("id")) {
        background_elements[i].setAttribute("class", background_elements[i].getAttribute("class").replace(" hidden", ""));
      } else {
        //Make sure hidden parameter isn't already included
        if (!background_elements[i].getAttribute("class").includes("hidden")) {
          background_elements[i].setAttribute("class", background_elements[i].getAttribute("class") + " hidden");
        }
      }
    }

    //Performance optimisations
    lava_lamp_animation_paused = true;
    raindrop_animation_paused = true;
  }

  function homepageBannerLeftAlign () {
    //Cache old style for future restoration
    title_element.setAttribute("alignment", "left");

    //Update selected button in settings
    var all_alignments = document.querySelectorAll(".text-alignment-button");
    for (var i = 0; i < all_alignments.length; i++) all_alignments[i].setAttribute("class", "text-alignment-button");
    document.getElementById("change-left-alignment").setAttribute("class", "text-alignment-button selected");
  }

  function homepageBannerResetFontSize () {
    banner_title_text.style.fontSize = "";
    banner_caret_element.style.fontSize = "";
    banner_caret_spacer_element.style.fontSize = "";
  }

  function homepageBannerRightAlign () {
    //Cache old style for future restoration
    title_element.setAttribute("alignment", "right");

    //Update selected button in settings
    var all_alignments = document.querySelectorAll(".text-alignment-button");
    for (var i = 0; i < all_alignments.length; i++) all_alignments[i].setAttribute("class", "text-alignment-button");
    document.getElementById("change-right-alignment").setAttribute("class", "text-alignment-button selected");
  }

  function homepageBannerSetText (arg0_text) {
    //Convert from parameters
    var text = arg0_text;

    //Set .innerHTML
    banner_title_text.innerHTML = text;
    homepageBannerTitleAdjustPosition();

    adjustFontSize(title_element, banner_title_text, { homepage_banner: true });
  }

  function homepageBannerTitleAdjustPosition () {
    //Set vertical offset
    var scroll_y = window.pageYOffset;

    //Fetch current percentage
    var current_class = title_element.getAttribute("class");

    //Set translateY
    /*title_element.style.top = `calc(${percentage_string}% + ${scroll_y*-1.0025}px)`;
    settings_container.style.bottom = `calc(8vh + ${scroll_y*0.7}px)`;
    document.getElementById("project-parallax-container").style.top = `calc(100% - ${scroll_y*0.25}px)`;
    document.getElementById("about-me-section").style.top = `calc(200% - ${scroll_y*0.25}px)`;*/
  }

  function homepageBannerToggleCaret () {
    //Declare local instance variables
    var caret_input = document.getElementById("settings-display-caret");
    var caret_wrapper = document.getElementById("homepage-caret-wrapper");

    //Apply new opacity
    caret_wrapper.style.opacity = (caret_input.checked) ? 1 : 0;
  }
}

//Typing framework functions
{
  /*
    clearText() - Clears text from the main animation banner.
    options: {
      banner_el: (HTMLElement) - The HTML banner element to type in
      caret_spacer_el: (HTMLElement) - The HTML element that represents the typing caret
    }
  */
  function clearText (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options: {};

    //Declare local instance variables
    var banner_el = options.banner_el;
    var caret_spacer_el = options.caret_spacer_el;

    //Clear selected variables
    if (caret_spacer_el) {
      var caret_spacer_el_class = (caret_spacer_el.getAttribute("class")) ?
        caret_spacer_el.getAttribute("class") : "";

      if (caret_spacer_el_class.length > 0)
        caret_spacer_el.setAttribute("class", caret_spacer_el_class.replace("selected", ""));
    }

    //Clear text
    banner_el.innerHTML = "";
  }

  /*
    selectText() - Selects the text in the main animation banner.
    options: {
      banner_el: (HTMLElement) - The HTML banner to select text in
      caret_el: (HTMLElement) - The HTML element that represents the typing caret
      caret_spacer_el: (HTMLElement) - The HTML element that spaces the typing caret from the main banner
      select_limit: (Number) - Optional. The number of characters to select from the right. 0 by default, meaning select all
      select_speed: (Number) - Optional. The ms speed at which to select characters. 100 by default
    }

    Returns: Promise - This is returned once the animation is finished
  */
  function selectText (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options: {};

    //Declare local instance variables
    var banner_el = options.banner_el;
    var caret_el = options.caret_el;
    var caret_spacer_el = options.caret_spacer_el;
    var select_limit = (options.select_limit) ? options.select_limit : 0;
    var select_speed = (options.select_speed) ? options.select_speed : 100;

    var max_delay = 0;
    var span_amount = banner_el.querySelectorAll("span").length;
    var speed_array = [];

    //Select caret first
    var caret_spacer_el_class = (caret_spacer_el.getAttribute("class")) ?
      caret_spacer_el.getAttribute("class") : "";

    if (caret_spacer_el)
      caret_spacer_el.setAttribute("class", caret_spacer_el_class + " selected");

    //Iterate over <span> elements in the selected banner
    for (var i = 0; i < span_amount; i++) {
      speed_array.push(select_speed);

      //Fetch total_delay
      var total_delay = sumArray(speed_array);

      //Set max_delay
      max_delay = Math.max(max_delay, total_delay);

      //Set delay for selected string effect
      setTimeout(function(){
        if (!banner_settings.paused_animation) {
          //Fetch current index/other instance variables
          var all_spans = banner_el.querySelectorAll("span");
          var current_index = banner_el.querySelectorAll("span").length - 1 - banner_el.querySelectorAll("span[class*='selected']").length;

          //Apply selected class attribute to span
          if (current_index >= select_limit) {
            var current_el = all_spans[current_index];
            var current_class = (current_el.getAttribute("class")) ? current_el.getAttribute("class") : "";

            current_el.setAttribute("class", current_class + " selected");
          }

          //Increment anim_index when animation finishes playing
          var current_anim_index = (banner_el.getAttribute("anim-index")) ? parseInt(banner_el.getAttribute("anim-index")) : 0;

          if (current_index == select_limit)
            banner_el.setAttribute("anim-index", current_anim_index + 1);
        }
      }, total_delay);
    }

    //Return statement
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, max_delay);
    });
  }

  /*
    typeText() - Types text within the main animation banner.
    options: {
      apply_class: (String) - The class to add/apply to the banner element.
      banner_el: (HTMLElement) - The HTML banner to type in
      constant_typing_speed: (Boolean) - Optional. Whether the typing speed is constant. False by default
      slowdown: (Number) - Optional. Whether to slow text down as text is typed. 1 by default
      typing_speed: (Number) - Optional. The initial typing speed per character in ms. 750 by default
      typing_text: (String) - The text to type.
    }

    Returns: Promise - This is returned once the animation is finished
  */
  function typeText (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options: {};

    //Declare local instance variables
    var apply_class = (arg0_options.apply_class) ? `class = "${options.apply_class}"` : "";
    var banner_el = options.banner_el;
    var constant_typing_speed = options.constant_typing_speed;
    var slowdown = (options.slowdown) ? options.slowdown : 1;
    var typing_speed = (options.typing_speed) ? options.typing_speed : 750;
    var typing_text = options.text;

    var max_delay = 0;
    var speed_array = [];

    //Iterate over typing_text
    for (var i = 0; i < typing_text.length; i++) {
      //Reduce typing speed according to slowdown
      if (!constant_typing_speed)
        typing_speed -= typing_speed*0.35*Math.random()*slowdown;
      speed_array.push(typing_speed);

      //Fetch total delay
      var total_delay = sumArray(speed_array);

      //Set max_delay
      max_delay = Math.max(max_delay, total_delay);

      //Set delay for typed string
      setTimeout(function(){
        if (!banner_settings.paused_animation) {
          var current_index = banner_el.querySelectorAll("span").length;

          banner_el.innerHTML += `<span ${apply_class} id = "${banner_el.id}-${current_index}">${typing_text[current_index]}</span>`;

          //Increment anim-index if detected as done (this allows for asynchronous detection elsewhere)
          var current_anim_index = (banner_el.getAttribute("anim-index")) ?
            parseInt(banner_el.getAttribute("anim-index")) : 0;

          if (current_index + 1 == typing_text.length)
            banner_el.setAttribute("anim-index", current_anim_index + 1);

          //Set font size for banner to always fit
          adjustFontSize(title_element, banner_title_text, { homepage_banner: true });
        }
      }, total_delay);
    }

    //Return statement
    return new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve();
      }, max_delay);
    });
  }
}
