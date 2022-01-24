process: migrate
	@node -r dotenv/config lib/processor.js


serve:
	@npx squid-graphql-server


migrate:
	@npx sqd db:migrate


migration:
	@npx sqd db:create-migration Data


build:
	@npm run build


codegen:
	@npx sqd codegen


typegen: khalaVersions.json
	@npx squid-substrate-typegen typegen.json


khalaVersions.json:
	@make explore


explore:
	@npx squid-substrate-metadata-explorer \
		--chain wss://khala.api.onfinality.io/public-ws \
		--archive https://khala.indexer.gc.subsquid.io/v4/graphql \
		--out khalaVersions.json


up:
	@docker-compose up -d


down:
	@docker-compose down

deploy:
	@docker-compose -f docker-compose.prod.yml down \
		&& git pull \
		&& docker-compose -f docker-compose.prod.yml up --build -d

.PHONY: process serve start codegen migration migrate up down
