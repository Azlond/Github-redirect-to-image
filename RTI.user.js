// ==UserScript==
// @author      Jan Kaiser
// @name        Imgur redirect to image
// @namespace   https://github.com/Azlond/Imgur-redirect-to-image
// @include     https://imgur.com/*
// @exclude     https://imgur.com/privacy
// @version     1.0
// @grant       none
// ==/UserScript==


var URL = window.location + ""; // current URL
var path = URL.slice(18, URL.length - 1); //strip the https://imgur.com/
if (path.length > 4) { //hacky workaround so I don't have to manually exclude all github pages like /jobs or /about
	if (!(/\?+/.test(path))) { // see if the path contains "?" or "/" - if yes, we're not interested
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
