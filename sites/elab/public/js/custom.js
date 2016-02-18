/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2016
 * ==============
 * 
 * EL homepage global JS
 * ==========
 */

/**
 * Waits for the first child image in the provided element to load and then dispatches provided callback.
 * @module utils
 * @param {jQuery selector} parentElem - The parent element containing image.
 * @param {function} callback - The callback function.
 */
imageLoaded = function(parentElem, callback) {

	parentElem.find('img').first().on('load', function() {

		// Image loaded, callback fires
		callback();

	})
	.each(function() {

		// Force image to dispatch 'load' (cache workaround)
	  if(this.complete) $(this).load();

	});

};