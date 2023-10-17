#!/bin/sh

cd ./airport-lisk
../lh_run.sh genesis-block:create \
  --output config/default \
  --assets-file ./config/default/genesis_assets.json
