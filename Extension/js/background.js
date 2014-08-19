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
	//dotory.imageFiltering(request.content, sender.tab.url, sender.tab.title, sender.tab.favIconUrl);
	dotory.getSearchWord(request.content,sender.tab.url,sender.tab.title);
	for(var i=0;i<keywordArray.length;i++)
		console.log(keywordArray[i]);
});
/****************************************************/
//검색 키워드 중복있는지 체크
dotory.checkRe=function(searchArray){
	console.log("check?");
	for(var i=0;i<keywordArray.length;i++){
		for(var j=0;j<keywordArray[i].length;j++){
			if(searchArray[j].match(keywordArray[i][j])){
//				console.log("yes check!");
				return true;
			}
		}
	}
}
//검색엔진 별 검색어 찾기
dotory.getSearchWord=function(content,url,title){
	var html=content;
	var decodeUri= decodeURIComponent(url);
	
	//google search word split
	if(decodeUri.match(/google/)!=null){
		console.log(decodeUri.match(/\&q=(.+)/i)[1]);
		if(decodeUri.match(/\&q=(.+)(&|)/i)[1]!=null){	//검색어가 있는 검색창이 맞으면
			var search=decodeUri.match(/\&q=(.+)&/i)[1],
				searchArray=search.split('+');
			if(dotory.checkRe(searchArray))	//들어온 검색어가 이미 있는 검색어이면
				dotory.matchKeyword(keywordArray,url,title);
			else
				keywordArray[count++]=searchArray;
		}
	}
	
	//naver
	else if(decodeUri.match(/naver/)!=null){
		if(decodeUri.match(/\&query=(.+)&/i)[1]!=null){
			console.log(decodeUri.match(/\&query=(.+)&/i)[1]);
			var search=decodeUri.match(/\&query=(.+)&/i)[1],
				searchArray=search.split('+');
			for(var i=0;i<searchArray.length;i++){
				if(i==(searchArray.length-1)){
					var temp=searchArray[i].split('&');
					searchArray[i]=temp[0];				
				}
			}
			if(dotory.checkRe(searchArray))	//들어온 검색어가 이미 있는 검색어이면
				dotory.matchKeyword(keywordArray,url,title);
			else
				keywordArray[count++]=searchArray;
		}
	}
	
	//daum & nate
	else if(decodeUri.match(/daum/)!=null){
		if(decodeUri.match(/\&q=(.+)/i)[1]!=null){
			var search=decodeUri.match(/\&q=(.+)/i)[1],
				searchArray=search.split('+');
			if(dotory.checkRe(searchArray))	//들어온 검색어가 이미 있는 검색어이면
				dotory.matchKeyword(keywordArray,url,title);
			else
				keywordArray[count++]=searchArray;
		}
	}
	
	//yahoo
	else if(decodeUri.match(/yahoo/)!=null){
		console.log(decodeUri.match(/\&p=(.+)&/i)[1]);
		var search=decodeUri.match(/\&p=(.+)&/i)[1];
		var	searchArray=search.split('+');
		for(var i=0;i<searchArray.length;i++){
			if(i==(searchArray.length-1)){
				var temp=searchArray[i].split('&');
				searchArray[i]=temp[0];				
			}
		}
		if(dotory.checkRe(searchArray))	
			dotory.matchKeyword(keywordArray,url,title);
		else
			keywordArray[count++]=searchArray;
	}
	else
		dotory.matchKeyword(keywordArray,url,title);
}
//클릭도니 사이트 title 비교 해 키워드 등록
dotory.matchKeyword=function(keyword, url, title){
	console.log("matching....");
	if(keyword!=null){
		for(var i=0;i<keyword.length;i++){
			for(var j=0;j<keyword[i].length;j++){
				if(title.match(keyword[i][j])!=null){ //배역에 있는 키워드와 맞으면
					//db에 키워드 넣기
					console.log(keyword[i][j]);
					
				}else{
					//domain 가져오기
				}
			}
		}
	}
};

/****************************************************/
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
