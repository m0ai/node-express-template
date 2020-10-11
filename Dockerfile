FROM node:12-slim

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "./build/app.js"]
