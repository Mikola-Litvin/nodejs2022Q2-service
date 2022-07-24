FROM node:16-alpine
WORKDIR /usr/nodejs2022Q2-service
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
