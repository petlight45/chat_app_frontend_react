FROM node:current-alpine3.14
WORKDIR /react
COPY . .
RUN npm install
RUN npm run build