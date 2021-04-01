FROM node:12.20.1-alpine

WORKDIR /task

ADD package.json /task

RUN npm i --silent

ADD . /task
