module.exports = {
	dev: {
		tasks: ['nodemon:serve', 'node-inspector', 'watch'],
		options: {
			logConcurrentOutput: true
		}
	}

};
