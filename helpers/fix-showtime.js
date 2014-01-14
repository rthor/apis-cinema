var theaters = require('./theaters');

module.exports = function (showtime) {
  showtime.theater = theaters[parseInt(showtime.cinema, 10) - 1]['name'] || '';
  showtime.schedule = showtime.schedule.map(function (schedule) {
    return schedule.trim();
  });
  return showtime;
};