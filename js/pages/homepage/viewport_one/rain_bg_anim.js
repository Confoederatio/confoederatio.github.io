//Global animation instance variables
var max_number_of_raindrops = 100; //Cap off the number of particles in order to reduce lag
var raindrop_animation_paused = true;
var raindrop_array = [];
var raindrop_container = document.getElementById("homepage-banner-raindrops-container");
var raindrop_iterations = 0;

//Framework functions
{
  function generateRaindropID () {
    //Declare instance variables
    var current_iteration = 0;
    var valid_id = "";

    while (true) {
      //Declare and initialise local instance variables
      var all_raindrop_elements = raindrop_container.querySelectorAll(".raindrop");
      var all_raindrop_ids = [];
      for (var i = 0; i < all_raindrop_elements.length; i++) all_raindrop_ids.push(all_raindrop_elements[i].getAttribute("id").replace("raindrop-", ""));

      //Try to fetch valid ID
      var new_id = randomNumber(0, 1000000000).toString();
      if (!all_raindrop_ids.includes(new_id)) {
        valid_id = new_id;
        break;
      }

      //Break it off after 15 iterations
      current_iteration++;
      if (current_iteration > 15) break;
    }

    return valid_id;
  }
}

//A class would be easier for substantiating raindrops
class Raindrop {
  constructor (arg0_x, arg1_y, arg2_width, arg3_height, arg4_opacity, arg5_duration) {
    //Set parameters
    this.x = arg0_x;
    this.y = arg1_y;
    this.width = arg2_width;
    this.height = arg3_height;

    //Other generated parameters
    this.duration = (arg5_duration) ? arg5_duration : randomNumber(20000, 30000); //How many ms should the raindrop appear on screen for before disappearing?
    this.id = `raindrop-${generateRaindropID()}`;
    this.opacity = (arg4_opacity) ? arg4_opacity : 0.15; //How transparent should the raindrop be?

    //Initialise element in DOM and local styling
    raindrop_container.innerHTML += `
      <div id = "${this.id}" class = "raindrop" style = "
        background-color: rgb(255, 255, 255);
        opacity: ${this.opacity};

        position: absolute;
        width: ${this.width}px;
        height: ${this.height}px;
        top: ${this.y}%;
        left: ${this.x}%;
        border-radius: 50%;
      "></div>
    `;

    //Set timeout to remove raindrop
    var local_id = this.id; //Set to local_id to pass argument
    setTimeout(function(){
      document.getElementById(local_id).remove();
    }, this.duration);
  }

  //Fetch methods
  fetchID () {
    return this.id;
  }
  isDestroyed () {
    return (!document.getElementById(this.id));
  }
}

//Generate raindrops
var raindrop_logic = setInterval(function(){
  //Make sure raindrop animation isn't paused
  if (!raindrop_animation_paused) {
    //Remove all destroyed raindrops from array
    var raindrops_to_remove = [];
    for (var i = 0; i < raindrop_array.length; i++) if (raindrop_array[i].isDestroyed()) raindrops_to_remove.push(raindrop_array[i]);
    for (var i = 0; i < raindrops_to_remove.length; i++) {
      for (var x = 0; x < raindrop_array.length; x++) if (raindrop_array[x] == raindrops_to_remove[i]) raindrop_array.splice(x, 1);
    }

    //Add raindrop if valid
    var all_raindrops = raindrop_container.querySelectorAll(".raindrop");
    var random_tick = randomNumber(9, 11);

    //Declare substantiation variables
    var raindrop_size = randomNumber(15, 48);
    if (raindrop_iterations % random_tick == 0 && all_raindrops.length < max_number_of_raindrops) raindrop_array.push(new Raindrop(
      randomNumber(0, 100),
      randomNumber(0, 100),
      raindrop_size,
      raindrop_size,
      randomElement([
        0.3,
        0.4,
        0.5,
        0.7
      ]),
      raindrop_size*750
    ));
  }
}, 500);
