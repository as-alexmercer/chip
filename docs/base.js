module.exports = {
    name: 'name',
    description: 'description', // not really used
    args: false,
    usage: "<usage here>",
    aliases: ['aliases'],
    disabled: false,
    reason: "reason here!", // reason why its disabled
    developer: false, // dev only
    execute(msg, args, client, config) {
        //--code goes here--//
    },
};
