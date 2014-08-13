/*chrome.tabs.getCurrent( function(tab) {
	var url = 'http://localhost:8080/background';
	$.getJSON(url, function(object) {
		if (object.code == 200) {
			alert(tab);
		}
	});
});*/
// { currentWindow: true, active: true }
chrome.tabs.query({lastFocusedWindow: true, active: true} ,function (tabs) {
	var url = 'http://localhost:8080/background';
	$.getJSON(url, function(object) {
		if (object.code == 200) {
			alert(tabs[0].url);
		}
	});
});