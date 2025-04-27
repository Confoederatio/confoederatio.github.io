//Initialise functions
{
  window.UF_animations = {
    on_scroll: {},

    vh: window.innerHeight/100,
    vw: window.innerWidth/100
  };
  //Window event listeners for UF_animations
  window.onresize = function (e) {
    UF_animations.vh = window.innerHeight/100;
    UF_animations.vw = window.innerWidth/100;
  };

  window.delay = function (arg0_timeout) {
    //Convert from parameters
    var timeout = arg0_timeout;

    //Return statement
    return new Promise ((resolve) => {
      setTimeout(function(){
        resolve();
      }, timeout);
    });
  };
  
  window.parseOnScrollAnimations = function () {
    //Declare local instance variables
    
  };

  /**
   * internalHelperOnScrollParallaxYAnimation() - Sets a on paralax Y scroll animation for various style attributes
   * @param {Object} [arg0_options]
   *  @param {Object} [arg0_options."<element_key>"] - The element to apply style calc animations to
   *   @param {String} [arg0_options."<element_key>.selector"] - The selector of the element to apply style calc animations to
   *   @param {String} [arg0_options."<element_key>.<style_attribute>"] - The style attribute equation to resolve, where SCROLL_PX is the current scrollY position in px, and SCROLL_VH is the current scrollY position in vh
   */
  window.internalHelperOnScrollParallaxYAnimation = function (arg0_options) {
    //Convert from parameters
    var options = arg0_options;

    //Declare local instance variables
    var all_elements = Object.keys(options);

    //Iterate through all elements
    for (var i = 0; i < all_elements.length; i++) {
      var local_element = options[element];
      var local_element_style_attributes = Object.keys(local_element);
      
      var local_el = document.querySelector(local_element.selector);

      //Iterate through all style attributes
      for (var x = 0; x < local_element_style_attributes.length; x++) 
        if (!["selector"].includes(local_element_style_attributes[x])) {
          var local_value = local_element[local_element_style_attributes[x]];
          
          if (local_el) {
            var local_calc_string = local_value
              .replace("SCROLL_PX", window.scrollY)
              .replace("SCROLL_VH", window.scrollY/UF_animations.vh);

            local_el.style[local_element_style_attributes[x]] = `calc(${local_calc_string})`;
          }
        }
    }
  };

  window.setOnScrollParallaxYAnimation = function (arg0_options) {
    //Convert from parameters
    var options = arg0_options;

    //Set UF_animations.on_scroll animation function
    UF_animations.on_scroll[generateRandomID(UF_animations.on_scroll)] = function () {
      internalHelperOnScrollParallaxYAnimation(options);
    };
  };
}
