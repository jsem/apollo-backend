FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm ci --production

EXPOSE 4000

CMD ["npm", "run", "start:ci"]