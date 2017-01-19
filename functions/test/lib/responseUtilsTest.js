const expect = require('chai').expect;
const responseUtils = require('../../lib/responseUtils');


describe('responseUtils', () => {
  describe('generateResponse', () => {
    it('should generateResponse successfuly when only body provided', (done) => {
      const body = { a: 1, b: 'hello' };
      const response = responseUtils.generateResponse(body);
      const expectedResponse = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body),
      };

      expect(response).to.deep.equal(expectedResponse);
      done();
    });

    it('should generateResponse successfuly when all params provided', (done) => {
      const body = { a: 1, b: 'hello' };
      const response = responseUtils.generateResponse(body, 500, true);
      const expectedResponse = {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body),
      };

      expect(response).to.deep.equal(expectedResponse);
      done();
    });

    it('should generateResponse successfuly when all params provided and not cors', (done) => {
      const body = { a: 1, b: 'hello' };
      const response = responseUtils.generateResponse(body, 500, false);
      const expectedResponse = {
        statusCode: 500,
        body: JSON.stringify(body),
      };

      expect(response).to.deep.equal(expectedResponse);
      done();
    });

    it('should generateResponse successfuly when only body and status provided', (done) => {
      const body = { a: 1, b: 'hello' };
      const response = responseUtils.generateResponse(body, 500);
      const expectedResponse = {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body),
      };

      expect(response).to.deep.equal(expectedResponse);
      done();
    });

    it('should generateResponse successfuly when only body and cors provided', (done) => {
      const body = { a: 1, b: 'hello' };
      const response = responseUtils.generateResponse(body, null, true);
      const expectedResponse = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body),
      };

      expect(response).to.deep.equal(expectedResponse);
      done();
    });
  });
});


function generateResponse(body, optionalStatusCode, optionalIsCors) {
  // support default params pre es6 (node 4.X)
  const statusCode = typeof optionalStatusCode !== 'undefined' ? optionalStatusCode : 200;
  const isCors = typeof optionalIsCors !== 'undefined' ? optionalIsCors : true;

  const response = {
    statusCode: statusCode,
    body: JSON.stringify(body),
  };

  if (isCors) {
    response.headers = {
      'Access-Control-Allow-Origin': '*',
    };
  }

  return response;
}

module.exports.generateResponse = generateResponse;
