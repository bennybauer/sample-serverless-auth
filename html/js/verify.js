function getUrlParams() {
  const p = {};
  let match;
  const search = /([^&=]+)=?([^&]*)/g;
  const decode = function (s) {
    return decodeURIComponent(s.replace(/\+/g, ' '));
  };
  const query = window.location.search.substring(1);

  // eslint-disable-next-line no-cond-assign
  while (match = search.exec(query)) {
    p[decode(match[1])] = decode(match[2]);
  }

  return p;
}

function init() {
  // eslint-disable-next-line no-undef
  getConfig('js/config.json', (err, config) => {
    if (err) return;

    const urlParams = getUrlParams();
    const result = document.getElementById('result');

    if (!('email' in urlParams) || !('verify' in urlParams)) {
      result.innerHTML = 'Invalid link';
    } else {
      result.innerHTML = 'Verifying user...';
      const input = {
        email: urlParams.email,
        verify: urlParams.verify,
      };

      fetch(`${config.apiUrl}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
        .then(blob => blob.json())
        .then((output) => {
          if (output.verified) {
            result.innerHTML = `User ${input.email} has been <b>verified</b>, thanks!`;
          } else {
            result.innerHTML = `User ${input.email} has <b>not</b> been verified, sorry.`;
          }
        })
        .catch(err1 => console.error(err1));
    }
  });
}

window.onload = init();
