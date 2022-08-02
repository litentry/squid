FROM node:16-alpine AS node

FROM node AS node-with-gyp
# RUN apk add g++ make python3

FROM node-with-gyp AS builder
WORKDIR /squid
ADD package.json .
ADD yarn.lock .
RUN yarn install --pure-lockfile --non-interactive
ADD tsconfig.json .
ADD src src
RUN yarn build

FROM node-with-gyp AS deps
WORKDIR /squid
ADD package.json .
ADD yarn.lock .
RUN yarn install --pure-lockfile --non-interactive

FROM node AS squid
WORKDIR /squid
COPY --from=deps /squid/package.json .
COPY --from=deps /squid/yarn.lock .
COPY --from=deps /squid/node_modules node_modules
COPY --from=builder /squid/lib lib
ADD db db
ADD schema.graphql .
# TODO: use shorter PROMETHEUS_PORT
ENV PROCESSOR_PROMETHEUS_PORT 3000


FROM squid AS khalaProcessor
EXPOSE 3000
CMD ["yarn", "process:khala"]

FROM squid AS litmusProcessor
EXPOSE 3000
CMD ["yarn", "process:litmus"]

FROM squid AS litentryProcessor
EXPOSE 3000
CMD ["yarn", "process:litentry"]

FROM squid AS queryNode
EXPOSE 4001
CMD ["yarn", "query-node"]

FROM squid AS migrate
RUN yarn add "@subsquid/cli"
CMD ["yarn", "migrate"]