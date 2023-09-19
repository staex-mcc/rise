# RISE: dRone InfraStructure tokEnisation

- Before using Makefile you need to build `lisk-helper` image: `make build_lisk_helper`.
- Don't forget to delete data folder when config is changed.

## Usage

- Remove **airport-lisk-data/\***: `rm -rf airport-lisk-data/*`. Remove **utils/*.db**. Remove **airport-lisk/config/default/*** _EXCEPT_ config.json. Then: `make create`.
- Update genesis block: `make update_genesis`.
- Get any passphrase from **config/default/accounts.json**.
- Pass this passphrase to **utils/encrypt_passphrase.js** and execute: `run.sh encrypt_passphrase.js`.
- Put encrypted passphrase to **config/default/accounts.json** to _Faucet_ plugin configuration.
- Run Lisk node: `make run`.
- Enable Faucet: `run.sh enable_faucet.js`.
- Create accounts for Drone, Airport, Landlord: `run.sh create_account.js`. Save them anywhere.
- Save Airport private passphrase to database and landlord address: `run.sh save_airport_info.js`.
- Update contracts for Airport and Landlord: `run.sh update_contract.js`. Don't forget to put generated accounts passphrases into file.
- Simulate Drone landing: `run.sh drone_landing.js`. Don't forget to put Airport address and Drone passphrase into file. Don't forget to update phrase and address.
- Simulate Carpet landing info: `run.sh carpet_landing.js`. Put Drone address to script.
- Get demo results by: `run.sh demo_results.js`.

## Scripts

- **lh_lisk.sh** - to execute container with global lisk command.
- **lh_node.sh** - to execute container with node binary.
- **lh_ports.sh** - to execute container with ./bin/run and open ports.
- **lh_run.sh** - to execute container with ./bin.run.
