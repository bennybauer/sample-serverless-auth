function getConfig(path, callback) {
  if (sessionStorage.config) {
    return callback(null, JSON.parse(sessionStorage.config));
  } else {
    var client = new XMLHttpRequest();
    client.open('GET', path);
    client.onreadystatechange = function () {
      if (client.readyState == XMLHttpRequest.DONE) {
        if (client.status == 200) {
          sessionStorage.config = client.responseText;
          return callback(null, JSON.parse(sessionStorage.config));
        } else {
          return callback(`There was an error reading the config file `);
        }
      }
    }
    client.send();
  }
}
