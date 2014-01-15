module.exports = function(options, callback) {
  var _ = require('lodash');
  var theaters = require('./helpers/theaters.js');
  var url = 'http://kvikmyndir.is/api/showtimes/?key=';
  var movies, showtimes;
  
  require('request').get(url, function (err, res, body) {
    movies = JSON.parse( body );

    theaters = _.map(theaters, function (theater) {
      theater.movies = [];

      movies.forEach(function (movie) {
        showtimes = _.where(movie.showtimes, {cinema: '' + theater.id});

        if (showtimes.length) {
          showtimes = showtimes[ 0 ]
          showtimes.title = movie.title;
          theater.movies.push( showtimes );
        }
      });

      return theater;
    });

    callback(null, { results: theaters });
  });

};