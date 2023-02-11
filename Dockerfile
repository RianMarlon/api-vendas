FROM node:14.21-alpine3.16

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn typeorm migration:run

WORKDIR /usr/home/app

CMD [ "yarn", "start" ]

EXPOSE 3000
