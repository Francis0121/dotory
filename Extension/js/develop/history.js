
if(typeof dotory.history == 'undefined'){
	dotory.history = {};
}

/**
 * History Binding
 */
dotory.history.binding = function(){
	
	$('#history_btn').on('click', function() {
		var thiz = $('.dotory_history'); 
		thiz.css('display', 'block');
		thiz.animate( { left : '0px' }, 750);
	});
	
	$('#history_back_btn').on('click', function(){
		var thiz = $('.dotory_history'); 
		thiz.animate( { left : '600px' }, 750, function(){
			thiz.css('display', 'none');			
		});
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
