module.exports = {
	
	debug: {
		script: 'server.js',
		options: {
			nodeArgs: ['--debug'],
			verbose: true,
			env: {
				port: 3000
			}
		}
	},

	serve: {
		script: 'server.js',
		options: {
			ignore: ['node_modules/**', 'jobs/**', 'grunt/**', 'sites/**/node_modules/**', 'sites/**/grunt/**', 'sites/**/public/plugins/**', 'sites/**/public/styles/*.css']
		}
	}

};
