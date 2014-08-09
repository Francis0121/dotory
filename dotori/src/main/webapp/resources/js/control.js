if (typeof dotory.control == 'undefined') {
	dotory.control = {};
}

dotory.control.selectRegexList = function(){
	$('.dotroy_4partition_list>li').on('click', function(){
		var thiz = $(this), pn = thiz.attr('data-pn');
			shape = thiz.attr('data-shape');
		var putForm = document.forms['putRegex'],
			deleteForm = document.forms['deleteRegex'];
		
		putForm.pn.value = pn;
		putForm.shape.value = shape;
		
		deleteForm.pn.value = pn;
		$('#dotory_delete_regex').html(pn);
	});
};

dotory.control.onParsing = function(){
	$('#dotory_url_post').on('click', dotory.control.urlPost);
	
	$('#dotory_list_post').on('click', dotory.control.listPost);
	
	$('.dotory_url_menu').on('click', dotory.control.menuOnOff);
};

dotory.control.urlPost = function(){
	var thiz = $('#dotory_url_input'),
		url = contextPath + '/parsing/url',
		json = { url : thiz.val() };
	
	$.postJSON(url, json, function(object){
		var data = object.data;
		if(object.code == 200){
			var images = data.images;
			
			$('.dotory_url_parsing_data_wrap[data-type=html]>div').html('<pre>'+data.text+'</pre>');
			
			for(var i=0; i < images.length; i++){
				if(i == 0)
					$('.dotory_url_parsing_data_wrap[data-type=image]>div').html('<img src="'+images[i].url+'"/>');
				else
					$('.dotory_url_parsing_data_wrap[data-type=image]>div').append('<img src="'+images[i].url+'"/>');
			}
		}
	});
};

dotory.control.listPost = function(){
	var url = contextPath + '/parsing/list',
		json = {};
	
	$.postJSON(url, json, function(object){
		var data = object.data,
			parsings = data.parsings;
		if(object.code == 200){
			for(var i=0; i<parsings.length; i++){
				$('.dotory_url_list').append('<li>'+parsings[i].url+' '+parsings[i].title+'</li>');
			}
		}
	});
	
};

dotory.control.menuOnOff = function(){
	var thiz = $(this),
		attr = thiz.attr('data-type');
	
	if(attr == 'html'){
		$('.dotory_url_parsing_data_wrap[data-type=image]').hide();
		$('.dotory_url_parsing_data_wrap[data-type=html]').show();
	}else{
		$('.dotory_url_parsing_data_wrap[data-type=html]').hide();
		$('.dotory_url_parsing_data_wrap[data-type=image]').show();
	}
};

