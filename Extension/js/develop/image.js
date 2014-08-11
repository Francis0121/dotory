if(typeof dotory.image == 'undefined'){
	dotory.image = {};
}

dotory.image.binding = function(){
	$('#image_back_btn').on('click', function(){
		// TODO Effecf
		$('.dotory_image').hide();
	});
	
	$('.history_images').imagesLoaded(function(){
		$('.history_images').masonry({
			itemSelector : '.history_images>li',
			columnWidth : 140,
			transitionDuration: 0.
		});
	});
};