const {MessageEmbed} = require("discord.js")

module.exports = {
	name: "message",

	run: async (client, message) => {

		if(message.author.bot || message.channel.type === "dm" || !message.content || !message.author || !message.guild) return;
		const mentionRegexp = new RegExp(`^<@!?${client.user.id}>( |)$`);
		if (message.content.match(mentionRegexp))  {
			const embed = new MessageEmbed()
				.setAuthor("Wykryto wzmianke!", client.user.avatarURL({size: 1024}))
				.setDescription(`Lista komend pod \`${client.config.prefix}pomoc\``)
				.setColor("#000001")

			message.channel.send(embed)
		}
	}
}
