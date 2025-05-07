//Initialise functions
{
  /**
   * getTerrainAtCoords() - Returns the terrain ID/object at the given coordinates.
   * @param {number} arg0_x 
   * @param {number} arg1_y 
   * @param {Object} [arg2_options]
   *  @param {boolean} [arg2_options.return_key=false] - Whether to return the key instead of the terrain_obj.
   * 
   * @returns {Object|String}
   */
  function getTerrainAtCoords (arg0_x, arg1_y, arg2_options) {
    //Convert from parameters
    var coord_x = returnSafeNumber(arg0_x, 0);
    var coord_y = returnSafeNumber(arg1_y, 0);
    var options = (arg2_options) ? arg2_options : {};

    //Declare local instance variables
    var terrain_canvas_el = document.querySelector(ministrat.config.elements.map.ministrat_terrain_canvas_selector);
    var terrain_ctx = terrain_canvas_el.getContext("2d");
    var terrain_pixel_data = terrain_ctx.getImageData(coord_x, coord_y, 1, 1);

    var terrain_data = terrain_pixel_data.data;
    var terrain_rgba = [terrain_data[0], terrain_data[1], terrain_data[2]];

    var terrain_obj = ministrat.config.terrain[terrain_rgba.join(",")];
    console.log(terrain_rgba)

    //Return statement
    return (!options.return_key) ? terrain_obj : terrain_obj.id;
  }

  function loadMinistratTerrain () {
    //Declare local instance variables
    var canvas = document.querySelector(ministrat.config.elements.map.ministrat_terrain_canvas_selector);
    var config_terrain_obj = ministrat.config.terrain;
    var ctx = canvas.getContext("2d");
    var terrain_image_path = `./ministrat/map/ministrat_terrain.png`;

    //Load terrain canvas
    var image = new Image();
    image.crossOrigin = "anonymous";
    image.src = terrain_image_path;

    image.onload = function (e) {
      var actual_coords = svgCoordsToHTMLCoords(0, 0);
      var x_offset = -window.innerHeight*ministrat.config.defines.map.svg_vh_offset[0];
      var y_offset = -window.innerHeight*ministrat.config.defines.map.svg_vh_offset[1];
      
      ctx.imageSmoothingEnabled = false;
      ctx.willReadFrequently = true;
      ctx.drawImage(image, actual_coords[0], actual_coords[1], 1000 + x_offset, 1000 + y_offset);
    };

    //Load terrain config
    //Iterate over all_terrain_keys
    var all_terrain_keys = Object.keys(config_terrain_obj);

    for (var i = 0; i < all_terrain_keys.length; i++) {
      var local_terrain = config_terrain_obj[all_terrain_keys[i]];

      local_terrain.id = all_terrain_keys[i];
      if (local_terrain.colour)
        config_terrain_obj[local_terrain.colour.join(",")] = local_terrain;
    }
  }
}
