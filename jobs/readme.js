/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2016
 * ==============
*/

 /**
 * Repository readme creation job. Outputs any code comments compatible with markdox as markdown file.
 *
 * @class Jobs
 * @name jobs/readme
 * @see https://github.com/cbou/markdox
 */
'use strict'
var markdox = require('markdox');

var files = ['server.js', 'sites/config.js', 'sites/factory.js', 'jobs/news.js', 'jobs/readme.js'];

markdox.process(files, 'docs/code.md', function(){
  console.log('File `docs/code.md` generated with success');
});