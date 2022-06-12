FROM node:lts-alpine
WORKDIR /service
COPY ./package.json .
COPY ./.npmrc .
RUN npm i -g pnpm
RUN pnpm i
COPY ./src ./src
COPY ./.qbot ./.qbot
COPY ./nest-cli.json .
COPY ./tsconfig.json .
CMD pnpm start