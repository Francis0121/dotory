if (typeof dotory.metro == 'undefined') {
	dotory.metro = {};
}
/**
 * Metro Binding
 */
dotory.metro.binding = function() {
	dotory.metro.navBtn();
	dotory.metro.pageLoad();
};

dotory.metro.navBtn = function() {
	$('#img_btn').on('click', function() {
		// TODO Effect
		$('.dotory_image').show();
		
		var $container = dotory.image.container;
		// initialize Masonry after all images have loaded  
		$container.imagesLoaded( function() {
			$container.masonry({
				  columnWidth: 140,
				  itemSelector: '.history_images>li'
			});
		});
		
		$container.infinitescroll({
				debug : false,
				dataType: 'json',
				binder: $('.dotory_image_content'),
				navSelector  : '#page-nav',    // selector for the paged navigation 
				nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
				itemSelector : '.history_images>li',     // selector for all items you'll retrieve
				loading:{
					finishedMsg: 'No more pages to load.',
					img: '../../images/loading.gif'
				},
				appendCallback: false,
				parameter : '&userPn='+dotory.user.pn,
				maxPage : dotory.image.container.imageSearchFilter.pagination.numPages
			},
			// 	trigger Masonry as a callback
			function(object, opts) {
				var data = object.data, images = data.images;
				var content = '';
				if(object.code == 200){
					for(var i=0; i<images.length; i++){
						var image = images[i];
						var html = 	'<li>';
							html +=	'	<a href="'+image.link+'">';
							html += '		<img src="'+image.url+'"/>';
							html +=	'	</a>';
							html += '</li>';	
						content += html;
					}
				}
				
				// hide new items while they are loading
				var $newElems = $(content).css({ opacity: 0 });
				// ensure that images load before adding to masonry layout
				//$container.append(content).masonry('appended', content); 
				$newElems.imagesLoaded(function(){
					$('.history_images').append( $newElems ).masonry( 'appended', $newElems, true);
				});
			}
	    );
		
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
	var url= dotory.contextPath+'/visit/info',
		json={'userPn': dotory.user.pn };
	
	$.postJSON(url, json, function(object){
		var content = $('.dotory_content');
		content.html('');
		
		var data = object.data;
		
		if(object.code == 200){
			var ulFront =  '<ul class="dotory_icon clearfix" style="transform: translateZ(0px) translateX(0px) width:1000px">',
				ulBack = '</ul>';
			var sub = '';
			var visits=data.visits;
			var cnt=0;
			
			var color=['metro_color_blue','metro_color_green','metro_color_orange','metro_color_red',
			           'metro_color_purple','metro_color_grayBlue','metro_color_yellowOrange',
			           'metro_color_gray','metro_color_softGray'];
			
			for(var i=0;i<visits.length;i++){
				var count=visits[i].count;
				if(count>=3){																//자주 방문하는 페이지
					var url=visits[i].url;
					var title=visits[i].title;

					if(cnt%3 == 0){
						/*******************문자열 단어로 쪼개기**********************/
						var str=title.split(/\s/);
						
						if(cnt!=0){
							sub += ulBack;
							content.append(sub);
							sub = ulFront;
						}else{
							sub = ulFront;						
						}
					}
					sub += '<li>';
					sub += '	<div class="metro_background '+color[cnt%9]+'"></div>';		//color값 처리
					sub += '		<div class="metro_popup">';
					sub += '			<a class="metro_popup_link" href="'+url+'">'+title+'</a>';
					sub += '		</div>';
					sub += '	</div>';
					sub += '</li>';
				
					cnt++;
				}
			}
			sub += ulBack;
			content.append(sub);
		}
		dotory.metro.mousehover();
		dotory.metro.horizontalScroll();
	});
};