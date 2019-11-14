FROM arm32v7/alpine
# FROM arm32v7/node:12-alpine

RUN apk add --update nodejs npm

WORKDIR /usr/src/app

COPY . .

RUN npm --version
RUN npm install
RUN npm run build

CMD [ "node", "dist/main.js" ]
