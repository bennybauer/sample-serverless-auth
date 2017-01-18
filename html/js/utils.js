function getConfig(path, callback) {
  if (sessionStorage.config) {
    return callback(null, JSON.parse(sessionStorage.config));
  } else {
    fetch(path)
      .then(blob => blob.json())
      .then(data => {
        sessionStorage.config = JSON.stringify(data);
        callback(null, data);
      })
      .catch(err => callback('There was an error reading the config file'));
  }
}
