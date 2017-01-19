const crypto = require('crypto');

function computeHash(password, salt, fn) {
  // Bytesize
  const len = 512;
  const iterations = 4096;
  const digest = 'sha512';
  if (arguments.length === 3) {
    crypto.pbkdf2(password, salt, iterations, len, digest, (err, derivedKey) => {
      if (err) return fn(err);
      fn(null, salt, derivedKey.toString('base64'));
    });
  } else {
    const callback = salt;
    crypto.randomBytes(len, (err, data) => {
      if (err) return fn(err);
      const generatedSalt = data.toString('base64');
      computeHash(password, generatedSalt, callback);
    });
  }
}

module.exports.computeHash = computeHash;
