FROM node:current-alpine3.14
WORKDIR /react
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
RUN npm run build