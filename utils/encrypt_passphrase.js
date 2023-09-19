import { cryptography } from "lisk-sdk";

const encryptedPassphrase = cryptography.encryptPassphraseWithPassword(
  "tray glove head walk remind reduce olive rigid melody convince hundred report",
  "arbuz",
);
console.log(cryptography.stringifyEncryptedPassphrase(encryptedPassphrase));
