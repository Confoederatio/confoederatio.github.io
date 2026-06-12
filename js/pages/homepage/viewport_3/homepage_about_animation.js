//Initialise banner namespace
{
  //Event handler function
  function homepageAboutOnScroll () { //[WIP] - Move this to a general parallax framework
    try {
      //if (ministrat.main.game_open) return; //Disable parallax when Ministrat is open
      
      //Set main.vh
      main.vh = window.innerHeight/100;

      //Declare local instance variables
      ic.animate(document.getElementById("about-me-section"), "#about-me-overlay-title");
      ic.animate(document.getElementById("about-me-section"), "#about-me-overlay", {
        direction: "right",
        distance: 250
      });
      document.getElementById("main-map").onclick = (e) => {
        ministratMainMapClickHandler(e);
      };
      
    } catch (e) {
      console.log(e);
    }
  }
}
