const { Command } = require('quartz');
const { servers } = require('../../config.js');

class Accept extends Command {
		constructor (client) {
				super(client, {
						name: 'accept',
						aliases: ['ok'],
						description: {
							content: 'Accept a bot.'
						}
				});
		}

		userPermissions (msg) {
				if (msg.guild.id !== servers.testing.id) return 'Not Testing Server'
				else return null
		}

		async run (msg, args) {
				await msg.guild.members.get(msg.channel.topic).kick(`Bot Approved By: ${msg.author.username}`)
						.catch(error => {
							return msg.embed(`**Unable to kick bot**\nError: ${error.message}`);
						});
				const botInviteURL = `https://discordapp.com/oauth2/authorize?client_id=${msg.channel.topic}&scope=bot&permissions=0&guild_id=${servers.main.id}`;
				const embed = this.client.embed()
						.title('**Invite**')
						.description(`[URL](${botInviteURL})`)
						.footer('Channel Deletion: 1 min');
				await msg.channel.createMessage({ embed });
				setTimeout(() => {
						return msg.channel.delete(`Bot Approved By: ${msg.author.username}`);
				}, 60000);
		}
}

module.exports = Accept;