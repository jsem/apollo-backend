FROM node:14

EXPOSE 4000

COPY . app/

WORKDIR /app

RUN npm ci --production

CMD ["npm", "run", "start:ci"]