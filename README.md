# Litentry Squid

Sample [squid](https://subsquid.io) project to demonstrate its structure and conventions.
It accumulates [kusama](https://kusama.network) account balances and serves them via graphql API.

## Prerequisites

- node 16.x
- docker

## Quickly running the sample

Open 2 terminal windows. In the first run:

```bash
yarn
yarn db:init
yarn dev:polkadot
```

In the second run:

```bash
yarn query-node
```

If you want to index more networks locally just open a new terminal for each one and run:

```bash
yarn dev:{network}
```

_Note: in local development .env is used to expose the database & query node ports._

## Development Guide

TODO: link to gitbook

## Deployments

### Prerequisites

- docker
- docker-compose
- make

### Initial deployment

- Checkout the project on the server
- Run `./init-letsencrypt.sh` to fetch an SSL certificate
- Run `docker-compose -f docker-compose.nginx.yml up -d` to spin up nginx and certbot
- Run `yarn devkit deploy <module_name>`

### Subsequent deployments

- Run `yarn devkit deploy <module_name>`

Make deploy should be a 'no-downtime' deployment. It will spin up new instances of the app and database and once its finished indexing it will switch nginx over to the new containers and tear down the old ones.

### Useful commands

- `docker ps` - list all running containers
- `docker logs *container name*` - output container logs
- `docker exec -it *container name* psql -U postgres` - log into postgres
