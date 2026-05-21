class Geometry {
	static instances = {};
}

class GeometryPolygon extends Geometry {
	constructor (arg0_key, arg1_value) {
		//Convert from parameters
		let key = arg0_key;
		let value = arg1_value;
			super();
		
		//Declare local instance variables
		Geometry.instances[key] = this;
		this.element = document.createElement("div");
		this.history = new History({}, {
			localisation_function: (new_keyframe, old_keyframe) => {
				//Declare local instance variables
				let return_string = [];
				
				try {
					//[0] .geometry change
					if (new_keyframe.value[0])
						return_string.push(`Geometry changed`);
					if (new_keyframe.value[0] === null)
						return_string.push(`Geometry removed`);
					
					//[1] .symbol change
					if (new_keyframe.value[1])
						return_string.push(`Symbol changed to: ${String.formatObject(new_keyframe.value[1])}`);
					
					//[2] .properties change
					if (new_keyframe.value[2]?.hidden === false)
						return_string.push(`Geometry visible`);
					if (new_keyframe.value[2]?.hidden === true)
						return_string.push(`Geometry hidden`);
					if (new_keyframe.value[2]?.label_geometries)
						if (new_keyframe.value[2].label_geometries.length > 0)
							return_string.push(`Set custom label geometries`);
					if (new_keyframe.value[2]?.label_name)
						return_string.push(`Label name changed to: ${new_keyframe.value[2].label_name}`);
					if (new_keyframe.value[2]?.label_symbol)
						return_string.push(`Label symbol changed to: ${String.formatObject(new_keyframe.value[2].label_symbol)}`);
					if (new_keyframe.value[2]?.max_zoom !== undefined)
						return_string.push(`Maximum zoom set to ${new_keyframe.value[2].max_zoom}`);
					if (new_keyframe.value[2]?.min_zoom !== undefined)
						return_string.push(`Minimum zoom set to ${new_keyframe.value[2].min_zoom}`);
					if (new_keyframe.value[2]?.name)
						return_string.push(`Name changed to ${new_keyframe.value[2].name}`);
					if (new_keyframe.value[2]?.variables)
						return_string.push(`Variables changed to: ${String.formatObject(new_keyframe.value[2].variables)}`);
				} catch (e) {
					try {
						JSON.stringify(old_keyframe);
						JSON.stringify(new_keyframe);
					} catch (e) {
						console.error(`Was a circular reference detected? If so, ensure that you are feeding in arg0_v, and not arg1_e for the property in question.`);
					}
					console.error(`new_keyframe:`, new_keyframe, `old_keyframe:`, old_keyframe, `Error:`, e);
				}
				
				//Return statement
				return String.formatArray(return_string);
			}
		});
		this.id = key;
		this.label_geometries = [];
	}
	
	draw () {
		if (this.geometry) this.geometry.remove();
		if (this.label_geometries)
			for (let i = this.label_geometries.length - 1; i >= 0; i--) {
				this.label_geometries[i].remove();
				this.label_geometries.splice(i, 1);
			}
		this.geometry = undefined;
		this.label_geometries = [];
		
		//1. Set this.value from current relative keyframe
		if (this.history._hasTimestampAfter(main.timestamp)) {
			this.value = this.history.getKeyframe({ date: main.timestamp }).value;
			if (this.value === undefined || this.value?.length === 0 || this._is_visible === false) return;
			
			//2. Check any cause for derendering
			if (this.value && this.value[0] === null) return;
			if (this.value && this.value[2]) {
				if (this.value[2].hidden) return;
				if (this.value[2]?.max_zoom && map.getZoom() > this.value[2]?.max_zoom) return;
				if (this.value[2]?.min_zoom && map.getZoom() < this.value[2]?.min_zoom) return;
			}

			//3. Draw this.geometry, this.label_geometries, this.selected_geometry onto map
			try {
				if (this.value[0]) {
					this.geometry = maptalks.Geometry.fromJSON(this.value[0]);
					if (this.value[1] && this.geometry) this.geometry.setSymbol(this.value[1]);
					main.layers.entity_layer.addGeometry(this.geometry);
					this.drawLabels();
				}
			} catch (e) { console.error(e); }
			
			//4. Set info window
			this.geometry.setInfoWindow({
				title: this.value[2].name,
				content: this.element
			});
			this.geometry.addEventListener("click", (e) => {
				this.history.getKeyframe({ refresh_localisation: true });
				this.element.innerHTML = "";
				this.element.appendChild(this.getElement());
			})
		}
	}
	
