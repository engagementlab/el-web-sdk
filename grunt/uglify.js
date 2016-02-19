// Core framework-wide JS
module.exports = {

  plugins: {
    files: {
      'public/release/core.js': 
      [
        'public/js/jquery/*.min.js', // jQuery core
        'public/js/bootstrap/*.min.js', // Bootstrap core
        'public/bower_components/**/dist/*.min.js', // Bower
        'public/plugins/*.js',  // Plugins
        'public/plugins/**/*.js',
        'public/js/*.js'
	    ]
    }
  }
  
}