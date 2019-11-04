const {RichEmbed} = require('discord.js');
module.exports = {
    name: 'help',
    description: 'description',
    args: false,
    deletemsg: false,
    response:'',
    execute(msg, args,client) {
        const embed = new RichEmbed()
            .setTitle('Here are all of the commands')
            .setAuthor(msg.author.username,msg.author.avatarURL)
            .addField('**__Commands__**','!add-bot {Bots id} {prefix}\n!tag [tag]\n!paste {code}',true)
            .addField('**__Info:__**','Can only be used with the Certified role\nUseful instead of typing tags out\nPlease use if the code is bigger than it should be',true)
            .addField('**__About__**','Made for the Code::Together server!');
        msg.channel.send(embed);
    },
};
