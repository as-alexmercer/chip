module.exports = {
    name: 'add-bot',
    description: 'Submit a bot.',
    response: 'If you want to add your bot to the server, run `!add-bot <botID> <prefix>`.',
    args: true,
    main_server: true,
    deletemsg: true,
    execute(message, args, client) {
        const {servers} = require('../config.js');
        if (!message.member.roles.has(servers.main.required_role_add_bot)) {
            let role = message.guild.roles.get(servers.main.required_role_add_bot);
            return message.reply(`Sorry but you require the \`${role.name}\` role`);
        }
        if (args[0]) {
            if (/^(<@!?(\d{17,18})>|\d{17,18})$/.test(args[0])) {
                if (args[1]) {
                    let botIDExp = args[0].match(/^(?:<@!?(\d{17,18})>|(\d{17,18}))$/);
                    let botID = botIDExp ? botIDExp[1] || botIDExp[0] : null;
                    let bot = null;

                    try {
                        if (botID) {
                            bot = client.fetchUser(botID);
                        } else {
                            throw new Error(`Bot Not Found: ${botID}`);
                        }
                    } catch (ex) {
                        console.error(ex);
                        return message.channel.send('Invalid usage: Bot ID/mention not found.');
                    }

                    let botInviteURL = `https://discordapp.com/oauth2/authorize?client_id=${bot.id}&scope=bot&permissions=0&guild_id=${server.testing.id}`;

                    return client.channels.get(server.testing.add_bot_channel).send({
                        embed: {
                            title: `${bot.tag} - Bot Submitted`,
                            color: parseInt('36393f', 16),
                            description: [
                                `[Invite URL](${botInviteURL})`,
                                `Owner: ${message.author.tag}`,
                                `Prefix: \`${args[1]}\``
                            ].join('\n'),
                            thumbnail: { url: bot.displayAvatarURL },
                        }
                    });
                }

                return message.channel.send('Invalid usage: No bot prefix argument passed.');
            }

            return message.channel.send('Invalid usage: Maliformed bot ID/mention.');
        }

        return message.channel.send('Invalid usage: No bot ID argument passed.');
    }
};
