chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var status=changeInfo.status;
	
    if(status=='complete'){
        console.log("tab : "+tab.url); 
        console.log("tab title: "+tab.title);  
        
        var url='http://localhost:8080/parsing/url',
    		json={url:tab.url};
        $.postJSON(url,json,function(object){
        	if(object.code==200){
        	}
        });
    }
});

       