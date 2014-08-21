/****************************************************/
var keywordArray=new Array([],[]); //검색어 저장 배열

//검색 키워드 중복있는지 체크
dotory.checkRe=function(searchArray){
//	console.log("check?");
	for(var i=0;i<keywordArray.length;i++){
		for(var j=0;j<keywordArray[i].length;j++){
			if(searchArray[j].match(keywordArray[i][j])){
//				console.log("yes check!");
				console.log(keywordArray[i][j]+" : already have");
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
		if(decodeUri.match(/\&q=(.+)/i)!=null){	//검색어가 있는 검색창이 맞으면
			var search=decodeUri.match(/\&q=(.+)/i)[1],
				searchArray=search.split('+');
			for(var i=0;i<searchArray.length;i++){
				if(i==(searchArray.length-1)){
					var temp=searchArray[i].split('&');
					searchArray[i]=temp[0];		
				}
			}
			if(dotory.checkRe(searchArray)){	//들어온 검색어가 이미 있는 검색어이면
				var result=dotory.matchKeyword(keywordArray,url,title);
				if(result!=null)
					return {keyword:keywordArray[result.index],index:result.index};
				else return{keyword:null,index:null};
			}
			else{
				keywordArray[keywordArray.length]=searchArray;
//				console.log("new keyword : "+keywordArray[keywordArray.length-1]);
				return {keyword:keywordArray[keywordArray.length-1],index:keywordArray.length-1};
			}
		}else{
			var result=dotory.matchKeyword(keywordArray,url,title);
			if(result!=null)
				return {keyword:keywordArray[result.index],index:result.index};
			else
				return{keyword:null,index:null};
		}
	}
	
	//naver
	else if(decodeUri.match(/naver/)!=null){
		if(decodeUri.match(/\&query=(.+)/i)!=null){
//			console.log(decodeUri.match(/\&query=(.+)/i));
			var search=decodeUri.match(/\&query=(.+)/i)[1],
				searchArray=search.split('+');
			for(var i=0;i<searchArray.length;i++){
				if(i==(searchArray.length-1)){
					var temp=searchArray[i].split('&');
					searchArray[i]=temp[0];				
				}
			}
			if(dotory.checkRe(searchArray)){	//들어온 검색어가 이미 있는 검색어이면
				var result=dotory.matchKeyword(keywordArray,url,title);
				if(result!=null)
					return {keyword:keywordArray[result.index],index:result.index};
				else return{keyword:null,index:null};
						
			}
			else{
				keywordArray[keywordArray.length]=searchArray;
				return {keyword:keywordArray[keywordArray.length-1],index:keywordArray.length-1};
			}
		}else{
			var result=dotory.matchKeyword(keywordArray,url,title);
			if(result!=null)
				return {keyword:keywordArray[result.index],index:result.index};
			else return{keyword:null,index:null};
		}
	}
	
	//daum & nate
	else if(decodeUri.match(/daum/)!=null){
		if(decodeUri.match(/\&q=(.+)/i)!=null){
//			console.log(decodeUri.match(/\&query=(.+)/i));
			var search=decodeUri.match(/\&q=(.+)/i)[1],
				searchArray=search.split('+');
			for(var i=0;i<searchArray.length;i++){
				if(i==(searchArray.length-1)){
					var temp=searchArray[i].split('&');
					searchArray[i]=temp[0];				
				}
			}
			if(dotory.checkRe(searchArray)){	//들어온 검색어가 이미 있는 검색어이면
				var result=dotory.matchKeyword(keywordArray,url,title);
				if(result!=null)
					return {keyword:keywordArray[result.index],index:result.index};
				else return{keyword:null,index:null};
			}
			else{
				keywordArray[keywordArray.length]=searchArray;
				return {keyword:keywordArray[keywordArray.length-1],index:keywordArray.length-1};
			}
		}else{
			var result=dotory.matchKeyword(keywordArray,url,title);
			if(result!=null)
				return {keyword:keywordArray[result.index],index:result.index};
			else return{keyword:null,index:null};
		}
	}
	
	//yahoo
	else if(decodeUri.match(/yahoo/)!=null){
		if(decodeUri.match(/\&p=(.+)/i)!=null){
//			console.log(decodeUri.match(/\&p=(.+)/i)[1]);
			var search=decodeUri.match(/\&p=(.+)/i)[1];
			var	searchArray=search.split('+');
			for(var i=0;i<searchArray.length;i++){
				if(i==(searchArray.length-1)){
					var temp=searchArray[i].split('&');
					searchArray[i]=temp[0];		
				}
			}
			if(dotory.checkRe(searchArray))	{
				var result=dotory.matchKeyword(keywordArray,url,title);
				if(result!=null)
					return {keyword:keywordArray[result.index],index:result.index};
				else return{keyword:null,index:null};
			}
			else{
				keywordArray[keywordArray.length]=searchArray;
				return {keyword:keywordArray[keywordArray.length-1],index:keywordArray.length-1};
			}
		}else{
			var result=dotory.matchKeyword(keywordArray,url,title);
			if(result!=null)
				return {keyword:keywordArray[result.index],index:result.index};
			else return{keyword:null,index:null};
		}
	}
	
	else{ //검색해서 얻은 결과가 아니면
		var result=dotory.matchKeyword(keywordArray,url,title);
		if(result!=null)
			return {keyword:keywordArray[result.index],index:result.index};
		else return{keyword:null,index:null};			
	}
	
}

//클릭도니 사이트 title 비교 해 키워드 등록
dotory.matchKeyword=function(keywordArray, url, title){
	console.log("matching....");
	if(keywordArray!=null){
		for(var i=0;i<keywordArray.length;i++){
			for(var j=0;j<keywordArray[i].length;j++){
				console.log("title : "+title);
				var titlelow=title.toLowerCase();
				var keylow=keywordArray[i][j].toLowerCase();
				if(titlelow.match(keylow)!=null){ //배열에 있는 키워드와 맞으면
					//db에 키워드 넣기
					console.log("Input DB : "+keylow);
					return {keyword: keylow, index: i};
				}else{
					//domain 가져오기
					return{keyword:null,index:null};
				}
			}
		}
	}
};

/****************************************************/