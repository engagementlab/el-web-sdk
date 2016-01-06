# EL-Website
### Installation instructions:

Get the repo:
```
git clone https://github.com/engagementgamelab/EL-Website.git
cd EL-Website
```

Install [nvm](https://github.com/creationix/nvm):
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

Restart your terminal and go back to the repo dir.

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

Create a file called .env in the root of the project with the following content:
```
NODE_ENV=development
KEYSTONE_DEV=true npm start
COOKIE_SECRET=5@[,CNwnN#03d!yV|.HnRF*10>]yo%PdI]zXoOBSb-mVB.O`Z*f/Akq%{Rhq37Mh
CLOUDINARY_URL=cloudinary://851373748637243:uTK26M1JKJjOsesQ9vZsXasj9cw@engagement-lab-home
EMBEDLY_API_KEY=6854c1facf7a4eb6bdfe5bbd663ced50
```

Let's use grunt to start up the server:
```
grunt serve
```
