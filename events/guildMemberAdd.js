const { Event } = require('quartz');
const { servers } = require('../config.js');

class GuildMemberAdd extends Event {
    constructor (client) {
        super(client, {
          name: 'guildMemberAdd'
        });
    }

    async run (guild, member) {
        if (guild.id === servers.main.id) {
          const guildAdded = this.client.guilds.get(servers.main.id);
          const memberCount = guildAdded.members.filter(member => !member.user.bot).length;
          await guildAdded.channels.get(servers.main.dev_count_channel).edit({ name: `Devs: ${memberCount}` });
          const guild = member.guild;
          const embed = this.client.embed()
              .color(0xFFFFFF)
              .title(`Greetings, welcome to ${guild.name}! :tada: :confetti_ball:`)
              .description('Thank you for joining in our server. Please check our <#572922217478881330> and get yourself some roles via <#609139074514550785>.\nEnjoy your time here!\n**Quick reminder, we only support white-hat hacking. Nothing else!**');
          const channel = await this.client.getDMChannel(member.id)    
          await this.client.createMessage(channel.id, { embed }).catch(e => {});
          return member.addRole(servers.main.join_role).catch(e => {});
        } else if (member.user.bot) {
            await guild.createChannel(member.user.username + '-' + member.user.discriminator, 0, 'Member Added', {
                parentID: servers.testing.bot_testing_category,
                topic: member.id
            });
            return member.addRole(servers.testing.bot_role).catch(e => {});
        }
    }
}

module.exports = GuildMemberAdd;