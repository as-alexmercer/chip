module.exports = function(client, config) {
    client.on("ready", async () => {
        console.log("Bot logged in!");
    })
    process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

    client.on("error", (e) => console.error(`Error: ` + e))
    client.on("warn", (warn) => console.warn(`Warn: ` + warn))

    if (config.dev_mode) {
        client.on("debug", (msg) => console.info(`Debug: ` + msg))
    }

    process.on('exit', () => {
        client.disconnect({
            reconnect: false
        })
    });

    process.on('SIGINT', () => {
        client.disconnect({
            reconnect: false
        })
    });
}