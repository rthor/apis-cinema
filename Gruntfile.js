module.exports = function(grunt) {
  // Show tasks time
  require('time-grunt')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };

  // Load all tasks under the tasks folder
  grunt.util._.extend(config, loadConfig('./tasks/'));
  grunt.initConfig(config);
  require('load-grunt-tasks')(grunt);

  // Default task
  grunt.registerTask('default', [
    'jshint',
    'complexity'
  ]);
};


// Borrowed from Thomas Boyt (@thomasABoyt)
// More: http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
}