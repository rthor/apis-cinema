var request = require('request')
  , fixShowtime = require('./helpers/fix-showtime')
  , results = []
  , imdbBase = 'http://www.imdb.com/title/tt';

exports.is = function(options, callback) {
  request.get({
    url: 'http://kvikmyndir.is/api/showtimes/?key='
  }, function parseData (err, movies, body) {

    movies = JSON.parse( body );

    movies.forEach(function (movie, i){
      results.push({
        title: movie.title,
        released: movie.year,
        restricted: movie.certificateIS,
        imdb: movie.ratings.imdb + '/10',
        imdbLink: imdbBase + movie.ids.imdb,
        image: movie.poster,
        showtimes: movie.showtimes.map( fixShowtime )
      });
    });

    return callback(null, { results: results });
  });
};