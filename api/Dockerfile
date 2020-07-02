FROM node:12

WORKDIR /app

COPY package.json /app
RUN yarn install
COPY . /app

EXPOSE 4001

CMD ["yarn", "start:dev"]
