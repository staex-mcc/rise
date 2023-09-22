#!/bin/bash
exec docker run \
    --rm \
    -it \
    --volume "$PWD:/workdir" \
    --volume "$PWD/airport-lisk-data:/root/.lisk/airport-lisk" \
    --entrypoint= \
    --workdir /workdir \
    --user "$(id -u):$(id -g)" \
    node:16 ./bin/run "$@"
