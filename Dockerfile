FROM node:lts-alpine

EXPOSE 4000

WORKDIR /app

COPY . .

RUN npm ci --production

CMD ["npm", "run", "start:ci"]