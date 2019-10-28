const {readdirSync} = require('fs');
const Discord = require('discord.js');
const {watchers,tokens,dev_mode} = require('./config.js');
const client = new Discord.Client();
//command stuff//
client.commands = new Discord.Collection();
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
for (var x in commandFiles) {
  let command = require(`./commands/${commandFiles[x]}`);
  client.commands.set(command.name, command);
}
watchers.commands(client);
if (dev_mode){
  client.login(tokens.bot.dev)
}else{
  client.login(tokens.bot.main)
  watchers.other(client);
}
