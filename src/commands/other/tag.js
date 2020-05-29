module.exports = {
    name: 'tag',
    description: 'description',
    args: false,
    usage: "<>",
    aliases: ['tags'],
    disabled: false,
    reason: "reason here!", // reason why its disabled
    developer: false, // dev only
    async execute(msg, args, client, config) {
        await msg.delete()
        switch (args[0]) {
            case 'dontasktoask':
                await msg.channel.createMessage('Don\'t ask to ask. By asking to ask a question, you have already asked a question. Provide as much info as you can when asking for help.\n  - https://dontasktoask.com/');
                break;
            case 'lookingfordevs':
                await msg.channel.createMessage('If your looking for a developer check out <#590563326782603292>\nIf you want to add to it look check out https://discordapp.com/channels/489144223099125761/590563326782603292/590563515991851038');
                break;
            case "hacker":
                await msg.channel.createMessage(":small_orange_diamond: We Are NOT a Hacking Server\nWe only support whitehat hacking (security improvements, finding issues, etc). We do not support cracking, jailbreaking, unauthorized access, etc.")
                break;
            default:
                return msg.channel.createMessage('**Couldn\'t find a tag for that!**\n\nAvailable Tags:\n\n\`dontasktoask\`\n\`lookingfordevs\`\n\`hacker\`');
        }
    },
};
