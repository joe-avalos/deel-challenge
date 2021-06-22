FROM node:14.13.1-alpine3.11

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN apk --no-cache --virtual build-dependencies add python make g++
RUN yarn install

COPY . .

RUN yarn seed
