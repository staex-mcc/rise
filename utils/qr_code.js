import { toDataURL } from "qrcode";

const options = {
  errorCorrectionLevel: 'H',
  quality: 1,
};

toDataURL('221d982fd5a560ded4c6cd467e17ee75cb654cf1', options, function (err, url) {
  console.log(url)
})
