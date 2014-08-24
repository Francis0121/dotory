
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
		thiz.animate( { left : '0px' }, 750, function(){
			$('.current_content_header').show();
		});
		
	});
	
	$('#history_back_btn').on('click', function(){
		$('.current_content_header').hide();
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
		alwaysShowScrollbar: 2
	});
};

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
		}
		
	});
	
};

dotory.history.makeKeywordHtml = function(keywords){
	var keywordArray = new Array();
	var pageWrap = $('.opened_page_list_wrap'),
		keywordTotal = $('.page_head .keyword_total');
	var pageHtml = $(pageWrap.find('li')[0]),
		keywordHtml = $(keywordTotal.find('a')[0]);
	
	// keywords
	pageWrap.html('');
	for (var i=0; i < keywords.length; i++) {
		var keyword = keywords[i];

		if(keywordArray.indexOf(keyword.keyword) == -1){
			keywordArray.push(keyword.keyword);
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
	for(var i=0; i<keywordArray.length; i++){
		var strKeyword = keywordArray[i];
		if(strKeyword == 'null' || strKeyword == null){
			continue;
		}
		
		keywordHtml.text(strKeyword);
		keywordHtml.attr('data-keyword', strKeyword);
		
		keywordTotal.append(keywordHtml);
		keywordHtml = $(keywordHtml.clone());
	}
	
	dotory.history.pageEvent();
	dotory.history.keywrodEvent();
	dotory.history.headerEvent();
	
};

dotory.history.headerEvent = function(){
	$('#btn_keyword_expand_wrap').css(
		{ 'height': Number($('.current_content_header').css('height').replace(/px/, '')) 
					+ Number($('.current_content_header').css('padding-top').replace(/px/, ''))
					+ Number($('.current_content_header').css('padding-bottom').replace(/px/, ''))
					+ 'px',
					'margin-top' : '-'+$('.current_content_header').css('padding-top'),
					'margin-bottom': '-'+$('.current_content_header').css('padding-bottom')
		});
		
	$('#btn_keyword_expand').off('click').on('click', function(){
		var selector = $('.current_content_header');
		
		if(selector.css('left') == '0px'){
			selector.animate({left : '-395px'},'750');
		}else{
			selector.animate({left : '0px'},'750');
		}
	});
};

dotory.history.pageEvent = function(){
	$('.opened_page_list_wrap>li').off('click').on('click', function(){
		var thiz = $(this),
			checkbox = thiz.find('input[type=checkbox]');
		
		if(checkbox.attr('checked') == undefined){
			checkbox.attr('checked', 'checked');
		}else{
			checkbox.removeAttr('checked');
		}
	});
};

dotory.history.keywrodEvent = function(){
	$('.keyword_total>a').off('click').on('click', function(){
		var thiz = $(this),
			keyword = thiz.attr('data-keyword');
		
		var lis = $('.opened_page_list_wrap').find('li');
		
		for(var i=0; i<lis.length; i++){
			var li = lis[i],
				checkbox = $(li).find('input[type=checkbox]');
			
			checkbox.removeAttr('checked');
			if(checkbox.val() == keyword){
				checkbox.attr('checked', 'checked');
			}
		}
	});
	
	$('#all_checked').off('click').on('click', function(){
		var lis = $('.opened_page_list_wrap').find('li');
		
		for(var i=0; i<lis.length; i++){
			var li = lis[i],
				checkbox = $(li).find('input[type=checkbox]');
			checkbox.attr('checked', 'checked');
		}
	});
	
	$('#all_unchecked').off('click').on('click', function(){
		var lis = $('.opened_page_list_wrap').find('li');
		
		for(var i=0; i<lis.length; i++){
			var li = lis[i],
				checkbox = $(li).find('input[type=checkbox]');
			checkbox.removeAttr('checked');
		}
	});
};

dotory.history.makeDateHtml = function(dates){
	var dateWrap = $('.history_list_wrap');
	var dateHtml = $(dateWrap.find('li')[0]);
	var historyFilter = dotory.history.historyFilter;
	// ~ dates
	if(historyFilter.pagination.page != 1){		
		dateWrap.html('');
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
dotory.history.getDate = function(date){
	var url = dotory.contextPath+'/history/date',
		json = { 	'userPn' 	: 	dotory.user.pn,
					'date'		:	date	};
	
	$.getJSON(url, json, function(object){
		var data = object.data;
		
		if(object.code == 200){
			dotory.history.historyFilter = data.historyFilter;
			dotory.history.makeDateHtml(data.dates);
		}
	});
	
};

