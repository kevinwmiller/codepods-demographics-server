#!/bin/sh

sudo apt-get update

# Install Git
sudo apt-get install -y git

cd ~
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion
nvm install 9

# Install build-essential for npm packages
sudo apt-get install -y build-essential

sudo npm install yarn -g

cd /vagrant

yarn --no-bin-links