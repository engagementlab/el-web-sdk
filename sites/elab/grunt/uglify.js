module.exports = {

  plugins: {
    files: {
      'public/release/production.js': 
      [
        'public/js/jquery/*.min.js', // Core
        'public/js/bootstrap/*.min.js',
        'public/plugins/*.js',  // Plugins
        'public/plugins/**/*.js',
        'public/bower_components/**/dist/*.min.js'
	    ]
    }
  }
  
}
