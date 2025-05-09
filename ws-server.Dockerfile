FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY ws-server.js ./

EXPOSE 4000
CMD ["node", "ws-server.js"]