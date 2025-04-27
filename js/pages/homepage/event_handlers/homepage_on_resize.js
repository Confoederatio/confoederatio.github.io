//Window resize logic
window.addEventListener("resize", function () {
  //Adjust banner text to always fit within the viewport
  if (!banner_settings.finished_animation && !banner_settings.paused_animation)
    adjustFontSize(title_element, banner_title_text, { homepage_banner: true });
});
