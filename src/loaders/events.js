const {
    readdirSync
} = require('fs');
module.exports = (client, config) => {
    let events = readdirSync(`./src/events/`).filter(file => file.endsWith('.js') && file !== "base.js")
    for (event_ of events) {
        require(`../events/${event_}`)(client, config)
    }
}