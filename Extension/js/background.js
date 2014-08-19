var keywordArray=new Array([],[]), //검색어 저장 배열
	count=0;

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
	dotory.imageFiltering(request.content, sender.tab.url, sender.tab.title, sender.tab.favIconUrl);
	dotory.getSearchWord(request.content,sender.tab.url,sender.tab.title);
	for(var i=0;i<keywordArray.length;i++)
		console.log(keywordArray[i]);
});
