const { Event } = require('quartz');

class Error extends Event {
    constructor (client) {
        super(client, {
          name: 'error'
        });
    }

    run (error) {
        return console.error(error);
    }
}

module.exports = Error;