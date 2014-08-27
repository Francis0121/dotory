
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

dotory.request_stack = new Array();
dotory.isLogin = false;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(dotory.user == null || dotory.user == undefined || dotory.user.pn == null || dotory.user.pn == undefined || dotory.user.pn == '' || dotory.user.pn == '0'){
		getUserInfo(false);
		dotory.request_stack.push({'request' : request, 'sender' : sender, 'sendResponse' : sendResponse});
		dotory.isLogin = true;
		return;
	}	
	
	dotory.afterLoginDo(request, sender, sendResponse);
});

dotory.afterLoginDo = function(request, sender, sendResponse){
	var keyword = dotory.queryMatch(sender.tab.url,sender.tab.title);
	var stringKeyword = '';
	if(keyword != undefined && keyword != null && keyword.keyword != undefined){
		for(var i=0; i<keyword.keyword.length; i++){
			stringKeyword+=(keyword.keyword[i]+' ');
		}
	}
	console.log('Keyword = [' + stringKeyword + '] ');
	dotory.imageFiltering(request.content, sender.tab.url, sender.tab.title, sender.tab.favIconUrl,stringKeyword,keyword.index);	
};
