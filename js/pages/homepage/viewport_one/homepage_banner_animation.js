//Banner customisation variables
{
  window.banner_settings = {
    animation_threshhold: 100,
    backgrounds: {
      main_video: {
        name: "Australis"
      },
      cleveland_fog: {
        name: "Sunset"
      },
      lava_lamp: {
        name: "Lava Lamp"
      },
      misty_forest: {
        name: "Misty Forest"
      },
      rain: {
        name: "Rain"
      },
      triumph_and_tragedy: {
        name: "Triumph & Tragedy"
      }
    },
    fonts: {
      bahnschrift: {
        name: "Bahnschrift",
        font_weight: [300, 700]
      },
      barlow: {
        name: "Barlow",
        font_weight: [100, 900]
      },
      fira_sans: {
        name: "Fira Sans",
        font_weight: [100, 900]
      },
      josefin_sans: {
        name: "Josefin Sans",
        font_weight: [100, 700]
      },
      quicksand: {
        name: "Quicksand",
        font_weight: [300, 700]
      },
      raleway: {
        name: "Raleway",
        font_weight: [100, 900]
      }
    },
    font_size: [10, 50],
    overlay: {
      colours: {
        azure: {
          name: "Azure",
          filter: "grayscale(0) hue-rotate(180deg)"
        },
        black: {
          name: "Black",
          filter: "brightness(0.2) grayscale(1)"
        },
        blue: {
          name: "Blue",
          filter: "grayscale(0) hue-rotate(225deg)"
        },
        copper: {
          name: "Copper",
          filter: "grayscale(0.6) hue-rotate(50deg)"
        },
        forest_green: {
          name: "Forest Green",
          filter: "grayscale(0.6) hue-rotate(100deg)"
        },
        grey: {
          name: "Grey",
          filter: "grayscale(1)"
        },
        light_blue: {
          name: "Light Blue",
          filter: "grayscale(0.5) hue-rotate(225deg)"
        },
        lime_green: {
          name: "Lime Green",
          filter: "grayscale(0) hue-rotate(90deg)"
        },
        magenta: {
          name: "Magenta",
          filter: "grayscale(0) hue-rotate(310deg)"
        },
        negative: {
          name: "Negative",
          filter: "grayscale(0) invert(1)"
        },
        orange: {
          name: "Orange",
          filter: "grayscale(0) hue-rotate(45deg)"
        },
        pink: {
          name: "Pink",
          filter: "grayscale(0) hue-rotate(340deg)"
        },
        red: {
          name: "Red",
          filter: "grayscale(0)"
        },
        salmon: {
          name: "Salmon",
          filter: "grayscale(0.3)"
        },
        soft_green: {
          name: "Soft Green",
          filter: "grayscale(0.7) hue-rotate(160deg)"
        },
        verdant_green: {
          name: "Verdant Green",
          filter: "grayscale(0) hue-rotate(160deg)"
        },
        violet: {
          name: "Violet",
          filter: "grayscale(0) hue-rotate(260deg)"
        },
        white: {
          name: "White",
          filter: "grayscale(1) brightness(2)"
        }
      },
      opacity_settings: [15, 20, 30, 40],
      default_opacity: 20,
      default_splash_colours: ["red", "azure", "copper", "forest_green", "orange", "blue", "negative", "violet", "salmon", "lime_green", "magenta", "black", "verdant_green", "pink", "red", "azure", "copper", "forest_green", "orange", "blue", "negative", "violet", "salmon", "lime_green", "magenta", "black",  "light_blue"]
    },
    paused_animation: false,
    paused_backgrounds: false,
    text_selected: false
  };
}

