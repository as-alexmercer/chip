module.exports = {
    name: 'ping',
    description: 'description',
    args: false,
    usage: "<usage here>",
    aliases: [],
    disabled: false,
    reason: "reason here!", // reason why its disabled
    developer: false, // dev only
    execute(msg, args, client) {
        msg.channel.createMessage(`Pong\n${msg.channel.guild.shard.latency}ms 💓`).then((message) => {
            message.edit(`${msg.channel.guild.shard.latency}ms 💓\n${message.timestamp-msg.timestamp}ms ⏱`)
        })
    },
};