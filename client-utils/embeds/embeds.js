const { MessageEmbed } = require("discord.js");



	function error(channel, content) {
		const embed = new MessageEmbed()
			.setAuthor("WYSTĄPIŁ BŁĄD", "https://cdn.discordapp.com/emojis/784036532738719767.gif?v=1")
			.setDescription(`\`»\` ${content}`)
			.setThumbnail(channel.guild.iconURL({dynamic: true}))
			.setColor("FF0000");
			
		channel.send(embed);
	}



module.exports = error
