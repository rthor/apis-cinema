var _ = require('lodash');
var getMovies = require('./helpers/get-movies');
var theaters = require('./helpers/theaters.js');

function iterateTheaterMovies (movie) {
  var movieObj = _.where(movie.showtimes, {cinema: '' + this.id});

  if (movieObj.length) {
    this.movies.push({
      title: movie.title,
      schedule: _.map(
        movieObj[0].schedule,
        function (time) { return time.trim(); }
      )
    });
  }
}

function mapTheaters (theater) {
  theater.movies = [];
  this.forEach( iterateTheaterMovies.bind(theater) );
  return theater;
}

function parseMovies (movies) {
  return this(null, {
    results: _.map(theaters, mapTheaters.bind(movies))
  });
}

module.exports = function getTheaters (config, cb) {
  return getMovies( parseMovies.bind(cb) );
};