const {MessageEmbed} = require("discord.js");
module.exports = {
	name: "kanal",
	aliases: ["ustawkanal", "k"],
	run: async (client, message, args) => {
		if (!message.member.hasPermission("MANAGE_GUILD")) {
			return error(message.channel,"Nie posiadasz permisji \`ZARZĄDZANIE SERWEREM\`!")
		}

		if(!args[0]) {
			return error(message.channel, "Podaj **ID** lub **OZNACZ KANAŁ** na ktorym maja byc wysylane **REKLAMY**!")
		}

		const channel = message.guild.channels.cache.get(args[0]) ||
			message.mentions.channels.first();
		if(!channel) {
			return error(message.channel, `Podany kanał nie **ISTNIEJE**, Podaj prawidłowe id lub **OZNACZ** kanał na który chcesz aby \`${client.user.username}\` wysyłał **REKLAMY**!`)
		}
		if(channel.type !== "text") {
			return error(message.channel, "Podany kanał nie jest kanałem **TEKSTOWYM**!")
		}
		const clientmember = message.guild.members.cache.get(client.user.id);
		if (channel.permissionsFor(clientmember).has('VIEW_CHANNEL') === false){
			return error(message.channel, "Bot nie posiada **permisji** do wyswietlania podanego kanalu!")
		}
		if (channel.permissionsFor(clientmember).has('SEND_MESSAGES') === false){
			return error(message.channel, "Bot nie posiada **permisji** do wysylania na podanym kanale!")
		}
		const currentChannel = await getChannel(message.guild.id);
		if(!currentChannel) {
			adsdb.prepare("INSERT INTO ads (guildId, adsChannel) VALUES (?, ?)").run(message.guild.id, channel.id);
		} else {
			adsdb.prepare("UPDATE ads SET adsChannel = ? WHERE guildId = ?").run(channel.id, message.guild.id);
		}
		const embed = new MessageEmbed()
			.setAuthor("POMYŚLNIE USTAWIONO", "https://cdn.discordapp.com/emojis/760568194963341312.gif?v=1")
			.setDescription(`\`»\` Pomyślnie ustawiono **KANAŁ** na ${channel}`)
			.setColor("2EFF00")
		message.channel.send(embed)

	}
}
