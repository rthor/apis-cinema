var _ = require('lodash');
var movies = require('./helpers/get-movies');
var theaters = require('./helpers/theaters.js');

module.exports = function(options, callback) {
  var movieObj = {};
  
  return movies(function (movies) {
    return callback(null, { 
      results: _.map(theaters, function (theater) {
        theater.movies = [];

        movies.forEach(function (movie) {
          movieObj = _.where(movie.showtimes, {cinema: '' + theater.id});

          if (movieObj.length) {
            movieObj = movieObj[0];
            movieObj.title = movie.title;
            movieObj.schedule = _.map(movieObj.schedule, function(time) { return time.trim(); });
            delete movieObj.cinema; 
            theater.movies.push( movieObj );
          }
        });

        return theater;
      })
    });
  });
};