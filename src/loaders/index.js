module.exports = function(client, config) {
    require("./commands.js")(client, config)
    require("./handlers.js")(client)
    require("./events.js")(client, config)
}