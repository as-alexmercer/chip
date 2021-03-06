const {
    Collection
} = require('eris');
module.exports = async function(client, config) {

    //command stuff//
    const cooldowns = new Collection();
    //--command handling--//
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
        let botMentionTest = message.content.match(new RegExp(`^<@!?${client.user.id}>`, "i"));

        //prefix stuff
        let prefix = config.prefix;
        let args;

        if (message.content.startsWith(prefix)) {
            args = message.content.slice(prefix.length);
        } else if (botMentionTest !== null) {
            args = message.content.slice(botMentionTest[0].length);
        } else if (message.author.id === config.owner_id && message.content.startsWith(config.owner_prefix)) {
            args = message.content.slice(config.owner_prefix.length);
        } else return;

        //args stuff//
        args = args.trim().toLowerCase().split(/ +/);
        const commandName = args.shift();
        //checking channel perms to see if the bot can send msg to it//
        if (!message.channel.permissionsOf(client.user.id).has("sendMessages")) return;
        //finding command//
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        //for dev only commands when in dev_mode//
        if (config.dev_mode && message.author.id != config.owner_id) return;
        //staff only command
        if (command.staff && !config.staff.includes(message.author.id)) return;
        // disabled command //
        if (command.disabled && message.author.id != config.owner_id) {
            let reply = `\n\`${command.name}\` has been disabled!`;
            if (command.reason) {
                reply += `\nReason: \`${command.reason}\``;
            }
            client.createMessage(message.channel.id, reply).then((msg) => {
                setTimeout(function() {
                    msg.delete();
                }, 7500);
            })
            return;
        }

        // args //
        if (command.args && args.length === 0) {
            let reply = `You didn't provide any arguments, ${message.author.mention}!`;
            if (command.usage) reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            return client.createMessage(message.channel.id, reply);
        }

        try {
            let res = command.execute(message, args, client);
            if (res instanceof Promise) await res;
        } catch (error) {
            console.error(error);
            message.channel.createMessage('This shouldn\'t have happened');
        }
    });
};