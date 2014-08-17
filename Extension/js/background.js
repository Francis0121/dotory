dotory.type = dotory.types.background;

$(function(){
	getUserInfo(false);
	dotory.makeImageRegex();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var status=changeInfo.status,
		regex = /^(http|https):\/\/([a-z0-9-_\.]*)[\/\?]{0,1}/;
	
    if(status!='complete' || !tab.url.match(regex)){
    	console.log('Not match Url ' + tab.url + ' Or Status is not "complete" ' + status);
    	return;
    }    
    
    chrome.tabs.executeScript(
    	tab.id, 
		{ code : 'chrome.extension.sendRequest( { content: document.body.innerHTML}, function(response) { console.log("success"); });' }, 
		function() { 
			console.log('Send Request done'); 
		}
	);
    
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	dotory.imageFiltering(request.content, sender.tab.url, sender.tab.title, sender.tab.favIconUrl);
});

dotory.imageFiltering = function(content, url, title, favicon){
	
	if(dotory.regex == null || dotory.regex == undefined){
		console.log('Error : Doesn`t make Image Regex');
		return;
	}
	
	var html = content;
	
	for(var i=0; i < dotory.regex.tags.length; i++){
		var tag = dotory.regex.tags[i];
		html = html.replace(new RegExp(tag, 'ig'), '');
	}
	
	// ~ id eleminate
	var ids = html.match(/[\w:\-]?id[\s]*?=[\s]*?(\"[^\"]+\"|'[^']+'|\w+)/ig);
	eles = new Array();
	if(ids != null && ids != undefined){
		for(var i=0; i<ids.length; i++){
			var id = ids[i].replace(/\"/ig, '').replace(/id=/ig, '');
			for(var j=0; j< dotory.regex.deletes.length;j++){
				var del = dotory.regex.deletes[j];
				if(id.match(new RegExp(del, 'ig'))){
					eles.push(id);
				}
			}
		}
		var dom = $(html);
		for(var i=0; i<eles.length; i++){
			dom.find('#'+eles[i]).remove();
		}
		html = $('<div>').append(dom.clone()).html();
	}
	// ~ class eleminate
	var clazzs = html.match(/[\w:\-]?class[\s]*?=[\s]*?(\"[^\"]+\"|'[^']+'|\w+)/ig);
	eles = new Array();
	if(clazzs != null && clazzs != undefined){
		for(var i=0; i<clazzs.length; i++){
			var clazz = clazzs[i].replace(/\"/ig, '').replace(/class=/ig, '');
			for(var j=0; j< dotory.regex.deletes.length;j++){
				var del = dotory.regex.deletes[j];
				if(clazz.match(new RegExp(del, 'ig'))){
					eles.push(clazz);
				}
			}
		}
		dom = $(html);
		for(var i=0; i<eles.length; i++){
			dom.find('.'+eles[i]).remove();
		}
		html = $('<div>').append(dom.clone()).html();
	}
	// ~ id select
	ids = html.match(/[\w:\-]?id[\s]*?=[\s]*?(\"[^\"]+\"|'[^']+'|\w+)/ig);
	var seles = new Array();
	if(ids != null && ids != undefined){
		for(var i=0; i<ids.length; i++){
			var id = ids[i].replace(/\"/ig, '').replace(/id=/ig, '');
			for(var j=0; j< dotory.regex.selects.length;j++){
				var sel = dotory.regex.selects[j];
				if(id.match(new RegExp(sel, 'ig'))){
					seles.push(id);
				}
			}
		}
		var container = '';
		dom = $(html);
		for(var i=0; i<seles.length; i++){
			var find = dom.find('#'+seles[i]);
			container += $('<div>').append(find.clone()).html();
		}
	}
	// ~ class select
	clazzs = html.match(/[\w:\-]?class[\s]*?=[\s]*?(\"[^\"]+\"|'[^']+'|\w+)/ig);
	seles = new Array();
	if(clazzs != null && clazzs != undefined){
		for(var i=0; i<clazzs.length; i++){
			var clazz = clazzs[i].replace(/\"/ig, '').replace(/class=/ig, '');
			for(var j=0; j< dotory.regex.selects.length;j++){
				var sel = dotory.regex.selects[j];
				if(clazz.match(new RegExp(sel, 'ig'))){
					seles.push(clazz);
				}
			}
		}
		dom = $(html);
		for(var i=0; i<seles.length; i++){
			var find = dom.find('.'+seles[i]);
			container += $('<div>').append(find.clone()).html();
		}
	}
	
	if(container == '' || container == undefined || container == null){
		container = html;
	}
	
	var imgs = $('<div>').append(container).find('img');
	var srcs = new Array();
	for(var i=0; i<imgs.length; i++){
		srcs[i] = $(imgs[i]).attr('src');
	}
	
	
	var $url = dotory.contextPath + '/parsing/analysis',
		json = { 	'userPn' 	:	dotory.user.pn,
					'srcs'		:	srcs,
					'html'		: 	content,
					'domain'	:	url.match(/^(http|https):\/\/([a-z0-9-_\.]*)[\/\?]{0,1}/)[0],
					'url'		:	url,
					'title'		:	title,
					'favicon'	: 	favicon	};
	console.log(json);
	
    $.postJSON($url,json,function(object){
    	if(object.code==200){
    		console.log('success');
		}
    });
};

dotory.makeImageRegex = function(){
	$.getJSON(dotory.contextPath+'/regex/all?regexCategory='+dotory.regexCategories.image, function(object){
		var data = object.data;
		
		if(object.code == 200){
			var tags = data.tags, 
				deletes = data.deletes,
				selects = data.selects;
			
			var regexTags = new Array(),
				count = 0;
			for(var i=0; i<tags.length; i++){
				var regexOne = '\\<RPLETTER( .*)?\\>.*\\<\\/RPLETTER\\>',
					regexTwo = '\\<RPLETTER( .*)?\\>[\\w\\W]*?\\<\\/RPLETTER\\>';
				regexTags[count++] = regexOne.replace(/RPLETTER/g, tags[i].shape);
				regexTags[count++] = regexTwo.replace(/RPLETTER/g, tags[i].shape);
			}
			
			var regexDeletes = new Array();
			count = 0;
			for(var i=0; i<deletes.length; i++){
				var regex = '.*RPLETTER.*';
				regexDeletes[count++] = regex.replace(/RPLETTER/g, deletes[i].shape); 
			}
			
			var regexSelects = new Array();
			count = 0;
			for(var i=0; i<selects.length; i++){
				var regex = '.*RPLETTER.*';
				regexSelects[count++] = regex.replace(/RPLETTER/g, selects[i].shape); 
			}
			
			dotory.regex = {
				tags : regexTags,
				deletes : regexDeletes,
				selects : regexSelects
			};
		}
	});
};
