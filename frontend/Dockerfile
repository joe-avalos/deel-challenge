FROM node:14.13.1-alpine3.11

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
