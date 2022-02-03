processKhala: migrate
	@node -r dotenv/config lib/processors/khalaProcessor.js

processPolkadot: migrate
	@node -r dotenv/config lib/processors/polkadotProcessor.js

processKusama: migrate
	@node -r dotenv/config lib/processors/kusamaProcessor.js

serve:
	@yarn squid-graphql-server


migrate:
	@yarn sqd db:migrate


migration:
	@yarn sqd db:create-migration Data


build:
	@yarn build


codegen:
	@yarn sqd codegen


typegenKusama: chains/kusama/kusamaVersions.json
	@yarn squid-substrate-typegen chains/kusama/kusamaTypegen.json

exploreKusama:
	@yarn squid-substrate-metadata-explorer \
		--chain wss://kusama.api.onfinality.io/public-ws \
		--archive https://kusama.indexer.gc.subsquid.io/v4/graphql \
		--out chains/kusama/kusamaVersions.json

typegenKhala: chains/khala/khalaVersions.json
	@yarn squid-substrate-typegen chains/khala/khalaTypegen.json

exploreKhala:
	@yarn squid-substrate-metadata-explorer \
		--chain wss://khala.api.onfinality.io/public-ws \
		--archive https://khala-squid-archive.litentry.io/graphql/v1/graphql \
		--out chains/khala/khalaVersions.json

typegenPolkadot: chains/polkadot/polkadotVersions.json
	@yarn squid-substrate-typegen chains/polkadot/polkadotTypegen.json

explorePolkadot:
	@yarn squid-substrate-metadata-explorer \
		--chain wss://polkadot.api.onfinality.io/public-ws \
		--archive https://polkadot-squid-archive.litentry.io/graphql/v1/graphql \
		--out chains/polkadot/polkadotVersions.json

up:
	@docker-compose up -d


down:
	@docker-compose down

deploy:
	@git pull \
		&& docker-compose -f docker-compose.prod.yml -p squid_$$(git rev-parse --short HEAD) up --build -d \
		&& bash -c 'progress=$$(make -s get-progress-khala); until [[ "$$progress" == "1" ]]; do progress=$$(make -s get-progress-khala); echo Indexing Khala $$(echo $$progress*100 | bc)% complete. Waiting...; sleep 10; done' \
		&& bash -c 'progress=$$(make -s get-progress-kusama); until [[ "$$progress" == "1" ]]; do progress=$$(make -s get-progress-kusama); echo Indexing Kusama $$(echo $$progress*100 | bc)% complete. Waiting...; sleep 10; done' \
		&& bash -c 'progress=$$(make -s get-progress-polkadot); until [[ "$$progress" == "1" ]]; do progress=$$(make -s get-progress-polkadot); echo Indexing Polkadot $$(echo $$progress*100 | bc)% complete. Waiting...; sleep 10; done' \
		&& make go-live

get-progress-polkadot:
	@curl -s http://$$(docker ps -f name=squid_$$(git rev-parse --short HEAD)_polkadot-processor_1 --quiet | xargs -I{} docker container port {} 3000/tcp | head -n 1)/metrics/sqd_processor_sync_ratio | tail -n1 | cut -d ' ' -f 2

get-progress-khala:
	@curl -s http://$$(docker ps -f name=squid_$$(git rev-parse --short HEAD)_khala-processor_1 --quiet | xargs -I{} docker container port {} 3000/tcp | head -n 1)/metrics/sqd_processor_sync_ratio | tail -n1 | cut -d ' ' -f 2

get-progress-kusama:
	@curl -s http://$$(docker ps -f name=squid_$$(git rev-parse --short HEAD)_kusama-processor_1 --quiet | xargs -I{} docker container port {} 3000/tcp | head -n 1)/metrics/sqd_processor_sync_ratio | tail -n1 | cut -d ' ' -f 2

go-live:
	@make reload-nginx \
		&& docker ps --filter "label=com.docker.compose.project" -q | xargs docker inspect --format='{{index .Config.Labels "com.docker.compose.project"}}'| sort | uniq | grep -v squid_$$(git rev-parse --short HEAD) | xargs -I{} docker-compose -f docker-compose.prod.yml -p {} down \
		&& make reload-nginx

reload-nginx:
	@docker exec $$(docker ps -f name=nginx --quiet) /usr/sbin/nginx -s reload

.PHONY: process serve start codegen migration migrate up down