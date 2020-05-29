const {
    Collection
} = require('eris');
const fs = require('fs');
module.exports = function(client, config) {
    client.commands = new Collection;
    //getting dirs
    const dirs = fs.readdirSync("./src/commands").filter((file) => fs.statSync("./src/commands" + '/' + file).isDirectory());
    //--adding commands--//

    for (folder of dirs) {
        var sub_folder = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'))
        for (files of sub_folder) {
            let command = require(`../commands/${folder}/${files}`);
            client.commands.set(command.name, command);
        }
    }
}
console.log("Finished adding commmands");
