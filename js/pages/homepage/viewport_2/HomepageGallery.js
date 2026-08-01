window.HomepageGallery = class extends window.WebComponent {
	constructor (arg0_value, arg1_options) {
		let value = arg0_value ? arg0_value : {};
		let options = arg1_options ? arg1_options : {};
			super(value, options);
		
		this.gallery = {
			bookmark_container: null,
			bookmark_items: [],
			bookmark_minimise_btn: null,
			bookmark_no_label: null,
			bookmark_preview_container: null,
			bookmark_selected: "",
			closing_bookmark: false,
			content_panel_container: null,
			content_panel_scroll_container: null,
			content_panel_update_paused: false,
			exempt_id_patterns: ["preview-", "btn-"],
			gallery_width: 500,
			no_bookmark_label: null,
			parallax_body: null,
			parallax_buttons: null,
			parallax_container: null,
			parallax_pinned_items: [],
			parallax_scroll_indicator: null,
			parallax_scroll_x: 0,
			parallax_selected: [],
			parallax_settings: {},
			scene: null,
		};
		
		this.perspective_deg_x = "0deg";
		this.perspective_deg_y = "2deg";
		this.perspective_string = "";
		this.zoom_states = {};
		this.active_previews = {};
		
		this.draw();
		this.mountSelectors();
		this.init();
	}
	
	draw () {
		this.element.innerHTML = `
		<div id = "project-parallax-container" class = "project-parallax-container">
			<div id = "project-parallax-container-gradient-bg" class = "project-parallax-container-gradient-bg"></div>
			<div id = "project-parallax-container-room-bg" class = "project-parallax-container-room-bg"></div>

			<div id = "scene-container">
				<section id = "scene" class="scene" data-pointer-events = "true" data-x-origin = "0.5" data-y-origin = "50.0" data-scalar-y = "50.0" data-scalar-x = "25.0" data-friction-x = "0.05" data-friction-y = "0.04">
					<div id = "project-parallax-scroll-container" class = "project-parallax-scroll-container">
						<div class = "layer main" data-depth = "1.0">
							<div id = "main-parallax-content-wrapper" class = "parallax-content-container">
								<div class = "project-listings">
									<span class = "parallax-header">PROJECT LISTINGS</span>
									<br><br>
									<hr class = "parallax-line">
								</div>
								<div class = "ctd-header"><span class = "parallax-subheader">Technical (CTD).</span></div>
								<div class = "crd-header"><span class = "parallax-subheader">Research (CRD).</span></div>
								<div class = "cad-header"><span class = "parallax-subheader">Artistic (CAD).</span></div>
							</div>
						</div>
					</div>
				</section>
			</div>
			

			<div id = "main-parallax-content-panel-wrapper" class = "parallax-panel-container">
				<div id = "main-parallax-content-panel-scroll-wrapper" class = "parallax-panel-scroll-container"></div>
			</div>

			<div id = "bookmark-container">
				<div id = "project-parallax-bookmark-container" class = "parallax-bookmark-container minimised">
					<div id = "project-parallax-bookmark-labels-container" class = "project-parallax-text-container">
						<div id = "project-parallax-bookmark-label" class = "bookmarks-title">
							<img id = "project-parallax-bookmark-text-icon" class = "bookmark-text-icon" src = "gfx/interface/icons/bookmark_icon_filled.png" align = "left" draggable = "false"></img>
							<span id = "project-parallax-bookmark-label-text" class = "project-parallax-bookmark-label-text">Bookmarks</span>
							<img id = "project-parallax-bookmark-minimise-icon" class = "bookmark-minimise-icon minimised" src = "gfx/interface/icons/chevron_down.png" align = "right" draggable = "false">
						</div>
					</div>
					<div id = "project-parallax-no-bookmark-label" class = "project-parallax-no-bookmark-label-text">
						<center>
							You don't have any bookmarks currently!<br>
							Add some bookmarks to your collection by pressing on the
							<img id = "project-parallax-no-bookmark-label-image-icon" class = "no-bookmark-label-image-icon" src = "gfx/interface/icons/bookmark_icon_empty.png" draggable = "false"></img>
							icon.
						</center>
					</div>
					<div id = "project-parallax-preview-container" class = "project-parallax-preview-container"></div>
					<div id = "project-parallax-dots-container" class = "project-parallax-dots-container"></div>
				</div>
			</div>

			<div id = "project-parallax-scroll-indicator" class = "project-parallax-scroll-indicator">
				<div id = "project-parallax-scroll-fill-indicator" class = "project-parallax-scroll-fill-indicator"></div>
			</div>
		</div>
		`;
		this.element.style.height = "100%";
	}
	
	mountSelectors () {
		let gallery_obj = this.gallery;
		gallery_obj.scene = this.element.querySelector("#scene");
		gallery_obj.parallax_body = this.element.querySelector(
			"#project-parallax-container",
		);
		gallery_obj.parallax_container = this.element.querySelector(
			"#project-parallax-scroll-container",
		);
		gallery_obj.content_panel_container = this.element.querySelector(
			"#main-parallax-content-panel-wrapper",
		);
		gallery_obj.content_panel_scroll_container = this.element.querySelector(
			"#main-parallax-content-panel-scroll-wrapper",
		);
		gallery_obj.bookmark_container = this.element.querySelector(
			"#project-parallax-bookmark-container",
		);
		gallery_obj.bookmark_preview_container = this.element.querySelector(
			"#project-parallax-preview-container",
		);
		gallery_obj.bookmark_minimise_btn = this.element.querySelector(
			"#project-parallax-bookmark-minimise-icon",
		);
		gallery_obj.bookmark_no_label = this.element.querySelector(
			"#project-parallax-no-bookmark-label",
		);
		gallery_obj.no_bookmark_label = gallery_obj.bookmark_no_label;
		gallery_obj.parallax_scroll_indicator = this.element.querySelector(
			"#project-parallax-scroll-fill-indicator",
		);
		gallery_obj.parallax_buttons = this.element.querySelector(
			"#project-parallax-dots-container",
		);
	}
	
	init () {
		this.initGalleryTiles();
		this.initGalleryUI();
		
		//Set up art previews
		let all_art_preview_imgs = this.element.querySelectorAll(
			".preview-image-container",
		);
		for (let i = 0; i < all_art_preview_imgs.length; i++)
			this.magnify(all_art_preview_imgs[i].querySelector("img"), 3);
	}
	
	addBookmarkItem (arg0_element_id, arg1_no_animation) {
		var local_id = arg0_element_id;
		var no_animation = arg1_no_animation;
		var gallery_obj = this.gallery;
		var bookmark_btn = this.element.querySelector(
			`#bookmark-btn-${local_id}`,
		);
		var local_element = this.element.querySelector(`#${local_id}`);
		if (!local_element) return;
		local_element.setAttribute("id", `preview-${local_id}`);
		if (bookmark_btn) {
			bookmark_btn.setAttribute(
				"class",
				bookmark_btn
				.getAttribute("class")
				.replace("bookmark-empty", "bookmark-filled"),
			);
		}
		// FIX: Use insertAdjacentHTML instead of innerHTML +=
		gallery_obj.bookmark_preview_container.insertAdjacentHTML(
			"beforeend",
			local_element.outerHTML,
		);
		if (!gallery_obj.bookmark_items.includes(local_id))
			gallery_obj.bookmark_items.push(local_id);
		local_element.setAttribute("id", local_id);
		var all_bookmarks = this.element.querySelectorAll(
			".parallax-item-preview",
		);
		var bookmark_el = this.element.querySelector(`#preview-${local_id}`);
		bookmark_el.setAttribute(
			"class",
			bookmark_el
			.getAttribute("class")
			.replace("parallax-item", "parallax-item-preview") +
			" show-animation",
		);
		bookmark_el.onclick = () =>
			this.selectBookmarkItem(`preview-${local_id}`);
		for (let i = 0; i < all_bookmarks.length; i++) {
			all_bookmarks[i].setAttribute(
				"style",
				`left: calc(50% - 12vh - ${i * 12}vh); z-index: ${all_bookmarks.length - 1 - i};`,
			);
		}
		// FIX: Use insertAdjacentHTML instead of innerHTML +=
		bookmark_el.insertAdjacentHTML(
			"beforeend",
			`<div id="btn-close-bookmark-${local_id}" class="parallax-icon close-btn"></div>`,
		);
		bookmark_el.querySelector(".close-btn").onclick = (e) => {
			e.stopPropagation();
			this.bookmarkInteraction(local_id);
		};
		bookmark_el.setAttribute(
			"style",
			`left: calc(50% - 12vh - ${all_bookmarks.length * 12}vh); z-index: -1;`,
		);
		setTimeout(() => {
			var new_bookmark_el = this.element.querySelector(
				`#${bookmark_el.id}`,
			);
			if (new_bookmark_el)
				new_bookmark_el.setAttribute(
					"class",
					new_bookmark_el
					.getAttribute("class")
					.replace(" show-animation", ""),
				);
		}, 1000);
		var new_bookmarks = this.element.querySelectorAll(
			".parallax-item-preview",
		);
		for (let i = 0; i < new_bookmarks.length; i++) {
			var dot_id = `btn-bookmark-${new_bookmarks[i].id}`;
			var bookmark_dot_el = this.element.querySelector(`#${dot_id}`);
			if (!bookmark_dot_el) {
				var local_class_name = !no_animation
					? "parallax-bookmark-dot fade-in"
					: "parallax-bookmark-dot";
				var dot_el = document.createElement("div");
				dot_el.id = dot_id;
				dot_el.className = local_class_name;
				dot_el.onclick = ((id) => () => this.selectBookmarkItem(id))(
					new_bookmarks[i].id,
				);
				gallery_obj.parallax_buttons.appendChild(dot_el);
				setTimeout(() => {
					var all_animated = this.element.querySelectorAll(
						".parallax-bookmark-dot.fade-in",
					);
					for (var j = 0; j < all_animated.length; j++)
						all_animated[j].setAttribute(
							"class",
							all_animated[j]
							.getAttribute("class")
							.replace(" fade-in", ""),
						);
				}, 1000);
			}
		}
		if (gallery_obj.bookmark_items.length == 1)
			gallery_obj.bookmark_selected = local_id;
		gallery_obj.bookmark_selected =
			gallery_obj.bookmark_selected == ""
				? local_id
				: gallery_obj.bookmark_selected;
		gallery_obj.bookmark_selected = !gallery_obj.bookmark_selected.includes(
			"preview-",
		)
			? "preview-" + gallery_obj.bookmark_selected
			: gallery_obj.bookmark_selected;
		try {
			this.selectBookmarkItem(gallery_obj.bookmark_selected, true, true);
		} catch (e) {}
		if (
			!gallery_obj.bookmark_no_label
			.getAttribute("class")
			.includes(" hidden")
		)
			gallery_obj.bookmark_no_label.setAttribute(
				"class",
				gallery_obj.bookmark_no_label.getAttribute("class") + " hidden",
			);
		gallery_obj.bookmark_container.setAttribute(
			"class",
			gallery_obj.bookmark_container
			.getAttribute("class")
			.replace(" no-bookmarks", ""),
		);
	}
	
	bookmarkInteraction (arg0_element_id) {
		var gallery_obj = this.gallery;
		!gallery_obj.bookmark_items.includes(arg0_element_id) &&
		!this.element.querySelector(`#preview-${arg0_element_id}`)
			? this.addBookmarkItem(arg0_element_id)
			: this.removeBookmarkItem(arg0_element_id);
	}
	
	clearBookmarkDots () {
		var all_bookmark_dots = this.element.querySelectorAll(
			".parallax-bookmark-dot",
		);
		for (let i = 0; i < all_bookmark_dots.length; i++)
			all_bookmark_dots[i].setAttribute(
				"class",
				all_bookmark_dots[i].getAttribute("class").replace(" filled", ""),
			);
	}
	
	closeContentPanel (arg0_element_id) {
		var local_el = this.element.querySelector(
			`#${arg0_element_id}-content-panel`,
		);
		var gallery_obj = this.gallery;
		if (local_el) {
			local_el.classList.remove("shown");
			// Only run minimise logic if the panel was actually maximised
			if (local_el.classList.contains("maximised")) {
				this.minimiseContentPanel(arg0_element_id, true);
			}
			gallery_obj.parallax_scroll_indicator.style.opacity = 1;
		}
	}
	
	createPanel (arg0_tile_id, arg1_options) {
		var tile_id = arg0_tile_id;
		var options = arg1_options ? arg1_options : {};
		var gallery_obj = this.gallery;
		if (!options.font_position) options.font_position = "bottom-right";
		if (!options.font_size) options.font_size = 1;
		if (!options.font_weight) options.font_weight = 300;
		if (!options.size) options.size = 1;
		if (!options.x) options.x = 0;
		if (!options.y) options.y = 0;
		if (!options.background_opacity) options.background_opacity = 0.3;
		if (!options.colour) options.colour = "copper";
		var background_style = "";
		var font_size_dict = {
			1: "parallax-minor-project-text",
			2: "parallax-major-project-text",
			3: "parallax-group-text",
		};
		var size_dict = {
			1: "large-square",
			2: "sublarge-square",
			3: "medium-square",
			4: "submedium-square",
			5: "small-square",
			6: "tiny-square",
		};
		var size_vh_dict = { 1: 32, 2: 28, 3: 24, 4: 18, 5: 16, 6: 12 };
		var parallax_tile_container_el = this.element.querySelector(
			"#main-parallax-content-wrapper",
		);
		var parallax_panel_container_el = this.element.querySelector(
			"#main-parallax-content-panel-scroll-wrapper",
		);
		if (options.background_image)
			background_style = ` style = "background-image: url(${options.background_image}); opacity: ${options.background_opacity};"`;
		var tile_element = `
			<div id = "${tile_id}" class = "parallax-item ${size_dict[options.size]} ${options.colour}" style = "position: absolute; top: calc(${options.y}vh + var(--parallax-offset-y)); left: calc(23vw + ${options.x}vh + var(--parallax-offset-x));">
				<div class = "parallax-item-colour-bg"></div>
				<div class = "parallax-item-bg"${background_style}></div>
				<span class = "${font_size_dict[options.font_size]} ${options.font_position}" style = "font-weight: ${options.font_weight}" >${options.name}</span>
			</div>
		`;
		parallax_tile_container_el.innerHTML += tile_element;
		if (options.content) {
			var panel_element = `
				<div id = "${tile_id}-content-panel" class = "parallax-item-content-panel ${options.animation}-panel" style = "top: calc(${options.y}vh - 40vh + ${size_vh_dict[options.size]}vh/2); left: calc(23vw + ${options.x}vh + ${size_vh_dict[options.size]}vh + 8vh + var(--parallax-offset-x) + var(--content-panel-offset-x));">
					<div id = "${tile_id}-content-wrapper" class = "content-wrapper">
						<div id = "${tile_id}-text-wrapper" class = "text-wrapper">
							${options.content}
						</div>
					</div>
				</div>
			`;
			parallax_panel_container_el.innerHTML += panel_element;
		}
		var new_tile_obj = {};
		if (options.animation) new_tile_obj.animation = options.animation;
		if (options.dependencies) new_tile_obj.dependencies = options.dependencies;
		if (options.is_base_node) new_tile_obj.is_base_node = options.is_base_node;
		gallery_obj.parallax_settings[tile_id] = new_tile_obj;
		if (options.default_bookmark)
			if (!gallery_obj.bookmark_items.includes(tile_id))
				gallery_obj.bookmark_items.push(tile_id);
		if (options.default_pin)
			if (!gallery_obj.parallax_pinned_items.includes(tile_id))
				gallery_obj.parallax_pinned_items.push(tile_id);
	}
	
	getCursorPosition (e, arg0_image) {
		e = e ? e : window.event;
		var img_bounds = arg0_image.getBoundingClientRect();
		return { x: e.clientX - img_bounds.left, y: e.clientY - img_bounds.top };
	}
	
	getDescendants (arg0_element_id) {
		var gallery_obj = this.gallery;
		var descendants = [arg0_element_id];
		var current_iterations = 0;
		while (true) {
			var initial_len = descendants.length;
			for (let i = 0; i < descendants.length; i++) {
				var local_obj = gallery_obj.parallax_settings[descendants[i]];
				if (local_obj && local_obj.dependencies)
					for (let x = 0; x < local_obj.dependencies.length; x++)
						if (!descendants.includes(local_obj.dependencies[x]))
							descendants.push(local_obj.dependencies[x]);
			}
			if (descendants.length == initial_len || current_iterations >= 15) break;
			current_iterations++;
		}
		return descendants.filter((d) => d !== arg0_element_id);
	}
	
	getParent (arg0_element_id) {
		var gallery_obj = this.gallery;
		var keys = Object.keys(gallery_obj.parallax_settings);
		var parents = [];
		for (let i = 0; i < keys.length; i++) {
			var obj = gallery_obj.parallax_settings[keys[i]];
			if (obj.dependencies && obj.dependencies.includes(arg0_element_id))
				parents.push(keys[i]);
		}
		return [...new Set(parents)];
	}
	
	hideAllContentPanels () {
		var shown = this.element.querySelectorAll(".parallax-item-content-panel.shown");
		for (let i = 0; i < shown.length; i++)
			shown[i].setAttribute(
				"class",
				shown[i].getAttribute("class").replace(" shown", ""),
			);
	}
	
	hideBookmarkUI () {
		var gallery_obj = this.gallery;
		gallery_obj.bookmark_minimise_btn.setAttribute(
			"class",
			gallery_obj.bookmark_minimise_btn.getAttribute("class") + " minimised",
		);
		gallery_obj.bookmark_container.setAttribute(
			"class",
			gallery_obj.bookmark_container.getAttribute("class") + " minimised",
		);
	}
	
	initGallery () {
		var gallery_obj = this.gallery;
		var hide_elements = [];
		var parallax_elements =
			this.element.querySelectorAll(".parallax-item");
		for (let i = 0; i < parallax_elements.length; i++) {
			this.initParallaxElement(parallax_elements[i].id);
			if (
				this.getParent(parallax_elements[i].id).length > 0 &&
				!gallery_obj.parallax_pinned_items.includes(
					parallax_elements[i].id,
				)
			)
				hide_elements.push(parallax_elements[i].id);
		}
		hide_elements = [...new Set(hide_elements)];
		for (let i = 0; i < hide_elements.length; i++) {
			var local_el = this.element.querySelector(
				`#${hide_elements[i]}`,
			);
			local_el.classList.add("hidden");
			var local_obj =
				gallery_obj.parallax_settings[local_el.id];
			if (local_obj && local_obj.animation)
				local_el.setAttribute(
					"animation",
					`${local_obj.animation}`,
				);
		}
		for (let i = 0; i < gallery_obj.bookmark_items.length; i++)
			this.addBookmarkItem(gallery_obj.bookmark_items[i], true);
		
		// Save all panel styles ONCE after everything is built
		this.saveOriginalPanelStyles();
	}
	
	// Replace the existing initGalleryDesktopEventHandlers in your class
	initGalleryDesktopEventHandlers () {
		var gallery_obj = this.gallery;
		
		// Keep the mouse perspective logic as it is specific to the gallery container
		gallery_obj.parallax_body.addEventListener("mousemove", (e) => {
			var half_width = gallery_obj.parallax_body.clientWidth / 2,
				half_height = gallery_obj.parallax_body.clientHeight / 2,
				mouse_x =
					half_width + gallery_obj.parallax_body.offsetLeft - e.pageX,
				mouse_y =
					half_height + gallery_obj.parallax_body.offsetTop - e.pageY;
			if (gallery_obj.content_panel_update_paused) {
				mouse_x /= 32;
				mouse_y /= 32;
			}
			var max_deg = 1.25;
			this.perspective_deg_x =
				(mouse_y / half_height) * max_deg * -1 + max_deg / 2 + "deg";
			this.perspective_deg_y =
				(mouse_x / half_width) * max_deg * -1 + 2 + "deg";
			this.perspective_string = `rotateX(${this.perspective_deg_x}) rotateY(${this.perspective_deg_y})`;
			gallery_obj.scene.style.transform = `perspective(20em) ${this.perspective_string}`;
		});
		
		// Register this component's update logic to the global IC scroll handler
		if (window.ic && ic._smooth_scroll) {
			ic._smooth_scroll.addUpdateListener(() => {
				this.updateParallaxScrollValues();
				this.updateContentPanelContainer();
			});
		}
		
		// Internal panel scrolling (stop propagation so global scroll doesn't fire)
		gallery_obj.parallax_body.addEventListener(
			"wheel",
			(e) => {
				var panel = e.target.closest(".content-wrapper");
				if (panel) {
					var is_at_top = panel.scrollTop <= 0 && e.deltaY < 0;
					var is_at_bottom =
						panel.scrollTop + panel.offsetHeight >=
						panel.scrollHeight && e.deltaY > 0;
					if (!is_at_top && !is_at_bottom) {
						e.stopPropagation();
					}
				}
			},
			{ passive: false },
		);
		
		// Mirror the wheel scroll-containment logic for touch devices
		let _touch_start_y = 0;
		
		gallery_obj.parallax_body.addEventListener(
			"touchstart",
			(e) => {
				_touch_start_y = e.touches[0].clientY;
			},
			{ passive: true },
		);
		
		gallery_obj.parallax_body.addEventListener(
			"touchmove",
			(e) => {
				var panel = e.target.closest(".content-wrapper");
				if (panel) {
					var delta_y = _touch_start_y - e.touches[0].clientY;
					var is_at_top = panel.scrollTop <= 0 && delta_y < 0;
					var is_at_bottom =
						panel.scrollTop + panel.offsetHeight >=
						panel.scrollHeight && delta_y > 0;
					if (!is_at_top && !is_at_bottom) {
						e.stopPropagation();
						e.preventDefault();
					}
				}
			},
			{ passive: false }, // Must be non-passive to allow preventDefault
		);
	}
	
	initGalleryTiles () {
		var source =
			window.config && window.config.homepage && window.config.homepage.gallery
				? window.config.homepage.gallery.tiles
				: {};
		var keys = Object.keys(source);
		for (let i = 0; i < keys.length; i++)
			try {
				this.createPanel(keys[i], source[keys[i]]);
			} catch (e) {
				console.error(e);
			}
	}
	
	initGalleryUI () {
		var gallery_obj = this.gallery;
		
		gallery_obj.bookmark_minimise_btn.onclick = () => {
			!gallery_obj.bookmark_minimise_btn.classList.contains("minimised")
				? this.hideBookmarkUI()
				: this.showBookmarkUI();
		};
		
		setTimeout(() => {
			let all_panels = this.element.querySelectorAll(".content-wrapper");
			for (let i = 0; i < all_panels.length; i++) {
				let title = all_panels[i].querySelector(
					".title",
				);
				if (!title) continue;
				let id = all_panels[i].id
				.replace("-content-panel", "")
				.replace("-content-wrapper", "");
				
				// Check if this specific panel contains a magnification-capable image
				let has_magnifier =
					all_panels[i].querySelector(".preview-image-container") !==
					null;
				let magnifier_btn_html = has_magnifier
					? `<img id="${id}-preview-btn" class="content-panel-preview-btn active" src="gfx/interface/icons/preview_icon.png" draggable="false">`
					: "";
				
				title.innerHTML = `${title.textContent}
					<img id="${id}-close-btn" class="content-panel-close-btn" src="gfx/interface/icons/close_btn.png" draggable="false">
					<img id="${id}-maximise-btn" class="content-panel-maximise-btn" src="gfx/interface/icons/maximise_icon.png" draggable="false">
					${magnifier_btn_html}
				`;
				
				this.element.querySelector(`#${id}-close-btn`).onclick = () =>
					this.closeContentPanel(id);
				this.element.querySelector(`#${id}-maximise-btn`).onclick =
					() => {
						let panel = this.element.querySelector(
							`#${id}-content-panel`,
						);
						panel.classList.contains("maximised")
							? this.minimiseContentPanel(id)
							: this.maximiseContentPanel(id);
					};
				
				if (has_magnifier) {
					this.element.querySelector(`#${id}-preview-btn`).onclick =
						() => this.togglePreview(id);
				}
			}
		}, 500);
		
		this.initGalleryDesktopEventHandlers();
		
		// Dependency visibility check loop
		const dependency_interval = setInterval(() => {
			for (let i = 0; i < gallery_obj.parallax_selected.length; i++) {
				var item_obj =
					gallery_obj.parallax_settings[
						gallery_obj.parallax_selected[i]
						];
				if (item_obj && item_obj.dependencies) {
					item_obj.dependencies.forEach((dep_id) => {
						var el = this.element.querySelector(`#${dep_id}`);
						if (el && el.classList.contains("hidden")) {
							el.classList.remove("hidden");
							var dep_obj = gallery_obj.parallax_settings[dep_id];
							if (dep_obj && dep_obj.show_function)
								dep_obj.show_function();
						}
					});
				}
			}
			this._onScrollUpdate();
		});
		
		// Track interval for cleanup
		if (!this._intervals) this._intervals = [];
		this._intervals.push(dependency_interval);
		
		// Use regular scroll event instead of requestAnimationFrame
		this._onScrollUpdate = () => {
			this.updateParallaxScrollValues();
			this.updateContentPanelContainer();
		};
		
		window.addEventListener("scroll", this._onScrollUpdate);
		
		// Initial update to set positions based on current scroll
		this.updateParallaxScrollValues();
		this.updateContentPanelContainer();
		
		this.initGallery();
	}
	
	initParallaxElement (arg0_element_id) {
		var gallery_obj = this.gallery;
		if (!gallery_obj.parallax_settings[arg0_element_id])
			gallery_obj.parallax_settings[arg0_element_id] = {};
		var local_obj = gallery_obj.parallax_settings[arg0_element_id];
		local_obj.animation_queue = local_obj.animation_queue || [];
		local_obj.id = local_obj.id || arg0_element_id;
		
		local_obj.hide_function = () => {
			local_obj.animation_queue.push(local_obj.animation);
			local_obj.animation_queue = [
				...new Set(local_obj.animation_queue.reverse()),
			].reverse();
		};
		local_obj.show_function = () => {
			local_obj.animation_queue.push(`${local_obj.animation}-shown`);
			local_obj.animation_queue = [
				...new Set(local_obj.animation_queue.reverse()),
			].reverse();
		};
		
		var dependency_amount = this.getDescendants(local_obj.id).length;
		local_obj.logic = setInterval(() => {
			var all_children_finished = true;
			var descendants = this.getDescendants(local_obj.id);
			for (let i = 0; i < descendants.length; i++) {
				var d_obj = gallery_obj.parallax_settings[descendants[i]];
				if (d_obj && d_obj.animation_queue.length > 0)
					all_children_finished = false;
			}
			if (all_children_finished && local_obj.animation_queue.length > 0) {
				try {
					var el = this.element.querySelector(`#${local_obj.id}`);
					var anim = local_obj.animation_queue[0];
					el.setAttribute("animation", anim);
					setTimeout(() => {
						anim.includes("-shown")
							? el.classList.remove("hidden")
							: el.classList.add("hidden");
						local_obj.animation_queue.shift();
					}, 750);
				} catch (e) {}
			}
		}, 750 - dependency_amount);
		
		var local_el = this.element.querySelector(`#${local_obj.id}`);
		local_el.setAttribute("animation", local_el.id + "-shown");
		local_el.onclick = () => {
			this.toggleContentPanel(local_el.id);
			this.selectParallaxItem(local_el.id);
		};
		
		// --- MOUSE & TOUCH HOVER LOGIC ---
		let hover_timer = null;
		
		const startHover = (delay = 500) => {
			if (hover_timer) clearTimeout(hover_timer);
			hover_timer = setTimeout(() => {
				if (!gallery_obj.parallax_selected.includes(local_el.id)) {
					gallery_obj.parallax_selected = [local_el.id];
					this.updateHiddenElements();
				}
				hover_timer = null;
			}, delay);
		};
		
		const cancelHover = () => {
			if (hover_timer) {
				clearTimeout(hover_timer);
				hover_timer = null;
			}
		};
		
		// 1. Desktop Mouse Events
		local_el.addEventListener("mouseenter", () => startHover(500));
		local_el.addEventListener("mouseleave", cancelHover);
		
		// 2. Mobile Touch Events
		// On touch screens, start timer on touch, cancel if finger moves/scrolls or lifts early
		const isTouchDevice =
			"ontouchstart" in window || navigator.maxTouchPoints > 0;
		
		local_el.addEventListener(
			"touchstart",
			() => {
				// Use 0ms (instant unfold on tap) or 300ms (short hold) for mobile UX
				startHover(isTouchDevice ? 0 : 500);
			},
			{ passive: true },
		);
		
		local_el.addEventListener("touchend", cancelHover, { passive: true });
		local_el.addEventListener("touchcancel", cancelHover, { passive: true });
		local_el.addEventListener("touchmove", cancelHover, { passive: true });
		
		// Add buttons inside base nodes
		if (local_obj.animation && !local_obj.is_base_node) {
			local_el.innerHTML += `
      <div class = "parallax-icon pin ${gallery_obj.parallax_pinned_items.includes(local_el.id) ? "pin-filled" : "pin-empty"}"></div>
      <div id = "bookmark-btn-${local_el.id}" class = "parallax-icon bookmark bookmark-empty"></div>
    `;
			local_el.querySelector(".pin").onclick = (e) => {
				e.stopPropagation();
				this.pinItem(local_el.id);
			};
			local_el.querySelector(".bookmark").onclick = (e) => {
				e.stopPropagation();
				this.bookmarkInteraction(local_el.id);
			};
		}
	}
	
	isMagnifierMaximised (arg0_element_id) {
		return (this.element.querySelectorAll(`.${arg0_element_id}-panel.maximised .image-magnifier-glass`).length !== 0);
	}
	
	magnify (arg0_element, arg1_zoom) {
		let local_el = arg0_element;
		let zoom = arg1_zoom;
		
		let element_id = local_el.id;
		if (!element_id) {
			console.warn(local_el, `requires an id attribute to be set!`);
			return;
		}
		
		this.zoom_states[element_id] = zoom;
		try {
			let local_magnifier = document.createElement("DIV");
			local_magnifier.setAttribute("class", "image-magnifier-glass");
			local_magnifier.style.backgroundImage = `url('${local_el.src}')`;
			local_magnifier.style.backgroundRepeat = "no-repeat";
			local_el.parentElement.insertBefore(local_magnifier, local_el);
			local_el.addEventListener("mousemove", (e) =>
				this.moveMagnifier(e, local_el, local_magnifier),
			);
			local_el.addEventListener("touchmove", (e) =>
				this.moveMagnifier(e, local_el, local_magnifier),
			);
			local_el.addEventListener("wheel", (e) => {
				let current_zoom = this.zoom_states[element_id];
				current_zoom += e.deltaY * -0.0025;
				current_zoom = Math.min(Math.max(1.25, current_zoom), 10);
				this.zoom_states[element_id] = current_zoom;
				e.preventDefault();
				e.stopPropagation();
			});
			setInterval(() => {
				let is_hovered =
					this.element.querySelector(`#${element_id}:hover`) !== null;
				let active_preview = !local_el.parentElement.classList.contains("cursor-shown");
				local_magnifier.style.opacity = (is_hovered && active_preview) ? 1 : 0;
			}, 100);
		} catch (e) {
			console.error(e);
		}
	}
	
	maximiseContentPanel (arg0_element_id) {
		var panel = this.element.querySelector(
			`#${arg0_element_id}-content-panel`,
		);
		if (!panel) return;
		
		// 1. Capture current visual position
		var rect = panel.getBoundingClientRect();
		
		// 2. Freeze the panel in place
		panel.style.transition = "none";
		panel.style.position = "fixed";
		panel.style.top = `${rect.top}px`;
		panel.style.left = `${rect.left}px`;
		panel.style.width = `${rect.width}px`;
		panel.style.height = `${rect.height}px`;
		panel.style.margin = "0";
		
		// 3. Stop the container from moving
		this.gallery.content_panel_update_paused = true;
		//this.gallery.content_panel_container.style.transform = "none";
		//this.gallery.content_panel_scroll_container.style.transform =
		"none";
		
		// 4. Trigger transition to maximised state
		requestAnimationFrame(() => {
			panel.style.transition = "";
			panel.classList.add("maximised");
			
			// Restore original inline style underneath — the .maximised
			// class handles positioning from here
			setTimeout(() => {
				this.restorePanelStyle(panel);
			}, 50);
		});
		
		this.gallery.parallax_scroll_indicator.style.opacity = 0;
	}
	
	minimiseContentPanel (arg0_element_id, arg1_instant) {
		var panel = this.element.querySelector(
			`#${arg0_element_id}-content-panel`,
		);
		if (!panel) return;
		
		// If the panel isn't actually maximised, just restore and bail
		if (!panel.classList.contains("maximised")) {
			this.restorePanelStyle(panel);
			return;
		}
		
		if (arg1_instant) {
			panel.classList.remove("maximised");
			this.gallery.content_panel_update_paused = false;
			this.restorePanelStyle(panel);
			return;
		}
		
		// 1. Capture maximised position
		var max_rect = panel.getBoundingClientRect();
		
		// 2. Remove .maximised and restore original positioning
		panel.classList.remove("maximised");
		this.restorePanelStyle(panel);
		
		// 3. Resume parallax so scroll container is correct
		this.gallery.content_panel_update_paused = false;
		this.updateContentPanelContainer();
		
		// 4. Measure the natural target position
		var nat_rect = panel.getBoundingClientRect();
		
		// 5. Offset panel back to maximised position via transform
		var dx = max_rect.left - nat_rect.left;
		var dy = max_rect.top - nat_rect.top;
		
		panel.style.transition = "none";
		panel.style.transform = `translate(${dx}px, ${dy}px)`;
		panel.style.width = `${max_rect.width}px`;
		panel.style.height = `${max_rect.height}px`;
		
		// 6. Animate transform away
		requestAnimationFrame(() => {
			panel.style.transition = "";
			
			setTimeout(() => {
				panel.style.transform = "";
				panel.style.width = "";
				panel.style.height = "";
			}, 50);
			
			// 7. Final cleanup — restore clean original style
			setTimeout(() => {
				this.restorePanelStyle(panel);
				this.gallery.parallax_scroll_indicator.style.opacity = 1;
			}, 550);
		});
	}
	
	moveMagnifier (e, arg0_element, arg1_magnifier) {
		var local_el = arg0_element;
		var magnifier = arg1_magnifier;
		var element_id = local_el.id;
		var local_bounds = local_el.getBoundingClientRect();
		var position = this.getCursorPosition(e, local_el);
		var zoom = this.zoom_states[element_id];
		var h = magnifier.offsetHeight;
		var w = magnifier.offsetWidth;
		var offset_x, offset_y;
		
		if (this.isMagnifierMaximised(element_id)) {
			var container = local_el.parentElement;
			var container_bounds = container.getBoundingClientRect();
			offset_x = position.x - w / 2 + container_bounds.left;
			offset_y = position.y - h / 2 + container_bounds.top;
		} else {
			// Account for the image's position relative to
			// the magnifier's actual offset parent
			var offset_parent = magnifier.offsetParent;
			if (offset_parent) {
				var parent_bounds = offset_parent.getBoundingClientRect();
				offset_x =
					position.x - w / 2 + local_bounds.left - parent_bounds.left;
				offset_y =
					position.y - h / 2 + local_bounds.top - parent_bounds.top;
			} else {
				offset_x = position.x - w / 2;
				offset_y = position.y - h / 2;
			}
		}
		
		magnifier.style.left = `${offset_x}px`;
		magnifier.style.top = `${offset_y}px`;
		var bg_x =
			(position.x / local_bounds.width) * (local_el.width * zoom - w);
		var bg_y =
			(position.y / local_bounds.height) * (local_el.height * zoom - h);
		magnifier.style.backgroundPosition = `-${bg_x}px -${bg_y}px`;
		magnifier.style.backgroundSize = `${local_el.width * zoom}px ${local_el.height * zoom}px`;
	}
	
	onParallaxHover (e) {
		var gallery_obj = this.gallery;
		var target = e.target.closest(".parallax-item");
		
		// Reset hover-time on every tile that isn't the current target
		var all_tiles = this.element.querySelectorAll(".parallax-item");
		for (let i = 0; i < all_tiles.length; i++) {
			if (!target || all_tiles[i].id !== target.id) {
				all_tiles[i].setAttribute("hover-time", 0);
			}
		}
		
		if (!target) return;
		
		var hover_time =
			parseInt(target.getAttribute("hover-time") || 0) + 16;
		target.setAttribute("hover-time", hover_time);
		
		if (
			hover_time >= 500 &&
			!gallery_obj.parallax_selected.includes(target.id)
		) {
			gallery_obj.parallax_selected = [target.id];
			this.updateHiddenElements();
		}
	}
	
	pinItem (arg0_element_id) {
		var gallery_obj = this.gallery;
		var local_element = this.element.querySelector(`#${arg0_element_id}`);
		try {
			var pin_btn = local_element.querySelector(".pin");
			gallery_obj.parallax_pinned_items.includes(arg0_element_id)
				? (gallery_obj.parallax_pinned_items = gallery_obj.parallax_pinned_items.filter(
					(i) => i !== arg0_element_id,
				))
				: gallery_obj.parallax_pinned_items.push(arg0_element_id);
			pin_btn.setAttribute(
				"class",
				gallery_obj.parallax_pinned_items.includes(arg0_element_id)
					? pin_btn.getAttribute("class").replace("pin-empty", "pin-filled")
					: pin_btn.getAttribute("class").replace("pin-filled", "pin-empty"),
			);
		} catch (e) {}
	}
	
	removeBookmarkItem (arg0_element_id) {
		var gallery_obj = this.gallery;
		var bookmark_btn = this.element.querySelector(`#bookmark-btn-${arg0_element_id}`);
		var local_index = gallery_obj.bookmark_items.indexOf(arg0_element_id);
		if (bookmark_btn) bookmark_btn.setAttribute("class", bookmark_btn.getAttribute("class").replace("bookmark-filled", "bookmark-empty"));
		gallery_obj.bookmark_items = gallery_obj.bookmark_items.filter((i) => i !== arg0_element_id);
		gallery_obj.closing_bookmark = true;
		setTimeout(() => (gallery_obj.closing_bookmark = false), 100);
		var preview_el = this.element.querySelector(`#preview-${arg0_element_id}`);
		if (preview_el) preview_el.remove();
		this.element.querySelector(`#btn-bookmark-preview-${arg0_element_id}`)?.remove();
		if (gallery_obj.bookmark_items.length == 0) {
			gallery_obj.no_bookmark_label.classList.remove("hidden");
			gallery_obj.bookmark_container.classList.add("no-bookmarks");
		}
	}
	
	selectBookmarkItem (arg0_element_id, arg1_automatic_selection, arg2_no_scroll) {
		var actual_id = arg0_element_id.replace("preview-", "");
		var gallery_obj = this.gallery;
		var parallax_element = this.element.querySelector(`#${actual_id}`);
		var local_index = gallery_obj.bookmark_items.indexOf(actual_id);
		
		if (!gallery_obj.closing_bookmark || arg1_automatic_selection) {
			this.clearBookmarkDots();
			var local_el = this.element.querySelector(
				`#btn-bookmark-${arg0_element_id}`,
			);
			if (local_el) local_el.classList.add("filled");
			gallery_obj.bookmark_selected = arg0_element_id;
			gallery_obj.bookmark_preview_container.style.left = `${local_index * -12}vh`;
			var all_bookmarks = this.element.querySelectorAll(
				".parallax-item-preview",
			);
			for (let i = 0; i < all_bookmarks.length; i++) {
				all_bookmarks[i].setAttribute(
					"style",
					`left: calc(50% - 12vh - ${i * 12}vh); z-index: ${i < local_index ? i : all_bookmarks.length - i};`,
				);
				all_bookmarks[i].classList.remove("selected");
			}
			var local_bookmark = this.element.querySelector(
				`#${arg0_element_id}`,
			);
			if (local_bookmark) {
				local_bookmark.style.zIndex = 99;
				local_bookmark.classList.add("selected");
			}
			
			if (!arg2_no_scroll && parallax_element) {
				// Instead of setting parallax_scroll_x directly,
				// compute the required vertical scroll position and
				// scroll the window so updateParallaxScrollValues
				// naturally arrives at the correct X offset.
				var track = document.getElementById("gallery-section");
				if (track) {
					var track_rect = track.getBoundingClientRect();
					var scrollable_dist = track_rect.height - window.innerHeight;
					var vh = window.innerHeight / 100;
					var pan_x =
						parseInt(getComputedStyle(parallax_element).left) / vh;
					var desired_scroll_x =
						pan_x * -1 +
						(window.innerWidth / 100) * 50 / vh -
						parseInt(getComputedStyle(parallax_element).width) / vh / 2;
					// Reverse the formula: parallax_scroll_x = progress * gallery_width * -1
					// So progress = parallax_scroll_x / (gallery_width * -1)
					var progress = desired_scroll_x / (gallery_obj.gallery_width * -1);
					progress = Math.max(0, Math.min(1, progress));
					var target_scroll_top =
						track_rect.top + window.pageYOffset + progress * scrollable_dist;
					
					window.scrollTo({
						top: target_scroll_top,
						behavior: "smooth",
					});
				}
			}
			
			if (parallax_element) {
				parallax_element.setAttribute(
					"animation",
					actual_id + "-shown",
				);
				parallax_element.classList.remove("hidden");
			}
		}
	}
	
	selectParallaxItem (arg0_element_id) {
		var gallery_obj = this.gallery;
		
		if (gallery_obj.parallax_selected.includes(arg0_element_id)) {
			// Clicking the already-selected tile deselects everything
			gallery_obj.parallax_selected = [];
		} else {
			// Replace selection entirely
			gallery_obj.parallax_selected = [arg0_element_id];
		}
		
		this.updateHiddenElements();
	}
	
	showBookmarkUI () {
		this.gallery.bookmark_minimise_btn.classList.remove("minimised");
		this.gallery.bookmark_container.classList.remove("minimised");
	}
	
	toggleContentPanel (arg0_element_id) {
		var local_el = this.element.querySelector(`#${arg0_element_id}-content-panel`);
		if (!local_el) return;
		var is_shown = local_el.classList.contains("shown");
		this.hideAllContentPanels();
		if (!is_shown) local_el.classList.add("shown");
	}
	
	togglePreview (arg0_element_id) {
		let element_id = arg0_element_id;
		let img_els = this.element.querySelectorAll(`[id="${arg0_element_id}-content-wrapper"] .preview-image-container`);
		let local_el = this.element.querySelector(`#${element_id}-preview-btn`);
		let key = element_id.replace(/-/gm, "_");
		
		if (local_el.classList.contains("active")) {
			local_el.classList.remove("active");
			
			for (let i = 0; i < img_els.length; i++)
				img_els[i].classList.add("cursor-shown");
			
			this.active_previews[key] = false;
		} else {
			local_el.classList.add("active");
			
			for (let i = 0; i < img_els.length; i++)
				img_els[i].classList.remove("cursor-shown");
			this.active_previews[key] = true;
		}
	}
	
	updateContentPanelContainer () {
		var gallery_obj = this.gallery;
		if (!gallery_obj.content_panel_update_paused) {
			// Find the main parallax layer to extract its current dynamic Y offset
			let main_layer = this.element.querySelector(".layer.main");
			let translate_x = 0;
			let translate_y = 0;
			
			if (main_layer) {
				// Extract the current translateY/translate3d value applied by the parallax engine
				let style = window.getComputedStyle(main_layer);
				let matrix = new WebKitCSSMatrix(style.transform);
				translate_x = matrix.m41; //m41 represents the X translation in the matrix
				translate_y = matrix.m42; // m42 represents the Y translation in the matrix
			}
			
			//gallery_obj.content_panel_container.style.transform = "none";
			
			// Sync the content panel scroll wrapper with:
			// 1. Horizontal Scroll (gallery_obj.parallax_scroll_x in vh)
			// 2. Vertical Parallax displacement (translate_y in pixels)
			gallery_obj.content_panel_scroll_container.style.transform =
				`translateX(calc(${gallery_obj.parallax_scroll_x}vh + ${translate_x}px)) translateY(${translate_y}px)`;
		}
	}
	
	updateHiddenElements () {
		var gallery_obj = this.gallery;
		var all_dom = this.element.querySelectorAll(".parallax-item");
		var visible = [];
		
		// Selected items and their direct dependencies
		gallery_obj.parallax_selected.forEach((id) => {
			visible.push(id);
			gallery_obj.parallax_settings[id]?.dependencies?.forEach((d) =>
				visible.push(d),
			);
		});
		
		// Root nodes (no parent) always visible
		Object.keys(gallery_obj.parallax_settings).forEach((k) => {
			if (this.getParent(k).length == 0) visible.push(k);
		});
		
		// Pinned items always visible
		gallery_obj.parallax_pinned_items.forEach((id) => visible.push(id));
		
		visible = [...new Set(visible)];
		
		all_dom.forEach((el) => {
			var is_exempt = gallery_obj.exempt_id_patterns.some((p) =>
				el.id.startsWith(p),
			);
			if (is_exempt) return;
			
			if (visible.includes(el.id)) {
				// Should be visible — show if currently hidden
				if (el.classList.contains("hidden")) {
					var obj = gallery_obj.parallax_settings[el.id];
					if (obj && obj.show_function) obj.show_function();
				}
			} else {
				// Should be hidden — retract if currently visible
				if (!el.classList.contains("hidden")) {
					var obj = gallery_obj.parallax_settings[el.id];
					if (obj && obj.hide_function) obj.hide_function();
				}
			}
		});
	}
	
	restorePanelStyle (arg0_panel) {
		if (
			arg0_panel &&
			arg0_panel.dataset.originalStyle !== undefined
		) {
			arg0_panel.setAttribute(
				"style",
				arg0_panel.dataset.originalStyle,
			);
		}
	}
	
	saveOriginalPanelStyles () {
		var panels = this.element.querySelectorAll(
			".parallax-item-content-panel",
		);
		for (let i = 0; i < panels.length; i++) {
			if (!panels[i].dataset.originalStyle) {
				panels[i].dataset.originalStyle =
					panels[i].getAttribute("style") || "";
			}
		}
	}
	
	updateParallaxScrollValues () {
		var gallery_obj = this.gallery;
		var track = document.getElementById("gallery-section");
		if (!track) return;
		var rect = track.getBoundingClientRect();
		var scrollable_dist = rect.height - window.innerHeight;
		var vertical_offset =
			rect.top <= 0 ? Math.min(Math.abs(rect.top), scrollable_dist) : 0;
		var siblings = gallery_obj.parallax_body.children;
		for (let i = 0; i < siblings.length; i++) {
			let child = siblings[i];
			
			let translate_px = vertical_offset;
			
			if (child.id === "bookmark-container") {
				translate_px = vertical_offset - window.innerHeight / 2;
			} else {
				
			}
			child.style.transform = `translateY(${translate_px}px)`;
		}
		if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
			var progress = Math.abs(rect.top) / scrollable_dist;
			gallery_obj.parallax_scroll_x = progress * gallery_obj.gallery_width * -1;
			
			// Apply both X and Y to the underlay
			gallery_obj.parallax_container.style.transform = `translateX(${gallery_obj.parallax_scroll_x}vh)`;
			
			if (gallery_obj.parallax_scroll_indicator)
				gallery_obj.parallax_scroll_indicator.style.width = `${progress * 100}vw`;
		}
	}
};

function initHomepageGallery() {
	let loop = setInterval(() => {
		try {
			if (window.WebComponent) {
				window.viewport_two = new window.HomepageGallery();
				window.viewport_two.bind(document.getElementById("gallery-section"));
				clearInterval(loop);
			}
		} catch (e) {}
	}, 100);
}
initHomepageGallery();