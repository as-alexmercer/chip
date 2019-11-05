const { Command } = require('quartz');
const { servers } = require('../../config.js');

class Help extends Command {
    constructor (client) {
        super(client, {
            name: 'help',
            aliases: ['welp'],
            description: {
                content: 'Help with the bot.'
            }
        });
    }

    async run (msg, args) {
        const embed = this.client.embed()
            .title(`**What can I help you with?**`)
            .author(msg.author.username,msg.author.avatarURL)
            .field('**Commands**', '!add (bot ID) (prefix)\n!tag [tag]\n!paste (code)', true)
            .field('**Info**', 'Can only be used with the Certified role\nUseful instead of typing tags out\nPlease use if the code is bigger than it should be', true)
            .field('**About**', 'Made for the code::together server!')
            .thumbnail(this.client.user.avatarURL);
        return msg.channel.createMessage({ embed });    
    } 
}

module.exports = Help;