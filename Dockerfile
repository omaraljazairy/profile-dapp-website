FROM node:16.17.0

WORKDIR /profile

RUN apt-get update
RUN apt-get install -y wget vim git zip unzip less sqlite3 bsdmainutils bc tree

# install packages from the package.json file
# WORKDIR nft-marketplace
# RUN npm install