	drawLabels () {
		//Declare local instance variables
		let hide_labels_under_km2 = 100;
		
		//Fetch this.value[2].label_coordinates, this.value[2].label_name/name, this.value[2].label_symbol
		if (this.geometry && !this.value[2]?.label_symbol?.hide) {
			let label_geometries = (this.value[2].label_geometries) ?
				this.value[2].label_geometries : [];
			let label_name = (this.value[2].label_name) ?
				this.value[2].label_name : this.value[2].name;
			
			//1. .label_coordinates
			if (label_geometries.length === 0) {
				if (!this.geometry.getGeometries) {
					this.label_geometries[0] = new maptalks.Marker(this.geometry.getCenter());
					this.label_geometries[0].area = this.geometry.getArea();
				} else {
					let all_geometries = this.geometry.getGeometries();
					
					for (let i = 0; i < all_geometries.length; i++) {
						let local_area = all_geometries[i].getArea();
						if (local_area < hide_labels_under_km2*1000000 && i > 0) continue; //Internal guard clause for small exclaves <1000km^2
						
						let local_label_geometry = new maptalks.Marker(all_geometries[i].getCenter());
						local_label_geometry.area = local_area;
						this.label_geometries.push(local_label_geometry);
					}
				}
			} else {
				for (let i = 0; i < label_geometries.length; i++)
					this.label_geometries[i] = maptalks.Geometry.fromJSON(label_geometries[i]);
			}
			
			//Iterate over all this.label_geometries, apply settings
			for (let i = 0; i < this.label_geometries.length; i++) {
				let local_label_geometry = this.label_geometries[i];
				if (!local_label_geometry) continue;
				
				//2. .label_name/.name
				if (label_geometries.length === 0) {
					this.label_geometries[i].setSymbol({
						textName: label_name,
						
						textFaceName: "Karla",
						textFill: "white",
						textHaloFill: "black",
						textHaloRadius: 2,
						textSize: 14,
					});
					
					if (main.settings.hide_labels_by_default)
						this.label_geometries[i].hide();
				}
				if (local_label_geometry.area !== undefined)
					local_label_geometry.setZIndex(-local_label_geometry.area);
				local_label_geometry.addTo(main.layers.labels);
			}
		}
	}
	
	getElement () {
		//Declare local instance variables
		let element = document.createElement("div");
			//element.innerHTML = `<button onclick = "console.log(Geometry.instances['${this.id}']);">Debug</button><br><br>`
		let table_el = document.createElement("table");
		let tbody_el = document.createElement("tbody");
		let keyframes_el = document.createElement("details");
			{
				let summary_el = document.createElement("summary");
					summary_el.innerHTML = `Keyframes (${Object.keys(this.history.keyframes).length}):`;
				
				//Iterate over all this.history.keyframes
				let all_keyframes = Object.keys(this.history.keyframes);
					all_keyframes.sort((a, b) => parseInt(b) - parseInt(a));
				
				for (let i = 0; i < all_keyframes.length; i++) {
					let local_keyframe = this.history.keyframes[all_keyframes[i]];
					let local_tr = document.createElement("tr");
					
					let td_date_el = document.createElement("td");
						td_date_el.innerHTML = String.formatDate(parseInt(all_keyframes[i]));
					local_tr.appendChild(td_date_el);
					
					let td_description_el = document.createElement("td");
						td_description_el.setAttribute("class", "keyframe-description");
						td_description_el.innerHTML = (local_keyframe?.localisation) ? `<div>${local_keyframe?.localisation}</div>` : "";
					local_tr.appendChild(td_description_el);
					
					let td_actions_el = document.createElement("td");
						td_actions_el.style.whiteSpace = "nowrap";
						td_actions_el.innerHTML = `<button onclick = "setDate(${all_keyframes[i]})">Jump To Date</button>`;
					local_tr.appendChild(td_actions_el);
					
					tbody_el.appendChild(local_tr);
				}
				
				keyframes_el.appendChild(summary_el);
				
				table_el.appendChild(tbody_el);
				keyframes_el.appendChild(table_el);
			}
		
		element.appendChild(keyframes_el);
		
		if (this?.metadata?.description?.length > 0) {
			let description_el = document.createElement("span");
				description_el.setAttribute("class", "description");
				description_el.innerHTML = `<br><b>Description:</b><br>${this.metadata.description}<div style = "font-size:0.65rem; opacity:0.75;"><br>Descriptions are currently temporary, and will be improved in the future.</div>`;
			
			element.appendChild(description_el);
		}
		
		//Return statement
		return element;
	}
}

class History {
	constructor (arg0_keyframes_obj, arg1_options) {
		//Convert from parameters
		this.do_not_draw = false;
		this.keyframes = (arg0_keyframes_obj) ? arg0_keyframes_obj : {};
		
		//Declare local instance variables
		this.options = {
			components_obj: {},
			...arg1_options
		};
	}
	
	_hasTimestampAfter (arg0_timestamp) {
		//Convert from parameters
		let timestamp = Date.getTimestamp(arg0_timestamp);
		
		//Declare local instance variables
		let all_keyframes = Object.keys(this.keyframes);
		
		for (let i = 0; i < all_keyframes.length; i++)
			if (timestamp >= parseInt(all_keyframes[i]))
				//Return statement
				return true;
		return false;
	}
	
	addKeyframe (arg0_date, ...argn_arguments) {
		//Convert from parameters
		let date = (arg0_date !== undefined) ? Date.convertTimestampToDate(arg0_date) : main.date;
		
		//Declare local instance variables
		let timestamp = Date.getTimestamp(date);
		
		//Create a new keyframe, otherwise concatenate with existing options if history is already defined
		if (this.keyframes[timestamp] === undefined) {
			this.keyframes[timestamp] = new HistoryKeyframe(date, ...argn_arguments);
		} else {
			let local_keyframe = this.keyframes[timestamp];
			local_keyframe.addData(...argn_arguments);
		}
		
		//Return statement
		return this.keyframes[timestamp];
	}
	
