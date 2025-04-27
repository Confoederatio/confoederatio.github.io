//Initialise functions
{
  function clearSelectionBox () {
    //Declare local instance variables
    var map_overlay_el = ministrat.main.map_elements.map_overlay_el;
    var selection_box_el = map_overlay_el.querySelector(".selection-box");

    //Remove selection box
    if (selection_box_el) {
      unitSelectionHandler(
        parseFloat(selection_box_el.style.left),
        parseFloat(selection_box_el.style.top),
        parseFloat(selection_box_el.style.width),
        parseFloat(selection_box_el.style.height)
      );
      
      selection_box_el.remove();
    }
  }

  function drawSelectionBox () {
    //Declare local instance variables
    var map_overlay_el = ministrat.main.map_elements.map_overlay_el;
    var selection_box_el = map_overlay_el.querySelector(".selection-box");

    //Create selection box if it doesn't exist
    if (!selection_box_el) {
      selection_box_el = document.createElement("div");
      selection_box_el.setAttribute("class", "selection-box");
      selection_box_el.style.position = "absolute";
      selection_box_el.style.border = "1px solid green";
      selection_box_el.style.background = "rgba(0, 255, 0, 0.2)";
      selection_box_el.style.pointerEvents = "none";

      map_overlay_el.appendChild(selection_box_el);
    }

    //Calculate selection box coordinates
    var height = Math.abs(ministrat.main.map.end_y - ministrat.main.map.start_y);
    var left = Math.min(ministrat.main.map.start_x, ministrat.main.map.end_x);
    var top = Math.min(ministrat.main.map.start_y, ministrat.main.map.end_y);
    var width = Math.abs(ministrat.main.map.end_x - ministrat.main.map.start_x);

    //Update selection box coordinates
    selection_box_el.style.left = `${left}px`;
    selection_box_el.style.top = `${top}px`;
    selection_box_el.style.width = `${width}px`;
    selection_box_el.style.height = `${height}px`;
  }

  function loadMinistratPanHandler () {
    //Declare local instance variables
    var map_el = ministrat.main.map_elements.main_map_el;

    //Computer support
    {
      map_el.addEventListener("mousedown", function (e) {
        //Guard clauses
        if (!ministrat.main.game_open) return;
  
        //Declare local instance variables
        var actual_coords = getSVGCoords(e.clientX, e.clientY);
  
        if (e.shiftKey || e.ctrlKey) { //Shift + Drag = Selection
          ministrat.main.is_selecting = true;
          ministrat.main.map.start_x = actual_coords[0];
          ministrat.main.map.start_y = actual_coords[1];
          ministrat.main.map.end_x = actual_coords[0];
          ministrat.main.map.end_y = actual_coords[1];
  
          drawSelectionBox();
        } else { //Drag = Pan
          ministrat.main.is_dragging = true;
          ministrat.main.map.start_x = e.clientX;
          ministrat.main.map.start_y = e.clientY;
        }
  
        e.preventDefault();
      });
  
      map_el.addEventListener("mousemove", function (e) {
        //Guard clauses
        if (!ministrat.main.game_open) return;
        if (!ministrat.main.is_dragging && !ministrat.main.is_selecting) return;
  
        //Declare local instance variables
        var actual_coords = getSVGCoords(e.clientX, e.clientY);
  
        if (ministrat.main.is_selecting) { //Selection
          ministrat.main.map.end_x = actual_coords[0];
          ministrat.main.map.end_y = actual_coords[1];
  
          drawSelectionBox();
        } else if (ministrat.main.is_dragging) { //Pan
          var delta_x = e.clientX - ministrat.main.map.start_x;
          var delta_y = e.clientY - ministrat.main.map.start_y;
  
          ministrat.main.map.x += delta_x;
          ministrat.main.map.y += delta_y;
          ministrat.main.map.start_x = e.clientX;
          ministrat.main.map.start_y = e.clientY;
  
          updateMapCoords();
        }
      });
  
      ["mouseup", "mouseleave"].forEach((eventName) => {
        map_el.addEventListener(eventName, () => {
          //Guard clauses
          if (!ministrat.main.game_open) return;
          ministrat.main.is_dragging = false;

          //Deselect all units first
          deselectAllUnits();
  
          //Selection logic
          if (ministrat.main.is_selecting) {
            ministrat.main.is_selecting = false;
            clearSelectionBox();
          }
        });
      });
    }

    //Mobile support
    {
      map_el.addEventListener("touchstart", function (e) {
        if (!ministrat.main.game_open) return;
        if (e.touches.length != 1) return;
  
        var touch = e.touches[0];
        var actual_coords = getSVGCoords(touch.clientX, touch.clientY);
  
        ministrat.main.is_selecting = true;
        ministrat.main.map.start_x = actual_coords[0];
        ministrat.main.map.start_y = actual_coords[1];
        ministrat.main.map.end_x = actual_coords[0];
        ministrat.main.map.end_y = actual_coords[1];
  
        drawSelectionBox();
        e.preventDefault();
      }, { passive: false });
  
      map_el.addEventListener("touchmove", function (e) {
        if (!ministrat.main.game_open) return;
        if (!ministrat.main.is_selecting || e.touches.length != 1) return;
  
        var touch = e.touches[0];
        var actual_coords = getSVGCoords(touch.clientX, touch.clientY);
  
        ministrat.main.map.end_x = actual_coords[0];
        ministrat.main.map.end_y = actual_coords[1];
  
        drawSelectionBox();
        e.preventDefault();
      }, { passive: false });
  
      map_el.addEventListener("touchend", function (e) {
        if (!ministrat.main.game_open) return;
        if (ministrat.main.is_selecting) {
          ministrat.main.is_selecting = false;
          clearSelectionBox();
        }
      });
    }
  }
}
