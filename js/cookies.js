// cookies.js
// You can use this code for your projects!
// Derived from the Bill Dortch code at http://www.hidaho.com/cookies/cookie.txt
//getters and setters for cookies
window.getCookieVal = function (offset) {
	var endstr = document.cookie.indexOf(";", offset);
	if (endstr == -1) { endstr = document.cookie.length; }
	return unescape(document.cookie.substring(offset, endstr));
}

window.GetCookie = function (name) {
	//pass in the value of the cookie to find

	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	//get whole cookie length and loop through
	var i = 0;
	while (i < clen) {
		//checking for a specific cookie
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return getCookieVal(j);
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

//needs a name, doesn't need path and domain

window.DeleteCookie = function (name, path, domain) {
	//if cookie exists
	if (GetCookie(name)) {
		document.cookie = name + "=" +
			//set path and domain to nothing
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

/////////
// use:
//		SetCookie('name', 'value', 3000);
//		SetCookie('name', 'value', 1000,false,false,false,true);
//		If set the secure (last arg) to true, you MUST be on an https connection!
/////////
window.SetCookie = function (name, value, maxAge, path, domain, sameSite, secure) {
	document.cookie = name + "=" + escape(value) +
		((maxAge) ? ";max-age=" + maxAge : "") +
		((path) ? ";path=" + path : "") +
		((domain) ? ";domain=" + domain : "") +
		((sameSite) ? ";samesite=" + sameSite : ";samesite=strict") +
		((secure) ? ";secure;" : ";");
}