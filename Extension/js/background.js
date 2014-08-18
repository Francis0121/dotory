
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
	dotory.getSearchWord(request.content,sender.tab.url);
});
/****************************************************/
dotory.getSearchWord=function(content,url){
	var html=content;
	var url=url;
	
	console.log(url);
	
}
dotory.imageFiltering = function(content, url, title, favicon){
	
	if(dotory.regex == null || dotory.regex == undefined){
//		console.log('Error : Doesn`t make Image Regex');
		return;
	}

	var domain_regex = /^(http|https):\/\/([a-z0-9-_\.]*)[\/\?]{0,1}/,
		domain = url.match(domain_regex)[0];
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
		var dom = $('<div>').append(html);
		for(var i=0; i<eles.length; i++){
			if(eles[i] == undefined ) continue;
			var selector = '#'+eles[i].replace(/(:|\.|\[|\]|\/|\(|\))/g, '\\$1');
			var domIds = dom.find(selector);
			if(domIds.length != 0){
				domIds.remove();
			}
		}
		html = $('<div>').append(dom.clone()).html();
//		console.log('Eleminate ID : '+eles);
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
		dom = $('<div>').append(html);
		for(var i=0; i<eles.length; i++){
			if(eles[i] == undefined ) continue;
			var selector = '.'+eles[i].replace(/(:|\.|\[|\]|\/|\(|\))/g, '\\$1');
//			console.log(selector);
			var domClazzs = dom.find(selector); 
			if(domClazzs.length != 0)
				domClazzs.remove();
		}
		html = $('<div>').append(dom.clone()).html();
//		console.log('Eleminate CLASS : '+eles);
	}
	var eleHtml = html;
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
		dom = $('<div>').append(html);
		for(var i=0; i<seles.length; i++){
			if(seles[i] == undefined) continue;
			var selector = '#'+seles[i].replace(/(:|\.|\[|\]|\/|\(|\))/g, '\\$1');
			var find = dom.find(selector);
			container += $('<div>').append(find.clone()).html();
		}
//		console.log('Select ID : '+seles);
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
		dom = $('<div>').append(html);
		for(var i=0; i<seles.length; i++){
			if(seles[i] == undefined) continue;
			var selector = '.'+seles[i].replace(/(:|\.|\[|\]|\/|\(|\))/g, '\\$1');
			var find = dom.find(selector);
			container += $('<div>').append(find.clone()).html();
		}
//		console.log('Select CLASS : '+seles);
	}
	
	if(container == '' || container == undefined || container == null){
		container = eleHtml;
//		console.log('Container is empty');
	}
	
	var imgs = $('<div>').append(container).find('img');
	var srcs = new Array();
	for(var i=0; i<imgs.length; i++){
		var src = $(imgs[i]).attr('src');		
		if(src != null && src != '' && srcs.indexOf(src) == -1){
			if(src.match(domain_regex)){
				srcs[i] = src;
			}else{ 
				srcs[i] = dotory.absolute(url, src);
			}
//			console.log(srcs[i]);
		}
	}
	
	for(var i=0; i<dotory.regex.srcs.length; i++){
		var regex = new RegExp(dotory.regex.srcs[i], 'ig');
		var stack = new Array();
		for(var j=0; j<srcs.length; j++){
			var src = srcs[j];
			if(src == undefined || src == null || src == '') continue;
			if(src.match(regex)) stack.push(j);
		}
		var size = stack.length;
		while(size--){
			srcs.splice(stack.pop(), 1);
		}
	}
	
	var $url = dotory.contextPath + '/parsing/analysis',
		json = { 	'userPn' 	:	dotory.user.pn,
					'srcs'		:	srcs,
					'html'		: 	content,
					'domain'	:	domain,
					'url'		:	url,
					'title'		:	title,
					'favicon'	: 	favicon == null ? '' : favicon};
	
    $.postJSON($url,json,function(object){
    	if(object.code==200){
//    		console.log('success');
		}
    });
};

dotory.absolute = function(base, relative) {
    var stack = base.split('/'),
        parts = relative.split('/');
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == '.')
            continue;
        if (parts[i] == '..')
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join('/');
};

dotory.makeImageRegex = function(){
	$.getJSON(dotory.contextPath+'/regex/all?regexCategory='+dotory.regexCategories.image, function(object){
		var data = object.data;
		
		if(object.code == 200){
			var tags = data.tags, 
				deletes = data.deletes,
				selects = data.selects,
				srcs = data.srcs;
			
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
			
			var regexSrcs = new Array();
			count = 0;
			for(var i=0; i<srcs.length; i++){
				var regex = '.*RPLETTER.*';
				regexSrcs[count++] = regex.replace(/RPLETTER/g, srcs[i].shape);
			}
			
			dotory.regex = {
				tags : regexTags,
				deletes : regexDeletes,
				selects : regexSelects,
				srcs : regexSrcs
			};
		}
	});
};
