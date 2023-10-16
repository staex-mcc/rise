#!/bin/sh
exec docker run \
    --rm \
    -it \
    -p 4005:4005 \
    -p 4006:4006 \
    -p 12400:12400 \
    -v "${PWD}/airport-lisk:/airport-lisk" \
    -v "${PWD}/airport-lisk-data:/var/lib/airport-lisk" \
    --entrypoint="" --workdir /airport-lisk \
    node:18 ./bin/run "$@"
