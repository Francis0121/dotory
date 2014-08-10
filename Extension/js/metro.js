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
/*
$(document).ready(function (){
    $('.hScroll').width($('.dotory_content').outerWidth());
});
document.documentElement.onmousewheel = function (event) {
    $('body').scrollLeft($('body').scrollLeft() - event.wheelDelta);
    event.preventDefault();
};
*/