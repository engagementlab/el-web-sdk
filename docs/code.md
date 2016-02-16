

<!-- Start server.js -->

## server/mount

Mount a sub-module in /sites as a virtual host.

### Examples:

    mountSiteModule('engagement-lab-home');

See: https://www.npmjs.com/package/express-vhost

### Params:

* **String** *site* The name of the module, found in sites/[sitedir]/package.json

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

   siteFactory( { config: configData, app: appInstance, keystone: siteInst.keystone, mongoose: siteInst.mongoose } );

See: http://www.keystonejs.com/docs/configuration/

### Params:

* **Object** *params* The needed site config and Keystone, Express app, and Mongoose instance refs.
* **Function** *callback* 

### Return:

* **Object** keystone.app Keystone's Express app reference

<!-- End sites/factory.js -->

<!-- Start jobs/news.js -->

## jobs/news

Blog and events (news) retrieval job. Requires setup of Eventbrite API account.

<!-- End jobs/news.js -->

<!-- Start jobs/readme.js -->

## jobs/readme

Repository readme creation job. Outputs any code comments compatible with markdox as markdown file.

See: https://github.com/cbou/markdox

<!-- End jobs/readme.js -->

