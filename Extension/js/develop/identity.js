// @corecode_begin getProtectedData
function xhrWithAuth(method, url, interactive, callback) {
    var access_token;

    var retry = true;

    getToken();

    function getToken() {
    	chrome.identity.getAuthToken({ interactive: interactive }, function(token) {
    		if (chrome.runtime.lastError) {
    			callback(chrome.runtime.lastError);
    			return;
    		}

    		access_token = token;
    		requestStart();
    	});
    }

	function requestStart() {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
		xhr.onload = requestComplete;
		xhr.send();
	}

	function requestComplete() {
		if (this.status == 401 && retry) {
			retry = false;
			chrome.identity.removeCachedAuthToken({ token: access_token }, getToken);
		} else {
			callback(null, this.status, this.response);
		}
	}
}

function getUserInfo(interactive) {
	xhrWithAuth('GET', 'https://www.googleapis.com/plus/v1/people/me', interactive, onUserInfoFetched);
}
  // @corecode_end getProtectedData


// Code updating the user interface, when the user information has been
// fetched or displaying the error.
function onUserInfoFetched(error, status, response) {
	if (!error && status == 200) {
		//console.log(response);
		var user_info = JSON.parse(response);
		populateUserInfo(user_info);
		$('.dotory_login').fadeOut();
	} else {
    	
	}
}

function populateUserInfo(user_info) {
	fetchImageBytes(user_info);
	fetchUserInfo(user_info);
}
	
function fetchUserInfo(user_info){
	dotory.loading.start(); // sing-in-start
	$('#user_name').text(user_info.displayName);
	
	var url = dotory.contextPath + '/signin?data='+user_info.id;

	$.getJSON(url, function(object){
		var data = object.data;
		if(object.code == 200){
			dotory.user = data.user;
			// ~ User Signin Success
			if(dotory.type == dotory.types.main){
				dotory.metro.binding();
				dotory.history.binding();
				dotory.image.binding();
			}else if(dotory.type == dotory.types.web){
				dotory.web.binding();
			}
			
			if(dotory.isLogin){
				dotory.isLogin = false;
				for(var i=0; i<dotory.request_stack.length; i++){
					var rs = dotory.request_stack[i];
					dotory.afterLoginDo(rs.request, rs.sender, rs.sendResponse);
				}
			}
		} 
	});
}
  
function fetchImageBytes(user_info) {
	if (!user_info || !user_info.image || !user_info.image.url) return;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', user_info.image.url, true);
	xhr.responseType = 'blob';
	xhr.onload = onImageFetched;
	xhr.send();
}
	
function onImageFetched(e) {
	if (this.status != 200) return;
	var imgElem = document.createElement('img');
	var objUrl = window.webkitURL.createObjectURL(this.response);
	imgElem.src = objUrl;
	imgElem.onload = function() {
		window.webkitURL.revokeObjectURL(objUrl);
	}
	$('#user_image').html(imgElem);   
}

// OnClick event handlers for the buttons.

/**
	Retrieves a valid token. Since this is initiated by the user
	clicking in the Sign In button, we want it to be interactive -
	ie, when no token is found, the auth window is presented to the user.
	
	Observe that the token does not need to be cached by the app.
	Chrome caches tokens and takes care of renewing when it is expired.
	In that sense, getAuthToken only goes to the server if there is
	no cached token or if it is expired. If you want to force a new
	token (for example when user changes the password on the service)
	you need to call removeCachedAuthToken()
**/
function interactiveSignIn() {
	dotory.loading.start(); // sign-in-loading-start
	// @corecode_begin getAuthToken
	// @description This is the normal flow for authentication/authorization
	// on Google properties. You need to add the oauth2 client_id and scopes
	// to the app manifest. The interactive param indicates if a new window
	// will be opened when the user is not yet authenticated or not.
	// @see http://developer.chrome.com/apps/app_identity.html
	// @see http://developer.chrome.com/apps/identity.html#method-getAuthToken
	chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    	if (chrome.runtime.lastError) {
    	  	//console.log(chrome.runtime.lastError);
      	} else {
      		$('.dotory_login').fadeOut();
      		getUserInfo(false);
      		//console.log('Token acquired:'+token+ '. See chrome://identity-internals for details.');
      	}
    });
    // @corecode_end getAuthToken
}
  
function revokeToken() {
    chrome.identity.getAuthToken(
	{ 'interactive': false },
	function(current_token) {
		if (!chrome.runtime.lastError) {
			// @corecode_begin removeAndRevokeAuthToken
			// @corecode_begin removeCachedAuthToken
			// Remove the local cached token
			chrome.identity.removeCachedAuthToken({ token: current_token }, function() {});
			// @corecode_end removeCachedAuthToken
			
			// Make a request to revoke token in the server
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + current_token);
			xhr.send();
			// @corecode_end removeAndRevokeAuthToken
			
			// Update the user interface accordingly
			//console.log('Token revoked and removed from cache. '+ 'Check chrome://identity-internals to confirm.');
			$('.dotory_login').fadeIn();
		}
	});
}

dotory.signin = function(){ 	
	$('#signin').on('click', function(){
		interactiveSignIn();
	});
	
	$('.user_logout').on('click', function(){
		revokeToken();
	});
	
	getUserInfo(false);
}