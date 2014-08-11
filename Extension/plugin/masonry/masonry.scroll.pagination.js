/*
 **	Anderson Ferminiano
 **	contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
 **	jQuery ScrollPagination
 **	28th/March/2011
 **	http://andersonferminiano.com/jqueryscrollpagination/
 **	You may use this script for free, but keep my credits.
 **	Thank you.
 */

(function($) {

	$.fn.scrollPagination = function(options) {
		var opts = $.extend($.fn.scrollPagination.defaults, options);
		var target = opts.scrollTarget;
		if (target == null) {
			target = obj;
		}
		opts.scrollTarget = target;

		return this.each(function() {
			$.fn.scrollPagination.init($(this), opts);
		});
	};

	$.fn.stopScrollPagination = function() {
		return this.each(function() {
			$(this).attr('scrollPagination', 'disabled');
		});
	};

	$.fn.scrollPagination.loadContent = function(obj, opts) {
		var target = opts.scrollTarget;
		var mayLoadContent = $(target).scrollTop() + opts.heightOffset >= $(document).height() - $(target).height();
		if (mayLoadContent) {
			$(obj).children().attr('rel', 'loaded');
			opts.loading.start();
			
			var url = opts.contentPage;
			var json = opts.contentData;
			var currentPage = $('#__current_page');
			json.currentPage = currentPage.val();
			
			if(Number(json.currentPage) <= Number(opts.maxPage) ){		
				currentPage.val(Number(json.currentPage)+1);

				$.postJSON(url, json, function(data){
					if(data){
						opts.successCallback(data);
						
						var objectsRendered 	= $(obj).children('[rel!=loaded]');
						if (opts.afterLoad != null) {
							opts.afterLoad(objectsRendered);
						}
						opts.loading.finished();
					}else{
						opts.errorCallback;
					}
				});
			}else{				
				opts.loading.msg.find('img').hide().parent().find('div').html(
						opts.loading.finishedMsg).animate({
					opacity : 1
				}, 2000, function() {
					$(this).parent().fadeOut('normal');
				});
			}
		}
	};

	$.fn.scrollPagination.init = function(obj, opts) {
		var target = opts.scrollTarget;
		$(obj).attr('scrollPagination', 'enabled');
		$(obj).append('<input type="hidden" id="__current_page" value="3"/>');
		$(target).scroll(function(event) {
			if ($(obj).attr('scrollPagination') == 'enabled') {
				$.fn.scrollPagination.loadContent(obj, opts);
			} else {
				event.stopPropagation();
			}
		});
		
		opts.loading.selector = opts.loading.selector || $(obj);
		opts.loading.msg = $('<div id="infscr-loading"><img alt="Loading..." src="'
				+ opts.loading.img
				+ '" /><div>'
				+ opts.loading.msgText
				+ '</div></div>');
		
		(new Image()).src = opts.loading.img;
		opts.loading.start = opts.loading.start
				|| function() {
					opts.loading.msg.appendTo(opts.loading.selector).show();
				};
		opts.loading.finished = opts.loading.finished || function() {
			opts.loading.msg.fadeOut('normal');
		};
		
		$.fn.scrollPagination.loadContent(obj, opts);
	};

	$.fn.scrollPagination.defaults = {
		'contentPage' : null,
		'contentData' : {},
		'afterLoad' : null,
		'scrollTarget' : null,
		'heightOffset' : 0,
		'successCallback' : function(data){
			alert(data);
			return data;
		},
		'errorCallback' : function(){
			alert('ERROR');
		},
		'maxPage': 1,
		loading : {
			finished : undefined,
			finishedMsg: 'Today end',
			img: 'loading.gif',
			msg : null,
			msgText : 'Loading...',
			selector : null,
			speed : 'slow',
			start : undefined
		}
	};
})(jQuery);