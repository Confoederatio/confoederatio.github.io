//Declare local variables
var chevron_icon = document.getElementById("homepage-banner-chevron-down");
var dots_container = document.getElementById("homepage-banner-dots-container");

//Declare framework functions
{
  function homepageBannerDisplayDots () {
    //Declare local instance variables
    var background_keys = Object.keys(banner_settings.backgrounds);
    var total_time_taken = 0;

    for (var i = 0; i < background_keys.length; i++) {
      var local_background = background_keys[i];
      var local_id = "change-banner-btn-" + local_background;

      var local_el = document.getElementById(local_id);

      //Add animation
      local_el.style.transform = "translateY(100vh)";
      local_el.style.animation = "homepage-top-banner-btn-hop-up 1.5s forwards";
      local_el.style.animationDelay = `${i*(i*0.25)/4}s`;

      //Increment total_time_taken
      total_time_taken += i*(i*0.25)/4;

      //Add tooltip
      tippy("#" + local_id, {
        content: banner_settings.backgrounds[background_keys[i]].name
      });
    }

    //Display settings fade in animation
    setTimeout(function(){
      settings_btn.setAttribute("class",
        "settings-btn settings-btn-animated-fade-in"
      );
      resetAnimation(settings_btn);

      chevron_icon.setAttribute("class",
        chevron_icon.getAttribute("class").replace(" hidden", "")
      );
    }, total_time_taken*1000);
  }

  function homepageBannerHideDots () {
    //Declare local instance variables
    var reversed_bg_array = Object.keys(banner_settings.backgrounds).reverse();

    //Settings fade out animation
    settings_btn.setAttribute("class",
      "settings-btn settings-btn-animated-fade-out"
    );
    resetAnimation(settings_btn);

    chevron_icon.setAttribute("class",
      chevron_icon.getAttribute("class") + " hidden"
    );

    //Hide buttons
    setTimeout(function(){
      for (var i = 0; i < reversed_bg_array.length; i++) {
        var local_background = reversed_bg_array[i];
        var local_id = "change-banner-btn-" + local_background;

        //Add animation
        document.getElementById(local_id).style.transform = "translateY(0vh)";
        document.getElementById(local_id).style.animation = "homepage-top-banner-btn-hop-down 1.5s forwards";
        document.getElementById(local_id).style.animationDelay = `${i*(i*0.25)/4}s`;
      }
    }, 1000);
  }
}

//Initialise DOM elements/buttons
var all_backgrounds = Object.keys(banner_settings.backgrounds);
for (var i = 0; i < all_backgrounds.length; i++) {
  var local_background = all_backgrounds[i];

  //Substantiate element
  dots_container.innerHTML += `
    <div id = "change-banner-btn-${local_background}" class = "homepage-banner-change-bg-btn"
      onclick = "homepageBannerChangeBanner('${local_background}');"
    ></div>
  `;
}
