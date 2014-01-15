var movies = require('./helpers/get-movies');

module.exports = function(options, callback) {
  var results = [];

  movies(function (movies) {
    movies.forEach(function (movie) {
      results.push({
        title: movie.title,
        released: movie.year,
        restricted: movie.certificateIS,
        imdb: movie.ratings.imdb + '/10',
        imdbLink: 'http://www.imdb.com/title/tt' + movie.ids.imdb,
        rotten: movie.ratings.rotten_critics ? '' + parseInt(movie.ratings.rotten_critics, 10) / 10 : '',
        rottenLink: movie.ids.rotten ? 'http://www.rottentomatoes.com/m/' + movie.ids.rotten : '',
        image: movie.poster,
        showtimes: movie.showtimes.map( require('./helpers/fix-showtime') )
      });
    });

    callback(null, { results: results });
  });
};