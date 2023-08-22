import { cryptography } from "lisk-sdk";

const encryptedPassphrase = cryptography.encryptPassphraseWithPassword(
  "suit remind wisdom wool industry hurt discover crucial maple frequent narrow duck",
  "arbuz",
);
console.log(cryptography.stringifyEncryptedPassphrase(encryptedPassphrase));
