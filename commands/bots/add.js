const { Command } = require('quartz');
const { servers } = require('../../config.js');

class Add extends Command {
    constructor (client) {
        super(client, {
            name: 'add',
            aliases: ['submit'],
            description: {
                content: 'Add a bot.'
            }
        });
    }

    async run (msg, args) {
        await msg.delete()
        if (!msg.member.roles.includes(servers.main.required_role_add_bot)) {
            const role = msg.channel.guild.roles.get(servers.main.required_role_add_bot);
            console.log(role)
            return msg.embed(`Sorry but you require the \`${role.name}\` role`);
        }
        if (args[0]) {
            if (/^(<@!?(\d{17,18})>|\d{17,18})$/.test(args[0])) {
                if (args[1]) {
                    const botIDExp = args[0].match(/^(?:<@!?(\d{17,18})>|(\d{17,18}))$/);
                    const botID = botIDExp ? botIDExp[1] || botIDExp[0] : null;
                    let bot = null;
                    try {
                        if (botID) {
                            bot = await this.client.getRESTUser(botID);
                        } else {
                            throw new Error(`Bot Not Found: ${botID}`);
                        }
                    } catch (ex) {
                        console.error(ex);
                        return msg.embed('Invalid usage: Bot ID/mention not found.');
                    }
                    const botInviteURL = `https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0&guild_id=${servers.testing.id}`;
                    const embed = this.client.embed()
                        .title(`**${bot.username}#${bot.discriminator} - Bot Submitted**`)
                        .description(`[Invite URL](${botInviteURL})\nOwner: \`${msg.author.username}#${msg.author.discriminator}\`\nPrefix: \`${args[1]}\``)
                        .thumbnail(bot.displayAvatarURL);
                    return this.client.createMessage(servers.testing.add_bot_channel, { embed });
                }
                return msg.embed('Invalid usage: No bot prefix argument passed.');
            }
            return msg.embed('Invalid usage: Maliformed bot ID/mention.');
        }
        return msg.embed('Invalid usage: No bot ID argument passed.');
    }
}

module.exports = Add;