FROM node:14

COPY . .

RUN npm install

CMD npm start