FROM node:19.4.0-bullseye
WORKDIR app
ADD --chown=node:node package.json package-lock.json ./
RUN npm install
ADD --chown=node:node . .
CMD npx wdio
