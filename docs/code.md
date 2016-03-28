

<!-- Start server.js -->

## server/mount

Mount a sub-module in /sites as a virtual host.

### Examples:

    mountSiteModule('engagement-lab-home');

See: https://www.npmjs.com/package/express-vhost

### Params:

* **String** *site* The name of the module, found in sites/[sitedir]/package.json
* **Boolean** *is* there only one site being mounted?

## server/launch

Start the server. 
This will mount all site modules in ./sites/ or only those specified by the '--sites' CLI argument (e.g. --sites=site-1,site-2).

### Examples:

    launch();

<!-- End server.js -->

<!-- Start sites/config.js -->

## sites/config

Load the config data for the argued site module.

### Examples:

		var siteConfig = require('./sites/config');
   siteConfig( require('site-package-name'), function callback() {} );

### Params:

* **Object** *siteInst* The site module instance
* **Function** *callback* 

### Return:

* **Object** data Site's config data (from config.json)

<!-- End sites/config.js -->

<!-- Start sites/factory.js -->

## sites/factory

Initialize an instance of KeystoneJS and mounts it to the pre-defined ExpressJS app.

### Examples:

   siteFactory( { name: siteName, config: configData, app: appInstance, keystone: siteInst.keystone } );

See: http://www.keystonejs.com/docs/configuration/

### Params:

* **Object** *params* The needed site config and Keystone, Express app, and Mongoose instance refs.
* **Function** *callback* 

### Return:

* **Object** keystone.app Keystone's Express app reference

<!-- End sites/factory.js -->

<!-- Start jobs/news.js -->

## jobs/news

Blog and events (news) retrieval job. Requires setup of Eventbrite API account. Should be run as cron task via grunt/execute.

### Examples:

   // Runs news job every hour from 9a-10p M-F
   0 9-22 * * 1-5 /srv/website/grunt news >/dev/null 2>&1

<!-- End jobs/news.js -->

<!-- Start jobs/readme.js -->

## jobs/readme

Repository readme creation job. Outputs any code comments compatible with markdox as markdown file.

See: https://github.com/cbou/markdox

<!-- End jobs/readme.js -->

<!-- Start Gruntfile.js -->

## grunt

Load all of our grunt tasks.

### Examples:

   All tasks are loaded from ./grunt/*.js and ./sites/**grunt/*.js

### Return:

* Grunt config

## grunt/deploy

Task to deploy to production or staging

### Examples:

   // Deploys to production pm2 config
   grunt deploy --target=production

<!-- End Gruntfile.js -->

