const expect = require('chai').expect;
const cryptoUtils = require('../../lib/cryptoUtils');

describe('cryptoUtilsTest.js', function () {
  describe('#computeHash()', function () {
    it('should generate hash without salt', function (done) {
        const password = 'abcde';
        cryptoUtils.computeHash(password, (err, salt, hash) => {
            if (err) done(err);
            else {
              expect(salt).to.be.not.empty;
              expect(hash).to.be.not.empty;
              done();
            }
        });
    });

    it('should generate hash with', function (done) {
        const password = 'abcde';
        const salt = 'asd3G$%'
        cryptoUtils.computeHash(password, salt, (err, salt, hash) => {
            if (err) done(err);
            else {
              expect(salt).to.be.not.empty;
              expect(hash).to.be.not.empty;
              done();
            }
        });
    });
  });
});
