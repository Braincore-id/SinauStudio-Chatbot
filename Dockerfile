FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@9.5.1

RUN npm audit fix --force

RUN npm install --omit=dev

COPY . ./

CMD [ "node", "server.js" ]