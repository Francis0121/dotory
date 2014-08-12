if (typeof dotory.metro == 'undefined') {
	dotory.metro = {};
}
/**
 * Metro Binding
 */
dotory.metro.binding = function() {
	dotory.metro.navBtn();
	dotory.metro.horizontalScroll();
	dotory.metro.mousehover();
	dotory.metro.pageLoad();
};

dotory.metro.navBtn = function() {
	$('#img_btn').on('click', function() {
		// TODO Effect
		$('.dotory_image').show();
	});

	$('#history_btn').on('click', function() {
		// TODO Effecf
		$('.dotory_history').show();
	});
};

dotory.metro.horizontalScroll = function() {
	jQuery(function($) {
		'use strict';
		(function() {
			var $frame = $('#basic');
			var $slidee = $frame.children('div').eq(0);
			var $wrap = $frame.parent();

			// Call Sly on frame
			$frame.sly({
				horizontal : 1,
				itemNav : 'basic',
				smart : 1,
				activateOn : 'click',
				mouseDragging : 1,
				touchDragging : 1,
				releaseSwing : 1,
				startAt : 0,
				scrollBar : $wrap.find('.scrollbar'),
				scrollBy : 1,
				pagesBar : $wrap.find('.pages'),
				activatePageOn : 'click',
				speed : 300,
				elasticBounds : 1,
				easing : 'easeOutExpo',
				dragHandle : 1,
				dynamicHandle : 1,
				clickBar : 1,

			});
		}());
	});	
};

dotory.metro.mousehover=function(){
	$('.dotory_icon>li').hover(function(){
		var thiz = $(this),
			popup = thiz.children('.metro_popup'),
			background = thiz.children('.metro_background');
		
		popup.animate({top:'-85px'},300);
		background.animate({opacity:'.6'},300);
	}, function(){
		var thiz = $(this),
			popup = thiz.children('.metro_popup'),
			background = thiz.children('.metro_background');
		popup.animate({top:'0px'},300);
		background.animate({opacity:'1.0'},300);
	});
};

dotory.metro.pageLoad=function(){
	var url='http://localhost:8080/visit/info',
		json={'userPn':1};
	
	$.postJSON(url, json, function(object){
		console.log(object);
	});
};
