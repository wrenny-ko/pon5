FROM node:bookworm

WORKDIR /usr/app

COPY public/ /usr/app/public
COPY src/ /usr/app/src
COPY package.json /usr/app

RUN npm install

CMD ["npm", "start"]
