/*chrome.tabs.getCurrent( function(tab) {
	var url = 'http://localhost:8080/background';
	$.getJSON(url, function(object) {
		if (object.code == 200) {
			alert(tab);
		}
	});
});
var inputTabs=new Array();
// { currentWindow: true, active: true }
chrome.tabs.query({lastFocusedWindow: true, active: true} ,function (tabs) {
	var bgurl = 'http://localhost:8080//parsing/url',
		json = { url : tabs[0].url };
	for(var i=0;i<tabs.length;i++){
		tabs[i]=inputTabs[i];
	}
	$.postJSON(bgurl, json, function(object){
		var data = object.data;
		if(object.code == 200){
			
		}
	});
	chrome.tabs.update(tabs[0].id, {url: newUrl});
});*/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(changeInfo.url);
	/*
	var url = 'http://localhost:8080//parsing/url',
	json = { url : tabs[0].url };
    $.postJSON(url, json, function(object){
		var data = object.data;
		if(object.code == 200){
			console.log("success get url"+data.url);
		}
	});
	*/
});
