module.exports = {
  process: function(code) {
    return require("6to5").transform(code, {
      experimental : true,
      runtime      : true
    }).code
  }
}
