const {
    Embed
} = require("../handlers")
module.exports = function(client, config) {
    client.on("guildMemberAdd", async (guild, member) => {
        if (guild.id === config.servers.main.id) {
            const guildAdded = client.guilds.get(config.servers.main.id);
            const memberCount = guildAdded.members.filter(member => !member.user.bot).length;
            await guildAdded.channels.get(config.servers.main.dev_count_channel).edit({
                name: `Devs: ${memberCount}`
            });
            const guild = member.guild;
            const embed = new Embed()
                .color("#ffffff")
                .title(`Greetings, welcome to ${guild.name}! :tada: :confetti_ball:`)
                .description('Thank you for joining in our server. Please check our <#572922217478881330> and get yourself some roles via <#609139074514550785>.\nEnjoy your time here!\n**Quick reminder, we only support white-hat hacking. Nothing else!**');
            const channel = await client.getDMChannel(member.id)
            await channel.createMessage(embed).catch(e => {});

            return member.addRole(config.servers.main.join_role).catch(e => {});
        } else if (member.user.bot) {
            await guild.createChannel(member.user.username + '-' + member.user.discriminator, 0, 'Member Added', {
                parentID: config.servers.testing.bot_testing_category,
                topic: member.id
            });
            return member.addRole(config.servers.testing.bot_role).catch(e => {});
        }
    })

    client.on("guildMemberRemove", (guild, member) => {
        const removeGuild = client.guilds.get(config.servers.main.id);
        const memberCount = removeGuild.members.filter(member => !member.user.bot).length
        return removeGuild.channels.get(config.servers.main.dev_count_channel).edit({
            name: `Devs: ${memberCount}`
        });
    })
}
