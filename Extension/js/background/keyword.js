/****************************************************/
var keywordArray=new Array(); //검색어 저장 배열

//검색 키워드 중복있는지 체크
dotory.checkRe=function(searchArray){
	for(var i=0;i<keywordArray.length;i++){
		for(var j=0;j<keywordArray[i].length;j++){
			if(searchArray[j].match(keywordArray[i][j])){
				console.log('Already Have : ' +keywordArray[i][j]);
				return true;
			}else
				return false;
		}
	}
}

// ~ https://www.google.co.kr/webhp?sourceid=chrome-instant&ion=1&espv=2&es_th=1&ie=UTF8#q=metro+ui+css+template&revid=1010655525
// ~ https://www.google.co.kr/?gws_rd=ssl#newwindow=1&q=google+translate&revid=-1
// ~ https://www.google.co.kr/?gws_rd=ssl#newwindow=1&q=anything
dotory.queryMatch = function(url,title){
	var domain_regexs = [ /google/, /naver/, /daum/, /yahoo/, /nate/, /bing/ ];
	var query_regexs = [ 	
		                    [ /q=/  ], // google
							[ /query=/i ], // naver
							[ /q=/i ], // daum
							[ /p=/i ], // yahoo 
		                    [ /q=/i	], // nate
		                    [ /q=/i	] // bing
		               ]; 
	
	for(var i=0; i<domain_regexs.length; i++){
		var domain_regex = domain_regexs[i];
	
		var search = '';
		var searchList = new Array();
		
		if(url.match(domain_regex) != null){
			
			// ~ url decode start
			url = decodeURIComponent(url);
			var factor = '';
			var factorList = new Array();
			if(url.match(/\?.+/i) != null){
				factor = url.match(/\?.+/i)[0];
				factor = factor.replace(/\?/, '');
			}else{
				var result = dotory.matchKeyword(url, title);
				if( result != null )
					return { keyword:keywordArray[result.index], index:result.index };
				else 
					return { keyword:null,index:null };	
			}
			
			
			if( factor != '' && factor != null || factor != undefined){
				factorList = factor.split(/\&/);
			}
			
			// ~ Google Exception ... (ex: ie=UTF-8#query=search_keyword)
			for(var i=0; i<factorList.length; i++){
				var atom = factorList[i];
				if(atom.match(/\#/) != null){
					var array = atom.split(/\#/);
					for(var j=0; j<array.length; j++){
						if(j == 0){
							factorList[i] = array[j];
						}else{
							factorList.push(array[j]);
						}
					}
				}
			}
			
			// ~ url decode end
			
			var regex =  query_regexs[i][0];
			for(var i=0; i<factorList.length; i++){
				if(factorList[i].match(regex) != null){
					search = factorList[i];
					break;
				}
			}
			search = search.replace(regex, '');
			search = search.replace(/\+/g, ' ');
			//console.log('URL : ' + url + ' Search : '+ search );
		}else{
			continue;
		}
		
		searchList = search.split(' ');
		//console.log('Keyword List='+searchList);
		
		// ~ Search Keyword is matching
		if(dotory.checkRe(searchList)){	
			var result = dotory.matchKeyword(url, title);
			if(result!=null)
				return { keyword:keywordArray[result.index], index:result.index };
			else 
				return { keyword:null, index:null};
		}else{
			keywordArray[keywordArray.length]=searchList;
			return { keyword: keywordArray[keywordArray.length-1], index:keywordArray.length-1 };
		}
	}
	
	var result = dotory.matchKeyword(url, title);
	if( result != null )
		return { keyword:keywordArray[result.index], index:result.index };
	else 
		return { keyword:null,index:null };	
};


//클릭도니 사이트 title 비교 해 키워드 등록
dotory.matchKeyword=function(url, title){
	//console.log('Matching keyword : ' + keywordArray);
	var match=0;
	if(keywordArray!=null){
		for(var i=0;i<keywordArray.length;i++){
			for(var j=0;j<keywordArray[i].length;j++){
//				console.log("title : "+title);
				var titlelow=title.toLowerCase();
				var keylow=keywordArray[i][j].toLowerCase();
				//console.log(titlelow+keylow);
				if(titlelow.match(keylow)!=null){ //배열에 있는 키워드와 맞으면
					//db에 키워드 넣기
					//console.log('Input Database : ' + keylow);
					match = 1;
//					return {keyword: keylow, index: i};
				}
			}
			if(match==1){
				//console.log('Match == 1');
				return {keyword: keywordArray[i], index: i};
			}
		}
		return{keyword:null,index:null};//domain 가져오기
	}
};

/****************************************************/