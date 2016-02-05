# Engagement Lab Website
### Production Server Installation:
## Pre-requisites

As with the development server, you will need [MongoDB](https://mongodb.org) installed. [nvm](https://github.com/creationix/nvm) is recommended but optional.

You will also need grunt installed. Please see [INSTALLING](INSTALLING.md) for install steps.

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

If your ``ecosystem.json`` is setup correctly, that's all you should need to do. Run ``grunt deploy`` and let the magic happen.