$(function() {
	getUserInfo(false);
});

dotory.type = dotory.types.web;

if(typeof dotory.web == 'undefined'){
	dotory.web = {};
}

dotory.web.binding = function(){
	dotory.web.data();
	dotory.web.dateRange();
	dotory.web.searchCond();
	dotory.web.loading();
	dotory.web.search();
	dotory.web.topBtn();
};

dotory.web.topBtn = function(){
	
	$('#scroll_top').bind('click', function(){
		$('html, body').animate({scrollTop:0}, 'slow');
	});
	
	move = function(){
		var wrap =$('.scroll_top_wrap')
			element = document.documentElement, body = document.body,
			scrollY = document.all ? (!element.scrollTop ? body.scrollTop : element.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);	
		
		if(scrollY == 100){
			wrap.slideUp('fast');
		}else{
			wrap.slideDown('fast');
		}
	};

	$(window).scroll(move);
};

dotory.web.search = function(){
	$('#btn_search').on('click', function(){
		var url = dotory.contextPath + '/image/list?page=1&userPn='+dotory.user.pn,
			json = {	page : 1,
						userPn : dotory.user.pn,
						from : $('#web_datepicker_1').val(),
						to : $('#web_datepicker_2').val(),
						width : $('#web_width').val(),
						height : $('#web_height').val(),
						color : $('#web_color').val()};
		
		$.getJSON(url, json, function(object){
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
				$('.history_images').html('');
				dotory.web.container = $('.history_images');
				dotory.web.container.imageSearchFilter = data.imageSearchFilter;
				dotory.web.content();
				// hide new items while they are loading
				var $newElems = $(content).css({ opacity: 0 });
				// ensure that images load before adding to masonry layout 
				$newElems.imagesLoaded(function(){
					$('.history_images').append( $newElems ).masonry( 'appended', $newElems, true);
				});
			}
		});
	});
};

dotory.web.data = function(){
	
	$.getJSON(dotory.contextPath+'/colors', function(object){
		var data = object.data;
		if(object.code == 200){
			var colors = data.colors,
				thiz = $('#web_color');
			
			for(var i=0; i<colors.length; i++){
				var color = colors[i];
				var html = '<option value="'+color.pn+'">';
				html += color.enName;
				html += '</option>';
				
				thiz.append(html);
			}
		}
	});
};

dotory.web.dateRange = function(){
	$('#web_datepicker_1').datepicker({
		dateFormat: 'dd-mm-yy',
		defaultDate: '+1w',
		changeMonth: true,
		onClose: function( selectedDate ) {
			$('#web_datepicker_2').datepicker('option', 'minDate', selectedDate);
		}
	});
	$('#web_datepicker_2').datepicker({
		dateFormat: 'dd-mm-yy',
		defaultDate: "+1w",
		changeMonth: true,
		onClose: function( selectedDate ) {
			$('#web_datepicker_1').datepicker('option', 'maxDate', selectedDate);
		}
	});
};

dotory.web.searchCond = function(){
	$('#btn_searchCond').on('click', function(){
		if($('.web_search_condition').css('display') == 'none'){			
			$('.web_search_condition').show();
		}else {
			$('.web_search_condition').hide();
		}
	});
};

dotory.web.loading = function(){
	var url = dotory.contextPath + '/image/list?page=1&userPn='+dotory.user.pn;
	
	$.getJSON(url, function(object){
		var data = object.data,
			images = data.images,
			isf =data.imageSearchFilter;
		
		if(object.code == 200){
			dotory.web.container = $('.history_images');
			dotory.web.container.imageSearchFilter = isf;
			$('#web_datepicker_1').val(isf.from);
			$('#web_datepicker_2').val(isf.to);
			$('#web_width').val(isf.width);
			$('#web_height').val(isf.height);
			for(var i=0; i<images.length; i++){
				var image = images[i];
				var html = 	'<li>';
					html +=	'	<a href="'+image.link+'">';
					html += '		<img src="'+image.url+'"/>';
					html +=	'	</a>';
					html += '</li>';	
				dotory.web.container.append(html);
			}
			dotory.web.content();
		}
	});
	
};

dotory.web.content = function(json_parameter){
	var json = {	
			userPn : dotory.user.pn,
			from : $('#web_datepicker_1').val(),
			to : $('#web_datepicker_2').val(),
			width : $('#web_width').val(),
			height : $('#web_height').val(),
			color : $('#web_color').val()};
	
	var parameter = '&'+EncodeQueryData(json);
	var $container = $('.history_images');
	// initialize Masonry after all images have loaded  
	$container.imagesLoaded( function() {
		$container.masonry({
				'columnWidth': 250,
				'itemSelector': '.history_images>li'
		});
	});

	$container.infinitescroll({
			debug : false,
			dataType: 'json',
			binder: $(window),
			navSelector  : '#page-nav',    // selector for the paged navigation 
			nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
			itemSelector : '.history_images>li',     // selector for all items you'll retrieve
			loading:{
				finishedMsg: '',
				img: ''
			},
			appendCallback: false,
			parameter : parameter//,
			//maxPage : dotory.web.container.imageSearchFilter.pagination.numPages
		},
		// 	trigger Masonry as a callback
		function(object, opts) {
			var data = object.data, images = data.images;
			var content = '';
			if(object.code == 200){
				dotory.web.container.imageSearchFilter = data.imageSearchFilter;
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
			$newElems.imagesLoaded(function(){
				$('.history_images').append( $newElems ).masonry( 'appended', $newElems, true);
			});
		}
    );
};

function EncodeQueryData(data){
	var ret = [];
	for (var d in data)
	 ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
	return ret.join("&");
}