FROM node:14.18.1

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

# ENV NODE_ENV develop

# RUN npm run db_local_migration

EXPOSE 3000

CMD ["node", "src/server.js"]