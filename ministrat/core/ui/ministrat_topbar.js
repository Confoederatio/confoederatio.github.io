//Initialise functions
{
  function drawClock (arg0_hour) {
    //Convert from parameters
    var hour = parseFloat(arg0_hour);

    //Declare local instance variables
    var canvas = document.querySelector(ministrat.config.elements.topbar.clock_canvas_selector);
    var ctx = canvas.getContext("2d");

    var clock_outline_width = 2.75;

    //Clear rect first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw light grey circle
    ctx.beginPath();
    ctx.arc(32 - clock_outline_width/2, 32 - clock_outline_width/2, 32 - clock_outline_width, 0, 2*Math.PI);
    ctx.lineWidth = clock_outline_width;
    ctx.strokeStyle = ministrat.config.defines.common.primary_ui_colour;
    ctx.stroke();

    //Draw hour marks
    for (var i = 0; i < 12; i++) {
      var local_angle = (i*Math.PI*2)/12;
      var local_radius = 24;

      var local_dot_x = 32 - clock_outline_width/2 + local_radius*Math.cos(local_angle - Math.PI/2);
      var local_dot_y = 32 - clock_outline_width/2 + local_radius*Math.sin(local_angle - Math.PI/2);

      ctx.beginPath();
      ctx.arc(local_dot_x, local_dot_y, 1, 0, 2*Math.PI);
      ctx.fillStyle = ministrat.config.defines.common.primary_ui_colour;
      ctx.fill();
    }

    //Draw hour hand
    var hour_angle = (hour*Math.PI*2)/24;
    var hour_hand_length = 20.5;
    var rotated_angle = -hour_angle + Math.PI/2;

    ctx.beginPath();
    ctx.moveTo(32 - clock_outline_width/2, 32); //Start point is at the centre
    ctx.lineTo(
      32 - clock_outline_width/2 + hour_hand_length*Math.cos(rotated_angle), 
      32 - hour_hand_length*Math.sin(rotated_angle)
    );
    ctx.stroke();
  }

  function drawMinistratDate () {
    //Declare local instance variables
    var hour_string = Math.floor(ministrat.gamestate.date.hour)
      .toString().padStart(2, "0");
    var ministrat_date_el = document.querySelector(ministrat.config.elements.topbar.date_canvas_selector);
    var month_string = months[ministrat.gamestate.date.month - 1];

    //Draw date
    ministrat_date_el.innerHTML = `${ministrat.gamestate.date.day}. ${month_string} ${ministrat.gamestate.date.year}, ${hour_string}:00`;
  }

  function initialiseMinistratDate () {
    //Declare local instance variables
    var ministrat_date_el = document.querySelector(ministrat.config.elements.topbar.date_canvas_selector);

    //Initialise date framework first
    initDateFramework();

    //Draw initial clock
    drawClock(ministrat.gamestate.date.hour);

    ministrat.date_handler_loop = setInterval(function () {
      var current_days_in_month = days_in_months[ministrat.gamestate.date.month - 1];

      //Leap year handling
      if (ministrat.gamestate.date.month == 2)
        if (isLeapYear(ministrat.gamestate.date.year))
          current_days_in_month = 29;

      //Increment hour
      ministrat.gamestate.date.hour += 0.1*0.16*ministrat.main.game_speed;

      if (ministrat.gamestate.date.hour >= 24) {
        ministrat.gamestate.date.hour = 0;
        ministrat.gamestate.date.day++;
      }
      if (ministrat.gamestate.date.day > current_days_in_month) {
        ministrat.gamestate.date.day = 1;
        ministrat.gamestate.date.month++;
      }
      if (ministrat.gamestate.date.month > 12) {
        ministrat.gamestate.date.month = 1;
        ministrat.gamestate.date.year++;
      }

      //Draw clock
      drawClock(ministrat.gamestate.date.hour);
      drawMinistratDate();

      //Pause animation handling
      if (ministrat.main.game_open)
        (ministrat.main.game_speed == 0) ? 
          ministrat_date_el.classList.add("paused") : 
          ministrat_date_el.classList.remove("paused");
    }, 16); //60FPS
  }

  function loadMinistratTopbar () {
    //Declare local instance variables
    var topbar_container_el = document.querySelector(ministrat.config.elements.topbar.topbar_container_selector);

    initialiseMinistratDate();

    //Time control button listeners
    var pause_button_el = topbar_container_el.querySelector(ministrat.config.elements.topbar.pause_button_selector);
    var speed_one_button_el = topbar_container_el.querySelector(ministrat.config.elements.topbar.speed_one_button_selector);
    var speed_two_button_el = topbar_container_el.querySelector(ministrat.config.elements.topbar.speed_two_button_selector);
    var speed_three_button_el = topbar_container_el.querySelector(ministrat.config.elements.topbar.speed_three_button_selector);

    pause_button_el.onclick = function (e) {
      setMinistratGameSpeed(0);
    };

    speed_one_button_el.onclick = function (e) {
      setMinistratGameSpeed(1);
    };

    speed_two_button_el.onclick = function (e) {
      setMinistratGameSpeed(2);
    };

    speed_three_button_el.onclick = function (e) {
      setMinistratGameSpeed(3);
    };
  }

  function resetAllTimeControlButtons () {
    //Declare local instance variables
    var topbar_container_el = document.querySelector(ministrat.config.elements.topbar.topbar_container_selector);
    
    var time_controls_el = topbar_container_el.querySelector(ministrat.config.elements.topbar.time_controls_selector);

    //Iterate over all_time_control_buttons
    var all_time_control_buttons = time_controls_el.querySelectorAll(".time-icon");

    for (var i = 0; i < all_time_control_buttons.length; i++)
      all_time_control_buttons[i].classList.remove("active");
  }

  function setMinistratGameSpeed (arg0_speed) {
    //Convert from parameters
    var speed = parseInt(arg0_speed);

    //Declare local instance variables
    var topbar_container_el = document.querySelector(ministrat.config.elements.topbar.topbar_container_selector);
    
    var pause_button_el = topbar_container_el.querySelector(ministrat.config.elements.topbar.pause_button_selector);
    var speed_one_button_el = topbar_container_el.querySelector(ministrat.config.elements.topbar.speed_one_button_selector);
    var speed_two_button_el = topbar_container_el.querySelector(ministrat.config.elements.topbar.speed_two_button_selector);
    var speed_three_button_el = topbar_container_el.querySelector(ministrat.config.elements.topbar.speed_three_button_selector);

    //Set game speed
    resetAllTimeControlButtons();
    if (speed == 0) {
      pause_button_el.classList.add("active");
      ministrat.main.game_speed = 0;
    } else if (speed == 1) {
      speed_one_button_el.classList.add("active");
      ministrat.main.game_speed = 1;
    } else if (speed == 2) {
      speed_two_button_el.classList.add("active");
      ministrat.main.game_speed = 3;
    } else if (speed == 3) {
      speed_three_button_el.classList.add("active");
      ministrat.main.game_speed = 5;
    }
  }
}
