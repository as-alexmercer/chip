module.exports={
    //leave this part
    watchers: {
        commands: require('./watcher-stuff/commands.js'),
        other: require('./watcher-stuff/other.js')
    },
    //edit everything after this
    dev_id: 'id', // used so people can't test the bot when ur coding
    dev_mode: true, // {bool} used to easily switch between bots
    prefix: 'prefix_here',
    msg_to_long: false, // {bool} a bit of code that will delete a msg if it has code blocks in it then put the code in a paste and resends
    tokens:{
    //can either put your tokens in here or env. remove according
        bot:{
            dev: 'Dev_bot_token' || process.env.dev_token,
            main: 'main_bot_token' || process.env.TOKEN
        },
        paste: 'paste.ee_token' || process.env.paste,
    },
    servers:{
        main:{
            id: 'Main_server_id',
            join_role: 'id', //this role is for the role that will be given when people join
            required_role_add_bot: 'id', //this role is for the add-bot command
            dev_count_channel: 'id', //a vc that will display how many users in the server
            language_category: 'id' //this the categry where all of your coding lanuages go
        },
        testing:{
            id: 'Testing_server_id',
            add_bot_channel: 'id', //this is where the bot will send the messages from the add-bot command
            bot_role: 'id', //the role the bot will get when it joins the test server
            bot_testing_category: 'id' //
        }
    }
};
