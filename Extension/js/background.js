chrome.tabs.getCurrent( function(tab) {
	var url = 'http://localhost:8080/background';
	$.getJSON(url, function(object) {
		if (object.code == 200) {

		}
	});
});