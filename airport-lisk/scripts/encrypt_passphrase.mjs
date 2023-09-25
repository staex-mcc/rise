import { cryptography } from 'lisk-sdk'
import { readFileSync, writeFileSync } from 'fs'

const accounts = JSON.parse(readFileSync('config/default/accounts.json'))
const password = 'arbuz'
const encryptedPassphrase = cryptography.encryptPassphraseWithPassword(accounts[0].passphrase, password)
const encryptedPassphraseString = cryptography.stringifyEncryptedPassphrase(encryptedPassphrase)
let config = JSON.parse(readFileSync('config/default/config.json'))
config.plugins.faucet.encryptedPassphrase = encryptedPassphraseString
writeFileSync('config/default/config.json', JSON.stringify(config, null, 2))
