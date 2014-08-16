$(function(){
	dotory.metro.binding();
	dotory.history.binding();
	dotory.image.binding();
	dotory.signin();
});

if(typeof dotory == 'undefined'){
	dotory = {};
}

dotory.signin = function(){
	window.onload = googlePlusUserLoader.onload;
};

