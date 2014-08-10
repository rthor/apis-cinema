var parser = require('apis-parser');
var endpoints = require('fs').readdirSync(__dirname + '/lib/');

module.exports = function(app, prefix) {
  endpoints.forEach(function(endpoint) {
    if (/\.js$/ig.test(endpoint)) {
      prefix += endpoint === 'cinema.js' ? '' : ('/' + endpoint.replace('.js', ''));
      app.get(prefix, function(req, res) {
        parser(res)(function(callback) {
          require('./lib/' + endpoint)(callback);
        });
      });
    }
  });
};