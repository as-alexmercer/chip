require('dotenv').config()

const { QuartzClient } = require('quartz');
const { Client } = require('eris');
const path = require('path');
const config = require('./config');

const eris = new Client(config.tokens.bot.main || config.tokens.bot.dev, {
    restMode: true
});
const client = new QuartzClient({
    owner: config.owner_id,
    eventHandler: {
        directory: path.resolve('./events')
    },
    commandHandler: {
        directory: path.resolve('./commands'),
        prefix: config.prefix
    }
}, eris);

client.start();