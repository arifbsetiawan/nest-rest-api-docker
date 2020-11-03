FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:12-alpine as production

RUN apk update && apk add bash

RUN npm install pm2 -g

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force --loglevel=error

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["pm2-runtime", "dist/main", "-i", "-1"]