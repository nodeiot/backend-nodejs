FROM node:22.17-slim

WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 3300

CMD [ "npm", "start" ]