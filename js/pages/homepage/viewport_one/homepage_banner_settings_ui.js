//Global instance variables
var settings_bg_container = document.getElementById("homepage-banner-settings-change-bg-container");
var settings_btn;
var settings_btn_clicked = 0;
var settings_btn_container = document.getElementById("settings-btn-container");
var settings_close_btn = document.getElementById("settings-close-btn");
var settings_font_select = document.getElementById("settings-change-font-family");
var settings_minimised = true;
var settings_minimise_btn = document.getElementById("settings-adjust-size-btn");
var settings_overlay_container = document.getElementById("homepage-banner-settings-change-overlay-container");
var settings_window = document.getElementById("homepage-banner-settings-container");
var settings_window_open = false;

//Local framework variables
{
  function applySettingsButtonFunctionality () {
    //Increment click counter
    settings_btn_clicked++;

    //Toggle switch
    settings_window_open = (settings_window_open) ? false : true;

    //Open/close settings window
    updateSettingsPanel();

    settings_btn.onclick = function () {
      applySettingsButtonFunctionality();
    };
  }

  function initialiseBackgroundSettings () {
    //Declare instance variables
    var all_backgrounds = Object.keys(banner_settings.backgrounds);

    //Initialise DOM elements
    for (var i = 0; i < all_backgrounds.length; i++) {
      var local_background = banner_settings.backgrounds[all_backgrounds[i]];
      settings_bg_container.innerHTML += `
        <div id = "change-bg-${all_backgrounds[i]}-container" class = "change-bg-select-option-container" onclick = 'if (current_banner != "${all_backgrounds[i]}") homepageBannerChangeBanner("${all_backgrounds[i]}");'>
          <div id = "change-bg-${all_backgrounds[i]}" class = "change-bg-select-option" style = 'background-image: url("gfx/interface/${all_backgrounds[i]}_bg.png");'></div>
          <center class = "image-container">
            <img src = "gfx/interface/icons/checkmark.png" class = "checkmark" draggable = "false"></img>
          </center>
          <center class = "text-container">
            <span class = "change-bg-desc">${local_background.name}</span>
          </center>
        </div>
      `;
    }
  }

  function initialiseFontSettings () {
    //Declare local instance variables
    var all_fonts = Object.keys(banner_settings.fonts);

    for (var i = 0; i < all_fonts.length; i++) settings_font_select.innerHTML += `
      <option style = "
        font-family: ${banner_settings.fonts[all_fonts[i]].name};
        text-transform: capitalize;
      " value = "${all_fonts[i]}">${banner_settings.fonts[all_fonts[i]].name}</option>
    `;

    //Initialise slim select
    var font_selection = new SlimSelect({
      select: "#settings-change-font-family",
      showSearch: false,
      onChange: (info) => {
        homepageBannerChangeFont(font_selection.selected());
      }
    });
    window.currently_selected_font = document.querySelector(".ss-main.font-family-dropdown > .ss-single-selected > .placeholder");
    currently_selected_font.style.fontFamily = banner_settings.fonts[current_font].name;
  }

  function initialiseOverlaySettings () {
    //Declare instance variables
    var all_colours = Object.keys(banner_settings.overlay.colours);

    //Initialise DOM elements
    for (var i = 0; i < all_colours.length; i++) {
      var selected = (current_overlay == all_colours[i]) ? "selected" : "";
      var local_overlay = banner_settings.overlay.colours[all_colours[i]];
      settings_overlay_container.innerHTML += `
        <div id = "change-overlay-${all_colours[i]}-container" class = "change-overlay-select-option-container ${selected}" onclick = 'homepageBannerChangeOverlay("${all_colours[i]}");'>
          <div id = "change-overlay-${all_colours[i]}" class = "change-overlay-select-option">
            <div id = "change-overlay-${all_colours[i]}-background" class = "background" style = 'background-image: url("gfx/interface/vector_plexus_overlay_bg.png"); filter: ${local_overlay.filter};'>
            </div>
          </div>
          <center class = "image-container">
            <img src = "gfx/interface/icons/checkmark.png" class = "checkmark" draggable = "false"></img>
          </center>
          <center class = "text-container">
            <span class = "change-overlay-desc">${local_overlay.name}</span>
          </center>
        </div>
      `;
    }
  }

  function initialiseSettingsButton () {
    settings_btn_container.innerHTML = `<img id = "settings-btn" class = "settings-btn" src = "gfx/interface/icons/settings_btn.png" draggable = "false">`;

    //Update DOM tracker variable
    settings_btn = document.getElementById("settings-btn");
    if (!settings_window_open && settings_btn_clicked == 0) {
      tippy("#settings-btn", {
        content: "Open Settings"
      });
    }
  }

  function minimiseSettings () {
    settings_minimised = true;

    settings_window.style.height = "30vh";
    settings_minimise_btn.setAttribute("class", "settings-chevron-btn minimised");

    window.minimise_btn_tooltip = tippy("#settings-adjust-size-btn", {
      content: "Maximise Settings",
      placement: "top"
    });
  }

  function maximiseSettings () {
    settings_minimised = false;

    settings_window.style.height = "80vh";
    settings_minimise_btn.setAttribute("class", "settings-chevron-btn");

    window.minimise_btn_tooltip = tippy("#settings-adjust-size-btn", {
      content: "Minimise Settings",
      placement: "top"
    });
  }

  function updateSettingsPanel () { //Pardon this mess
    //Toggle visibility of actual window
    if (!settings_window_open) settings_window.setAttribute("class",
      settings_window.getAttribute("class").replace(" settings-animated-open", "").replace(" hidden", "") + " settings-animated-close"
    );
    setTimeout(function(){
      //Readjust visibility of window if window is currently open
      if (settings_window_open) settings_window.setAttribute("class",
        settings_window.getAttribute("class").replace(" settings-animated-close", "").replace(" hidden", "") + " settings-animated-open"
      );
      if (!settings_window_open) settings_btn_container.setAttribute("class", "settings-btn-container stationary");

      //Set tooltip
      var label_placement = (settings_window_open) ? "left" : "top";
      var open_close_label = (settings_window_open) ? "Close" : "Open";
      tippy("#settings-btn", {
        content: `${open_close_label} Settings`,
        placement: label_placement
      });
    }, 2000);

    //Apply button animation
    settings_btn_container.setAttribute("class", "settings-btn-container");
    settings_btn_animation = (!settings_window_open) ? "homepage-settings-btn-roll-back" : "homepage-settings-btn-roll";

    //Play animation
    initialiseSettingsButton();
    settings_btn.style.animation = `${settings_btn_animation} 2s forwards`;
    settings_btn.onclick = function () {
      applySettingsButtonFunctionality();
    };
  }
}

//Temp for debugging [WIP]
//homepageBannerDisplayDots();

//Add settings_btn to DOM, initialise DOM
homepageBannerChangeRawFontSize(20);
homepageBannerCentreAlign();
initialiseBackgroundSettings();
initialiseFontSettings();
initialiseOverlaySettings();
initialiseSettingsButton();
maximiseSettings(); //Change to minimise in future [WIP]
tippy("#settings-close-btn", {
  content: "Close Settings",
  placement: "top"
});

//Local event listeners for when settings is hovered over
settings_btn.onclick = function () {
  applySettingsButtonFunctionality();
};

//Settings UI button functionality
settings_close_btn.onclick = function () {
  settings_window_open = false;
  updateSettingsPanel();
};
settings_minimise_btn.onclick = function () {
  minimise_btn_tooltip[0].destroy();

  if (settings_minimised) {
    maximiseSettings();
  } else {
    minimiseSettings();
  }
}
