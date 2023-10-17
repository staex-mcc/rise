#!/bin/bash
exec docker run \
    --rm \
    -it \
    --volume "$PWD:/workdir" \
    --volume "$PWD/airport-lisk-data:/var/lib/airport-lisk" \
    --entrypoint= \
    --workdir /workdir \
    --user "$(id -u):$(id -g)" \
    node:18 ./bin/run "$@"
