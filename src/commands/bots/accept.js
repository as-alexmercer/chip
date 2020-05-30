const {
    Embed
} = require('../../handlers');
module.exports = {
    name: 'accept',
    description: 'Accept a bot.',
    args: false,
    usage: "<usage here>",
    aliases: ['ok'],
    disabled: false,
    reason: "reason here!", // reason why its disabled
    staff: true, // staff only
    async execute(msg, args, client, config) {
        if (msg.channel.guild.id !== client.config.servers.testing.id) return msg.channel.createMessage('Not Testing Server');

        await msg.channel.guild.members.get(msg.channel.topic).kick(`Bot Approved By: ${msg.author.username}`)
            .catch(error => {
                return msg.channel.createMessage(`**Unable to kick bot**\nError: ${error.message}`);
            });
        const botInviteURL = `https://discordapp.com/oauth2/authorize?client_id=${msg.channel.topic}&scope=bot&permissions=0&guild_id=${client.config.servers.main.id}`;
        const embed = new Embed()
            .title('**Invite**')
            .description(`[URL](${botInviteURL})`)
            .footer('Channel Deletion: 1 min');
        await msg.channel.createMessage(embed);
        setTimeout(() => {
            return msg.channel.delete(`Bot Approved By: ${msg.author.username}`);
        }, 60000);
    },
};
