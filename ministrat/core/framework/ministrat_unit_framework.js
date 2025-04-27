class Ministrat_Unit {
  /**
   * @param {Object} [arg0_options]
   *  @param {String} [arg0_options.id]
   *  @param {String} [arg0_options.country]
   *  @param {String} [arg0_options.name]
   *  @param {String} [arg0_options.type="infantry"] - Either 'air'/'armour'/'artillery'/'infantry'.
   *  @param {number} [arg0_options.x]
   *  @param {number} [arg0_options.y]
   */
  constructor (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var has_name = (options.name != undefined);
    var has_no_id = (options.id == undefined);

    this.id = (options.id) ? options.id : generateRandomID();
    this.country = options.country;
    this.name = (options.name) ? 
      options.name : this.id;
    this.type = (options.type) ? 
      options.type : "infantry";

    this.height = 16;
    this.offset_x = ministrat.config.offset_x;
    this.offset_y = ministrat.config.offset_y;
    this.width = 16;
    this.x = returnSafeNumber(options.x, 0);
    this.y = returnSafeNumber(options.y, 0);

    //Statistics - Can be modified by individual units
    this.unit_attack_modifier = 1;
    this.unit_defence_modifier = 1;
    this.unit_movement_modifier = 1;
    this.unit_range_modifier = 1;

    if (has_name && has_no_id)
      this.id = this.name;

    //Draw unit on map
    this.draw();
  }

  deselect () {
    //Declare local instance variables
    var unit_el = document.getElementById(this.id);

    if (!unit_el) return; //Guard clause if unit doesn't exist

    unit_el.style.filter = "";
    removeElement(ministrat.main.selected_units, this.id);
  }

  draw () {
    //Declare local instance variables
    var icon_name_dictionary = {
      air: "aircraft",
      armour: "armour",
      artillery: "artillery",
      infantry: "infantry"
    };
    var map_overlay_el = ministrat.main.map_elements.map_overlay_el;
    var unit_el = document.getElementById(this.id);

    if (!unit_el) {
      var unit_icon_path = `./ministrat/gfx/unit_icons/${icon_name_dictionary[this.type]}_${this.country.toUpperCase()}_colour.png`;

      unit_el = document.createElement("div");
        unit_el.id = this.id;
      var unit_img = document.createElement("img");
        unit_img.src = unit_icon_path;
        unit_img.style.width = `${this.width}px`;
        unit_img.style.height = `${this.height}px`;
      unit_el.appendChild(unit_img);
      
      var unit_instance = this;
      unit_el.onclick = function (e) {
        deselectAllUnits();
        unit_instance.select();

        console.log(`Unit ${unit_instance.id} clicked`);
        console.log(unit_instance.getCurrentTerrain());
        console.log(`Closest city: ${unit_instance.getClosestCity().name}, distance: ${unit_instance.getClosestCityDistance()}km`);
      };

      map_overlay_el.appendChild(unit_el);
    }

    //Coords handling
    var actual_coords = svgCoordsToHTMLCoords(this.x, this.y);

    this.display_x = actual_coords[0] - this.width/2;
    this.display_y = actual_coords[1] - this.height/2;

    unit_el.style.position = "absolute";
    unit_el.style.transform = `translate(${this.display_x}px, ${this.display_y}px)`;

    //Selection handling
    if (ministrat.main.selected_units.includes(this.id)) {
      unit_el.style.filter = "brightness(100)";
    } else {
      unit_el.style.filter = "";
    }
  }

  select () {
    //Declare local instance variables
    var unit_el = document.getElementById(this.id);

    if (!unit_el) return; //Guard clause if unit doesn't exist
    if (this.country != ministrat.gamestate.player_tag) return; //Make sure player can only command their own units

    if (!ministrat.main.selected_units.includes(this.id))
      ministrat.main.selected_units.push(this.id);
  }

  //Conditionals
  getCanvasCoords () {
    //Declare local instance variables
    var actual_coords = [
      this.x + ministrat.config.defines.map.canvas_offset[0] - this.width/2, 
      this.y + ministrat.config.defines.map.canvas_offset[1] - this.height/2
    ];

    //Return statement
    return actual_coords;
  }

  getClosestCity (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var actual_coords = this.getCanvasCoords();
    var cities_obj = ministrat.gamestate.cities;

    //Iterate over all_cities
    var all_cities = Object.keys(cities_obj);
    var closest_city = ["", Infinity];

    for (var i = 0; i < all_cities.length; i++) {
      var local_city = cities_obj[all_cities[i]];
      var local_city_coords = local_city.getCanvasCoords();
      
      var local_city_distance = getDistance(actual_coords[0], actual_coords[1], local_city_coords[0], local_city_coords[1]);

      if (local_city_distance < closest_city[1]) {
        closest_city[0] = all_cities[i];
        closest_city[1] = local_city_distance;
      }
    }

    //Return statement
    return (!options.return_key) ? cities_obj[closest_city[0]] : closest_city;
  }

  getClosestCityDistance () {
    //Declare local instance variables
    var actual_coords = this.getCanvasCoords();
    var closest_city = this.getClosestCity();
    var closest_city_coords = closest_city.getCanvasCoords();
    var raw_distance = getDistance(actual_coords[0], actual_coords[1], closest_city_coords[0], closest_city_coords[1]);

    //Return statement
    return raw_distance/ministrat.config.defines.map.px_per_km;
  }

  /**
   * getCurrentTerrain() - Returns the current terrain the unit is located in.
   * @param {*} [arg0_options]
   *  @param {boolean} [arg0_options.return_key=false] - Whether to return the key instead of the terrain_obj.
   */
  getCurrentTerrain (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var actual_coords = this.getCanvasCoords();

    //Return statement
    return getTerrainAtCoords(actual_coords[0], actual_coords[1], options);
  }
  
  isEnemyOf (arg0_tag) {
    //Convert from parameters
    var tag = (arg0_tag) ? arg0_tag : "";

    //Declare local instance variables
    var country_obj = ministrat.gamestate.countries[this.country];
    var ot_country_obj = ministrat.gamestate.countries[tag];

    //Return statement
    if (country_obj.team != ot_country_obj.team)
      return true;
  }

  isWithinUrbanRange (arg0_distance) {
    //Convert from parameters
    var distance = (arg0_distance) ? arg0_distance : 0;

    //Return statement
    return (this.getClosestCityDistance() <= distance);
  }

  //Effects
  applyModifiers () {

  }

  //Statistics
  getAttackModifier (arg0_unit_type) {
    //Convert from parameters
    var unit_type = (arg0_unit_type) ? arg0_unit_type : "";

    //Declare local instance variables
    var country_obj = ministrat.gamestate.countries[this.country];
    var team_obj = ministrat.config.history.teams[country_obj.team];
    var unit_attack_modifier = 1;

    //General modifier calculation
    

    //Country modifier calculation

    //Unit-specific modifier addition
  }

  getDefenceModifier (arg0_unit_type) {

  }

  getMovementModifier (arg0_unit_type) {
    
  }

  getRangeModifier (arg0_unit_type) {

  }
}

