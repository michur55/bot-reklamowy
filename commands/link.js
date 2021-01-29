const {MessageEmbed} = require("discord.js")
module.exports = {
	name: "link",
	aliases: ["linki"],
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setAuthor(`LINKI BOTA REKLAMOWEGO ${client.user.username}`, client.user.displayAvatarURL({dynamic: true}))
			.addField("<a:pin:785072213950070784> Link do __**DODANIA**__ bota", "[\`KLIKNIJ TUTAJ\`](https://discord.com/api/oauth2/authorize?client_id=764573163605459005&permissions=8&scope=bot)")
			.addField("<a:verifywhite:784707361716568080> Link do __**SERWERA SUPPORT**__", "[\`KLIKNIJ TUTAJ\`](https://discord.gg/2FZwfqZ5dF)")
			.setColor("#000001")
			.setThumbnail(message.guild.iconURL({dynamic: true}))
		message.channel.send(embed)
	}
}
