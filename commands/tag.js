module.exports = {
	name: 'tag',
	description: 'description',
	args: false,
  deletemsg: true,
  response:"umm couldn't find a tag for that",
	execute(msg, args,client) {
		switch (args[0]) {
			case "dontasktoask":
				    msg.channel.send("Don't ask to ask. By asking to ask a question, you have already asked a question. Provide as much info as you can when asking for help.\n-https://dontasktoask.com/");
				break;
			case "lookingfordevs":
				msg.channel.send("If your looking for a Dev check out <#590563326782603292>\nIf you want to add to it look at https://discordapp.com/channels/489144223099125761/590563326782603292/590563515991851038")
				break;
			default:
				msg.channel.send("Umm couldn't find a tag for that\nHere are the tags that can be used:\ndontasktoask\nlookingfordevs")
		}
	},
};
