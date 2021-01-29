const { prefix } = require("../config.json");

module.exports = {
    name: "message",
    run: async (client, message) => {

    if(message.author.bot || message.channel.type === "dm" || !message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let clientCommand = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(!clientCommand || !clientCommand.name) return
        
    if(clientCommand.dev && !client.config.owners.includes(message.author.id)) {
    return embeds.error("Nie jesteś developerem bota!")
    }
    try {
        if (clientCommand) clientCommand.run(client, message, args);
    } catch (e) {
        console.error(e)
    }

    }
}
