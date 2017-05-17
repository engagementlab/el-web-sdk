/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2017
 * ==============
*/

 /**
 * 
 *
 * @class Jobs
 * @name jobs/tunnel
 */
'use strict';

var tunnel = function(grunt, options, async) {

	var done = async();

	// No need for tunneling if localhost
	if(grunt.config('sync.' + options.args[0]) === 'local') {
		done();	
		return;
	}


	var config = {

	  username:'node',
	  privateKey: require('fs').readFileSync(process.env.HOME + '/.ssh/id_rsa'),
	  host: grunt.config('sync.' + options.args[0]),
	  dstPort: 27017,
	  localHost: '127.0.0.1',
	  localPort: 4321
	
	};

	var tunnel = require('tunnel-ssh');
	tunnel(config, function(error, tnl) {

		done();

	});

}

module.exports = tunnel;