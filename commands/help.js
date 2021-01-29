const {MessageEmbed} = require("discord.js");

module.exports = {
	name: "help",
	aliases: ["pomoc"],

	run: async (client, message, args) => {

		const embed = new MessageEmbed()
		.setAuthor(`LISTA DOSTĘPNYCH KOMEND ● ${client.user.username}`, client.user.displayAvatarURL())
		.setColor("black")
		.setDescription(`<:online:784528921651576891> Dostępne __**KOMENDY**__ \`${client.user.username}\`
		
		**\`●\`** \`,help\` \`-\` Wyświetla **listę** komend
		**\`●\`** \`,kanal #kanal\` \`-\` Ustawia **kanał** reklam
		**\`●\`** \`,reklama (reklama serwera)\` \`-\` Ustawia **reklame** serwera
		**\`●\`** \`,link\` \`-\` Link do **zaproszenia** bota
		**\`●\`** \`,info\` \`-\` Informacje na temat statusu **reklamy**`)
		message.channel.send({embed})
	}
}
