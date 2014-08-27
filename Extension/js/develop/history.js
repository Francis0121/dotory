
if(typeof dotory.history == 'undefined'){
	dotory.history = {};
}

/**
 * History Binding
 */
dotory.history.binding = function(){
	
	$('#history_btn').on('click', function() {
		var thiz = $('.dotory_history'); 
		thiz.css('display', 'block');
		thiz.animate( { left : '0px' }, 750);
		
	});
	
	$('#history_back_btn').on('click', function(){
		var thiz = $('.dotory_history'); 
		thiz.animate( { left : '600px' }, 750, function(){
			thiz.css('display', 'none');			
		});
	});
	
	dotory.history.total();
	
	$('.current_content').mCustomScrollbar({
		mouseWheel:{ enable: true },
		alwaysShowScrollbar: 2
	});
	
	$('.date_history').mCustomScrollbar({
		mouseWheel:{ enable: true },
		alwaysShowScrollbar: 2,
		callbacks:{
			whileScrolling:function(){
				if(this.mcs.topPct > 90){
					dotory.history.getDate();
				}
			}
		}
	});
};
/********************탭열기***************************/
dotory.history.tabOpen=function(keywords){
	var lis = $('.opened_page_list_wrap').find('li'),
		urlArray=new Array();
	
	for(var i=0; i<lis.length; i++){
		var li = lis[i],
			keyword = keywords[i],
			url = keyword.url,
			checkbox = $(li).find('input[type=checkbox]');
		if(checkbox.attr('checked')){
			//console.log(url);
			urlArray[urlArray.length]=url;			
		}
	}
	if(urlArray.length>=3)
		chrome.windows.create({url:urlArray,type:'normal'});
	else
		for(var j=0;j<urlArray.length;j++)
			chrome.tabs.create({url:urlArray[j]});
};
/***********************************************/
dotory.history.total = function(){
	var url = dotory.contextPath + '/history/total';
		json = { userPn : dotory.user.pn };

	$.getJSON(url, json, function(object){
		var data = object.data;
		
		if(object.code == 200){
			dotory.history.keywordFilter = data.keywordFilter;
			dotory.history.makeKeywordHtml(data.keywords);
			
			dotory.history.historyFilter = data.historyFilter;
			dotory.history.makeDateHtml(data.dates);


			$('#history_tab_open').on('click',function(){
				dotory.history.tabOpen(data.keywords);
			});
		}
		
	});
	
};

dotory.history.makeKeywordHtml = function(keywords){
	var keywordArray = new Array();
	var pageWrap = $('.opened_page_list_wrap'),
		keywordTotal = $('.page_head .keyword_total'),
		moreWrap = $('.page_head .more_keyword');
	var pageHtml = $(pageWrap.find('li')[0]),
		keywordHtml = $(keywordTotal.find('a')[0]),
		moreHtml = $(moreWrap.find('a')[0]);
	
	// keywords
	pageWrap.html('');
	for (var i=0; i < keywords.length; i++) {
		var keyword = keywords[i];

		if( keyword != undefined && keyword != null && keyword.keyword != '' && keyword.keyword != ' '){
			if(keywordArray.indexOf(keyword.keyword) == -1){
				keywordArray.push(keyword.keyword);
			}
		}	
		
		// ~ Title
		var $object = pageHtml.find('.opend_page_link');
		$object.attr('href', keyword.url);
		
		$object = pageHtml.find('.opend_page_link').find('.title');
		$object.text(keyword.title);
		
		$object = pageHtml.find('.opend_page_link').find('.date');
		$object.text(keyword.date);
		
		// ~ check box
		$object = pageHtml.find('.opened_page_check');
		$object.attr('value', keyword.keyword);
		$object.removeAttr('checked');

		pageWrap.append(pageHtml);
		pageHtml = $(pageHtml.clone());
	}
	if(keywords.length == 0){
		var $object = pageHtml.find('.opend_page_link');
		$object.attr('href', '#');
		
		$object = pageHtml.find('.opend_page_link').find('.title');
		$object.text('No Data');
		
		$object = pageHtml.find('.opend_page_link').find('.date');
		$object.text(dotory.history.keywordFilter.date);
		
		// ~ check box
		$object = pageHtml.find('.opened_page_check');
		$object.attr('value', '');
		$object.removeAttr('checked');

		pageWrap.append(pageHtml);
		pageHtml = $(pageHtml.clone());
	}
	
	// ~ keyword array
	keywordTotal.html('');
	var size = keywordArray.length > 5 ? 5: keywordArray.length;
	var count = 0;
	for(var i=0; i<size; i++){
		var strKeyword = keywordArray[i];
		if(strKeyword == 'null' || strKeyword == null){
			continue;
		}
		
		keywordHtml.text(strKeyword);
		keywordHtml.attr('data-keyword', strKeyword);
		
		keywordTotal.append(keywordHtml);
		keywordHtml = $(keywordHtml.clone());
		count++;
	}
	if(count == 0){
		keywordTotal.append(keywordHtml);
		keywordTotal.hide();
	}else{
		keywordTotal.show();
	}
	
	moreWrap.html('');
	for(var i=size; i<keywordArray.length; i++){
		var strKeyword = keywordArray[i];
		if(strKeyword == 'null' || strKeyword == null){
			continue;
		}
		
		moreHtml.text(strKeyword);
		moreHtml.attr('data-keyword', strKeyword);
		
		moreWrap.append(moreHtml);
		moreHtml = $(moreHtml.clone());
	}
	if(size < 5){
		moreWrap.html(moreHtml);
		$('#btn_keyword_more').hide();
	}else{
		$('#btn_keyword_more').show();
	}
	moreWrap.hide();
	
	dotory.history.pageEvent();
	dotory.history.keywordEvent();
	dotory.history.headerEvent();
	
};

