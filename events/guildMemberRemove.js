const { Event } = require('quartz');
const { servers } = require('../config.js');

class GuildMemberRemove extends Event {
    constructor (client) {
        super(client, {
          name: 'guildMemberRemove'
        });
    }

    run (guild, member) {
      const removeGuild = this.client.guilds.get(servers.main.id);
      const memberCount = removeGuild.members.filter(member => !member.user.bot).length
      return removeGuild.channels.get(servers.main.dev_count_channel).edit({ name: `Devs: ${memberCount}` });
    }
}

module.exports = GuildMemberRemove;