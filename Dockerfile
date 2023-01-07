FROM node:18-slim as development

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /user/app

COPY package.json yarn.lock ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

RUN yarn

RUN yarn prisma:generate

COPY . . 

RUN yarn build

FROM node:18-slim as production

RUN apt-get update
RUN apt-get install -y openssl

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /user/app

COPY package.json yarn.lock ./

COPY prisma ./prisma/

COPY .env ./

RUN yarn install --frozen-lockfile

RUN yarn prisma:migrate:deploy

RUN yarn prisma:generate

COPY --from=development /user/app/build ./build

EXPOSE 3000

CMD ["node", "build/server.js"]