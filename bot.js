require('dotenv').config()
const {
    loaders,
    disabled_events,
    events
} = require("./src/index.js")
const config = require('./config.js');

const eris = require('eris', {
    disableEveryone: true,
    disableEvents: disabled_events(),
    maxShards: 1
});

var token = config.dev_mode ? config.tokens.bot.dev : config.tokens.bot.main
var client = new eris(token)
client.config = config

events(client, config)
loaders(client, config)
//-------------//
client.connect();
