const {MessageEmbed} = require("discord.js");
module.exports = {
	name : "odrzuc",

	run : async (client, message, args) => {
		if (message.channel.id !== client.config.verifyChannel) return;
		if (!args[0]) {
			return error("Podaj id serwera do odrzucenia!");
		}
		if (!args[1]) {
			return error(message.channel, "Podaj powód!");
		}
		const toVerifyObject = await toVerifygetById(args[0]);
		if (!toVerifyObject) {
			return error(message.channel, "Nie znaleziono reklamy do weryfikacji z podanego serwera!");
		}
		const channelFromdb = await getChannel(toVerifyObject.guildId);
		const channelFromDiscord = client.channels.cache.get(channelFromdb);
		const guild = client.guilds.cache.get(toVerifyObject.guildId);

		adsdb.prepare("DELETE FROM toVerify WHERE guildId = ?").run(toVerifyObject.guildId);

		message.reply("Odrzucono reklame!")
		const denyEmbed = new MessageEmbed()
			.setAuthor(`REKLAMA SERWERA ${guild.name.toUpperCase()} ZOSTAŁA ODRZUCONA`, "https://images-ext-1.discordapp.net/external/5azERgBmomA91FI90WrzTRxckoWS_0JHnf2l8dAj11Q/%3Fv%3D1/https/cdn.discordapp.com/emojis/784036532738719767.gif")
			.addField("__**ODRZUCONA**__ przez", `\`${message.author.tag}\``)
			.addField("__**POWÓD**__ odrzucenia", `\`\`\`${args.slice(1).join(" ")}\`\`\``)
			.setColor("FF0000")
		client.channels.cache.get(client.config.statusChannel).send(denyEmbed)
		if(!channelFromDiscord) return;
		channelFromDiscord.send(denyEmbed)


	}
}
