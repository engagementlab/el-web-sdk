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
. ~/.nvm/nvm.sh
```

Add these lines to your ```~/.bashrc``` file (```nano ~/.bashrc```) to have nvm automatically sourced upon login:
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

Restart your terminal.

Get node v0.12.7:

```
nvm install 0.12.7
```



Install packages:
```
npm install
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

And boot up keystone!
```
nodemon keystone
```