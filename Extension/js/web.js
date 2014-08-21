$(function() {
	getUserInfo(false);
});

dotory.type = dotory.types.web;

if(typeof dotory.web == 'undefined'){
	dotory.web = {};
}

dotory.web.binding = function(){
	dotory.web.dateRange();
	dotory.web.searchCond();
	dotory.web.loading();
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
			images = data.images;
		
		dotory.web.container = $('.history_images');
		dotory.web.container.imageSearchFilter =  data.imageSearchFilter;
		
		if(object.code == 200){
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

dotory.web.content = function(){
	
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
				finishedMsg: 'No more pages to load.',
				img: '../../images/loading.gif'
			},
			appendCallback: false,
			parameter : '&userPn='+dotory.user.pn,
			maxPage : dotory.web.container.imageSearchFilter.pagination.numPages
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
};