$(function(){
	
	// ~ Regex
	dotory.control.selectRegexList();
	
	// ~ Parsing
	dotory.control.onParsing();
	
});


dotory.makeAbsoulteUrl = function(url, domain){
	var regex = /^(http|https):\/\/([a-z0-9-_\.]*)[\/\?]{0,1}/i;
	
	if(url.match(regex)){
		return url;
	}else{
		
		return null;
	}
};