dotory.history.headerEvent = function(){
	
	$('#btn_keyword_more').off('click').on('click', function(){
		var thiz = $(this),
			attr = thiz.attr('data-on');
		
		if(attr == 'true'){
			$('.more_keyword').hide();
			thiz.text('More...');			
			thiz.removeAttr('data-on');
		}else{
			$('.more_keyword').show();
			thiz.text('Hide...');
			thiz.attr('data-on', 'true');
		}
		
	});
};

dotory.history.pageEvent = function(){
	$('.opened_page_list_wrap>li').off('click').on('click', function(){
		var thiz = $(this),
			checkbox = thiz.find('input[type=checkbox]');
		
		if(checkbox.attr('checked') == undefined){
			$(this).addClass('check');
			checkbox.attr('checked', 'checked');
		}else{
			$(this).removeClass('check');
			checkbox.removeAttr('checked');
		}
	});
	
	$('.opened_page_list_wrap>li>input[type=checkbox]').off('click').on('click', function(){
		var thiz = $(this);
		
		if(thiz.attr('checked') == undefined){
			$(this).parent('li').addClass('check');
			thiz.attr('checked', 'checked');
		}else{
			$(this).parent('li').removeClass('check');
			thiz.removeAttr('checked');
		}
	});
};
//keyword click event
dotory.history.keywordEvent = function(){
	$('.keyword_total>a').off('click').on('click', function(){
		var thiz = $(this),
			keyword = thiz.attr('data-keyword');
		
		var lis = $('.opened_page_list_wrap').find('li');
		
		for(var i=0; i<lis.length; i++){
			var li = lis[i],
				checkbox = $(li).find('input[type=checkbox]');
			
			checkbox.removeAttr('checked');
			checkbox.parent('li').removeClass('check');
			if(checkbox.val() == keyword){
				checkbox.attr('checked', 'checked');
				checkbox.parent('li').addClass('check');
			}
		}
		$('.keyword_total>a').removeClass('selected');
		$('.more_keyword>a').removeClass('selected');
		thiz.addClass('selected');
	});
	
	$('.more_keyword>a').off('click').on('click', function(){
		var thiz = $(this),
			keyword = thiz.attr('data-keyword');
		
		var lis = $('.opened_page_list_wrap').find('li');
		
		for(var i=0; i<lis.length; i++){
			var li = lis[i],
				checkbox = $(li).find('input[type=checkbox]');
			
			checkbox.removeAttr('checked');
			checkbox.parent('li').removeClass('check');
			if(checkbox.val() == keyword){
				checkbox.attr('checked', 'checked');
				checkbox.parent('li').addClass('check');
			}
		}
		$('.keyword_total>a').removeClass('selected');
		$('.more_keyword>a').removeClass('selected');
		thiz.addClass('selected');
	});
	
	$('#all_checked').off('click').on('click', function(){
		var thiz = $(this);
		if(thiz.attr('data-checked') == 'true'){
			dotory.history.unchecked();
		}else{
			dotory.history.checked();
		}
	});
	
};

