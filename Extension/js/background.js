
$(function(){
	getUserInfo(false);
	dotory.makeImageRegex();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var status=changeInfo.status,
		regex = /^(http|https):\/\/([a-z0-9-_\.]*)[\/\?]{0,1}/;
	
    if(status!='complete' || !tab.url.match(regex)){
    	//console.log('Not match Url ' + tab.url + ' Or Status is not "complete" ' + status);
    	return;
    }    
    chrome.tabs.executeScript(
    	tab.id, 
		{ code : 'chrome.extension.sendRequest( { content: document.body.innerHTML}, function(response) { console.log("success"); });' }, 
		function() { 
//			console.log('Send Request done'); 
			
		}
		
	);
    
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	var keyword=dotory.getSearchWord(request.content,sender.tab.url,sender.tab.title);
//	console.log("keyword : "+keyword.keyword+" index : "+keyword.index);
	var stringKeyword=""; //배열 keyword를 string으로 붙여줄 객체
	for(var i=0;i<keyword.keyword.length;i++){
		stringKeyword=stringKeyword+" "+keyword.keyword[i];
	}
	dotory.imageFiltering(request.content, sender.tab.url, sender.tab.title, sender.tab.favIconUrl,stringKeyword,keyword.index);
//	console.log("recieved : "+RecievedKeyword[RecievedKeyword.length-1]);
});
