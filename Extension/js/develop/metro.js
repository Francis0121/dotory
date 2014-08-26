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
		var	popup2 = thiz.children('.metro_half_popup'),
			background2 = thiz.children('.metro_half_background');
		
		popup.animate({top:'-100px'},300);
		background.animate({opacity:'.6'},300);
		popup2.animate({top:'-100px'},300);
		background2.animate({opacity:'.6'},300);
		
	}, function(){
		var thiz = $(this),
			popup = thiz.children('.metro_popup'),
			background = thiz.children('.metro_background');
		var	popup2 = thiz.children('.metro_half_popup'),
			background2 = thiz.children('.metro_half_background');
	
		popup.animate({top:'0px'},300);
		background.animate({opacity:'1.0'},300);
		popup2.animate({top:'0px'},300);
		background2.animate({opacity:'1.0'},300);
	});
};

dotory.metro.pageLoad=function(){
	console.log('loading... start');
	var url= dotory.contextPath+'/visit/info',
		json={'userPn': dotory.user.pn };
	var sendUrl=new Array();
	var flag=false,
		flagCnt=0;
	
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
				var count=visits[i].count,
					url=visits[i].url,
					title=visits[i].title,
					keyword=visits[i].keyword,
					domain=visits[i].domain,
					favicon=visits[i].favicon;
				
				var headText = '';
				if(keyword == null || keyword == undefined || keyword == ''){
					headText = domain.replace(/http:\/\//, '');
					headText = headText.replace(/https:\/\//, '');
					headText = headText.replace(/\//, '');
					headText = headText.replace(/(\.co)?\.[\w]*$/, '');
					headText = headText.replace(/www./, '');
				}else{
					headText = keyword;
				}
				
				sendUrl[i]=url;
				
				/*******************타이틀 긴거 짜르기*********************/				
				var cutTitle=new Array();
				if(title.length>30){
					var cut=['\.', '\-' , '\>'];
					for(var j=0;j<cut.length;j++){
						if(title.match(cut[j])){
							cutTitle[cutTitle.length] = title.split(cut[j]);
						}
					}					
					title=cutTitle[0][0];	
				}
				/*****************************************************/
				console.log("length : "+headText.length);
				console.log(title);
				console.log(url);
				if(cnt%3 == 0){					
					if(cnt!=0){
						sub += ulBack;
						content.append(sub);
						sub = ulFront;
					}else{
						sub = ulFront;						
					}
				}
				
				if(favicon != null && favicon != undefined && favicon != '' ){ //favicon 가져오기 
					if(headText.length<=6 || flag==true){

						sub += '<li style="width: 90px">';
						sub += '	<div class="metro_half_background" id="metro_background_'+i+'">';
						sub += '		<img src="'+favicon+'" title="Favicon" class="favion_onload" data-index="'+i+'"/>';
						sub += ' 		<span>'+headText+'</span>';
						sub += '	</div>';		//color값 처리
						
						sub += '	<div class="metro_half_popup">';
						sub += '		<a class="metro_half_popup_link" href="'+url+'" id="urls'+i+'">'+title+'</a>';
						sub += '	</div>';
						sub += '</li>';
						
						flagCnt++;
						if(flagCnt%2==1) //작게한 그 다음것도 작게 만들기
							flag=true;
						else
							flag=false;
						
							
					}else{
						sub += '<li>'
						sub += '	<div class="metro_background" id="metro_background_'+i+'">';
						sub += '		<img src="'+favicon+'" title="Favicon" class="favion_onload" data-index="'+i+'"/>';
						sub += ' 		<span>'+headText+'</span>';
						sub += '	</div>';		//color값 처리
						
						sub += '	<div class="metro_popup">';
						sub += '		<a class="metro_popup_link" href="'+url+'" id="urls'+i+'">'+title+'</a>';
						sub += '	</div>';
						sub += '</li>';
					
					}
				}
//				else{	// favicon 없을 때
//				sub += '	<div class="metro_background '+color[cnt%9]+'">';
//				sub += ' 		<span>'+headText+'</span>';
//				sub += '	</div>';		//color값 처리	
//				}
				
				else{	// favicon 없을 때
					if(headText.length<=6 || flag==true){
						sub += '<li style="width: 90px">';
						sub += '	<div class="metro_half_background" id="metro_background_'+i+'">';
						sub += '		<img src="'+favicon+'" title="Favicon" class="favion_onload" data-index="'+i+'"/>';
						sub += ' 		<span>'+headText+'</span>';
						sub += '	</div>';		//color값 처리
						
						sub += '	<div class="metro_half_popup">';
						sub += '		<a class="metro_half_popup_link" href="'+url+'" id="urls'+i+'">'+title+'</a>';
						sub += '	</div>';
						sub += '</li>';

						flagCnt++;
						if(flagCnt%2==1) //작게한 그 다음것도 작게 만들기
							flag=true;
						else
							flag=false;
						
					}else{
						sub += '<li>'
						sub += '	<div class="metro_background '+color[cnt%9]+'" id="metro_background_'+i+'">';
						sub += ' 		<img src="../images/defalt-favicon.png" title="Favicon" class="favion_onload" data-index="'+i+'"/>';
						sub += ' 		<span>'+headText+'</span>';
						sub += '	</div>';		//color값 처리	
						
						sub += '	<div class="metro_popup">';
						sub += '		<a class="metro_popup_link" href="'+url+'" id="urls'+i+'">'+title+'</a>';
						sub += '	</div>';
						sub += '</li>';
					}
				}
				
				cnt++;
				
			}
			sub += ulBack;
			content.append(sub);
			
		}
		dotory.metro.mousehover();
		dotory.metro.horizontalScroll();
		dotory.metro.onloadImage();

		openUrl(sendUrl);
		console.log('loadin End');
		dotory.loading.finsih(); // sign-in-loading-finish && load-metro (ajax send message finish)
	});
};

