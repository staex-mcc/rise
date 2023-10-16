import { cryptography } from 'lisk-sdk';
import { readFileSync, writeFileSync } from 'fs';

(async () => {
	const data = JSON.parse(readFileSync('config/default/passphrase.json'));
	const password = 'arbuz';
	const encryptedPassphrase = await cryptography.encrypt.encryptMessageWithPassword(
		data.passphrase,
		password,
	);
	const encryptedPassphraseString =
		cryptography.encrypt.stringifyEncryptedMessage(encryptedPassphrase);
	let config = JSON.parse(readFileSync('config/default/config.json'));
	config.plugins.faucet.encryptedPassphrase = encryptedPassphraseString;
	writeFileSync('config/default/config.json', JSON.stringify(config, null, 2));
})();
