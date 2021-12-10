FROM node:14 AS builder
WORKDIR /hydra-build
ADD package.json .
ADD yarn.lock .
RUN yarn install --frozen-lockfile
ADD tsconfig.json .
ADD src src
RUN yarn run build


FROM node:14 AS processor
WORKDIR /hydra-project
ADD package.json .
ADD yarn.lock .
RUN yarn install --frozen-lockfile # TODO: --production
COPY --from=builder /hydra-build/lib lib
ADD db db
ADD manifest.yml .
ADD schema.graphql .
ADD .env .
CMD ["yarn", "run", "processor:start"]


FROM processor AS query-node
CMD ["node", "./lib/generated/server.js"]