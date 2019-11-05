const { Command } = require('quartz');

class Name extends Command {
    constructor (client) {
        super(client, {
            name: 'name', // Command Name
            aliases: ['aliases'], // Command Aliases
            description: {
                content: 'description' // Command Description
            }
        });
    }

    async run (msg, args) {
        // Code goes here
    } 
}

module.exports = Name;