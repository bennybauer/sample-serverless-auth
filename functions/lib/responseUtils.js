function generateResponse(body, optionalStatusCode, optionalIsCors) {
  // support default params pre es6 (node 4.X)
  const statusCode = (typeof optionalStatusCode !== 'undefined') && (optionalStatusCode !== null) ? optionalStatusCode : 200;
  const isCors = (typeof optionalIsCors !== 'undefined') && (optionalIsCors !== null) ? optionalIsCors : true;

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
