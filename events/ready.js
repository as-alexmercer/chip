const { Event } = require('quartz');

class Ready extends Event {
    constructor (client) {
        super(client, {
          name: 'ready'
        });
    }

    run () {
        return console.log('Bot Ready!');
    }
}

module.exports = Ready;