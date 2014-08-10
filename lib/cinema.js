var request = require('request');
var cheerio = require('cheerio');
var err = require('error-helper');
var url = 'http://kvikmyndir.is/bio/syningatimar/';

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

    // DOM elements array containing all movies.
    var movies = $('.Kvikmyndir_TimeTable #divbox').find('.utanumMynd_new');

    // Loop through movies
    movies.each(function() {
      // This movie.
      var movie = $(this);

      // Showtimes for JSON
      var showtimes = [];

      // Find all theaters and loop through them.
      var theaters = movie.find('[id^="myndbio"]');
      theaters.each(function() {
        // Single theater
        var theater = {
          theater: $(this).find('#bio a').text().trim(),
          schedule: []
        };

        // Loop through each showtime and
        // add them to the theater schedule.
        $(this).find('.syningartimi_item').each(function() {
          theater.schedule.push($(this).text().trim());
        });

        // Add theater to showtimes array.
        showtimes.push(theater);
      });

      // Clean up image URL
      var imgURL;

      try {
        imgURL = movie.find('img.poster').attr('src').match(/\/images\/poster\/.+\.(jpg|jpeg|png)/ig)[0];
      } catch(e) {
        console.log('Could not grab the image poster', e);
      }

      // Create an object of info
      // and add it to the 'results' array.
      obj.results.push({
        title: movie.find('#mynd_titill a').html().trim(),
        released: movie.find('.mynd_titill_artal').text().match(/\d+/g)[0].trim(),
        restricted: movie.find('.mynd_aldurstakmark img').attr('alt').trim(),
        imdb: movie.find('.imdbEinkunn').text().trim(),
        imdbLink: movie.find('.imdbEinkunn a').attr('href') ? movie.find('.imdbEinkunn a').attr('href').trim() : '',
        image: 'http://kvikmyndir.is' + imgURL,
        showtimes: showtimes
      });
    });

    return callback(null, obj);
  });
};