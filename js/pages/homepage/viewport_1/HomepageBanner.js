window.HomepageBanner = class extends window.WebComponent {
	constructor (arg0_value, arg1_options) {
		// Convert from parameters
		let value = arg0_value ? arg0_value : {};
		let options = arg1_options ? arg1_options : {};
			super(value, options);
		
		// Declare local instance variables
		this.banner_settings = {
			animation_threshhold: 100,
			backgrounds: {
				main_video: {
					name: "Confoederatio26",
				},
				cleveland_fog: {
					name: "Sunset",
				},
				lava_lamp: {
					name: "Lava Lamp",
				},
				misty_forest: {
					name: "Misty Forest",
				},
				rain: {
					name: "Rain",
				},
				triumph_and_tragedy: {
					name: "Triumph & Tragedy",
				},
			},
			fonts: {
				bahnschrift: {
					name: "Bahnschrift",
					font_weight: [300, 700],
				},
				barlow: {
					name: "Barlow",
					font_weight: [100, 900],
				},
				fira_sans: {
					name: "Fira Sans",
					font_weight: [100, 900],
				},
				josefin_sans: {
					name: "Josefin Sans",
					font_weight: [100, 700],
				},
				quicksand: {
					name: "Quicksand",
					font_weight: [300, 700],
				},
				raleway: {
					name: "Raleway",
					font_weight: [100, 900],
				},
			},
			font_size: [10, 50],
			overlay: {
				colours: {
					azure: {
						name: "Azure",
						filter: "grayscale(0) hue-rotate(180deg)",
					},
					black: {
						name: "Black",
						filter: "brightness(0.2) grayscale(1)",
					},
					blue: {
						name: "Blue",
						filter: "grayscale(0) hue-rotate(225deg)",
					},
					copper: {
						name: "Copper",
						filter: "grayscale(0.6) hue-rotate(50deg)",
					},
					forest_green: {
						name: "Forest Green",
						filter: "grayscale(0.6) hue-rotate(100deg)",
					},
					grey: {
						name: "Grey",
						filter: "grayscale(1)",
					},
					light_blue: {
						name: "Light Blue",
						filter: "grayscale(0.5) hue-rotate(225deg)",
					},
					lime_green: {
						name: "Lime Green",
						filter: "grayscale(0) hue-rotate(90deg)",
					},
					magenta: {
						name: "Magenta",
						filter: "grayscale(0) hue-rotate(310deg)",
					},
					negative: {
						name: "Negative",
						filter: "grayscale(0) invert(1)",
					},
					orange: {
						name: "Orange",
						filter: "grayscale(0) hue-rotate(45deg)",
					},
					pink: {
						name: "Pink",
						filter: "grayscale(0) hue-rotate(340deg)",
					},
					red: {
						name: "Red",
						filter: "grayscale(0)",
					},
					salmon: {
						name: "Salmon",
						filter: "grayscale(0.3)",
					},
					soft_green: {
						name: "Soft Green",
						filter: "grayscale(0.7) hue-rotate(160deg)",
					},
					verdant_green: {
						name: "Verdant Green",
						filter: "grayscale(0) hue-rotate(160deg)",
					},
					violet: {
						name: "Violet",
						filter: "grayscale(0) hue-rotate(260deg)",
					},
					white: {
						name: "White",
						filter: "grayscale(1) brightness(2)",
					},
				},
				opacity_settings: [15, 20, 30, 40],
				default_opacity: 20,
				default_splash_colours: [
					"red",
					"azure",
					"copper",
					"forest_green",
					"orange",
					"blue",
					"negative",
					"violet",
					"salmon",
					"lime_green",
					"magenta",
					"black",
					"verdant_green",
					"pink",
					"red",
					"azure",
					"copper",
					"forest_green",
					"orange",
					"blue",
					"negative",
					"violet",
					"salmon",
					"lime_green",
					"magenta",
					"black",
					"light_blue",
				],
			},
			paused_animation: false,
			paused_backgrounds: false,
			text_selected: false,
		};
		
		this.banner_selected_once = false;
		this.content_editable_evt_listeners_added = false;
		this.current_banner = "main_video";
		this.current_font = "bahnschrift";
		this.current_font_weight = 700;
		this.current_overlay = "grey";
		this.settings_btn_clicked = 0;
		this.settings_minimised = true;
		this.settings_window_open = false;
		this.time_since_selection = 0;
		this.typing_speed = 750;
		
		// Animation variables
		this.lava_lamp_animation_paused = true;
		this.lava_lamp_bg_circuit = 8;
		this.raindrop_animation_paused = true;
		this.raindrop_array = [];
		this.max_number_of_raindrops = 100;
		this.raindrop_iterations = 0;
		this.triumph_and_tragedy_bg_offsets = [
			0, 1, 1.025, 1.05, 1.075, 1.1, 1.125, 1.15, 1.175,
		];
		
		// Draw call for mounting; then mount selectors
		this.draw();
		this.mountSelectors();
		this.init();
	}
	
	draw () {
		// Draw HTML first
		this.element.innerHTML = `
		<!--Default video animation-->
		<video id = "homepage-banner-video-bg" class = "homepage-banner-video-bg" preload muted>
			<source src = "gfx/videos/homepage_banner_bg.mp4" type = "video/mp4">
		</video>
		<!--Misty forest background-->
		<video id = "homepage-banner-video-bg-misty-forest" class = "homepage-banner-video-bg-misty-forest hidden" preload muted loop>
			<source src = "gfx/videos/misty_forest_bg.mp4" type = "video/mp4">
		</video>
		<!--Cleveland National Forest background -->
		<div id = "homepage-banner-cleveland-national-forest-bg" class = "homepage-banner-cleveland-national-forest-bg hidden"></div>
		<!--WW1 Parallax background-->
		<div id = "homepage-banner-triumph-and-tragedy-bg" class = "homepage-banner-triumph-and-tragedy-bg hidden">
			<img src = "gfx/interface/ww1_bg/layer_01.png" draggable = "false">
			<img src = "gfx/interface/ww1_bg/layer_02.png" draggable = "false">
			<img src = "gfx/interface/ww1_bg/layer_03.png" draggable = "false">
			<img src = "gfx/interface/ww1_bg/layer_04.png" draggable = "false">
			<img src = "gfx/interface/ww1_bg/layer_05.png" draggable = "false">
			<img src = "gfx/interface/ww1_bg/layer_06.png" draggable = "false">
			<img src = "gfx/interface/ww1_bg/layer_07.png" draggable = "false">
			<img src = "gfx/interface/ww1_bg/layer_08.png" draggable = "false">
		</div>
		<!--Lava lamp background-->
		<div id = "homepage-banner-lava-lamp-bg" class = "homepage-banner-lava-lamp-bg hidden">
			<svg version = "1.1" xmlns = "http://www.w3.org/2000/svg" id = "lava-lamp-loader">
				<defs>
					<filter id = "goo">
						<feGaussianBlur in = "SourceGraphic" result = "blur" stdDeviation = "10" />
						<feColorMatrix in = "blur" mode = "matrix" values = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result = "goo" />
						<feBlend in2 = "goo" in = "SourceGraphic" result = "mix" />
					</filter>
					<linearGradient id = "lava-lamp-gradient">
							<stop offset = "2%"  stop-color = "#40204c"/>
							<stop offset = "10%" stop-color = "#a3225c"/>
							<stop offset = "15%" stop-color = "#f06f51"/>
							<stop offset = "50%" stop-color = "#ed691c"/>
							<stop offset = "65%" stop-color = "#e24926"/>
					</linearGradient>
				</defs>
				<mask id="lava-lamp-mask-container">
					<g class = "lava-lamp-blob-container">
						<!--Big old circle in the top left to just look cool!-->
						<circle class = "lava-lamp-blob" cx = "0%" cy = "0%" r = "20%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "20%" cy = "15%" r = "3%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "44%" cy = "25%" r = "3%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "50%" cy = "32%" r = "7%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "54%" cy = "22%" r = "5%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "30%" cy = "39%" r = "4%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "35%" cy = "45%" r = "6%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "24%" cy = "67%" r = "2.5%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "67%" cy = "62%" r = "8%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "47%" cy = "45%" r = "2%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "57%" cy = "45%" r = "4%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "72%" cy = "45%" r = "6%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
						<circle class = "lava-lamp-blob" cx = "87%" cy = "85%" r = "8%" transform = "rotate(0) translate(0, 0) rotate(0)"/>
					</g>
				</mask>
				<rect x="0" y="0"  mask="url(#lava-lamp-mask-container)" fill="url(#lava-lamp-gradient)" width="100vw" height="100vh">
			</svg>
		</div>
		<!--Rain background, raindrops container contains dynamically generated raindrops-->
		<div id = "homepage-banner-rain-bg-container" class = "homepage-banner-rain-bg-container hidden">
			<div id = "homepage-banner-rain-bg" class = "homepage-banner-rain-bg">
			</div>
			<div id = "homepage-banner-raindrops-container" class = "homepage-banner-raindrops-container">
			</div>
		</div>

		<!--Plexus overlay, keep all this stuff at the bottom of the homepage banner container-->
		<img id = "homepage-banner-plexus-overlay-bg" class = "homepage-banner-plexus-overlay-bg" src = "gfx/interface/vector_plexus_overlay_bg.png" draggable = "false">

		<!-- Actual title -->
		<div id = "homepage-banner-main-title" class = "homepage-banner-main-title">
			<span id = "homepage-banner-main-title-text" class = "homepage-banner-main-title-text" spellcheck = "false"></span>
			<span id = "homepage-caret-wrapper" class = "homepage-caret-container">
				<span id = "homepage-banner-caret-spacer" class = "homepage-caret-spacer">.</span>
				<span id = "homepage-banner-caret-element" class = "homepage-banner-blinking-caret"></span>
			</span>
		</div>

		<!--Homepage banner settings container-->
		<div id = "homepage-banner-footer-container" class = "homepage-banner-footer-container">
			<div id = "settings-btn-container" class = "settings-btn-container stationary">
				<img id = "settings-btn" class = "settings-btn hidden" src = "gfx/interface/icons/settings_btn.png" draggable = "false">
			</div>
			<div id = "homepage-banner-dots-container" class = "homepage-banner-dots-container">
			</div>
			<div id = "homepage-banner-chevron-down" class = "homepage-banner-chevron-down hidden">
				<img id = "homepage-banner-chevron-down-image" class = "homepage-banner-chevron-down-icon" src = "gfx/interface/icons/chevron.png" draggable = "false">
			</div>
			
			<div id = "homepage-banner-subtitle" class = "homepage-banner-subtitle hidden">
				Total data coverage<br>
				from 10000BC to Now
			</div>
		</div>

		<!--Main settings UI-->
		<div id = "homepage-banner-settings-container" class = "homepage-banner-settings-container hidden">
			<div id = "homepage-banner-settings-title-container" class = "homepage-banner-settings-title-container">
				<span id = "homepage-banner-settings-title-text" class = "homepage-banner-settings-title-text">Settings</span>
				<img id = "settings-adjust-size-btn" class = "settings-chevron-btn minimised" src = "gfx/interface/icons/chevron_down.png" draggable = "false">
				<img id = "settings-close-btn" class = "settings-close-btn" src = "gfx/interface/icons/close_btn.png" draggable = "false">
			</div>
			<div id = "homepage-banner-settings-body-container" class = "homepage-banner-settings-body-container scroll-container">
				<div id = "homepage-banner-settings-change-bg-title" class = "settings-subtitle">Change Background:</div>
				<hr class = "settings-ruler">
				<div id = "homepage-banner-settings-change-bg-container" class = "change-bg-container">
				</div>
				<div id = "homepage-banner-settings-change-overlay-title" class = "settings-subtitle">Change Overlay:</div>
				<hr class = "settings-ruler">
				<div id = "homepage-banner-settings-change-overlay-container" class = "change-overlay-container scroll-container">
				</div>

				<div id = "homepage-banner-settings-padded-footer-one" class = "homepage-banner-settings-padded-margin"></div>
				<div id = "other-settings-wrapper" class = "other-settings-container">
					<div id = "homepage-banner-settings-change-opacity-title" class = "settings-subtitle">Change Overlay Opacity:</div>
					<hr class = "settings-ruler">
					<br>
					<input type = "range" id = "settings-change-opacity" class = "settings-change-opacity range-input" value = "15" min = "0" max = "100">
					<br>
					<br>
					<div id = "homepage-banner-settings-text-options-title" class = "settings-subtitle">Text Options:</div>
					<hr class = "settings-ruler">
					<div id = "homepage-banner-settings-change-font-size-label" class = "settings-label">
						Change Font Size:
						<input type = "range" id = "settings-change-font-size" class = "settings-change-font-size range-input added-margin" value = "100" min = "0" max = "100">
					</div>
					<div id = "homepage-banner-settings-change-font-weight-label" class = "settings-label">
						Change Font Weight:
						<input type = "range" id = "settings-change-font-weight" class = "settings-change-font-weight range-input added-margin" value = "100" min = "0" max = "100">
					</div>
					<div id = "homepage-banner-settings-display-caret-label" class = "settings-label">
						Display Caret:
						<label class = "form-switch">
							<input type = "checkbox" id = "settings-display-caret" checked>
							<i></i>
						</label>
					</div>
					<div id = "homepage-banner-settings-change-font-family-label" class = "settings-label">
						Font Family:
						<select id = "settings-change-font-family" class = "font-family-dropdown">
						</select>
					</div>
					<div id = "homepage-banner-settings-change-text-alignment-label" class = "settings-label">
						Text Alignment:
						<button id = "change-left-alignment" class = "text-alignment-button added-margin">
							&lt; &nbsp; Left
						</button>
						<button id = "change-centre-alignment" class = "text-alignment-button added-margin">
							= &nbsp; Centre
						</button>
						<button id = "change-right-alignment" class = "text-alignment-button added-margin">
							&gt; &nbsp; Right
						</button>
					</div>
				</div>
				<div id = "homepage-banner-settings-padded-footer-two" class = "homepage-banner-settings-padded-footer"></div>
			</div>
		</div>
		`;
	}
	
	mountSelectors() {
		this.banner_caret_element = this.element.querySelector(
			`#homepage-banner-caret-element`,
		);
		this.banner_caret_spacer_element = this.element.querySelector(
			`#homepage-banner-caret-spacer`,
		);
		this.banner_title_text = this.element.querySelector(
			`#homepage-banner-main-title-text`,
		);
		this.cleveland_national_forest_bg = this.element.querySelector(
			`#homepage-banner-cleveland-national-forest-bg`,
		);
		this.homepage_banner_overlay = this.element.querySelector(
			`#homepage-banner-plexus-overlay-bg`,
		);
		this.lava_lamp_bg = this.element.querySelector(
			`#homepage-banner-lava-lamp-bg`,
		);
		this.main_video_bg = this.element.querySelector(
			`#homepage-banner-video-bg`,
		);
		this.misty_forest_bg = this.element.querySelector(
			`#homepage-banner-video-bg-misty-forest`,
		);
		this.raindrop_bg = this.element.querySelector(
			`#homepage-banner-rain-bg-container`,
		);
		this.settings_container = this.element.querySelector(
			`#homepage-banner-settings-container`,
		);
		this.title_element = this.element.querySelector(
			`#homepage-banner-main-title`,
		);
		this.triumph_and_tragedy_bg = this.element.querySelector(
			`#homepage-banner-triumph-and-tragedy-bg`,
		);
		
		this.settings_bg_container = this.element.querySelector(
			`#homepage-banner-settings-change-bg-container`,
		);
		this.settings_btn_container = this.element.querySelector(
			`#settings-btn-container`,
		);
		this.settings_close_btn = this.element.querySelector(`#settings-close-btn`);
		this.settings_font_select = this.element.querySelector(
			`#settings-change-font-family`,
		);
		this.settings_minimise_btn = this.element.querySelector(
			`#settings-adjust-size-btn`,
		);
		this.settings_overlay_container = this.element.querySelector(
			`#homepage-banner-settings-change-overlay-container`,
		);
		this.settings_window = this.element.querySelector(
			`#homepage-banner-settings-container`,
		);
		
		this.chevron_icon = this.element.querySelector(
			`#homepage-banner-chevron-down`,
		);
		this.dots_container = this.element.querySelector(
			`#homepage-banner-dots-container`,
		);
		this.raindrop_container = this.element.querySelector(
			`#homepage-banner-raindrops-container`,
		);
		
		// Dynamic inputs
		this.settings_opacity_input = this.element.querySelector(
			`#settings-change-opacity`,
		);
		this.settings_font_size_input = this.element.querySelector(
			`#settings-change-font-size`,
		);
		this.settings_font_weight_input = this.element.querySelector(
			`#settings-change-font-weight`,
		);
		this.settings_caret_checkbox = this.element.querySelector(
			`#settings-display-caret`,
		);
	}
	
	init() {
		this.homepageBannerChangeRawFontSize(20);
		this.homepageBannerCentreAlign();
		this.initialiseBackgroundSettings();
		this.initialiseFontSettings();
		this.initialiseOverlaySettings();
		this.initialiseSettingsButton();
		this.maximiseSettings();
		
		tippy(this.settings_close_btn, {
			content: "Close Settings",
			placement: "top",
		});
		
		//setTimeout(() => this.settings_btn.classList.add("hidden")); //Hide settings_btn to begin with
		
		// Setup input listeners
		this.settings_opacity_input.onmousemove = (e) =>
			this.homepageBannerChangeOpacity(e.target.value);
		this.settings_font_size_input.onmousemove = (e) =>
			this.homepageBannerChangeFontSize(e.target.value);
		this.settings_font_weight_input.onmousemove = (e) =>
			this.homepageBannerChangeFontWeight(e.target.value);
		this.settings_caret_checkbox.onclick = () =>
			this.homepageBannerToggleCaret();
		
		this.element.querySelector("#change-left-alignment").onclick = () =>
			this.homepageBannerLeftAlign();
		this.element.querySelector("#change-centre-alignment").onclick = () =>
			this.homepageBannerCentreAlign();
		this.element.querySelector("#change-right-alignment").onclick = () =>
			this.homepageBannerRightAlign();
		
		this.settings_close_btn.onclick = () => {
			this.settings_window_open = false;
			this.updateSettingsPanel();
		};
		
		this.settings_minimise_btn.onclick = () => {
			if (this.settings_minimised) {
				this.maximiseSettings();
			} else {
				this.minimiseSettings();
			}
		};
		
		this.initLavaLampCycle();
		this.lava_lamp_circuit_logic = setInterval(() => {
			if (!this.lava_lamp_animation_paused) {
				this.lava_lamp_bg_circuit += randomElement([
					Math.random() * -1 * randomNumber(0, 4),
					Math.random() * randomNumber(0, 5),
				]);
				this.lava_lamp_bg_circuit = Math.min(this.lava_lamp_bg_circuit, 64);
				this.lava_lamp_bg_circuit =
					this.lava_lamp_bg_circuit < 8 ? 8 : this.lava_lamp_bg_circuit;
				
				TweenMax.killAll();
				this.initLavaLampCycle();
			}
		}, 500);
		
		this.raindrop_logic = setInterval(() => {
			if (!this.raindrop_animation_paused) {
				let raindrops_to_remove = [];
				for (let i = 0; i < this.raindrop_array.length; i++)
					if (this.raindrop_array[i].isDestroyed())
						raindrops_to_remove.push(this.raindrop_array[i]);
				for (let i = 0; i < raindrops_to_remove.length; i++) {
					for (let x = 0; x < this.raindrop_array.length; x++)
						if (this.raindrop_array[x] === raindrops_to_remove[i])
							this.raindrop_array.splice(x, 1);
				}
				
				let all_raindrops = this.raindrop_container.querySelectorAll(
					".raindrop",
				);
				let raindrop_size = randomNumber(15, 48);
				let spawn_chance = 0.2;
				
				if (
					Math.random() < spawn_chance &&
					all_raindrops.length < this.max_number_of_raindrops
				) {
					this.raindrop_array.push(
						new this.Raindrop(
							this,
							randomNumber(0, 100),
							randomNumber(0, 100),
							raindrop_size,
							raindrop_size,
							randomElement([0.3, 0.4, 0.5, 0.7]),
							raindrop_size * 750,
						),
					);
				}
				this.raindrop_iterations++;
			}
		}, 250);
		
		this.homepageBannerAnimation();
		this.initialiseHomepageBannerUI();
	}
	
	// Sub-class for Raindrops to keep context
	Raindrop = class {
		constructor(
			parent,
			arg0_x,
			arg1_y,
			arg2_width,
			arg3_height,
			arg4_opacity,
			arg5_duration,
		) {
			this.parent = parent;
			this.x = arg0_x;
			this.y = arg1_y;
			this.width = arg2_width;
			this.height = arg3_height;
			this.duration = arg5_duration ? arg5_duration : randomNumber(20000, 30000);
			this.id = `raindrop-${this.parent.generateRaindropID()}`;
			this.opacity = arg4_opacity ? arg4_opacity : 0.15;
			
			const div = document.createElement("div");
			div.id = this.id;
			div.className = "raindrop";
			div.style.cssText = `
				background-color: rgb(255, 255, 255);
				opacity: ${this.opacity};
				position: absolute;
				width: ${this.width}px;
				height: ${this.height}px;
				top: ${this.y}%;
				left: ${this.x}%;
				border-radius: 50%;
			`;
			this.parent.raindrop_container.appendChild(div);
			
			setTimeout(() => {
				const el = this.parent.element.querySelector(`#${this.id}`);
				if (el) el.remove();
			}, this.duration);
		}
		isDestroyed() {
			return !this.parent.element.querySelector(`#${this.id}`);
		}
	};
	
	adjustFontSize(arg0_container_element, arg1_text_element, arg2_options) {
		let container_el = arg0_container_element;
		let text_el = arg1_text_element;
		let options = arg2_options ? arg2_options : {};
		
		let container_width = container_el.offsetWidth;
		let text_width = text_el.offsetWidth;
		
		if (options.homepage_banner) {
			container_width -= this.banner_caret_element.offsetWidth;
			container_width -= this.banner_caret_spacer_element.offsetWidth;
		}
		
		let current_font_size = parseFloat(
			window.getComputedStyle(text_el).fontSize,
		);
		
		if (!text_el.hasAttribute("data-previous-font-size"))
			text_el.setAttribute("data-previous-font-size", current_font_size);
		
		let previous_font_size = parseFloat(
			text_el.getAttribute("data-previous-font-size"),
		);
		
		if (text_width > container_width) {
			let local_iterations = 0;
			while (text_width > container_width) {
				current_font_size -= 0.25;
				text_el.style.fontSize = `${current_font_size}px`;
				text_width = text_el.offsetWidth;
				if (options.homepage_banner) {
					this.banner_caret_element.style.fontSize = `${current_font_size}px`;
					this.banner_caret_spacer_element.style.fontSize = `${current_font_size}px`;
				}
				local_iterations++;
				if (local_iterations > 1000) break;
			}
		} else {
			let local_iterations = 0;
			if (current_font_size < previous_font_size)
				while (
					text_width < container_width &&
					current_font_size < previous_font_size
					) {
					current_font_size += 0.25;
					text_el.style.fontSize = `${current_font_size}px`;
					text_width = text_el.offsetWidth;
					local_iterations++;
					if (local_iterations > 1000) break;
				}
		}
		
		if (current_font_size >= previous_font_size)
			text_el.removeAttribute("data-previous-font-size");
	}
	
	applySettingsButtonFunctionality() {
		this.settings_btn_clicked++;
		
		// Toggle switch
		this.settings_window_open = !this.settings_window_open;
		
		// Open/close settings window
		this.updateSettingsPanel();
	}
	
	clearText(arg0_options) {
		let options = arg0_options ? arg0_options : {};
		let banner_el = options.banner_el;
		let caret_spacer_el = options.caret_spacer_el;
		
		if (caret_spacer_el) {
			let caret_spacer_el_class = caret_spacer_el.getAttribute("class") || "";
			if (caret_spacer_el_class.length > 0)
				caret_spacer_el.setAttribute(
					"class",
					caret_spacer_el_class.replace("selected", ""),
				);
		}
		banner_el.innerHTML = "";
	}
	
	fetchLavaLampTransformProperties(arg0_string) {
		let local_transform_string = arg0_string;
		local_transform_string = local_transform_string.replace(/rotate\(/gm, "");
		local_transform_string = local_transform_string.replace(
			/\) translate\(/gm,
			" ",
		);
		local_transform_string = local_transform_string.replace(
			/\) rotate\(/gm,
			" ",
		);
		local_transform_string = local_transform_string.replace(/\)/gm, "");
		return local_transform_string.split(" ");
	}
	
	generateRaindropID() {
		let current_iteration = 0;
		let valid_id = "";
		while (true) {
			let all_raindrop_elements =
				this.raindrop_container.querySelectorAll(".raindrop");
			let all_raindrop_ids = [];
			for (let i = 0; i < all_raindrop_elements.length; i++)
				all_raindrop_ids.push(
					all_raindrop_elements[i].getAttribute("id").replace("raindrop-", ""),
				);
			
			let new_id = randomNumber(0, 1000000000).toString();
			if (!all_raindrop_ids.includes(new_id)) {
				valid_id = new_id;
				break;
			}
			current_iteration++;
			if (current_iteration > 15) break;
		}
		return valid_id;
	}
	
	homepageBannerAnimation() {
		this.main_video_bg.play();
		
		if (!this.banner_settings.paused_animation) {
			setTimeout(() => {
				this.typeText({
					apply_class: "homepage-banner-text-subelement",
					banner_el: this.banner_title_text,
					text: "NÉRMORNES,",
				})
				.then(() => {
					return this.selectText({
						banner_el: this.banner_title_text,
						caret_el: this.banner_caret_element,
						caret_spacer_el: this.banner_caret_spacer_element,
					});
				})
				.then(() => delay(400))
				.then(() => {
					this.clearText({
						banner_el: this.banner_title_text,
						caret_spacer_el: this.banner_caret_spacer_element,
					});
				})
				.then(() => {
					this.homepageBannerResetFontSize();
				})
				.then(() => delay(350))
				.then(() => {
					return this.typeText({
						apply_class: "homepage-banner-text-subelement",
						banner_el: this.banner_title_text,
						initial_typing_speed: 400,
						text: "WE'RE CONFOEDERATIO;",
					});
				})
				.then(() => delay(1250))
				.then(() => {
					return this.selectText({
						banner_el: this.banner_title_text,
						caret_el: this.banner_caret_element,
						caret_spacer_el: this.banner_caret_spacer_element,
						select_speed: 50,
					});
				})
				.then(() => delay(450))
				.then(() => {
					this.clearText({
						banner_el: this.banner_title_text,
						caret_spacer_el: this.banner_caret_spacer_element,
					});
				})
				.then(() => {
					this.homepageBannerResetFontSize();
				})
				.then(() => delay(1500))
				.then(() => {
					this.homepageBannerSetText(`WE BUILD`);
				})
				.then(() => delay(250))
				.then(() => {
					this.homepageBannerSetText(`TOOLS`);
				})
				.then(() => delay(100))
				.then(() => {
					this.homepageBannerChangeFontSize(30);
				})
				.then(() => delay(350))
				.then(() => {
					const caret_wrap = this.element.querySelector(
						"#homepage-caret-wrapper",
					);
					caret_wrap.setAttribute("class", "fade-out");
					caret_wrap.style.display = "none";
					this.caret_fadeout_finished = true;
				})
				.then(() => delay(3000))
				.then(() => {
					this.homepageBannerChangeRawFontSize(50);
					return this.homepageBannerSetText(
						`<span class = "enlarged-slash">&</span>`,
					);
				})
				.then(() => delay(1000))
				.then(() => {
					this.title_element.setAttribute(
						"class",
						this.title_element
						.getAttribute("class")
						.replace(" slash-positioning", ""),
					);
					this.homepageBannerChangeRawFontSize(24);
					this.homepageBannerSetText(`DATASETS`);
				})
				.then(() => delay(1100))
				.then(() => {
					this.clearText({
						banner_el: this.banner_title_text,
						caret_spacer_el: this.banner_caret_spacer_element,
					});
					return this.typeText({
						apply_class: "homepage-banner-text-subelement",
						banner_el: this.banner_title_text,
						initial_typing_speed: 400,
						text: "USABLE DATA",
					});
				})
				.then(() => delay(1000))
				.then(() => {
					return this.selectText({
						banner_el: this.banner_title_text,
						caret_el: this.banner_caret_element,
						caret_spacer_el: this.banner_caret_spacer_element,
						select_speed: 10,
					});
				})
				.then(() => {
					this.clearText({
						banner_el: this.banner_title_text,
						caret_spacer_el: this.banner_caret_spacer_element,
					});
				})
				.then(() => {
					return this.homepageBannerSetText(`FROM THE NEOLITHIC TO NOW`);
				})
				.then(() => delay(5000))
				.then(() => {
					const caret_wrap = this.element.querySelector(
						"#homepage-caret-wrapper",
					);
					caret_wrap.setAttribute("class", "");
					caret_wrap.style.display = "inline";
					this.homepageBannerTitleAdjustPosition();
					this.homepageBannerResetFontSize();
					this.adjustFontSize(this.title_element, this.banner_title_text, {
						homepage_banner: true,
					});
				})
				.then(() => delay(700))
				.then(() => {
					return this.selectText({
						banner_el: this.banner_title_text,
						caret_el: this.banner_caret_element,
						caret_spacer_el: this.banner_caret_spacer_element,
						select_speed: 0,
					});
				})
				.then(() => delay(250))
				.then(() => {
					this.clearText({
						banner_el: this.banner_title_text,
						caret_spacer_el: this.banner_caret_spacer_element,
					});
				})
				.then(() => delay(300))
				.then(() => {
					this.homepageBannerChangeRawFontSize(20);
					this.homepageBannerTitleAdjustPosition();
				})
				.then(() => delay(2000))
				.then(() => {
					this.banner_title_text.setAttribute("contenteditable", "true");
					this.homepageBannerChangeAnimation();
					return this.typeText({
						apply_class: "homepage-banner-text-subelement",
						banner_el: this.banner_title_text,
						initial_typing_speed: 400,
						slowdown: -0.5,
						text: "EDIT ME.",
					});
				})
				.then(() => delay(300))
				.then(() => {
					return this.selectText({
						banner_el: this.banner_title_text,
						caret_el: this.banner_caret_element,
						caret_spacer_el: this.banner_caret_spacer_element,
						select_speed: 50,
					});
				})
				.then(() => delay(200))
				.then(() => {
					this.clearText({
						banner_el: this.banner_title_text,
						caret_spacer_el: this.banner_caret_spacer_element,
					});
				})
				.then(() => delay(100))
				.then(() => {
					this.homepageBannerResetFontSize();
					return this.typeText({
						apply_class: "homepage-banner-text-subelement",
						banner_el: this.banner_title_text,
						initial_typing_speed: 350,
						text: "TYPE ANYTHING",
					});
				})
				.then(() => delay(500))
				.then(() => {
					this.homepageBannerResetFontSize();
					this.homepageBannerTypeHello();
				});
			}, 1000);
		}
		
		let switched_backgrounds = false;
		this.main_video_bg.onended = () => {
			if (!switched_backgrounds) {
				switched_backgrounds = true;
				this.homepageBannerChangeBanner("misty_forest");
				setTimeout(() => this.homepageBannerChangeBanner("cleveland_fog"), 4000);
				setTimeout(
					() => this.homepageBannerChangeBanner("triumph_and_tragedy"),
					8000,
				);
				setTimeout(() => this.homepageBannerChangeBanner("lava_lamp"), 12000);
				setTimeout(() => {
					setTimeout(() => this.element.querySelector(`#homepage-banner-subtitle`).classList.remove("hidden"), 500);
					this.homepageBannerChangeBanner("rain");
					this.homepageBannerDisplayDots();
					this.lava_lamp_animation_paused = true;
					this.title_element.setAttribute(
						"class",
						this.title_element.getAttribute("class") + " finished-animation",
					);
				}, 16000);
			}
			this.main_video_bg.loop = true;
			if (this.main_video_bg.ended) this.main_video_bg.play();
		};
		
		setInterval(() => {
			if (document.activeElement && this.banner_title_text)
				this.banner_settings.text_selected = (document.activeElement.getAttribute("id") === this.banner_title_text.getAttribute("id"));
			
			if (this.banner_settings.text_selected) {
				if (!this.banner_selected_once) this.homepageBannerCentreAlign();
				this.banner_selected_once = true;
				this.banner_settings.paused_animation = true;
				this.time_since_selection = 0;
				
				if (!this.content_editable_evt_listeners_added) {
					this.banner_title_text.addEventListener("paste", (e) => {
						e.preventDefault();
						let text = e.clipboardData.getData("text/plain");
						document.execCommand("insertHTML", false, text);
					});
					this.content_editable_evt_listeners_added = true;
				}
			} else {
				if (this.banner_settings.paused_animation)
					this.banner_title_text.innerHTML =
						this.banner_title_text.innerText.replace(/\n/gm, "").length == 0
							? "HELLO;"
							: this.banner_title_text.innerHTML;
				this.time_since_selection++;
			}
			
			this.banner_settings.paused_animation =
				this.time_since_selection > this.banner_settings.animation_threshhold
					? false
					: this.banner_settings.paused_animation;
		}, 100);
	}
	
	homepageBannerCentreAlign() {
		this.title_element.setAttribute("alignment", "centre");
		let all_alignments = this.element.querySelectorAll(".text-alignment-button");
		for (let i = 0; i < all_alignments.length; i++)
			all_alignments[i].setAttribute("class", "text-alignment-button");
		this.element
		.querySelector("#change-centre-alignment")
		.setAttribute("class", "text-alignment-button selected");
	}
	
	homepageBannerChangeAnimation() {
		this.homepage_banner_vars = {
			change_speed: [],
			colour_index: 0,
			current_speed: 1500,
		};
		
		for (
			let i = 0;
			i < this.banner_settings.overlay.default_splash_colours.length;
			i++
		) {
			this.homepage_banner_vars.current_speed -= Math.min(
				this.homepage_banner_vars.current_speed * 0.25 * Math.random(),
				100,
			);
			this.homepage_banner_vars.current_speed =
				this.homepage_banner_vars.current_speed < 100
					? 100
					: this.homepage_banner_vars.current_speed;
			this.homepage_banner_vars.change_speed.push(
				this.homepage_banner_vars.current_speed,
			);
			
			let current_delay = sumArray(this.homepage_banner_vars.change_speed);
			
			setTimeout(() => {
				let current_colour =
					this.banner_settings.overlay.default_splash_colours[
						this.homepage_banner_vars.colour_index
						];
				let current_opacity = randomElement([20, 25, 30]).toString();
				
				if (
					current_colour ===
					this.banner_settings.overlay.default_splash_colours[
					this.banner_settings.overlay.default_splash_colours.length - 1
						]
				)
					current_opacity = 25;
				
				this.homepageBannerChangeOpacity(current_opacity);
				this.homepageBannerChangeOverlay(current_colour);
				this.homepage_banner_vars.colour_index++;
			}, current_delay);
		}
	}
	
	homepageBannerChangeBanner(arg0_new_banner) {
		let new_banner = arg0_new_banner;
		this.homepageBannerClearAllDots();
		this.element
		.querySelector("#change-banner-btn-" + new_banner)
		.setAttribute("class", "homepage-banner-change-bg-btn active");
		
		let all_bg_btns = this.element.querySelectorAll(
			".change-bg-container .change-bg-select-option-container",
		);
		for (let i = 0; i < all_bg_btns.length; i++)
			all_bg_btns[i].setAttribute("class", "change-bg-select-option-container");
		
		this.element
		.querySelector("#change-bg-" + new_banner + "-container")
		.setAttribute("class", "change-bg-select-option-container selected");
		
		this.current_banner = new_banner;
		switch (new_banner) {
			case "cleveland_fog":
				this.homepageBannerHideAllElements(this.cleveland_national_forest_bg);
				break;
			case "lava_lamp":
				this.homepageBannerHideAllElements(this.lava_lamp_bg);
				this.lava_lamp_animation_paused = false;
				break;
			case "main_video":
				this.homepageBannerHideAllElements(this.main_video_bg);
				this.main_video_bg.currentTime = 0;
				this.main_video_bg.play();
				break;
			case "misty_forest":
				this.homepageBannerHideAllElements(this.misty_forest_bg);
				this.misty_forest_bg.currentTime = 0;
				this.misty_forest_bg.play();
				break;
			case "rain":
				this.homepageBannerHideAllElements(this.raindrop_bg);
				this.raindrop_animation_paused = false;
				break;
			case "triumph_and_tragedy":
				this.homepageBannerHideAllElements(this.triumph_and_tragedy_bg);
				break;
		}
	}
	
	homepageBannerChangeFont(arg0_new_font) {
		let new_font_family = arg0_new_font;
		let font_obj = this.banner_settings.fonts[new_font_family];
		
		this.current_font = new_font_family;
		this.banner_title_text.style.fontFamily = font_obj.name;
		this.banner_caret_element.style.fontFamily = font_obj.name;
		this.banner_caret_spacer_element.style.fontFamily = font_obj.name;
		
		if (this.currently_selected_font_label)
			this.currently_selected_font_label.style.fontFamily = font_obj.name;
		
		let new_font_weight_value = parseInt(this.banner_title_text.style.fontWeight);
		new_font_weight_value =
			new_font_weight_value /
			((font_obj.font_weight[1] - font_obj.font_weight[0]) / 100);
		
		this.element.querySelector("#settings-change-font-weight").value =
			new_font_weight_value;
	}
	
	homepageBannerChangeFontSize(arg0_font_size) {
		let font_size = arg0_font_size;
		let new_font_size =
			((this.banner_settings.font_size[1] - this.banner_settings.font_size[0]) /
				100) *
			font_size +
			this.banner_settings.font_size[0];
		
		this.banner_title_text.style.fontSize = `${new_font_size}vh`;
		this.banner_caret_element.style.fontSize = `${new_font_size}vh`;
		this.banner_caret_spacer_element.style.fontSize = `${new_font_size}vh`;
		
		this.adjustFontSize(this.title_element, this.banner_title_text, {
			homepage_banner: true,
		});
	}
	
	homepageBannerChangeFontWeight(arg0_font_weight) {
		let font_weight = arg0_font_weight;
		let base_font_weight = this.banner_settings.fonts[this.current_font].font_weight[0];
		let new_font_weight =
			((this.banner_settings.fonts[this.current_font].font_weight[1] -
					base_font_weight) /
				100) *
			font_weight +
			base_font_weight;
		
		this.banner_title_text.style.fontWeight = new_font_weight;
		this.current_font_weight = new_font_weight;
	}
	
	homepageBannerChangeOpacity(arg0_opacity) {
		let new_opacity = arg0_opacity / 100;
		this.homepage_banner_overlay.style.opacity = new_opacity.toString();
		this.element.querySelector("#settings-change-opacity").value = arg0_opacity;
	}
	
	homepageBannerChangeOverlay(arg0_colour) {
		let new_colour = arg0_colour;
		this.homepage_banner_overlay.style.filter =
			this.banner_settings.overlay.colours[new_colour].filter;
		this.current_overlay = new_colour;
		
		let all_overlays = this.element.querySelectorAll(
			".change-overlay-container > .change-overlay-select-option-container",
		);
		for (let i = 0; i < all_overlays.length; i++)
			all_overlays[i].setAttribute(
				"class",
				all_overlays[i].getAttribute("class").replace(" selected", ""),
			);
		
		this.element
		.querySelector("#change-overlay-" + new_colour + "-container")
		.setAttribute("class", "change-overlay-select-option-container selected");
	}
	
	homepageBannerChangeRawFontSize(arg0_font_size) {
		let font_size = arg0_font_size;
		let new_val =
			(font_size - this.banner_settings.font_size[0]) /
			((this.banner_settings.font_size[1] - this.banner_settings.font_size[0]) /
				100);
		this.homepageBannerChangeFontSize(new_val);
		this.element.querySelector("#settings-change-font-size").value = new_val;
	}
	
	homepageBannerClearAllDots() {
		let all_dots = this.element.querySelectorAll(
			".homepage-banner-dots-container div",
		);
		for (let i = 0; i < all_dots.length; i++)
			all_dots[i].setAttribute("class", "homepage-banner-change-bg-btn");
	}
	
	homepageBannerDisplayDots() {
		let background_keys = Object.keys(this.banner_settings.backgrounds);
		let total_time_taken = 0;
		
		for (let i = 0; i < background_keys.length; i++) {
			let local_background = background_keys[i];
			let local_id = "change-banner-btn-" + local_background;
			let local_el = this.element.querySelector("#" + local_id);
			
			local_el.style.transform = "translateY(100vh)";
			local_el.style.animation = "homepage-top-banner-btn-hop-up 1.5s forwards";
			local_el.style.animationDelay = `${(i * (i * 0.25)) / 4}s`;
			
			total_time_taken += (i * (i * 0.25)) / 4;
			
			tippy(local_el, {
				content: this.banner_settings.backgrounds[background_keys[i]].name,
			});
		}
		
		setTimeout(() => {
			this.settings_btn.setAttribute(
				"class",
				"settings-btn settings-btn-animated-fade-in",
			);
			resetAnimation(this.settings_btn);
			this.chevron_icon.setAttribute(
				"class",
				this.chevron_icon.getAttribute("class").replace(" hidden", ""),
			);
		}, total_time_taken * 1000);
	}
	
	homepageBannerHideAllElements(arg0_exception) {
		let exception_element = arg0_exception;
		let background_elements = [
			this.cleveland_national_forest_bg,
			this.lava_lamp_bg,
			this.main_video_bg,
			this.misty_forest_bg,
			this.raindrop_bg,
			this.triumph_and_tragedy_bg,
		];
		for (let i = 0; i < background_elements.length; i++) {
			if (
				exception_element.getAttribute("id") ==
				background_elements[i].getAttribute("id")
			) {
				background_elements[i].setAttribute(
					"class",
					background_elements[i].getAttribute("class").replace(" hidden", ""),
				);
			} else {
				if (!background_elements[i].getAttribute("class").includes("hidden")) {
					background_elements[i].setAttribute(
						"class",
						background_elements[i].getAttribute("class") + " hidden",
					);
				}
			}
		}
		this.lava_lamp_animation_paused = true;
		this.raindrop_animation_paused = true;
	}
	
	homepageBannerHideDots() {
		let reversed_bg_array = Object.keys(
			this.banner_settings.backgrounds,
		).reverse();
		this.settings_btn.setAttribute(
			"class",
			"settings-btn settings-btn-animated-fade-out",
		);
		resetAnimation(this.settings_btn);
		this.chevron_icon.setAttribute(
			"class",
			this.chevron_icon.getAttribute("class") + " hidden",
		);
		
		setTimeout(() => {
			for (let i = 0; i < reversed_bg_array.length; i++) {
				let local_id = "change-banner-btn-" + reversed_bg_array[i];
				let el = this.element.querySelector("#" + local_id);
				el.style.transform = "translateY(0vh)";
				el.style.animation =
					"homepage-top-banner-btn-hop-down 1.5s forwards";
				el.style.animationDelay = `${(i * (i * 0.25)) / 4}s`;
			}
		}, 1000);
	}
	
	homepageBannerLeftAlign() {
		this.title_element.setAttribute("alignment", "left");
		let all_alignments = this.element.querySelectorAll(".text-alignment-button");
		for (let i = 0; i < all_alignments.length; i++)
			all_alignments[i].setAttribute("class", "text-alignment-button");
		this.element
		.querySelector("#change-left-alignment")
		.setAttribute("class", "text-alignment-button selected");
	}
	
	homepageBannerResetFontSize() {
		this.banner_title_text.style.fontSize = "";
		this.banner_caret_element.style.fontSize = "";
		this.banner_caret_spacer_element.style.fontSize = "";
	}
	
	homepageBannerRightAlign() {
		this.title_element.setAttribute("alignment", "right");
		let all_alignments = this.element.querySelectorAll(".text-alignment-button");
		for (let i = 0; i < all_alignments.length; i++)
			all_alignments[i].setAttribute("class", "text-alignment-button");
		this.element
		.querySelector("#change-right-alignment")
		.setAttribute("class", "text-alignment-button selected");
	}
	
	homepageBannerSetText(arg0_text) {
		this.banner_title_text.innerHTML = arg0_text;
		this.homepageBannerTitleAdjustPosition();
		this.adjustFontSize(this.title_element, this.banner_title_text, {
			homepage_banner: true,
		});
	}
	
	homepageBannerTitleAdjustPosition() {
		// Parallax logic placeholder
	}
	
	homepageBannerToggleCaret() {
		let caret_input = this.element.querySelector("#settings-display-caret");
		let caret_wrapper = this.element.querySelector("#homepage-caret-wrapper");
		caret_wrapper.style.opacity = caret_input.checked ? 1 : 0;
	}
	
	homepageBannerTypeHello() {
		if (!this.banner_settings.paused_animation) {
			this.banner_title_text.innerHTML = "";
			this.homepageBannerLeftAlign();
			
			this.typeText({
				banner_el: this.banner_title_text,
				initial_typing_speed: 650,
				text: "AVREU",
			})
			.then(() => delay(1000))
			.then(() => {
				this.banner_title_text.innerHTML = `MOINE`;
			})
			.then(() => delay(800))
			.then(() => {
				this.banner_title_text.innerHTML = `SALUT`;
			})
			.then(() => delay(500))
			.then(() => {
				this.banner_title_text.innerHTML = `HALLO`;
			})
			.then(() => delay(350))
			.then(() => {
				this.banner_title_text.innerHTML = `HELLO`;
				this.banner_settings.finished_animation = true;
			});
		}
	}
	
	initLavaLampCycle() {
		let blobs = this.element.querySelectorAll(".lava-lamp-blob");
		window.lava_lamp_cycling_animation = TweenMax.staggerFromTo(
			blobs,
			8,
			{
				cycle: {
					attr: (i) => {
						let r_limit = i * 90 + 360;
						let blob_properties = this.fetchLavaLampTransformProperties(
							blobs[i].getAttribute("transform"),
						);
						let actual_r = parseInt(blob_properties[0]);
						actual_r = actual_r >= r_limit * 0.9 ? actual_r - 360 : actual_r;
						return {
							transform: `rotate(${actual_r}) translate(${
								blob_properties[1].split(",")[0]
							}, 0) rotate(${actual_r * -1})`,
						};
					},
				},
			},
			{
				cycle: {
					attr: (i) => {
						let r = i * 90 + 360;
						return {
							transform:
								"rotate(" +
								r +
								") translate(" +
								this.lava_lamp_bg_circuit +
								", 0.1) rotate(" +
								r * -1 +
								")",
						};
					},
				},
				ease: Linear.easeNone,
				repeat: -1,
			},
		);
	}
	
	initialiseBackgroundSettings() {
		let all_backgrounds = Object.keys(this.banner_settings.backgrounds);
		for (let i = 0; i < all_backgrounds.length; i++) {
			let key = all_backgrounds[i];
			let local_background = this.banner_settings.backgrounds[key];
			let div = document.createElement("div");
			div.id = `change-bg-${key}-container`;
			div.className = "change-bg-select-option-container";
			div.onclick = () => {
				if (this.current_banner != key) this.homepageBannerChangeBanner(key);
			};
			div.innerHTML = `
				<div id = "change-bg-${key}" class = "change-bg-select-option" style = 'background-image: url("gfx/interface/${key}_bg.png");'></div>
				<center class = "image-container">
					<img src = "gfx/interface/icons/checkmark.png" class = "checkmark" draggable = "false"></img>
				</center>
				<center class = "text-container">
					<span class = "change-bg-desc">${local_background.name}</span>
				</center>
			`;
			this.settings_bg_container.appendChild(div);
		}
	}
	
	initialiseFontSettings() {
		let all_fonts = Object.keys(this.banner_settings.fonts);
		for (let i = 0; i < all_fonts.length; i++) {
			let key = all_fonts[i];
			let opt = document.createElement("option");
			opt.value = key;
			opt.style.fontFamily = this.banner_settings.fonts[key].name;
			opt.style.textTransform = "capitalize";
			opt.textContent = this.banner_settings.fonts[key].name;
			this.settings_font_select.appendChild(opt);
		}
		
		let font_selection = new SlimSelect({
			select: this.settings_font_select,
			showSearch: false,
			onChange: (info) => {
				this.homepageBannerChangeFont(font_selection.selected());
			},
		});
		
		this.currently_selected_font_label = this.element.querySelector(
			".ss-main.font-family-dropdown > .ss-single-selected > .placeholder",
		);
		if (this.currently_selected_font_label)
			this.currently_selected_font_label.style.fontFamily =
				this.banner_settings.fonts[this.current_font].name;
	}
	
	initialiseHomepageBannerUI() {
		let all_backgrounds = Object.keys(this.banner_settings.backgrounds);
		for (let i = 0; i < all_backgrounds.length; i++) {
			let key = all_backgrounds[i];
			let dot = document.createElement("div");
			dot.id = `change-banner-btn-${key}`;
			dot.className = "homepage-banner-change-bg-btn";
			dot.onclick = () => this.homepageBannerChangeBanner(key);
			this.dots_container.appendChild(dot);
		}
	}
	
	initialiseOverlaySettings() {
		let all_colours = Object.keys(this.banner_settings.overlay.colours);
		
		for (let i = 0; i < all_colours.length; i++) {
			let key = all_colours[i];
			let selected = this.current_overlay === key ? "selected" : "";
			let local_overlay = this.banner_settings.overlay.colours[key];
			let div = document.createElement("div");
			div.id = `change-overlay-${key}-container`;
			div.className = `change-overlay-select-option-container ${selected}`;
			div.onclick = () => this.homepageBannerChangeOverlay(key);
			div.innerHTML = `
				<div id = "change-overlay-${key}" class = "change-overlay-select-option">
					<div id = "change-overlay-${key}-background" class = "background" style = 'background-image: url("gfx/interface/vector_plexus_overlay_bg.png"); filter: ${local_overlay.filter};'>
					</div>
				</div>
				<center class = "image-container">
					<img src = "gfx/interface/icons/checkmark.png" class = "checkmark" draggable = "false"></img>
				</center>
				<center class = "text-container">
					<span class = "change-overlay-desc">${local_overlay.name}</span>
				</center>
			`;
			this.settings_overlay_container.appendChild(div);
		}
	}
	
	initialiseSettingsButton() {
		// Only create the innerHTML if it doesn't exist to prevent nuking the element during animation
		if (!this.element.querySelector("#settings-btn")) {
			this.settings_btn_container.innerHTML = `
				<img id="settings-btn" class="settings-btn" src="gfx/interface/icons/settings_btn.png" draggable="false">
			`;
		}
		
		this.settings_btn = this.element.querySelector("#settings-btn");
		
		if (!this.settings_window_open && this.settings_btn_clicked == 0) {
			tippy(this.settings_btn, {
				content: "Open Settings"
			});
		}
		
		// Re-bind click listener whenever the button is referenced
		this.settings_btn.onclick = () => {
			this.applySettingsButtonFunctionality();
		};
	}
	
	maximiseSettings() {
		this.settings_minimised = false;
		this.settings_window.style.height = "80vh";
		this.settings_minimise_btn.setAttribute("class", "settings-chevron-btn");
		this.minimise_btn_tooltip = tippy(this.settings_minimise_btn, {
			content: "Minimise Settings",
			placement: "top",
		});
	}
	
	minimiseSettings() {
		this.settings_minimised = true;
		this.settings_window.style.height = "30vh";
		this.settings_minimise_btn.setAttribute(
			"class",
			"settings-chevron-btn minimised",
		);
		this.minimise_btn_tooltip = tippy(this.settings_minimise_btn, {
			content: "Maximise Settings",
			placement: "top",
		});
	}
	
	selectText(arg0_options) {
		let options = arg0_options ? arg0_options : {};
		let banner_el = options.banner_el;
		let caret_spacer_el = options.caret_spacer_el;
		let select_limit = options.select_limit ? options.select_limit : 0;
		let select_speed = options.select_speed != undefined ? options.select_speed : 100;
		
		let max_delay = 0;
		let spans = banner_el.querySelectorAll("span");
		let span_amount = spans.length;
		let speed_array = [];
		
		if (caret_spacer_el) {
			let caret_class = caret_spacer_el.getAttribute("class") || "";
			caret_spacer_el.setAttribute("class", caret_class + " selected");
		}
		
		for (let i = 0; i < span_amount; i++) {
			speed_array.push(select_speed);
			let total_delay = sumArray(speed_array);
			max_delay = Math.max(max_delay, total_delay);
			
			setTimeout(() => {
				if (!this.banner_settings.paused_animation) {
					let current_spans = banner_el.querySelectorAll("span");
					let selected_count = banner_el.querySelectorAll(
						"span[class*='selected']",
					).length;
					let current_index = current_spans.length - 1 - selected_count;
					
					if (current_index >= select_limit && current_index >= 0) {
						let current_el = current_spans[current_index];
						let current_class = current_el.getAttribute("class") || "";
						current_el.setAttribute("class", current_class + " selected");
					}
					
					let current_anim_index = parseInt(banner_el.getAttribute("anim-index")) || 0;
					if (current_index == select_limit)
						banner_el.setAttribute("anim-index", current_anim_index + 1);
				}
			}, total_delay);
		}
		
		return new Promise((resolve) => setTimeout(resolve, max_delay));
	}
	
	triumphAndTragedyOnScroll () {
		//Set vertical offset
		let scroll_y = window.pageYOffset;
		let triumph_and_tragedy_bg_elements = this.element.querySelectorAll(".homepage-banner-triumph-and-tragedy-bg img");
		
		for (let i = 0; i < triumph_and_tragedy_bg_elements.length; i++) {
			let translate_y = scroll_y*this.triumph_and_tragedy_bg_offsets[i];
			triumph_and_tragedy_bg_elements[i].setAttribute("style", `
      transform: translateY(${translate_y}px);
    `);
		}
	}
	
	typeText(arg0_options) {
		let options = arg0_options ? arg0_options : {};
		let apply_class = options.apply_class ? `class = "${options.apply_class}"` : "";
		let banner_el = options.banner_el;
		let slowdown = options.slowdown != undefined ? options.slowdown : 1;
		let typing_speed = options.initial_typing_speed || 750;
		let typing_text = options.text;
		
		let max_delay = 0;
		let speed_array = [];
		
		for (let i = 0; i < typing_text.length; i++) {
			if (!options.constant_typing_speed)
				typing_speed -= typing_speed * 0.35 * Math.random() * slowdown;
			speed_array.push(typing_speed);
			
			let total_delay = sumArray(speed_array);
			max_delay = Math.max(max_delay, total_delay);
			
			setTimeout(() => {
				if (!this.banner_settings.paused_animation) {
					let current_index = banner_el.querySelectorAll("span").length;
					banner_el.innerHTML += `<span ${apply_class} id = "${banner_el.id}-${current_index}">${typing_text[current_index]}</span>`;
					
					let current_anim_index = parseInt(banner_el.getAttribute("anim-index")) || 0;
					if (current_index + 1 == typing_text.length)
						banner_el.setAttribute("anim-index", current_anim_index + 1);
					
					this.adjustFontSize(this.title_element, this.banner_title_text, {
						homepage_banner: true,
					});
				}
			}, total_delay);
		}
		
		return new Promise((resolve) => setTimeout(resolve, max_delay));
	}
	
	updateSettingsPanel() {
		// Toggle visibility of actual window using classList for reliability
		if (!this.settings_window_open) {
			this.settings_window.classList.remove("settings-animated-open", "hidden");
			this.settings_window.classList.add("settings-animated-close");
		}
		
		setTimeout(() => {
			// Readjust visibility of window if window is currently open
			if (this.settings_window_open) {
				this.settings_window.classList.remove("settings-animated-close", "hidden");
				this.settings_window.classList.add("settings-animated-open");
			}
			
			if (!this.settings_window_open) {
				this.settings_btn_container.classList.add("stationary");
			}
			
			// Set tooltip
			let label_placement = (this.settings_window_open) ? "left" : "top";
			let open_close_label = (this.settings_window_open) ? "Close" : "Open";
			
			if (this.settings_btn._tippy) this.settings_btn._tippy.destroy();
			tippy(this.settings_btn, {
				content: `${open_close_label} Settings`,
				placement: label_placement
			});
		}, 2000);
		
		// Apply button animation
		this.settings_btn_container.classList.remove("stationary");
		let settings_btn_animation = (!this.settings_window_open) ?
			"homepage-settings-btn-roll-back" : "homepage-settings-btn-roll";
		
		// Update the button reference and style without nuking the whole container
		this.settings_btn.style.animation = `${settings_btn_animation} 2s forwards`;
	}
};

function initHomepageBanner () {
	let initialisation_loop = setInterval(() => {
		try {
			window.viewport_one = new window.HomepageBanner();
			window.viewport_one.bind(document.getElementById("homepage-banner"));
			clearInterval(initialisation_loop);
		} catch (e) { console.warn(e); }
	});
}
initHomepageBanner();