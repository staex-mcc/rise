#!/bin/sh
set -ex
rm -rf airport-lisk-data/
rm -rf utils/*.db
for i in airport landings transactions; do
  mkdir -p airport-lisk-data/$i.db
  mkdir utils/$i.db
done

>airport-lisk/config/default/genesis_block.blob
