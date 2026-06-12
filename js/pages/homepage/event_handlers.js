function initEventHandlers () {
	var hover_loop;
	var hover_throttle = [];
	
	//Clear hover_throttle every 100ms
	setInterval(function(){
		hover_throttle.splice(0, 1);
	}, 100);
	
	window.onmouseover = function (e) {
		if (hover_loop) clearInterval(hover_loop);
		hover_loop = setInterval(function(){
			viewport_two?.onParallaxHover(e);
		}, 100);
		hover_throttle.push("on_parallax_hover");
	};
	window.onscroll = function (e) {
		//Declare local instance variables
		var delta_y = window.pageYOffset || document.documentElement.scrollTop;
		var vh_scroll = (window.scrollY/window.innerHeight)*100;
		
		//Event handler functions
		viewport_one.homepageBannerTitleAdjustPosition();
		viewport_one.triumphAndTragedyOnScroll();
		
		//Parallax scrolling for other labels
		homepageAboutOnScroll();
	}
}
initEventHandlers();