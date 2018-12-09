function log(method, promise) {
  promise
    .then(result => console.log(method, result))
    .catch(error => console.error(method, error));
}

module.exports = log;
