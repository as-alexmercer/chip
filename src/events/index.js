module.exports = function(client, config) {
  require('./other.js')(client, config)
  require('./message.js')(client, config)
  require('./user.js')(client, config)
}
