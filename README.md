# subsquid-mappings

Litentry mappings as defined here: https://docs.subsquid.io/mappings. To be hosted on Subsquid's infrastructure

## Overview

Subsquid are currently providing us a fully managed hosting service.

We are responsible for writing the mappings (logic to handle event and extrinsic data from the chain) and writing the Graphql schema (`hydra-cli codegen` converts our Graphql schema to Postgres automatically).

## Deployment

When we push to main [this workflow](https://github.com/litentry/subsquid-mappings/blob/main/.github/workflows/deploy.yml) is triggered, it authenticates us with Subsquid, deleted the existing version and replaces it with a new one. It relies on `SQD_KEY` in Github secrets.

## Running locally

1. Run `docker-compose up` to create the local postgres database.

2. In a 2nd terminal run `yarn db:create` to create the database.

3. Run `yarn db:migrate` to update the database.

4. Run `yarn processor:migrate` to update the processor (_todo - make a note of what this actually does_).

5. Run `yarn processor:start` to process events and extrinsics.

6. In a 3rd terminal run `yarn query-node:start` to start a [local graphql server](http://localhost:4000/graphql).

## Viewing the database in a GUI

To view the database in a GUI install [pgAdmin](https://www.pgadmin.org/download/) and add a new server, give it an arbitrary name, go to the connection tab, enter `0.0.0.0` for hostname, then enter `postgres` for both user and password. _There is no requirement to use pgAdmin, the connection details will work with whatever you choose._

## Indexing new data

- Add the `events` and `calls` (extrinnsics) you want to generate Polkadot types for, then run `yarn typegen`. This will update the content of `src/types`.

- Add the new schema in `schema.graphql` then run `yarn codegen`. This will update the content of `src/generated`.

- Create the new event and extrinsic mappings handlers in `src/mappings` then export them from `src/mappings/index.ts`.

- Declare the new handlers in `manifest.yml` under `eventHandlers` and/or `extrinsicHandlers`
