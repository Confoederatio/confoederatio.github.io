config.homepage.gallery.tiles = {
  //CRD
  CRD: {
    name: "CRD",
    
    animation: "crd",
    font_position: "centre",
    font_size: 3,
    font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 0,
    y: 28,
    
    colour: "light-blue",
    content: `<div class = "parallax-item-content-panel-title">CRD</div>
    <hr class = "parallax-item-content-panel-divider">
    <div class = "parallax-item-content-panel-body-text">
      <b>Confoederatio, Research Division</b>, also known as <u>CRD</u>, works on academic datasets and tooling for their maintenance and production. Most tasks are applied, typically to spatiotemporal data and social systems or simulations. It is directly analogous to the Research Divisions of other data science studios.
      <br><br>
      All work produced by CRD, like any other division of Confoederatio, are MIT licenced for use, including accessible datasets. 
      <br><br>
      <hr class = "parallax-item-content-panel-divider">
      <br>
      <img src = "gfx/interface/logos/crd_coat_of_arms_logo.png" width = "100%">
    </div>
    `,
    dependencies: ["datasets"],
  },
  
  datasets: {
    name: "Datasets",
    
    animation: "datasets",
    default_pin: true,
    font_position: "bottom-right",
    font_size: 2,
    font_weight: 500,
    size: 1,
    x: 32,
    y: 32,
    
    colour: "light-grey",
    content: `<div class = "parallax-item-content-panel-title">Datasets</div>
    <hr class = "parallax-item-content-panel-divider">
    <div class = "parallax-item-content-panel-body-text">
      Open-access datasets from Confoederatio typically focus on long-term spatiotemporal data such as estimated GDP PPP, population, urban growth, etc. with coverage from 10000BC up until the present day at standard, structured resolution for both academic researchers and data scientists.
      <br><br>
      Datasets are typically classified as either <b>Histmap</b> in that they contain long-run historical data, or <b>Livemap</b>, which is updated in real time and focuses mainly on OSINT.
      <br><br>
      <b>Histmap:</b>
      <ul>
        <li>Eoscala (Historical Economics), 10000BC-2023AD</li>
        <li>
        Velkscala (Historical Population), 10000BC-2023AD
        <ul>
          <li>Stadestér (Urban Growth & Statistics), 3000BC-2025AD</li>
        </ul>
        </li>
      </ul>
      <b>Livemap:</b>
      <ul>
        <li>Collation (OSINT), 2026AD-</li>
      </ul>
    </div>
    `,
    dependencies: ["histmap", "livemap_collation"],
  },
  histmap: {
    name: "Histmap",
    
    animation: "histmap",
    default_pin: true,
    font_position: "centre",
    font_size: 2,
    font_weight: 300,
    size: 2,
    x: 64,
    y: 32,
    
    colour: "transparent-sepia",
    dependencies: ["atlas", "eoscala", "stadester", "velkscala"],
  },
  
  livemap_collation: {
    name: "Livemap/<br>Collation",
    
    animation: "livemap-collation",
    background_image: "gfx/interface/tiles/livemap_collation.png",
    background_opacity: 0.3,
    content: `<div id = "georeferencer-content-wrapper" class = "parallax-item-content-panel-title">Livemap/Collation</div>
    <hr class = "parallax-item-content-panel-divider">
    <div class = "parallax-item-content-panel-body-text">
      <div id = "georeferencer-preview" class = "preview-image-container">
        <img src = "gfx/interface/tiles/31.georeferencer.jpg" class = "preview-image" id = "georeferencer">
      </div>
    </div>
    `,
    default_bookmark: true,
    default_pin: true,
    font_position: "bottom-left",
    font_size: 2,
    font_weight: 100,
    size: 2,
    x: 32,
    y: 64,
    
    colour: "midnight-blue",
  },
  
  software_and_tooling_crd: {
    name: "Research Software",
    
    animation: "crd-software-and-tooling",
    font_position: "bottom-right",
    font_size: 2,
    font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 64,
    y: 64,
    
    colour: "copper",
    dependencies: ["naissance"],
  },
  naissance: {
    name: "Naissance<br>HGIS",
    
    animation: "naissance",
    background_image: `gfx/interface/tiles/naissance.png`,
    background_opacity: 0.175,
    font_position: "centre",
    font_size: 2,
    font_weight: 500,
    default_bookmark: true,
    default_pin: true,
    size: 2,
    x: 96,
    y: 68,
    
    colour: "bright-yellow",
    content: `<div class = "parallax-item-content-panel-title">Naissance GIS</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span class = "parallax-item-beta">Beta (Ongoing)</span>,<br>
    <span class = "parallax-item-development-date">6 April 2023 -</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      Naissance is an open-source historical 3D GIS built for proxy modelling, raster input and wrangling, simulation and statistical analysis with undo/redo trees and version control with user-first UI design. We aim to eventually enable modernised data visualisation and mapmaking to create interactive atlases, different mapmodes, and 3/video export options, alongside full-spectrum gridmap editing.
      <br><br>
      All generated files by Naissance are currently stored in JSON, with GeoJSON beeing supported for import. Saved Naissance files may be found in ./saves/. A default initialisation file, ./saves/autosave.js, is loaded for compatibility testing in non-release versions.
      <hr class = "parallax-item-content-panel-divider">
      <b>Links:</b> <a href = "https://github.com/Confoederatio/Naissance/archive/refs/heads/master.zip">Download</a></li> | <a href = "https://github.com/Confoederatio/Naissance">GitHub</a></li>
      <b>Releases:</b>
      <ul>
        <li>1.0b Caspian | <a href = "https://github.com/Confoederatio/Naissance/archive/refs/tags/1.0b-caspian.zip">Download</a> | <a href = "https://github.com/Confoederatio/Naissance/releases/tag/1.0b-caspian">GitHub</a></li>
        <li>1.0pa Beginnes | <a href = "https://github.com/Confoederatio/Naissance/archive/refs/tags/1.0pa-beginnes.zip">Download</a> | <a href = "https://github.com/Confoederatio/Naissance/releases/tag/1.0pa-beginnes">GitHub</a></li>
      </ul>
    </div>
    `,
  },
  eoscala: {
    name: "Eoscala",
    
    animation: "eoscala",
    background_image: `gfx/interface/tiles/eoscala.png`,
    background_opacity: 1,
    default_pin: true,
    font_position: "bottom-right",
    font_size: 1,
    font_weight: 500,
    size: 5,
    x: 92,
    y: 32,
    
    colour: "dark-grey",
    content: `<div class = "parallax-item-content-panel-title">Eoscala</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span class = "parallax-item-complete">Complete (Ongoing)</span>,<br>
    <span class = "parallax-item-development-date">1 March 2025 -</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      Gridded economic statistics from 10000BC to the present. Time intervals are provided at 1000-year intervals from 10000BC to 1AD, at 100-year intervals from 1AD to 1700AD, at 10-year intervals from 1700AD to 1950AD, and at 1-year intervals from 1950AD onwards. All data is provided at 5-arcminute resolution on WGS84 Equirectangular.
      <br><br>
      Eoscala is currently operable, with future routine updates to improve model and data accuracy alongside ease of reproducibility. Base Eoscala data are used to support the expansion of economic data and fidelity into the deep past. Since 2024, Eoscala has been managed by CRD.
      <hr class = "parallax-item-content-panel-divider">
      <b>Releases:</b>
      <ul>
        <li>Eoscala 1.0 | <a href = "https://github.com/Confoederatio/Eoscala-Velkscala/archive/refs/tags/eoscala-1.0-velkscala-0.5.zip">Download</a> | <a href = "https://github.com/Confoederatio/Eoscala-Velkscala/tree/main">GitHub</a></li>
      </ul>
    </div>
    `,
  },
  atlas: {
    name: "Atlas",
    
    animation: "atlas",
    background_image: "gfx/interface/tiles/atlas.png",
    background_opacity: 0.2,
    font_position: "bottom-left",
    font_size: 1,
    font_weight: 300,
    size: 5,
    x: 92,
    y: 48,
    
    colour: "gold",
  },
  velkscala: {
    name: "Velkscala",
    
    animation: "velkscala",
    background_image: "gfx/interface/tiles/velkscala.png",
    background_opacity: 0.15,
    default_pin: true,
    font_position: "centre",
    font_size: 1,
    font_weight: 300,
    size: 5,
    x: 76,
    y: 16,
    
    colour: "salmon",
    content: `<div class = "parallax-item-content-panel-title">Velkscala</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span class = "parallax-item-beta">Beta (Ongoing)</span>,<br>
    <span class = "parallax-item-development-date">1 March 2025 -</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      Gridded population and demographic statistics from 10000BC to the present. Time intervals are provided at 1000-year intervals from 10000BC to 1AD, at 100-year intervals from 1AD to 1700AD, at 10-year intervals from 1700AD to 1950AD, and at 1-year intervals from 1950AD onwards. All data is provided at 5-arcminute resolution on WGS84 Equirectangular.
      <br><br>
      Velkscala should be approached with caution in its current state. Its data is inherently scalable, but there may exist datapoint anomalies, especially regarding past urban settlements. We intend to resolve these issues following a general-purpose refactor and revamped methodology. Since 2024, Velkscala has been managed by CRD. Velkscala currently relies on hybridised HYDE3.3/McEvedy data.
      <hr class = "parallax-item-content-panel-divider">
      <b>Releases:</b>
      <ul>
        <li>Velkscala 0.5 | <a href = "https://github.com/Confoederatio/Eoscala-Velkscala/archive/refs/tags/eoscala-1.0-velkscala-0.5.zip">Download</a> | <a href = "https://github.com/Confoederatio/Eoscala-Velkscala/tree/main">GitHub</a></li>
      </ul>
    </div>
    `,
  },
  stadester: {
    name: "Stadestér",
    
    animation: "stadester",
    background_image: "gfx/interface/tiles/stadester.png",
    background_opacity: 0.2,
    default_pin: true,
    font_position: "centre",
    font_size: 1,
    font_weight: 100,
    size: 6,
    x: 64,
    y: 20,
    
    colour: "forest-green",
  },
  
  ctd: {
    name: "CTD",
    
    animation: "ctd",
    font_position: "centre",
    font_size: 3,
    font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 140,
    y: 28,
    
    colour: "forest-green",
  },
  ctd_games: {
    name: "CTD<br>Games",
    
    animation: "ctd-games",
    font_position: "bottom-left",
    font_size: 2,
    font_weight: 900,
    is_base_node: true,
    size: 3,
    x: 216,
    y: 28,
    
    colour: "blurple",
    dependencies: [
      "triumph_and_tragedy_one",
      "analytical_engine",
      "triumph_and_tragedy_two",
    ],
  },
  analytical_engine: {
    name: "Analytical Engine",
    
    animation: "analytical-engine",
    default_pin: true,
    font_position: "bottom-right",
    font_size: 1,
    font_weight: 700,
    size: 4,
    x: 240,
    y: 34,
    
    background_image: `gfx/interface/tiles/analytical_engine_tile.png`,
    background_opacity: 0.15,
    colour: "dark-grey",
    content: `<div class = "parallax-item-content-panel-title">Analytical Engine</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span class = "parallax-item-beta-ongoing">Beta (Ongoing)</span>,<br>
    <span class = "parallax-item-development-date">27 October 2024 -</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      AnalyticalEngine (also known as <b>Project Orion</b>) is a development effort to open-source the entire core binary code of AOC3 and improve moddability by allowing for a custom NashornJS scripts in mods by providing an API for Event Conditions, Effects, Game Scopes, Modded Multiplayer (MP) support, as well as Custom Mapmodes and Custom UIs.
      <hr class = "parallax-item-content-panel-divider">
      <b>Documentation:</b> <a href = "https://confoederatiodocs.info/CTD/AnalyticalEngine">Confoederatio Docs</a>
      <b>Links:</b> <a href = "http://www.ageofcivilizationsgame.com/topic/252006-analyticalengine-custom-uis-mapmodes-event-scripting-modded-multiplayer-and-tooltips/">Forums</a> | <a href = "https://github.com/Confoederatio/AnalyticalEngine">GitHub</a> | <a href = "https://steamcommunity.com/sharedfiles/filedetails/?id=3429582135&searchtext=analyticalengine">Steam</a>
      <b>Releases:</b>
      <ul>
        <li>0.6b Centurion | <a href = "https://github.com/Confoederatio/AnalyticalEngine/archive/refs/tags/beta-0.6.0-centurion.zip">Download</a> | <a href = "https://github.com/Confoederatio/AnalyticalEngine/releases/tag/beta-0.6.0-centurion">GitHub</a></li>
        <li>0.5b Rhine | <a href = "https://github.com/Confoederatio/AnalyticalEngine/archive/refs/tags/beta-0.5.0-rhine.zip">Download</a> | <a href = "https://github.com/Confoederatio/AnalyticalEngine/releases/tag/beta-0.5.0-rhine">GitHub</a></li>
        <li>0.4b Perimeter | <a href = "https://github.com/Confoederatio/AnalyticalEngine/archive/refs/tags/beta-0.4.0-perimeter.zip">Download</a> | <a href = "https://github.com/Confoederatio/AnalyticalEngine/releases/tag/beta-0.4.0-perimeter">GitHub</a></li>
        <li>0.3.2b Chrome Dome | <a href = "https://github.com/Confoederatio/AnalyticalEngine/archive/refs/tags/beta-0.3.2-chrome-dome.zip">Download</a> | <a href = "https://github.com/Confoederatio/AnalyticalEngine/releases/tag/beta-0.3.2-chrome-dome">GitHub</a></li>
        <li>0.3.1b Broken Arrow | <a href = "https://github.com/Confoederatio/AnalyticalEngine/archive/refs/tags/beta-0.3.1-broken-arrow.zip">Download</a> | <a href = "https://github.com/Confoederatio/AnalyticalEngine/releases/tag/beta-0.3.1-broken-arrow">GitHub</a></li>
        <li>0.3b Empty Quiver | <a href = https://github.com/Confoederatio/AnalyticalEngine/archive/refs/tags/beta-0.3.0-empty-quiver.zip"">Download</a> | <a href = "https://github.com/Confoederatio/AnalyticalEngine/releases/tag/beta-0.3.0-empty-quiver">GitHub</a></li>
        <li>0.2b Cogwheel | <a href = "https://github.com/Confoederatio/AnalyticalEngine/archive/refs/tags/beta-0.2.0-cogwheel.zip">Download</a> | <a href = "https://github.com/Confoederatio/AnalyticalEngine/releases/tag/beta-0.2.0-cogwheel">GitHub</a></li>
      </ul>
    </div>`,
    dependencies: ["eleven_fiftynine"],
  },
  triumph_and_tragedy_one: {
    name: "Triumph &<br>Tragedy I",
    
    animation: "triumph-and-tragedy-one",
    font_position: "centre",
    font_size: 1,
    font_weight: 500,
    size: 4,
    x: 222,
    y: 52,
    
    background_image: `gfx/interface/tiles/triumph_and_tragedy_icon_no_text.png`,
    background_opacity: 0.4,
    colour: "mauve",
    content: `<div class = "parallax-item-content-panel-title">Triumph & Tragedy I</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span class = "parallax-item-complete">Complete</span>,<br>
    <span class = "parallax-item-development-date">22 April 2020 - 1 September 2021</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator secondary">Secondary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      <b>'Civilisation in a Bot'.</b> A full desktop experience disguised as a Discord bot, Triumph & Tragedy I offers you the chance to found your very own nation and take it through the ages: expand sprawling urban settlements - experience the tumult of the Industrial Revolution - and stand by the sidelines or duke it out in massive world wars. How you lead your nation is up to you.
      <br><br>
      <b>From Research and Economies to Combat.</b> Through the Renaissance to the Digital Age, Triumph & Tragedy I is an all-encompassing game with everything from submarine warfare to the housing and infrastructure of your cities. Explore hundreds of technologies, units, and buildings, and unlock new mechanics to play with in an ever-changing world - all underneath a single Discord bot.
      <br><br>
      <b>Huge World Maps.</b> Armies, cities, goods, and colonists are no longer tied to numerical abstractions, but actual objects on a map that spans the globe and over 14.000 provinces. From the Siberian Wastes to the depths of the Amazon to fictional planets, each new map is guaranteed to bring with it new memories and scenarios.
      <br><br>
      <b>Modding Compatibility.</b> With an in-depth backend JSON-based modding API allowing for the customisation of buildings, units, governments, laws, events and technologies, building what may seem like an entirely new game is never more than a few lines of text away.
      <hr class = "parallax-item-content-panel-divider">
      <b>Releases:</b>
      <ul>
        <li>RP5.2 | <a href = "https://github.com/Confoederatio/RP5.2/releases">Download</a> | <a href = "https://github.com/Confoederatio/RP5.2">GitHub</a></li>
        <li>RP5.1 | <a href = "https://github.com/Confoederatio/RP5.1/releases">Download</a> | <a href = "https://github.com/Confoederatio/RP5.2">GitHub</a></li>
        <li>RP5 | <a href = "https://github.com/Confoederatio/RP5/releases">Download</a> | <a href = "https://github.com/Confoederatio/RP5">GitHub</a></li>
        <li>RP4 | <a href = "https://github.com/Confoederatio/RP4/releases">Download</a> | <a href = "https://github.com/Confoederatio/RP4">GitHub</a></li>
        <li>RP3 | <a href = "https://github.com/Confoederatio/RP3/releases">Download</a> | <a href = "https://github.com/Confoederatio/RP3">GitHub</a>
          <ul>
            <li>RP3 Battle Calculator | <a href = "">Download</a> | <a href = "https://github.com/Confoederatio/RP3/blob/main/combat_calculator.html">GitHub</a></li>
          </ul>
        </li>
        <li>RP2 | <a href = "https://github.com/Confoederatio/RP2/releases">Download</a> | <a href = "https://github.com/Confoederatio/RP2">GitHub</a></li>
        <li>RP1 | <a href = "https://github.com/Confoederatio/RP1/releases">Download</a> | <a href = "https://github.com/Confoederatio/RP1">GitHub</a></li>
      </ul>
    </div>`,
    dependencies: ["triumph_and_tragedy_two"],
  },
  triumph_and_tragedy_two: {
    name: "Triumph & Tragedy II",
    
    animation: "triumph-and-tragedy-two",
    default_pin: true,
    font_position: "bottom-right",
    font_size: 2,
    font_weight: 700,
    size: 1,
    x: 240,
    y: 52,
    
    dependencies: [
      "system_dynamics",
      "into_modernity",
      "proxy_cables",
      "last_man_standing",
    ],
    background_image: `gfx/interface/tiles/battle_of_the_leyte_gulf.png`,
    background_opacity: 0.4,
    colour: "salmon",
    content: `<div class = "parallax-item-content-panel-title">Triumph & Tragedy II</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span class = "parallax-item-complete">Complete (Ongoing)</span>,<br>
    <span class = "parallax-item-development-date">22 April 2021 -</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      An ambitious sequel to the original game, T&T II simulates hundreds of millions of people on the individual-level from the bottom up to create complex economic chains and societal mechanics capable of driving entire nations. From world-spanning supply chains to the military logistics of a single company, to the biodiversity of a province and everything in between, Triumph & Tragedy II will be a game that holds no bars.
      <hr class = "parallax-item-content-panel-divider">
      <b>AI.</b> Treated as part of the core game, managing and creating your own AI bureaucrats in order to oversee mechanics for you in this vast simulation is absolutely essential to the continued survival of your nation-state. But watch out! You might not be the only one able to set mandates for your 'governors' and 'ministers' ..
      <br><br>
      <b>Creative Freedom.</b> Adjust the uniforms of your army to perfection, construct monuments that stand the test of time, or choose the staple crops of your people: Triumph & Tragedy II will offer unparalleled freedom in a sandbox-like environment. Choose what mechanics you want to play with, and leave the rest to your AI bureaucracy.
      <br><br>
      <b>Gamechanger.</b> From the Seven Years' War to the Rise of Rome, Triumph & Tragedy II will offer the ability to recreate historical, alt-history, and even entirely fictional scenarios without having to edit a single file. Create mos from the comfort of Discord with a built-in editor and preview your work in real time. We give the tools for you to create.
      <br><br>
      <b>Simulate Everything.</b> From the biodiversity of the Great Plains during the High Renaissance all the way to the highest echelons of government, it doesn't matter in Triumph & Tragedy II - everything is simulated at the most granular level possible to provide depth and engineer an experience unlike any other.
      <hr class = "parallax-item-content-panel-divider">
      <b>Releases:</b>
      <ul>
        <li>1.3.3 Lazytrisk | <a href = "#">Download</a> | <a href = "#">GitHub</a></li>
        <li>1.3.2 Tech Tube | <a href = "#">Download</a> | <a href = "#">GitHub</a></li>
        <li>1.3.1 Dove Stable | <a href = "#">Download</a> | <a href = "#">GitHub</a></li>
        <li>1.3 Dove | <a href = "#">Download</a> | <a href = "#">GitHub</a></li>
        <li>1.2.1 Bayonet Stable | <a href = "#">Download</a> | <a href = "#">GitHub</a></li>
        <li>1.2 Bayonet | <a href = "#">Download</a> | <a href = "#">GitHub</a></li>
        <li>1.1.2 Yarn | <a href = "#">Download</a> | <a href = "#">GitHub</a></li>
        <li>1.1 Fresh Air | <a href = "#">Download</a> | <a href = "#">GitHub</a></li>
        <li>1.0.1 Fine-Tuner | <a href = "#">Download</a> | <a href = "#">GitHub</a></li>
        <li>1.0 Iron | <a href = "#">Download</a> | <a href = "#">GitHub</a></li>
      </ul>
    </div>
    `,
  },
  system_dynamics: {
    name: "System Dynamics",
    
    animation: "system-dynamics",
    font_position: "bottom-right",
    font_size: 1,
    font_weight: 300,
    size: 5,
    x: 240,
    y: 84,
    
    colour: "yellow",
    content: `<div class = "parallax-item-content-panel-title">System Dynamics</div>
    <b>Development:</b> <span class = "parallax-item-complete">Complete</span>,<br>
    <span class = "parallax-item-development-date">10 June 2021 - 28 April 2023</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator secondary">Secondary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      System Dynamics is a ground-up refactor and reconstruction of Triumph & Tragedy I on a new modular grand-strategy engine, Gamechanger, to lead T&T II development into the future. Interact with your nation in private game channels, set up custom game scenarios, install Triumph & Tragedy II for your own server, and modify it as you wish. 
      <br><br>
      System Dynamics is designed for customisability and long-term support.
    </div>`,
  },
  into_modernity: {
    name: "Into Modernity",
    
    animation: "into-modernity",
    font_position: "centre",
    font_size: 1,
    font_weight: 300,
    size: 5,
    x: 256,
    y: 84,
    
    colour: "orange",
    content: `<div class = "parallax-item-content-panel-title">Into Modernity</div>
    <b>Development:</b> <span class = "parallax-item-complete">Complete (Ongoing)</span>,<br>
    <span class = "parallax-item-development-date">28 April 2023 -</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator secondary">Secondary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      A complete overhaul of T&T II's economy, labour markets, consumer psychology, spending, and global value and production chains are rendered in stoichiometric and terrain-specific detail. Specialise in goods and resources, manage trade routes, and build amenities for your citizenry.
      <hr class = "parallax-item-content-panel-divider">
      <b>Detailed Demography.</b> Into Modernity scraps previous population figures by replacing them with a detailed Leslie Matrix/Migration Gravity Model system of demography with full age, gender, and TFR modelling. Pops are split up into Wealth Pools which hold the same job in the same building, from which their wages, wealth, savings/investment, and spending are calculated.
      <br><br>
      <b>Full Military Logistics.</b> Provide full-spectrum logistics to your units and their necessary production chains or lose the war. Into Modernity provides total ORBAT and backline/frontline modelling for combat in addition to introducing more granular air warfare and movement speeds.
      <br><br>
      <b>Realistic Production Chains.</b> Over 600+ production chains from the Mediaeval to the Modern Era with accompanying routing times are necessary to your citizens' well-being. Start with subsistence industries and raw resource extraction, and gradually industrialise over centuries. Customise and subsidise production facilities and factories and draft detailed tax codes.
      <br><br>
      <b>Simulated Local Economics.</b> Local job markets, resources, and migration ensure that economies stay local. Build hubs of industry, mining towns, or agricultural breadbaskets to feed your people with the goods they need.
    </div>`,
  },
  proxy_cables: {
    name: "Proxy Cables",
    
    animation: "proxy-cables",
    font_position: "bottom-left",
    font_size: 1,
    font_weight: 300,
    size: 5,
    x: 272,
    y: 68,
    
    colour: "blue",
    content: `<div class = "parallax-item-content-panel-title">Proxy Cables</div>
    <b>Development:</b> <span class = "parallax-item-in-planning">In Planning</span>,<br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator tertiary">Tertiary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      Storytelling has always been a critical element to Triumph & Tragedy II, and we aim to enrich that experience through the introduction of Proxy Cables. Decisions, modular governments, more events, and dynamic political parties and scenes will help bring your governance to life alongside overhauled diplomatic UIs, a new espionage mechanic, influence, and modern era mechanics, with a particular focus on the Cold War.
    </div>`,
  },
  last_man_standing: {
    name: "Last Man Standing",
    
    animation: "last-man-standing",
    font_position: "bottom-right",
    font_size: 1,
    font_weight: 300,
    size: 5,
    x: 272,
    y: 52,
    
    colour: "dark-grey",
    content: `<div class = "parallax-item-content-panel-title">Last Man Standing</div>
    <b>Development:</b> <span class = "parallax-item-in-planning">In Planning</span>,<br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator tertiary">Tertiary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      The final redefinition of warfare in all its logistical intricacy, Last Man Standing attempts to offer maximum flexibility whilst stripping away micromanagement through the use of new battleplans, officer corps, and other mechanics whilst allowing for fine adjustments at the most granular levels of detail. Combat will move along a Levies > Set-Piece Battles > Rapid Manoeuvre > Frontline > Contemporary Warfare System, whilst unit customisation, equipment designers, and military production chains will be added alongside special abilities for units and modder-friendly APIs.
      <br><br>
      AIs will now control other nations as part of Last Man Standing, and the mod-creator will be flushed out to full WYSIWYG capability to reflect the final update and release of Triumph & Tragedy II alongside Singleplayer (SP) campaigns.
    </div>`,
  },
  
  software_and_tooling_ctd: {
    name: "Software &<br>Tooling",
    
    animation: "software-and-tooling-ctd",
    font_position: "bottom-left",
    font_size: 2,
    font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 178,
    y: 28,
    
    colour: "dark-blurple",
    content: `<div class = "parallax-item-content-panel-title">System Dynamics</div>
    <b>Development:</b> <span class = "parallax-item-complete">Complete</span>,<br>
    <span class = "parallax-item-development-date">10 June 2021 - 28 April 2023</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator secondary">Secondary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      System Dynamics is a ground-up refactor and reconstruction of Triumph & Tragedy I on a new modular grand-strategy engine, Gamechanger, to lead T&T II development into the future. Interact with your nation in private game channels, set up custom game scenarios, install Triumph & Tragedy II for your own server, and modify it as you wish. 
      <br><br>
      System Dynamics is designed for customisability and long-term support.
    </div>`,
  },
  vercengen: {
    name: "Vercengen",
    
    animation: "vercengen",
    background_image: `gfx/interface/tiles/vercengen.png`,
    background_opacity: 0.2,
    default_bookmark: true,
    default_pin: true,
    font_position: "bottom-right",
    font_size: 2,
    font_weight: 900,
    size: 2,
    x: 178,
    y: 60,
    
    colour: "blurple",
    dependencies: [
      "blacktraffic",
      "geospatiale",
      "forse_scriptly_ide",
      "unitel",
      "universal_framework",
    ],
  },
  unitel: {
    name: "Unitel",
    animation: "unitel",
    background_image: `gfx/interface/logos/unitel_logo.png`,
    background_opacity: 0.3,
    default_bookmark: true,
    default_pin: true,
    font_position: "top-left",
    font_size: 1,
    font_weight: 700,
    size: 4,
    x: 206,
    y: 60,
    
    colour: "blue"
  },
  eleven_fiftynine: {
    name: "",
    
    animation: "eleven-fifty-nine",
    font_position: "centre",
    font_size: 1,
    font_weight: 300,
    size: 6,
    x: 258,
    y: 34,
    
    background_image: `gfx/interface/tiles/1159_logo.jpg`,
    background_opacity: 0.4,
    colour: "midnight-blue",
    content: `<div class = "parallax-item-content-panel-title">11:59</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span class = "parallax-item-complete">Complete</span>,<br>
    <span class = "parallax-item-development-date">22 November 2018 - 17 March 2020</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator tertiary">Tertiary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      <b>AOC2:</b><br><br>
      Formerly developed for the mobile grand-strategy game Age of Civilisations II, 11:59 seeks to bring the pivotal events of the Cold War to the game using a Paradox modding paradigm. Due to game limitations, and the eventual abandonment of AOC2 itself, development was suspended in 2020.
      <br><br>
      All 11:59 mod work has since been moved to AOC3/AnalyticalEngine to better support 11:59 in the future.
      <hr class = "parallax-item-content-panel-divider">
      <b>Links:</b> <a href = "http://www.ageofcivilizationsgame.com/topic/5090-1159-a-cold-war-mod/">Forums</a> | <a href = "https://www.moddb.com/mods/1159-a-cold-war-mod">ModDB</a>
      <b>Releases:</b>
      <ul>
        <li>0.92.1b | <a href = "https://www.moddb.com/downloads/start/193646?referer=https%3A%2F%2Fwww.moddb.com%2Fmods%2F1159-a-cold-war-mod">Download</a></li>
      </ul>
      <br>
      <b>AOC3:</b><br><br>
      Built on top of a new open-source injection engine (AnalyticalEngine) for Age of Civilisations III, 11:59 brings the economic and political intrigue of the First and Second Cold Wars to AOC3 between 1946-2092. Development of the mod has been handed over to Confoederatio Technical Division, and it is also used as an example for other game mods developed using AnalyticalEngine.
      <hr class = "parallax-item-content-panel-divider">
      <b>Links:</b> <a href = "https://github.com/Confoederatio/AnalyticalEngine/tree/main/src/mods/11.59">GitHub</a>
    </div>`,
  },
  blacktraffic: {
    name: "Blacktraffic",
    
    animation: "blacktraffic",
    font_position: "centre",
    font_size: 1,
    font_weight: 100,
    size: 6,
    x: 166,
    y: 60,
    
    colour: "dark-grey",
  },
  geospatiale: {
    name: "Geospatiale",
    
    animation: "geospatiale",
    font_position: "centre",
    font_size: 1,
    font_weight: 100,
    size: 6,
    x: 166,
    y: 72,
    
    colour: "yellow",
  },
  universal_framework: {
    name: "UF",
    
    animation: "universal-framework",
    font_position: "bottom-left",
    font_size: 2,
    font_weight: 600,
    size: 6,
    x: 194,
    y: 88,
    
    colour: "copper",
    content: `<div class = "parallax-item-content-panel-title">Universal Framework</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span class = "parallax-item-complete">Complete, Ongoing</span>,<br>
    <span class = "parallax-item-development-date">15 March 2024 -</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator secondary">Secondary  Project</span>
    <div class = "parallax-item-content-panel-body-text">
      The bedrock of future Confoederatio development, Universal Framework is designed as a modular JS library and software engine for developer quality-of-life and ease of use, with a particular focus towards UI, maths, and statistics. These modules are split up as follows:
      <ul>
        <li>ABRS (Automated Backup and Recovery System)</li>
        <li>Actions (Undo/Redo Trees and Delta Actions Logging System [DALS])</li>
        <li>AI (Puppeteer scraping hooks for web AI clients and social media, as well as message queueing)</li>
        <li>Animation</li>
        <li>Arrays (Dataframes, Matrices)</li>
        <li>BrowserUI (Context Menus, Frontend Web Design, and WYSIWYG Inputs)</li>
        <li>Colours</li>
        <li>CURL</li>
        <li>Date</li>
        <li>Log</li>
        <li>Numbers</li>
        <li>Objects (Structured Dataframes)</li>
        <li>Pathfinding</li>
        <li>Strings (NLP, Markdown Formatting)</li>
      </ul>
      <hr class = "parallax-item-content-panel-divider">
      <b>Links:</b> <a href = "https://github.com/Confoederatio/UniversalFramework/tree/main/Browser%20UF">GitHub (Browser)</a> | <a href = "https://github.com/Confoederatio/UniversalFramework/tree/main/Electron%20UF">GitHub (Electron)</a> | <a href = "https://github.com/Confoederatio/UniversalFramework/tree/main/Nashorn%20UF">GitHub (Nashorn)</a> | <a href = "https://github.com/Confoederatio/UniversalFramework/tree/main/Node%20UF">GitHub (Node)</a><br>
      <b>Releases:</b>
      <ul>
        <li>1.0 UF | <a href = "https://github.com/Confoederatio/UniversalFramework">GitHub</a>
          <ul>
            <li>1.0 UF (Browser) | <a href = "https://github.com/Confoederatio/UniversalFramework/archive/refs/tags/1.0-isopropylene.zip">Download</a> | <a href = https://github.com/Confoederatio/UniversalFramework/tree/main/Browser%20UF">GitHub</a></li>
            <li>1.0 UF (Electron) | <a href = "https://github.com/Confoederatio/UniversalFramework/archive/refs/tags/1.0-isopropylene.zip">Download</a> | <a href = https://github.com/Confoederatio/UniversalFramework/tree/main/Electron%20UF">GitHub</a></li>
            <li>1.0 UF (NashornJS) | <a href = "https://github.com/Confoederatio/UniversalFramework/archive/refs/tags/1.0-isopropylene.zip">Download</a> | <a href = "https://github.com/Confoederatio/UniversalFramework/tree/main/Nashorn%20UF">GitHub</a></li>
            <li>1.0 UF (Node) | <a href = "https://github.com/Confoederatio/UniversalFramework/archive/refs/tags/1.0-isopropylene.zip">Download</a> | <a href = "https://github.com/Confoederatio/UniversalFramework/tree/main/Node%20UF">GitHub</a></li>
          </ul>
        </li>
      </ul>
    </div>
    `,
  },
  forse_scriptly_ide: {
    name: "Forse/<br>Scriptly IDE",
    
    animation: "forse-scriptly-ide",
    font_position: "centre",
    font_size: 1,
    font_weight: 100,
    size: 6,
    x: 182,
    y: 88,
    
    colour: "light-purple",
    content: `<div class = "parallax-item-content-panel-title">Scriptly</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span class = "parallax-item-complete">Complete (Ongoing)</span>,<br>
    <span class = "parallax-item-development-date">5 November 2024</span><br>
    <b>Status:</b> <span class = "parallax-item-content-panel-status-indicator secondary">Secondary Project</span>
    <div class = "parallax-item-content-panel-body-text">
      Scriptly provides both CLI/GUI-application templates that utilise Universal Framework to be built on top of, functioning as a bootstrap software engine for rapid iteration. Used for everything from raster/research-level modelling to quick I/O tasks, Scriptly's main use-case is to serve as a stopgap for more complex programmes that may still be in the development pipeline.
      <hr class = "parallax-item-content-panel-divider">
      <b>Releases:</b>
      <ul>
        <li>1.0 Scriptly | <a href = "https://github.com/Confoederatio/Scriptly">GitHub</a>
          <ul>
            <li>
              1.0 Scriptly (CLI)/0.5 Scriptly (GUI)
              <ul>
                <li>1.0 Scriptly (CLI) | <a href = "https://github.com/Confoederatio/Scriptly/archive/refs/tags/1.0-cli-0.5-gui-red.zip">Download</a> | <a href = "https://github.com/Confoederatio/Scriptly/releases/tag/1.0-cli-0.5-gui-red">GitHub</a></li>
                <li>0.5 Scriptly (GUI) | <a href = "https://github.com/Confoederatio/Scriptly/archive/refs/tags/1.0-cli-0.5-gui-red.zip">Download</a> | <a href = "https://github.com/Confoederatio/Scriptly/releases/tag/0.5-cli-0.5-gui-red">GitHub</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    `,
  },
  
  cad: {
    name: "CAD",
    
    animation: "cad",
    font_position: "centre",
    font_size: 3,
    font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 320,
    y: 28,
    
    colour: "orange",
    dependencies: ["art_gallery", "preserves", "gearth_mc"],
  },
  art_gallery: {
    name: "Art Gallery",
    
    animation: "art-gallery",
    font_position: "bottom-right",
    font_size: 2,
    font_weight: 700,
    size: 3,
    x: 328,
    y: 60,
    
    background_image: `gfx/interface/tiles/les_halles_square.png`,
    background_opacity: 0.85,
    colour: "cream-white",
  },
  preserves: {
    name: "Preservés",
    
    animation: "preserves",
    default_pin: true,
    font_position: "bottom-left",
    font_size: 2,
    font_weight: 500,
    size: 3,
    x: 352,
    y: 60,
    
    background_image: `gfx/interface/tiles/adriatic_square.png`,
    background_opacity: 0.6,
    colour: "sepia",
    dependencies: ["digital_holdings", "physical_holdings"],
  },
  gearth_mc: {
    name: "G-Earth/MC",
    
    animation: "gearth-mc",
    font_position: "bottom-right",
    font_size: 2,
    font_weight: 400,
    size: 3,
    x: 352,
    y: 36,
    
    colour: "blue",
  },
  physical_holdings: {
    name: "Physical<br>Holdings",
    
    animation: "physical-holdings",
    font_position: "centre",
    font_size: 1,
    font_weight: 300,
    size: 5,
    x: 376,
    y: 76,
    
    colour: "yellow",
    content: `
    <div class = "parallax-item-content-panel-title">Physical Holdings</div>
    <hr class = "parallax-item-content-panel-divider">
    <div class = "parallax-item-content-panel-body-text">
      The Physical Holdings of the Preservés are held in physical edition by the Preservés des Confoederatio. They are available by private inquiry if needed, with current digitisation and translation efforts working on bringing these collections to the Digital Preservés.
      <hr class = "parallax-item-content-panel-divider">
      <b>World Atlases:</b> Sorted by <u>[Period Covered] - Name, Year of Publication - Quality. Language.</u>
      <ul>
        <li>Westermann 1972 - [590000BC-1972AD] - Westermann Großer Atlas zur Weltgeschichte, 1972 - Q-HIGH. German. | Preservés | Discord | Gdrive</li>
        <li>Westermann 1995 - [590000BC-1995AD] - Westermann Großer Atlas zur Weltgeschichte, 1995 - Q-HIGH. German. | Preservés | Discord | Gdrive</li>
        <li>Gran Atlas Aguílar [1815AD-1954AD], Gran Atlas Aguílar - Q-HIGH. Spanish. | Preservés | Discord | Gdrive</li>
        <li>Atlas Larousse Illustré [1900AD] - Atlas Larousse Illustré, 1900 - Q-MEDIUM. French. | Preservés | Discord | Gdrive</li>
        <li>Stielers Hand-Atlas [1901AD] - Stielers Hand-Atlas, 1901 - Q-HIGH. German. | Preservés | Discord | Gdrive</li>
        <li>The Historical Atlas of World War II [1937AD-1945AD] - The Historical Atlas of World War I, 2007  - Q-MEDIUM. English. | Preservés | Discord | Gdrive</li>
        <li>The Times Atlas of the World Mid Century Edition (Vol. I-V) - [1956-1959AD] - The Times Atlas of the World Mid Century Edition, 1959 - Q-HIGH. English. | Preservés | Discord | Gdrive</li>
        <li>Geographica - [2001AD] - Geographica, 2001 - Q-MEDIUM. English. | Preservés | Discord | Gdrive</li>
        <li>DK Atlas 2016 - [2016AD] - DK Atlas, 2016 - Q-MEDIUM. English. | Preservés | Discord | Gdrive</li>
        <li>DK Student World Atlas 2013 - [2013 AD] - DK Student World Atlas, 2013 - Q-MEDIUM. English. | Preservés | Discord | Gdrive</li>
      </ul>
      <br><br>
      <b>Regional Atlases:</b><br>
      <ul>
        <li>Tübinger Atlas des Vorderen Orients (Full Set, Loose Leaf) - Middle East, 1994 [1994AD] - Q-MEDIUM. German/English</li>
      </ul>
      <br><br>
      <b>Quantitative Sciences.</b><br>
      AI/Computer Science.<br>
      <ul>
        <li>Big Java: Early Objects, 7th Edition. English</li>
        <li>Focus on Fundamentals of Programming with C. English</li>
        <li>Problem Solving and Program Design in C. English</li>
      </ul>
      Demography/Stats.<br>
      <ul>
        <li>Historical Atlas of the Eight Billion [3000BC-2020AD], Historical Atlas of the Eight Billion, 2018 - Q-LOW. English. | Preservés | Discord | Gdrive</li>
        <li>Atlas of World Population History [2000BC-1975AD], Atlas of World Population History, 1975 - Q-MEDIUM. English. | Preservés | Discord | Gdrive</li>
        <li>Statistics for Psychology, Sixth Edition (Aron) 2017 - Q-HIGH. English. | Preservés | Discord | Gdrive</li>
      </ul>
      Mathematics.<br>
      <ul>
        <li>Calculus 4 (Single Variable): James Stewart. English</li>
        <li>Calculus 4 (Single Variable): James Stewart (Solutions). English</li>
        <li>Calculus: Early Transcendental Functions 6e. English</li>
        <li>Calculus of a Single Variable: Early Transcendental Functions 6e. English</li>
        <li>Discrete Mathematics and its Applications, Seventh Edition. English</li>
      </ul>
      <br>
      <b>Qualitative Sciences.</b> Anthropology.<br>
      <ul>
        <li>Cultural Anthropology (Miller) 2017. English</li>
        <li>Dictionnaire des Peuples (Larousse) 1998. French</li>
        <li>Globalization (Lechner) 2009. English</li>
        <li>Essentials of Biological Anthropology, 4th Edition (Larsen) 2015. English</li>
        <li>Medical Anthropology, 3rd Edition (Oxford University Press) 2017. English</li>
      </ul>
    </div>
    `,
  },
  digital_holdings: {
    name: "Digital Holdings",
    
    animation: "digital-holdings",
    font_position: "bottom-left",
    font_size: 1,
    font_weight: 500,
    size: 5,
    x: 376,
    y: 60,
    
    colour: "light-grey",
    content: `
    <div class = "parallax-item-content-panel-title">Digital Preservés</div>
    <hr class = "parallax-item-content-panel-divider">
    <div class = "parallax-item-content-panel-body-text">
      The Digital Preservés refer to the digital holdings of the Preservés des Confoederatio, typically backed up on multiple mirrors and fully available for download and viewing. You can access the Digital Preservés either through Confoederatio Docs, on Discord, or on Gdrive as backup mirrors.
      <br><br>
      <b>World Atlases:</b> Sorted by <u>[Period Covered] - Name, Year of Publication - Quality. Language.</u>
      <ul>
        <li>Westermann 1972 - [590000BC-1972AD] - Westermann Großer Atlas zur Weltgeschichte, 1972 - Q-HIGH. German. | Preservés | Discord | Gdrive</li>
        </li>Stielers Handatlas 1891 - [1891AD] - Hand-Atlas über alle Theile der Erde und über das Weltgebäude, 1891 - Q-HIGH. German. | Preservés | Discord | Gdrive</li>
        <li>Larousse 1900 - [1900AD] - Atlas Larousse Illustré, 1900 - Q-MEDIUM. French. | Preservés | Discord | Gdrive</li>
        <li>Times Survey Atlas of the World - [1920AD] - The Times Survey Atlas of the World, 1920-1922 - Q-HIGH. English. | Preservés | Discord | Gdrive</li>
        <li>Meyers Kleiner Handatlas 1921 - [1921AD] - Meyers Kleiner Handatlas, 1921 - Q-MEDIUM. German. | Preservés | Discord | Gdrive</li>
        <li>De Grote Bosatlas 2001 - [1960AD-2003AD] - De Grote Bosatlas, 2001 - Q-MEDIUM. Dutch. | Preservés | Discord | Gdrive</li>
        <li>DK Atlas 2016 - [2016AD] - Complete Atlas of the World, 2016 - Q-MEDIUM. English. | Preservés | Discord | Gdrive</li>
      </ul><br>
      <b>Regional Atlases:</b><br>
      <ul>
        <li>Tübinger Atlas des Vorderen Orients - Middle East, 1994 [3000BC-1994AD] - Q-HIGH. German/English | Preservés | Discord | Gdrive</li>
        <li>Tübinger Atlas des Vorderen Orients - Middle East - Demographics, 1994 [1994AD] - Q-MEDIUM. German/English | Preservés | Discord | Gdrive</li>
      </ul>
      <br>
      <b>Maps.</b> A collection of loose-leaf maps held by the Digital Preservés for use in applied sovereignty and geostatistical research.
      <br><br>
      <b>Maps by Continent:</b><br>
      <ul>
        <li>Index of African Maps | Preservés | Discord</li>
        <li>Index of Asian Maps | Preservés | Discord</li>
        <li>Index of European Maps | Preservés | Discord</li>
        <li>Index of North American Maps | Preservés | Discord</li>
        <li>Index of Oceanian Maps | Preservés | Discord</li>
        <li>Index of South American Maps | Preservés | Discord</li>
      </ul>
    </div>
    `,
  },
  socials_and_web_infrastructure: {
    name: "Socials &<br>Web Infra.",
    
    animation: "socials_and_web_infrastructure",
    font_position: "bottom-right",
    font_size: 2,
    font_weight: 700,
    is_base_node: true,
    size: 2,
    x: 384,
    y: 32,
    
    colour: "salmon",
    dependencies: ["blogs", "personnel"],
  },
  personnel: {
    name: "Personnel",
    
    animation: "personnel",
    font_position: "bottom-right",
    font_size: 2,
    font_weight: 200,
    size: 2,
    x: 412,
    y: 60,
    
    colour: "forest-green",
  },
  blogs: {
    name: "Blogs",
    
    animation: "blogs",
    font_position: "top-left",
    font_size: 1,
    font_weight: 600,
    size: 6,
    x: 412,
    y: 48,
    
    colour: "dark-blurple",
  },
  other_projects: {
    name: "Other Projects",
    
    animation: "other_projects",
    font_position: "bottom-left",
    font_size: 2,
    font_weight: 200,
    is_base_node: true,
    size: 3,
    x: 446,
    y: 32,
    
    colour: "gold",
  },
  re_verenfedern: {
    name: "Ré Vérenfedern",
    
    animation: "re_verenfedern",
    font_position: "bottom-left",
    font_size: 1,
    font_weight: 200,
    is_base_node: true,
    size: 5,
    x: 355,
    y: 17,
    
    background_image: `gfx/interface/tiles/re_verenfedern_square.png`,
    background_opacity: 0.4,
    colour: "light-blue",
  },
};