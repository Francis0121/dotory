
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
		thiz.animate( { top : '-400px' }, 750);
	});
	
	$('#history_back_btn').on('click', function(){
		var thiz = $('.dotory_history'); 
		thiz.animate( { top : '0px' }, 750, function(){
			thiz.css('display', 'none');			
		});
	});

	// style testing sample data ~ TODO delete
//	dotory.history.testing();
	dotory.history.loading();
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

dotory.history.loading=function(){
	var url=dotory.contextPath+'/history/keyword',
		json={'userPn':dotory.user.pn};
	
	$.getJSON(url, json,function(object){
		var data = object.data;
	
			dotory.history.container= $('.opened_page_list_wrap'); 
			
			if(object.code==200){	
//				console.log("total keywords load success");
				var keywords=data.keywords;
				console.log(keywords.length);
				for(var i=0; i<keywords.length; i++){
					var keyword = keywords[i];
					var html = 	'<li>';
						html +=	'	<input type="checkbox" class="opened_page_check"/>';
						html += '		<a href="">'+keyword+'</a>';
						html += '</li>';	
					dotory.history.container.append(html);
				}
			}
	});
};
