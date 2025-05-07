class Ministrat_City {
  constructor (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var cities_dom = ministrat.main.map_elements.cities_dom;

    this.controller = (options.controller) ? 
      options.controller : "neutral";
    this.owner = (options.owner) ? 
      options.owner : "neutral";
    this.is_capital = (options.is_capital) ? 
      options.is_capital : false;
    this.label_selector = options.label_selector;
    this.marker_selector = options.marker_selector;
    this.size = returnSafeNumber(options.size, 1);

    //1. Fetch .label_el; .marker_el
    this.label_el = cities_dom.querySelector(this.label_selector);
    this.marker_el = cities_dom.querySelector(this.marker_selector);

    //1.1. Set city coordinates
    this.x = parseFloat(this.marker_el.getAttribute('x'));
    this.y = parseFloat(this.marker_el.getAttribute('y'));
    if (isNaN(this.x) || isNaN(this.y)) {
      this.x = parseFloat(this.marker_el.getAttribute('cx'));
      this.y = parseFloat(this.marker_el.getAttribute('cy'));
    }

    this.x -= 500; //Viewport SVG offset
    this.y -= 16; //Viewport SVG offset

    //2. Fetch .name field from label_selector
    this.name = (!options.name) ? 
      this.label_el.textContent : options.name;
    
    //Set colour
    this.draw();
  }

  getCanvasCoords () {
    //Return statement
    return [this.x, this.y];
  }

  draw () {
    //Declare local instance variables
    var country_obj = ministrat.gamestate.countries[this.owner];

    if (country_obj) {
      var adjusted_label_colour = [
        Math.min(255, country_obj.colour[0] + 20),
        Math.min(255, country_obj.colour[1] + 20),
        Math.min(255, country_obj.colour[2] + 20)
      ];
      var local_colour = `rgb(${adjusted_label_colour[0]}, ${adjusted_label_colour[1]}, ${adjusted_label_colour[2]})`;

      //Convert image to rect so we can draw the actual colour
      if (this.marker_el.tagName == "image") {
        var image_el = this.marker_el;
        var rect_el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect_el.setAttribute('x', image_el.getAttribute('x'));
        rect_el.setAttribute('y', image_el.getAttribute('y'));
        rect_el.setAttribute('width', image_el.getAttribute('width'));
        rect_el.setAttribute('height', image_el.getAttribute('height'));
        rect_el.setAttribute('id', image_el.getAttribute('id'));
        
        image_el.parentNode.replaceChild(rect_el, image_el);
        this.marker_el = rect_el;
      }

      if (!this.is_capital) {
        this.marker_el.style.fill = local_colour;
        this.marker_el.style.stroke = local_colour;
      } else {
        this.marker_el.style.fill = `rgb(240, 216, 120)`;
        this.marker_el.style.stroke = `rgb(240, 216, 120)`;
      }

      var interior_label_els = this.label_el.querySelectorAll("tspan");

      this.label_el.setAttribute("fill", local_colour);
      this.label_el.setAttribute("style", 
        this.label_el.getAttribute("style").replace(/fill\s*:\s*[^;]+;?/i, "")
      );
      for (var i = 0; i < interior_label_els.length; i++) {
        interior_label_els[i].setAttribute("fill", local_colour);
        interior_label_els[i].setAttribute("style", 
          interior_label_els[i].getAttribute("style").replace(/fill\s*:\s*[^;]+;?/i, "")
        );
      }

      if (this.is_capital)
        for (var i = 0; i < interior_label_els.length; i++) {
          interior_label_els[i].style.fontWeight = "700";
          interior_label_els[i].style.textDecoration = "underline";
        }
    }
  }

  isEnemyCityOf (arg0_tag) {
    //Convert from parameters
    var tag = arg0_tag;

    //Guard clause if tag and .controller are the same
    if (tag == this.controller) return false;

    //Declare local instance variables
    var country_obj = ministrat.gamestate.countries[tag];
    var ot_country_obj = ministrat.gamestate.countries[this.controller];

    //Return true if country_obj.team is not the same as ot_country_obj.team
    return (country_obj.team != ot_country_obj.team);
  }
}

//Initialise functions
{
  function loadMinistratCities () {
    //Declare local instance variables
    var config_cities_obj = ministrat.config.cities;

    //Iterate over all_config_cities_keys
    var all_config_cities_keys = Object.keys(config_cities_obj);

    for (var i = 0; i < all_config_cities_keys.length; i++) {
      var local_config_city = config_cities_obj[all_config_cities_keys[i]];

      //Create new Ministrat_City instance
      ministrat.gamestate.cities[all_config_cities_keys[i]] = new Ministrat_City(local_config_city);
    }
  }
}