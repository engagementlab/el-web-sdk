module.exports = function(appRoot, callback) {

	var siteDir = appRoot.substr(0, appRoot.lastIndexOf('/')); 
	
	require('fs').readFile(siteDir + '/config.json', {encoding: 'utf8'}, function (err, data) {
	  if (err) throw err;
	  callback(JSON.parse(data));

	});
	
};