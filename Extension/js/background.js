if(typeof dotory == 'undefined'){
	dotory = {};
}

dotory.contextPath = 'http://localhost:8080';

$(function(){
	getUserInfo(false);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var status=changeInfo.status;
	
    if(status=='complete'){
        console.log("tab : "+tab.url); 
        console.log("tab title: "+tab.title);  
        
        var url= dotory.contextPath + '/parsing/url',
    		json={ 	'url' : tab.url,
        			'userPn' : dotory.user.pn };
        $.postJSON(url,json,function(object){
        	if(object.code==200){
        	}
        });
    }
});

       