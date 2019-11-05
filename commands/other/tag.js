const { Command } = require('quartz');
const { tokens } = require('../../config.js');
const fetch = require('node-fetch');

class Tag extends Command {
    constructor (client) {
        super(client, {
            name: 'tag',
            aliases: ['key'],
            description: {
                content: 'Basic tags.'
            }
        });
    }

    async run (msg, args) {
        await msg.delete()
        switch (args[0]) {
            case 'dontasktoask':
                await msg.embed('Don\'t ask to ask. By asking to ask a question, you have already asked a question. Provide as much info as you can when asking for help.\n  - https://dontasktoask.com/');
                break;
            case 'lookingfordevs':
                await msg.embed('If your looking for a developer check out <#590563326782603292>\nIf you want to add to it look at [this message](https://discordapp.com/channels/489144223099125761/590563326782603292/590563515991851038)');
                break;
            default: 
                return msg.embed('**Couldn\'t find a tag for that!**\n\nAvailable Tags:\n\n\`dontasktoask\`\n\`lookingfordevs\`');
        }
    } 
}

module.exports = Tag;