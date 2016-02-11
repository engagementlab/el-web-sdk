module.exports = {
	debug: {
		script: 'server.js',
		options: {
			nodeArgs: ['--debug'],
			env: {
				port: 3000
			}
		}
	}
};
