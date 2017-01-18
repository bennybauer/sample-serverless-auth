var apiUrl;

function getUrlParams() {
  var p = {};
  var match,
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(/\+/g, " "));
    },
    query = window.location.search.substring(1);

  while (match = search.exec(query)) {
    p[decode(match[1])] = decode(match[2]);
  }

  return p;
}

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

function init() {
  handleConfig((err, url) => {
    if (err) return;

    var urlParams = getUrlParams();
    if (!('email' in urlParams) || !('verify' in urlParams)) {
      result.innerHTML = 'Invalid link';
    } else {
      result.innerHTML = 'Verifying...';
      var input = {
        email: urlParams['email'],
        verify: urlParams['verify']
      };

      let xhr = new XMLHttpRequest();
      xhr.open('POST', `${url}/verify`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            const output = JSON.parse(xhr.response);

            if (output.verified) {
              result.innerHTML = `User ${input.email} has been <b>verified</b>, thanks!`;
            } else {
              result.innerHTML = `User ${input.email} has <b>not</b> been verified, sorry.`;
            }
          } else {
            console.error(xhr.statusText);
          }
        }
      }

      xhr.send(JSON.stringify(input));
    }
  });
}

window.onload = init();
