module.exports = {
  dev: {
    files: [
      {
        expand: true,
        src: require('../helpers/grunt-src')
      }
    ],
    options: {
      jshintrc: '.jshintrc' // Read hinting options from .jshintrc
    }
  }
};