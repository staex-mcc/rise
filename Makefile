run:
	./lh_ports.sh start --enable-dashboard-plugin --enable-faucet-plugin

update_genesis:
	./lh_run.sh genesis-block:create --output config/default -a 2 -v 2
	cd airport-lisk
	tmp=$(shell mktemp)
	cd airport-lisk && jq '.forging.delegates = input' config/default/config.json config/default/forging_info.json > "$tmp" && mv "$tmp" config/default/config.json
	cd airport-lisk && jq '.forging += input' config/default/config.json config/default/password.json > "$tmp" && mv "$tmp" config/default/config.json

format:
	./lh_node.sh npm run format

lint:
	./lh_node.sh npm run lint

build_lisk_helper:
	docker build -t lisk-helper -f Dockerfile.lisk-helper .

create:
	rm -rf airport-lisk-data/
	rm -rf utils/*.db
	mkdir airport-lisk-data/
	mkdir airport-lisk-data/airport.db
	mkdir airport-lisk-data/landings.db
	mkdir airport-lisk-data/transactions.db
	mkdir utils/airport.db
	mkdir utils/landings.db
	mkdir utils/transactions.db
	touch airport-lisk/config/default/accounts.json
	touch airport-lisk/config/default/forging_info.json
	touch airport-lisk/config/default/genesis_block.json
	touch airport-lisk/config/default/password.json