	fromJSON (arg0_json) {
		//Convert from parameters
		let json = JSON.parse(arg0_json);
		
		//Iterate over all_json_keys and assume them as keyframes
		if (json.keyframes) {
			let all_keyframes = Object.keys(json.keyframes).sort();
			
			this.do_not_draw = true;
			this.keyframes = {};
			for (let i = 0; i < all_keyframes.length; i++) {
				let local_date = Date.convertTimestampToDate(all_keyframes[i]);
				let local_keyframe = json.keyframes[all_keyframes[i]];
				
				this.addKeyframe(local_date, ...local_keyframe.value);
			}
			this.do_not_draw = false;
		} else {
			console.error(`naissance.History.fromJSON() requires arg0_json to have a .keyframes Array<Object>.`, json);
		}
	}
	
	getKeyframe (arg0_options) {
		//Convert from parameters
		let options = (arg0_options) ? arg0_options : {};
		
		//Initialise options
		if (options.date === undefined) options.date = main.date;
		
		//Declare local instance variables
		let return_keyframe = {
			date: options.date,
			timestamp: Date.getTimestamp(options.date),
			value: [],
		};
		
		let all_keyframes = this.getTimestamps();
		
		for (let i = 0; i < all_keyframes.length; i++) {
			let local_keyframe = this.keyframes[all_keyframes[i]];
			
			//Parse localisation first, then concatenate
			if (options.refresh_localisation)
				local_keyframe.localisation = (this.options.localisation_function) ?
					this.options.localisation_function(local_keyframe, return_keyframe) : "";
			
			if (Date.convertTimestampToInt(all_keyframes[i]) <= Date.convertTimestampToInt(return_keyframe.timestamp)) {
				for (let x = 0; x < local_keyframe.value.length; x++)
					if (typeof local_keyframe.value[x] === "object" && local_keyframe.value[x] !== null) {
						let old_variables = return_keyframe.value[x]?.variables ?
							return_keyframe.value[x].variables : {};
						
						//Return keyframe
						return_keyframe.value[x] = {
							...(return_keyframe.value[x] ? return_keyframe.value[x] : {}),
							...local_keyframe.value[x],
						};
						
						//Handle nested .variables
						if (local_keyframe.value[x] && local_keyframe.value[x].variables)
							return_keyframe.value[x].variables = {
								...old_variables,
								...local_keyframe.value[x].variables,
							};
					} else if (local_keyframe.value[x] !== undefined) {
						if (local_keyframe.value[x] === "undefined") continue; //Overwrite undefined strings
						if (x !== 0 && local_keyframe.value[x] === null) continue; //Null should be overridden for [1] symbols, [2] properties
						//If the value is null or a primitive, it overwrites the previous accumulated state
						return_keyframe.value[x] = local_keyframe.value[x];
					}
			} else { if (!options.refresh_localisation) break; }
		}
		
		//Return statement
		return return_keyframe;
	}
	
	getTimestamps () {
		//Return statement
		return Object.keys(this.keyframes).sort((a, b) => {
			return Date.convertTimestampToInt(a) - Date.convertTimestampToInt(b);
		});
	}
}

class HistoryKeyframe {
	constructor (arg0_date, ...argn_arguments) {
		//Convert from parameters
		let date = arg0_date;
		
		//Declare local instance variables
		this.date = Date.convertTimestampToDate(JSON.parse(JSON.stringify(date))); //Needs to be deep-copied since date can be a Proxy
		this.timestamp = Date.getTimestamp(date);
		this.value = [];
		
		this.setData(...argn_arguments);
	}
	
	/**
	 * Adds the constructor/data structure of another object as an {@link Array}<{@link Object}>. Concatenates any objects passed to the function.
	 *
	 * @param {...any} argn_arguments
	 */
	addData (...argn_arguments) {
		//Iterate over all arguments and add it to .value, concatenating any objects if they exist
		for (let i = 0; i < argn_arguments.length; i++)
			if (argn_arguments[i] !== undefined)
				if (typeof argn_arguments[i] === "object" && argn_arguments[i] !== null) {
					let old_variables = (this.value[i]?.variables) ? this.value[i].variables : {};
					
					//Handle initial value naively
					this.value[i] = {
						...(this.value[i]) ? this.value[i] : {},
						...argn_arguments[i]
					};
					//Handle shallow nesting for .variables if extant
					if (argn_arguments[i].variables)
						this.value[i].variables = {
							...old_variables,
							...argn_arguments[i].variables
						};
				} else {
					this.value[i] = argn_arguments[i];
				}
	}
	
	/**
	 * Overrides the present value, replacing it with the constructor/data structure of another object as an {@link Array}<{@link Object}>.
	 *
	 * @param {...any} argn_arguments
	 */
	setData (...argn_arguments) {
		this.value = [];
		this.addData(...argn_arguments);
	}
}