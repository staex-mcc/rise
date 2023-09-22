run:
	./lh_ports.sh start --enable-dashboard-plugin --enable-faucet-plugin

update_genesis:
	./scripts/update-genesis-block.sh

format:
	cd airport-lisk && ../lh_node.sh npm run format

lint:
	cd airport-lisk && ../lh_node.sh npm run lint

build_lisk_helper:
	docker build -t lisk-helper - < Dockerfile.lisk-helper

clean:
	./scripts/clean.sh
