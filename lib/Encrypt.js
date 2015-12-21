const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const salt = 'mANiNThEdARk';

exports.createHash = {
  encrypt: (text) => {
    var cipher = crypto.createCipher(algorithm, salt);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  decrypt: (text) => {
    var decipher = crypto.createDecipher(algorithm, salt);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}
