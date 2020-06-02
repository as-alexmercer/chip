const {
    Embed,
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
    staff: true, // staff only
    async execute(msg, args, client) {
        let content = msg.content.split(" ")
        content.shift()
        content = content.join(" ")
        let res
        let end;
        let error = false;
        let now = process.hrtime.bigint();
        try {
            res = eval(content)
            end = process.hrtime.bigint();
        } catch (e) {
            end = process.hrtime.bigint();
            error = true;
            res = e;
        } finally {
            let time = end - now;
            const embed = new Embed()
                .color(error ? "#ff0000" : "#00ff00")
                .title("Result")
                .description(`Time: ${logic.nano(time)}`)
                .addField("Result:", `\`\`\`js\n${res}\`\`\``)
            msg.channel.createMessage(embed)
        }
    },
};
