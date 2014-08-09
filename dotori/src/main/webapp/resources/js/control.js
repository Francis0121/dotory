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
};

dotory.control.urlPost = function(){
	var thiz = $('#dotory_url_input'),
		url = contextPath + '/parsing/url',
		json = { url : thiz.val() };
	
	$.postJSON(url, json, function(data){
		alert(data);
	});
};
