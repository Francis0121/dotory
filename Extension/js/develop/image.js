if(typeof dotory.image == 'undefined'){
	dotory.image = {};
}

dotory.image.binding = function(){
	$('#image_back_btn').on('click', function(){
		// TODO Effecf
		$('.dotory_image').hide();
	});
	
	dotory.image.loading();
};

dotory.image.loading = function(){
	var url = dotory.contextPath + '/image/list',
		json = { 'userPn' : dotory.user.pn };
	
	$.postJSON(url, json, function(object){
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
//		setTimeout('dotory.image.pagination()', 0);
	});
	
};

dotory.image.pagination = function(){
	var $c = dotory.image.container;
	$c.scrollPagination({
		'contentPage'	: dotory.contextPath + '/image/list',
		'scrollTarget'	: $('.dotory_image_content'),
		'successCallback' : function(images){
			var htmlArray = '';
			for(var i=0; i<images.length; i++){
				var image = images[i];
				var html = 	'<li>';
					html +=	'	<a href="'+image.link+'">';
					html += '		<img src="'+image.url+'"/>';
					html +=	'	</a>';
					html += '</li>';	
				htmlArray += html;
			}
			$c.append(htmlArray).masonry('appended',htmlArray, true);
			$c.imagesLoaded(function(){
				$c.masonry('reload');
			});
		}
	});
}

