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
		this.history = new History({});
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
			} else { break; }
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