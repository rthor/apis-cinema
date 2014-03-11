var getMovies = require('./helpers/get-movies');
var results = [];

module.exports = function(config, cb) {
  getMovies(function parseMovies (movies) {
    movies.forEach(function iterateMovies (movie) {
      results.push({
        title: movie.title,
        released: movie.year,
        restricted: movie.certificateIS,
        imdb: movie.ratings.imdb + '/10',
        imdbLink: 'http://www.imdb.com/title/tt' + movie.ids.imdb,
        rotten: movie.ratings['rotten_critics'] ? '' + parseInt(movie.ratings['rotten_critics'], 10) / 10 : '',
        rottenLink: movie.ids.rotten ? 'http://www.rottentomatoes.com/m/' + movie.ids.rotten : '',
        image: movie.poster,
        showtimes: movie.showtimes.map( require('./helpers/fix-showtime') )
      });
    });

    cb(null, { results: results });
  });
};