dotory.metro.onloadImage = function(){
	
	$('.favion_onload').load(function() {
		var thiz = this;
		if(thiz.width == 0 || thiz.height == 0) 
			return;
		
		var canvas = $('<canvas/>')[0];
		canvas.width = thiz.width;
		canvas.height = thiz.height;
		canvas.getContext('2d').drawImage(thiz, 0, 0, thiz.width, thiz.height);
					
		var data = canvas.getContext('2d').getImageData(0, 0, thiz.width, thiz.height).data;		
		var colors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for(var j=0; j<thiz.width*thiz.height*4; j+=4){
			var hsl = extraction.fromRgbToHsl(data[j+0], data[j+1], data[j+2]);
			colors[extraction.fromHslToColor(hsl.hue, hsl.sat, hsl.lgt)]+=1;
		} 
		var max = colors.indexOf(Math.max.apply(Math, colors));

		var index = $(this).attr('data-index');
		switch (max) {
		case 1: // ~ black
			$('#metro_background_'+index).addClass('metro_color_gray');
			break;
		case 2: // ~ white
			$('#metro_background_'+index).addClass('metro_color_white');
			break;
		case 3: // ~ gray
			$('#metro_background_'+index).addClass('metro_color_softGray');
			break;
		case 4: // ~ red
			$('#metro_background_'+index).addClass('metro_color_redGra');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
			break;
		case 5: // ~ yellow
			$('#metro_background_'+index).addClass('metro_color_yellowOrange');
			break;
		case 6: // ~ green
			$('#metro_background_'+index).addClass('metro_color_green');
			break;
		case 7: // ~ cyan
			$('#metro_background_'+index).addClass('metro_color_grayBlue');
			break;
		case 8: // ~ blue
			$('#metro_background_'+index).addClass('metro_color_blue');
			break;
		case 9: // ~ magenta
			$('#metro_background_'+index).addClass('metro_color_purple');
			break;
			
		default:
			break;
		}
		
	}).error(function() {  
		// ~ Error Handler
	});
};

function openUrl(url){
	var id=new Array();
	console.log("In fuction : "+url);
	for(var i=0;i<url.length;i++){
		(function(){
			id='urls'+i;
			var temp=document.getElementById(id);
			var location=temp.href;
			temp.onclick=function(){
				chrome.tabs.create({url:location});
			};
		})();
	}
};