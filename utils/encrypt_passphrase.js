import { cryptography } from "lisk-sdk";

const encryptedPassphrase = cryptography.encryptPassphraseWithPassword(
  "margin cupboard verb hedgehog eyebrow alcohol shop else once saddle person vocal",
  "arbuz",
);
console.log(cryptography.stringifyEncryptedPassphrase(encryptedPassphrase));
