//Initialise functions
{
  /*
    createPanel()
      arg0_options: (Object)
        name: (String) - Optional. The name to print on the square tile. "" by default.
        animation: (String) - The CSS class to apply to the square tile.
          font_position: (String) - Optional. "bottom-left"/"bottom-right"/"centre"/"top-left". "bottom-right" by default
          font_size: (Number) - The font size to apply (1-3). 1 by default. Valid font sizes are:
            1 - .parallax-minor-project-text. 2vh
            2 - .parallax-major-project-text. 4vh
            3 - .parallax-group-text. 6vh
          font_weight: (Number) - The font weight to apply to the title. 300 by default.

        size: (Number) - The size of the tile (1-6). Valid square sizes are:
          1 - .large-square. 32vh
          2 - .sublarge-square. 28vh
          3 - .medium-square. 24vh
          4 - .submedium-square. 18vh
          5 - .small-square. 16vh
          6 - .tiny-square. 12vh
        x: (Number) - The x position (vh) to place the tile. 0 by default.
        y: (Number) - The y position (vh) to place the tile. 0 by default.

        default_bookmark: (Boolean) - Whether the panel is bookmarked by default.
        default_pin: (Boolean) - Whether the panel is pinned by default.
        dependencies: (Array<String, ...>) - Optional. The IDs of the tiles that descend from this category tile. Nothing by default.

        background_image: (String) - Optional. The file path to display as the background image for the tile. Undefined by default.
        background_opacity: (Number) - Optional. 0.3 by default if background_image is defined.
        colour: (String) - The CSS colour to portray the tile in. Colour classes are:
          "blue"/"blurple"/"bright-yellow"/"copper"/"cream_white"/"dark-blurple"/"dark-grey"/"forest-green"/"light-blue"/"light-grey"/"light-purple"/"midnight-blue"/"orange"/"mauve"/"red"/"sepia"/"salmon"/"transparent-sepia"/"yellow". "copper" by default.
        content: (String) - The HTML text to add to the content panel associated with the tile.
  */
  function createPanel (arg0_tile_id, arg1_options) {
    //Convert from parameters
    var tile_id = arg0_tile_id;
    var options = (arg1_options) ? arg1_options : {};
    var gallery_obj = main.gallery;

    //Initialise options
    if (!options.font_position) options.font_position = "bottom-right";
    if (!options.font_size) options.font_size = 1;
    if (!options.font_weight) options.font_weight = 300;

    if (!options.size) options.size = 1;
    if (!options.x) options.x = 0;
    if (!options.y) options.y = 0;

    if (!options.background_opacity) options.background_opacity = 0.3;
    if (!options.colour) options.colour = "copper";

    //Declare local instance variables
    var background_style = "";
    var default_x_offset = "23vw";
    var font_size_dict = {
      1: "parallax-minor-project-text",
      2: "parallax-major-project-text",
      3: "parallax-group-text"
    };
    var size_dict = {
      1: "large-square",
      2: "sublarge-square",
      3: "medium-square",
      4: "submedium-square",
      5: "small-square",
      6: "tiny-square"
    };
    var size_vh_dict = {
      1: 32,
      2: 28,
      3: 24,
      4: 18,
      5: 16,
      6: 12
    };

    var parallax_tile_container_el = document.getElementById("main-parallax-content-wrapper");
    var parallax_panel_container_el = document.getElementById("main-parallax-content-panel-scroll-wrapper");

    //Initialise background_style
    if (options.background_image)
      background_style = ` style = "background-image: url(${options.background_image}); opacity: ${options.background_opacity};"`;

    //Format tile_element
    var tile_element = `
      <div id = "${tile_id}" class = "parallax-item ${size_dict[options.size]} ${options.colour}" style = "position: absolute; top: calc(${options.y}vh + var(--parallax-offset-y)); left: calc(${default_x_offset} + ${options.x}vh + var(--parallax-offset-x));" onclick = "toggleContentPanel('${tile_id}'); selectParallaxItem('${tile_id}');">
        <div class = "parallax-item-colour-bg"></div>
        <div class = "parallax-item-bg"${background_style}></div>
        <span class = "${font_size_dict[options.font_size]} ${options.font_position}" style = "font-weight: ${options.font_weight}" >${options.name}</span>
      </div>
    `;

    //Add tile_element to parallax_tile_container_el
    parallax_tile_container_el.innerHTML += tile_element;

    //Format; set panel_element
    if (options.content) {
      var panel_element = `
        <div id = "${tile_id}-content-panel" class = "parallax-item-content-panel ${options.animation}-panel" style = "top: calc(${options.y}vh + var(--parallax-offset-y) + var(--content-panel-offset-y)); left: calc(23vw + ${options.x}vh + ${size_vh_dict[options.size]}vh + 8vh + var(--parallax-offset-x) + var(--content-panel-offset-x));">
          <div id = "${tile_id}-content-wrapper" class = "content-wrapper">
            <div id = "${tile_id}-text-wrapper" class = "text-wrapper">
              ${options.content}
            </div>
          </div>
        </div>
      `;

      parallax_panel_container_el.innerHTML += panel_element;
    }

    //Set in main.gallery.parallax_settings
    if (window.main && main.gallery) {
      var new_tile_obj = {};

      if (options.animation) new_tile_obj.animation = options.animation;
      if (options.dependencies) new_tile_obj.dependencies = options.dependencies;
      if (options.is_base_node) new_tile_obj.is_base_node = options.is_base_node;

      //Set new_tile_obj
      gallery_obj.parallax_settings[tile_id] = new_tile_obj;
    }

    //options.default_bookmark; options.default_pin handler
    if (options.default_bookmark)
      if (!gallery_obj.bookmark_items.includes(tile_id))
        gallery_obj.bookmark_items.push(tile_id);
    if (options.default_pin)
      if (!gallery_obj.parallax_pinned_items.includes(tile_id))
        gallery_obj.parallax_pinned_items.push(tile_id);
  }

  function initGalleryTiles () {
    //Declare local instance variables
    var all_tiles_keys = Object.keys(config.homepage.gallery.tiles);

    //Iterate over all_tiles_keys
    for (var i = 0; i < all_tiles_keys.length; i++) {
      var local_tile = config.homepage.gallery.tiles[all_tiles_keys[i]];

      try {
        createPanel(all_tiles_keys[i], local_tile);
      } catch (e) {
        console.error(e);
      }
    }
  };
}
