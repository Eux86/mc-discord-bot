FROM arm32v7/node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
#RUN npm ci --only=production

COPY . .

RUN npm run build

CMD [ "node", "main.js" ]
