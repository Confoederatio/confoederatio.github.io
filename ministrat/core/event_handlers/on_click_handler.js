//Initialise functions
{
  function ministratMainMapClickHandler (e) {
    //Declare local reference variables
    var map_elements_obj = ministrat.main.map_elements;

    if (!map_elements_obj.main_map_el.getAttribute("class").includes("expanded"))
      loadMinistrat();
  }

  function ministratMapClickHandler (e) {
    //Declare local instance variables
    var map_svg = ministrat.main.map_elements.ministrat_svg_map_el;

    var click_point = map_svg.createSVGPoint();
    click_point.x = e.clientX;
    click_point.y = e.clientY;

    var click_point_in_map_coords = click_point.matrixTransform(map_svg.getScreenCTM().inverse());
    
    ministratDebugGeolocatorClickHandler(e);
  }
}