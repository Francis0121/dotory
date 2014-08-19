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