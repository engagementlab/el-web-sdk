// Site-wide JS
module.exports = function() {

  // Output file is relative to this site
  var fileOut = __dirname + '/../public/release/production.js';
  var config = { uglify: { files: {} } };

  // Files to uglify
  config.uglify.files[fileOut] = [

    __dirname + '/../public/js/*.js', // js for the site
    __dirname + '/../public/plugins/*.js',  // Plugins
    __dirname + '/../public/plugins/**/*.js',
  
  ];

  return config;
  
}
        