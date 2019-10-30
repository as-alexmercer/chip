const fetch = require('node-fetch');
module.exports = {
    name: 'paste',
    description: 'description',
    args: true,
    deletemsg: true,
    response:'',
    execute(msg, args,client) {
        const {tokens}= require('../config.js');
        let body = {
            'encrypted':    false,
            'description':  `Paste for ${msg.member.user.username}`,
            'sections': [{
                'name':     `${msg.member.user.username} : ${msg.id}`,
                'syntax':   'autodetect',
                'contents':  args.join(' ')
            }]
        };
        fetch(`https://api.paste.ee/v1/pastes?key=${tokens.paste}`, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => msg.channel.send(json.link));
    },
};
