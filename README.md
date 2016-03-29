# Engagement Lab Website Framework
[![Code Climate](https://codeclimate.com/github/engagementgamelab/EL-Website/badges/gpa.svg)](https://codeclimate.com/github/engagementgamelab/EL-Website)
[![Dependency Status](https://david-dm.org/engagementgamelab/EL-Webite.svg)](https://david-dm.org/engagementgamelab/EL-Website)

The Engagement Lab's CMS-driven website framework.

This repo also houses all code for the Lab's homepage, viewable at [elab.emerson.edu](http://elab.emerson.edu).

We built this app using the lovely and talented [KeystoneJS](https://github.com/keystonejs/keystone).

Feel free to fork!

Need code docs? We [got 'em](https://documentup.com/engagementgamelab/EL-Website/#framework-api) (or see below).

## Documentation

### Development Server Installation:
## Pre-requisites

Install [MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/).

Install [nvm](https://github.com/creationix/nvm) (make sure that [wget](http://osxdaily.com/2012/05/22/install-wget-mac-os-x/) is installed):
```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
nvm install v0.12.7
. ~/.nvm/nvm.sh
```

Install grunt command line tools:
```
sudo npm install -g grunt-cli
```

Open bash profile (if it doesn't exist, run ```touch ~/.bash_profile```):
```
open -a TextEdit ~/.bash_profile
```

Paste these lines in to have nvm and grunt automatically sourced upon login:
```
export PATH=/usr/local/share/npm/lib/node_modules/grunt-cli/bin:$PATH
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh
```

Restart your terminal.

## Installing
Get the repo:
```
git clone https://github.com/engagementgamelab/EL-Website.git
cd EL-Website
```

Get node v0.12.7:

```
nvm install 0.12.7
```

Install packages:
```
npm install
```

If you get an error about browserify during install, you may need to run:
```
cd node_modules/keystone && npm install browserify
cd ../..
```

Install [nodemon](http://nodemon.io/) globally if not installed:
```
npm install -g nodemon
```

Create a file called .env in the root of the project 
```
touch .env
open .env
```

Then paste in the following content:
```
NODE_ENV=development
KEYSTONE_DEV=true npm start
COOKIE_SECRET=5@[,CNwnN#03d!yV|.HnRF*10>]yo%PdI]zXoOBSb-mVB.O`Z*f/Akq%{Rhq37Mh
```

There is additional required config you will need for this file, but it contains confidential auth keys, so you'll find it only in the Google Doc 'Server Config' in the Lab's shared folder 'Master Projects/Website/Development'.

If you are forking this repo outside of the Engagement Lab, you'll need config values for the following keys, depending on the features you are using:
```
CLOUDINARY_URL  
EMBEDLY_API_KEY  
AZURE_STORAGE_ACCOUNT
AZURE_STORAGE_ACCESS_KEY
SLACK_HOOK_URI
SLACK_API_KEY
```

Finally, let's use grunt to start up the server:
```
grunt
```

This command will lint our code, initialize the development server via nodemon, and start node-inspector.
By default, running the server mounts all site modules under /sites. This can be overriden via the '--sites' CLI argument, which will mount only those specified.
```
grunt --sites=site-1,site-2
````

If you get some kind of error, kill grunt and just run `node keystone`. You may have a config issue.

Using a browser, navigate to `localhost:3000` to visit the website

To visit the CMS dashboard for any site module, navigate to `[site domain].localhost:3000/keystone`. The default login credentials are:
```
user: user@elab.emerson.edu
pass: engagement
```
* *** These login credentials should be removed for a prodution server. *** *

### Production Server Installation:
## Pre-requisites

As with the development server, you will need [MongoDB](https://mongodb.org) installed. [nvm](https://github.com/creationix/nvm) is recommended but optional.

You will also need grunt installed. Please see above for install steps.

## pm2

We at the Engagement Lab use [pm2](http://pm2.keymetrics.io/) to handle our Node production deployments. You don't have to, of course. When you fork the repo, you can always clone/pull and install, though I can't imagine why you'd go that route. To each their own, I guess?

If you _do_ want to use pm2, you should read their [quick start](http://pm2.keymetrics.io/docs/usage/quick-start/) and other docs to install and set it up on your box. These docs are fairly exhaustive.

## Setting up the deployment

The docs mentioned above go into a lot of detail, but here's the basic steps to deploy.

Your ``ecosystem.json`` file already looks something like this, just plug what you need in:

```
{
  "apps" : [{
    "name": "EL Website",
    "script": "keystone.js",
    "env_production": {
      "NODE_ENV": "production"
    }
  }],
  "deploy" : {
    "production" : {
      "user": "[PRODUCTION USER]",
      "host": "[PRODUCTION IP]",
      "repo": "git@github.com:engagementgamelab/EL-Website.git [OR YOUR FORK URL]",
      "ref": "origin/master",
      "path": "[PRODUCTION PATH]",
      "pre-deploy-local" : "echo 'Cloning and running npm install. Be patient.'",
      "post-deploy" : "npm install ; grunt compile ; grunt periodic; pm2 startOrRestart ecosystem.json --env production",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

This file basically tells pm2 to deploy the master branch HEAD to the production server, install packages, run the 'compile' task to minify/uglify assets, start the 'periodic' grunt task, and re/boot keystone.

Note that you will still need to set ``NODE_ENV`` to 'production' in your server's ``.env``.

## Authenticating like a boss

If you run the deployment normally, you will need to enter the production user's password constantly. It's annoying. So you should setup auto-login by using ``ssh-keygen`` and ``ssh-copy-id`` locally. Here's a [great tutorial](http://www.thegeekstuff.com/2008/11/3-steps-to-perform-ssh-login-without-password-using-ssh-keygen-ssh-copy-id/) on doing all that. I believe in you!

_Disclaimer_: When you run ``ssh-keygen`` you should not assign a password to your keys as pm2 can't handle this. This can pose a security risk since anyone with access to your terminal can theoretically ssh into your production server. So you ought not to do deployments from a remote server that other people have access to -- only a local machine, and ideally have your production's SSH port behind a VPN. Just be aware!

## Run it!

If your ``ecosystem.json`` is setup correctly, that's all you should need to do. Run ``grunt deploy:environment_name`` and let the magic happen.

## Framework API


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

