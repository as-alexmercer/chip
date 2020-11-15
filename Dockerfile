FROM node:14

WORKDIR  //. .

COPY package*.json ./

RUN npm install

COPY . .

ENV PROD=true

CMD [ "npm","start" ] 