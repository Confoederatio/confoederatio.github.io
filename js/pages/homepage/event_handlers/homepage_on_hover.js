var hover_loop;
var hover_throttle = [];

window.onmouseover = function (e) {
  if (hover_loop) clearInterval(hover_loop);
  hover_loop = setInterval(function(){
    onParallaxHover(e);
  }, 100);
  hover_throttle.push("on_parallax_hover");
};

//Clear hover_throttle every 100ms
setInterval(function(){
  hover_throttle.splice(0, 1);
}, 100);
