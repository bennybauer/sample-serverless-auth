const expect = require('chai').expect;
const cryptoUtils = require('../../lib/cryptoUtils');

describe('cryptoUtilsTest.js', () => {
  describe('#computeHash()', () => {
    it('should generate hash without salt', (done) => {
      const password = 'abcde';
      cryptoUtils.computeHash(password, (err, salt, hash) => {
        if (err) done(err);

        expect(salt).to.be.not.empty;
        expect(hash).to.be.not.empty;
        done();
      });
    });

    it('should generate hash with', (done) => {
      const password = 'abcde';
      const providedSalt = 'asd3G$%';
      cryptoUtils.computeHash(password, providedSalt, (err, salt, hash) => {
        if (err) done(err);

        expect(salt).to.be.not.empty;
        expect(hash).to.be.not.empty;
        done();
      });
    });
  });
});
