FROM node:12-alpine
# FROM arm32v7/node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm --version
RUN npm install
RUN npm run build

CMD [ "node", "main.js" ]
