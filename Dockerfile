FROM node:12 as builder

WORKDIR /app

COPY package*.json tsconfig*.json ./

RUN npm ci && npm run build

COPY . .

FROM node:12-alpine as production

RUN apk update && apk add bash

RUN npm install pm2 -g

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm ci --only=production && npm cache clean --force --loglevel=error

COPY --chown=node:node . .

COPY --from=builder /app/dist ./dist

CMD ["pm2-runtime", "./dist/main.js", "-i", "-1"]