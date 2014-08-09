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

