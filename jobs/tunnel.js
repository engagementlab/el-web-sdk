/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2017
 * ==============
*/

 /**
 * Repository readme creation job. Outputs any code comments compatible with markdox as markdown file.
 *
 * @class Jobs
 * @name jobs/tunnel
 * @see https://github.com/cbou/markdox
 */
'use strict';

var tunnel = function(grunt, options, async) {

	var done = async();

	var config = {

	  username:'node',
	  privateKey: require('fs').readFileSync('/Users/Johnny/.ssh/id_rsa'),
	  host: grunt.config('sync.host'),
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