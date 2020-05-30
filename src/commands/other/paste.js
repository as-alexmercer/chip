const fetch = require('node-fetch');

module.exports = {
    name: 'paste',
    description: 'paste stuff',
    args: false,
    usage: "<usage here>",
    aliases: [],
    disabled: false,
    reason: "reason here!", // reason why its disabled
    staff: false, // staff only
    async execute(msg, args, client) {
        await msg.delete()
        let body = {
            'encrypted': false,
            'description': `Paste for ${msg.member.user.username}`,
            'sections': [{
                'name': `${msg.member.user.username} : ${msg.id}`,
                'syntax': 'autodetect',
                'contents': args.join(' ')
            }]
        };
        return fetch(`https://api.paste.ee/v1/pastes?key=${client.config.tokens.paste}`, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(json => msg.channel.createMessage(json.link));
    },
};
