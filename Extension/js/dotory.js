$(function(){
	dotory.metro.binding();
	dotory.history.binding();
	dotory.image.binding();
});

if(typeof dotory == 'undefined'){
	dotory = {};
}

if(typeof dotory.metro == 'undefined'){
	dotory.metro = {};
}
/**
 * Metro Binding
 */
dotory.metro.binding = function(){
	dotory.metro.navBtn();
};

dotory.metro.navBtn = function(){
	$('#img_btn').on('click', function(){
		// TODO Effect
		$('.dotory_image').show();
	});
	
	$('#history_btn').on('click', function(){
		// TODO Effecf
		$('.dotory_history').show();
	});
};

if(typeof dotory.history == 'undefined'){
	dotory.history = {};
}

/**
 * History Binding
 */
dotory.history.binding = function(){
	$('#history_back_btn').on('click', function(){
		// TODO Effecf
		$('.dotory_history').hide();
	});

	// style testing sample data ~ TODO delete
	dotory.history.testing();
};

dotory.history.testing = function(){
	
	var parent = $('.opened_page_list_wrap'),
		li = parent.children('li');
	
	for(var i=0; i<10; i++){
		parent.append(li.clone());
	}
	
	parent = $('.history_list_wrap');
	li = parent.children('li');
	
	for(var i=0; i<10; i++){
		parent.append(li.clone());
	}
};

if(typeof dotory.image == 'undefined'){
	dotory.image = {};
}

dotory.image.binding = function(){
	$('#image_back_btn').on('click', function(){
		// TODO Effecf
		$('.dotory_image').hide();
	});

	// style testing sample data ~ TODO delete
	dotory.image.testing();
};