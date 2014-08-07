$(function(){
	$('#_test_get').on('click', function(){
		dotori.ajaxGet();
	});
	
	$('#_test_post').on('click', function(){
		dotori.ajaxPost();
	});
});



dotori.ajaxGet = function(){
	
	var url = contextPath + '/json';
	$.getJSON(url, function(image){
		alert(image.pn + ' ' + image.title);
	});
	
};

dotori.ajaxPost = function(){
	
	var url = contextPath + '/json';
	var json = { 'pn' : '1', 'title' : 'KIM김' };
	$.postJSON(url, json, function(){
		
	});
	
};