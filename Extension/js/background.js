
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
	
	dotory.imageSearchCondition(srcs);
	
    $.postJSON($url,json,function(object){
    	if(object.code==200){
    		console.log('success');
		}
    });
};

dotory.imageSearchCondition = function(srcs){
	
	for(var i=0; i<srcs.length; i++){
		var src = srcs[i];
		if(src == undefined || src == '' || src == null){
			continue;
		}
		var image = new Image();
		image.src = src;
		
		console.log(src + ' w : ' + image.width + ' h : ' + image.height);
		// ~ Page loading Control 
		if(image.width == 0 || image.height == 0){
			continue;
		}
		var canvas = $('<canvas/>')[0];
		canvas.width = image.width;
		canvas.height = image.height;
		canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
		
		var start = new Date();
		console.log('Start : ' + start + ' 0 ');
		
		var data = canvas.getContext('2d').getImageData(0, 0, image.width, image.height).data;		
		var colors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for(var j=0; j<image.width*image.height*4; j+=4){
			var hsl = dotory.calculateHSL(data[j+0], data[j+1], data[j+2]);
			colors[dotory.judgeHSL(hsl.hue, hsl.sat, hsl.lgt)]+=1;
		} 
		var max = colors.indexOf(Math.max.apply(Math, colors));
		console.log('Max : ' + max + ' ' +Math.max.apply(Math, colors));
		
		var now = new Date();
		var elapsed = Math.round((now - start)/600);
		console.log('End : ' + now + ' ' + elapsed);
	}
	
};

dotory.calculateHSL = function(r, g, b){
	r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h*=60;
        if (h < 0) {
            h +=360;
        }
    }
	
	return { hue : h, sat : s, lgt : l};
};

dotory.judgeHSL= function(hue, sat, lgt){
	if (lgt < 0.2)  return dotory.colors.black;
    if (lgt > 0.8)  return dotory.colors.white;

    if (sat < 0.25) return dotory.colors.gray;

    if (hue < 30)   return dotory.colors.red;
    if (hue < 90)   return dotory.colors.yellow;
    if (hue < 150)  return dotory.colors.green;
    if (hue < 210)  return dotory.colors.cyan;
    if (hue < 270)  return dotory.colors.blue;
    if (hue < 330)  return dotory.colors.magenta;
    
    return dotory.colors.red;
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
