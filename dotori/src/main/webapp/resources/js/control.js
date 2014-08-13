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
	
	dotory.control.listPost();
};

dotory.control.urlPost = function(){
	var thiz = $('#dotory_url_input'),
		url = contextPath + '/parsing/url',
		json = { url : thiz.val() };
	
	$.postJSON(url, json, function(object){
		var data = object.data;
		if(object.code == 200){
			var images = data.images;
			
			$('.dotory_url_parsing_data_wrap[data-type=html]>div').html('<pre>'+data.htmlImage+'</pre>');
			$('.dotory_url_parsing_data_wrap[data-type=html2]>div').html('<pre>'+data.htmlTitle+'</pre>');
			$('.dotory_url_parsing_data_wrap[data-type=image]>div').html('Total Image Count : ' + images.length);
	 
			for(var i=0; i < images.length; i++){
				$('.dotory_url_parsing_data_wrap[data-type=image]>div').append('<img src="'+images[i].url+'"/>');
			}
		}
	});
};

dotory.control.detail = function(){
	$('.dotory_url_list>li').off('click').on('click', function(){
		var thiz = $(this),
			pn = thiz.attr('data-pn'),
			url = contextPath + '/parsing/detail',
			json = { 'pn' : pn };
	
		$.postJSON(url, json, function(object){
			var data = object.data;
			
			if(object.code == 200){
				var images = data.images;
				
				$('.dotory_url_parsing_data_wrap[data-type=html]>div').html('<pre>'+data.htmlImage+'</pre>');
				$('.dotory_url_parsing_data_wrap[data-type=html2]>div').html('<pre>'+data.htmlTitle+'</pre>');
				$('.dotory_url_parsing_data_wrap[data-type=image]>div').html('Total Image Count : ' + images.length);
				$('.dotory_url_parsing_data_wrap[data-type=title]>div').html(data.titleText);
		 
				for(var i=0; i < images.length; i++){
					$('.dotory_url_parsing_data_wrap[data-type=image]>div').append('<img src="'+images[i].url+'"/>');
				}
			}
			
		});
	});
};

dotory.control.listPost = function(){
	var url = contextPath + '/parsing/list';

	if(dotory.control.parsingFilter != undefined && dotory.control.parsingFilter != ''){
		var page = dotory.control.parsingFilter.page+1;
		url+='?page='+page;			
	}
	
	$.getJSON(url, function(object){
		var data = object.data,
			parsings = data.parsings;
		
		if(object.code == 200){
			dotory.control.parsingFilter = data.parsingFilter;
			for(var i=0; i<parsings.length; i++){
				var html = 	'<li data-pn="'+parsings[i].pn+'">';
					html+=	'	<a>'+parsings[i].url+'</a>';
					html+=	'	<span>'+parsings[i].title+'</span>';
					html+=  '</li>';
				$('.dotory_url_list').append(html);
			}
		}
		
		dotory.control.detail();
	});
};

dotory.control.menuOnOff = function(){
	var thiz = $(this),
		attr = thiz.attr('data-type');
	
	if(attr == 'html'){
		$('.dotory_url_parsing_data_wrap').hide();
		$('.dotory_url_parsing_data_wrap[data-type=html]').show();
	}else if(attr == 'html2'){
		$('.dotory_url_parsing_data_wrap').hide();
		$('.dotory_url_parsing_data_wrap[data-type=html2]').show();
	}else if(attr == 'image'){
		$('.dotory_url_parsing_data_wrap').hide();
		$('.dotory_url_parsing_data_wrap[data-type=image]').show();
	}else if(attr == 'title'){
		$('.dotory_url_parsing_data_wrap').hide();
		$('.dotory_url_parsing_data_wrap[data-type=title]').show();
	}
};

