import { cryptography } from "lisk-sdk";

const encryptedPassphrase = cryptography.encryptPassphraseWithPassword(
  "mail churn convince hub ginger salute toss giggle crash light coconut music",
  "arbuz",
);
console.log(cryptography.stringifyEncryptedPassphrase(encryptedPassphrase));
