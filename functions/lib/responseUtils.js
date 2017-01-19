function generateResponse(body, optionalStatusCode, optionalIsCors) {
  // support default params pre es6 (node 4.X)
  var statusCode = (typeof optionalStatusCode  !== 'undefined') && (optionalStatusCode  !== null) ?  optionalStatusCode  : 200;
  var isCors = (typeof optionalIsCors  !== 'undefined') && (optionalIsCors  !== null) ?  optionalIsCors  : true;
  
  var response = {
    statusCode: statusCode,
    body: JSON.stringify(body)
  }

  if (isCors) {
    response.headers = {
      'Access-Control-Allow-Origin': '*'
    }
  }

  return response;
}

module.exports.generateResponse = generateResponse;
