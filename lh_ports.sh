#!/bin/bash

docker run --rm -it \
  -p 4005:4005 \
  -p 4006:4006 \
  -p 12400:12400 \
  -v "${PWD}/airport-lisk:/airport-lisk" \
  -v "${PWD}/airport-lisk-data:/root/.lisk/airport-lisk" \
  --entrypoint="" --workdir /airport-lisk \
  node:16 ./bin/run $@
