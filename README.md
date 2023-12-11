# RISE: dRone InfraStructure tokEnisation

- Before using Makefile you need to build `lisk-helper` image: `make build_lisk_helper`.
- Don't forget to delete data folder when config is changed.

## Usage

```bash
cd airport-lisk
../lh_node.sh npm install
cd ..
# cleanup
make clean
# update genesis block
make update_genesis
cd airport-lisk
# generate faucet plugin passphrase
../lh_node.sh node scripts/encrypt_passphrase.mjs
cd ..
# run lisk node
make run
```

## Scripts

- **lh_lisk.sh** - to execute container with global lisk command.
- **lh_node.sh** - to execute container with node binary.
- **lh_ports.sh** - to execute container with ./bin/run and open ports.
- **lh_run.sh** - to execute container with ./bin.run.

# Utils

## Faucet & Accounts

In order to use newly created account we need to feed them with tokens. To do it we need std Faucet plugin.

To properly start Faucet plugin requires to have encrypted passphrase of genesis block: `./run.sh node encrypt_passphrase.js`. After that you can put it to the config file. You can choose eny passphrase in **config/default/accounts.json**.

Also, to start Faucet itself, you need to enable it: `./run.sh node enable_faucet.js`.

Then you can go to [Faucet website](http://localhost:4006) and feed your account.

## Scripts

- **encrypt_passphrase.js** - To encrypt passphrase with password.
