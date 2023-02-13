FROM node:14.21-alpine3.16

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn typeorm --dataSource ./src/shared/infra/typeorm/index.ts migration:run

WORKDIR /usr/home/app

CMD [ "yarn", "start" ]

EXPOSE 3000
