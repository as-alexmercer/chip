const { Command } = require('quartz');
const { tokens } = require('../../config.js');
const fetch = require('node-fetch');

class Paste extends Command {
    constructor (client) {
        super(client, {
            name: 'paste',
            aliases: ['copy'],
            description: {
                content: 'Paste code into paste.ee'
            }
        });
    }

    async run (msg, args) {
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
        return fetch(`https://api.paste.ee/v1/pastes?key=${tokens.paste}`, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => msg.embed(`[View Paste](${json.link})`));   
    } 
}

module.exports = Paste;