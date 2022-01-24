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
		&& docker-compose -f docker-compose.prod.yml -p khala_$$(git rev-parse --short HEAD) up --build -d \
		&& progress=0 \
		&& bash -c 'until [[ "$$progress" == "1" ]]; do progress=$$(make -s get-progress); echo Indexing $$progress complete. Waiting...; sleep 10; done' \
		&& make go-live

get-progress:
	@curl -s http://$$(docker ps -f name=khala_$$(git rev-parse --short HEAD)_processor_1 --quiet | xargs -I{} docker container port {} 3000/tcp | head -n 1)/metrics/sqd_processor_sync_ratio | tail -n1 | cut -d ' ' -f 2

go-live:
	@make reload-nginx \
		&& docker ps --filter "label=com.docker.compose.project" -q | xargs docker inspect --format='{{index .Config.Labels "com.docker.compose.project"}}'| sort | uniq | grep -v khala_$$(git rev-parse --short HEAD) | xargs -I{} docker-compose -f docker-compose.prod.yml -p {} down \
		&& make reload-nginx

reload-nginx:
	@docker exec $$(docker ps -f name=nginx --quiet) /usr/sbin/nginx -s reload

.PHONY: process serve start codegen migration migrate up down