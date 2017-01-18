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

function init() {
  getConfig('js/config.json', (err, config) => {
    if (err) return;

    var urlParams = getUrlParams();
    if (!('email' in urlParams) || !('verify' in urlParams)) {
      result.innerHTML = 'Invalid link';
    } else {
      result.innerHTML = 'Verifying user...';
      var input = {
        email: urlParams['email'],
        verify: urlParams['verify']
      };

      fetch(`${config.apiUrl}/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input)
        })
        .then(blob => blob.json())
        .then(output => {
          if (output.verified) {
            result.innerHTML = `User ${input.email} has been <b>verified</b>, thanks!`;
          } else {
            result.innerHTML = `User ${input.email} has <b>not</b> been verified, sorry.`;
          }
        })
        .catch(err => console.error(err));
    }
  });
}

window.onload = init();
