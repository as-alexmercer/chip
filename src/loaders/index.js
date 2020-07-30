const fetch = require('node-fetch');
module.exports = async function(client, config) {
    require("./commands.js")(client)
    let ip = await fetch("https://ipv4bot.whatismyipaddress.com")
    client.ip = await ip.text()
}