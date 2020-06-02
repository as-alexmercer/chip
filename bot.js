require('dotenv').config()
const {
    loaders,
    events
} = require("./src/index.js")
const config = require('./config.js');

const eris = require('eris', {
    disableEveryone: true,
    disableEvents: {
        "CHANNEL_CREATE": true,
        "CHANNEL_UPDATE": true,
        "CHANNEL_DELETE": true,
        "GUILD_BAN_ADD": true,
        "GUILD_BAN_REMOVE": true,
        "GUILD_CREATE": true,
        "GUILD_DELETE": true,
        "GUILD_MEMBER_ADD": false,
        "GUILD_MEMBER_REMOVE": true,
        "GUILD_MEMBER_UPDATE": false,
        "GUILD_ROLE_CREATE": true,
        "GUILD_ROLE_DELETE": true,
        "GUILD_ROLE_UPDATE": true,
        "GUILD_UPDATE": true,
        "MESSAGE_CREATE": false,
        "MESSAGE_DELETE": true,
        "MESSAGE_DELETE_BULK": true,
        "MESSAGE_UPDATE": true,
        "PRESENCE_UPDATE": true,
        "TYPING_START": true,
        "USER_UPDATE": true,
        "VOICE_STATE_UPDATE": true
    },
    maxShards: 1
});

var token = config.dev_mode ? config.tokens.bot.dev : config.tokens.bot.main
var client = new eris(token)
client.config = config

events(client, config)
loaders(client, config)
//-------------//
client.connect();
