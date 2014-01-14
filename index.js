var request = require('request')
  , theaters = require('./helpers/theaters')
  , results = []
  , imdbBase = 'http://www.imdb.com/title/tt';

function fixShowtime (showtime) {
  showtime.theater = theaters[parseInt(showtime.cinema, 10) - 1]['name'] || '';
  showtime.schedule = showtime.schedule.map( fixSchedule );
  return showtime;
}

function fixSchedule (schedule) {
  return schedule.trim();
}

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