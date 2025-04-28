//Initialise functions
{
  function addBookmarkItem (arg0_element_id, arg1_no_animation) {
    //Convert from parameters
    var local_id = arg0_element_id;
    var no_animation = arg1_no_animation;

    //Declare local instance variables
    var bookmark_btn = document.getElementById(`bookmark-btn-${local_id}`);
    var local_element = document.getElementById(local_id);
    var gallery_obj = main.gallery;
    
    //Guard clause if local_element does not exist
    if (!local_element) return;

    //Change ID temporarily
    local_element.setAttribute("id", `preview-${local_id}`);
    bookmark_btn.setAttribute("class",
      bookmark_btn.getAttribute("class").replace("bookmark-empty", "bookmark-filled")
    );

    //Add local element to DOM as preview
    gallery_obj.bookmark_preview_container.innerHTML += local_element.outerHTML;
    if (!gallery_obj.bookmark_items.includes(local_id)) gallery_obj.bookmark_items.push(local_id);

    //Change ID back
    local_element.setAttribute("id", local_id);

    //Modify new DOM element
    var all_bookmarks = document.querySelectorAll(".parallax-item-preview");
    var bookmark_el = document.getElementById(`preview-${local_id}`);

    bookmark_el.setAttribute("class",
      bookmark_el.getAttribute("class").replace("parallax-item", "parallax-item-preview") + " show-animation"
    );
    bookmark_el.setAttribute("onclick",
      `selectBookmarkItem('preview-${local_id}');`
    );
    for (var i = 0; i < all_bookmarks.length; i++) all_bookmarks[i].setAttribute("style", `
      left: calc(50% - 12vh - ${i*12}vh);
      z-index: ${all_bookmarks.length-1-i};
    `);

    bookmark_el.innerHTML += `
      <div id = "btn-close-bookmark-${local_id}" class = "parallax-icon close-btn" onclick = "bookmarkInteraction('${local_id}');"></div>"
    `;
    bookmark_el.setAttribute("style", `
      left: calc(50% - 12vh - ${all_bookmarks.length*12}vh);
      z-index: -1;
    `);

    //Closed anonymous function to preserve element object
    setTimeout(function(){
      bookmark_el.setAttribute("style", `
        left: calc(50% - 12vh - ${all_bookmarks.length*12}vh);
        z-index: -1;
      `);

      //This sorcery is needed to time out the classes
      var new_bookmark_el = document.getElementById(bookmark_el.id);
      new_bookmark_el.setAttribute("class",
        new_bookmark_el.getAttribute("class").replace(" show-animation", "")
      );
    }, 1000);

    //Add bookmark buttons and other shenanigans
    var new_bookmarks = document.querySelectorAll(".parallax-item-preview");
    for (var i = 0; i < new_bookmarks.length; i++) {
      var bookmark_dot_el = document.getElementById(`btn-bookmark-${new_bookmarks[i].id}`);

      //Add button for bookmark if it doesn't exist
      if (!bookmark_dot_el) {
        var local_class_name = (!no_animation) ? "parallax-bookmark-dot fade-in" : "parallax-bookmark-dot";
        gallery_obj.parallax_buttons.innerHTML += `
          <div id = "btn-bookmark-${new_bookmarks[i].id}" class = "${local_class_name}" onclick = "selectBookmarkItem('${new_bookmarks[i].id}')"></div>
        `;

        var new_bookmark_el = document.getElementById(`btn-bookmark-${new_bookmarks[i].id}`);

        //Remove fade-in class after animation finishes playing
        setTimeout(function(){
          var all_animated_bookmarks = document.querySelectorAll(".parallax-bookmark-dot.fade-in");

          for (var i = 0; i < all_animated_bookmarks.length; i++) all_animated_bookmarks[i].setAttribute("class",
            all_animated_bookmarks[i].getAttribute("class").replace(" fade-in", "")
          );
        }, 1000);
      }
    }

    //Select bookmark if no other bookmark elements are present
    if (gallery_obj.bookmark_items.length == 1) {
      gallery_obj.bookmark_selected = local_id;
    }
    gallery_obj.bookmark_selected = (gallery_obj.bookmark_selected == "") ? local_id : gallery_obj.bookmark_selected;
    gallery_obj.bookmark_selected = (!gallery_obj.bookmark_selected.includes("preview-")) ? "preview-" + gallery_obj.bookmark_selected : gallery_obj.bookmark_selected;

    try {
      selectBookmarkItem(gallery_obj.bookmark_selected, true, true);
    } catch {}

    //Hide no bookmark label since a new bookmark has been added
    if (!gallery_obj.bookmark_no_label.getAttribute("class").includes(" hidden")) gallery_obj.bookmark_no_label.setAttribute("class",
      gallery_obj.bookmark_no_label.getAttribute("class") + " hidden"
    );

    gallery_obj.bookmark_container.setAttribute("class",
      gallery_obj.bookmark_container.getAttribute("class").replace(" no-bookmarks", "")
    );
  }

  function bookmarkInteraction (arg0_element_id) {
    //Convert from parameters
    var local_id = arg0_element_id;
    var gallery_obj = main.gallery;

    (!gallery_obj.bookmark_items.includes(local_id) && !document.querySelector(`#preview-${local_id}`)) ? addBookmarkItem(local_id) : removeBookmarkItem(local_id);
  }

  function clearBookmarkDots () {
    //Fetch all dots, iterate over them, and clear them.
    var all_bookmark_dots = document.querySelectorAll(".parallax-bookmark-dot");

    for (var i = 0; i < all_bookmark_dots.length; i++) all_bookmark_dots[i].setAttribute("class",
      all_bookmark_dots[i].getAttribute("class").replace(" filled", "")
    );
  }

  function hideBookmarkUI () {
    var gallery_obj = main.gallery;
    gallery_obj.bookmark_minimise_btn.setAttribute("class",
      gallery_obj.bookmark_minimise_btn.getAttribute("class") + " minimised"
    );
    gallery_obj.bookmark_container.setAttribute("class",
      gallery_obj.bookmark_container.getAttribute("class") + " minimised"
    );
  }

  function removeBookmarkItem (arg0_element_id) {
    //Convert from parameters
    var local_element = document.getElementById(arg0_element_id);
    var local_id = arg0_element_id;
    var gallery_obj = main.gallery;

    //Declare local instance variables
    var bookmark_btn = document.getElementById(`bookmark-btn-${local_id}`);
    var is_last_element = (gallery_obj.bookmark_items[gallery_obj.bookmark_items.length-1] == local_id);
    var local_index = gallery_obj.bookmark_items.indexOf(local_id.replace("preview-", ""));
    var no_bookmark_label = gallery_obj.no_bookmark_label;

    //Remove bookmark functionally
    bookmark_btn.setAttribute("class",
      bookmark_btn.getAttribute("class").replace("bookmark-filled", "bookmark-empty")
    );
    removeElement(gallery_obj.bookmark_items, local_id);
    closing_bookmark = true;
    setTimeout(function(){
      closing_bookmark = false;
    }, 0);

    //Remove bookmark preview
    var bookmark_dot_el = document.getElementById(`btn-bookmark-preview-${local_id}`);
    var preview_el = document.getElementById(`preview-${local_id}`);

    (!is_last_element) ? preview_el.setAttribute("item-state", "hidden") : preview_el.setAttribute("item-state", "hidden-last");
    bookmark_dot_el.setAttribute("class",
      bookmark_dot_el.getAttribute("class") + " fade-out"
    );

    //Select a new bookmark since the current selected bookmark is no longer valid
    var new_selected_bookmark = gallery_obj.bookmark_selected;

    if (!gallery_obj.bookmark_items.includes(gallery_obj.bookmark_selected.replace("preview-", ""))) {
      new_selected_bookmark = (!gallery_obj.bookmark_items[local_index]) ? gallery_obj.bookmark_items[local_index-1] : gallery_obj.bookmark_items[local_index];
    }

    //Error trapping
    try {
      new_selected_bookmark = (!new_selected_bookmark.includes("preview-")) ? "preview-" + new_selected_bookmark : new_selected_bookmark;

      selectBookmarkItem(new_selected_bookmark, true, true);
    } catch {}

    setTimeout(function(){
      preview_el.remove();
      bookmark_dot_el.remove();

      //Show no bookmark label if applicable
      if (gallery_obj.bookmark_items.length == 0) {
        no_bookmark_label.setAttribute("class",
          no_bookmark_label.getAttribute("class").replace(" hidden", "")
        );
        if (!gallery_obj.bookmark_container.getAttribute("class").includes("no-bookmarks")) gallery_obj.bookmark_container.setAttribute("class",
          gallery_obj.bookmark_container.getAttribute("class") + " no-bookmarks"
        );
      }
    }, 500);

    //Update DOM, but only if its not being handled by selectBookmarkItem
    if (!new_selected_bookmark) {
      var all_bookmarks = document.querySelectorAll(`.parallax-item-preview:not([id="preview-${local_id}"])`);
      for (var i = 0; i < all_bookmarks.length; i++) {
        var new_left = `calc(50% - ${i*12}vh)`;

        if (all_bookmarks[i].style.left != new_left) all_bookmarks[i].setAttribute("style", `
          left: ${new_left};
          z-index: ${all_bookmarks.length-1-i};
        `);
      }
    }
  }

  function selectBookmarkItem (arg0_element_id, arg1_automatic_selection, arg2_no_scroll) {
    //Convert from parameters
    var actual_id = arg0_element_id.replace("preview-", "");
    var automatic_selection = arg1_automatic_selection;
    var local_bookmark = document.getElementById(`${arg0_element_id}`);
    var local_el = document.getElementById(`btn-bookmark-${arg0_element_id}`);
    var local_id = arg0_element_id;
    var no_scroll = arg2_no_scroll;
    var gallery_obj = main.gallery;
    var old_bookmark = document.getElementById(`${gallery_obj.bookmark_selected}`);
    var parallax_element = document.getElementById(`${arg0_element_id.replace("preview-", "")}`);

    //Declare local instance variables
    var local_index = (gallery_obj.bookmark_items.includes(local_id.replace("preview-", ""))) ? gallery_obj.bookmark_items.indexOf(local_id.replace("preview-", "")) : 0;

    //Make sure that other buttons aren't being pressed
    if (!gallery_obj.closing_bookmark || automatic_selection) {
      //Clear all dots and set local_el to filled
      clearBookmarkDots();
      local_el.setAttribute("class",
        local_el.getAttribute("class") + " filled"
      );

      //Select bookmark and apply DOM classes/styling
      gallery_obj.bookmark_selected = local_id;

      //Translate bookmarks_container over so that the selected element is centred
      gallery_obj.bookmark_preview_container.style.left = `${local_index*-12}vh`;

      //Reset old_bookmark styling to default
      var all_bookmarks = document.querySelectorAll(`.parallax-item-preview:not([item-state*="hidden"])`);
      for (var i = 0; i < all_bookmarks.length; i++) {
        all_bookmarks[i].setAttribute("style", `
          left: calc(50% - 12vh - ${i*12}vh);
          z-index: ${
            (i < local_index) ? i : all_bookmarks.length - i
          };
        `);
        all_bookmarks[i].setAttribute("class",
          all_bookmarks[i].getAttribute("class").replace(" selected", "")
        );
      }

      //Add styling to current bookmark
      local_bookmark.style.zIndex = 99;
      if (!local_bookmark.getAttribute("class").includes("selected")) local_bookmark.setAttribute("class",
        local_bookmark.getAttribute("class") + " selected"
      );

      //Pan to bookmark
      if (!no_scroll) {
        //Hide any content panels that are both maximised and shown
        if (getMaximisedContentPanel()) minimiseContentPanel(getMaximisedContentPanel());

        var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)/100;
        var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)/100;

        var local_width = parseInt(getComputedStyle(parallax_element).width.replace("px", ""))/vh;
        var offset_x = (vw*50)/vh;
        var pan_x = parseInt(getComputedStyle(parallax_element).left.replace("px", ""))/vh;

        gallery_obj.parallax_scroll_x = (pan_x*-1 + offset_x - local_width/2);
        if (!gallery_obj.parallax_container.getAttribute("class").includes("slow-scroll")) gallery_obj.parallax_container.setAttribute("class",
          gallery_obj.parallax_container.getAttribute("class").replace(" fast-scroll", "") + " slow-scroll"
        );
        gallery_obj.parallax_container.style.transform = `translateX(${gallery_obj.parallax_scroll_x}vh)`;
        gallery_obj.content_panel_container.style.left = `${gallery_obj.parallax_scroll_x*0.15}vh`;
      }

      if (!parallax_element.getAttribute("animation").includes("shown")) {
        parallax_element.setAttribute("animation", actual_id + "-shown");
        parallax_element.setAttribute("class",
          parallax_element.getAttribute("class").replace(" hidden", "")
        );
      }
    }
  }

  function showBookmarkUI () {
    var gallery_obj = main.gallery;
    gallery_obj.bookmark_minimise_btn.setAttribute("class",
      gallery_obj.bookmark_minimise_btn.getAttribute("class").replace(" minimised", "")
    );
    gallery_obj.bookmark_container.setAttribute("class",
      gallery_obj.bookmark_container.getAttribute("class").replace(" minimised", "")
    );
  }
}