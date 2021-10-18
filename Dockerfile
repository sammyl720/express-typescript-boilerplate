FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install

COPY ./src /app/src

RUN npm run build

ENV PORT 80

ENV NODE_ENV production

EXPOSE 80 

CMD ["npm", "start"]