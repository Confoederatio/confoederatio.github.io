window.loadAtlas = async function () {
	try {
		let response = await fetch("https://confoederatio.org/data/atlas_0.5b.json");
		
		if (!response.ok) {
			console.error(`Failed to load Atlas: ${response.status}`);
			return;
		}
		
		//Declare local instance variables
		let atlas_obj = await response.json();
		
		let all_keys = Object.keys(atlas_obj);
		
		//Iterate over all keys in atlas_obj
		for (let i = 0; i < all_keys.length; i++) {
			let local_value = atlas_obj[all_keys[i]];
			
			if (local_value.class_name === "GeometryPolygon") {
				let geometry_obj = new GeometryPolygon(all_keys[i], local_value);
				geometry_obj.history.fromJSON(local_value.history);
				if (local_value.metadata) geometry_obj.metadata = local_value.metadata;
				geometry_obj.draw();
			}
		}
		
		//Return statement
		return atlas_obj;
	} catch (e) {
		//Return statement
		return null;
	}
};