if(typeof metro == 'undefined'){
	metro = {};
}

$(function(){
	metro.changeColor();
});

metro.changeColor = function(){
	$("#btn1").on("click",function(){
		$("#email").removeClass("blue").addClass("red");
	});
};
