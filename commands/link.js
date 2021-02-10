const {MessageEmbed} = require("discord.js")
module.exports = {
	name: "link",
	aliases: ["linki"],
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setAuthor(`LINKI BOTA REKLAMOWEGO ${client.user.username}`, client.user.displayAvatarURL({dynamic: true}))
			.addField("<a:pin:764509780521517087> Link do __**DODANIA**__ bota", "[\`KLIKNIJ TUTAJ\`](https://discord.com/oauth2/authorize?client_id=747029952158761020&scope=bot&permissions=8)")
			.addField("<a:verifywhite:764514126344224778> Link do __**SERWERA SUPPORT**__", "[\`KLIKNIJ TUTAJ\`](https://discord.gg/yKEbs7RxBb)")
			.setColor("#000001")
			.setThumbnail(message.guild.iconURL({dynamic: true}))
		message.channel.send(embed)
	}
}
