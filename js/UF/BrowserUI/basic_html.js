//Initialise functions
{
  /*
    adjustFontSize() - Adjusts the font size of an element to fit the container.
    options: {
      homepage_banner: (Boolean) - Optional. Whether the element is the homepage banner. False by default.
    }
  */
  window.adjustFontSize = function (arg0_container_element, arg1_text_element, arg2_options) {
    //Convert from parameters
    var container_el = arg0_container_element;
    var text_el = arg1_text_element;
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var container_width = container_el.offsetWidth;
    var text_width = text_el.offsetWidth;

    //Subtract from container_width if options.homepage_banner
    if (options.homepage_banner) {
      container_width -= banner_caret_element.offsetWidth;
      container_width -= banner_caret_spacer_element.offsetWidth;
    }

    var current_font_size = parseFloat(window.getComputedStyle(text_el).fontSize);
    var width_ratio = container_width/text_width;

    if (!text_el.hasAttribute("data-previous-font-size"))
      text_el.setAttribute("data-previous-font-size", current_font_size);

    var previous_font_size = parseFloat(text_el.getAttribute("data-previous-font-size"));
    ////Check if the text width exceeds container width
    if (text_width > container_width) {
      var local_iterations = 0;

      //Reduce font size until text fits within container
      while (text_width > container_width) {
        current_font_size -= 0.25;
        text_el.style.fontSize = `${current_font_size}px`;
        text_width = text_el.offsetWidth;

        if (options.homepage_banner) {
          banner_caret_element.style.fontSize = `${current_font_size}px`;
          banner_caret_spacer_element.style.fontSize = `${current_font_size}px`;
        }

        //Break after 10k iterations to prevent eternal loops
        local_iterations++;

        if (local_iterations > 1000) break;
      }
    } else {
      var local_iterations = 0;

      //If text becomes shorter, increase font size up to previous font size
      if (current_font_size < previous_font_size)
        while (text_width < container_width && current_font_size < previous_font_size) {
          current_font_size += 0.25;
          text_el.style.fontSize = `${current_font_size}px`;
          text_width = text_el.offsetWidth;

          //Break after 10k iterations to prevent eternal loops
          local_iterations++;

          if (local_iterations > 1000) break;
        }
    }

    //Clear font size cache if the font size has reached previous font size
    if (current_font_size >= previous_font_size)
      text_el.removeAttribute("data-previous-font-size");
  }

  /*
    arrayHasElement() - Checks if an array has an element.
    arg0_array: (Array<HTMLElement>) - The array of elements to look through
    arg1_query_selector: (String) - The query selector to check for

    Returns: (Boolean)
  */
  window.arrayHasElement = function (arg0_array, arg1_query_selector) {
    //Convert from parameters
    var array = arg0_array;
    var query_selector = arg1_query_selector;

    //Declare local instance variables
    var selected_elements = document.querySelectorAll(query_selector);

    if (selected_elements)
      for (var i = 0; i < array.length; i++)
        for (var x = 0; x < selected_elements.length; x++)
          if (array[i].outerHTML == selected_elements[x].outerHTML) return true;
  }

  /*
    arrayHasElementAttribute() - Checks if an array of elements has an attribute.
    arg0_array: (Array<HTMLElement>) - The array of elements to pass to the function.
    arg1_attribute_type: (String) - The attribute to check for.
    arg2_attribute_content: (String) - The attribute content to check for.

    Returns: (Boolean)
  */
  window.arrayHasElementAttribute = function (arg0_array, arg1_attribute_type, arg2_attribute_content) {
    //Convert from parameters
    var array = arg0_array;
    var attribute_type = arg1_attribute_type;
    var attribute_content = arg2_attribute_content;

    //Iterate over array
    if (array)
      for (var i = 0; i < array.length; i++)
        try {
          if (array[i].getAttribute(attribute_type) == attribute_content) return true;
        } catch {}
  }

  window.closestPointInCircle = function (arg0_circle_x, arg1_circle_y, arg2_point_x, arg3_point_y, arg4_radius) {
    //Convert from parameters
    var cX = arg0_circle_x;
    var cY = arg1_circle_y;
    var pX = arg2_point_x;
    var pY = arg3_point_y;
    var r = arg4_radius;

    //Declare local instance variables
    var center_x = cX + r;
    var center_y = cY + r;
    var vX = pX - center_x;
    var vY = pY - center_y;

    var magV = Math.sqrt(vX*vX + vY*vY);
    var aX = center_x + vX/magV*r;
    var aY = center_y + vY/magV*r;

    //Return statement
    return [aX, aY];
  }

  window.fixMobileVh = function () {
    var vh = window.innerHeight*0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  /*
    hideElement() - Hides an HTML element. Appends a 'hidden' class.
    arg0_element: (HTMLElement) - The HTML element to pass.
  */
  window.hideElement = function (arg0_element) {
    //Convert from parameters
    var element = arg0_element;

    //Declare local instance variables
    var class_name = element.getAttribute("class");

    if (!class_name.includes(" hidden"))
      (class_name) ?
        element.setAttribute("class", `${class_name} hidden`) :
        element.setAttribute("class", " hidden");
  }

  /*
    generateLine() - Generates an HTML line element between two elements.
    arg0_element: (HTMLElement) - The 1st element to pass to the function.
    arg1_element: (HTMLElement) - The 2nd element to pass to the function.
    arg2_options: (Object)
      colour: (String) - Optional. The colour to pass to the line element. 'white' by default.
      thickness: (Number) - Optional. The thickness of the line to generate. 1 by default.
  */
  window.generateLine = function (arg0_element, arg1_element, arg2_options) {
    //Convert from parameters
    var element = arg0_element;
    var ot_element = arg1_element;
    var options = (arg2_options) ? arg2_options : {};

    //Initialise options
    if (!options.colour) options.colour = "black";
    if (!options.thickness) options.thickness = 1;

    //Declare local instance variables
    var offset = getOffset(element);
    var ot_offset = getOffset(ot_element);

    var x_1 = offset.left + offset.width;
    var y_1 = offset.top + offset.height;

    var x_2 = ot_offset.left + ot_offset.width;
    var y_2 = ot_offset.top;

    var length = Math.sqrt(((x_2 - x_1)*(x_2 - x_1)) + ((y_2 - y_1)*(y_2 - y_1)));

    var cx = ((x_1 + x_2)/2) - (length/2);
    var cy = ((y_1 + y_2)/2) - (options.thickness/2);

    var angle = Math.atan2((y_1 - y_2), (x_1 - x_2))*(180/Math.PI);
    var html_line = `<div style = "padding: 0px; margin: 0px; height: ${options.thickness}px; background-color: ${options.colour}; line-height: 1px; position: absolute; left: ${cx}px; top: ${cy}px; width: ${length}px; transform: rotate(${angle}deg);"></div>`;

    //Return statement
    return html_line;
  }

  /*
    generateTable() - Generates an empty table according to x and y dimensions, giving them valid IDs.
    arg0_width: (Number) - The width of the table.
    arg1_height: (Number) - The height of the table.
    arg2_options: (Object) - The attributes of the table element.

    Returns: (String)
  */
  window.generateTable = function (arg0_width, arg1_height, arg2_options) {
    //Convert from parameters
    var width = unzero(returnSafeNumber(arg0_width), 1);
    var height = unzero(returnSafeNumber(arg1_height), 1);
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var table_html = [];

    //Format table
    table_html.push(`<table ${objectToAttributes(options)}>`);

    //Iterate over height first
    for (var i = 0; i < height; i++) {
      table_html.push(`<tr id = "row-${i}">`);
        for (var x = 0; x < width; x++)
          table_html.push(`<td id = "${x}-${i}"></td>`);
      table_html.push(`</tr>`);
    }

    //Close table formatting
    table_html.push(`</table>`);

    //Return statement
    return table_html.join("");
  }

  /*
    getOffset() - Returns the left/top/width/height offset of a given HTML element.
    arg0_element: (HTMLElement) - HTML element to pass.

    Returns: (Object)
      left: (Number)
      top: (Number)

      height: (Number)
      width: (Number)
  */
  window.getOffset = function (arg0_element) {
    //Convert from parameters
    var element = arg0_element;

    //Declare local instance variables
    var rect = element.getBoundingClientRect();

    //Return statement
    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
      width: (rect.width || el.offsetWidth),
      height: (rect.height || el.offsetHeight)
    };
  }

  /*
    isDescendant() - Checks whether an element belongs to a specific parent.
    arg0_parent_el: (HTMLElement) - The HTML element of the parent to check.
    arg1_child_el: (HTMLElement) - The HTML element of the child to check.

    Returns: (Boolean)
  */
  window.isDescendant = function (arg0_parent_el, arg1_child_el) {
    //Convert from parameters
    var parent_el = arg0_parent_el;
    var child_el = arg1_child_el;

    //Declare local instance variables
    var node = child_el.parentNode;

    //Iterate over parents as a while loop
    while (node != null) {
      if (node == parent) return true;
      node = node.parentNode;
    }

    //Return statement; if failed
    return false;
  }

  window.isElementAtTop = function (arg0_element) {
    //Convert from parameters
    var element = arg0_element;

    //Declare local instance variables
    const rect = element.getBoundingClientRect();

    //Return statement
    return (rect.top <= 1);
  }

  window.isElementInViewport = function (arg0_element) {
    //Convert from parameters
    var el = arg0_element;

    //Declare local instance variables
    var local_bounds = el.getBoundingClientRect();

    //Return statement
    return (
      local_bounds.bottom > 0 &&
      local_bounds.right > 0 &&
      local_bounds.top < (window.innerHeight || document.documentElement.clientHeight) &&
      local_bounds.left < (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  window.isMobileDevice = function () {
    //Return statement
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  /*
    objectToAttributes() - Converts a given object to a bunch of attributes in terms of key/value pairs.
    arg0_input_object: (Object) - The object to pass to the function.

    Returns: (String)
  */
  window.objectToAttributes = function (arg0_input_object) {
    //Convert from parameters
    var input_object = (arg0_input_object) ? arg0_input_object : {};

    //Declare local instance variables
    var all_keys = Object.keys(input_object);
    var attribute_string = [];

    //Iterate over all_keys
    for (var i = 0; i < all_keys.length; i++) {
      var local_value = input_object[all_keys[i]];

      attribute_string.push(`${all_keys[i]} = "${local_value}"`);
    }

    //Format attribute_string
    attribute_string = attribute_string.join(" ");

    //Return statement
    return (attribute_string) ? ` ${attribute_string}` : "";
  }

  /*
    onRangeChange() - Detects when a range is changed.
    arg0_range_el: (HTMLElement) - The HTML element of the range.
    arg1_listener: (Function) - The function to execute on change.
  */
  window.onRangeChange = function (arg0_range_el, arg1_listener) {
    //Convert from parameters
    var range_el = arg0_range_el;
    var listener = arg1_listener;

    //Declare local instance variables
    var n, c, m;

    range_el.addEventListener("input", function (e) {
      n = 1;
      c = e.target.value;

      if (c != m) listener(e);
      m = c;
    });
    range_el.addEventListener("change", function (e) {
      if (!n) listener(e);
    });
  }

  /*
    pointIsInCircle() - Checks if a point is in a circle.
    arg0_circle_x: (Number) - The x position of the circle.
    arg1_circle_y: (Number) - The y position of the circle.
    arg2_point_x: (Number) - The x position to check.
    arg3_point_y: (Number) - The y position to check.
    arg4_radius: (Number) - The radius of the circle.

    Returns: (Boolean)
  */
  window.pointIsInCircle = function (arg0_circle_x, arg1_circle_y, arg2_point_x, arg3_point_y, arg4_radius) {
    //Convert from parameters
    var circle_x = arg0_circle_x;
    var circle_y = arg1_circle_y;
    var point_x = arg2_point_x;
    var point_y = arg3_point_y;
    var radius = arg4_radius;

    //Declare local instance variables
    var distance_squared = (point_x - circle_x) ** 2 + (point_y - circle_y) ** 2;

    //Return statement
    return (distance_squared <= radius ** 2);
  }

  /*
    removeClasses() - Removes a list of classes from an element.

    arg0_element: (HTMLElement) - The HTML element to pass.
    arg1_array: (Array<String>) - The array of classes to remove.
  */
  window.removeClasses = function (arg0_element, arg1_array) {
    //Convert from parameters
    var element = arg0_element;
    var array = getList(arg1_array);

    //Declare local instance variables
    var element_class = element.getAttribute("class");

    if (element_class) {
      for (var i = 0; i < array.length; i++)
        element_class = element_class.replace(array[i], "");
      element.setAttribute("class", element_class);
    }

    //Return statement
    return element_class;
  }

  //removeErrorHandlers() - Removes onerror handlers.
  window.removeErrorHandlers = function () {
    if (!window.original_error_handlers)
      window.original_error_handlers = {};

    const elements = document.querySelectorAll('[onerror]');
    elements.forEach((element) => {
        original_error_handlers[element] = element.getAttribute('onerror');
        element.removeAttribute('onerror');
    });
  }

  window.resetAnimation = function (arg0_element) {
    //Convert from parameters
    var el = arg0_element;

    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null;
  }

  //restoreErrorHandlers() - Restores onerror handlers.
  window.restoreErrorHandlers = function () {
    for (const element in original_error_handlers)
      if (original_error_handlers.hasOwnProperty(element))
        //Check if the element is a valid HTML element
        if (element instanceof HTMLElement)
          element.setAttribute('onerror', original_error_handlers[element]);
  }

  /*
    showElement() - Shows an element by removing the 'hidden' class.

    arg0_element: (HTMLElement) - The HTML element to pass.
  */
  window.showElement = function (arg0_element) {
    //Convert from parameters
    var element = arg0_element;

    //Declare local instance variables
    var class_name = element.getAttribute("class");

    if (class_name)
      element.setAttribute("class", class_name.replace(/ hidden/gm, ""));
  }
}
