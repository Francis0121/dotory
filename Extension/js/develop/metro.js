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
		
		popup.animate({top:'-90px'},300);
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
	var sendUrl=new Array();
	
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
				var count=visits[i].count;												//자주 방문하는 페이지
				var url=visits[i].url;
				var title=visits[i].title;
				var keyword=visits[i].keyword;
				
				/************************************/
				sendUrl[i]=url;
				/************************************/
				
				if(cnt%3 == 0){					
					if(cnt!=0){
						sub += ulBack;
						content.append(sub);
						sub = ulFront;
					}else{
						sub = ulFront;						
					}
				}
				sub += '<li>';
				sub += '	<div class="metro_background '+color[cnt%9]+'">';
				sub += ' 	'+keyword;
				sub += '	</div>';		//color값 처리
				sub += '	<div class="metro_popup">';
				sub += '		<a class="metro_popup_link" href="'+url+'" id="urls'+i+'">'+title+'</a>';
				sub += '	</div>';
				sub += '</li>';
			
				cnt++;
			
			}
			sub += ulBack;
			content.append(sub);

		}
		dotory.metro.mousehover();
		dotory.metro.horizontalScroll();
	});
	console.log("???");
	openUrl(sendUrl);
	console.log("!!!");
};

function openUrl(url){
	var id=new Array();
	for(var i=0;i<url.length;i++){
		id='urls'+i;
		console.log(id+"  "+url[i]);
		var temp=document.getElementById("id").value;
		console.log(temp);
//		temp.addEventListener("click",function(){chrome.tabs.create('url[i]');},false);
	}
	
};
