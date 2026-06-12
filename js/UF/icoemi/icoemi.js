if (!window.ic) window.ic = {};

//Initialise functions
{
	/**
	 * Animates a given set of elements relative to a scope.
	 * 
	 * @param {HTMLElement|string} arg0_scope_element
	 * @param {HTMLElement[]|string[]} arg1_elements
	 * @param {Object} [arg2_options]
	 *  @param {string} [arg2_options.direction="top"] - Either 'bottom'/'left'/'top'/'right'.
	 *  @param {boolean} [arg2_options.disable_fade=false] - Whether to disable fade.
	 *  @param {number} [arg2_options.distance] - The px distance that elements should travel during transition.
	 */
	ic.animate = function (arg0_scope_element, arg1_elements, arg2_options) {
		//Convert from parameters
		let scope_el = ic.getElement(arg0_scope_element);
		let elements = ic.getElements(arg1_elements);
		let options = (arg2_options) ? arg2_options : {};
		
		//Hoist settings to avoid re-calculating during scroll
		let direction = (options.direction) ? options.direction : "top";
		let distance = (options.distance) ? parseFloat(options.distance) : 100;
		let disable_fade = options.disable_fade;
		
		//Declare local instance variables
		let ticking = false;
		let updatePositions = () => {
			let rect = scope_el.getBoundingClientRect();
			let viewport_height = window.innerHeight;
			
			//Calculate progress percentage
			let current = rect.top;
			let end = 0;
			let start = viewport_height;
			
			//Progress is a value from 0 to 1
			let progress = (start - current)/(start - end);
			progress = Math.max(0, Math.min(1, progress));
			
			//Calculate the remaining offset once per frame
			let offset = distance*(1 - progress);
			
			elements.forEach((item) => {
				let transform = "";
				
				switch (direction) {
					case "bottom":
						transform = `translateY(${offset}px)`;
						break;
					case "left":
						transform = `translateX(${-offset}px)`;
						break;
					case "top":
						transform = `translateY(${-offset}px)`;
						break;
					case "right":
						transform = `translateX(${offset}px)`;
						break;
				}
				
				item.style.transform = transform;
				if (!disable_fade)
					item.style.opacity = progress;
			});
			
			ticking = false;
		};
		
		let scrollHandler = () => {
			if (!ticking) {
				window.requestAnimationFrame(updatePositions);
				ticking = true;
			}
		};
		
		//Promote elements to a new compositor layer for GPU acceleration
		elements.forEach((item) => {
			item.style.willChange = "transform, opacity";
		});
		
		let observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					window.addEventListener("scroll", scrollHandler, { passive: true });
					updatePositions();
				} else {
					window.removeEventListener("scroll", scrollHandler);
				}
			},
			{ threshold: 0 });
		
		observer.observe(scope_el);
	};
	
	ic.executeComponentScripts = function (arg0_element) {
		//Convert from parameters
		let element = ic.getElement(arg0_element);
		
		//Declare local instance variables
		let all_scripts = element.querySelectorAll("script");
		let context_id = `ic-${Math.random().toString(36).substring(2, 9)}`;
			element.setAttribute("eval-context", context_id);
		
		for (let i = 0; i < all_scripts.length; i++) {
			let old_script = all_scripts[i];
			let new_script = document.createElement("script");
			
			//Copy all attributes from old script to new script
			Array.from(old_script.attributes).forEach((local_attribute) => 
				new_script.setAttribute(local_attribute.name, local_attribute.value));
			
			//Evaluate script
			if (!old_script.src) 
				new_script.textContent = `(function() { let element = document.querySelector('[eval-context="${context_id}"]'); ${old_script.innerHTML} })();`;
			if (old_script.parentNode)
				old_script.parentNode.replaceChild(new_script, old_script);
		}
	}
	
	ic.getElement = function (arg0_element) {
		//Convert from parameters
		let element = (typeof arg0_element !== "string") ?
			arg0_element : document.querySelector(arg0_element);
		
		//Return statement
		return element;
	};
	
	ic.getElements = function (arg0_selector) {
		// Return early if input is null or undefined
		if (!arg0_selector) return [];
		
		let selector = arg0_selector;
		
		// Convert single string or single element into an iterable array
		if (
			!Array.isArray(selector) &&
			!(selector instanceof NodeList) &&
			!(selector instanceof HTMLCollection)
		) {
			selector = [selector];
		}
		
		let all_elements = [];
		
		// Iterate over all elements in the normalized selector array/list
		for (let i = 0; i < selector.length; i++) {
			const item = selector[i];
			
			if (typeof item === "string") {
				// Use spread operator to turn the NodeList into individual array elements
				all_elements.push(...document.querySelectorAll(item));
			} else if (item instanceof HTMLElement || item instanceof Node) {
				// Only push if it's an actual DOM node/element
				all_elements.push(item);
			} else if (item instanceof NodeList || item instanceof HTMLCollection) {
				// Handle cases where a NodeList might be nested inside the input array
				all_elements.push(...item);
			}
		}
		
		return all_elements;
	};
	
	ic.isElementScrollable = function (arg0_element) {
		//Convert from parameters
		let element = ic.getElement(arg0_element);
		
		//Internal guard clause if element is not valid
		if (!element || element === document.body || element === document.documentElement)
			return false;
		
		//Declare local instance variables
		let style = window.getComputedStyle(element);
		
		let can_scroll = (element.scrollHeight - element.clientHeight > 1);
		let overflow_y = style.getPropertyValue("overflow-y");
		let is_scrollable_type = (overflow_y === "auto" || overflow_y === "scroll");
		
		//Return statement
		return (is_scrollable_type && can_scroll);
	};
	
	ic.loadComponent = async function (arg0_element, arg1_url, arg2_options) {
		//Convert from parameters
		let element = ic.getElement(arg0_element);
		let url = arg1_url;
		let options = (arg2_options) ? arg2_options : {};
		
		//Declare local instance variables
		try {
			let response = await fetch(url);
			if (!response.ok) {
				console.error(`HTTP Error, status: ${response.status}`);
			} else {
				element.innerHTML = await response.text();
				
				if (!options.no_metadata)
					element.setAttribute("html-initialised", "true");
				if (!options.no_js)
					ic.executeComponentScripts(element);
				if (element.querySelector("ic-component[src]")) //Recursively load components
					await ic.updateDOM();
			}
		} catch (e) {
			console.error(e);
			element.innerHTML = "Error loading content.";
		}
	};
	
	ic.updateDOM = async function () {
		//Declare local instance variables
		let all_ic_components = document.querySelectorAll(`ic-component:not([html-initialised="true"])`);
		
		//Iterate over all_ic_components and fetch them
		let load_promises = Array.from(all_ic_components).map((el) => {
			let data_src = el.getAttribute("src");
			if (data_src) 
				return ic.loadComponent(el, data_src);
			return Promise.resolve(); //Skip if no src
		});
		await Promise.all(load_promises);
	}
}

