if(typeof dotory.image == 'undefined'){
	dotory.image = {};
}

dotory.image.binding = function(){
	$('#img_btn').on('click', function() {
		var thiz = $('.dotory_image'); 
		thiz.css('display', 'block');
		thiz.animate( { top : '-400px' }, 750);
		
		$('.dotory_image_content').mCustomScrollbar({
			mouseWheel:{ enable: true },
			callbacks:{
				onTotalScroll:function(){
					dotory.image.container.infinitescroll('scroll');			    	
				}
			}
		});
	    
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
					img: '../../images/loading_black.gif'
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
	
	$('#image_back_btn').on('click', function(){
		var thiz = $('.dotory_image'); 
		thiz.animate( { top : '0px' }, 750, function(){
			thiz.css('display', 'none');
		});
	});
	$('#image_more_btn').on('click',function(){
		chrome.windows.create({url : "../source/image_web.html",type: "normal"});
	});
	dotory.image.loading();
};

dotory.image.loading = function(){
	var url = dotory.contextPath + '/image/list?page=1&userPn='+dotory.user.pn;
	
	$.getJSON(url, function(object){
		var data = object.data,
			images = data.images;
		
		dotory.image.container = $('.history_images');
		dotory.image.container.imageSearchFilter =  data.imageSearchFilter;
		
		if(object.code == 200){
			for(var i=0; i<images.length; i++){
				var image = images[i];
				var html = 	'<li>';
					html +=	'	<a href="'+image.link+'">';
					html += '		<img src="'+image.url+'"/>';
					html +=	'	</a>';
					html += '</li>';	
				dotory.image.container.append(html);
			}
		}
	});
	
};