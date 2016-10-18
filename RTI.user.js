// ==UserScript==
// @author      Jan Kaiser
// @name        Imgur redirect to image
// @namespace   https://github.com/Azlond/Imgur-redirect-to-image
// @include     https://imgur.com/*
// @include     http://imgur.com/*
// @exclude     https://imgur.com/about
// @exclude     http://imgur.com/about
// @exclude     https://imgur.com/privacy
// @exclude     http://imgur.com/privacy
// @version     1.3
// @grant       GM_xmlhttpRequest
// @run-at      document-start
// ==/UserScript==

var URL = window.location + ""; // current URL
var path;
if (URL.charAt(5) === ":") { // HTTPS
	path = URL.slice(18, URL.length); //strip the https://imgur.com/
} else { // HTTP
	path = URL.slice(17, URL.length); //strip the http://imgur.com/
}
if (path.charAt(path.length - 1) === "/") { //strip the path of a potential slash "/" at the end
	path = path.slice(0, path.length - 1);
}
if (path.length === 5 || path.length === 7) { //hacky workaround, imageIDs appear to be either 5 or 7 characters long
	if (!(/\?+|\//.test(path))) { // see if the path contains "?" or "/", just in case
		GM_xmlhttpRequest({
		  method: "GET", //GET-Request for source code of image-site.
		  url: "https://www.imgur.com/" + path, // needed so we can use @run-at document-start
		  onload: function(response) { 
			document = response.responseText; // set document = requested source code
			var link;
			var linkElements = document.getElementsByTagName("link"); // collect all <link>-elements from the source code 
			if (linkElements[linkElements.length - 1].rel == "image_src") { // the last link-element contains the image_src
				link = linkElements[linkElements.length - 1].href; // set link to the image source
			}
			
			if (link === undefined) { // if link is undefined, we're dealing with a gifv
				link = "https://i.imgur.com/" + path + ".gifv"; // build gifv link, set link-variable;
			}				
			window.location = link; // redirect the current window to the image
		  }
		});
	}
}
