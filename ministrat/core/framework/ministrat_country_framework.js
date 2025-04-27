class Ministrat_Country {
  /**
   * @param {Object} [arg0_options]
   *  @param {String} arg0_options.id
   *  @param {String} arg0_options.name
   * 
   *  @param {Array<number, number, number>} arg0_options.colour
   *  @param {String} arg0_options.team - Either 'nato'/'wto'
   * 
   *  @param {number} [arg0_options.money=0]
   */
  constructor (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};
    
    //Declare local instance variables
    this.id = options.id;
    this.tag = options.id;

    this.name = (options.name) ? 
      options.name : options.id;
    this.colour = (options.colour) ? 
      options.colour : [255, 255, 255];
    this.team = (options.team) ? 
      options.team : "nato";

    this.money = returnSafeNumber(options.money, 0);

    //Player handler
    if (options.is_default_player)
      ministrat.gamestate.player_tag = this.tag;
    
    if (this.tag == "ddr") {
      var local_instance = this;
      setTimeout(function(){
        local_instance.loadHeatmap();
      }, 10000);
    }
  }

  loadHeatmap () {
    //Declare local instance variables
    var ministrat_canvas_overlay_el = document.querySelector(ministrat.config.elements.map.ministrat_canvas_selector);

    //Create heatmap element
    if (!this.heatmap)
      this.heatmap = new Ministrat_Heatmap(this.tag);
  }
}

//Initialise functions
{
  function getMinistratFactions () {
    //Declare local reference variables
    var countries_obj = ministrat.gamestate.countries;
    var return_obj = {};

    //Iterate over all_countries
    var all_countries = Object.keys(countries_obj);

    for (var i = 0; i < all_countries.length; i++) {
      var local_country = countries_obj[all_countries[i]];
      
      if (local_country.team) {
        if (!return_obj[local_country.team])
          return_obj[local_country.team] = [];
        return_obj[local_country.team].push(all_countries[i]);
      }

      //Return statement
      return return_obj;
    }
  }

  function loadMinistratCountries () {
    //Declare local reference variables
    var config_countries_obj = ministrat.config.history.countries;
    var countries_obj = ministrat.gamestate.countries;

    //Iterate over all_config_countries_keys
    var all_config_countries_keys = Object.keys(config_countries_obj);

    for (var i = 0; i < all_config_countries_keys.length; i++) {
      var local_config_country_obj = config_countries_obj[all_config_countries_keys[i]];

      countries_obj[all_config_countries_keys[i]] = new Ministrat_Country(local_config_country_obj);
    }
  }
}
