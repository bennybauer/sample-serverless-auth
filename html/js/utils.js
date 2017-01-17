function getConfig(path, callback) {
  var client = new XMLHttpRequest();
  client.open('GET', path);
  client.onreadystatechange = function () {
    if (client.readyState == XMLHttpRequest.DONE) {
        if (client.status == 200) {
            return callback(null, JSON.parse(client.response));
        } else {
            return callback(`There was an error reading the config file `);
        }
    }
  }
  client.send();
}
