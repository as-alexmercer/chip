const fetch = require('node-fetch');
module.exports = async function(client, config) {
    require("./commands.js")(client)
}