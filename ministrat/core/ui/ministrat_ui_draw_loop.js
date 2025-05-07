//Initialise functions
{
  function loadMinistratUIDrawLoop () {
    ministrat.ui_draw_loop = setInterval(function() {
      //Declare local instance variables
      var cities_obj = ministrat.gamestate.cities;
      var units_obj = ministrat.gamestate.units;
  
      //Map
      {
        //Iterate over all_cities; draw all cities
        var all_cities = Object.keys(cities_obj);

        for (var i = 0; i < all_cities.length; i++) {
          var local_city = cities_obj[all_cities[i]];

          local_city.draw();
        }

        //Iterate over all_units; draw all units
        var all_units = Object.keys(units_obj);
          
        for (var i = 0; i < all_units.length; i++) {
          var local_unit = units_obj[all_units[i]];

          local_unit.draw();
        }
      }
    }, 100);
  }
}
