# Utils

## Faucet & Accounts

In order to use newly created account we need to feed them with tokens. To do it we need std Faucet plugin.

To properly start Faucet plugin requires to have encrypted passphrase of genesis block: `./run.sh node encrypt_passphrase.js`. After that you can put it to the config file. You can choose eny passphrase in **config/default/accounts.json**.

Also, to start Faucet itself, you need to enable it: `./run.sh node enable_faucet.js`.

Then you can go to [Faucet website](http://localhost:4006) and feed your account.

## Scripts

- **create_accounts.js** - to create and feed account with Faucet.
- **drone_landing.js** - to simulate Drone landing.
- **enable_faucet.js** - to enable Faucet.
- **encrypt_passphrase.js** - To encrypt passphrase with password.
- **update_contract.js** - To update contract.
- **save_airport_info.js** - Save Airport information to database.
- **carpet_landing.js** - Simulate sending info from Carpet to Airport plugin.
- **demo_results.js** - Show demo results.
