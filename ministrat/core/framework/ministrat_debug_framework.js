//Initialise functions
{
  function ministratDebugGeolocatorClickHandler (e) {
    if (!ministrat.main.debug_geolocator) return;

    //Declare local instance variables
    var all_locations = ministrat.config.all_locations;
    var first_empty_location = ["", 0]; //[location_name, index];
    var locations_obj = ministrat.config.locations;
    var map_svg = ministrat.main.map_elements.ministrat_svg_map_el;
    var map_overlay_el = ministrat.main.map_elements.map_overlay_el;

    var click_point = map_svg.createSVGPoint();
    click_point.x = e.clientX;
    click_point.y = e.clientY;

    var click_point_in_map_coords = click_point.matrixTransform(map_svg.getScreenCTM().inverse());

    console.log(`SVG x: ${click_point_in_map_coords.x}, SVG y: ${click_point_in_map_coords.y}`);

    //Fetch first_empty_location
    for (var i = 0; i < all_locations.length; i++)
      if (!locations_obj[all_locations[i]]) {
        first_empty_location = [all_locations[i], i];
        break;
      }

    var temp_label_div = document.createElement("div");
      temp_label_div.innerHTML = first_empty_location[0];
      temp_label_div.style.position = "absolute";
      temp_label_div.style.left = `${click_point_in_map_coords.x}px`;
      temp_label_div.style.top = `${click_point_in_map_coords.y}px`;
      temp_label_div.style.color = "white";
      temp_label_div.style.fontFamily = "Arial";
      temp_label_div.style.fontSize = "8px";
      map_overlay_el.appendChild(temp_label_div);

    console.log(`Geolocated ${first_empty_location[0]} at ${click_point_in_map_coords.x}, ${click_point_in_map_coords.y}`);
    ministrat.config.locations[first_empty_location[0]] = [
      click_point_in_map_coords.x,
      click_point_in_map_coords.y
    ];
    
    //Move onto the next location to geolocate
    console.log(`Now geolocating ${all_locations[first_empty_location[1] + 1]}`);
  }
}
