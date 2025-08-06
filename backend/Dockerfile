# syntax=docker/dockerfile:1

FROM node:23-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

RUN ls -l

EXPOSE 3000

CMD [ "npm", "start" ]
