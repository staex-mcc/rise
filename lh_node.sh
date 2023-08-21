#!/bin/bash

docker run --rm -it \
  --user "$(id -u):$(id -g)" \
  -v "${PWD}/airport-lisk:/airport-lisk" \
  --entrypoint="" --workdir /airport-lisk \
  node:16 $@
