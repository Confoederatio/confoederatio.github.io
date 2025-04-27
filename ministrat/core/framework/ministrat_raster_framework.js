class Ministrat_Heatmap {
  constructor (arg0_tag, arg1_type) {
    //Convert from parameters
    var tag = (arg0_tag) ? arg0_tag : "";
    var type = (arg1_type) ? arg1_type : "infantry";

    //Declare local instance variables
    var map_defines = ministrat.config.defines.map;
    var ministrat_canvas_overlay_el = document.querySelector(ministrat.config.elements.map.ministrat_canvas_selector);
    var ministrat_terrain_canvas_el = document.querySelector(ministrat.config.elements.map.ministrat_terrain_canvas_selector);

    this.debug_heatmap = false;
    this.heatmap_downscale_factor = Math.floor(map_defines.pathfind_downscale_factor*map_defines.px_per_km);
    this.id = `${tag}-${type}-flowfield-heatmap`;
    this.tag = tag;
    this.type = type;

    //Create canvas element
    this.canvas = document.createElement("canvas");
    this.canvas.id = this.id;
    this.canvas.width = 1000;
    this.canvas.height = 1000;

    //Create context
    this.ctx = this.canvas.getContext("2d");
    
    if (!this.debug_heatmap)
      this.canvas.style.opacity = 0;
    ministrat_canvas_overlay_el.appendChild(this.canvas);
    var local_instance = this;
    setTimeout(function () {
      if (local_instance.debug_heatmap)
        console.time(`${local_instance.id} calculation time:`);
      local_instance.draw();
      if (local_instance.debug_heatmap)
        console.timeEnd(`${local_instance.id} calculation time:`);
    }, 1000);

    //Set Ministrat_Heatmap in ministrat.gamestate.rasters
    ministrat.gamestate.rasters[this.id] = this;
  }

  draw () {
    //Declare local instance variables
    var ai_defines = ministrat.config.defines.ai;
    var terrain_canvas_el = document.querySelector(ministrat.config.elements.map.ministrat_terrain_canvas_selector);
    var terrain_obj = ministrat.config.terrain;

    //Populate terrain_cost map
    var terrain_cost_map = {
      "0,0,0": -9999
    };

    //Iterate over all_terrains
    var all_terrains = Object.keys(terrain_obj);
    var heatmap_data = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    var max_value = null;
    var min_value = null;

    for (var i = 0; i < all_terrains.length; i++) {
      var local_terrain = terrain_obj[all_terrains[i]];

      if (local_terrain.colour)
        terrain_cost_map[local_terrain.colour.join(",")] = returnSafeNumber(local_terrain.modifiers[this.type].movement*10, 0);
    }

    //Draw terrain cost first
    if (terrain_canvas_el) {
      var terrain_ctx = terrain_canvas_el.getContext("2d");
      var terrain_data = terrain_ctx.getImageData(0, 0, terrain_canvas_el.width, terrain_canvas_el.height);
      
      console.log(terrain_data);
      for (var i = 0; i < terrain_canvas_el.height; i++)
        for (var x = 0; x < terrain_canvas_el.width; x++) {
          var local_index = (i*terrain_canvas_el.width + x)*4;

          var local_colour = [
            terrain_data.data[local_index],
            terrain_data.data[local_index + 1],
            terrain_data.data[local_index + 2]
          ];

          if (terrain_cost_map[local_colour.join(",")] != undefined) {
            var local_cost = terrain_cost_map[local_colour.join(",")];
            var local_heatmap_colour = encodeNumberAsRGBA(local_cost);
            //console.log(local_cost, local_heatmap_colour);

            if (max_value == null || local_cost > max_value)
              if (local_cost != -9999)
                max_value = local_cost;
            if (min_value == null || local_cost < min_value)
              if (local_cost != -9999)
                min_value = local_cost;

            heatmap_data.data[local_index] = local_heatmap_colour[0];
            heatmap_data.data[local_index + 1] = local_heatmap_colour[1];
            heatmap_data.data[local_index + 2] = local_heatmap_colour[2];
            heatmap_data.data[local_index + 3] = local_heatmap_colour[3];
          }
        }
    }

    //Define internal helper functions
    {
      var local_instance = this;
      /**
       * addMultipleBlockDropoffs() - Adds Manhattan centres of gravity to the current heatmap.
       * @param {Array<Array<number, number>>} arg0_centres - The [x, y] centres of gravity to add to the heatmap.
       * @param {Array<number>} arg1_max_values - The maximum values at each centre.
       * @param {number} [arg2_downscale_factor=4] - The downscale factor to apply to the heatmap.
       */
      this.addMultipleBlockDropoffs = function (arg0_centres, arg1_max_values, arg2_downscale_factor) {
        //Convert from parameters
        var centres = getList(arg0_centres);
        var max_values = getList(arg1_max_values);
        var downscale_factor = returnSafeNumber(arg2_downscale_factor, 4);

        //Guard clause if downscale_factor actually upscales
        if (downscale_factor < 1) {
          console.warn("Downscale factor must be 1 or greater. Setting to 1.");
          downscale_factor = 1;
        }

        //Ensure integer factor for simplicity, floor avoids potential issues
        downscale_factor = Math.max(1, Math.floor(downscale_factor)); 

        //Declare local instance variables
        var original_width = local_instance.canvas.width;
        var original_height = local_instance.canvas.height;

        var downscaled_width = Math.floor(original_width/downscale_factor);
        var downscaled_height = Math.floor(original_height/downscale_factor);
        var value_buffer = new Float32Array(downscaled_width*downscaled_height); //value_buffer for storing addditive heatmap values

        //Iterate over all max_values and update max_value
        for (var i = 0; i < max_values.length; i++)
          max_value = Math.max(max_value, max_values[i]);

        //Iterate over all centres
        for (var i = 0; i < centres.length; i++) {
          //Map centre coordinates to the downscaled grid
          var local_downscaled_centre_x = Math.floor(centres[i][0]/downscale_factor);
          var local_downscaled_centre_y = Math.floor(centres[i][1]/downscale_factor);
          var local_max_value = max_values[i];

          //Clamp coordinates within the downscaled bounds
          local_downscaled_centre_x = Math.max(0, Math.min(downscaled_width - 1, local_downscaled_centre_x));
          local_downscaled_centre_y = Math.max(0, Math.min(downscaled_height - 1, local_downscaled_centre_y));

          //Iterate over the downscaled grid
          for (var x = 0; x < downscaled_width; x++)
            for (var y = 0; y < downscaled_height; y++) {
              var buffer_index = y*downscaled_width + x;
              var local_distance = Math.abs(x - local_downscaled_centre_x) + Math.abs(y - local_downscaled_centre_y);
              var local_value = local_max_value - local_distance;

              //If the new value is greater than the existing value, or if it remains uninitialised, update the buffer value
              if (local_value > value_buffer[buffer_index] || i == 0) {
                  value_buffer[buffer_index] = local_value;

                  //Update min_value if appropriate
                  if (local_value < min_value)
                    min_value = local_value;
              }
            }
        }

        //Upscale and apply downscaled heatmap buffer to full resolution heatmap data

        for (let x = 0; x < original_width; x++)
          for (let y = 0; y < original_height; y++) {
            //Find the corresponding pixel in the downscaled buffer (Nearest Neighbor)
            var dx = Math.min(downscaled_width - 1, Math.floor(x/downscale_factor));
            var dy = Math.min(downscaled_height - 1, Math.floor(y/downscale_factor));

            var buffer_index = dy*downscaled_width + dx;
            var value_from_buffer = value_buffer[buffer_index];

            //Only proceed if there's a value contribution from the buffer
            if (value_from_buffer != 0) {
              var local_index = (y * original_width + x) * 4;

              //Get current value from heatmap_data if it exists (alpha > 0)
              var current_value = 0;
              current_value = decodeRGBAAsNumber([
                heatmap_data.data[local_index],
                heatmap_data.data[local_index + 1],
                heatmap_data.data[local_index + 2],
                heatmap_data.data[local_index + 3]
              ]);

              //Add the buffer value to the existing value
              var new_value = current_value + value_from_buffer;

              //Encode the new value back into RGBA
              var rgba = encodeNumberAsRGBA(new_value);

              //Update the actual heatmap pixel data
              if (current_value != -9999) {
                heatmap_data.data[local_index] += rgba[0];
                heatmap_data.data[local_index + 1] += rgba[1];
                heatmap_data.data[local_index + 2] += rgba[2];
                heatmap_data.data[local_index + 3] += rgba[3];
              }
            }
          }
      };
    }

    //AI flowfield processing doesn't apply to player
    if (this.tag != ministrat.gamestate.player_tag) {
      //1. City processing
      {
        //Get all cities
        var all_cities = Object.keys(ministrat.gamestate.cities);
        var heatmap_coordinates = [];
        var heatmap_values = [];

        //Iterate over all_cities
        for (var i = 0; i < all_cities.length; i++) {
          var local_city = ministrat.gamestate.cities[all_cities[i]];
          var local_value = 0;

          if (local_city.isEnemyCityOf(this.tag)) {
            //Enemy capital check
            if (local_city.is_capital)
              local_value += returnSafeNumber(ai_defines.enemy_capital_base_value, 0);

            //Enemy city check
            local_value += returnSafeNumber(ai_defines.enemy_city_base_value, 0);

            //Enemy city size check
            var local_city_size = local_city.size - 1;

            local_value += returnSafeNumber(local_city_size*ai_defines.enemy_city_value_per_size, 0);

            //Add to heatmap
            var local_city_coords = [local_city.x, local_city.y];
            heatmap_coordinates.push(local_city_coords);
            heatmap_values.push(local_value);
          }
        }
      }

      //2. Unit processing
      {
        //Iterate over all_units
        var all_units = Object.keys(ministrat.gamestate.units);

        for (var i = 0; i < all_units.length; i++) {
          var local_unit = ministrat.gamestate.units[all_units[i]];

          if (local_unit.isEnemyOf(this.tag)) {
            heatmap_coordinates.push([local_unit.x + ministrat.config.defines.map.canvas_offset[0], local_unit.y + ministrat.config.defines.map.canvas_offset[1]]);
            heatmap_values.push(ai_defines.enemy_unit_base_value);
          }
        }
      }

      console.log(heatmap_coordinates, heatmap_values);
      this.addMultipleBlockDropoffs(heatmap_coordinates, heatmap_values, this.heatmap_downscale_factor);
    }

    //Draw heatmap in Viridis
    var total_range = max_value - min_value;
    console.log(total_range, max_value, min_value);

    if (this.debug_heatmap)
      for (var i = 0; i < this.canvas.height; i++)
        for (var x = 0; x < this.canvas.width; x++) {
          var local_index = (i*this.canvas.width + x)*4;
          var local_value = decodeRGBAAsNumber([
            heatmap_data.data[local_index],
            heatmap_data.data[local_index + 1],
            heatmap_data.data[local_index + 2],
            heatmap_data.data[local_index + 3]
          ]);

          var local_fraction = (local_value - min_value)/total_range;

          var local_colour = hexToRGB(d3.interpolateMagma(local_fraction));

          //Check if local_value is valid; or if it is non-traversable
          if (local_value != 9999) {
            heatmap_data.data[local_index] = local_colour[0];
            heatmap_data.data[local_index + 1] = local_colour[1];
            heatmap_data.data[local_index + 2] = local_colour[2];
            heatmap_data.data[local_index + 3] = 255;
          }
        }
    
    this.ctx.putImageData(heatmap_data, 0, 0);
  }
}

//Initialise functions
{
  /**
   * updateRandomFlowfield() - Updates a random AI flowfield.
   */
  function updateRandomFlowfield () {
    //Declare local instance variables
    var all_flowfields = [];
    var all_heatmaps = Object.keys(ministrat.gamestate.rasters);

    //Iterate over all_heatmaps
    for (var i = 0; i < all_heatmaps.length; i++) {
      var local_heatmap = ministrat.gamestate.rasters[all_heatmaps[i]];

      if (local_heatmap.tag != ministrat.gamestate.player_tag)
        all_flowfields.push(local_heatmap);
    }

    //Draw random flowfield
    if (all_flowfields.length > 0)
      randomElement(all_flowfields).draw();
  }
}