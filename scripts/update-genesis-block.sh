#!/bin/sh

cleanup() {
    rm -f "$tmp"
}

set -ex
trap cleanup EXIT
cd airport-lisk
if test -f config/default/config.json; then
    mv config/default/config.json config/default/.config.json
fi
rm -f config/default/*.json
../lh_run.sh genesis-block:create --output config/default --accounts=2 --validators=2
if test -f config/default/.config.json; then
    mv config/default/.config.json config/default/config.json
fi
tmp=$(mktemp)
jq '.forging.delegates = input' config/default/config.json config/default/forging_info.json >"$tmp"
mv "$tmp" config/default/config.json
jq '.forging += input' config/default/config.json config/default/password.json >"$tmp"
mv "$tmp" config/default/config.json
