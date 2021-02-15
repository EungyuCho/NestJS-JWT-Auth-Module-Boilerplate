FROM node:12.13-alpine As development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN cd /usr/src/app

COPY package.json ./

RUN npm install

COPY ./ /usr/src/app

RUN apk add --no-cache make gcc g++ python && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

CMD ["npm", "run", "start"]