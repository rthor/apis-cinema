var _ = require('lodash');
var getMovies = require('./helpers/get-movies');
var theaters = require('./helpers/theaters.js');

function mapSchedule (time) {
  return time.trim();
}

module.exports = function getTheaters (options, callback) {
  var movieObj = {};

  return getMovies(function parseMovies (movies) {
    return callback(null, {
      results: _.map(theaters, function mapTheaters (theater) {
        theater.movies = [];

        movies.forEach(function iterateMovies (movie) {
          movieObj = _.where(movie.showtimes, {cinema: '' + theater.id});

          if (movieObj.length) {
            theater.movies.push({
              title: movie.title,
              schedule: _.map(movieObj[0].schedule, mapSchedule)
            });
          }
        });

        return theater;
      })
    });
  });
};