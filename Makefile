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
	@git pull \
		&& docker-compose -f docker-compose.prod.yml -p khala_$(git rev-parse --short HEAD) up --build -d

go-live:
	@make reload-nginx \
		&& docker ps --filter "label=com.docker.compose.project" -q | xargs docker inspect --format='{{index .Config.Labels "com.docker.compose.project"}}'| sort | uniq | grep -v $(git rev-parse --short HEAD) | xargs -I{} docker-compose -f docker-compose.prod.yml -p {} down \
		&& reload-nginx

reload-nginx:
	@docker exec $(docker ps -f name=nginx --quiet) /usr/sbin/nginx -s reload

.PHONY: process serve start codegen migration migrate up down
