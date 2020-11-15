require('dotenv').config()
const loaders = require("./src")
const config = require('./config.js');

const eris = require('eris', {
    disableEveryone: true,
    maxShards: 1,
    intents: 514
    // -READY
    // - RESUMED
    // - VOICE_SERVER_UPDATE
    // - USER_UPDATE
    // - GUILD_MEMBER_ADD
    // - GUILD_MEMBER_UPDATE
    // - GUILD_MEMBER_REMOVE
    // - MESSAGE_CREATE
    // - MESSAGE_UPDATE
    // - MESSAGE_DELETE
    // - MESSAGE_DELETE_BULK
});

let token = process.env.PROD || !config.dev_mode ? config.tokens.bot.main : config.tokens.bot.dev
let client = new eris(token)
client.config = config

loaders(client, config)
//-------------//
client.connect();