if(typeof dotory == 'undefined'){
	dotory = {};
}

var keywordPns=new Array();

dotory.contextPath = 'http://dotory.epril.net/dotori/';
//dotory.contextPath = 'http://localhost:8080/';
dotory.types = {
	main : 'MAIN',
	web : 'WEB',
	background : 'BACKGROUND'
};

dotory.regexCategories = {
	image : 1,
	title : 2
};

dotory.colors = {
	black : 1,
	white : 2,
	gray : 3,
	red : 4,
	yellow : 5,
	green : 6,
	cyan : 7,
	blue : 8,
	magenta :9
};

dotory.loading = {
	start : function(){
		var thiz = $('.dotory_loading_extension');
		if(thiz.css('display') == 'none'){
			$('.dotory_loading_extension').fadeIn();		
			thiz.css('display', 'block');
		}
	},
	finsih : function(){
		var thiz = $('.dotory_loading_extension');
		$('.dotory_loading_extension').fadeOut();		
		thiz.css('display', 'none');
	}
}
