import { cryptography } from "lisk-sdk";

const encryptedPassphrase = cryptography.encryptPassphraseWithPassword(
  "add law chimney scale cry embody blossom water nature wrestle chaos kitten",
  "arbuz",
);
console.log(cryptography.stringifyEncryptedPassphrase(encryptedPassphrase));
