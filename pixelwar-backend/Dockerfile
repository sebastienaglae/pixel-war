# Dockerfile for Express.js app with bin/www as entry point
FROM node:slim

ENV NODE_ENV=production

WORKDIR /app
COPY . .

RUN npm install

CMD ["node", "bin/www"]

EXPOSE 3000