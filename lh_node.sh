#!/bin/sh
exec docker run \
    --rm \
    --network host \
    --user "$(id -u):$(id -g)" \
    --volume "$PWD:/workdir" \
    --entrypoint= \
    --workdir /workdir \
    node:16 "$@"
