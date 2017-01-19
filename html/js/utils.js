// eslint-disable-next-line consistent-return, no-unused-vars
function getConfig(path, callback) {
  if (sessionStorage.config) {
    return callback(null, JSON.parse(sessionStorage.config));
  }

  fetch(path)
    .then(blob => blob.json())
    .then((data) => {
      sessionStorage.config = JSON.stringify(data);
      return callback(null, data);
    })
    .catch(() => callback('There was an error reading the config file'));
}
