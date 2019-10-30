// fetch = require('node-fetch');
module.exports = client => {
    const {tokens,prefix,dev_mode,dev_id,msg_to_long} = require('../config.js');
    client.on('message', message => {
        if (dev_mode && msg.author.id!=dev_id)return;
        if (!message.content.startsWith(prefix)) {
            if (message.author.bot) return;
        }
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command =
      client.commands.get(commandName) ||
      client.commands.find(
          cmd => cmd.aliases && cmd.aliases.includes(commandName)
      );
        if (!command){
            if (msg_to_long) markupcheck(message);
            return ;
        }
        if (command.disabled) return;
        if (command.server!=null && msg.guid.id!=command.server) return ;
        //checking for members perms//
        if (command.roles != null) {
            if (!message.member.roles.has(command.roles)) {
                let role = message.guild.roles.get(command.roles);
                message.reply(`Sorry but you require the \`${role.name}\` role`);
                return;
            }
        }
        //delete command msg//
        if (command.deletemsg) message.delete();

        //checking if args is needed and if args is provided//
        if (command.args && args.length == 0) {
            if (command.response == null) {
                return message.reply(`You didn't provide any arguments, ${message.author}!`);
            } else {
                return message.reply(command.response);
            }
        }
        //runing comand//
        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply('This shouldn\'t have happened');
        }
    });
};
//code thing//
function markupcheck(msg) {
    //checking if the msg is in a code channel
    if (msg.channel.parentID!=servers.main.language_category) return ;
    /*getting array of code and before/after msgs
   [0] = start of  msg
   [1] = code
   [2] = end of msg*/
    var search = msg.cleanContent.split('```');
    if (search[2]==null || search[1].length<=1000 ) return ;
    let body = {
        'encrypted':    false,
        'description':  `Paste for ${msg.member.user.username}`,
        'sections': [{
            'name':     `${msg.member.user.username} : ${msg.id}`,
            'syntax':   'autodetect',
            'contents':  search[1]
        }]
    };
    fetch(`https://api.paste.ee/v1/pastes?key=${tokens.paste}  `, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => msg.channel.send(`From ${msg.author.username}#${msg.author.discriminator}\n${search[0]}\n${json.link}\n${search[2]}`));
    msg.delete();
}
