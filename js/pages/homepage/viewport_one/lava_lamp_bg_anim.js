//Declare animation instance variables
var lava_lamp_animation_paused = true;
var lava_lamp_bg_circuit = 8; //Determines how 'wide' the circuit the orb travels is

//Main functions
{
  function fetchLavaLampTransformProperties (arg0_string) {
    //Convert from parameters
    var local_transform_string = arg0_string;

    //Declare instance variables
    var rotate_arg_one = "",
      rotate_arg_two = "",
      translate_arg = "";

    //Parse string
    local_transform_string = local_transform_string.replace(/rotate\(/gm, "");
    local_transform_string = local_transform_string.replace(/\) translate\(/gm, " ");
    local_transform_string = local_transform_string.replace(/\) rotate\(/gm, " ");
    local_transform_string = local_transform_string.replace(/\)/gm, "");

    return local_transform_string.split(" ");
  }

  function initLavaLampCycle () {
    //Reinitialise animations
    window.lava_lamp_cycling_animation = TweenMax.staggerFromTo(".lava-lamp-blob", 8, {
      cycle: {
        attr: function (i) {
          var r = i*90,
            r_limit = i*90+360;

          //Fetch blob properties and reset r if necessary
          var blob_properties = fetchLavaLampTransformProperties(document.querySelectorAll(".lava-lamp-blob")[i].getAttribute("transform"));

          //Check for r
          var actual_r = parseInt(blob_properties[0]);
          actual_r = (actual_r >= r_limit*0.9) ? actual_r-360 : actual_r;

          return {
            transform: `rotate(${actual_r}) translate(${blob_properties[1].split(",")[0]}, 0) rotate(${actual_r*-1})`
          }
        }
      }
    }, {
      cycle: {
        attr: function (i) {
          var r = i*90+360;
          return {
            transform: "rotate(" + r + ") translate(" + lava_lamp_bg_circuit + ", 0.1) rotate(" + r*-1 + ")"
          }
        }
      },
      ease: Linear.easeNone,
      repeat: -1
    });
  }
}

initLavaLampCycle();
var lava_lamp_circuit_logic = setInterval(function(){
  if (!lava_lamp_animation_paused) {
    //Change speed of lava lamp
    lava_lamp_bg_circuit += randomElement([
      Math.random()*-1*randomNumber(0, 4),
      Math.random()*randomNumber(0, 5) //Slightly biased towards speeding up
    ]);
    //Set limits for how wide or small the circuit can be
    lava_lamp_bg_circuit = Math.min(lava_lamp_bg_circuit, 64);
    lava_lamp_bg_circuit = (lava_lamp_bg_circuit < 8) ? 8 : lava_lamp_bg_circuit;

    //Kill all tweens
    TweenMax.killAll();
    initLavaLampCycle();
  }
}, 500);
