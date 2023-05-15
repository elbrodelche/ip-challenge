FROM node:19.8.1-alpine

WORKDIR /home/node/app
ADD . ./
RUN npm i

USER node
