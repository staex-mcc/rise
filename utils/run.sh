#!/bin/bash

docker run --rm -it \
  --network host \
  -v "${PWD}:/utils" \
  -v "${PWD}/../airport-lisk-data/airport.db:/utils/airport.db" \
  -v "${PWD}/../airport-lisk-data/landings.db:/utils/landings.db" \
  -v "${PWD}/../airport-lisk-data/transactions.db:/utils/transactions.db" \
  --workdir /utils \
  --user "$(id -u):$(id -g)" \
  node:16 $@
