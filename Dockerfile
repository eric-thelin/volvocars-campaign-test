FROM node:19.4.0-bullseye
RUN apt-get update \
		&& apt-get install --yes libcairo2-dev libjpeg62-turbo-dev libpango1.0-dev libgif-dev build-essential g++ \
		&& rm -rf /var/lib/apt/lists/*
WORKDIR app
ADD --chown=node:node package.json package-lock.json ./
RUN npm install
ADD --chown=node:node . .
CMD npx wdio
