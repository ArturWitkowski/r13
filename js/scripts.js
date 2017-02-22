$(function () {
	
	var CONSTANT = {
		CAROUSEL_FRAME_WIDTH: 400,
		SLIDE_CHANGE_TIME: 300,
		SLIDE_FAST_CHANGE_TIME: 100,
		SLIDE_CHANGE_LEFT_DIR: 'left',
		SLIDE_CHANGE_RIGHT_DIR: 'right',
		SLIDE_LAST: 'last',
		SLIDE_FIRST: 'first',
		INTERVAL_TIME: 3000
		
	};
	
	function changeSlide(direction, time) {
		
		switch (direction) {
			case CONSTANT.SLIDE_CHANGE_LEFT_DIR:
				
				index < (numbOfImages - 1) ? index++ : index = 0;
				var pointer = "#li" + index;
				
				$("#ctrl li").removeClass("pointer").addClass("circle");
				$(pointer).removeClass("circle").addClass("pointer");
				carouselList.animate({marginLeft: -1 * CONSTANT.CAROUSEL_FRAME_WIDTH}, time, function(){
					moveSlide(CONSTANT.SLIDE_FIRST)
				});
				break;
				
			case CONSTANT.SLIDE_CHANGE_RIGHT_DIR:
				index > 0 ? index-- : index = numbOfImages - 1;				
				var pointer = "#li" + index;
				
				$("#ctrl li").removeClass("pointer").addClass("circle");
				$(pointer).removeClass("circle").addClass("pointer");
				carouselList.animate({'marginLeft':0}, time, function(){
					moveSlide(CONSTANT.SLIDE_LAST)
				});
				break;
		}
		
	}
	
	
	
	
	function moveSlide(position) { 
		carouselList = $("#carousel ul");
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		
		switch (position) {
			case CONSTANT.SLIDE_FIRST:
				
				lastItem.after(firstItem);
			
				carouselList.css('margin-left', 0);
				console.log('a qq');			
				break;
				
			case CONSTANT.SLIDE_LAST:
				firstItem.before(lastItem);				
				carouselList.css('margin-left', -400);
				break;
				
		}
		carouselList.animate({'marginLeft': 0}, CONSTANT.SLIDE_CHANGE_TIME);	
	}
	
		
	
	function buildCtrl(numberOfSlides) {
		for (var i = 0; i < numberOfSlides; i++) {
			$("#ctrl > ul").append("<li id='li"+i+"'></li>");
			$("#ctrl > ul > li:last").click({ind: i}, function(e) {
				stopCaurosel();			
				while(index != e.data.ind){
					
					if (e.data.ind - index > 0) {
						changeSlide(CONSTANT.SLIDE_CHANGE_LEFT_DIR, CONSTANT.SLIDE_FAST_CHANGE_TIME );
					} else if (e.data.ind - index <= 0) {
						changeSlide(CONSTANT.SLIDE_CHANGE_RIGHT_DIR, CONSTANT.SLIDE_FAST_CHANGE_TIME );
					} 
				};
			})
		}
		$("#ctrl li").addClass("circle");
		$("#ctrl li:first").removeClass("circle").addClass("pointer");
	}
	
	
	
	function stopCaurosel() {
		interval = clearInterval(interval);
		$("#info").css("display", "block");
	}
	
	
	var index = 0;
	var carouselList = $("#carousel ul");
	var numbOfImages = $("#carousel > ul > li").length;
	var pointer;
	
	
	$("#btn-left").click(function() {
		stopCaurosel();
		changeSlide(CONSTANT.SLIDE_CHANGE_LEFT_DIR, CONSTANT.SLIDE_CHANGE_TIME);
	});
	$("#btn-right").click( function() {
		stopCaurosel();
		changeSlide(CONSTANT.SLIDE_CHANGE_RIGHT_DIR, CONSTANT.SLIDE_CHANGE_TIME);
	});
	

	var interval = setInterval(changeSlide, CONSTANT.INTERVAL_TIME, CONSTANT.SLIDE_CHANGE_LEFT_DIR);
	buildCtrl(numbOfImages);
	

	$("#carousel img").click( function() {
		changeSlide(CONSTANT.SLIDE_CHANGE_LEFT_DIR);
		interval = clearInterval(interval);
		interval = setInterval(changeSlide, CONSTANT.INTERVAL_TIME, CONSTANT.SLIDE_CHANGE_LEFT_DIR);
		$("#info").css("display", "none");
	});



});
	