//Begin initial typing animation
var banner_caret_element = document.getElementById("homepage-banner-caret-element");
var banner_caret_spacer_element = document.getElementById("homepage-banner-caret-spacer");
var banner_selected_once = false;
var banner_title_text = document.getElementById("homepage-banner-main-title-text");
var cleveland_national_forest_bg = document.getElementById("homepage-banner-cleveland-national-forest-bg");
var content_editable_evt_listeners_added = false;
var current_banner = "main_video";
var current_font = "bahnschrift";
var current_font_weight = 700;
var current_overlay = "grey";
var homepage_banner_overlay = document.getElementById("homepage-banner-plexus-overlay-bg");
var lava_lamp_bg = document.getElementById("homepage-banner-lava-lamp-bg");
var main_video_bg = document.getElementById("homepage-banner-video-bg");
var misty_forest_bg = document.getElementById("homepage-banner-video-bg-misty-forest");
var raindrop_bg = document.getElementById("homepage-banner-rain-bg-container");
var settings_container = document.getElementById("homepage-banner-settings-container");
var time_since_selection = 0;
var title_element = document.getElementById("homepage-banner-main-title");
var triumph_and_tragedy_bg = document.getElementById("homepage-banner-triumph-and-tragedy-bg");
var typing_speed = 750;

