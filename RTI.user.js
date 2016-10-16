// ==UserScript==
// @author      Jan Kaiser
// @name        Imgur redirect to image
// @namespace   https://github.com/Azlond/Imgur-redirect-to-image
// @include     https://imgur.com/*
// @exclude     https://imgur.com/about
// @exclude     https://imgur.com/privacy
// @version     1.2
// @grant       none
// ==/UserScript==


var URL = window.location + ""; // current URL
var path = URL.slice(18, URL.length); //strip the https://imgur.com/
if (path.charAt(path.length - 1) === "/") { //strip the path of a potential slash "/" at the end
	path = path.slice(0,path.length-1);
}
if (path.length === 5 || path.length === 7) { //hacky workaround, imageIDs appear to be either 5 or 7 characters long
	if (!(/\?+|\//.test(path))) { // see if the path contains "?" or "/", just in case
		try { // try to catch potential errors
			var linkElements = document.getElementsByTagName("link"); // collect all <link>-elements from the source code 
			for (var i = 0; i < linkElements.length; i++) { // go through all object we just collected 
				var element = linkElements[i]; // current link object
				if (element.rel == "image_src") { // if the current objects rel-attribute equals image_src, we have found the link to the image
					window.location = element.href; // redirect the current window to the image
				}
			}
		} catch (e) {
			console.log("If this script throws an error, please report it to me at the github location of this script at:");
			console.log("https://github.com/Azlond/Imgur-redirect-to-image");
			console.log("The error message is: " + e);
			console.log("Thank you.");
		}
	}
}
