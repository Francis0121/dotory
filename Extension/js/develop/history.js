
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

	// style testing sample data ~ TODO delete
//	dotory.history.testing();
	dotory.history.loading();
	dotory.history.total();
};

dotory.history.testing = function(){
	
	var parent = $('.opened_page_list_wrap'),
		li = parent.children('li');
	
	for(var i=0; i<10; i++){
		parent.append(li.clone());
	}
	
	parent = $('.history_list_wrap');
	li = parent.children('li');
	
	for(var i=0; i<10; i++){
		parent.append(li.clone());
	}
};

dotory.history.total = function(){
	var url = dotory.contextPath + '/history/total';
		json = { userPn : dotory.user.pn };

	$.getJSON(url, json, function(object){
		var data = object.data;
		
		if(data.code == 200){
			var keywords = data.keywords,
				dates = data.dates,
				keywordArray = new Array();
			
			var pageWrap = $('.opened_page_list_wrap'),
				dateWrap = $('.history_list_wrap'),
				keywordTotal = $('.page_head .keyword_total');
				
			var pageHtml = $(pageWrap.html()), 
				dateHtml = $(dateWrap.html());

			// keywords
			for (var i=0; i < keywords.length; i++) {
				var keyword = keywords[i];

				if(keywordArray.indexOf(keyword.keyword) == -1){
					keywordArray.push(keyword.keyword);
				}
				
				var $object = pageHtml.find('.opend_page_link');
				$object.attr('href', keyword.url);
				$object.text(title);
				
				$object = pageHtml.find('.opened_page_check');
				$object.attr('value', keyword.keyword);

				pageWrap.append(pageHtml);					
			}
			// ~ keyword array 
			var strKeywordHtml = '';
			for(var i=0; i<keywordTotal; i++){
				var strKeyword = keywordTotal[i];
				strKeywordHtml += (strKeyword + ' ')
			}
			keywordTotal(strKeywordHtml);
			// ~ dates
			for (var i=0; i < dates.lenght; i++){
			
				var date = dates[i];
			}
		}
		
	});
	
};


dotory.history.loading=function(){
	var url=dotory.contextPath+'/history/keyword',
		json={'userPn':dotory.user.pn};
	
	$.getJSON(url, json,function(object){
		var data = object.data;
	
			dotory.history.container= $('.opened_page_list_wrap'); 
			
			if(object.code==200){	
//				console.log("total keywords load success");
				var keywords=data.keywords;
				console.log(keywords.length);
				for(var i=0; i<keywords.length; i++){
					var keyword = keywords[i];
					var html = 	'<li>';
						html +=	'	<input type="checkbox" class="opened_page_check"/>';
						html += '		<a href="">'+keyword+'</a>';
						html += '</li>';	
					dotory.history.container.append(html);
				}
			}
	});
};
