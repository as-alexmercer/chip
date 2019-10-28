const {RichEmbed} = require('discord.js');
module.exports = {
	name: 'accept',
	description: 'description',
//	server:,
	args: false,
  deletemsg: false,
  disabled: false,
   execute(msg, args,client) {
		 const {servers} = require('../config.js');
		 msg.guild.members.get(msg.channel.topic).kick("bot has been accepted")
		 .catch(error=>console.error(error))
		 let botInviteURL = `https://discordapp.com/oauth2/authorize?client_id=${msg.channel.topic}&scope=bot&permissions=0&guild_id=${servers.main.id}`
		 const embed = new RichEmbed()
		 .setTitle("Here is the bots invite!")
		 .setDescription(`[URL](${botInviteURL})`)
		 .setFooter("This channel will be deleted in 10 seconds!")
		 msg.channel.send(embed);
		 setTimeout(function () {
			 msg.channel.delete()
		 }, 10000);
	},
};
