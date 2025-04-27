//Framework functions
{
  function getCursorPosition (e, arg0_image) {
    //Declare local instance variables
    e = (e) ? e : window.event;
    var img_bounds = arg0_image.getBoundingClientRect();
    
    //Calculate pan_x and pan_y coordinates relative to image
    var pan_x = e.clientX - img_bounds.left;
    var pan_y = e.clientY - img_bounds.top;

    //Return object
    return { x : pan_x, y: pan_y };
  }

  function isMagnifierMaximised (arg0_element_id) {
    //Convert from parameters
    var element_id = arg0_element_id;

    //Return statement
    return (document.querySelectorAll(`.${element_id}-panel.maximised .image-magnifier-glass`).length != 0);
  }

  function magnify (arg0_element, arg1_zoom) {
    //Convert from parameters
    var local_el = arg0_element;
    var zoom = arg1_zoom;

    //Declare global instance variables
    var element_id = local_el.id;

    window[element_id + "_zoom"] = zoom;
    var local_zoom = window[element_id + "_zoom"];

    //Create magnifying glass element
    var local_magnifier = document.createElement("DIV");
    local_magnifier.setAttribute("class", "image-magnifier-glass");
    local_magnifier.style.backgroundImage = `url('${local_el.src}')`;
    local_magnifier.style.backgroundRepeat = "no-repeat";

    local_el.parentElement.insertBefore(local_magnifier, local_el);

    //Dynamic movement events - PC
    local_el.addEventListener("mousemove", (e) => moveMagnifier(e, local_el, local_magnifier));

    //Dynamic movement events - Mobile
    local_el.addEventListener("touchmove", (e) => moveMagnifier(e, local_el, local_magnifier));

    //Dynamic zoom
    local_el.addEventListener("wheel", (e) => {
      local_zoom += e.deltaY*-0.0025;

      //Restrict zoom between 1.25-10
      local_zoom = Math.min(Math.max(1.25, local_zoom), 10);
      window[element_id + "_zoom"] = local_zoom;

      e.preventDefault();
    });

    //Hide magnifier if image is not hovered on
    setInterval(function(){
      local_magnifier.style.opacity = (document.querySelectorAll(`#${element_id}:hover`).length != 0 && window[element_id.replace(/-/gm, "_") + "_active_preview"] != false) ? 1 : 0;
    }, 0);
  }

  function moveMagnifier (e, arg0_element, arg1_magnifier) {
    //Convert from parameters
    var local_el = arg0_element;
    var magnifier = arg1_magnifier;

    //Declare local instance variables
    var element_id = local_el.id;
    var local_bounds = local_el.getBoundingClientRect();
    var position = getCursorPosition(e, local_el);
    var zoom = window[element_id + "_zoom"];

    var pan_x = position.x;
    var pan_y = position.y;

    // Get magnifier dimensions
    var h = magnifier.offsetHeight;
    var w = magnifier.offsetWidth;

    // Calculate magnifier position to center the DIV on cursor
    var offset_x = pan_x - w/2;
    var offset_y = pan_y + h/2;

    //Maximisation adjustments
    if (isMagnifierMaximised(element_id)) {
      // For maximized state, position relative to the image container
      var container = local_el.parentElement;
      var container_bounds = container.getBoundingClientRect();
      
      offset_x = pan_x - (w/2) + container_bounds.left;
      offset_y = pan_y - (h/2) + container_bounds.top;
    }

    //Prevent magnifier from going outside of image
    if (document.querySelector(`#${element_id}:hover`).length != 0) {
      magnifier.style.left = `${offset_x}px`;
      magnifier.style.top = `${offset_y}px`;
    }

    // Calculate percentage of cursor position within the displayed image
    var percent_x = pan_x / local_bounds.width;
    var percent_y = pan_y / local_bounds.height;
    
    // Calculate background position using percentage
    var bg_x = percent_x * (local_el.width * zoom - w);
    var bg_y = percent_y * (local_el.height * zoom - h);

    //Set magnifier display
    magnifier.style.backgroundPosition = `-${bg_x}px -${bg_y}px`;

    //Update magnifier zoom
    magnifier.style.backgroundSize = `
      ${local_el.width*zoom}px ${local_el.height*zoom}px
    `;
  }
}
