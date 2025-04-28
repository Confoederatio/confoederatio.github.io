//Initialise functions
{
  function pinItem (arg0_element_id) {
    //Convert from parameters
    var local_element = document.getElementById(arg0_element_id);
    var local_id = arg0_element_id;
    var gallery_obj = main.gallery;

    //Set item as pinned if possible
    try {
      var pin_btn = local_element.querySelector(".pin");

      (gallery_obj.parallax_pinned_items.includes(local_id)) ? removeElement(gallery_obj.parallax_pinned_items, local_id) : gallery_obj.parallax_pinned_items.push(local_id);
      pin_btn.setAttribute("class",
        (gallery_obj.parallax_pinned_items.includes(local_id)) ? pin_btn.getAttribute("class").replace("pin-empty", "pin-filled") : pin_btn.getAttribute("class").replace("pin-filled", "pin-empty")
      );
    } catch {}
  }
}