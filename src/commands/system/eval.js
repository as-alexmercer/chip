const {
    logic
} = require('../../handlers');
module.exports = {
    name: 'eval',
    description: 'description',
    args: true,
    usage: "<What to eval>",
    cooldown: 5,
    aliases: ["e"],
    disabled: false,
    reason: "reason here!",
    staff: false, // staff only
    async execute(msg, args, client) {
        if (msg.author.id !== client.config.owner_id) return;
        let set_async = false
        let depth = 0
        let content = msg.content.split(" ")
        content.shift()
        //idea stolen off Lite#0001
        if (msg.content.includes("--depth")) {
            depth = parseInt(msg.content[msg.content.indexOf("--depth") + 2])
            content.splice(content.indexOf("--depth"), 3)
        }

        if (msg.content.includes("--async")) {
            set_async = true;
            content.splice(content.indexOf("--async"), 1)
        }
        content = content.join(" ")
        if (set_async) content = `(async () => { ${content} })()`;

        let res
        let end;
        let error = false;
        let now = process.hrtime.bigint();
        try {
            res = await eval(content)
            end = process.hrtime.bigint();
        } catch (e) {
            end = process.hrtime.bigint();
            error = true;
            res = e;
        } finally {
            let time = end - now;

            if (res && typeof res !== "string") {
                res = inspect(res, {
                    depth: depth,
                    maxArrayLength: 50
                });
            }
            if (res) {
                res = res.replace(new RegExp(client.config.tokens.paste, "g"), "-- Redacted ---")
                    .replace(new RegExp(client.config.tokens.bot.main, "g"), "-- Redacted ---")
                    .replace(new RegExp(client.config.tokens.bot.dev, "g"), "-- Redacted ---")
            }

            const embed = new client.Embed()
                .color(error ? "#ff0000" : "#00ff00")
                .title("Result")
                .description(`Time: ${logic.nano(time)}`)
                .addField("Result:", `\`\`\`js\n${res}\`\`\``)
            msg.channel.createMessage(embed)
        }
    },
};