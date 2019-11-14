FROM arm32v7/node:10-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

CMD [ "node", "main.js" ]
