if (typeof dotory.metro == 'undefined') {
	dotory.metro = {};
}
/**
 * Metro Binding
 */
dotory.metro.binding = function() {
	dotory.metro.navBtn();
	dotory.metro.horizontalScroll();
	dotory.metro.pageLoad();
};

dotory.metro.navBtn = function() {
	$('#img_btn').on('click', function() {
		// TODO Effect
		$('.dotory_image').show();
		
		$('.history_images').imagesLoaded(function(){
			$('.history_images').masonry({
				itemSelector : '.history_images>li',
				columnWidth : 140,
				transitionDuration: 0.
			});
		});
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
	$('.dotory_icon>li').off('mouseover').off('mouseout');
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
		var content = $('.dotory_content');
		content.html('');
		
		var data = object.data;
		if(object.code == 200){
			var ulFront =  '<ul class="dotory_icon clearfix" style="transform: translateZ(0px) translateX(0px) width:1000px">',
				ulBack = '</ul>';
			var sub = '';
			var visits=data.visits;
			var color=['metro_color_blue','metro_color_green','metro_color_orange','metro_color_red',
			           'metro_color_purple','metro_color_grayBlue','metro_color_yellowOrange',
			           'metro_color_gray','metro_color_softGray'];
			
			for(var i=0;i<visits.length;i++){
				var url=visits[i].url;
				var title=visits[i].title;
				if(i%3 == 0){
					if(i!=0){
						sub += ulBack;
						content.append(sub);
						sub = ulFront;
					}else{
						sub = ulFront;						
					}
				}
				sub += '<li>';
				sub += '	<div class="metro_background '+color[i%9]+'"></div>';		//color값 처리
				sub += '		<div class="metro_popup">';
				sub += '			<a class="metro_popup_link" href="'+url+'">'+title+'</a>';
				sub += '		</div>';
				sub += '	</div>';
				sub += '</li>';
			}
			sub += ulBack;
			content.append(sub);
		}
		dotory.metro.mousehover();
	});
};