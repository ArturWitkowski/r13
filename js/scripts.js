$(function() {
	
	function changeSlide() {
		if(index < numbOfImages - 1) {
			index++;
		}  else index = 0;
		
		var pointer = "#li" + index;
		$("#ctrl li").removeClass("pointer").addClass("circle");
		$(pointer).removeClass("circle").addClass("pointer");
		carouselList.animate({'marginLeft':-400}, 500, moveFirstSlide);
		
	}
	
	function reverseSlide() {
		if(index > 0) {
			index--;
		} else index = numbOfImages - 1;
		
		var pointer = "#li" + index;
		
		$("#ctrl li").removeClass("pointer").addClass("circle");
		$(pointer).removeClass("circle").addClass("pointer");
		moveLastSlide();
		
	}
	
	function moveFirstSlide() {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		
		lastItem.after(firstItem);
		carouselList.css({marginLeft:0});
	}
	
	function moveLastSlide() {
		carouselList = $("#carousel ul");
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		
		firstItem.before(lastItem);
		carouselList.css({marginLeft:-400});
		carouselList.animate({marginLeft:0}, 500);
	}
	
	
	
	function buildCtrl(a) {
		for (var i = 0; i < a; i++) {
			$("#ctrl > ul").append("<li id='li"+i+"'>&nbsp</li>");
			$("#ctrl > ul > li:last").click({ind: i}, function(e) {
				stopCaurosel();			
				while(index != e.data.ind){
					
					if (e.data.ind - index > 0) {
						changeSlide();
					} else if (e.data.ind - index < 0) {
						reverseSlide();
					} 
					
				};
			
			})
		}
	}
	
	function stopCaurosel() {
		interval = clearInterval(interval);
	}
	
	var index = 0;
	var carouselList = $("#carousel ul");
	var numbOfImages = $("#carousel > ul > li").length;
	
	
	$("#btn-left").click(function() {
		stopCaurosel();
		changeSlide();
	});
	$("#btn-right").click( function() {
		stopCaurosel();
		reverseSlide();
	});
	
	
	
	
	
	
	var interval = setInterval(changeSlide, 3000);
	buildCtrl(numbOfImages);
	
	$("#carousel img").click( function() {
		changeSlide();
		interval = clearInterval(interval);
		interval = setInterval(changeSlide, 3000);
	});


});
	