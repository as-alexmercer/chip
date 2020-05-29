const {
    Embed
} = require("../../handlers")

module.exports = {
    name: 'help',
    description: 'its help',
    args: false,
    usage: "<usage here>",
    aliases: [],
    disabled: false,
    reason: "reason here!", // reason why its disabled
    developer: false, // dev only
    execute(msg, args, client, db, config) {
        const embed = new Embed()
            .title(`**What can I help you with?**`)
            .author(msg.author.username, msg.author.avatarURL)
            .addField('**Commands**', '!add (bot ID) (prefix)\n!tag [tag]\n!paste (code)', true)
            .addField('**Info**', 'Can only be used with the Certified role\nUseful instead of typing tags out\nPlease use if the code is bigger than it should be', true)
            .addField('**About**', 'Made for the code::together server!')
            .thumbnail(client.user.avatarURL);
        return msg.channel.createMessage(embed);
    },
};