dotory.history.unchecked = function(){
	var thiz = $('#all_checked');
	var lis = $('.opened_page_list_wrap').find('li');
	
	for(var i=0; i<lis.length; i++){
		var li = lis[i],
			checkbox = $(li).find('input[type=checkbox]');
		checkbox.removeAttr('checked');
		checkbox.parent('li').removeClass('check');
		$('.keyword_total>a').removeClass('selected');
		$('.more_keyword>a').removeClass('selected');
	}
	thiz.removeAttr('data-checked');
	thiz.addClass('btn_check_box_not_checked').removeClass('btn_check_box_checked');
};

dotory.history.checked = function(){
	var thiz = $('#all_checked');
	var lis = $('.opened_page_list_wrap').find('li');
	
	for(var i=0; i<lis.length; i++){
		var li = lis[i],
			checkbox = $(li).find('input[type=checkbox]');
		checkbox.attr('checked', 'checked');
		checkbox.parent('li').addClass('check');
		$('.keyword_total>a').removeClass('selected');
		$('.more_keyword>a').removeClass('selected');
	}
	thiz.attr('data-checked', 'true');
	thiz.addClass('btn_check_box_checked').removeClass('btn_check_box_not_checked');
};

dotory.history.makeDateHtml = function(dates){
	var dateWrap = $('.history_list_wrap');
	var dateHtml = $(dateWrap.find('li')[0]);
	var historyFilter = dotory.history.historyFilter;
	// ~ dates
	if(historyFilter.page == 1){		
		dateWrap.html('');
	}
	dateHtml = $(dateHtml.clone());
	if(dates == null || dates == undefined || dates.length == 0){
		var $object = dateHtml.find('.date');
		$object.text('No data');
		
		dateWrap.append(dateHtml);
		dateHtml = $(dateHtml.clone());
	
		dotory.history.dateEvent();
		return;
	}
	
	for (var i=0; i < dates.length; i++){			
		var date = dates[i];
			
		var $object = dateHtml.find('.date');
		$object.text(date.date);
		
		dateWrap.append(dateHtml);
		dateHtml = $(dateHtml.clone());
	}
	dotory.history.dateEvent();
};

dotory.history.dateEvent = function(){
	$('.history_list_wrap>li').off('click').on('click', function(){
		var thiz = $(this);
		var domDate = thiz.children('.date'),
			date = domDate.text();
		
		dotory.history.unchecked();
		dotory.history.getKeyword(date);
	});
};

dotory.history.getKeyword = function(date){
	if(date == null || date == undefined || date == ''){
		return;
	}
	var url=dotory.contextPath+'/history/keyword',
		json={	'userPn':	dotory.user.pn,
				'date'	:	date	};
	
	$.getJSON(url, json,function(object){
		var data = object.data;
		
		if(object.code == 200){
			dotory.history.keywordFilter = data.keywordFilter;
			dotory.history.makeKeywordHtml(data.keywords);
		}
	});
};

// ~ Date Pagination
dotory.history.scrollingData = false;

dotory.history.getDate = function(){
	var url = dotory.contextPath+'/history/date',
		json = { 	'userPn' 	: 	dotory.user.pn,
					'page'		:	dotory.history.historyFilter.page + 1};
	if(dotory.history.historyFilter.page + 1 > dotory.history.historyFilter.pagination.numPages){
		return;
	}
	
	if(dotory.history.scrollingData){
		return;
	}
	
	dotory.history.scrollingData = true;
	$.getJSON(url, json, function(object){
		var data = object.data;
		
		if(object.code == 200){
			dotory.history.historyFilter = data.historyFilter;
			dotory.history.makeDateHtml(data.dates);
			dotory.history.scrollingData = false;
		}
	});
	
};

