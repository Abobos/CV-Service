FROM node:18-alpine3.16 

WORKDIR /usr/src/app

COPY ["tsconfig.json", "package.json", "yarn.lock", "./"]

RUN yarn install --pure-lockfile --non-interactive

COPY . .

RUN yarn build

EXPOSE 4000

CMD ["node", "dist/server.js"]