let ve = {};

ve.PageMenu = class {
	constructor(arg0_page_obj, arg1_options) {
		//Convert from parameters
		let page_obj = arg0_page_obj;
		let options = (arg1_options) ? arg1_options : {};
		
		//Initialise options
		options.attributes = (options.attributes) ? options.attributes : {};
		options.do_not_wrap = (options.do_not_wrap) ? options.do_not_wrap : false;
		options.starting_page = (options.starting_page) ? options.starting_page : Object.keys(page_obj)[0];
		
		//Declare local instance variables
		this.element = document.createElement("div");
		this.element.setAttribute("component", "ve-page-menu");
		Object.keys(options.attributes).forEach((local_key) => {
			this.element.setAttribute(local_key, options.attributes[local_key].toString());
		});
		this.element.instance = this;
		
		this.interfaces_obj = {};
		this.options = options;
		this.navbar_el = document.createElement("nav");
		this.navbar_el.classList.add("navbar");
		
		//1. Navbar handling
		{
			Object.keys(page_obj).forEach((local_key) => {
				let local_value = page_obj[local_key];
				let local_name = (local_value.name) ? local_value.name : local_key;
				let local_name_el = document.createElement("div");
				
				local_name_el.classList.add("tab");
				if (local_key === options.starting_page)
					local_name_el.classList.add("active");
				local_name_el.id = local_key;
				local_name_el.innerHTML = local_name;
				
				this.navbar_el.appendChild(local_name_el);
				
				//A page's content is any HTMLElement (or HTML string)
				let page_el = document.createElement("div");
				page_el.classList.add("page");
				if (local_value.element instanceof HTMLElement) {
					page_el.appendChild(local_value.element);
				} else if (typeof local_value.html === "string") {
					page_el.innerHTML = local_value.html;
				}
				this.interfaces_obj[local_key] = page_el;
			});
			this.underline_el = document.createElement("span");
			this.underline_el.classList.add("underline");
			this.navbar_el.appendChild(this.underline_el);
			
			this.interface_el = document.createElement("div");
			this.interface_el.id = "component-body";
			
			//Append all pages once; visibility is toggled via display
			Object.keys(this.interfaces_obj).forEach((local_key) => {
				this.interfaces_obj[local_key].style.display = "none";
				this.interface_el.appendChild(this.interfaces_obj[local_key]);
			});
			
			this.element.append(this.navbar_el, this.interface_el);
			
			let all_tabs = this.navbar_el.querySelectorAll(".tab");
			
			all_tabs.forEach((local_tab) => {
				local_tab.addEventListener("click", () => {
					this.v = local_tab.id;
					if (typeof this.onchange === "function") this.onchange(this.v);
				});
			});
		}
		
		//2. Body handling; display starting interface
		{
			let initialise_underline_loop = setInterval(() => {
				if (!document.contains(this.element)) return;
				this.updateUnderline();
				clearInterval(initialise_underline_loop);
			});
			this.v = options.starting_page;
		}
	}
	
	get v() {
		let active_tab = this.navbar_el.querySelector(".tab.active");
		return (active_tab) ? active_tab.id : undefined;
	}
	
	set v(arg0_page_key) {
		let page_key = arg0_page_key;
		
		let active_tab_el = this.navbar_el.querySelector(`.tab[id="${page_key}"]`);
		let all_tabs = this.navbar_el.querySelectorAll(".tab");
		
		all_tabs.forEach((local_tab) => local_tab.classList.remove("active"));
		if (active_tab_el) {
			active_tab_el.classList.add("active");
		} else {
			console.error(`active_tab_el could not be found for ${page_key}.`);
			return;
		}
		
		//Switch interface to selected page by toggling visibility
		Object.keys(this.interfaces_obj).forEach((local_key) => {
			this.interfaces_obj[local_key].style.display = (local_key === page_key) ? "" : "none";
		});
		setTimeout(() => {
			this.updateUnderline();
		}, 100);
	}
	
	updateUnderline() {
		let active_tab = this.navbar_el.querySelector(".tab.active");
		if (!active_tab) return;
		let underline_computed_style = window.getComputedStyle(this.underline_el);
		
		let offset_left = active_tab.offsetLeft;
		let tab_width = active_tab.offsetWidth;
		let underline_y = active_tab.offsetTop + active_tab.offsetHeight - parseFloat(underline_computed_style.height);
		
		//Snap vertically, animate horizontally
		this.underline_el.style.transition = "none";
		this.underline_el.style.top = `${underline_y}px`;
		
		requestAnimationFrame(() => {
			this.underline_el.style.left = `${offset_left}px`;
			this.underline_el.style.transition = "left 0.5s ease, width 0.5s ease";
			this.underline_el.style.width = `${tab_width}px`;
		});
	}
};