//Initialise functions
{
  function deselectAllUnits () {
    //Declare local instance variables
    var all_units = Object.keys(ministrat.gamestate.units);

    //Iterate over all units; deselect them
    for (var i = 0; i < all_units.length; i++) {
      var local_unit = ministrat.gamestate.units[all_units[i]];
      
      local_unit.deselect();
    }
  }

  function loadMinistratUnits () {
    //Declare local instance variables
    var units_obj = ministrat.gamestate.units;

    //Load units once starting animation has finished
    setTimeout(function(){
      //Iterate over all_countries
      var all_countries = Object.keys(ministrat.config.history.countries);

      for (var i = 0; i < all_countries.length; i++) {
        var local_orbat = ministrat.config.orbats[all_countries[i]];

        //Populate ministrat.main.unique_locations[all_countries[i]] first
        ministrat.main.unique_locations[all_countries[i]] = [];
        var local_unique_locations = ministrat.main.unique_locations[all_countries[i]];

        //Make sure local_orbat exists
        if (local_orbat) {
          var all_orbat_units = Object.keys(local_orbat);
          
          //Iterate over all_orbat_units, populate local_unique_locations
          for (var x = 0; x < all_orbat_units.length; x++) {
            var local_orbat_unit = local_orbat[all_orbat_units[x]];

            if (local_orbat_unit.location)
              if (!local_unique_locations.includes(local_orbat_unit.location))
                if (!ministrat.config.locations[local_orbat_unit.location])
                  if (!ministrat.config.all_locations.includes(local_orbat_unit.location))
                    local_unique_locations.push(local_orbat_unit.location);
          }

          //Add to unique_locations
          ministrat.config.all_locations = ministrat.config.all_locations.concat(local_unique_locations);

          //Iterate over all_orbat_units, load all ORBAT units
          for (var x = 0; x < all_orbat_units.length; x++) {
            var local_orbat_unit = local_orbat[all_orbat_units[x]];
            var local_location = ministrat.config.locations[local_orbat_unit.location];

            if (local_location != "" && local_location != "(location not specified)")
              if (local_location[0] > 0 && local_location[1] > 0)
                ministrat.gamestate.units[local_orbat_unit.name] = new Ministrat_Unit({
                  country: all_countries[i],
                  name: local_orbat_unit.name,
                  type: local_orbat_unit.type,
                  x: local_location[0],
                  y: local_location[1]
                });
          }
        }
      }

      ministrat.config.all_locations = uniqueArray(ministrat.config.all_locations);
    }, ministrat.config.defines.common.unit_load_delay);
  }

  function unitSelectionHandler (arg0_x, arg1_y, arg2_width, arg3_height) {
    //Convert from parameters
    var coord_x = returnSafeNumber(arg0_x, 0);
    var coord_y = returnSafeNumber(arg1_y, 0);
    var width = returnSafeNumber(arg2_width, 0);
    var height = returnSafeNumber(arg3_height, 0);

    //Declare local instance variables
    var all_units = Object.keys(ministrat.gamestate.units);
    var selected_units = [];

    //Deselect all units first
    deselectAllUnits();

    //Iterate over all_units; check if each unit is within the selection box
    for (var i = 0; i < all_units.length; i++) {
      var local_unit = ministrat.gamestate.units[all_units[i]];

      if (local_unit.display_x <= coord_x + width && local_unit.display_x + local_unit.width >= coord_x && local_unit.display_y <= coord_y + height && local_unit.display_y + local_unit.height >= coord_y)
        local_unit.select();
    }

    console.log(ministrat.main.selected_units);

    //Return statement
    return selected_units;
  }
}