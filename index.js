exports.is = function(options, callback) {
  var results = [];
  var url = 'http://kvikmyndir.is/api/showtimes/?key=';
  
  require('request').get(url, function parseData (err, movies, body) {
    JSON.parse( body ).forEach(function (movie, i) {
      results.push({
        title: movie.title,
        released: movie.year,
        restricted: movie.certificateIS,
        imdb: movie.ratings.imdb + '/10',
        imdbLink: 'http://www.imdb.com/title/tt' + movie.ids.imdb,
        image: movie.poster,
        showtimes: movie.showtimes.map( require('./helpers/fix-showtime') )
      });
    });

    callback(null, { results: results });
  });
};