FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
#RUN npm ci --only=production

COPY ./dist .

CMD [ "node", "main.js" ]
