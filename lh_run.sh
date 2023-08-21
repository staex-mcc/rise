#!/bin/bash

docker run --rm -it \
  -v "${PWD}/airport-lisk:/airport-lisk" \
  -v "${PWD}/airport-lisk-data:/root/.lisk/airport-lisk" \
  --entrypoint="" --workdir /airport-lisk \
  node:16 ./bin/run $@
