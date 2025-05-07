//Initialise functions
{
  function closeMinistrat () {
    //Declare local instance variables
    var non_ministrat_els = document.querySelectorAll(ministrat.config.elements.ui.non_ministrat_selector);

    for (var i = 0; i < non_ministrat_els.length; i++)
      non_ministrat_els[i].classList.remove("display-none");

    //Minimise map
    minimiseMap();

    //Remove class from about me section
    document.querySelector(".about-me-section-container").classList.remove("ministrat-open");

    //Pause game; scroll down to about page
    setMinistratGameSpeed(0);
    document.getElementById("ministrat-anchor").scrollIntoView({
      behavior: "instant"
    });
  }

  function loadMinistrat () {
    //Declare local instance variables
    var non_ministrat_els = document.querySelectorAll(ministrat.config.elements.ui.non_ministrat_selector);

    for (var i = 0; i < non_ministrat_els.length; i++)
      non_ministrat_els[i].classList.add("display-none");

    //Expand map
    expandMap();

    //Add class to about me section
    document.querySelector(".about-me-section-container").classList.add("ministrat-open");

    loadMinistratCountries();

    //Start game after time animation
    setTimeout(function () {
      setMinistratGameSpeed(1);
    }, 10000);
  }
}
