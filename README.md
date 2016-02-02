# Engagement Lab Website
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
npm install -g grunt-cli
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

If you get some kind of error, kill grunt and just run `node keystone`. You may have a config issue.

Using a browser, navigate to `localhost:3000` to visit the website

To visit the dashboard, navigate to `localhost:3000/keystone`. The login credentials are:
```
user: user@elab.emerson.edu
pass: engagement
```