//Homepage banner functions
{
  function homepageBannerAnimation () {
    //Begin playing video background
    main_video_bg.play();

    //Begin animation sequence; make sure animation isn't paused
    if (!banner_settings.paused_animation) {
      setTimeout(function(){
        typeText({ //Type 'NÉRMORNES'
          apply_class: "homepage-banner-text-subelement", //Applying this prevents noticeable index cropping
          banner_el: banner_title_text,
          text: "NÉRMORNES,"
        })
        .then(() => { //Select text; clear text
          return selectText({
            banner_el: banner_title_text,
            caret_el: banner_caret_element,
            caret_spacer_el: banner_caret_spacer_element
          });
        })
        .then(() => delay(400)) //400ms delay
        .then(() => { //Clear text
          clearText({
            banner_el: banner_title_text,
            caret_spacer_el: banner_caret_spacer_element
          });
        })
        .then(() => {
          homepageBannerResetFontSize(); //Reset font size after clearing
        })
        .then(() => delay(350)) //350ms delay
        .then(() => { //Type 'WE'RE CONFOEDERATIO'
          return typeText({
            apply_class: "homepage-banner-text-subelement",
            banner_el: banner_title_text,
            initial_typing_speed: 400,
            text: "WE'RE CONFOEDERATIO;"
          });
        })
        .then(() => delay(1250)) //1250ms delay
        .then(() => {
          return selectText({
            banner_el: banner_title_text,
            caret_el: banner_caret_element,
            caret_spacer_el: banner_caret_spacer_element,
            select_speed: 50
          });
        })
        .then(() => delay(450)) //450ms delay
        .then(() => { //Clear text
          clearText({
            banner_el: banner_title_text,
            caret_spacer_el: banner_caret_spacer_element
          });
        })
        .then(() => {
          homepageBannerResetFontSize(); //Reset font size after clearing
        })
        .then(() => delay(1500)) //1500ms delay
        .then(() => { //Add text 'WHEN'
          homepageBannerSetText(`WHEN`);
        })
        .then(() => delay(250)) //250ms delay
        .then(() => { //Add text ' WE BUILD'
          homepageBannerSetText(`WHEN WE BUILD`);
        })
        .then(() => delay(100)) //100ms delay
        .then(() => { //Expand font size
          homepageBannerChangeFontSize(30);
        })
        .then(() => delay(350)) //350ms delay
        .then(() => { //Blinking caret fades out now
          document.getElementById("homepage-caret-wrapper").setAttribute("class", "fade-out");

          //Display override
          document.getElementById("homepage-caret-wrapper").style.display = "none";
          caret_fadeout_finished = true;
        })
        .then(() => delay(3000)) //3000ms delay
        .then(() => { //Type '/'
          homepageBannerChangeRawFontSize(50);
          return homepageBannerSetText(`<span class = "enlarged-slash">/</span>`);
        })
        .then(() => delay(1000)) //1000ms delay
        .then(() => { //Set text 'LET US THINK'
          //Remove enlarged slash positioning
          title_element.setAttribute("class", title_element.getAttribute("class").replace(" slash-positioning", ""));

          //Set text
          homepageBannerChangeRawFontSize(24);
          homepageBannerSetText(`LET US THINK`);
        })
        .then(() => delay(1100)) //1100ms delay
        .then(() => { //Set text 'WE BUILD FOREVER'
          //Enlarge font temporarily
          homepageBannerSetText(`WE BUILD FOREVER`);
        })
        .then(() => delay(1200)) //1200ms delay
        .then(() => { //Bring back the caret; reset font size
          document.getElementById("homepage-caret-wrapper").setAttribute("class", "");
          document.getElementById("homepage-caret-wrapper").style.display = "inline";
          homepageBannerTitleAdjustPosition();
          homepageBannerResetFontSize();

          adjustFontSize(title_element, banner_title_text, { homepage_banner: true });
        })
        .then(() => delay(700)) //700ms delay
        .then(() => { //Select text
          return selectText({
            banner_el: banner_title_text,
            caret_el: banner_caret_element,
            caret_spacer_el: banner_caret_spacer_element,
            select_speed: 0
          });
        })
        .then(() => delay(250)) //250ms delay
        .then(() => {
          clearText({
            banner_el: banner_title_text,
            caret_spacer_el: banner_caret_spacer_element
          });
        })
        .then(() => delay(300)) //300ms delay
        .then(() => { //Normalise font sizing
          homepageBannerChangeRawFontSize(20);
          homepageBannerTitleAdjustPosition();
        })
        .then(() => delay(2000)) //2000ms delay
        .then(() => { //Type 'EDIT ME.'
          banner_title_text.setAttribute("contenteditable", "true");
          homepageBannerChangeAnimation();

          return typeText({
            apply_class: "homepage-banner-text-subelement",
            banner_el: banner_title_text,
            initial_typing_speed: 400,
            slowdown: -0.50, //Slowdown at 1/2 rate
            text: "EDIT ME."
          });
        })
        .then(() => delay(300)) //300ms delay
        .then(() => { //Select text
          return selectText({
            banner_el: banner_title_text,
            caret_el: banner_caret_element,
            caret_spacer_el: banner_caret_spacer_element,
            select_speed: 50
          });
        })
        .then(() => delay(200)) //200ms delay
        .then(() => { //Clear text
          clearText({
            banner_el: banner_title_text,
            caret_spacer_el: banner_caret_spacer_element
          });
        })
        .then(() => delay(100)) //100ms delay
        .then(() => { //Type 'TYPE ANYTHING'
          homepageBannerResetFontSize();

          return typeText({
            apply_class: "homepage-banner-text-subelement",
            banner_el: banner_title_text,
            initial_typing_speed: 350,
            text: "TYPE ANYTHING"
          });
        })
        .then(() => delay(500)) //500ms delay
        .then(() => { //Add break; begin custom 'HELLO' typing animation
          homepageBannerResetFontSize();
          homepageBannerTypeHello();
        });
      }, 1000);
    }

    //Begin playing misty_forest.mp4 after
    var switched_backgrounds = false;

    main_video_bg.onended = function () {
      //Make sure you can only switch backgrounds once when the page is loaded
      if (!switched_backgrounds) {
        switched_backgrounds = true;
        homepageBannerChangeBanner("misty_forest");

        //Set wait commands for changing the background. Transitions should be 'jarring' as specified
        setTimeout(function(){
          homepageBannerChangeBanner("cleveland_fog");
        }, 4000);
        setTimeout(function(){
          homepageBannerChangeBanner("triumph_and_tragedy");
        }, 8000);
        setTimeout(function(){
          homepageBannerChangeBanner("lava_lamp");
        }, 12000);
        setTimeout(function(){
          homepageBannerChangeBanner("rain");
          homepageBannerDisplayDots();
          lava_lamp_animation_paused = true;

          //Mark animation as finished
          title_element.setAttribute("class", title_element.getAttribute("class") + " finished-animation");
        }, 16000);
      }
    };

    //Main loop logic
    setInterval(function(){
      //Check if text is selected or not
      banner_settings.text_selected = (document.activeElement.getAttribute("id") == banner_title_text.getAttribute("id"));

      //Pause all animations if text is selected, and increment time_since_selection
      if (banner_settings.text_selected) {
        if (!banner_selected_once) homepageBannerCentreAlign();
        banner_selected_once = true;
        banner_settings.paused_animation = true;
        time_since_selection = 0;

        //Strip formatting from all copy/pasted text
        if (!content_editable_evt_listeners_added) banner_title_text.addEventListener("paste", function (e) {
          e.preventDefault();
          var text = e.clipboardData.getData("text/plain");
          document.execCommand("insertHTML", false, text);
        });
      } else {
        //Make sure content is always able to be selected
        if (banner_settings.paused_animation) banner_title_text.innerHTML = (banner_title_text.innerText.replace(/\n/gm, "").length == 0) ? "HELLO;" : banner_title_text.innerHTML;
        //Increment time since selection so that we can keep track of when the animation should be unpaused again
        time_since_selection++;
      }

      //Unpause animation if time_since_selection exceeds animation_threshhold
      banner_settings.paused_animation =
        (time_since_selection > banner_settings.animation_threshhold) ? false : banner_settings.paused_animation;
    }, 100);
  }

  function homepageBannerChangeAnimation () {
    //Declare tracker variables
    window.homepage_banner = {
      change_speed: [],
      colour_index: 0,
      current_speed: 1500
    };

    for (var i = 0; i < banner_settings.overlay.default_splash_colours.length; i++) {
      //Decrement starting speed by random amount, make sure that people don't get seizures
      homepage_banner.current_speed -= Math.min(homepage_banner.current_speed*0.25*Math.random(), 100);
      homepage_banner.current_speed = (homepage_banner.current_speed < 100) ? 100 : homepage_banner.current_speed;
      homepage_banner.change_speed.push(homepage_banner.current_speed);

      //Fetch current_delay
      var current_delay = sumArray(homepage_banner.change_speed);

      //Set timeout animation for current colour
      setTimeout(function(){
        //Change current colour filter
        var current_colour = banner_settings.overlay.default_splash_colours[homepage_banner.colour_index];
        var current_opacity = randomElement([20, 25, 30]).toString();

        //Set opacity for final element if reached
        current_opacity = (current_colour == banner_settings.overlay.default_splash_colours[banner_settings.overlay.default_splash_colours.length-1]) ? 25 : current_opacity;

        homepageBannerChangeOpacity(current_opacity);
        homepageBannerChangeOverlay(current_colour);
        homepage_banner.colour_index++;
      }, current_delay);
    }
  }

  function homepageBannerTypeHello () {
    if (!banner_settings.paused_animation) {
      banner_title_text.innerHTML = "";
      homepageBannerLeftAlign();

      typeText({
        banner_el: banner_title_text,
        initial_typing_speed: 650,
        text: "AVREU"
      })
      .then(() => delay(1000)) //1000ms delay
      .then(() => { //Set Text: MOINE
        banner_title_text.innerHTML = `MOINE`;
      })
      .then(() => delay(800)) //800ms delay
      .then(() => { //Set Text: SALUT
        banner_title_text.innerHTML = `SALUT`;
      })
      .then(() => delay(500)) //500ms delay
      .then(() => { //Set text: HALLO
        banner_title_text.innerHTML = `HALLO`;
      })
      .then(() => delay(350)) //350ms delay
      .then(() => { //Set text: HELLO
        banner_title_text.innerHTML = `HELLO`;

        banner_settings.finished_animation = true;
      });
    }
  }
}

//Parallax effect for label, initialised in scroll scope
function parallaxLabelOnScroll () {
  homepageBannerTitleAdjustPosition();
}
