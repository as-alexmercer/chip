const Discord = require("discord.js");
module.exports = function(client) {
  const {servers} = require('../config.js');
  client.on("guildMemberRemove", () => checkMembers(client));
  client.on("error", console.error);
  client.on("guildMemberAdd", member => {
    const {servers} = require('../config.js');
    if (member.guild.id == servers.main.id) {
      server_code_together(client,member);
    } else if (member.user.bot) {
      member.guild.createChannel(
        member.user.username + "-" + member.user.discriminator,
        {
          type: "text",
          parent: servers.testing.bot_testing_category,
          topic: member.id
        }
      );
      member.addRole(servers.testing.bot_role).catch(e => {})
    }
  });

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("people code", {
      type: "WATCHING"
    });
    checkMembers(client);
  });
};

function server_code_together(client,member) {
  const {servers} = require('../config.js');
  checkMembers(client);
  let guild = member.guild;
  let embed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .addField(
      `Greetings, welcome to ${guild.name}! :tada: :confetti_ball:`,
      "Thank you for joining in our server. Please check our <#572922217478881330> " +
        "and get yourself some roles via <#609139074514550785> \nEnjoy your time here!" +
        "\n**Quick reminder, we only support white-hat hacking. Nothing else!**"
    );

  member.send(embed).catch(e => {});
  member.addRole(servers.main.join_role).catch(e => {});
}
function checkMembers(client) {
  const {servers} = require('../config.js');
    let guild = client.guilds.get(servers.main.id);
    let memberCount = guild.members.filter(member => !member.user.bot).size;

    guild.channels.get(servers.main.dev_count_channel).setName(`Devs: ${memberCount}`);
  }