//Initialisation script
{
	/**
	 * Initialises Icoemi.
	 * 
	 * @param {Object} [arg0_options]
	 *  @param {boolean} [arg0_options.smooth_scroll=false]
	 */
	ic.initialise = function (arg0_options) {
		let options = arg0_options ? arg0_options : {};
		
		if (options.smooth_scroll) {
			ic._smooth_scroll = {
				last_touch_y: 0,
				lerp_amount: 0.1,
				is_animating: false,
				scroll_current: window.scrollY,
				scroll_target: window.scrollY,
				update_functions: [],
				
				// Method to allow components to add their own scroll logic
				addUpdateListener: function (fn) {
					if (typeof fn === "function") this.update_functions.push(fn);
				},
			};
			
			let scroll_obj = ic._smooth_scroll;
			
			let animate = () => {
				let diff = scroll_obj.scroll_target - scroll_obj.scroll_current;
				scroll_obj.scroll_current += diff * scroll_obj.lerp_amount;
				
				window.scrollTo({
					top: scroll_obj.scroll_current,
					behavior: "instant",
				});
				
				// Execute all registered component updates (like Parallax)
				for (let i = 0; i < scroll_obj.update_functions.length; i++) {
					scroll_obj.update_functions[i](scroll_obj.scroll_current);
				}
				
				if (Math.abs(diff) > 0.1) {
					requestAnimationFrame(animate);
				} else {
					scroll_obj.scroll_current = scroll_obj.scroll_target;
					scroll_obj.is_animating = false;
				}
			};
			
			let shouldIgnoreEvent = (target, delta_y) => {
				let curr = target;
				while (curr && curr !== document.body) {
					if (ic.isElementScrollable(curr)) {
						if (delta_y === undefined) return true;
						
						// If scrolling up & nested viewport can scroll up
						if (delta_y < 0 && curr.scrollTop > 1) return true;
						
						// If scrolling down & nested viewport can scroll down
						if (delta_y > 0 && curr.scrollHeight - curr.scrollTop - curr.clientHeight > 1) return true;
					}
					curr = curr.parentElement;
				}
				return false;
			};
			
			let updateTarget = (delta) => {
				scroll_obj.scroll_target += delta;
				let max_scroll =
					document.documentElement.scrollHeight - window.innerHeight;
				scroll_obj.scroll_target = Math.max(
					0,
					Math.min(scroll_obj.scroll_target, max_scroll),
				);
				
				if (!scroll_obj.is_animating) {
					scroll_obj.is_animating = true;
					requestAnimationFrame(animate);
				}
			};
			
			window.addEventListener(
				"wheel",
				(e) => {
					if (shouldIgnoreEvent(e.target, e.deltaY)) {
						console.trace("ic.shouldIgnoreEvent");
						return;
					}
					e.preventDefault();
					updateTarget(e.deltaY);
				},
				{ passive: false },
			);
			
			window.addEventListener(
				"touchstart",
				(e) => {
					if (shouldIgnoreEvent(e.target)) return;
					scroll_obj.last_touch_y = e.touches[0].pageY;
				},
				{ passive: true },
			);
			
			window.addEventListener(
				"touchmove",
				(e) => {
					let current_y = e.touches[0].pageY;
					let movement = scroll_obj.last_touch_y - current_y;
					if (shouldIgnoreEvent(e.target, movement)) {
						scroll_obj.last_touch_y = current_y;
						return;
					}
					e.preventDefault();
					updateTarget(movement * 2);
					scroll_obj.last_touch_y = current_y;
				},
				{ passive: false },
			);
		}
		
		ic.logic_loop = setInterval(() => {
			ic.updateDOM();
		}, 100);
	};
}

ic.initialise({ 
	smooth_scroll: true 
});