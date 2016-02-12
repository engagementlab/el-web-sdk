/* 
Engagement Lab API
Created by Engagement Lab, 2015
==============
 webgl.js
 WebGL support checker and frame utils.

 Created by Johnny Richardson on 11/12/15.
==============
*/

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
isIE = function() {
  var ua = window.navigator.userAgent;

  // test values
  // IE 10
  //ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  // IE 11
  //ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  // IE 12 / Spartan
  //ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // IE 12 => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

bitSupport = function() {

	return (
			navigator.userAgent.indexOf("WOW64") != -1 ||
			navigator.userAgent.indexOf("Win64") != -1 ||
			navigator.userAgent.indexOf("Mac") != -1
		 );

}

webGLSupport = function() {
	
	var canvas = document.createElement("canvas"),
	context = null,
	names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	
  if (!!window.WebGLRenderingContext) {

		for (var i = 0; i < names.length; ++i) {
			try { context = canvas.getContext(names[i]); }
			catch(e) {}
			
			if (context) { break; }
		}
		
		return context != null;

	}

	return false;

};

embedWebGL = function() {
	var frame = document.getElementById("game_embed");
	
	frame.onload = function() {
    fullscreenWebGL();		
	}
	frame.src="http://engagementlab.itch.io/unlocking-health/";
};

clearWebGL = function() {
	document.getElementById("game_embed").src="about:blank";
};

fullscreenWebGL = function() {
	var content = document.getElementById('game_embed').contentWindow;
	var element = content.document.getElementById('canvas');

	if(content == null)
		return;

	content.document.getElementById('fullscreen_button').addEventListener('click', function() {
	    if (BigScreen.enabled)
	      BigScreen.request(element);
	}, false);
}

$(document).ready(function() {
	
	// Disable/remove webgl elements if not supported and show browser download dialog
	if(!webGLSupport() || isIE() || !bitSupport()) {
		$('#playnow').remove();
		$('.nav #play').remove();

		// Show unsupported row only if 32-bit
		if(!bitSupport())
			$('#browsers').remove();
	}
	else {
		$('#browsers').remove();
		$('#32bit').remove();	
	}

});
$(document).on('opening', '.remodal', function () {
    embedWebGL();
});
$(document).on('closing', '.remodal', function (e) {
    clearWebGL();
});