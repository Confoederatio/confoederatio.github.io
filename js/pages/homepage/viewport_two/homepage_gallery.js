//Initialise functions
{

  function getDescendants (arg0_element_id) {
    //Convert from parameters
    var local_element = arg0_element_id;
    var gallery_obj = main.gallery;

    //Declare local instance variables
    var current_iterations = 0;
    var descendants = [local_element];

    try {
      while (true) {
        for (var i = 0; i < descendants.length; i++) {
          var local_obj = gallery_obj.parallax_settings[descendants[i]];
          if (local_obj.dependencies) for (var x = 0; x < local_obj.dependencies.length; x++) descendants.push(local_obj.dependencies[x]);

          //Make sure only unique descendants remain
          descendants = unique(descendants);
        }

        //Break before hitting an infinite loop
        if (current_iterations >= 15) break;
        current_iterations++;
      }
    } catch {}

    //Remove original element
    descendants = removeElement(descendants, local_element);

    //Return statement
    return descendants;
  }

  function getParent (arg0_element_id) {
    //Convert from parameters
    var potential_child_element = arg0_element_id;
    var gallery_obj = main.gallery;

    //Declare local instance variables
    var all_parallax_elements = Object.keys(gallery_obj.parallax_settings);
    var parent_elements = [];

    for (var i = 0; i < all_parallax_elements.length; i++) {
      var item_obj = gallery_obj.parallax_settings[all_parallax_elements[i]];
      if (item_obj.dependencies) if (item_obj.dependencies.includes(potential_child_element)) parent_elements.push(all_parallax_elements[i]);
    }

    parent_elements = unique(parent_elements);

    //Return statement
    return parent_elements;
  }

  function initParallaxElement (arg0_element_id) {
    //Convert from parameters
    var local_element = arg0_element_id;
    var gallery_obj = main.gallery;

    if (!gallery_obj.parallax_settings[local_element]) gallery_obj.parallax_settings[local_element] = {};
    var local_obj = gallery_obj.parallax_settings[local_element];

    //Begin initialising local fields
    local_obj.animation_queue = (!local_obj.animation_queue) ? [] : local_obj.animation_queue;
    local_obj.id = (!local_obj.id) ? local_element : local_obj.id;

    //Hide and show functions
    local_obj.hide_function = function () {
      local_obj.animation_queue.push(local_obj.animation);
      local_obj.animation_queue = local_obj.animation_queue.reverse();
      local_obj.animation_queue = unique(local_obj.animation_queue);
      local_obj.animation_queue = local_obj.animation_queue.reverse();
    }

    local_obj.show_function = function () {
      local_obj.animation_queue.push(`${local_obj.animation}-shown`);
      local_obj.animation_queue = local_obj.animation_queue.reverse();
      local_obj.animation_queue = unique(local_obj.animation_queue);
      local_obj.animation_queue = local_obj.animation_queue.reverse();
    }

    //Processes animation queue
    var dependency_amount = getDescendants(local_obj.id).length;

    local_obj.logic = setInterval(function(){
      //Check to make sure all descendants have finished their animation queues
      var all_children_finished_playing = true;
      var all_descendants = getDescendants(local_obj.id);

      for (var i = 0; i < all_descendants.length; i++) {
        var descendant_obj = gallery_obj.parallax_settings[all_descendants[i]];

        if (descendant_obj)
          if (descendant_obj.animation_queue.length > 0) 
            all_children_finished_playing = false;
      }

      //If all descendants have finished, begin processing animation_queue
      if (all_children_finished_playing) {
        if (local_obj.animation_queue.length > 0) {
          //Set animation attribute
          try {
            var local_element = document.getElementById(local_obj.id);
            local_element.setAttribute("animation", local_obj.animation_queue[0]);

            setTimeout(function(local_obj){
              if (local_obj.animation_queue[0].includes("-shown")) {
                local_element.setAttribute("class",
                  local_element.getAttribute("class").replace(" hidden", "")
                );
              } else {
                local_element.setAttribute("class",
                  local_element.getAttribute("class") + " hidden"
                );
              }

              //Pop first element in array and carry on
              local_obj.animation_queue.splice(0, 1);
            }(local_obj), 750);
          } catch {}
        }
      }
    }, 750 - dependency_amount);

    //Initialise DOM elements
    var local_el = document.getElementById(local_obj.id);

    local_el.setAttribute("animation", local_el.id + "-shown");
    local_el.setAttribute("onclick", `toggleContentPanel('${local_el.id}'); selectParallaxItem('${local_el.id}');`);

    if (local_obj.animation && !local_obj.is_base_node)
      local_el.innerHTML = local_el.innerHTML += `
        <div class = "parallax-icon pin ${(gallery_obj.parallax_pinned_items.includes(local_el.id)) ? "pin-filled" : "pin-empty"}" onclick = "pinItem('${local_el.id}');"></div>
        <div id = "bookmark-btn-${local_el.id}" class = "parallax-icon bookmark bookmark-empty" onclick = "bookmarkInteraction('${local_el.id}');"></div>
      `;
  }

  function isImmediateDescendant (arg0_element_id, arg1_element_id) {
    //Convert from parameters
    var parent_element = arg0_element_id;
    var child_element = arg1_element_id;
    var gallery_obj = main.gallery;

    //Declare local instance variables
    var is_descendant = false;
    var item_obj = gallery_obj.parallax_settings[parent_element];

    if (item_obj) if (item_obj.dependencies) is_descendant = (item_obj.dependencies.includes(child_element)) ? true : is_descendant;

    //Return statement
    return is_descendant;
  }

  function isDescendant (arg0_element_id, arg1_element_id) {
    //Convert from parameters
    var parent_element = arg0_element_id;
    var child_element = arg1_element_id;
    var gallery_obj = main.gallery;

    //Declare local instance variables
    var all_parallax_elements = Object.keys(gallery_obj.parallax_settings);
    var current_ids = [child_element];
    var current_iterations = 0;
    var is_descendant = false;

    while (true) {
      //Recursive iteration to find parent
      for (var i = 0; i < current_ids.length; i++) {
        var all_child_parents = getParent(current_ids[i]);
        is_descendant = (all_child_parents.includes(parent_element)) ? true : is_descendant;

        for (var x = 0; x < all_child_parents.length; x++) {
          var all_parents = getParent(all_child_parents[x]);

          if (all_parents.includes(parent_element)) {
            is_descendant = true;
          } else {
            for (var y = 0; y < all_parents.length; y++) current_ids.push(all_parents[y]);
          }
        }
      }

      //Clear duplicates and restart loop, abort if needed
      current_ids = unique(current_ids);
      current_iterations++;
      if (current_iterations > 15) break;
    }

    return is_descendant;
  }

  function onParallaxHover (e) {
    //Declare local instance variables
    var all_parallax_dom_elements = document.querySelectorAll(".parallax-item");
    var all_parallax_elements = Object.keys(main.gallery.parallax_settings);
    var gallery_obj = main.gallery;

    //Fetch ID recursively
    var current_element = e.target;
    var current_iterations = 0;

    while (true) {
      if (current_element)
        if (current_element.id) {
          break;
        } else {
          current_element = current_element.parentElement;
        }

      if (current_iterations > 15) break;
      current_iterations++;
    }

    //Increment hover argument to determine how long the element has been hovered over
    try {
      var invalid_id = false;
      for (var i = 0; i < gallery_obj.exempt_id_patterns.length; i++) 
        invalid_id = (current_element.id.includes(gallery_obj.exempt_id_patterns[i])) ? true : invalid_id;
      if (!invalid_id) {
        //Set hover time attribute
        var hover_time = (current_element.getAttribute("hover-time")) ? parseInt(current_element.getAttribute("hover-time")) : 0;
        hover_time = hover_time/100;
        hover_time++;
        current_element.setAttribute("hover-time", hover_time*100);

        //Remove hover-time attribute for all elements that are not currently being hovered over
        var all_hover_elements = document.querySelectorAll("[hover-time]");
        for (var i = 0; i < all_hover_elements.length; i++) if (all_hover_elements[i].id != current_element.id) all_hover_elements[i].removeAttribute("hover-time");
      }
    } catch {}

    //Hide all elements if the current target is not a parallax-item and has been hovered over for at least 5 seconds
    try {
      if (!current_element.getAttribute("class")) {
        if (parseInt(current_element.getAttribute("hover-time")) >= 5000) {
          gallery_obj.parallax_selected = [];
          updateHiddenElements();
        }
      } else {
        if (parseInt(current_element.getAttribute("hover-time")) >= 500) {
          var item_obj = gallery_obj.parallax_settings[current_element.id];
          if (item_obj) gallery_obj.parallax_selected.push(current_element.id);
          gallery_obj.parallax_selected = unique(gallery_obj.parallax_selected);

          //Deselect any child elements that are not the immediate child of the hovered element, or its parent
          var deselection_array = [];
          for (var i = 0; i < all_parallax_dom_elements.length; i++) {
            var is_parent = false;
            var local_id = all_parallax_dom_elements[i].id;

            is_parent = isDescendant(local_id, current_element.id);

            if (!is_parent && local_id != current_element.id) {
              deselection_array.push(local_id);
            }
          }

          //Deselect everything in deselection_array
          for (var i = 0; i < deselection_array.length; i++) removeElement(gallery_obj.parallax_selected, deselection_array[i]);

          //Update hidden elements
          updateHiddenElements();
        }
      }
    } catch {}
  }

  function selectParallaxItem (arg0_element_id) {
    //Convert from parameters
    var element_id = arg0_element_id;
    var gallery_obj = main.gallery;

    //Either add ID to parallax_selected or not
    (!gallery_obj.parallax_selected.includes(element_id)) ? gallery_obj.parallax_selected.push(element_id) : removeElement(gallery_obj.parallax_selected, element_id);
  }

  function togglePreview (arg0_element_id) {
    //Convert from parameters
    var element_id = arg0_element_id;
    var img_el = document.getElementById(arg0_element_id.replace(/_/gm, "-"));
    var local_el = document.getElementById(arg0_element_id + "-preview-btn");

    if (local_el.getAttribute("class").includes(" active")) {
      local_el.setAttribute("class",
        local_el.getAttribute("class").replace(" active", "")
      );
      img_el.setAttribute("class",
        img_el.getAttribute("class") + " cursor-shown"
      );
      window[element_id + "_active_preview"] = false;
    } else {
      local_el.setAttribute("class",
        local_el.getAttribute("class") + " active"
      );
      img_el.setAttribute("class",
        img_el.getAttribute("class").replace(" cursor-shown", "")
      );
      window[element_id + "_active_preview"] = true;
    }
  }

  function updateHiddenElements () {
    //Declare local instance variables
    var all_parallax_dom_elements = document.querySelectorAll(".parallax-item");
    var all_parallax_elements = Object.keys(main.gallery.parallax_settings);
    var hidden_elements = [];
    var visible_elements = [];
    var gallery_obj = main.gallery;

    //Fetch visible elements
    for (var i = 0; i < gallery_obj.parallax_selected.length; i++) {
      try {
        for (var x = 0; x < gallery_obj.parallax_settings[gallery_obj.parallax_selected[i]].dependencies.length; x++) visible_elements.push(gallery_obj.parallax_settings[gallery_obj.parallax_selected[i]].dependencies[x]);
      } catch {}
      visible_elements.push(gallery_obj.parallax_selected[i]);
    }
    for (var i = 0; i < all_parallax_elements.length; i++) {
      if (getParent(all_parallax_elements[i]).length == 0)
        visible_elements.push(all_parallax_elements[i]);
      try {
        if (document.getElementById(`${all_parallax_elements[i]}-content-panel`).getAttribute("class").includes("shown"))
          visible_elements.push(all_parallax_elements[i]);
      } catch {}
    }

    visible_elements = unique(visible_elements);

    //Iterate through all parallax DOM elements and hide those not in visible_elements
    for (var i = 0; i < all_parallax_dom_elements.length; i++)
      try {
        if (!visible_elements.includes(all_parallax_dom_elements[i].id)) {
          if (all_parallax_dom_elements[i].getAttribute("animation")) if (all_parallax_dom_elements[i].getAttribute("animation").includes("-shown")) {
            //Declare local instance variables
            var local_obj = gallery_obj.parallax_settings[all_parallax_dom_elements[i].id];
            if (!gallery_obj.parallax_pinned_items.includes(local_obj.id)) hidden_elements.push([local_obj.id, getDescendants(local_obj.id).length]);
          }
        }
      } catch (e) {}

    //Sort hidden_elements in ascending order
    hidden_elements.sort((a, b) => a[1]-b[1]);

    //Invoke hide_function for all hidden_elements
    for (var i = 0; i < hidden_elements.length; i++)
      gallery_obj.parallax_settings[hidden_elements[i][0]].hide_function();
  }
}
