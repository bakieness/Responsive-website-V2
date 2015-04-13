/* JavaScript Document */

var windowSize = '';
var windowWidth = 0;
var actualSize = 0;
var firstRun = true;

$(document).ready(function() {
	checkBrowserSize();
	setInterval('checkBrowserSize()',100);
	
	$('header').css('background-image','none');
	
	$('a.mobile_menu').on('click',function(){
		var navHeight = $('nav').height();
		var newNavHeight = $('nav div').height();
		
		if(navHeight == 0){
			$('nav').animate({'height':newNavHeight+'px'},500)
			$(this).addClass('selected');
		}else{
			$('nav').animate({'height':'0px'},500)
			$(this).removeClass('selected');
		}
	});
});

function animateHero(){
	if(firstRun){
		firstRun = false;
		$('#hero img').imgpreload(function(){
			$('#hero .panel img').css({'opactiy':0,'right':'-100px'}).animate({opactiy:1,'right':'0px'},2000);
			$('#hero .panel .caption').css({'opactiy':0,'left':'-75%'}).animate({opactiy:1,'left':'0px'},2000);
			
			var logoPosition = $('header a.logo').position();
			$('header a.logo').css({'opacity':0,'top':'0px'}).delay(500).animate({opacity:1,'top':logoPosition.top+'px'},1000, function(){
				$(this).removeAttr('style');
			});
		});
	}
}

function checkBrowserSize(){
	windowWidth = window.outerWidth;
	var contentWidth = $('body').width();
	var sizeDiff = windowWidth - contentWidth;
	actualSize = windowWidth - sizeDiff;
	
	if(actualSize > 800){ newWindowSize = 'large';}
	if(actualSize <= 800 && actualSize > 500){ newWindowSize = 'medium';}
	if(actualSize <= 500){ newWindowSize = 'small';}
	
	if(windowSize != newWindowSize){
		windowSize = newWindowSize;
		loadHero();
	}
}

function loadHero(){
	if(windowSize == 'large'){
		$('nav').css('height','auto');
		$('#hero').load('content/hero_content_large.html', function(){animateHero();});
	}	
	if(windowSize == 'medium'){
		if(actualSize > 500){
			$('nav').css('height','auto');
		}
		$('#hero').load('content/hero_content_medium.html', function(){animateHero();});
	}	
	if(windowSize == 'small'){
		if(actualSize <= 500){
			$('nav').css('height','0px');
		}
		$('#hero').html('');
		$('a.mobile_menu').removeClass('selected');
		firstRun = false;
	}
}