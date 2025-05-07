window.ministrat = {
  config: {
    all_locations: [],
    defines: {},
    elements: {},
    history: {},
    locations: {},
    orbats: {},
    selectors: {},
    units: {},
    unique_locations: {}
  },
  gamestate: {
    date: {
      day: 9,
      month: 11,
      year: 1983,
      hour: 0 //24-hour time
    },

    cities: {},
    countries: {},
    rasters: {},
    units: {},
    player_tag: undefined
  },
  main: { //Used for controls/saves
    //Cache
    map_elements: {},
    unique_locations: {},

    //Controls
    game_open: false,
    game_speed: 0, //Game speeds are 0, 1, 3, 5
    ignore_scroll: false,
    is_dragging: false,
    is_selecting: false,
    map: {
      start_x: 0,
      start_y: 0,
      
      x: 0,
      y: 0,
      zoom: 1,
    },
    selected_units: [],

    //Debug
    debug_geolocator: false,
  }
};