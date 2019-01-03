const QRCode = require('qrcode');

exports.handler = (event, context, callback) => {
  generateQrCode(res => {
    console.log(res)
    callback(null, res)
  });
}

const generateQrCode = (callback) => {
  QRCode.toDataURL('http://community-feedback-frontend.s3-website.eu-west-2.amazonaws.com/')
    .then(url => {
        return url.substring(url.indexOf(',') + 1)
    })
    .then(qrCode => {
      return {
        headers: {
          'Content-Type': 'image/png'
        },
        isBase64Encoded: true,
        body: qrCode
      }
    })
    .then(callback)
    .catch(err => {
      console.log(err);
    })
};

//generateQrCode(res => console.log(res));

