module.exports = function(client, config) {
    client.on("ready", async () => {
        console.log("Bot logged in!");

        if (!config.dev_mode) {
            const guildAdded = client.guilds.get(config.servers.main.id);
            const memberCount = guildAdded.members.filter(member => !member.user.bot).length;
            await guildAdded.channels.get(config.servers.main.dev_count_channel).edit({
                name: `Devs: ${memberCount}`
            });
        }
    })
    process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

    client.on("error", (e) => console.error(`Error: ` + e))
    client.on("warn", (warn) => console.warn(`Warn: ` + warn))

    if (config.dev_mode) {
        client.on("debug", (msg) => console.info(`Debug: ` + msg))
    }
}
