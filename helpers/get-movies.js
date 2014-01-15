var url = 'http://kvikmyndir.is/api/showtimes/?key=';
module.exports = function(callback) {
  return require('request').get(url, function (err, res, body) {
    return callback(
      err || res.statusCode !== 200 ?
      new Error('Service unavailable at this moment.') :
      JSON.parse( body ) 
    );
  });
};