var request = require('request');
var cheerio = require('cheerio');
var err = require('error-helper');
var url = 'http://kvikmyndir.is/bio/syningatimar_bio/';

module.exports = function(callback) {
  request(url, function (err, res, body) {
    if (err || res.statusCode !== 200){
      return callback(err(500, url +' refuses to respond or give back data'));
    }

    // Cheerio declared and then attemted to load.
    var $;

    try {
      $ = cheerio.load( body );
    } catch (e) {
      return callback(err(500, 'Could not load the body with cherrio.'));
    }

    // Base object to be added to
    // and eventually sent as a JSON response.
    var obj = {
      results: []
    };

    // DOM elements array containing all theaters.
    var theaters = $('.Kvikmyndir_TimeTable').find('#utanumMynd_new');

    // Loop through theaters
    theaters.each(function() {
      // This theater.
      var theater = $(this);

      // List of movies.
      var movies = [];

      // Loop through movies.
      theater.find('#myndbio_new').each(function() {
        // This movie.
        var movie = $(this);

        // Time schedule.
        var schedule = [];

        // Loop through each showtime on schedule today.
        movie.find('#timi_new div').each(function () {
          // Add time to the schedule.
          schedule.push( $(this).find('.syningartimi_item').text().trim() );
        });

        // Append new movie to the list of movies.
        movies.push({
          title: movie.find('#bio a').text().trim(),
          schedule: schedule
        });
      });

      // Create an object of info
      // and add it to the 'results' array.
      obj.results.push({
        name: theater.find('#mynd_titill a').text().trim(),
        location: theater.find('.mynd_titill_artal').text().trim().replace(/(^\()|(\)$)/g, ''),
        image: 'http://kvikmyndir.is' + theater.find('.mynd_plakat img').attr('src'),
        movies: movies
      });
    });

    return callback(null, obj);
  });
};