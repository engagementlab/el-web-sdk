// Site-wide stylesheets
module.exports = function() {

  // Output file is relative to this site
  var fileOut = __dirname + '/../public/release/production.css';
  var config = { 
    options: { keepSpecialComments: 0 },
    target: { files: {} }
  };

  // Files to minify
  config.target.files[fileOut] = [

    __dirname + '/../public/styles/site.css', // site SCSS
  
  ];
  /*files: [{
    expand: true,
    cwd: 'release/css',
    src: [],
    dest: 'release/style',
    ext: '.min.css'
  }]*/

  return config;
  
}
