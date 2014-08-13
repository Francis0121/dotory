if(typeof dotory.image == 'undefined'){
	dotory.image = {};
}

dotory.image.binding = function(){
	$('#image_back_btn').on('click', function(){
		// TODO Effecf
		$('.dotory_image').hide();
	});
	
	dotory.image.loading();
};

dotory.image.loading = function(){
	var url = 'http://localhost:8080/image/list',
		json = { 'userPn' : 1 };
	
	$.postJSON(url, json, function(object){
		var data = object.data;
	
		if(object.code == 200){
			
		}
	});
	
};
