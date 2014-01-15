module.exports = {
  generic: {
    src: require('../helpers/grunt-src'),
    options: {
      errorsOnly: false,
      cyclomatic: 3,
      halstead: 8,
      maintainability: 100
    }
  }
};