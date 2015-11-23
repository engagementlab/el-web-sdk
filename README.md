# EL-Website
### Installation instructions:

Get the repo and install packages:
```
git clone https://github.com/engagementgamelab/EL-Website.git
cd EL-Website
npm install
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
nvm use 0.12.7
```

Lastly, install [nodemon](http://nodemon.io/) globally if not installed:
```
npm install -g nodemon
```

Boot up keystone:
```
nodemon keystone
```