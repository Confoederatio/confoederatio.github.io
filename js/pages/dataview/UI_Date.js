/**
 * UI Date component used for selecting historical dates over the long run.
 *
 * ##### Constructor:
 * - `arg0_value`: {year: number, month: number, day: number, hour: number, minute: number}
 * - `arg1_options`: {Object}
 *   - `.attributes`: {Object} - Any HTML attributes to apply to inputs.
 *   - `.disabled`: {boolean} - Whether the component is read-only.
 *   - `.name`: {string} - Optional label to display next to the input.
 *   - `.onuserchange`: {Function} - Callback function when the user changes a value.
 */
class UI_Date {
	constructor (arg0_value, arg1_options) {
		//Convert from parameters
		let value = (arg0_value) ? arg0_value : Date.getCurrentDate();
		let options = (arg1_options) ? arg1_options : {};
		
		//Initialise options
		options.attributes = (options.attributes) ? options.attributes : {};
		
		//Declare local instance variables
		let attributes = {
			...options.attributes
		};
		if (options.disabled) attributes.readonly = true;
		
		this.element = document.createElement("div");
		this.element.setAttribute("component", "ui-date");
		
		this.options = options;
		this.value = Date.convertTimestampToDate(value);
		
		//Format html_string
		let attributes_string = "";
		let html_string = [];
		
		for (let key in attributes)
			if (attributes[key] !== false && attributes[key] !== undefined)
				attributes_string += (attributes[key] === true) ? ` ${key}` : ` ${key} = "${attributes[key]}"`;
		
		html_string.push(`<span id = "name">${(options.name) ? options.name : ""}</span> `);
		html_string.push(`<input id = "day" class = "day-input" placeholder = "DD" size = "4"${attributes_string}>`);
		html_string.push(`<input id = "month" class = "month-input" list = "months" placeholder = "Month"${attributes_string}>`);
		html_string.push(`<datalist id = "months">`);
		Date.all_months.forEach((local_key) => {
			let local_value = Date.months[local_key];
			html_string.push(`<option value = "${local_value.name}">${local_value.month + 1}</option>`);
		});
		html_string.push(`</datalist>`);
		html_string.push(`<input id = "year" class = "year-input" placeholder = "YYYY"${attributes_string}>`);
		html_string.push(`<span id = "year-type" style = "cursor: pointer; user-select: none; font-weight: bold;">AD</span>`);
		
		html_string.push(`<input id = "hour" value = "00" placeholder = "HH" size = "2"${attributes_string}>:`);
		html_string.push(`<input id = "minute" value = "00" placeholder = "MM" size = "2"${attributes_string}>`);
		
		this.element.innerHTML = html_string.join("");
		
		//Handle inputs
		this.handleEvents();
		if (value) this.v = value;
	}
	
	get v () {
		//Return statement
		return Date.convertTimestampToDate(this.value);
	}
	
	set v (arg0_value) {
		//Convert from parameters
		let value = (arg0_value) ? Date.convertTimestampToDate(arg0_value) : Date.getCurrentDate();
		
		//Declare local instance variables
		let year_type_el = this.element.querySelector(`#year-type`);
		
		//Set internal value
		this.value = value;
		
		//Set era label based on value sign
		if (this.value.year < 0) {
			year_type_el.innerHTML = "BC";
		} else {
			year_type_el.innerHTML = "AD";
		}
		
		//Update UI inputs
		this.element.querySelector("#year").value = Math.abs(this.value.year);
		this.element.querySelector("#month").value = Date.months[Date.all_months[this.value.month - 1]].name;
		this.element.querySelector("#day").value = this.value.day;
		
		this.element.querySelector(`#hour`).value = this.value.hour.toString().padStart(2, "0");
		this.element.querySelector(`#minute`).value = this.value.minute.toString().padStart(2, "0");
	}
	
	/**
	 * Helper function to trigger user callbacks
	 */
	triggerUserChange () {
		if (typeof this.options.onuserchange === "function")
			this.options.onuserchange(this.v);
	}
	
	handleEvents () {
		this.element.querySelector(`#year-type`).addEventListener("click", () => {
			if (this.options.disabled) return;
			this.value.year *= -1;
			this.v = this.value;
			this.triggerUserChange();
		});
		
		this.element.querySelector(`#year`).addEventListener("change", (e) => {
			let raw_value = e.target.value.trim();
			let input_number = parseInt(raw_value);
			let year_type_el = this.element.querySelector(`#year-type`);
			
			if (!isNaN(input_number)) {
				if (raw_value.startsWith("-")) {
					this.value.year = -Math.abs(input_number);
				} else if (raw_value.startsWith("+")) {
					this.value.year = Math.abs(input_number);
				} else {
					//No prefix, respect current label state
					let is_bc = (year_type_el.innerHTML === "BC");
					this.value.year = (is_bc) ? -Math.abs(input_number) : Math.abs(input_number);
				}
				
				//Safeguard against Year 0
				if (this.value.year === 0)
					this.value.year = (year_type_el.innerHTML === "BC") ? -1 : 1;
				
				this.v = this.value;
				this.triggerUserChange();
			}
		});
		
		this.element.querySelector(`#month`).addEventListener("change", (e) => {
			this.value.month = Date.getMonth(e.target.value);
			this.v = this.value;
			this.triggerUserChange();
		});
		
		this.element.querySelector(`#day`).addEventListener("change", (e) => {
			let actual_value = parseInt(e.target.value);
			let month_data = Date.months[Date.all_months[this.value.month - 1]];
			
			if (!isNaN(actual_value)) {
				let days_in_month = month_data.days;
				if (Date.isLeapYear(this.value.year) && month_data.leap_year_days)
					days_in_month = month_data.leap_year_days;
				
				this.value.day = Math.max(1, Math.min(days_in_month, actual_value));
				this.v = this.value;
				this.triggerUserChange();
			}
		});
		
		this.element.querySelector(`#hour`).addEventListener("change", (e) => {
			let actual_value = parseInt(e.target.value);
			if (!isNaN(actual_value)) {
				this.value.hour = Math.max(0, Math.min(23, actual_value));
				this.v = this.value;
				this.triggerUserChange();
			}
		});
		
		this.element.querySelector(`#minute`).addEventListener("change", (e) => {
			let actual_value = parseInt(e.target.value);
			if (!isNaN(actual_value)) {
				this.value.minute = Math.max(0, Math.min(59, actual_value));
				this.v = this.value;
				this.triggerUserChange();
			}
		});
	}
}

//Functional binding
uiDate = function () {
	return new UI_Date(...arguments);
};