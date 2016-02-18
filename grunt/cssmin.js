module.exports = {

  target: {
    options: { keepSpecialComments: 0 },
    files: { 'public/release/core.css': ['public/styles/bootstrap/bootstrap.css', 'public/release/tmp/concat.css']
           }
    /*files: [{
      expand: true,
      cwd: 'release/css',
      src: [],
      dest: 'release/style',
      ext: '.min.css'
    }]*/
  }

};
