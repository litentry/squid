typegenKusama: ../metadata/kusamaVersions.json
	@yarn squid-substrate-typegen typegen/kusamaTypegen.json

exploreKusama:
	@yarn squid-substrate-metadata-explorer \
		--chain wss://kusama.api.onfinality.io/public-ws \
		--archive https://kusama.indexer.gc.subsquid.io/v4/graphql \
		--out ../metadata/kusamaVersions.json

typegenKhala: ../metadata/khalaVersions.json
	@yarn squid-substrate-typegen typegen/khalaTypegen.json

exploreKhala:
	@yarn squid-substrate-metadata-explorer \
		--chain wss://khala.api.onfinality.io/public-ws \
		--archive https://khala-squid-archive.litentry.io/graphql/v1/graphql \
		--out ../metadata/khalaVersions.json

typegenPolkadot: ../metadata/polkadotVersions.json
	@yarn squid-substrate-typegen typegen/polkadotTypegen.json

explorePolkadot:
	@yarn squid-substrate-metadata-explorer \
		--chain wss://polkadot.api.onfinality.io/public-ws \
		--archive https://polkadot-squid-archive.litentry.io/graphql/v1/graphql \
		--out ../metadata/polkadotVersions.json

up:
	@docker-compose up -d

down:
	@docker-compose down

deploy:
	@../devkit deploy governance