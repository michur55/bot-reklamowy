const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "eval",
    run: async (client, message, args) => {

        if(!client.config.owners.includes(message.author.id)) return;

        let evaled = args.join(" ");

        try {
            evaled = require("util").inspect(eval(evaled));
            evaled = evaled.replace(/`/g, "`" + String.fromCharCode(8203))
                if(evaled.includes(client.token)) return message.channel.send("nie lol")
                .replace(/@/g, "@" + String.fromCharCode(8203))
                .replace("'", "" + String.fromCharCode(8203))
                .replace("'", "" + String.fromCharCode(8203))
           if(evaled.includes(client.config.token)) return message.channel.send("<:harold:781925283657285632>")
            const repsonseEmbedMessage = new MessageEmbed()
                .setTitle("Eval")
                .setDescription(evaled)
                .setColor("000001")

            await message.channel.send(repsonseEmbedMessage);
        }
        catch (err) {

            error(message.channel, err)
        }
    }


}
