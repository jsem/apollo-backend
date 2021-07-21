FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm ci --production

CMD ["npm", "run", "start:ci"]