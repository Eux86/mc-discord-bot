FROM arm32v7/node:alpine
# FROM arm32v7/node:12-alpine

WORKDIR /usr/src/app

COPY dist/ .
RUN mkdir node_modules
COPY node_modules/ node_modules/

CMD [ "node", "main.js" ]
