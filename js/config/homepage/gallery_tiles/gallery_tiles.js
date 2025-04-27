config.homepage.gallery.tiles = {
  //Technical (CTD)
  ampersand_mod_creator: {
    name: "Ampersand Mod Creator",
    animation: "ampersand-mod-creator",
      font_position: "bottom-left",
      font_size: 1,
      font_weight: 300,
    size: 5,
    x: 44,
    y: 92,
    colour: "dark-blurple",
    content: `<div id = "ampersand_mod_creator-panel-title" class = "parallax-item-content-panel-title">Ampersand Mod Creator</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "ampersand_mod_creator-development-indicator" class = "parallax-item-complete">Complete</span>,<br>
    <span id = "ampersand_mod_creator-development-date" class = "parallax-item-development-date">18 March 2024 - 11 March 2025</span><br>
    <b>Status:</b> <span id = "ampersand_mod_creator-status" class = "parallax-item-content-panel-status-indicator legacy">Legacy Project</span>
    <div id = "ampersand_mod_creator-body-text" class = "parallax-item-content-panel-body-text">Gamechanger editor for map modding T&T2 after importing SVG maps from Inkscape. Used to define adjacencies, regions, terrain, and other custom data fields for T&T2. Note that this project is subject to expansion as Triumph & Tragedy II gradually improves. For a full look at its internal workings, available documentation and source code are available online.
    <hr class = "parallax-item-content-panel-divider">
      <b>Documentation:</b> <a href = "https://confoederatiodocs.info/CTD/Ampersand_Mod_Creator">Confoederatio Docs</a>
      <b>Releases:</b>
      <ul>
        <li>1.0r Legacy | <a href = "https://github.com/Confoederatio/Ampersand-Mod-Creator/archive/refs/tags/1.0r-legacy.zip">Download</a> | <a href = "https://github.com/Confoederatio/Ampersand-Mod-Creator/releases/tag/1.0r-legacy">GitHub</a></li>
      </ul>
    </div>
    `
  },
  empires_undone: {
    name: "Empires Undone",
    animation: "empires-undone",
      font_position: "bottom-left",
      font_size: 2,
      font_weight: 100,
    default_pin: true,
    size: 3,
    x: 32,
    y: 40,

    background_image: `gfx/interface/tiles/empires_undone.png`,
    background_opacity: 0.2,
    colour: "light-purple",
    content: `<div id = "empires_undone-panel-title" class = "parallax-item-content-panel-title">Empires Undone</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "empires_undone-development-indicator" class = "parallax-item-alpha-ongoing">Alpha (Suspended)</span>,<br>
    <span id = "empires_undone-development-date" class = "parallax-item-development-date">22 April 2020 - 1 September 2021</span><br>
    <b>Status:</b> <span id = "empires_undone-status" class = "parallax-item-content-panel-status-indicator secondary">Suspended Project</span>
    <div id = "empires_undone-body-text" class = "parallax-item-content-panel-body-text">
      Majestic cities, real-time battles, and a hundred years of Victorian history were meant to come to life in an ambitious grand-strategy game whose development is currently paused in favour of Triumph & Tragedy and AnalyticalEngine. With the majority of history and mapwork currently complete however, it is currently under consideration to either have its development resumed, or to be released as an open-source engine.
      <br><br>
      We support Project Alice in the meantime as an unaffiliated viable alternative covering the same timeframe.
    </div>
    `
  },
  triumph_and_tragedy_one: {
    name: "Triumph & Tragedy I",
    animation: "triumph-and-tragedy-one",
      font_position: "centre",
      font_size: 2,
      font_weight: 500,
    size: 2,
    x: 32,
    y: 64,

    default_bookmark: true,
    default_pin: true,
    dependencies: ["ampersand_mod_creator", "triumph_and_tragedy_two"],

    background_image: `gfx/interface/tiles/triumph_and_tragedy_icon_no_text.png`,
    background_opacity: 0.4,
    colour: "mauve",
    content: `<div id = "triumph_and_tragedy_one-panel-title" class = "parallax-item-content-panel-title">Triumph & Tragedy I</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "triumph_and_tragedy_one-development-indicator" class = "parallax-item-complete">Complete</span>,<br>
    <span id = "triumph_and_tragedy_one-development-date" class = "parallax-item-development-date">22 April 2020 - 1 September 2021</span><br>
    <b>Status:</b> <span id = "triumph_and_tragedy_one-status" class = "parallax-item-content-panel-status-indicator secondary">Secondary Project</span>
    <div id = "triumph_and_tragedy_one-body-text" class = "parallax-item-content-panel-body-text">
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
    </div>`
  },
  into_modernity: {
    name: "Into Modernity",
    animation: "into-modernity",
      font_position: "centre",
      font_size: 1,
      font_weight: 300,
    size: 5,
    x: 76,
    y: 100,

    colour: "orange",
    content: `<div id = "into_modernity-panel-title" class = "parallax-item-content-panel-title">Into Modernity</div>
    <b>Development:</b> <span id = "into_modernity-development-indicator" class = "parallax-item-complete">Complete (Ongoing)</span>,<br>
    <span id = "into_modernity-development-date" class = "parallax-item-development-date">28 April 2023 -</span><br>
    <b>Status:</b> <span id = "into_modernity-status" class = "parallax-item-content-panel-status-indicator secondary">Secondary Project</span>
    <div id = "into_modernity-body-text" class = "parallax-item-content-panel-body-text">
      A complete overhaul of T&T II's economy, labour markets, consumer psychology, spending, and global value and production chains are rendered in stoichiometric and terrain-specific detail. Specialise in goods and resources, manage trade routes, and build amenities for your citizenry.
      <hr class = "parallax-item-content-panel-divider">
      <b>Detailed Demography.</b> Into Modernity scraps previous population figures by replacing them with a detailed Leslie Matrix/Migration Gravity Model system of demography with full age, gender, and TFR modelling. Pops are split up into Wealth Pools which hold the same job in the same building, from which their wages, wealth, savings/investment, and spending are calculated.
      <br><br>
      <b>Full Military Logistics.</b> Provide full-spectrum logistics to your units and their necessary production chains or lose the war. Into Modernity provides total ORBAT and backline/frontline modelling for combat in addition to introducing more granular air warfare and movement speeds.
      <br><br>
      <b>Realistic Production Chains.</b> Over 600+ production chains from the Mediaeval to the Modern Era with accompanying routing times are necessary to your citizens' well-being. Start with subsistence industries and raw resource extraction, and gradually industrialise over centuries. Customise and subsidise production facilities and factories and draft detailed tax codes.
      <br><br>
      <b>Simulated Local Economics.</b> Local job markets, resources, and migration ensure that economies stay local. Build hubs of industry, mining towns, or agricultural breadbaskets to feed your people with the goods they need.
    </div>`
  },
  last_man_standing: {
    name: "Last Man Standing",
    animation: "last-man-standing",
      font_position: "bottom-right",
      font_size: 1,
      font_weight: 300,
    size: 5,
    x: 92,
    y: 68,

    colour: "dark-grey",
    content: `<div id = "last_man_standing-panel-title" class = "parallax-item-content-panel-title">Last Man Standing</div>
    <b>Development:</b> <span id = "last_man_standing-development-indicator" class = "parallax-item-in-planning">In Planning</span>,<br>
    <b>Status:</b> <span id = "last_man_standing-status" class = "parallax-item-content-panel-status-indicator tertiary">Tertiary Project</span>
    <div id = "last_man_standing-body-text" class = "parallax-item-content-panel-body-text">
      The final redefinition of warfare in all its logistical intricacy, Last Man Standing attempts to offer maximum flexibility whilst stripping away micromanagement through the use of new battleplans, officer corps, and other mechanics whilst allowing for fine adjustments at the most granular levels of detail. Combat will move along a Levies > Set-Piece Battles > Rapid Manoeuvre > Frontline > Contemporary Warfare System, whilst unit customisation, equipment designers, and military production chains will be added alongside special abilities for units and modder-friendly APIs.
      <br><br>
      AIs will now control other nations as part of Last Man Standing, and the mod-creator will be flushed out to full WYSIWYG capability to reflect the final update and release of Triumph & Tragedy II alongside Singleplayer (SP) campaigns.
    </div>`
  },
  proxy_cables: {
    name: "Proxy<br>Cables",
    animation: "proxy-cables",
      font_position: "top-left",
      font_size: 1,
      font_weight: 300,
    size: 5,
    x: 92,
    y: 84,

    colour: "blue",
    content: `<div id = "proxy_cables-panel-title" class = "parallax-item-content-panel-title">Proxy Cables</div>
    <b>Development:</b> <span id = "proxy_cables-development-indicator" class = "parallax-item-in-planning">In Planning</span>,<br>
    <b>Status:</b> <span id = "proxy_cables-status" class = "parallax-item-content-panel-status-indicator tertiary">Tertiary Project</span>
    <div id = "proxy_cables-body-text" class = "parallax-item-content-panel-body-text">
      Storytelling has always been a critical element to Triumph & Tragedy II, and we aim to enrich that experience through the introduction of Proxy Cables. Decisions, modular governments, more events, and dynamic political parties and scenes will help bring your governance to life alongside overhauled diplomatic UIs, a new espionage mechanic, influence, and modern era mechanics, with a particular focus on the Cold War.
    </div>`
  },
  system_dynamics: {
    name: "System Dynamics",
    animation: "system-dynamics",
      font_position: "bottom-right",
      font_size: 1,
      font_weight: 300,
    size: 5,
    x: 60,
    y: 100,

    colour: "yellow",
    content: `<div id = "system_dynamics-panel-title" class = "parallax-item-content-panel-title">System Dynamics</div>
    <b>Development:</b> <span id = "system_dynamics-development-indicator" class = "parallax-item-complete">Complete</span>,<br>
    <span id = "system_dynamics-development-date" class = "parallax-item-development-date">10 June 2021 - 28 April 2023</span><br>
    <b>Status:</b> <span id = "system_dynamics-status" class = "parallax-item-content-panel-status-indicator secondary">Secondary Project</span>
    <div id = "system_dynamics-body-text" class = "parallax-item-content-panel-body-text">
      System Dynamics is a ground-up refactor and reconstruction of Triumph & Tragedy I on a new modular grand-strategy engine, Gamechanger, to lead T&T II development into the future. Interact with your nation in private game channels, set up custom game scenarios, install Triumph & Tragedy II for your own server, and modify it as you wish. 
      <br><br>
      System Dynamics is designed for customisability and long-term support.
    </div>`
  },
  eleven_fiftynine_aoc_two: {
    name: "11:59 (AOC2)",
    animation: "eleven-fifty-nine-aoc-two",
      font_position: "centre",
      font_size: 1,
      font_weight: 300,
    size: 4,
    x: 92,
    y: 18,

    background_image: `gfx/interface/tiles/project_trinity.png`,
    background_opacity: 0.35,
    colour: "red",
    content: `<div id = "eleven_fiftynine_aoc_two-panel-title" class = "parallax-item-content-panel-title">11:59 (AOC2)</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "eleven_fiftynine_aoc_two-development-indicator" class = "parallax-item-complete">Complete</span>,<br>
    <span id = "eleven_fiftynine_aoc_two-development-date" class = "parallax-item-development-date">22 November 2018 - 17 March 2020</span><br>
    <b>Status:</b> <span id = "eleven_fiftynine_aoc_two-status" class = "parallax-item-content-panel-status-indicator tertiary">Tertiary Project</span>
    <div id = "eleven_fiftynine_aoc_two-body-text" class = "parallax-item-content-panel-body-text">
      Formerly developed for the mobile grand-strategy game Age of Civilisations II, 11:59 seeks to bring the pivotal events of the Cold War to the game using a Paradox modding paradigm. Due to game limitations, and the eventual abandonment of AOC2 itself, development was suspended in 2020.
      <br><br>
      All 11:59 mod work has since been moved to AOC3/AnalyticalEngine to better support 11:59 in the future.
      <hr class = "parallax-item-content-panel-divider">
      <b>Links:</b> <a href = "http://www.ageofcivilizationsgame.com/topic/5090-1159-a-cold-war-mod/">Forums</a> | <a href = "https://www.moddb.com/mods/1159-a-cold-war-mod">ModDB</a>
      <b>Releases:</b>
      <ul>
        <li>0.92.1b | <a href = "https://www.moddb.com/downloads/start/193646?referer=https%3A%2F%2Fwww.moddb.com%2Fmods%2F1159-a-cold-war-mod">Download</a></li>
      </ul>
    </div>`
  },
  analytical_engine: {
    name: "Analytical Engine",
    animation: "analytical-engine",
      font_position: "bottom-left",
      font_size: 2,
      font_weight: 500,
    default_pin: true,
    size: 2,
    x: 92,
    y: 36,

    dependencies: ["eleven_fiftynine_aoc_three"],
    background_image: `gfx/interface/tiles/analytical_engine_tile.png`,
    background_opacity: 0.15,
    colour: "transparent-sepia",
    content: `<div id = "analytical_engine-panel-title" class = "parallax-item-content-panel-title">AnalyticalEngine</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "analytical_engine-development-indicator" class = "parallax-item-beta-ongoing">Beta (Ongoing)</span>,<br>
    <span id = "analytical_engine-development-date" class = "parallax-item-development-date">27 October 2024 -</span><br>
    <b>Status:</b> <span id = "analytical_engine-status" class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div id = "analytical_engine-body-text" class = "parallax-item-content-panel-body-text">
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
    </div>`
  },
  eleven_fiftynine_aoc_three: {
    name: "",
    animation: "eleven-fifty-nine-aoc-three",
      font_position: "centre",
      font_size: 1,
      font_weight: 300,
    size: 4,
    x: 120,
    y: 32,

    background_image: `gfx/interface/tiles/1159_logo.jpg`,
    background_opacity: 0.4,
    colour: "midnight-blue",
    content: `<div id = "eleven_fiftynine_aoc_three-panel-title" class = "parallax-item-content-panel-title">11:59 (AOC3)</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "eleven_fiftynine_aoc_three-development-indicator" class = "parallax-item-alpha-ongoing">Alpha (Ongoing) </span>,<br>
    <span id = "eleven_fiftynine_aoc_three-development-date" class = "parallax-item-development-date">27 October 2024 -</span><br>
    <b>Status:</b> <span id = "eleven_fiftynine_aoc_three-status" class = "parallax-item-content-panel-status-indicator secondary">Secondary Project</span>
    <div id = "eleven_fiftynine_aoc_three-body-text" class = "parallax-item-content-panel-body-text">
      Built on top of a new open-source injection engine (AnalyticalEngine) for Age of Civilisations III, 11:59 brings the economic and political intrigue of the First and Second Cold Wars to AOC3 between 1946-2092. Development of the mod has been handed over to Confoederatio Technical Division, and it is also used as an example for other game mods developed using AnalyticalEngine.
      <hr class = "parallax-item-content-panel-divider">
      <b>Links:</b> <a href = "https://github.com/Confoederatio/AnalyticalEngine/tree/main/src/mods/11.59">GitHub</a>
    </div>
    `
  },
  universal_framework: {
    name: "<div style = 'font-weight: 700;'>UF</div><br><br><div style = 'text-align: right;'>Universal Framework</div>",
    animation: "universal-framework",
      font_position: "top-left",
      font_size: 2,
      font_weight: 400,
    default_pin: true,
    size: 2,
    x: 144,
    y: 68,

    colour: "orange",
    background_opacity: 1,
    content: `<div id = "universal_framework-panel-title" class = "parallax-item-content-panel-title">Universal Framework</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "universal_framework-development-indicator" class = "parallax-item-complete">Complete, Ongoing</span>,<br>
    <span id = "universal_framework-development-date" class = "parallax-item-development-date">15 March 2024 -</span><br>
    <b>Status:</b> <span id = "universal_framework-status" class = "parallax-item-content-panel-status-indicator secondary">Secondary  Project</span>
    <div id = "universal_framework-body-text" class = "parallax-item-content-panel-body-text">
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
    `
  },
  scriptly: {
    name: "Scriptly",
    animation: "scriptly",
      font_position: "bottom-left",
      font_size: 1,
      font_weight: 300,
    size: 4,
    x: 144,
    y: 96,

    colour: "bright-yellow",
    content: `<div id = "scriptly-panel-title" class = "parallax-item-content-panel-title">Scriptly</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "scriptly-development-indicator" class = "parallax-item-complete">Complete (Ongoing)</span>,<br>
    <span id = "scriptly-development-date" class = "parallax-item-development-date">5 November 2024</span><br>
    <b>Status:</b> <span id = "scriptly-status" class = "parallax-item-content-panel-status-indicator secondary">Secondary Project</span>
    <div id = "scriptly-body-text" class = "parallax-item-content-panel-body-text">
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
    `
  },

  discord_bots: {
    name: "Grand Strategy",
    animation: "grand-strategy",
      font_size: 3,
      font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 0,
    y: 32,

    dependencies: ["empires_undone", "triumph_and_tragedy_one"],
    colour: "copper"
  },
  triumph_and_tragedy_two: {
    name: "Triumph & Tragedy II",
    animation: "triumph-and-tragedy-two",
      font_position: "bottom-right",
      font_size: 2,
      font_weight: 700,
    default_bookmark: true,
    default_pin: true,
    size: 1,
    x: 60,
    y: 68,

    dependencies: ["system_dynamics", "into_modernity", "last_man_standing", "proxy_cables"],
    background_image: `gfx/interface/tiles/battle_of_the_leyte_gulf.png`,
    background_opacity: 0.4,
    colour: "salmon",
    content: `<div id = "triumph_and_tragedy_two-panel-title" class = "parallax-item-content-panel-title">Triumph & Tragedy II</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "triumph_and_tragedy_two-development-indicator" class = "parallax-item-complete">Complete (Ongoing)</span>,<br>
    <span id = "triumph_and_tragedy_two-development-date" class = "parallax-item-development-date">22 April 2021 -</span><br>
    <b>Status:</b> <span id = "triumph_and_tragedy_two-status" class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div id = "triumph_and_tragedy_two-body-text" class = "parallax-item-content-panel-body-text">
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
    `
  },
  grand_strategy_mods: {
    name: "Mods & Tools",
    animation: "grand-strategy-mods",
      font_size: 3,
      font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 60,
    y: 32,

    dependencies: ["eleven_fiftynine_aoc_two", "analytical_engine"],
    colour: "blurple"
  },
  other: {
    name: "Other",
    animation: "other",
      font_size: 3,
      font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 112,
    y: 68,

    dependencies: ["scriptly", "universal_framework"],
    colour: "forest-green"
  },

  //Research (CRD)
  eoscala: {
    name: "Eoscala",
    animation: "eoscala",
      font_position: "bottom-right",
      font_size: 2,
      font_weight: 500,
    default_pin: true,
    size: 2,
    x: 220,
    y: 36,

    background_image: `gfx/interface/tiles/eoscala.png`,
    background_opacity: 1,
    colour: "dark-grey",
    content: `<div id = "eoscala-panel-title" class = "parallax-item-content-panel-title">Eoscala</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "eoscala-development-indicator" class = "parallax-item-complete">Complete (Ongoing)</span>,<br>
    <span id = "eoscala-development-date" class = "parallax-item-development-date">1 March 2025 -</span><br>
    <b>Status:</b> <span id = "eoscala-status" class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div id = "eoscala-body-text" class = "parallax-item-content-panel-body-text">
      Gridded economic statistics from 10000BC to the present. Time intervals are provided at 1000-year intervals from 10000BC to 1AD, at 100-year intervals from 1AD to 1700AD, at 10-year intervals from 1700AD to 1950AD, and at 1-year intervals from 1950AD onwards. All data is provided at 5-arcminute resolution on WGS84 Equirectangular.
      <br><br>
      Eoscala is currently operable, with future routine updates to improve model and data accuracy alongside ease of reproducibility. Base Eoscala data are used to support the expansion of economic data and fidelity into the deep past. Since 2024, Eoscala has been managed by CRD.
      <hr class = "parallax-item-content-panel-divider">
      <b>Releases:</b>
      <ul>
        <li>Eoscala 1.0 | <a href = "https://github.com/Confoederatio/Eoscala-Velkscala/archive/refs/tags/eoscala-1.0-velkscala-0.5.zip">Download</a> | <a href = "https://github.com/Confoederatio/Eoscala-Velkscala/tree/main">GitHub</a></li>
      </ul>
    </div>
    `
  },
  velkscala: {
    name: "Velkscala",
    animation: "velkscala",
      font_position: "centre",
      font_size: 2,
      font_weight: 300,
    size: 2,
    x: 192,
    y: 64,

    colour: "salmon",
    content: `<div id = "velkscala-panel-title" class = "parallax-item-content-panel-title">Velkscala</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "velkscala-development-indicator" class = "parallax-item-beta">Beta (Ongoing)</span>,<br>
    <span id = "velkscala-development-date" class = "parallax-item-development-date">1 March 2025 -</span><br>
    <b>Status:</b> <span id = "velkscala-status" class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div id = "velkscala-body-text" class = "parallax-item-content-panel-body-text">
      Gridded population and demographic statistics from 10000BC to the present. Time intervals are provided at 1000-year intervals from 10000BC to 1AD, at 100-year intervals from 1AD to 1700AD, at 10-year intervals from 1700AD to 1950AD, and at 1-year intervals from 1950AD onwards. All data is provided at 5-arcminute resolution on WGS84 Equirectangular.
      <br><br>
      Velkscala should be approached with caution in its current state. Its data is inherently scalable, but there may exist datapoint anomalies, especially regarding past urban settlements. We intend to resolve these issues following a general-purpose refactor and revamped methodology. Since 2024, Velkscala has been managed by CRD. Velkscala currently relies on hybridised HYDE3.3/McEvedy data.
      <hr class = "parallax-item-content-panel-divider">
      <b>Releases:</b>
      <ul>
        <li>Velkscala 0.5 | <a href = "https://github.com/Confoederatio/Eoscala-Velkscala/archive/refs/tags/eoscala-1.0-velkscala-0.5.zip">Download</a> | <a href = "https://github.com/Confoederatio/Eoscala-Velkscala/tree/main">GitHub</a></li>
      </ul>
    </div>
    `
  },

  gazetteer: {
    name: "<span style = 'font-size: 1vh;'>Gazetteer of Demographic, Economic, and Geographic Datasets</span>",
    animation: "gazetteer",
      font_position: "bottom-left",
      font_size: 1,
      font_weight: 500,
    size: 5,
    x: 220,
    y: 96,

    colour: "midnight-blue",
    content: `<div id = "gazetteer-panel-title" class = "parallax-item-content-panel-title">Gazetteer of Demographic, Economic, and Geographic Datasets</div>
    <hr class = "parallax-item-content-panel-divider">
    <div id = "gazetteer-body-text" class = "parallax-item-content-panel-body-text">
      The Gazetteer provides a list of scientific tools and software that may be useful for data wrangling related tasks, split by tooling and associated databases. Some tools are unaffiliated, whilst others are under the jurisdiction of CRD. We provide third-party disclaimers where appropriate.
      <br><br>
      You can visit the present Gazetteer on Confoederatio Docs. 
    </div>
    `
  },
  geographic_economic_papers: {
    name: "Geographic/Economic Papers",
    animation: "geographic-economic-papers",
      font_position: "bottom-right",
      font_size: 1,
      font_weight: 300,
    size: 5,
    x: 236,
    y: 96,

    colour: "salmon",
    content: `<div id = "geographic_economic_papers-panel-title" class = "parallax-item-content-panel-title">Geographic/Economic Papers</div>
    <hr class = "parallax-item-content-panel-divider">
    <div id = "geographic_economic_papers-body-text" class = "parallax-item-content-panel-body-text">
      Geographic and economic white papers, grey literature, and technical drafts written by CRD are available in their full form on Confoederatio Docs. Most of these documents are applied research.
    </div>
    `
  },
  military_papers: {
    name: "Military Papers",
    animation: "military-papers",
      font_position: "bottom-right",
      font_size: 1,
      font_weight: 300,
    size: 5,
    x: 252,
    y: 80,

    colour: "red",
    content: `<div id = "military_papers-panel-title" class = "parallax-item-content-panel-title">Military Papers</div>
    <hr class = "parallax-item-content-panel-divider">
    <div id = "military_papers-body-text" class = "parallax-item-content-panel-body-text">
      Military papers, grey literature, and technical drafts written by CRD are available in their full form on Confoederatio Docs. Most of these consist of raw data points gathered under Project Satsecrér, with a focus on applied research. If you specialise in military hardware, OSINT, and geolocation, please get in touch. 
    </div>
    `
  },
  political_diplomatic_papers: {
    name: "Political/Diplomatic Papers",
    animation: "political-diplomatic-papers",
      font_position: "centre",
      font_size: 1,
      font_weight: 300,
    size: 5,
    x: 252,
    y: 64,

    colour: "forest-green",
    content: `<div id = "political_diplomatic_papers-panel-title" class = "parallax-item-content-panel-title">Political/Diplomatic Papers</div>
    <hr class = "parallax-item-content-panel-divider">
    <div id = "political_diplomatic_papers-body-text" class = "parallax-item-content-panel-body-text">
      Repository of CRD papers related to political science and IR. Any papers published in this category are available in their full form on Confoederatio Docs. Most of these documents focus purely on applied research.
    </div>
    `
  },
  
  naissance: {
    name: "Naissance",
    animation: "naissance",
      font_position: "centre",
      font_size: 2,
      font_weight: 500,
    default_bookmark: true,
    default_pin: true,
    size: 2,
    x: 272,
    y: 64,

    background_image: `gfx/interface/tiles/naissance.png`,
    background_opacity: 0.175,
    colour: "bright-yellow",
    content: `<div id = "naissance-panel-title" class = "parallax-item-content-panel-title">Naissance GIS</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "naissance-development-indicator" class = "parallax-item-beta">Beta (Ongoing)</span>,<br>
    <span id = "naissance-development-date" class = "parallax-item-development-date">6 April 2023 -</span><br>
    <b>Status:</b> <span id = "naissance-status" class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div id = "naissance-body-text" class = "parallax-item-content-panel-body-text">
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
    `
  },
  project_humanity: {
    name: "Project Humanity",
    animation: "project-humanity",
      font_position: "bottom-left",
      font_size: 1,
      font_weight: 300,
    size: 4,
    x: 300,
    y: 46,

    colour: "light-grey",
    content: `<div id = "project-humanity-panel-title" class = "parallax-item-content-panel-title">Project Humanity</div>
    <hr class = "parallax-item-content-panel-divider">
    <b>Development:</b> <span id = "project-humanity-development-indicator" class = "parallax-item-alpha">Alpha (Suspended)</span>,<br>
    <span id = "project-humanity-development-date" class = "parallax-item-development-date">1 March 2025 -</span><br>
    <b>Status:</b> <span id = "project-humanity-status" class = "parallax-item-content-panel-status-indicator primary">Primary Project</span>
    <div id = "project-humanity-body-text" class = "parallax-item-content-panel-body-text">
      Project Humanity is a project focused on general human cognition, particularly in long-term personality retention and worldview enculturation which can be hybridised with other short-term cognitive architectures such as SOAR or ACT-R. In particular, we focus on the development of long-term models of human nature and behaviour for use in mesosocial simulations.
      <br><br>
      Prototypes related to Project Humanity are provided as Vensim (.mdl) files.
      <hr class = "parallax-item-content-panel-divider">
      <b>Links:</b> <a href = "https://github.com/Confoederatio/Naissance/archive/refs/heads/master.zip">Discord</a></li> | <a href = "https://docs.google.com/document/d/1pmYnD0pVYnxatR96WDLCmsKMFMa_4ROOBp_nt2eg8hY/edit?usp=sharing">Paper (Working Technical Draft)</a>
      <b>Releases:</b>
      <ul>
        <li>0.3a Head</li>
        <li>0.3a Tail</li>
        <li>0.2a Head</li>
        <li>0.1a Head</li>
        <li>0.1a Tail</li>
      </ul>
    </div>
    `
  },
  
  datasets: {
    name: "Datasets",
    animation: "datasets",
      font_size: 3,
      font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 188,
    y: 32,

    dependencies: ["eoscala", "velkscala"],
    colour: "light-grey"
  },
  grey_literature_and_taxonomials: {
    name: "Grey Literature & Taxonomials",
    animation: "grey-literature-and-taxonomials",
      font_size: 2,
      font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 220,
    y: 64,

    dependencies: ["gazetteer", "geographic_economic_papers", "military_papers", "political_diplomatic_papers"],
    colour: "cream-white",
    content: `<div id = "grey-literature-and-taxonomials-panel-title" class = "parallax-item-content-panel-title">Grey Literature & Taxonomials</div>
    <hr class = "parallax-item-content-panel-divider">
    <div id = "grey-literature-and-taxonomials-body-text" class = "parallax-item-content-panel-body-text">
      Unaffiliated grey literature and taxonomials that have not yet been sorted, most of them available on various Gdrives and other vaults. Please submit a private inquiry for any information at <a href = "mailto:vf.confoederatio@gmail.com">vf.confoederatio@gmail.com</a> prior to publication. We are working on making these classification systems available to the general public.
    </div>
    `
  },
  software_and_tooling: {
    name: "Software & Tooling",
    animation: "software-and-tooling",
      font_size: 2,
      font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 268,
    y: 32,

    dependencies: ["naissance", "project_humanity"],
    colour: "copper"
  },

  //Artistic (CAD)
  anno: {
    name: "Anno",
    animation: "anno",
      font_position: "centre",
      font_size: 2,
      font_weight: 500,
    size: 3,
    x: 368,
    y: 28,

    colour: "sepia"
  },
  armoured_advance: {
    name: "<span style = 'font-size: 1.2vh;'>Armoured Advance</span>",
    animation: "armoured-advance",
      font_position: "bottom-left",
      font_size: 1,
      font_weight: 300,
    size: 6,
    x: 372,
    y: 112,

    background_image: `gfx/interface/tiles/armoured_advance_square.png`,
    background_opacity: 0.1,
    colour: "blue",
    content: `<div id = "armoured_advance-content-wrapper" class = "content-wrapper">
      <div id = "armoured_advance-text-wrapper" class = "text-wrapper">
        <div id = "armoured_advance-panel-title" class = "parallax-item-content-panel-title">Armoured Advance</div>
        <hr id = "armoured_advance-content-panel-divider" class = "parallax-item-content-panel-divider">
        <div id = "armoured_advance-preview" class = "preview-image-container">
          <img src = "gfx/interface/artworks/armored_advance.png" class = "preview-image" id = "armoured-advance" draggable = "false">
        </div>
      </div>
    </div>`
  },
  art_triumph_and_tragedy: {
    name: "<span style = 'font-size: 1.8vh;'>Triumph & Tragedy</span>",
    animation: "art-triumph-and-tragedy",
      font_position: "centre",
      font_size: 1,
      font_weight: 300,
    size: 6,
    x: 440,
    y: 36,

    background_opacity: 0.4,
    colour: "blurple"
  },
  branding_logos: {
    name: "Branding Logos",
    animation: "branding-logos",
      font_position: "bottom-left",
      font_size: 2,
      font_weight: 200,
    size: 3,
    x: 344,
    y: 64,

    colour: "light-blue",
    dependencies: ["confoederatio", "confoederatio_website"]
  },
  boats_on_a_pond: {
    name: "<span style = 'font-size: 1.2vh;'>Boats on a Pond</span>",
    animation: "boats-on-a-pond",
      font_position: "top-left",
      font_size: 1,
      font_weight: 500,
    size: 6,
    x: 384,
    y: 112,

    background_image: `gfx/interface/tiles/boats_on_a_pond_square.png`,
    background_opacity: 0.4,
    colour: "blue",
    content: `<div id = "boats_on_a_pond-content-wrapper" class = "content-wrapper">
      <div id = "boats_on_a_pond-text-wrapper" class = "text-wrapper">
        <div id = "boats_on_a_pond-panel-title" class = "parallax-item-content-panel-title">Boats on a Pond</div>
        <hr id = "boats_on_a_pond-content-panel-divider" class = "parallax-item-content-panel-divider">
        <div id = "boats_on_a_pond-preview" class = "preview-image-container">
          <img src = "gfx/interface/artworks/boats_on_a_pond.jpg" class = "preview-image" id = "boats-on-a-pond" draggable = "false">
        </div>
      </div>
    </div>`
  },
  brooklyn_bridge: {
    name: "<span style = 'font-size: 1.2vh;'>Brooklyn Bridge</span>",
    animation: "brooklyn-bridge",
      font_position: "centre",
      font_size: 1,
      font_weight: 300,
    size: 6,
    x: 396,
    y: 112,

    background_image: `gfx/interface/tiles/brooklyn_bridge_square.png`,
    background_opacity: 0.5,
    colour: "sepia-transparent",
    content: `<div id = "brooklyn_bridge-content-wrapper" class = "content-wrapper">
      <div id = "brooklyn_bridge-text-wrapper" class = "text-wrapper">
        <div id = "brooklyn_bridge-panel-title" class = "parallax-item-content-panel-title">Brooklyn Bridge</div>
        <hr id = "brooklyn_bridge-content-panel-divider" class = "parallax-item-content-panel-divider">
        <div id = "brooklyn_bridge-preview" class = "preview-image-container">
          <img src = "gfx/interface/artworks/brooklyn_bridge.jpg" class = "preview-image" id = "brooklyn-bridge" draggable = "false">
        </div>
      </div>
    </div>`
  },
  confoederatio: {
    name: "<span style = 'font-size: 1.8vh; margin-left: 0.5vh;'>Confoederatio</span>",
    animation: "confoederatio",
      font_position: "bottom-right",
      font_size: 2,
      font_weight: 300,
    size: 5,
    x: 344,
    y: 88,
    colour: "midnight-blue"
  },
  confoederatio_website: {
    name: "<span style = 'font-size: 1.25vh; margin-right: 4vh;'>Confoederatio<br>Website</span>",
    animation: "confoederatio-website",
      font_position: "top-left",
      font_size: 1,
      font_weight: 500,
    size: 6,
    x: 360,
    y: 88,
    colour: "blue"
  },
  graphic_design: {
    name: "Graphic Design",
    animation: "graphic-design",
      font_position: "bottom-right",
      font_size: 2,
      font_weight: 700,
    is_base_node: true,
    size: 3,
    x: 396,
    y: 28,

    colour: "copper",
    dependencies: ["icons"]
  },
  icons: {
    name: "<span style = 'font-size: 3vh;'>Icons</span>",
    animation: "icons",
      font_position: "bottom-right",
      font_size: 1,
      font_weight: 300,
    size: 4,
    x: 396,
    y: 52,

    colour: "salmon"
  },
  landscape_and_cities: {
    name: "Landscapes & Cities",
    animation: "landscape-and-cities",
      font_position: "bottom-left",
      font_size: 2,
      font_weight: 500,
    default_pin: true,
    size: 2,
    x: 368,
    y: 52,

    colour: "mauve",
    dependencies: ["les_halles"]
  },
  london: {
    name: "<span style = 'font-size: 1.5vh;'>London</span>",
    animation: "london",
      font_position: "bottom-right",
      font_size: 2,
      font_weight: 700,
    size: 6,
    x: 408,
    y: 100,

    background_image: `gfx/interface/tiles/london_square.png`,
    background_opacity: 0.25,
    colour: "light-grey",
    content: `<div id = "london-content-wrapper" class = "content-wrapper">
      <div id = "london-text-wrapper" class = "text-wrapper">
        <div id = "london-panel-title" class = "parallax-item-content-panel-title">London</div>
        <hr id = "london-content-panel-divider" class = "parallax-item-content-panel-divider">
        <div id = "london-preview" class = "preview-image-container">
          <img src = "gfx/interface/artworks/london.png" class = "preview-image" id = "london" draggable = "false">
        </div>
      </div>
    </div>`
  },
  maps: {
    name: "Maps",
    animation: "maps",
      font_position: "bottom-left",
      font_size: 1,
      font_weight: 500,
    size: 4,
    x: 420,
    y: 76,

    colour: "yellow"
  },
  re_verenfedern: {
    name: "Ré Verenfedern",
    animation: "re-verenfedern",
      font_position: "bottom-left",
      font_size: 1,
      font_weight: 300,
    size: 5,
    x: 424,
    y: 32,

    background_image: `gfx/interface/tiles/re_verenfedern_square.png`,
    background_opacity: 0.4,
    colour: "light-blue",
    dependencies: ["art_triumph_and_tragedy"]
  },
  the_colorado: {
    name: "<span style = 'font-size: 1.25vh; margin-right: 4vh;'>The<br>Colorado</span>",
    animation: "the-colorado",
      font_position: "top-left",
      font_size: 1,
      font_weight: 300,
    size: 6,
    x: 408,
    y: 88,

    background_image: `gfx/interface/tiles/the_colorado_square.png`,
    background_opacity: 0.8,
    colour: "copper",
    content: `<div id = "the_colorado-content-wrapper" class = "content-wrapper">
      <div id = "the_colorado-text-wrapper" class = "text-wrapper">
        <div id = "the_colorado-panel-title" class = "parallax-item-content-panel-title">The Colorado</div>
        <hr id = "the_colorado-content-panel-divider" class = "parallax-item-content-panel-divider">
        <div id = "the_colorado-preview" class = "preview-image-container">
          <img src = "gfx/interface/artworks/the_colorado.jpg" class = "preview-image" id = "the-colorado" draggable = "false">
        </div>
      </div>
    </div>`
  },
  yosemite: {
    name: "<span style = 'font-size: 1.5vh;'>Yosemite</span>",
    animation: "yosemite",
      font_position: "centre",
      font_size: 1,
      font_weight: 700,
    size: 6,
    x: 408,
    y: 76,

    background_image: `gfx/interface/tiles/yosemite_square.png`,
    background_opacity: 0.4,
    colour: "forest-green",
    content: `<div id = "yosemite-content-wrapper" class = "content-wrapper">
      <div id = "yosemite-text-wrapper" class = "text-wrapper">
        <div id = "yosemite-panel-title" class = "parallax-item-content-panel-title">Yosemite</div>
        <hr id = "yosemite-content-panel-divider" class = "parallax-item-content-panel-divider">
        <div id = "yosemite-preview" class = "preview-image-container">
          <img src = "gfx/interface/artworks/yosemite.png" class = "preview-image" id = "yosemite" draggable = "false">
        </div>
      </div>
    </div>`
  },
  
  art_projects: {
    name: "Art Projects",
    animation: "art-projects",
      font_position: "bottom-right",
      font_size: 3,
      font_weight: 700,
    default_pin: true,
    is_base_node: true,
    size: 1,
    x: 336,
    y: 32,

    background_image: `gfx/interface/tiles/adriatic_square.png`,
    background_opacity: 0.6,
    colour: "cream-white",
    dependencies: ["branding_logos", "anno", "landscape_and_cities"]
  },
  legacy_work: {
    name: "Legacy Work",
    animation: "legacy-work",
      font_position: "bottom-right",
      font_size: 2,
      font_weight: 700,
    is_base_node: true,
    size: 3,
    x: 420,
    y: 52,

    colour: "orange",
    dependencies: ["maps"]
  },
  les_halles: {
    name: "Les Halles",
    animation: "les-halles",
      font_position: "bottom-right",
      font_size: 2,
      font_weight: 700,
    default_pin: true,
    size: 1,
    x: 376,
    y: 80,

    background_image: `gfx/interface/tiles/les_halles_square.png`,
    background_opacity: 0.85,
    colour: "dark-grey",
    dependencies: ["the_colorado", "london", "brooklyn_bridge", "boats_on_a_pond", "armoured_advance", "yosemite"],
    content: `<div id = "les_halles-content-wrapper" class = "content-wrapper">
      <div id = "les_halles-text-wrapper" class = "text-wrapper">
        <div id = "les_halles-panel-title" class = "parallax-item-content-panel-title">Les Halles</div>
        <hr id = "les_halles-content-panel-divider" class = "parallax-item-content-panel-divider">
        <div id = "les_halles-preview" class = "preview-image-container">
          <img src = "gfx/interface/artworks/les_halles.jpg" class = "preview-image" id = "les-halles" draggable = "false">
        </div>
      </div>
    </div>`
  },

  //Preservés (PRS)
  digital_preserves_atlases: {
    name: "Atlases",
    animation: "digital-preserves-atlases",
      font_position: "centre",
      font_size: 1,
      font_weight: 500,
    size: 4,
    x: 468,
    y: 68,

    colour: "salmon"
  },
  digital_preserves_maps: {
    name: "<span style = 'font-size: 1.75vh;'>Maps</span>",
    animation: "digital-preserves-maps",
      font_position: "top-left",
      font_size: 1,
      font_weight: 300,
    size: 6,
    x: 486,
    y: 68,

    colour: "midnight-blue"
  },
  physical_holdings_atlases: {
    name: "Atlases",
    animation: "physical-holdings-atlases",
      font_position: "centre",
      font_size: 1,
      font_weight: 500,
    size: 4,
    x: 502,
    y: 50,

    colour: "yellow"
  },
  physical_holdings_other_documents: {
    name: "<span style = 'font-size: 1.25vh;'>Other Documents</span>",
    animation: "physical-holdings-other-documents",
      font_position: "top-left",
      font_size: 1,
      font_weight: 300,
    size: 6,
    x: 520,
    y: 56,

    colour: "bright-yellow"
  },

  digital_preserves: {
    name: "Digital Preservés",
    animation: "digital-preserves",
      font_position: "bottom-right",
      font_size: 2,
      font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 468,
    y: 36,

    colour: "sepia",
    dependencies: ["digital_preserves_atlases", "digital_preserves_maps"],
    content: `
    <div id = "digital-preserves-panel-title" class = "parallax-item-content-panel-title">Digital Preservés</div>
    <hr class = "parallax-item-content-panel-divider">
    <div id = "digital-preserves-body-text" class = "parallax-item-content-panel-body-text">
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
    `
  },
  physical_holdings: {
    name: "Physical Holdings",
    animation: "physical-holdings",
      font_position: "bottom-right",
      font_size: 2,
      font_weight: 700,
    is_base_node: true,
    size: 1,
    x: 500,
    y: 68,

    colour: "gold",
    dependencies: ["physical_holdings_atlases", "physical_holdings_other_documents"],
    content: `
    <div id = "physical-holdings-panel-title" class = "parallax-item-content-panel-title">Physical Holdings</div>
    <hr class = "parallax-item-content-panel-divider">
    <div id = "physical-holdings-body-text" class = "parallax-item-content-panel-body-text">
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
    `
  }
};
