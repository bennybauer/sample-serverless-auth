// AWS.config.region = 'eu-west-1';
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: '<Fill Me>'
// });

// var lambda = new AWS.Lambda();
var apiUrl;

function handleConfig(callback) {
  if (apiUrl) {
      callback(null, apiUrl);
  } else {
    getConfig('js/config.json', (err, data) => {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        apiUrl = data.apiUrl;
        callback(null, apiUrl);
      }
    });
  }
}

function signUp() {
  handleConfig((err, url) => {
    if (err) return;

    var result = document.getElementById('result');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    result.innerHTML = 'Signing up...';

    // validate input
    if (!email.value) {
      result.innerHTML = 'Please specify your email address.'
    } else if (!password.value) {
      result.innerHTML = 'Please specify your password.'
    } else {
      var input = {
        email: email.value,
        password: password.value
      };

      let xhr = new XMLHttpRequest();
      xhr.open('POST', `${url}/create`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            const output = JSON.parse(xhr.response);

            if (output.created) {
              result.innerHTML = `User ${input.email} created. Please check your email to enable login.`;
            } else {
              result.innerHTML = `User ${input.email} <b>not</b> created.`;
            }
          } else {
            console.error(xhr.statusText);
          }
        }
      }

      xhr.send(JSON.stringify(input));

      // lambda.invoke({
      //     FunctionName: 'createUser',   // TODO: function name should be from config
      //     Payload: JSON.stringify(input)
      // }, function(err, data) {
      //     if (err) console.error(err, err.stack);
      //     else {
      //         var output = JSON.parse(data.payload);
      //         if (output.created) {
      //             result.innerHTML = `User ${input.email} created. Please check your email to enable login.`;
      //         } else {
      //             result.innerHTML = `User ${input.email} <b>not</b> created.`;
      //         }
      //     }
      // });
    }
  });
}

var form = document.getElementById('signup-form');
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  signUp();
});