const {
    Embed
} = require('../../handlers');

module.exports = {
    name: 'add',
    description: 'description',
    args: false,
    usage: "<usage here>",
    aliases: [],
    disabled: false,
    reason: "reason here!", // reason why its disabled
    developer: false, // dev only
    async execute(msg, args, client) {
        await msg.delete()
        if (!msg.member.roles.includes(client.config.servers.main.required_role_add_bot)) {
            const role = msg.channel.guild.roles.get(client.config.servers.main.required_role_add_bot);
            return msg.channel.createMessage(`Sorry but you require the \`${role.name}\` role`);
        }
        if (args[0]) {
            if (/^(<@!?(\d{17,18})>|\d{17,18})$/.test(args[0])) {
                if (args[1]) {
                    const botIDExp = args[0].match(/^(?:<@!?(\d{17,18})>|(\d{17,18}))$/);
                    const botID = botIDExp ? botIDExp[1] || botIDExp[0] : null;
                    let bot = null;
                    try {
                        if (botID) {
                            bot = await client.getRESTUser(botID);
                        } else {
                            throw new Error(`Bot Not Found: ${botID}`);
                        }
                    } catch (ex) {
                        console.error(ex);
                        return msg.channel.createMessage('Invalid usage: Bot ID/mention not found.');
                    }
                    const botInviteURL = `https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0&guild_id=${client.config.servers.testing.id}`;
                    const embed = new Embed()
                        .title(`**${bot.username}#${bot.discriminator} - Bot Submitted**`)
                        .description(`[Invite URL](${botInviteURL})\nOwner: \`${msg.author.username}#${msg.author.discriminator}\`\nPrefix: \`${args[1]}\``)
                        .thumbnail(bot.displayAvatarURL);
                    return client.createMessage(client.config.servers.testing.add_bot_channel, embed);
                }
                return msg.channel.createMessage('Invalid usage: No bot prefix argument passed.');
            }
            return msg.channel.createMessage('Invalid usage: Maliformed bot ID/mention.');
        }
        return msg.channel.createMessage('Invalid usage: No bot ID argument passed.');
    },
};
